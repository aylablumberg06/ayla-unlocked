'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

function SignupForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    const fd = new FormData(e.currentTarget)
    try {
      const r = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(fd.get('email') || '').trim().toLowerCase(),
          phone: String(fd.get('phone') || '').trim(),
        }),
      })
      if (!r.ok) {
        const { error: err } = await r.json().catch(() => ({ error: 'Something went wrong.' }))
        throw new Error(err || 'Something went wrong.')
      }
      setStatus('sent')
    } catch (err: any) {
      setStatus('error')
      setError(err?.message || 'Something went wrong.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--pink-pale)] p-10 text-center">
        <p className="font-serif text-3xl italic text-dark mb-3">Check your email.</p>
        <p className="text-mid leading-relaxed">Your access link is on its way. Click it and you&apos;re in.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white/50 p-8 md:p-10">
      <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Payment confirmed</div>
      <h2 className="font-serif text-3xl md:text-4xl mb-3">Now let&apos;s get you in.</h2>
      <p className="text-mid font-light mb-8">
        Drop your email and we&apos;ll send a magic link to log in. That&apos;s your permanent access &mdash;
        good for life.
      </p>
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Phone</label>
          <input
            name="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none"
            placeholder="(optional)"
          />
          <p className="text-[11px] text-muted-light mt-2">Optional &mdash; backup contact in case you ever lose access to your email.</p>
        </div>
        {error && <p className="text-sm text-pink">{error}</p>}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] transition disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : 'Send me my link'}
        </button>
      </form>
    </div>
  )
}

function CheckoutCard() {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function goCheckout() {
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/create-checkout', { method: 'POST' })
      const { url, error } = await r.json()
      if (error) throw new Error(error)
      if (url) window.location.href = url
    } catch (e: any) {
      setErr(e?.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white/50 p-8 md:p-10">
      <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Lifetime Access</div>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-serif text-6xl md:text-7xl text-dark">$39</span>
        <span className="text-sm text-muted-light tracking-[1px] uppercase">one-time</span>
      </div>
      <ul className="space-y-3 mb-8 text-dark">
        <li className="flex gap-3"><span className="text-pink">&#10003;</span>20 lessons, no fluff</li>
        <li className="flex gap-3"><span className="text-pink">&#10003;</span>Interactive idea generator quiz</li>
        <li className="flex gap-3"><span className="text-pink">&#10003;</span>Full glossary in plain English</li>
        <li className="flex gap-3"><span className="text-pink">&#10003;</span>Video walkthroughs (coming soon)</li>
        <li className="flex gap-3"><span className="text-pink">&#10003;</span>Lifetime access &mdash; every update, free</li>
      </ul>
      {err && <p className="text-sm text-pink mb-3">{err}</p>}
      <button
        onClick={goCheckout}
        disabled={loading}
        className="w-full bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] transition disabled:opacity-50"
      >
        {loading ? 'Redirecting…' : 'Get Access &mdash; $39'}
      </button>
      <p className="text-[11px] text-muted-light mt-4 text-center">Secure checkout via Stripe</p>
    </div>
  )
}

export default function Paygate() {
  const params = useSearchParams()
  const showSignup = params.get('payment') === 'success'

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.88)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <a href="/" className="font-serif text-lg tracking-wide">
            ayla <span className="text-pink italic">unlocked</span>
          </a>
          <a href="/" className="text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink">&larr; Back</a>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 md:px-10 max-w-4xl mx-auto">
        {showSignup ? (
          <SignupForm />
        ) : (
          <>
            <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">Get Access</div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              One payment. <span className="italic">Forever yours.</span>
            </h1>
            <p className="text-lg text-mid font-light mb-12 max-w-xl">
              $39 gets you the entire course, permanently. No subscription, no upsells, no drip
              content. Pay once. Learn at your pace. Build whatever you want.
            </p>
            <div className="grid md:grid-cols-1 gap-6 max-w-xl">
              <CheckoutCard />
            </div>
            <div className="mt-12 p-6 rounded-xl bg-[color:var(--pink-pale)] border-l-2 border-pink max-w-xl">
              <p className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">What happens next</p>
              <ol className="text-sm text-dark space-y-2 leading-relaxed">
                <li>1. You pay via Stripe (secure hosted checkout).</li>
                <li>2. You drop your email on the next screen.</li>
                <li>3. We send you a magic link. Click it and you&apos;re in.</li>
                <li>4. Access never expires.</li>
              </ol>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
