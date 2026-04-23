# Ayla Unlocked

A paid course site. Next.js 14 + Supabase (auth/DB) + Stripe (payments) + Resend (email).

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Getting it live — exact order

Do these in order. None are optional.

### 1. Supabase — DB + Auth

1. Go to https://supabase.com, create a new project.
2. When it finishes provisioning, open **Settings → API**. You'll see three values:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → this is `SUPABASE_SERVICE_ROLE_KEY` (keep secret — server only)
3. Open **SQL Editor → New query**, paste everything from `supabase-schema.sql`, hit **Run**. This creates the `users` and `contact_submissions` tables.
4. Open **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` for dev; replace with your Vercel domain in prod.
   - **Redirect URLs**: add both `http://localhost:3000/api/auth/callback` and your production `https://yourdomain.com/api/auth/callback`.
5. Open **Authentication → Email Templates → Magic Link**. Paste the contents of `supabase-magic-link-template.html` into the message body. Set the subject to `Your Ayla Unlocked access link`.
6. (Optional but recommended) **Authentication → SMTP Settings**: enable custom SMTP with Resend:
   - Host: `smtp.resend.com`
   - Port: `465`
   - Username: `resend`
   - Password: your Resend API key (same one as `RESEND_API_KEY`)
   - Sender email: `hello@aylaunlocked.com` (you'll need to verify this domain in Resend first — step 4 below)
   - Sender name: `Ayla Unlocked`

### 2. Stripe — payments

1. Go to https://dashboard.stripe.com, log in (you already have an account).
2. **Developers → API keys**:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
   - Use **test mode** keys while you build, switch to live mode keys before launch.
3. **Product catalog → + Add product**:
   - Name: `Ayla Unlocked — Lifetime Access`
   - Pricing: **One-time**, **$39 USD**
   - Save. Click into the price, copy the price ID (starts with `price_...`) → this is `STRIPE_PRICE_ID`.
4. **Developers → Webhooks → Add endpoint**:
   - Endpoint URL: `https://yourdomain.com/api/stripe-webhook` (you can't add this until you've deployed at least once; for now use a placeholder, come back after deploying)
   - Events to send: just `checkout.session.completed`
   - Create → click the endpoint → reveal **Signing secret** → that's `STRIPE_WEBHOOK_SECRET`
5. For local testing, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe-webhook`. That command will print a temporary webhook signing secret — use it as `STRIPE_WEBHOOK_SECRET` in your `.env.local`.

### 3. Resend — transactional email

1. Sign up at https://resend.com (free tier is plenty).
2. **API Keys → Create API Key** → that's `RESEND_API_KEY`.
3. **Domains → Add Domain** → add `aylaunlocked.com` (or whatever your domain is). Follow the DNS instructions — they give you a few DNS records to add wherever you bought your domain (GoDaddy, etc.). Until the domain is verified, you can't send from `hello@aylaunlocked.com`. Until then, use `onboarding@resend.dev` as a placeholder `from` address.
4. The `from:` address in `app/api/contact/route.ts` is `hello@aylaunlocked.com`. If your domain is different, update that string.

### 4. Environment variables

Copy `.env.local` (already created for you) and fill in every value from steps 1–3. Do not commit this file — it's gitignored.

### 5. Deploy to Vercel

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   gh repo create ayla-unlocked --private --source=. --push
   ```
2. Go to https://vercel.com/new, import the `ayla-unlocked` repo.
3. Before clicking Deploy, expand **Environment Variables** and paste in every key from `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to your Vercel production domain (e.g. `https://ayla-unlocked.vercel.app` or your custom domain once pointed).
4. Deploy.
5. Come back to **Stripe → Webhooks** and set the endpoint URL to `https://yourdomain.com/api/stripe-webhook`. Copy the new signing secret back into Vercel's env vars as `STRIPE_WEBHOOK_SECRET`, then redeploy.
6. In **Supabase → Authentication → URL Configuration**, update:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: add `https://yourdomain.com/api/auth/callback`

### 6. Custom domain (optional)

1. Buy the domain (GoDaddy, Namecheap, wherever).
2. In Vercel: **Project → Settings → Domains → Add** → follow the DNS instructions.
3. Update `NEXT_PUBLIC_SITE_URL` to the new domain, redeploy.

---

## How the flow actually works

1. Visitor lands on `/` (public landing page).
2. Clicks **Get Access** → goes to `/unlock`.
3. Clicks the checkout button → `POST /api/create-checkout` creates a Stripe Checkout Session → redirect to Stripe.
4. Stripe redirects back to `/unlock?payment=success` after payment.
5. Stripe (independently) fires `checkout.session.completed` to `/api/stripe-webhook`. The handler upserts a row in `users` with `paid = true` by email.
6. On the success page, the user fills in their email + optional phone → `POST /api/signup` saves the phone and triggers Supabase magic link via `signInWithOtp`.
7. Email arrives (via Supabase SMTP → Resend). User clicks the magic link → `/api/auth/callback` exchanges the code for a session → checks `paid = true` → redirects to `/course`.
8. `/course` is protected by `middleware.ts`: if no session or `paid = false` (and email ≠ `aylablumberg06@gmail.com`), redirect to `/unlock`. Session lasts 5 days with auto-refresh.

---

## Quick file map

```
app/
  page.tsx                  → public landing
  unlock/page.tsx           → paygate (shows signup form after Stripe redirect)
  course/page.tsx           → protected course dashboard
  api/
    create-checkout/        → starts Stripe Checkout
    stripe-webhook/         → receives webhook, flips paid=true
    signup/                 → saves phone, fires magic link
    auth/callback/          → exchanges OTP code, routes user based on paid
    contact/                → saves to DB + sends email via Resend
components/
  ContactForm.tsx           → landing page contact form
  Paygate.tsx               → the /unlock page client component
  CourseDashboard.tsx       → the full course (converted from ayla-unlocked.html)
lib/
  supabase.ts               → browser, server, middleware, admin clients
  stripe.ts                 → Stripe SDK singleton
middleware.ts               → protects /course
supabase-schema.sql         → SQL to paste into Supabase
supabase-magic-link-template.html → magic link email template
```

---

## Owner override

The email `aylablumberg06@gmail.com` bypasses the paywall. This is hardcoded in:
- `middleware.ts` (for `/course` access)
- `app/api/auth/callback/route.ts` (for redirect after magic link)

---

## Design tokens

- Cream `#FDF6F0`
- Pink `#E8295C`
- Pink light `#FFE4ED`
- Dark `#1A1A1A`
- Fonts: Cormorant Garamond (serif), DM Sans (body)

Don't change these without updating the course dashboard too.
