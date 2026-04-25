import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/signup
 * Called after Stripe payment. Accepts { email, password, phone? }.
 * Creates the Supabase auth user with that password, flips users.paid,
 * then server-side signs them in (sets cookies) and returns { ok, redirect }.
 *
 * If a user tries to sign up without paying first, we refuse.
 */
const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function POST(req: NextRequest) {
 try {
 const body = await req.json().catch(() => ({}))
 const email = String(body.email || '').trim().toLowerCase()
 const password = String(body.password || '')
 const phone = String(body.phone || '').trim()

 if (!email || !email.includes('@')) {
 return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
 }
 if (password.length < 6) {
 return NextResponse.json(
 { error: 'Password must be at least 6 characters.' },
 { status: 400 }
 )
 }

 const admin = createSupabaseAdminClient()

 // Confirm this email has actually paid (Stripe webhook writes users.paid=true)
 const { data: userRow } = await admin
 .from('users')
 .select('paid, email')
 .eq('email', email)
 .maybeSingle()

 const isOwner = email === OWNER_EMAIL
 if (!isOwner && (!userRow || userRow.paid !== true)) {
 return NextResponse.json(
 { error: 'We don\'t see a paid account for that email. Try the email you used at checkout.' },
 { status: 403 }
 )
 }

 // Find or create the auth user
 const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
 const existing = list.users.find((u) => u.email?.toLowerCase() === email)

 if (existing) {
 await admin.auth.admin.updateUserById(existing.id, {
 password,
 email_confirm: true,
 })
 } else {
 await admin.auth.admin.createUser({
 email,
 password,
 email_confirm: true,
 })
 }

 // Keep/update the users row (phone is optional)
 await admin.from('users').upsert(
 { email, phone: phone || null, paid: true },
 { onConflict: 'email' }
 )

 // Sign them in on this request so they land logged in
 const res = NextResponse.json({ ok: true, redirect: '/course/welcome' })
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
 const { error: signErr } = await supa.auth.signInWithPassword({ email, password })
 if (signErr) {
 console.error('[signup] auto signIn failed', signErr)
 return NextResponse.json({ ok: true, redirect: '/login' })
 }
 return res
 } catch (e: any) {
 console.error('[signup] unhandled', e)
 return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
 }
}
