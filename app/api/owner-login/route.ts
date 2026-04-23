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
 * Strategy: set a known password on the owner's auth user via the Supabase admin
 * API, then immediately sign in with that password. Cookies get set on localhost
 * via the @supabase/ssr server client. Reliable (no PKCE/token-expiry games).
 */
const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const secret = searchParams.get('secret')
  const expected = process.env.OWNER_DEV_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  // 1) Ensure the owner exists in auth.users + set a temporary password.
  const tempPassword = `dev-${expected}-${Date.now()}`
  const admin = createSupabaseAdminClient()

  // Find the user
  const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
  if (listErr) {
    console.error('[owner-login] listUsers failed', listErr)
    return NextResponse.json({ error: 'Could not look up owner.' }, { status: 500 })
  }

  let owner = list.users.find((u) => u.email?.toLowerCase() === OWNER_EMAIL)

  if (!owner) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: OWNER_EMAIL,
      password: tempPassword,
      email_confirm: true,
    })
    if (createErr || !created?.user) {
      console.error('[owner-login] createUser failed', createErr)
      return NextResponse.json({ error: 'Could not create owner user.' }, { status: 500 })
    }
    owner = created.user
  } else {
    const { error: updErr } = await admin.auth.admin.updateUserById(owner.id, {
      password: tempPassword,
      email_confirm: true,
    })
    if (updErr) {
      console.error('[owner-login] updateUserById failed', updErr)
      return NextResponse.json({ error: 'Could not set password.' }, { status: 500 })
    }
  }

  // 2) Sign in with password on a cookie-writing server client.
  const res = NextResponse.redirect(`${origin}/course/welcome`, { status: 302 })
  const cookieStore = cookies()
  const supabase = createServerClient(supaUrl, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        res.cookies.set({
          name,
          value,
          ...options,
          maxAge: 60 * 60 * 24 * 5, // 5 days
        })
      },
      remove(name: string, options: CookieOptions) {
        res.cookies.set({ name, value: '', ...options, maxAge: 0 })
      },
    },
  })

  const { error: signErr } = await supabase.auth.signInWithPassword({
    email: OWNER_EMAIL,
    password: tempPassword,
  })
  if (signErr) {
    console.error('[owner-login] signInWithPassword failed', signErr)
    return NextResponse.json({ error: 'Could not sign in.' }, { status: 500 })
  }

  return res
}
