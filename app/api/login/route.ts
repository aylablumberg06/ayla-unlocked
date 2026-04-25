import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

/**
 * POST /api/login, email + password auth. Only lets paid users in.
 */
export async function POST(req: NextRequest) {
 try {
 const { email: rawEmail, password } = await req.json().catch(() => ({}))
 const email = String(rawEmail || '').trim().toLowerCase()
 const pw = String(password || '')

 if (!email || !email.includes('@')) {
 return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
 }
 if (!pw) {
 return NextResponse.json({ error: 'Password required.' }, { status: 400 })
 }

 // Gate: must be owner OR paid user
 if (email !== OWNER_EMAIL) {
 const admin = createSupabaseAdminClient()
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

 const res = NextResponse.json({ ok: true, redirect: '/course' })
 const cookieStore = cookies()
 const supa = createServerClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 {
 cookies: {
 get(name: string) { return cookieStore.get(name)?.value },
 set(name: string, value: string, options: CookieOptions) {
 res.cookies.set({ name, value, ...options, maxAge: 60 * 60 * 24 * 5 })
 },
 remove(name: string, options: CookieOptions) {
 res.cookies.set({ name, value: '', ...options, maxAge: 0 })
 },
 },
 }
 )

 const { error } = await supa.auth.signInWithPassword({ email, password: pw })
 if (error) {
 return NextResponse.json(
 { error: 'Wrong password. Try again, or reset below.' },
 { status: 401 }
 )
 }
 return res
 } catch (e: any) {
 console.error('[login] unhandled', e)
 return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
 }
}
