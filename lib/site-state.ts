// ──────────────────────────────────────────────────────────
// Master "is the course live for sale?" toggle.
//
// FLIP THIS TO `true` when:
//   - Stripe price ID is verified
//   - All missing screenshots are dropped in
//   - Final review is done
//
// While it's `false`:
//   - /api/create-checkout returns 503 "not live"
//   - /unlock page shows "coming soon" instead of the Stripe button
//   - Hero "Get Access · $39" buttons across the site hide the price + replace
//     with "Coming soon" linking to a notify-me email
//
// The owner can still preview everything via /api/owner-login?secret=...
// ──────────────────────────────────────────────────────────

export const IS_LIVE_FOR_SALE = false

export const NOTIFY_ME_EMAIL = 'aylablumberg06@gmail.com'
