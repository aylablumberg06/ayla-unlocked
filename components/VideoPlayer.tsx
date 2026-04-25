'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  poster?: string
  autoPlay?: boolean
  /** Called when the video errors or fails to load — renders fallback if provided. */
  fallback?: React.ReactNode
  className?: string
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2] as const

/**
 * Course-wide video player with:
 * - Native controls (browser scrubber, fullscreen, etc.)
 * - Explicit speed chip (0.75x → 2x) — always visible bottom-right
 * - Graceful fallback when the source doesn't load
 */
export default function VideoPlayer({ src, poster, autoPlay, fallback, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [speed, setSpeed] = useState<number>(1)
  const [speedOpen, setSpeedOpen] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = speed
  }, [speed])

  useEffect(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('au-video-speed') : null
    if (saved) {
      const n = parseFloat(saved)
      if (SPEEDS.includes(n as any)) setSpeed(n)
    }
  }, [])

  function pickSpeed(s: number) {
    setSpeed(s)
    localStorage.setItem('au-video-speed', String(s))
    setSpeedOpen(false)
  }

  if (failed && fallback) {
    return <div className={`relative w-full h-full ${className ?? ''}`}>{fallback}</div>
  }

  return (
    <div className={`relative w-full h-full bg-black ${className ?? ''}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        controls
        playsInline
        disablePictureInPicture
        controlsList="nofullscreen nodownload noplaybackrate noremoteplayback"
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />

      {/* Speed chip */}
      <div className="absolute bottom-3 right-3 z-10">
        <button
          onClick={() => setSpeedOpen((v) => !v)}
          className="bg-pink text-white text-[11px] tracking-[1.5px] uppercase font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-[#C51F4E] transition flex items-center gap-1"
          aria-label="Change playback speed"
        >
          <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
            <path d="M13 3v18l9-9z" />
            <path d="M3 6l6 6-6 6z" opacity="0.6" />
          </svg>
          {speed}x
        </button>
        {speedOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-dark rounded-xl shadow-2xl overflow-hidden min-w-[90px]">
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => pickSpeed(s)}
                className={`w-full text-left px-4 py-2 text-[12px] tracking-[0.5px] transition ${
                  s === speed ? 'bg-pink text-white font-semibold' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {s}x{s === 1 ? ' · normal' : ''}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
