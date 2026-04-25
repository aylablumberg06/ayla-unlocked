import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function POST(req: NextRequest) {
 try {
 const supa = createSupabaseServerClient()
 const { data: { user } } = await supa.auth.getUser()
 if (!user?.email) {
 return NextResponse.json({ error: 'You need to be logged in to submit.' }, { status: 401 })
 }

 const body = await req.json().catch(() => ({}))
 const projectName = String(body.project_name || '').trim().slice(0, 120)
 const description = String(body.description || '').trim().slice(0, 2000)
 const projectUrl = String(body.project_url || '').trim().slice(0, 500)
 const screenshotUrl = String(body.screenshot_url || '').trim().slice(0, 500)
 const studentName = String(body.student_name || '').trim().slice(0, 80)

 if (!projectName || !description) {
 return NextResponse.json({ error: 'Project name and description are required.' }, { status: 400 })
 }

 const admin = createSupabaseAdminClient()
 const { error } = await admin.from('submissions').insert({
 email: user.email.toLowerCase(),
 student_name: studentName || null,
 project_name: projectName,
 description,
 project_url: projectUrl || null,
 screenshot_url: screenshotUrl || null,
 approved: false,
 featured: false,
 })
 if (error) {
 console.error('[submit] db', error)
 return NextResponse.json({ error: 'Could not save your submission.' }, { status: 500 })
 }

 // Ping Ayla so she knows
 if (process.env.RESEND_API_KEY) {
 try {
 const resend = new Resend(process.env.RESEND_API_KEY)
 await resend.emails.send({
 from: 'Ayla Unlocked <hello@aylaunlocked.com>',
 to: [OWNER_EMAIL],
 replyTo: user.email,
 subject: `New submission: ${projectName}`,
 html: `
 <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#FDF6F0;padding:32px;color:#1A1A1A;">
 <div style="max-width:560px;margin:0 auto;background:white;border-radius:16px;padding:28px;">
 <div style="font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#E8295C;margin-bottom:8px;">New student build</div>
 <h1 style="font-family:Georgia,serif;font-size:26px;font-style:italic;margin:0 0 16px;font-weight:400;">${escapeHtml(projectName)}</h1>
 <p style="font-size:13px;color:#5C5C5C;margin:0 0 18px;">From <a href="mailto:${escapeHtml(user.email)}" style="color:#E8295C;">${escapeHtml(user.email)}</a>${studentName ? ` (${escapeHtml(studentName)})` : ''}</p>
 <div style="background:#FFF5F8;border-left:3px solid #E8295C;padding:14px 18px;border-radius:0 8px 8px 0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(description)}</div>
 ${projectUrl ? `<p style="margin:16px 0 0;font-size:13px;">Live: <a href="${escapeHtml(projectUrl)}" style="color:#E8295C;">${escapeHtml(projectUrl)}</a></p>` : ''}
 ${screenshotUrl ? `<p style="margin:8px 0 0;font-size:13px;">Screenshot: <a href="${escapeHtml(screenshotUrl)}" style="color:#E8295C;">${escapeHtml(screenshotUrl)}</a></p>` : ''}
 <p style="margin-top:24px;font-size:12px;color:#ABABAB;">Review &amp; approve in the admin dashboard.</p>
 </div>
 </div>
 `,
 text: `${projectName}, from ${user.email}\n\n${description}\n\n${projectUrl || ''}\n${screenshotUrl || ''}`,
 })
 } catch (e) {
 console.warn('[submit] email failed', e)
 }
 }

 return NextResponse.json({ ok: true })
 } catch (e: any) {
 console.error('[submit] unhandled', e)
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
