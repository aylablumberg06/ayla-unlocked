'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PROMPTS, CATEGORIES, type PromptCategory } from '@/lib/prompts'

export default function PromptLibrary() {
  const [active, setActive] = useState<PromptCategory | 'all'>('all')
  const [q, setQ] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    return PROMPTS.filter((p) => {
      if (active !== 'all' && p.category !== active) return false
      if (!qq) return true
      return (
        p.title.toLowerCase().includes(qq) ||
        p.body.toLowerCase().includes(qq) ||
        (p.tip ?? '').toLowerCase().includes(qq)
      )
    })
  }, [active, q])

  async function copy(text: string, id: string) {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1400)
  }

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/course" className="font-serif text-lg tracking-wide">
            ayla <span className="text-pink italic">unlocked</span>
          </Link>
          <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
            <Link href="/course" className="text-mid hover:text-pink">Course</Link>
            <Link href="/course/real-chats" className="text-mid hover:text-pink">Real chats</Link>
            <Link href="/course/notes" className="text-mid hover:text-pink">My notes</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-16">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Prompt Library</div>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-4">The prompts I actually use.</h1>
        <p className="text-mid text-lg font-light mb-10 max-w-2xl">
          These are copy-paste ready. Grab one, drop it into Claude, swap the [brackets] for your stuff, and go.
        </p>

        {/* search */}
        <div className="mb-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search prompts..."
            className="w-full px-5 py-3.5 rounded-full border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none text-[15px]"
          />
        </div>

        {/* categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive('all')}
            className={`px-4 py-2 rounded-full text-[12px] tracking-[0.5px] border transition ${
              active === 'all'
                ? 'bg-pink text-white border-pink'
                : 'bg-white text-dark border-[color:var(--border)] hover:border-pink hover:text-pink'
            }`}
          >
            All ({PROMPTS.length})
          </button>
          {CATEGORIES.map((c) => {
            const count = PROMPTS.filter((p) => p.category === c.id).length
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-4 py-2 rounded-full text-[12px] tracking-[0.5px] border transition ${
                  active === c.id
                    ? 'bg-pink text-white border-pink'
                    : 'bg-white text-dark border-[color:var(--border)] hover:border-pink hover:text-pink'
                }`}
              >
                {c.label} ({count})
              </button>
            )
          })}
        </div>

        {active !== 'all' && (
          <p className="text-[13px] text-mid italic mb-8 max-w-2xl font-light">
            {CATEGORIES.find((c) => c.id === active)?.desc}
          </p>
        )}

        {/* list */}
        <div className="space-y-4">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[color:var(--border)] p-6 md:p-7">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-serif text-xl md:text-2xl text-dark leading-tight">{p.title}</h3>
                <button
                  onClick={() => copy(p.body, p.id)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[11px] tracking-[1.5px] uppercase transition ${
                    copied === p.id
                      ? 'bg-pink text-white'
                      : 'bg-pink-light text-pink hover:bg-pink hover:text-white'
                  }`}
                >
                  {copied === p.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="bg-[color:var(--pink-pale)] rounded-xl p-4 font-sans text-[13.5px] leading-relaxed text-dark whitespace-pre-wrap break-words border border-[color:var(--border)]">{p.body}</pre>
              {p.tip && (
                <div className="mt-3 pl-4 border-l-2 border-pink text-[13px] text-mid italic font-light">
                  <span className="text-[10px] not-italic tracking-[1.5px] uppercase text-pink font-semibold block mb-1">Why it works</span>
                  {p.tip}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-mid">
              <p className="font-serif italic text-2xl mb-2">No prompts match.</p>
              <p className="text-sm">Try a different search or category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
