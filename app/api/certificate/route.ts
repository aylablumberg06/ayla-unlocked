import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'
import { renderCertificateHtml, makeCertId } from '@/lib/certificate-html'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/certificate
 *
 * Triggered when the student clicks "Complete Course" on the final lesson.
 * Body: { name: string }
 * Behavior:
 *   1. Verifies the student is authenticated.
 *   2. Marks them complete in user_progress.
 *   3. Generates the Elle-Woods-themed certificate HTML with their name.
 *   4. Emails it to them via Resend (plus cc to aylablumberg06@gmail.com for her records).
 *   5. Returns the certificate URL path for immediate display.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const name = String(body.name || '').trim().slice(0, 60)
    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    const email = user.email.toLowerCase()
    const admin = createSupabaseAdminClient()

    // mark complete + store name on the progress row
    const completedAt = new Date().toISOString()
    const certId = makeCertId(email + completedAt)

    // upsert: preserve bookmarks, confused, notes; add completed_at and store cert id in notes blob under reserved key _cert
    const { data: existing } = await admin
      .from('user_progress')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    const notes = (existing?.notes ?? {}) as Record<string, string>
    notes['_cert_id'] = certId
    notes['_cert_name'] = name

    await admin.from('user_progress').upsert(
      {
        email,
        last_lesson: existing?.last_lesson ?? 0,
        bookmarks: existing?.bookmarks ?? [],
        confused: existing?.confused ?? [],
        notes,
        completed_at: existing?.completed_at ?? completedAt,
        updated_at: completedAt,
      },
      { onConflict: 'email' }
    )

    // Build the certificate HTML
    const dateString = new Date(completedAt).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    })
    const certHtml = renderCertificateHtml({
      name,
      dateString,
      certId,
      mode: 'full',
    })

    // Send email (optional, silent fail)
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: sendErr } = await resend.emails.send({
        from: 'Ayla Unlocked <hello@aylaunlocked.com>',
        to: [email],
        bcc: ['aylablumberg06@gmail.com'],
        subject: `${name}, you did it. Your Ayla Unlocked certificate.`,
        html: certHtml,
        text: `You did the thing. What? Like it's hard. Your Ayla Unlocked certificate is attached as HTML. Certificate ID: ${certId}`,
      })
      if (sendErr) {
        console.error('[certificate] resend error', sendErr)
      }
    } else {
      console.warn('[certificate] RESEND_API_KEY not set, email skipped')
    }

    return NextResponse.json({
      ok: true,
      certId,
      viewUrl: `/course/certificate?name=${encodeURIComponent(name)}&id=${encodeURIComponent(certId)}&date=${encodeURIComponent(dateString)}`,
    })
  } catch (e: any) {
    console.error('[certificate] unhandled', e)
    return NextResponse.json({ error: e?.message || 'Something went wrong.' }, { status: 500 })
  }
}
