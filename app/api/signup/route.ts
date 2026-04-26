import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

/**
 * POST /api/signup
 * Called after Stripe payment. Accepts { email, phone? }.
 * Verifies the email actually paid, saves the optional phone,
 * then sends a magic link. The user clicks it → /api/auth/callback
 * sets a long-lived session cookie and routes them to /course/welcome.
 */
export async function POST(req: NextRequest) {
 try {
 const body = await req.json().catch(() => ({}))
 const email = String(body.email || '').trim().toLowerCase()
 const phone = String(body.phone || '').trim()

 if (!email || !email.includes('@')) {
 return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
 }

 const admin = createSupabaseAdminClient()

 const { data: userRow } = await admin
 .from('users')
 .select('paid')
 .eq('email', email)
 .maybeSingle()

 const isOwner = email === OWNER_EMAIL
 if (!isOwner && userRow?.paid !== true) {
 return NextResponse.json(
 { error: 'We don\'t see a paid account for that email. Try the email you used at checkout.' },
 { status: 403 }
 )
 }

 await admin.from('users').upsert(
 { email, phone: phone || null, paid: true },
 { onConflict: 'email' }
 )

 const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
 const anon = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 { auth: { persistSession: false } }
 )
 const { error } = await anon.auth.signInWithOtp({
 email,
 options: {
 emailRedirectTo: `${site}/api/auth/callback`,
 shouldCreateUser: true,
 },
 })
 if (error) {
 console.error('[signup] signInWithOtp error', error)
 return NextResponse.json({ error: 'Could not send link. Try again.' }, { status: 500 })
 }

 return NextResponse.json({ ok: true })
 } catch (e: any) {
 console.error('[signup] unhandled', e)
 return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
 }
}
