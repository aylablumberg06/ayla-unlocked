import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Dev-only one-click owner login.
 *
 * GET /api/owner-login?secret=OWNER_DEV_SECRET
 *
 * Uses a stable password (OWNER_PASSWORD env, or fallback 'ayla123456')
 * so the regular /login form keeps working with the same creds after.
 * Only touches the auth user when a sign-in attempt fails.
 */
const OWNER_EMAIL = 'aylablumberg06@gmail.com'
const DEFAULT_OWNER_PASSWORD = 'ayla123456'

export async function GET(req: NextRequest) {
 const { searchParams, origin } = new URL(req.url)
 const secret = searchParams.get('secret')
 const expected = process.env.OWNER_DEV_SECRET

 if (!expected || secret !== expected) {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 }

 const password = process.env.OWNER_PASSWORD || DEFAULT_OWNER_PASSWORD
 const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
 const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

 const res = NextResponse.redirect(`${origin}/course/welcome`, { status: 302 })
 const cookieStore = cookies()
 const supa = createServerClient(supaUrl, anonKey, {
 cookies: {
 get(name: string) {
 return cookieStore.get(name)?.value
 },
 set(name: string, value: string, options: CookieOptions) {
 res.cookies.set({ name, value, ...options, maxAge: 60 * 60 * 24 * 5 })
 },
 remove(name: string, options: CookieOptions) {
 res.cookies.set({ name, value: '', ...options, maxAge: 0 })
 },
 },
 })

 // Try password first (fast path, doesn't touch the DB)
 const first = await supa.auth.signInWithPassword({ email: OWNER_EMAIL, password })
 if (!first.error) return res

 // If password didn't match (e.g. someone changed it), reset then retry.
 const admin = createSupabaseAdminClient()
 const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
 const existing = list.users.find((u) => u.email?.toLowerCase() === OWNER_EMAIL)
 if (existing) {
 await admin.auth.admin.updateUserById(existing.id, {
 password,
 email_confirm: true,
 })
 } else {
 await admin.auth.admin.createUser({
 email: OWNER_EMAIL,
 password,
 email_confirm: true,
 })
 }
 const second = await supa.auth.signInWithPassword({ email: OWNER_EMAIL, password })
 if (second.error) {
 console.error('[owner-login] sign-in failed', second.error)
 return NextResponse.json({ error: 'Could not sign in.' }, { status: 500 })
 }
 return res
}
