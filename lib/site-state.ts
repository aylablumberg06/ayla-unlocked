// ──────────────────────────────────────────────────────────
// Master "is the course live for sale?" toggle.
//
// ⚠️  PRE-LAUNCH CHECKLIST — DO NOT flip to `true` until ALL of these are done:
//
//   STRIPE (critical, otherwise payments don't get recorded):
//   [ ] STRIPE_WEBHOOK_SECRET env var is set on Vercel (Settings → Env Vars)
//       Get it from: Stripe Dashboard → Developers → Webhooks → your endpoint → Signing secret (starts with whsec_)
//   [ ] Webhook endpoint registered in Stripe Dashboard pointing to:
//       https://unlocked.aylablumberg.com/api/stripe-webhook
//       Events to subscribe: checkout.session.completed
//   [ ] Test the full flow in Stripe TEST mode with card 4242 4242 4242 4242
//       Verify a row appears in Supabase users table with paid: true
//   [ ] Switch Stripe to LIVE mode, copy the LIVE price ID into STRIPE_PRICE_ID env var,
//       and re-do the webhook secret (live mode has its own webhook secret)
//
//   CONTENT:
//   [ ] All missing screenshots are dropped in
//   [ ] Final lesson-by-lesson review is done
//
// While IS_LIVE_FOR_SALE is `false`:
//   - /api/create-checkout returns 503 "not live"
//   - /unlock page shows "coming soon" instead of the Stripe button
//   - Hero "Get Access · $79" buttons across the site hide the price + replace
//     with "Coming soon" linking to a notify-me email
//
// The owner can still preview everything via /api/owner-login?secret=...
// ──────────────────────────────────────────────────────────

export const IS_LIVE_FOR_SALE = true

export const NOTIFY_ME_EMAIL = 'aylablumberg06@gmail.com'
