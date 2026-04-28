'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
 src: string
 poster?: string
 autoPlay?: boolean
 /** Called when the video errors or fails to load, renders fallback if provided. */
 fallback?: React.ReactNode
 className?: string
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2] as const

/**
 * Course-wide video player with FULLY CUSTOM controls.
 * No native browser bar (so iOS Safari can't sneak its PiP button in).
 *
 * UI:
 * - tap the video to play/pause
 * - bottom bar: play/pause icon, current/total time, scrub bar, mute, speed
 *
 * Graceful fallback when the source doesn't load.
 */
export default function VideoPlayer({ src, poster, autoPlay, fallback, className }: Props) {
 const ref = useRef<HTMLVideoElement>(null)
 const [speed, setSpeed] = useState<number>(1)
 const [speedOpen, setSpeedOpen] = useState(false)
 const [failed, setFailed] = useState(false)
 const [playing, setPlaying] = useState<boolean>(!!autoPlay)
 const [muted, setMuted] = useState(false)
 const [currentTime, setCurrentTime] = useState(0)
 const [duration, setDuration] = useState(0)
 const [buffering, setBuffering] = useState(false)
 const [hasFrame, setHasFrame] = useState(false)
 // Mobile: don't preload the whole video, only metadata. Saves cellular
 // data + fixes the "video won't start" problem on flaky LTE. Desktop
 // keeps preload="auto" so it's instant.
 const [isMobile, setIsMobile] = useState(false)
 useEffect(() => {
 if (typeof window === 'undefined') return
 const mq = window.matchMedia('(max-width: 767px)')
 const update = () => setIsMobile(mq.matches)
 update()
 mq.addEventListener('change', update)
 return () => mq.removeEventListener('change', update)
 }, [])

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

 // Mirror video state into our component state
 useEffect(() => {
 const v = ref.current
 if (!v) return
 const onPlay = () => setPlaying(true)
 const onPause = () => setPlaying(false)
 const onEnded = () => setPlaying(false)
 const onTime = () => setCurrentTime(v.currentTime)
 const onMeta = () => {
 setDuration(v.duration || 0)
 // Force the first frame to render as the "poster" so the
 // video isn't a black box before you press play.
 if (!autoPlay && v.currentTime === 0) {
 try { v.currentTime = 0.05 } catch {}
 }
 }
 const onVol = () => setMuted(v.muted)
 const onWaiting = () => setBuffering(true)
 const onCanPlay = () => { setBuffering(false); setHasFrame(true) }
 const onPlaying = () => { setBuffering(false); setHasFrame(true) }
 const onLoadedData = () => setHasFrame(true)
 v.addEventListener('play', onPlay)
 v.addEventListener('pause', onPause)
 v.addEventListener('ended', onEnded)
 v.addEventListener('timeupdate', onTime)
 v.addEventListener('loadedmetadata', onMeta)
 v.addEventListener('volumechange', onVol)
 v.addEventListener('waiting', onWaiting)
 v.addEventListener('canplay', onCanPlay)
 v.addEventListener('playing', onPlaying)
 v.addEventListener('loadeddata', onLoadedData)
 return () => {
 v.removeEventListener('play', onPlay)
 v.removeEventListener('pause', onPause)
 v.removeEventListener('ended', onEnded)
 v.removeEventListener('timeupdate', onTime)
 v.removeEventListener('loadedmetadata', onMeta)
 v.removeEventListener('volumechange', onVol)
 v.removeEventListener('waiting', onWaiting)
 v.removeEventListener('canplay', onCanPlay)
 v.removeEventListener('playing', onPlaying)
 v.removeEventListener('loadeddata', onLoadedData)
 }
 }, [autoPlay])

 function togglePlay() {
 const v = ref.current
 if (!v) return
 if (v.paused || v.ended) {
 if (v.ended) v.currentTime = 0
 v.play().catch(() => {})
 } else {
 v.pause()
 }
 }

 function toggleMute() {
 const v = ref.current
 if (!v) return
 v.muted = !v.muted
 }

 function seekTo(pct: number) {
 const v = ref.current
 if (!v || !duration) return
 v.currentTime = Math.max(0, Math.min(duration, pct * duration))
 }

 function pickSpeed(s: number) {
 setSpeed(s)
 localStorage.setItem('au-video-speed', String(s))
 setSpeedOpen(false)
 }

 function fmtTime(sec: number) {
 if (!isFinite(sec) || sec < 0) sec = 0
 const m = Math.floor(sec / 60)
 const s = Math.floor(sec % 60)
 return `${m}:${s.toString().padStart(2, '0')}`
 }

 if (failed && fallback) {
 return <div className={`relative w-full h-full ${className ?? ''}`}>{fallback}</div>
 }

 const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0

 return (
 <div className={`relative w-full h-full bg-[color:var(--pink-pale)] overflow-hidden ${className ?? ''}`}>
 <video
 ref={ref}
 src={src}
 poster={poster || '/ayla-loader-poster.svg'}
 autoPlay={autoPlay}
 playsInline
 disablePictureInPicture
 disableRemotePlayback
 controls={isMobile}
 controlsList="nofullscreen nodownload noplaybackrate noremoteplayback"
 x-webkit-airplay="deny"
 preload={isMobile ? 'metadata' : 'auto'}
 className="w-full h-full object-cover cursor-pointer"
 onClick={isMobile ? undefined : togglePlay}
 onError={() => setFailed(true)}
 />

 {/* Loader overlay: shows during initial load (no frame yet) and
     during any mid-playback buffer stall. Covers the OS-default
     black spinner with our Ayla character. Mobile uses the OS
     native indicator instead, so we skip our heavy SVG overlay. */}
 {!isMobile && (buffering || !hasFrame) && (
 <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-black/55">
 <span className="absolute inset-0 bg-gradient-to-br from-[#FFE4ED] via-[#FFF7FA] to-[#FFE4ED] opacity-95" />
 <span className="relative w-14 h-14 rounded-full overflow-hidden vp-bob" style={{ boxShadow: '0 6px 20px rgba(232,41,92,0.35)' }}>
 <svg viewBox="0 0 64 64" className="w-full h-full">
 <rect width="64" height="64" fill="#FFE4ED" />
 <path d="M10 38 C10 20 22 10 32 10 C42 10 54 20 54 38 L54 58 L10 58 Z" fill="#6B3D2A" />
 <ellipse cx="32" cy="34" rx="15" ry="17" fill="#F5D2B8" />
 <path d="M17 26 C20 19 26 15 32 15 C38 15 44 18 47 26 C43 22 37 21 32 21 C27 21 22 23 17 26 Z" fill="#6B3D2A" />
 <ellipse cx="26" cy="31" rx="1.4" ry="2" fill="#1A1A1A" />
 <ellipse cx="38" cy="31" rx="1.4" ry="2" fill="#1A1A1A" />
 <path d="M28 42 C30 43 33 43 36 41" stroke="#C45575" strokeWidth="1.6" fill="none" strokeLinecap="round" />
 <circle cx="23" cy="38" r="2.3" fill="#FF9BB3" opacity="0.55" />
 <circle cx="41" cy="38" r="2.3" fill="#FF9BB3" opacity="0.55" />
 <circle cx="32" cy="48" r="2.2" fill="#F5D2B8" />
 <path d="M32 46 L34 42 L36 41" stroke="#F5D2B8" strokeWidth="3" strokeLinecap="round" fill="none" />
 </svg>
 </span>
 </div>
 )}

 {/* Centered play button (only shown when paused/ended).
     Mobile uses the native browser controls, so suppress this. */}
 {!isMobile && !playing && (
 <button
 onClick={togglePlay}
 aria-label="Play"
 className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-t from-black/30 to-transparent group cursor-pointer"
 >
 <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink/90 text-white shadow-2xl shadow-pink/40 backdrop-blur-sm group-hover:scale-105 transition-transform">
 <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1" fill="currentColor">
 <polygon points="6 3 21 12 6 21 6 3" />
 </svg>
 </span>
 </button>
 )}

 {/* Bottom custom control bar (desktop only — mobile uses native) */}
 {!isMobile && (
 <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-3 pt-6 pb-2.5 flex items-center gap-2.5 text-white text-[11px] tracking-wide">
 <button
 onClick={togglePlay}
 aria-label={playing ? 'Pause' : 'Play'}
 className="shrink-0 w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition"
 >
 {playing ? (
 <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
 <rect x="6" y="4" width="4" height="16" rx="1" />
 <rect x="14" y="4" width="4" height="16" rx="1" />
 </svg>
 ) : (
 <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 ml-0.5" fill="currentColor">
 <polygon points="6 3 21 12 6 21 6 3" />
 </svg>
 )}
 </button>

 <span className="font-mono text-[9px] tabular-nums opacity-90 select-none whitespace-nowrap shrink-0">
 {fmtTime(currentTime)}/{fmtTime(duration)}
 </span>

 <input
 type="range"
 min={0}
 max={1000}
 value={Math.round(progressPct * 10)}
 onChange={(e) => seekTo(Number(e.target.value) / 1000)}
 aria-label="Seek"
 className="vp-seek flex-1"
 />

 <button
 onClick={toggleMute}
 aria-label={muted ? 'Unmute' : 'Mute'}
 className="shrink-0 w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition"
 >
 {muted ? (
 <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
 <line x1="23" y1="9" x2="17" y2="15" />
 <line x1="17" y1="9" x2="23" y2="15" />
 </svg>
 ) : (
 <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
 <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
 <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
 </svg>
 )}
 </button>
 </div>
 )}

 {/* Speed chip, sits above the bottom bar (desktop only) */}
 {!isMobile && (
 <div className="absolute bottom-12 right-3 z-20">
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
 )}

 <style jsx>{`
 .vp-seek {
 appearance: none;
 -webkit-appearance: none;
 height: 4px;
 border-radius: 999px;
 background: linear-gradient(to right, #E8295C 0%, #E8295C ${progressPct}%, rgba(255,255,255,0.25) ${progressPct}%, rgba(255,255,255,0.25) 100%);
 cursor: pointer;
 outline: none;
 margin: 0 4px;
 }
 .vp-seek::-webkit-slider-thumb {
 appearance: none;
 -webkit-appearance: none;
 width: 12px;
 height: 12px;
 border-radius: 999px;
 background: white;
 box-shadow: 0 0 0 2px #E8295C, 0 2px 6px rgba(0,0,0,0.3);
 cursor: grab;
 }
 .vp-bob {
 animation: vpBob 1.6s ease-in-out infinite;
 display: inline-block;
 }
 @keyframes vpBob {
 0%, 100% { transform: translateY(0) rotate(-3deg); }
 50% { transform: translateY(-5px) rotate(3deg); }
 }
 .vp-seek::-moz-range-thumb {
 width: 12px;
 height: 12px;
 border-radius: 999px;
 background: white;
 border: 2px solid #E8295C;
 box-shadow: 0 2px 6px rgba(0,0,0,0.3);
 cursor: grab;
 }
 `}</style>
 </div>
 )
}
