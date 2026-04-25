'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PROMPTS } from '@/lib/prompts'
import { REAL_CHATS } from '@/lib/real-chats'

// Minimal lesson index (title + tag only). Keeping it decoupled so we don't
// re-export the heavy lessons array.
const LESSONS = [
  { i: 0, tag: 'Welcome', title: "Hi. I'm Ayla." },
  { i: 1, tag: '01 What Claude Is', title: 'What Claude actually is' },
  { i: 2, tag: '02 What Claude Can Do', title: 'What Claude can do' },
  { i: 3, tag: '03 The Mindset', title: 'Claude is not Google' },
  { i: 4, tag: '04 The Big Divide', title: 'Everyone thinks AI is a chatbot' },
  { i: 5, tag: '05 Imposter Syndrome', title: "You're not behind. Nobody is." },
  { i: 6, tag: '06 Setup', title: "Let's get you set up" },
  { i: 7, tag: '07 Pricing Tiers', title: 'Free vs. Pro vs. Max' },
  { i: 8, tag: '08 Grammar? Never.', title: 'Claude does not care about grammar' },
  { i: 9, tag: '09 Just Yap', title: 'You talk. Claude builds.' },
  { i: 10, tag: "10 When It's Wrong", title: 'When Claude gets it wrong' },
  { i: 11, tag: '11 Stay Organized', title: 'Staying organized' },
  { i: 12, tag: '12 Get an Idea', title: 'First you need an idea' },
  { i: 13, tag: '13 When Not to AI', title: 'When NOT to use AI' },
  { i: 14, tag: '14 The Four Modes', title: 'Chat, Code, Cowork, and Chrome extension' },
  { i: 15, tag: '15 HTML Files', title: 'HTML files, explained' },
  { i: 16, tag: '16 Deploying', title: 'Homebrew. GitHub. Vercel.' },
  { i: 17, tag: '17 Terminal', title: 'Terminal, demystified' },
  { i: 18, tag: '18 API Keys', title: 'API keys' },
  { i: 19, tag: '19 Real APIs', title: 'Gmail, Apify, MCPs, Connectors' },
  { i: 20, tag: '20 Selling Online', title: 'Selling online with Stripe' },
  { i: 21, tag: '21 Stripe Walkthrough', title: 'Stripe step-by-step' },
  { i: 22, tag: '22 Your First Client', title: 'How to find your first paying client' },
  { i: 23, tag: '23 Proposal vs Contract', title: 'Proposal vs. contract' },
  { i: 24, tag: '24 Agents', title: 'Agents, the next level' },
  { i: 25, tag: '25 Claude on My Phone', title: 'How I use Claude on my phone' },
  { i: 26, tag: '26 A Day in My Life', title: 'A day in my chaotic AI life' },
  { i: 27, tag: '27 Favorite Mistakes', title: 'My 5 favorite mistakes' },
  { i: 28, tag: '28 My Top Prompts', title: 'My top 10 daily prompts' },
]

type Hit =
  | { kind: 'lesson'; label: string; sub: string; href: string; score: number }
  | { kind: 'prompt'; label: string; sub: string; href: string; score: number }
  | { kind: 'chat'; label: string; sub: string; href: string; score: number }
  | { kind: 'page'; label: string; sub: string; href: string; score: number }

const PAGES = [
  { label: 'My saved & notes', sub: 'Highlights + bookmarks + notes', href: '/course/notes' },
  { label: 'Prompt library', sub: '40+ copy-paste prompts', href: '/course/prompts' },
  { label: 'My real chats with Claude', sub: 'Unfiltered receipts', href: '/course/real-chats' },
  { label: 'Submit your build', sub: "Show Ayla what you made", href: '/course/submit' },
  { label: 'What students built', sub: 'Public showcase', href: '/built' },
  { label: 'Glossary', sub: 'Open the dictionary', href: '/course#glossary' },
]

function score(text: string, q: string): number {
  const t = text.toLowerCase()
  const qq = q.toLowerCase()
  if (!qq) return 0
  if (t === qq) return 100
  if (t.startsWith(qq)) return 80
  if (t.includes(qq)) return 40
  return 0
}

