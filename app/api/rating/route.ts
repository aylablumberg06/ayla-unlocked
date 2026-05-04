import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/rating
 * Body: { rating: 1..5, note?: string }
 * Stores the student's course rating + optional note onto their
 * user_progress.notes blob under reserved keys _rating and _rating_note.
 * Avoids a new table — admin aggregates from user_progress.
 */
export async function POST(req: NextRequest) {
 try {
 const supabase = createSupabaseServerClient()
 const { data: { user } } = await supabase.auth.getUser()
 if (!user?.email) {
 return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
 }

 const body = await req.json().catch(() => ({}))
 const rating = Math.round(Number(body.rating))
 const note = String(body.note || '').trim().slice(0, 1000)
 if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
 return NextResponse.json({ error: 'Rating must be 1-5.' }, { status: 400 })
 }

 const email = user.email.toLowerCase()
 const admin = createSupabaseAdminClient()

 // Read existing row, merge in rating
 const { data: existing } = await admin
 .from('user_progress')
 .select('*')
 .eq('email', email)
 .maybeSingle()

 const notes = { ...(existing?.notes || {}) } as Record<string, any>
 notes._rating = rating
 if (note) notes._rating_note = note
 else delete notes._rating_note
 notes._rating_at = new Date().toISOString()

 if (existing?.email) {
 await admin
 .from('user_progress')
 .update({ notes, updated_at: new Date().toISOString() })
 .eq('email', email)
 } else {
 await admin.from('user_progress').upsert(
 { email, notes, updated_at: new Date().toISOString() },
 { onConflict: 'email' }
 )
 }

 return NextResponse.json({ ok: true })
 } catch (e: any) {
 console.error('[rating] unhandled', e)
 return NextResponse.json({ error: e?.message || 'Something went wrong.' }, { status: 500 })
 }
}
