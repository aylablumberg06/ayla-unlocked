import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

/**
 * POST /api/password-reset — sends a password-reset email via Supabase.
 * Only works for paid users.
 */
export async function POST(req: NextRequest) {
  try {
    const { email: rawEmail } = await req.json().catch(() => ({}))
    const email = String(rawEmail || '').trim().toLowerCase()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const admin = createSupabaseAdminClient()

    // Gate: must be owner OR paid
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
    const { error } = await admin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo: `${site}/reset-password` },
    })
    if (error) {
      console.error('[password-reset] generateLink error', error)
      return NextResponse.json({ error: 'Could not send reset email.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[password-reset] unhandled', e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