export default function CmdKSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30)
    } else {
      setQ('')
      setCursor(0)
    }
  }, [open])

  const hits: Hit[] = useMemo(() => {
    const qq = q.trim()
    if (!qq) {
      // default suggestions
      return [
        ...PAGES.map((p) => ({ kind: 'page' as const, label: p.label, sub: p.sub, href: p.href, score: 0 })),
      ].slice(0, 8)
    }
    const out: Hit[] = []
    LESSONS.forEach((l) => {
      const s = Math.max(score(l.tag, qq), score(l.title, qq))
      if (s > 0) out.push({ kind: 'lesson', label: l.title, sub: l.tag, href: `/course?lesson=${l.i}`, score: s + 5 })
    })
    PROMPTS.forEach((p) => {
      const s = Math.max(score(p.title, qq), score(p.body, qq) - 10, score(p.tip ?? '', qq) - 10)
      if (s > 0) out.push({ kind: 'prompt', label: p.title, sub: p.category, href: `/course/prompts`, score: s })
    })
    REAL_CHATS.forEach((c) => {
      const s = Math.max(
        score(c.title, qq),
        score(c.context, qq) - 5,
        ...c.messages.map((m) => score(m.text, qq) - 10),
      )
      if (s > 0) out.push({ kind: 'chat', label: c.title, sub: 'Real chat', href: `/course/real-chats`, score: s })
    })
    PAGES.forEach((p) => {
      const s = Math.max(score(p.label, qq), score(p.sub, qq) - 5)
      if (s > 0) out.push({ kind: 'page', label: p.label, sub: p.sub, href: p.href, score: s })
    })
    return out.sort((a, b) => b.score - a.score).slice(0, 12)
  }, [q])

  function go(h: Hit) {
    setOpen(false)
    router.push(h.href)
    // If we're already on /course and just navigating to a different lesson,
    // Next.js may not remount the page. Notify CourseDashboard to re-read the URL.
    if (h.kind === 'lesson' && typeof window !== 'undefined' && window.location.pathname.startsWith('/course')) {
      // Defer to next tick so router.push has a chance to update the URL
      setTimeout(() => window.dispatchEvent(new Event('au:lesson-jump')), 0)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, hits.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      const h = hits[cursor]
      if (h) go(h)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[500] bg-black/35 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[color:var(--border)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[color:var(--border)] flex items-center gap-3">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-pink" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setCursor(0) }}
            onKeyDown={onKeyDown}
            placeholder="Search lessons, prompts, chats…"
            className="flex-1 bg-transparent outline-none text-[15px] placeholder:text-muted-light"
          />
          <span className="text-[10px] tracking-[1.5px] uppercase text-muted-light bg-[color:var(--pink-pale)] px-2 py-1 rounded">Esc</span>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {hits.length === 0 ? (
            <div className="text-center py-16 text-mid">
              <p className="font-serif italic text-2xl mb-1">Nothing matches.</p>
              <p className="text-sm text-muted-light">Try a different keyword.</p>
            </div>
          ) : (
            hits.map((h, i) => (
              <button
                key={`${h.kind}-${h.href}-${i}`}
                onMouseEnter={() => setCursor(i)}
                onClick={() => go(h)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                  cursor === i ? 'bg-[color:var(--pink-pale)]' : 'bg-white'
                }`}
              >
                <span className="text-[9px] tracking-[1.5px] uppercase text-pink bg-pink-light px-2 py-1 rounded shrink-0 w-16 text-center">
                  {h.kind}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-dark truncate">{h.label}</div>
                  <div className="text-[12px] text-muted-light truncate">{h.sub}</div>
                </div>
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-pink" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-[color:var(--border)] text-[11px] text-muted-light flex items-center justify-between">
          <span><kbd className="px-1.5 py-0.5 bg-[color:var(--pink-pale)] rounded mr-1">↑↓</kbd> navigate</span>
          <span><kbd className="px-1.5 py-0.5 bg-[color:var(--pink-pale)] rounded mr-1">⏎</kbd> open</span>
          <span><kbd className="px-1.5 py-0.5 bg-[color:var(--pink-pale)] rounded mr-1">⌘K</kbd> toggle</span>
        </div>
      </div>
    </div>
  )
}
