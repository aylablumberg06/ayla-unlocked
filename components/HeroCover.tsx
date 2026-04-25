'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { TOTAL_COMBINED_SEC, formatMinutes } from '@/lib/estimates'

/**
 * HERO COVER, full-height, cinematic.
 * Autoplay-muted inline video of Ayla's intro. Tap to unmute.
 * Source: /public/hero-video.mp4
 */
export default function HeroCover() {
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const inlineRef = useRef<HTMLVideoElement>(null)

  // Kick autoplay on mount. Browsers universally allow muted autoplay.
  useEffect(() => {
    const v = inlineRef.current
    if (!v) return
    v.muted = true
    const tryPlay = () => v.play().catch(() => {/* ignore autoplay blockers */})
    tryPlay()
  }, [])

  // After 6 seconds, auto-fade the big unmute CTA (user's had their chance)
  useEffect(() => {
    const t = setTimeout(() => setHasInteracted(true), 6000)
    return () => clearTimeout(t)
  }, [])

  // Sync paused state if the video pauses/plays from outside (e.g. video ended)
  useEffect(() => {
    const v = inlineRef.current
    if (!v) return
    const onPlay = () => setPaused(false)
    const onPause = () => setPaused(true)
    const onEnded = () => setPaused(true)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    v.addEventListener('ended', onEnded)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
      v.removeEventListener('ended', onEnded)
    }
  }, [])

  function toggleMute() {
    const v = inlineRef.current
    if (!v) return
    const newMuted = !muted
    v.muted = newMuted
    setMuted(newMuted)
    setHasInteracted(true)
    if (!newMuted) v.play().catch(() => {})
  }

  function togglePause() {
    const v = inlineRef.current
    if (!v) return
    if (v.paused || v.ended) {
      // If ended, restart from the beginning
      if (v.ended) v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
    }
    setHasInteracted(true)
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
                paused={paused}
                showBigUnmute={!hasInteracted && muted}
                onUnmuteClick={toggleMute}
                onPauseClick={togglePause}
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
              <Link
                href="/login"
                className="inline-flex items-center text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink transition px-2 py-3"
              >
                Already in? Log in →
              </Link>
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
              paused={paused}
              showBigUnmute={!hasInteracted && muted}
              onUnmuteClick={toggleMute}
              onPauseClick={togglePause}
            />
          </div>
        </div>

        {/* scroll hint */}
        <div className="mt-16 text-[10px] tracking-[2px] uppercase text-muted-light animate-pulse">&darr; Keep scrolling</div>
      </div>
    </section>
  )
}

/**
 * Inline autoplay-muted video card with a pink "$39 forever" sticker
 * and an unmute pill. Tapping the video itself just toggles unmute.
 *
 * When `showBigUnmute` is true, shows a prominent centered "tap to unmute"
 * CTA with a pulsing ring and animated waveform. Fades to a small corner
 * pill once the user clicks or after ~6 seconds.
 */
function HeroVideo({
  videoRef,
  muted,
  paused,
  showBigUnmute,
  onUnmuteClick,
  onPauseClick,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
  muted: boolean
  paused: boolean
  showBigUnmute: boolean
  onUnmuteClick: () => void
  onPauseClick: () => void
}) {
  return (
    <div className="relative aspect-[9/16] max-h-[560px] w-full max-w-[360px] mx-auto">
      {/* Inner clipping container for the video — only this gets overflow-hidden so corner stickers can poke past the rounded edge */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[color:var(--border)] shadow-xl shadow-pink/10 bg-black">
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nofullscreen nodownload noplaybackrate noremoteplayback"
        onClick={onPauseClick}
      />

      {/* Big centered unmute CTA (shown when muted + before interaction) */}
      {showBigUnmute && (
        <button
          onClick={(e) => { e.stopPropagation(); onUnmuteClick() }}
          className="hero-unmute-big absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/20 to-transparent cursor-pointer"
          aria-label="Tap to unmute"
        >
          <div className="flex flex-col items-center gap-5">
            <span className="relative inline-flex items-center justify-center">
              {/* outer pulsing rings */}
              <span className="absolute inset-0 -m-3 rounded-full bg-pink/40 animate-ping" />
              <span className="absolute inset-0 -m-6 rounded-full bg-pink/25 hero-unmute-ring" />
              {/* inner circle */}
              <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink text-white shadow-2xl shadow-pink/40">
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              </span>
            </span>

            {/* animated waveform */}
            <span className="flex items-end gap-1.5 h-7">
              {[0,1,2,3,4].map((i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-white hero-wave-bar"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </span>

            <span className="text-white text-[11px] tracking-[3px] uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Tap to hear me
            </span>
          </div>
        </button>
      )}

      {/* Small corner unmute/mute pill — only rendered after the big "Tap to hear me" CTA fades */}
      {!showBigUnmute && (
      <button
        onClick={(e) => { e.stopPropagation(); onUnmuteClick() }}
        className="absolute top-4 left-4 z-30 inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white text-[10px] tracking-[1.5px] uppercase font-semibold px-3 py-2 rounded-full transition"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? (
          <>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            Unmute
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

      {/* Play/Pause pill (top-right) */}
      <button
        onClick={(e) => { e.stopPropagation(); onPauseClick() }}
        className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-[10px] tracking-[1.5px] uppercase font-semibold px-3 py-2 rounded-full hover:bg-black/80 transition"
        aria-label={paused ? 'Play video' : 'Pause video'}
      >
        {paused ? (
          <>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <polygon points="6 3 21 12 6 21 6 3" />
            </svg>
            Play
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            Pause
          </>
        )}
      </button>
      </div>{/* end inner clipping container */}

      {/* $39 forever floating sticker — outside the clip so it can poke out */}
      <div className="absolute -top-3 -right-3 rotate-12 bg-pink text-white px-4 py-2 rounded-full text-[10px] tracking-[2px] uppercase font-semibold shadow-lg z-30 whitespace-nowrap">
        $39 forever
      </div>

      {/* scoped animations */}
      <style jsx>{`
        .hero-unmute-big { animation: heroUnmuteIn 0.4s ease-out; }
        .hero-unmute-ring { animation: heroUnmuteRing 2s ease-out infinite; }
        .hero-wave-bar {
          height: 28%;
          animation: heroWave 1.1s ease-in-out infinite;
          transform-origin: bottom center;
        }
        @keyframes heroUnmuteIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes heroUnmuteRing {
          0%   { transform: scale(0.85); opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes heroWave {
          0%, 100% { height: 28%; }
          25%      { height: 100%; }
          50%      { height: 45%; }
          75%      { height: 80%; }
        }
      `}</style>
    </div>
  )
}
