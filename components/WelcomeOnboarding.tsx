'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WelcomeOnboarding() {
  const router = useRouter()
  const [starting, setStarting] = useState(false)

  async function startCourse() {
    setStarting(true)
    try {
      await fetch('/api/onboard', { method: 'POST' })
    } catch {
      /* continue anyway */
    }
    router.push('/course')
  }

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-wide">
            Ayla <span className="text-pink italic">Unlocked</span>
          </Link>
          <span className="text-[10px] tracking-[2px] uppercase text-muted-light">You&apos;re in.</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 px-6 md:px-10 max-w-3xl mx-auto text-center relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[360px] rounded-full opacity-40 blur-3xl"
               style={{ background: 'radial-gradient(circle, #FFE4ED 0%, transparent 70%)' }} />
        </div>
        <div className="relative z-10">
          <div className="text-[10px] font-semibold tracking-[4px] uppercase text-pink mb-6">
            Congrats. You did the hardest part: starting.
          </div>
          <h1 className="font-serif italic text-[64px] md:text-[104px] leading-[0.95] tracking-tight mb-6 text-pink">
            Welcome in.
          </h1>
          <p className="text-lg md:text-xl text-mid leading-relaxed font-light max-w-xl mx-auto">
            Before you dive in, here&apos;s the five-second tour so you know what every
            button does. It&apos;s short. I promise.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-10 max-w-3xl mx-auto pb-12">
        <div className="grid md:grid-cols-2 gap-5">
          <Feature
            tag="Watch or read"
            title="Every lesson has a video + text"
            body="Press play if you want me explaining it to you. Prefer to skim? The text is right there. Both are the same thing. Pick whichever way your brain is working that day."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            }
          />
          <Feature
            tag="Highlight to save"
            title="Drag across any sentence"
            body="See a line that hits? Drag to select it. A pink pill pops up, hit it, and that quote lives in your Notes tab forever. Like highlighting a book, but it remembers for you."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="currentColor" opacity="0.25" />
              </svg>
            }
          />
          <Feature
            tag="Search anything"
            title={<>Hit <kbd>⌘K</kbd> to jump</>}
            body="Cmd+K (or Ctrl+K on Windows) opens a fast search bar. Type any word and it jumps straight to the lesson, prompt, or chat it lives in. Use this. It will save you SO much scrolling."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
          />
          <Feature
            tag="Save"
            title="Bookmark any lesson"
            body="See a star button on each lesson? Hit it to save it for later. Useful when you know you&apos;re going to need it again at 2am."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 17.3L5.8 21l1.6-7.3L2 8.8l7.4-.6L12 1.5l2.6 6.7 7.4.6-5.4 4.9L18.2 21 12 17.3z" fill="currentColor" />
              </svg>
            }
          />
          <Feature
            tag="Confused?"
            title="Flag anything that loses you"
            body="Tap the question mark if a lesson is unclear. This sends a signal to me directly so I know what to rewrite or re-explain. Zero judgment."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
                <path d="M9 9.5a3 3 0 1 1 4.5 2.6c-1 .5-1.5 1-1.5 2V15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="17.5" r="1" fill="currentColor" />
              </svg>
            }
          />
          <Feature
            tag="Take notes"
            title="Write next to each lesson"
            body="At the bottom of every lesson there&apos;s a notes box. Anything you type auto-saves. See all your notes together under &ldquo;Notes&rdquo; in the top nav."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="13" y2="17" />
              </svg>
            }
          />
          <Feature
            tag="Talk to me"
            title="The little chat button"
            body="Bottom right of every page. Ask anything about the course, Claude, or just life. It&apos;s me, basically. If the AI can&apos;t answer, it forwards straight to my inbox."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            }
          />
          <Feature
            tag="Your prompts"
            title="40 copy-paste prompts"
            body="Under &ldquo;Prompts&rdquo; in the top nav. These are the exact prompts I use daily. Steal any of them."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            }
          />
          <Feature
            tag="My real chats"
            title="Screenshots from my actual history"
            body="Receipts. Under &ldquo;Chats&rdquo; you&apos;ll find real messages I sent to Claude while building, including the unhinged ones."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            }
          />
          <Feature
            tag="Finish it"
            title="Get your certificate at the end"
            body="Get through all 29 lessons and I make you a real, personalized Ayla Unlocked certificate. It&rsquo;s dumb in the best way. Frame it. Post it. Put it on LinkedIn. You earned it."
            icon={
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.5 12.8 17 22l-5-3-5 3 1.5-9.2" />
              </svg>
            }
          />
        </div>
      </section>

      {/* HONEST NOTE */}
      <section className="px-6 md:px-10 max-w-2xl mx-auto pb-12">
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--pink-pale)] p-6 md:p-7">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">
            Quick heads-up
          </div>
          <p className="text-dark text-[15px] leading-relaxed font-light">
            The stars, question marks, notes, and chat messages you leave <strong>help me
            learn what&apos;s working and what&apos;s confusing</strong>. I look at this stuff weekly and
            rewrite the lessons that most people flag. You&apos;re not just taking the course,
            you&apos;re making it better for everyone after you.
          </p>
        </div>
      </section>

      {/* BOOKMARK / INSTALL */}
      <section className="px-6 md:px-10 max-w-2xl mx-auto pb-12">
        <div className="rounded-2xl bg-white border border-[color:var(--border)] p-6 md:p-7">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">
            Save this so you can come back
          </div>
          <p className="text-dark text-[15px] leading-relaxed font-light mb-4">
            You&rsquo;re going to want this open a lot. Two easy ways to come back fast:
          </p>
          <ul className="space-y-3 text-[14.5px] text-dark font-light">
            <li className="flex gap-3">
              <span className="text-pink shrink-0 mt-0.5">→</span>
              <span><strong>Bookmark this page.</strong> Press <code className="bg-[color:var(--pink-pale)] text-pink px-1.5 py-0.5 rounded font-mono text-[12px]">⌘D</code> on Mac or <code className="bg-[color:var(--pink-pale)] text-pink px-1.5 py-0.5 rounded font-mono text-[12px]">Ctrl+D</code> on Windows. Done.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-pink shrink-0 mt-0.5">→</span>
              <span><strong>Install it like an app.</strong> On your phone, open Safari/Chrome, tap share, pick <em>Add to Home Screen</em>. On desktop Chrome, click the little install icon in the URL bar. Now it opens without a browser bar, like a real app.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ADDICTION WARNING */}
      <section className="px-6 md:px-10 max-w-2xl mx-auto pb-12">
        <div className="rounded-2xl border-2 border-pink bg-white p-6 md:p-7 relative">
          <div className="absolute -top-3 left-6 bg-pink text-white text-[10px] tracking-[2.5px] uppercase font-semibold px-3 py-1 rounded-full shadow-md">
            ⚠ Fair warning
          </div>
          <div className="pt-3">
            <h3 className="font-serif italic text-2xl md:text-3xl mb-3 text-dark leading-tight">
              This stuff gets weirdly addicting.
            </h3>
            <p className="text-dark text-[15px] leading-relaxed font-light mb-3">
              I&apos;ve stayed up until 2 AM more nights than I can count. I&apos;ve left my laptop
              open on the passenger seat of my car, running agents off a hotspot, because I didn&apos;t
              want to wait until I got home.
            </p>
            <p className="text-mid text-[14px] leading-relaxed font-light italic">
              Pace yourself. Drink water. Go to bed. You won&apos;t, but I&apos;m telling you anyway.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 max-w-xl mx-auto pb-20 text-center">
        <button
          onClick={startCourse}
          disabled={starting}
          className="magnetic bg-pink text-white text-xs tracking-[1.5px] uppercase font-medium px-10 py-5 rounded-full hover:bg-[#C51F4E] shadow-xl shadow-pink/25 disabled:opacity-60"
        >
          {starting ? 'Opening the course…' : "Let's go →"}
        </button>
        <p className="text-[12px] text-muted-light mt-5 italic">
          You can bounce in and out anytime. We&apos;ll drop you right back where you left off.
        </p>
      </section>
    </main>
  )
}

function Feature({
  tag, title, body, icon,
}: { tag: string; title: React.ReactNode; body: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6 relative overflow-hidden">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-full bg-pink-light text-pink flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-1">{tag}</div>
          <h3 className="font-serif text-xl text-dark mb-1 leading-tight">{title}</h3>
          <p className="text-[14px] text-mid leading-relaxed font-light">{body}</p>
        </div>
      </div>
    </div>
  )
}
