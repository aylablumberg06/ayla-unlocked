import { NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** POST /api/onboard, marks the current user's welcome screen as completed. */
export async function POST() {
 const supabase = createSupabaseServerClient()
 const { data: { user } } = await supabase.auth.getUser()
 if (!user?.email) {
 return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
 }
 const email = user.email.toLowerCase()
 const admin = createSupabaseAdminClient()

 const { data: existing } = await admin
 .from('user_progress')
 .select('*')
 .eq('email', email)
 .maybeSingle()

 await admin.from('user_progress').upsert(
 {
 email,
 last_lesson: existing?.last_lesson ?? 0,
 bookmarks: existing?.bookmarks ?? [],
 confused: existing?.confused ?? [],
 notes: existing?.notes ?? {},
 completed_at: existing?.completed_at ?? null,
 onboarded: true,
 updated_at: new Date().toISOString(),
 },
 { onConflict: 'email' }
 )

 return NextResponse.json({ ok: true })
}
