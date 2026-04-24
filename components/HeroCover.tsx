'use client'

import Link from 'next/link'
import { useState } from 'react'
import VideoPlayer from '@/components/VideoPlayer'
import { TOTAL_COMBINED_SEC, formatMinutes } from '@/lib/estimates'

/**
 * HERO COVER, full-height, cinematic, video-ready.
 * When you have a welcome video, drop the file into /public/hero-video.mp4
 * and the "Play intro" button will play it in a modal.
 */
export default function HeroCover() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-20 pb-16 overflow-hidden">
      {/* soft ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-[10%] -left-32 w-[540px] h-[540px] rounded-full opacity-30 blur-3xl"
             style={{ background: 'radial-gradient(circle, #FFB3C6 0%, transparent 60%)' }} />
        <div className="absolute bottom-[-10%] -right-32 w-[640px] h-[640px] rounded-full opacity-40 blur-3xl"
             style={{ background: 'radial-gradient(circle, #FFE4ED 0%, transparent 60%)' }} />
        <div className="absolute top-[40%] right-[20%] w-[320px] h-[320px] rounded-full opacity-25 blur-3xl"
             style={{ background: 'radial-gradient(circle, #E8295C 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* tiny eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12 bg-pink" />
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink">A course by Ayla Blumberg &middot; 2026</div>
        </div>

        {/* title, hero */}
        <h1 className="font-serif text-[72px] md:text-[148px] leading-[0.9] tracking-tight mb-6 md:mb-8 mt-2">
          Ayla <span className="italic text-pink">Unlocked</span>.
        </h1>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div>
            <p className="text-base md:text-lg leading-relaxed text-mid font-light mb-6">
              I&apos;ve never taken a coding class or watched a YouTube tutorial. I&apos;m 19, building
              two AI businesses, and starting to get hired to make AI agent teams for companies.
              I built this course based on what I learned in a month to teach you exactly what I know,
              in the way I actually talk.
            </p>
            <p className="text-lg md:text-xl font-semibold text-dark mb-8 leading-snug">
              I&apos;ll teach you how to build things that run while you sleep.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/unlock"
                className="bg-pink text-white text-xs tracking-[1.5px] uppercase font-medium px-8 py-4 rounded-full hover:bg-[#C51F4E] transition shadow-lg shadow-pink/20"
              >
                Get Access · $39
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 text-[11px] tracking-[1.5px] uppercase text-dark hover:text-pink transition"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[color:var(--border)] hover:border-pink transition group">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-pink ml-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>Play intro</span>
              </button>
            </div>

            {/* social proof row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-mid tracking-[0.5px]">
              <div className="flex items-center gap-2">
                <span className="text-pink font-semibold">$39</span>
                <span>&middot; lifetime access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink font-semibold">28</span>
                <span>&middot; lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink font-semibold">~{formatMinutes(TOTAL_COMBINED_SEC)}</span>
                <span>&middot; start to finish</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink font-semibold">0</span>
                <span>&middot; coding required</span>
              </div>
            </div>
          </div>

          {/* right: stacked "what's inside" preview card */}
          <div className="hidden md:block">
            <div className="rounded-3xl bg-white/60 backdrop-blur-sm border border-[color:var(--border)] p-8 shadow-xl shadow-pink/5 relative">
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-4">What&apos;s inside</div>
              <ul className="space-y-3 text-dark text-[14px] font-light">
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>What Claude actually is (LLMs explained)</li>
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>How to talk to it like a human</li>
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>Building real websites from scratch</li>
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>Going live on the internet</li>
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>API keys, demystified</li>
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>Selling things online with Stripe</li>
                <li className="flex gap-2"><span className="text-pink">&#10003;</span>Agents that run while you sleep</li>
              </ul>
              <div className="mt-6 pt-6 border-t border-[color:var(--border)]">
                <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">Bonus</div>
                <p className="text-[13px] text-mid font-light leading-relaxed">
                  Interactive idea generator &middot; plain-English glossary &middot; video walkthroughs (coming)
                </p>
              </div>
              <div className="mt-5 pt-5 border-t border-[color:var(--border)] flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-full bg-pink-light text-pink flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.5 12.8 17 22l-5-3-5 3 1.5-9.2" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-1">Finish &amp; get a certificate</div>
                  <p className="text-[13px] text-mid font-light leading-relaxed">
                    Get through all 29 lessons and I&rsquo;ll make you a real Ayla Unlocked certificate, with your name on it. Frame it. LinkedIn it. Whatever.
                  </p>
                </div>
              </div>
              {/* floating sticker */}
              <div className="absolute -top-5 -right-5 rotate-12 bg-pink text-white px-4 py-2 rounded-full text-[10px] tracking-[2px] uppercase font-semibold shadow-lg">
                $39 forever
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="mt-16 text-[10px] tracking-[2px] uppercase text-muted-light animate-pulse">&darr; Keep scrolling</div>
      </div>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            &times;
          </button>
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoPlayer
              src="/hero-video.mp4"
              autoPlay
              fallback={
                <div
                  className="w-full h-full flex items-center justify-center text-center p-8"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, #FFB3C6 0%, transparent 60%),' +
                      'radial-gradient(circle at 70% 70%, #E8295C 0%, transparent 50%),' +
                      'linear-gradient(135deg, #1A1A1A 0%, #3B1020 60%, #1A1A1A 100%)',
                  }}
                >
                  <div>
                    <div className="text-[10px] tracking-[4px] uppercase text-pink-light mb-5 font-semibold opacity-80">Intro film</div>
                    <div className="font-serif italic text-white text-4xl md:text-6xl leading-[1] tracking-tight">Coming soon.</div>
                    <div className="mt-5 text-white/60 text-sm font-light">A real one. From me, on camera.</div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </section>
  )
}
