'use client'

import { useState } from 'react'
import BrandLogo from '@/components/BrandLogo'
import { useSearchParams } from 'next/navigation'
import { IS_LIVE_FOR_SALE, NOTIFY_ME_EMAIL } from '@/lib/site-state'

function SignupForm({ sessionId }: { sessionId?: string }) {
 const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
 const [sentTo, setSentTo] = useState('')
 const [error, setError] = useState<string | null>(null)

 async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault()
 setError(null)
 const fd = new FormData(e.currentTarget)
 const email = String(fd.get('email') || '').trim().toLowerCase()
 const phone = String(fd.get('phone') || '').trim()

 setStatus('sending')
 try {
 const r = await fetch('/api/signup', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email, phone, session_id: sessionId }),
 })
 const out = await r.json().catch(() => ({}))
 if (!r.ok) throw new Error(out?.error || 'Something went wrong.')
 setSentTo(email)
 setStatus('sent')
 } catch (err: any) {
 setStatus('error')
 setError(err?.message || 'Something went wrong.')
 }
 }

 if (status === 'sent') {
 return (
 <div className="rounded-2xl border border-[color:var(--border)] bg-white/50 p-8 md:p-10 text-center">
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">Link sent</div>
 <h2 className="font-serif text-4xl md:text-5xl italic leading-[1.05] mb-4">Check your inbox.</h2>
 <p className="text-mid font-light leading-relaxed">
 We sent a magic link to <span className="text-dark">{sentTo}</span>. Click it and
 you&apos;re in the course. You stay signed in on this device, no password needed.
 </p>
 <p className="text-[11px] tracking-[2px] uppercase text-pink mt-6 font-semibold">
 Usually arrives in about 10 seconds
 </p>
 </div>
 )
 }

 return (
 <div className="rounded-2xl border border-[color:var(--border)] bg-white/50 p-8 md:p-10">
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Payment confirmed</div>
 <h2 className="font-serif text-3xl md:text-4xl mb-3">One last step.</h2>
 <p className="text-mid font-light mb-8">
 Drop your email. We&apos;ll send you a magic link, you click it, and you&apos;re in for good. No password to remember.
 </p>
 <form onSubmit={onSubmit} className="space-y-5">
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Email</label>
 <input
 name="email"
 type="email"
 required
 autoComplete="email"
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none"
 placeholder="you@email.com"
 />
 <p className="text-[11px] text-muted-light mt-2">Must match the email you used at checkout.</p>
 </div>
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Phone</label>
 <input
 name="phone"
 type="tel"
 autoComplete="tel"
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none"
 placeholder="(optional)"
 />
 <p className="text-[11px] text-muted-light mt-2">Optional, backup contact in case you ever lose your email.</p>
 </div>
 {error && <p className="text-sm text-pink">{error}</p>}
 <button
 type="submit"
 disabled={status === 'sending'}
 className="magnetic w-full bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] disabled:opacity-50"
 >
 {status === 'sending' ? 'Sending your link…' : 'Send me my magic link'}
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

 // While the course isn't officially live, replace the Stripe checkout
 // with a notify-me-when-it-opens email link. Owner can still preview via
 // /api/owner-login. Flip IS_LIVE_FOR_SALE in lib/site-state.ts to re-enable.
 if (!IS_LIVE_FOR_SALE) {
 return (
 <div className="rounded-2xl border-2 border-pink bg-white/50 p-8 md:p-10 relative overflow-hidden">
 <div className="absolute -top-3 left-6 bg-pink text-white text-[10px] tracking-[2.5px] uppercase font-semibold px-3 py-1 rounded-full shadow-md">
 Coming soon
 </div>
 <div className="pt-3">
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Almost ready</div>
 <h2 className="font-serif italic text-3xl md:text-4xl mb-4 text-dark leading-tight">
 Ayla Unlocked is still being polished.
 </h2>
 <p className="text-mid font-light mb-6 leading-relaxed text-[15px]">
 We&rsquo;re finishing the last screenshots and double-checking everything before opening the doors. Drop your email and you&rsquo;ll be the first to know the second it goes live (probably this week).
 </p>
 <a
 href={`mailto:${NOTIFY_ME_EMAIL}?subject=Notify%20me%20when%20Ayla%20Unlocked%20opens&body=Tell%20me%20the%20moment%20it%27s%20live.`}
 className="block w-full text-center bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] transition"
 >
 Notify me when it opens
 </a>
 <p className="text-[11px] text-muted-light mt-4 text-center">Or check back soon, the price stays $79.</p>
 </div>
 </div>
 )
 }

 return (
 <div className="rounded-2xl border border-[color:var(--border)] bg-white/50 p-8 md:p-10">
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Lifetime Access</div>
 <div className="flex items-baseline gap-2 mb-6">
 <span className="font-serif text-6xl md:text-7xl text-dark">$79</span>
 <span className="text-sm text-muted-light tracking-[1px] uppercase">one-time</span>
 </div>
 <ul className="space-y-3 mb-8 text-dark">
 <li className="flex gap-3"><span className="text-pink">&#10003;</span>29 lessons, no tech jargon unexplained</li>
 <li className="flex gap-3"><span className="text-pink">&#10003;</span>Interactive idea generator quiz</li>
 <li className="flex gap-3"><span className="text-pink">&#10003;</span>Full glossary in plain English</li>
 <li className="flex gap-3"><span className="text-pink">&#10003;</span>Video walkthroughs</li>
 <li className="flex gap-3"><span className="text-pink">&#10003;</span>Lifetime access, every update, free</li>
 </ul>
 {err && <p className="text-sm text-pink mb-3">{err}</p>}
 <button
 onClick={goCheckout}
 disabled={loading}
 className="w-full bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] transition disabled:opacity-50"
 >
 {loading ? 'Redirecting…' : 'Get Access · $79'}
 </button>
 <p className="text-[11px] text-muted-light mt-4 text-center">Secure checkout via Stripe</p>
 </div>
 )
}

export default function Paygate() {
 const params = useSearchParams()
 const showSignup = params.get('payment') === 'success'
 const sessionId = params.get('session_id') || undefined

 return (
 <main className="min-h-screen bg-cream text-dark">
 <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.88)] border-b border-[color:var(--border)]">
 <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
 <a href="/" className="font-serif text-lg tracking-wide">
 <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic">Unlocked</span>
 </a>
 <a href="/" className="text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink">&larr; Back</a>
 </div>
 </nav>

 <section className="pt-32 pb-20 px-6 md:px-10 max-w-4xl mx-auto">
 {showSignup ? (
 <SignupForm sessionId={sessionId} />
 ) : (
 <>
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">Get Access</div>
 <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
 One payment. <span className="italic">Forever yours.</span>
 </h1>
 <p className="text-lg text-mid font-light mb-12 max-w-xl">
 $79 gets you the entire course, permanently. No subscription, no upsells, no drip
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
