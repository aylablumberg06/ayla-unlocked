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
 * - Native controls (browser scrubber, etc.)
 * - Explicit speed chip (0.75x → 2x) — always visible bottom-right
 * - Big pink "Play" overlay before the user starts the video
 *   (hides the random first-frame poster of Ayla's face)
 * - Graceful fallback when the source doesn't load
 */
export default function VideoPlayer({ src, poster, autoPlay, fallback, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [speed, setSpeed] = useState<number>(1)
  const [speedOpen, setSpeedOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const [hasStarted, setHasStarted] = useState<boolean>(!!autoPlay)

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

  // Reset the play-overlay every time the source changes (lesson change)
  useEffect(() => {
    setHasStarted(!!autoPlay)
  }, [src, autoPlay])

  // Mirror any external play/pause back to our state so the overlay stays accurate
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const onPlay = () => setHasStarted(true)
    v.addEventListener('play', onPlay)
    return () => v.removeEventListener('play', onPlay)
  }, [])

  function pickSpeed(s: number) {
    setSpeed(s)
    localStorage.setItem('au-video-speed', String(s))
    setSpeedOpen(false)
  }

  function startPlayback() {
    const v = ref.current
    if (!v) return
    setHasStarted(true)
    v.play().catch(() => { /* user-gesture should be enough; ignore */ })
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
        controls={hasStarted}
        playsInline
        disablePictureInPicture
        controlsList="nofullscreen nodownload noplaybackrate noremoteplayback"
        preload="metadata"
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />

      {/* Big play-button overlay shown until the user starts the video.
          Covers the random first-frame face placeholder. */}
      {!hasStarted && (
        <button
          onClick={startPlayback}
          aria-label="Play video"
          className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/20 to-transparent group cursor-pointer"
        >
          <span className="relative inline-flex items-center justify-center">
            <span className="absolute inset-0 -m-3 rounded-full bg-pink/40 animate-ping" />
            <span className="absolute inset-0 -m-6 rounded-full bg-pink/25 video-play-ring" />
            <span className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink text-white shadow-2xl shadow-pink/40 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-8 h-8 ml-1" fill="currentColor">
                <polygon points="6 3 21 12 6 21 6 3" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-6 text-white text-[11px] tracking-[3px] uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Tap to play
          </span>
        </button>
      )}

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

      <style jsx>{`
        .video-play-ring { animation: vpRing 2s ease-out infinite; }
        @keyframes vpRing {
          0%   { transform: scale(0.85); opacity: 0.6; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
