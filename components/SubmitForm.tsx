'use client'

import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { useState } from 'react'

export default function SubmitForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [err, setErr] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErr(null)
    const fd = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      const r = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: fd.get('student_name'),
          project_name: fd.get('project_name'),
          description: fd.get('description'),
          project_url: fd.get('project_url'),
          screenshot_url: fd.get('screenshot_url'),
        }),
      })
      const out = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(out?.error || 'Something went wrong.')
      setStatus('sent')
    } catch (e: any) {
      setErr(e?.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <main className="min-h-screen bg-cream text-dark flex flex-col">
        <Nav />
        <section className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-lg text-center">
            <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">Got it</div>
            <h1 className="font-serif text-5xl md:text-6xl italic leading-[1.05] mb-4">Submitted.</h1>
            <p className="text-mid font-light leading-relaxed mb-8">
              I&rsquo;ll take a look. If it&rsquo;s cool, I&rsquo;m posting it on my TikTok
              <span className="text-pink font-medium"> @aylablumberg.ai</span>. Keep building.
            </p>
            <Link
              href="/course"
              className="magnetic inline-block bg-pink text-white text-xs tracking-[1.5px] uppercase font-medium px-8 py-4 rounded-full"
            >
              Back to the course
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-cream text-dark">
      <Nav />
      <section className="max-w-2xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Show me what you built</div>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-5">Show off.</h1>
        <p className="text-mid text-lg font-light mb-10 max-w-xl">
          Built something in this course? <span className="text-dark font-medium">Drop the link.</span>{' '}
          If it&rsquo;s cool, I&rsquo;ll post it on my TikTok{' '}
          <span className="text-pink font-medium">@aylablumberg.ai</span> and tag you. No pressure,
          no judgment. I post the weird ones too.
        </p>

        <form onSubmit={submit} className="space-y-5">
          <Field label="Your name (or handle)">
            <input name="student_name" placeholder="So I can tag you" className={input} />
          </Field>
          <Field label="Project name" required>
            <input name="project_name" required maxLength={120} placeholder="What is it called?" className={input} />
          </Field>
          <Field label="What is it / what does it do" required>
            <textarea name="description" required rows={5} maxLength={2000} placeholder="A sentence or two. Talk to me like a friend." className={input + ' resize-none'} />
          </Field>
          <Field label="Live URL">
            <input name="project_url" type="url" placeholder="https://yourproject.com" className={input} />
            <p className={helpText}>Drop the link anyone can click. Skip if it&rsquo;s not public yet.</p>
          </Field>
          <Field label="Screenshot URL">
            <input name="screenshot_url" type="url" placeholder="https://... (Instagram post, Imgur, Dropbox, whatever)" className={input} />
            <p className={helpText}>Optional. A screenshot helps me decide whether to feature it.</p>
          </Field>

          {err && <p className="text-sm text-pink">{err}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="magnetic w-full bg-pink text-white px-8 py-4 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending…' : 'Submit my build'}
          </button>
          <p className="text-[11px] text-muted-light text-center italic">
            By submitting you&rsquo;re cool with me potentially posting it to{' '}
            <a
              href="https://www.tiktok.com/@aylablumberg.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink underline"
            >
              @aylablumberg.ai
            </a>.
          </p>
        </form>
      </section>
    </main>
  )
}

const input =
  'w-full px-4 py-3 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none text-dark placeholder:text-muted-light'
const helpText = 'text-[11px] text-muted-light mt-2'

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-[2px] uppercase text-pink mb-2">
        {label}{required && <span className="text-pink">*</span>}
      </label>
      {children}
    </div>
  )
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/course" className="font-serif text-lg tracking-wide">
          <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic">Unlocked</span>
        </Link>
        <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
          <Link href="/course" className="text-mid hover:text-pink">Course</Link>
          <Link href="/built" className="text-mid hover:text-pink">What students built</Link>
        </div>
      </div>
    </nav>
  )
}
