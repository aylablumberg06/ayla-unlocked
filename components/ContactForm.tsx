'use client'

import { useState, FormEvent } from 'react'

export default function ContactForm() {
 const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
 const [error, setError] = useState<string | null>(null)

 async function onSubmit(e: FormEvent<HTMLFormElement>) {
 e.preventDefault()
 setStatus('sending')
 setError(null)
 const formData = new FormData(e.currentTarget)
 const payload = {
 name: String(formData.get('name') || ''),
 email: String(formData.get('email') || ''),
 message: String(formData.get('message') || ''),
 }
 try {
 const r = await fetch('/api/contact', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload),
 })
 if (!r.ok) {
 const { error: err } = await r.json().catch(() => ({ error: 'Something went wrong.' }))
 throw new Error(err || 'Something went wrong.')
 }
 setStatus('sent')
 e.currentTarget.reset()
 } catch (err: any) {
 setStatus('error')
 setError(err?.message || 'Something went wrong.')
 }
 }

 if (status === 'sent') {
 return (
 <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--pink-pale)] p-8 text-center">
 <p className="font-serif text-3xl italic text-dark mb-2">thanks for writing in.</p>
 <p className="text-mid text-sm">I read every message. I&apos;ll get back to you soon.</p>
 </div>
 )
 }

 return (
 <form onSubmit={onSubmit} className="space-y-4">
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Name</label>
 <input
 name="name"
 required
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white/60 focus:border-pink focus:outline-none text-dark placeholder:text-muted-light font-sans"
 placeholder="Your name"
 />
 </div>
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Email</label>
 <input
 name="email"
 type="email"
 required
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white/60 focus:border-pink focus:outline-none text-dark placeholder:text-muted-light font-sans"
 placeholder="you@email.com"
 />
 </div>
 <div>
 <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">Message</label>
 <textarea
 name="message"
 required
 rows={5}
 className="w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white/60 focus:border-pink focus:outline-none text-dark placeholder:text-muted-light font-sans resize-none"
 placeholder="What's up?"
 />
 </div>
 {error && <p className="text-sm text-pink">{error}</p>}
 <button
 type="submit"
 disabled={status === 'sending'}
 className="w-full md:w-auto bg-pink text-white px-8 py-3 rounded-full text-sm tracking-[1px] uppercase font-medium hover:bg-[#C51F4E] transition disabled:opacity-50"
 >
 {status === 'sending' ? 'Sending…' : 'Send'}
 </button>
 </form>
 )
}
