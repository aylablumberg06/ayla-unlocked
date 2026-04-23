import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createSupabaseAdminClient } from '@/lib/supabase'
import type Stripe from 'stripe'

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
    // upsert by email — set paid=true. if they already exist with phone etc. just flip paid.
    const { error } = await admin
      .from('users')
      .upsert({ email, paid: true }, { onConflict: 'email' })
    if (error) {
      console.error('[stripe-webhook] upsert failed', error)
      return NextResponse.json({ error: 'db error' }, { status: 500 })
    }
    console.log('[stripe-webhook] marked paid:', email)
  }

  return NextResponse.json({ received: true })
}
