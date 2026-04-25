import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { IS_LIVE_FOR_SALE } from '@/lib/site-state'

export async function POST() {
  // Hard guard, while the course is not officially live, refuse any Stripe
  // checkout so we cannot accidentally take real money before everything is
  // ready. Flip IS_LIVE_FOR_SALE in lib/site-state.ts when you are ready.
  if (!IS_LIVE_FOR_SALE) {
    return NextResponse.json(
      { error: 'Ayla Unlocked is not live for sale yet. Email aylablumberg06@gmail.com to be notified the moment it opens.' },
      { status: 503 }
    )
  }

  try {
    const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      success_url: `${site}/unlock?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/unlock`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_creation: 'always',
    })
    return NextResponse.json({ url: session.url })
  } catch (e: any) {
    console.error('[create-checkout]', e)
    return NextResponse.json({ error: e?.message || 'Checkout failed' }, { status: 500 })
  }
}
