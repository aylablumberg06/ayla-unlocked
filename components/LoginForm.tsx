'use client'

import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
 const router = useRouter()
 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')
 const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
 const [err, setErr] = useState<string | null>(null)
 const [resetSent, setResetSent] = useState(false)

 async function submit(e: React.FormEvent) {
 e.preventDefault()
 if (!email.includes('@')) { setErr('Drop a valid email.'); return }
 if (!password) { setErr('Password required.'); return }
 setErr(null)
 setStatus('sending')
 try {
 const r = await fetch('/api/login', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
 })
 const out = await r.json().catch(() => ({}))
 if (!r.ok) throw new Error(out?.error || 'Something went wrong.')
 router.push(out?.redirect || '/course')
 } catch (e: any) {
 setErr(e?.message || 'Something went wrong.')
 setStatus('error')
 }
 }

 async function sendReset() {
 if (!email.includes('@')) { setErr('Type your email above first.'); return }
 setErr(null)
 try {
 // Magic link fallback via the old signup endpoint? We'll hit the Supabase
 // recovery endpoint instead via a new API once we add it. For now, fall
 // back to magic link.
 const r = await fetch('/api/password-reset', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: email.trim().toLowerCase() }),
 })
 if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Could not send reset.')
 setResetSent(true)
 } catch (e: any) {
 setErr(e?.message || 'Could not send reset email.')
 }
 }

 return (
 <main className="min-h-screen bg-cream text-dark flex flex-col">
 <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
 <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
 <Link href="/" className="font-serif text-lg tracking-wide">
 <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic">Unlocked</span>
 </Link>
 <Link href="/" className="text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink">&larr; Home</Link>
 </div>
 </nav>

 <section className="flex-1 flex items-center justify-center px-6 py-20">
 <div className="w-full max-w-md">
 {resetSent ? (
 <div className="text-center">
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">Reset sent</div>
 <h1 className="font-serif text-5xl italic leading-[1.05] mb-4">Check your inbox.</h1>
 <p className="text-mid font-light leading-relaxed">
 We sent a reset link to <span className="text-dark">{email}</span>. Click it and
 you&apos;ll be prompted to set a new password.
 </p>
 <p className="text-[11px] tracking-[2px] uppercase text-pink mt-6 font-semibold">
 Usually arrives in about 10 seconds
 </p>
 <button
 onClick={() => { setResetSent(false); setStatus('idle') }}
 className="mt-8 text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink"
 >
 Back to log in
 </button>
 </div>
 ) : (
 <>
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4 text-center">
 Welcome back
 </div>
 <h1 className="font-serif text-5xl italic leading-[1.05] mb-3 text-center">Log in.</h1>
 <p className="text-mid font-light text-center mb-10">
 Email and password. We&apos;ll drop you at the exact lesson you left off on.
 </p>

 <form onSubmit={submit} className="space-y-4">
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Email</label>
 <input
 type="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none"
 placeholder="you@email.com"
 autoComplete="email"
 />
 </div>
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Password</label>
 <input
 type="password"
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none"
 placeholder="••••••••"
 autoComplete="current-password"
 />
 </div>
 {err && <p className="text-sm text-pink">{err}</p>}
 <button
 type="submit"
 disabled={status === 'sending'}
 className="magnetic w-full bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] disabled:opacity-50"
 >
 {status === 'sending' ? 'Logging you in…' : 'Log in'}
 </button>
 </form>

 <div className="text-center mt-6">
 <button
 type="button"
 onClick={sendReset}
 className="text-[12px] text-mid hover:text-pink underline"
 >
 Forgot password? Email me a reset link.
 </button>
 </div>

 <p className="text-[12px] text-muted-light mt-8 text-center">
 Don&apos;t have access yet?{' '}
 <Link href="/unlock" className="text-pink hover:underline">Buy the course, $39</Link>
 </p>
 </>
 )}
 </div>
 </section>
 </main>
 )
}
