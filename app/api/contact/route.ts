import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseAdminClient } from '@/lib/supabase'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()
    const n = String(name || '').trim()
    const e = String(email || '').trim().toLowerCase()
    const m = String(message || '').trim()

    if (!n || !e || !m) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!e.includes('@')) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    // Save to Supabase
    const admin = createSupabaseAdminClient()
    const { error: dbErr } = await admin
      .from('contact_submissions')
      .insert({ name: n, email: e, message: m })
    if (dbErr) {
      console.error('[contact] db insert failed', dbErr)
      // Don't block email if DB insert fails.
    }

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: emailErr } = await resend.emails.send({
        from: 'Ayla Unlocked <hello@aylaunlocked.com>',
        to: [OWNER_EMAIL],
        replyTo: e,
        subject: `Ayla Unlocked, New Message from ${n}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FDF6F0; padding: 32px; color: #1A1A1A;">
            <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
              <div style="font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #E8295C; margin-bottom: 8px;">New contact form message</div>
              <h1 style="font-family: Georgia, 'Cormorant Garamond', serif; font-size: 28px; font-style: italic; margin: 0 0 24px; font-weight: 400;">${escapeHtml(n)} wrote in.</h1>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 8px 0; color: #5C5C5C; font-size: 13px;">Email</td><td style="padding: 8px 0; text-align: right;"><a href="mailto:${escapeHtml(e)}" style="color: #E8295C; text-decoration: none;">${escapeHtml(e)}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #5C5C5C; font-size: 13px;">Name</td><td style="padding: 8px 0; text-align: right;">${escapeHtml(n)}</td></tr>
              </table>
              <div style="background: #FFF5F8; border-left: 3px solid #E8295C; padding: 16px 20px; border-radius: 0 8px 8px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(m)}</div>
            </div>
          </div>
        `,
        text: `New message from ${n} (${e})\n\n${m}`,
      })
      if (emailErr) console.error('[contact] resend error', emailErr)
    } else {
      console.warn('[contact] RESEND_API_KEY not set, skipping email send')
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[contact] unhandled', e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}
