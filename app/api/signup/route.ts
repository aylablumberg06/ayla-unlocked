import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { email: rawEmail, phone } = await req.json()
    const email = String(rawEmail || '').trim().toLowerCase()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    const admin = createSupabaseAdminClient()

    // Make sure a row exists & attach phone if provided.
    // Stripe webhook should have already set paid=true for this email.
    // If not, we still create a row (paid stays false until Stripe confirms).
    const { error: upsertErr } = await admin
      .from('users')
      .upsert(
        { email, phone: phone || null },
        { onConflict: 'email', ignoreDuplicates: false }
      )
    if (upsertErr) {
      console.error('[signup] upsert error', upsertErr)
    }

    const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Fire the magic link. Supabase will send it via the SMTP you configured (Resend).
    const { error: linkErr } = await admin.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${site}/api/auth/callback`,
        shouldCreateUser: true,
      },
    })
    if (linkErr) {
      console.error('[signup] magic link error', linkErr)
      return NextResponse.json({ error: 'Could not send magic link.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[signup] unhandled', e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
