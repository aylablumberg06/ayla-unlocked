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
 const onMeta = () => setDuration(v.duration || 0)
 const onVol = () => setMuted(v.muted)
 v.addEventListener('play', onPlay)
 v.addEventListener('pause', onPause)
 v.addEventListener('ended', onEnded)
 v.addEventListener('timeupdate', onTime)
 v.addEventListener('loadedmetadata', onMeta)
 v.addEventListener('volumechange', onVol)
 return () => {
 v.removeEventListener('play', onPlay)
 v.removeEventListener('pause', onPause)
 v.removeEventListener('ended', onEnded)
 v.removeEventListener('timeupdate', onTime)
 v.removeEventListener('loadedmetadata', onMeta)
 v.removeEventListener('volumechange', onVol)
 }
 }, [])

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
 <div className={`relative w-full h-full bg-black overflow-hidden ${className ?? ''}`}>
 <video
 ref={ref}
 src={src}
 poster={poster}
 autoPlay={autoPlay}
 playsInline
 disablePictureInPicture
 disableRemotePlayback
 controlsList="nofullscreen nodownload noplaybackrate noremoteplayback"
 x-webkit-airplay="deny"
 preload="metadata"
 className="w-full h-full object-cover cursor-pointer"
 onClick={togglePlay}
 onError={() => setFailed(true)}
 />

 {/* Centered play button (only shown when paused/ended) */}
 {!playing && (
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

 {/* Bottom custom control bar */}
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

 <span className="font-mono text-[10px] tabular-nums opacity-90 select-none">
 {fmtTime(currentTime)} / {fmtTime(duration)}
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

 {/* Speed chip, sits above the bottom bar */}
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
