import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import type Stripe from 'stripe'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export const runtime = 'nodejs'
// Must have raw body for signature verification
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
 const sig = req.headers.get('stripe-signature')
 if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

 const body = await req.text()
 let event: Stripe.Event
 try {
 event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
 } catch (err: any) {
 console.error('[stripe-webhook] signature verification failed', err?.message)
 return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
 }

 if (event.type === 'checkout.session.completed') {
 const session = event.data.object as Stripe.Checkout.Session
 const email = (session.customer_details?.email || session.customer_email || '')
 .trim()
 .toLowerCase()

 if (!email) {
 console.error('[stripe-webhook] no email on session', session.id)
 return NextResponse.json({ received: true })
 }

 const admin = createSupabaseAdminClient()
 // upsert by email, set paid=true. if they already exist with phone etc. just flip paid.
 const { error } = await admin
 .from('users')
 .upsert({ email, paid: true }, { onConflict: 'email' })
 if (error) {
 console.error('[stripe-webhook] upsert failed', error)
 return NextResponse.json({ error: 'db error' }, { status: 500 })
 }
 console.log('[stripe-webhook] marked paid:', email)

 // Notify Ayla. Silent failure — never block a paid event on email send.
 try {
 const name = session.customer_details?.name || ''
 const amountCents = session.amount_total || 0
 const amount = `$${(amountCents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
 await sendEmail({
 to: OWNER_EMAIL,
 subject: `🎉 yay new sale on Ayla Unlocked — ${amount}`,
 html: `
 <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#FDF6F0;padding:32px;color:#1A1A1A;">
 <div style="max-width:520px;margin:0 auto;background:white;border-radius:16px;padding:32px;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
 <div style="font-size:10px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#E8295C;margin-bottom:8px;">New sale</div>
 <h1 style="font-family:Georgia,serif;font-size:32px;font-style:italic;margin:0 0 16px;font-weight:400;line-height:1.1;">yay 🎉</h1>
 <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
 <tr><td style="padding:6px 0;color:#5C5C5C;font-size:13px;">Email</td><td style="padding:6px 0;text-align:right;font-family:ui-monospace,monospace;font-size:13px;">${escapeHtml(email)}</td></tr>
 ${name ? `<tr><td style="padding:6px 0;color:#5C5C5C;font-size:13px;">Name</td><td style="padding:6px 0;text-align:right;">${escapeHtml(name)}</td></tr>` : ''}
 <tr><td style="padding:6px 0;color:#5C5C5C;font-size:13px;">Amount</td><td style="padding:6px 0;text-align:right;font-weight:600;color:#E8295C;">${amount}</td></tr>
 <tr><td style="padding:6px 0;color:#5C5C5C;font-size:13px;">Session</td><td style="padding:6px 0;text-align:right;font-family:ui-monospace,monospace;font-size:11px;color:#999;">${session.id.slice(0, 24)}…</td></tr>
 </table>
 </div>
 </div>`,
 })
 } catch (mailErr) {
 console.error('[stripe-webhook] sale-notify email failed', mailErr)
 }
 }

 return NextResponse.json({ received: true })
}

function escapeHtml(s: string) {
 return s
 .replaceAll('&', '&amp;')
 .replaceAll('<', '&lt;')
 .replaceAll('>', '&gt;')
 .replaceAll('"', '&quot;')
 .replaceAll("'", '&#39;')
}
