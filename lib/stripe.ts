import Stripe from 'stripe'

// Let the SDK use its bundled API version by not passing apiVersion.
// We still get full types because the SDK's default generic matches the
// TypeScript bindings shipped with this version of the package.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 typescript: true,
})
