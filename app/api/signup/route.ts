import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

/**
 * POST /api/signup — called after Stripe payment. Verifies the email paid,
 * stores phone, ensures auth user exists, then sends a magic link via Gmail.
 */
export async function POST(req: NextRequest) {
 try {
 const body = await req.json().catch(() => ({}))
 const email = String(body.email || '').trim().toLowerCase()
 const phone = String(body.phone || '').trim()

 if (!email || !email.includes('@')) {
 return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
 }

 const admin = createSupabaseAdminClient()

 const { data: userRow } = await admin
 .from('users')
 .select('paid')
 .eq('email', email)
 .maybeSingle()

 const isOwner = email === OWNER_EMAIL
 if (!isOwner && userRow?.paid !== true) {
 return NextResponse.json(
 { error: 'We don\'t see a paid account for that email. Try the email you used at checkout.' },
 { status: 403 }
 )
 }

 await admin.from('users').upsert(
 { email, phone: phone || null, paid: true },
 { onConflict: 'email' }
 )

 // Ensure the auth user exists before generating a link.
 const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
 const existing = list?.users?.find((u) => u.email?.toLowerCase() === email)
 if (!existing) {
 await admin.auth.admin.createUser({ email, email_confirm: true })
 }

 const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
 const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
 type: 'magiclink',
 email,
 options: { redirectTo: `${site}/api/auth/callback` },
 })
 if (linkErr || !linkData?.properties?.action_link) {
 console.error('[signup] generateLink error', linkErr)
 return NextResponse.json({ error: 'Could not send link. Try again.' }, { status: 500 })
 }

 const link = linkData.properties.action_link
 await sendEmail({
 to: email,
 subject: 'You\'re in. Ayla Unlocked is ready.',
 html: welcomeLinkHtml(link),
 })

 return NextResponse.json({ ok: true })
 } catch (e: any) {
 console.error('[signup] unhandled', e)
 return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
 }
}

function welcomeLinkHtml(link: string) {
 return `
 <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FDF6F0; padding: 32px; color: #1A1A1A;">
 <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 16px; padding: 36px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
 <div style="font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #E8295C; margin-bottom: 12px;">Welcome to Ayla Unlocked</div>
 <h1 style="font-family: Georgia, serif; font-size: 32px; font-style: italic; margin: 0 0 12px; font-weight: 400; line-height: 1.1;">You're in.</h1>
 <p style="font-size: 15px; color: #5C5C5C; line-height: 1.6; margin: 0 0 24px;">Tap the button to enter the course. You'll stay signed in on this device — lifetime access.</p>
 <a href="${link}" style="display:inline-block;background:#E8295C;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:500;">Enter the course →</a>
 <p style="font-size: 11px; color: #999; margin: 28px 0 0; line-height: 1.5;">This link expires in 1 hour. If you need a new one any time, just go to the login page.</p>
 </div>
 </div>`
}
