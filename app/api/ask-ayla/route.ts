import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseAdminClient } from '@/lib/supabase'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

// Accepts a chat transcript + the user's contact info and emails it to Ayla.
export async function POST(req: NextRequest) {
  try {
    const { email, name, transcript } = await req.json()
    const e = String(email || '').trim().toLowerCase()
    const n = String(name || '').trim() || '(anonymous)'
    const t = Array.isArray(transcript) ? transcript : []

    if (!e || !e.includes('@')) {
      return NextResponse.json({ error: 'Please include a valid email.' }, { status: 400 })
    }
    if (t.length === 0) {
      return NextResponse.json({ error: 'No chat history.' }, { status: 400 })
    }

    const transcriptText = t
      .map((m: any) => `${m.role === 'user' ? 'THEM' : 'CLAUDE'}: ${String(m.content || '').trim()}`)
      .join('\n\n')

    const transcriptHtml = t
      .map((m: any) => {
        const isUser = m.role === 'user'
        const bg = isUser ? '#E8295C' : '#EFEFEF'
        const color = isUser ? 'white' : '#1A1A1A'
        const align = isUser ? 'right' : 'left'
        const label = isUser ? 'Them' : 'Claude'
        return `
          <div style="text-align:${align}; margin:8px 0;">
            <div style="display:inline-block; max-width:85%; text-align:left; background:${bg}; color:${color}; padding:10px 14px; border-radius:14px; font-size:13px; line-height:1.5;">
              <div style="font-size:9px; opacity:0.65; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">${label}</div>
              ${escapeHtml(String(m.content || ''))}
            </div>
          </div>
        `
      })
      .join('')

    // Save to contact_submissions so it shows up in your DB next to regular contact forms
    const admin = createSupabaseAdminClient()
    const { error: dbErr } = await admin.from('contact_submissions').insert({
      name: `[Ask-Ayla chat] ${n}`,
      email: e,
      message: transcriptText.slice(0, 8000),
    })
    if (dbErr) console.error('[ask-ayla] db error', dbErr)

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: emailErr } = await resend.emails.send({
        from: 'Ayla Unlocked <hello@aylaunlocked.com>',
        to: [OWNER_EMAIL],
        replyTo: e,
        subject: `Ayla Unlocked, Ask-Ayla chat from ${n}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FDF6F0; padding: 32px; color: #1A1A1A;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px;">
              <div style="font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #E8295C; margin-bottom: 8px;">Ask-Ayla escalation</div>
              <h1 style="font-family: Georgia, serif; font-size: 26px; font-style: italic; margin: 0 0 20px; font-weight: 400;">Someone wants you specifically.</h1>
              <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
                <tr><td style="padding:6px 0; color:#5C5C5C; font-size:13px;">From</td><td style="padding:6px 0; text-align:right;">${escapeHtml(n)}</td></tr>
                <tr><td style="padding:6px 0; color:#5C5C5C; font-size:13px;">Email</td><td style="padding:6px 0; text-align:right;"><a href="mailto:${escapeHtml(e)}" style="color:#E8295C;">${escapeHtml(e)}</a></td></tr>
              </table>
              <div style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#E8295C; margin:24px 0 8px;">Transcript</div>
              ${transcriptHtml}
            </div>
          </div>
        `,
        text: `New Ask-Ayla chat from ${n} <${e}>\n\n${transcriptText}`,
      })
      if (emailErr) console.error('[ask-ayla] resend error', emailErr)
    } else {
      console.warn('[ask-ayla] RESEND_API_KEY not set; email skipped')
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[ask-ayla] unhandled', e)
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
    .replaceAll('\n', '<br>')
}
