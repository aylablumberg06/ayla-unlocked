'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { TOTAL_COMBINED_SEC, formatMinutes } from '@/lib/estimates'

/**
 * HERO COVER, full-height, cinematic.
 * Now with autoplay-muted inline video of Ayla's intro.
 * Source: /public/hero-video.mp4
 * Click the video to unmute / expand to fullscreen modal.
 */
export default function HeroCover() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [muted, setMuted] = useState(true)
  const inlineRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLVideoElement>(null)

  // Kick autoplay on mount. Browsers universally allow muted autoplay.
  useEffect(() => {
    const v = inlineRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => v.play().catch(() => {/* ignore autoplay blockers */})
    tryPlay()
  }, [])

  // When the modal opens, sync playback position from the inline video and unmute
  useEffect(() => {
    if (!videoOpen) return
    const inline = inlineRef.current
    const m = modalRef.current
    if (!m) return
    if (inline) {
      try { m.currentTime = inline.currentTime } catch { /* noop */ }
      inline.pause()
    }
    m.muted = false
    m.play().catch(() => {/* user gesture required sometimes */})
    return () => {
      // When closing: resume the inline video muted
      if (inline) {
        inline.muted = true
        inline.play().catch(() => {})
      }
    }
  }, [videoOpen])

  function toggleMute() {
    const v = inlineRef.current
    if (!v) return
    const newMuted = !muted
    v.muted = newMuted
    setMuted(newMuted)
    if (!newMuted) v.play().catch(() => {})
  }

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
            {/* Mobile: video appears ABOVE the copy */}
            <div className="md:hidden mb-8">
              <HeroVideo
                videoRef={inlineRef}
                muted={muted}
                onUnmuteClick={toggleMute}
                onExpandClick={() => setVideoOpen(true)}
              />
            </div>

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
                <span>Watch full-screen</span>
              </button>
            </div>

            {/* social proof row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-mid tracking-[0.5px]">
              <div className="flex items-center gap-2">
                <span className="text-pink font-semibold">$39</span>
                <span>&middot; lifetime access</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink font-semibold">29</span>
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

          {/* Desktop right column: autoplay video */}
          <div className="hidden md:block">
            <HeroVideo
              videoRef={inlineRef}
              muted={muted}
              onUnmuteClick={toggleMute}
              onExpandClick={() => setVideoOpen(true)}
            />
          </div>
        </div>

        {/* scroll hint */}
        <div className="mt-16 text-[10px] tracking-[2px] uppercase text-muted-light animate-pulse">&darr; Keep scrolling</div>
      </div>

      {/* FULL-SCREEN VIDEO MODAL (click video to expand) */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setVideoOpen(false)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl z-10"
            onClick={() => setVideoOpen(false)}
            aria-label="Close video"
          >
            &times;
          </button>
          <div
            className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalRef}
              src="/hero-video.mp4"
              className="w-full h-full object-contain bg-black"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  )
}

/**
 * Inline autoplay-muted video card with a pink "$39 forever" sticker
 * and an unmute pill. Click the video itself to open the fullscreen modal.
 */
function HeroVideo({
  videoRef,
  muted,
  onUnmuteClick,
  onExpandClick,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
  muted: boolean
  onUnmuteClick: () => void
  onExpandClick: () => void
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-[color:var(--border)] shadow-xl shadow-pink/10 bg-black aspect-[9/16] max-h-[560px] mx-auto">
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onClick={onExpandClick}
      />

      {/* Unmute pill (top-left) */}
      <button
        onClick={(e) => { e.stopPropagation(); onUnmuteClick() }}
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[1.5px] uppercase font-semibold px-3 py-2 rounded-full hover:bg-black/80 transition"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            Tap to unmute
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            Mute
          </>
        )}
      </button>

      {/* Expand pill (top-right) */}
      <button
        onClick={(e) => { e.stopPropagation(); onExpandClick() }}
        className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[1.5px] uppercase font-semibold px-3 py-2 rounded-full hover:bg-black/80 transition"
        aria-label="Watch fullscreen"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        Fullscreen
      </button>

      {/* $39 forever floating sticker */}
      <div className="absolute -top-3 -right-3 rotate-12 bg-pink text-white px-4 py-2 rounded-full text-[10px] tracking-[2px] uppercase font-semibold shadow-lg z-20">
        $39 forever
      </div>
    </div>
  )
}
