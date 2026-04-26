import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

/**
 * POST /api/login — send a magic link to the user's email.
 * Only sends to owner or paid users. The session cookie set after
 * the link is clicked is long-lived (see SESSION_TTL in lib/supabase.ts).
 */
export async function POST(req: NextRequest) {
 try {
 const { email: rawEmail } = await req.json().catch(() => ({}))
 const email = String(rawEmail || '').trim().toLowerCase()

 if (!email || !email.includes('@')) {
 return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
 }

 const admin = createSupabaseAdminClient()

 if (email !== OWNER_EMAIL) {
 const { data } = await admin
 .from('users')
 .select('paid')
 .eq('email', email)
 .maybeSingle()
 if (data?.paid !== true) {
 return NextResponse.json(
 { error: 'No paid account found for that email.' },
 { status: 403 }
 )
 }
 }

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
 console.error('[login] signInWithOtp error', error)
 return NextResponse.json({ error: 'Could not send link. Try again.' }, { status: 500 })
 }

 return NextResponse.json({ ok: true })
 } catch (e: any) {
 console.error('[login] unhandled', e)
 return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
 }
}
