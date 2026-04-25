'use client'

import { useState } from 'react'
import type { VideoScript } from '@/lib/video-scripts'

export default function AdminScripts({ scripts }: { scripts: VideoScript[] }) {
 const [open, setOpen] = useState<number | null>(0)
 const [copied, setCopied] = useState<string | null>(null)

 async function copy(text: string, id: string) {
 await navigator.clipboard.writeText(text)
 setCopied(id)
 setTimeout(() => setCopied(null), 1200)
 }

 function copyFull(s: VideoScript) {
 const full = s.blocks
 .map((b) => `[${b.label}] ${b.text}`)
 .join('\n\n')
 copy(full, `full-${s.lessonIndex}`)
 }

 return (
 <div className="space-y-2">
 {scripts.map((s) => {
 const isOpen = open === s.lessonIndex
 return (
 <div key={s.lessonIndex} className="bg-white rounded-2xl border border-[color:var(--border)] overflow-hidden">
 <button
 onClick={() => setOpen(isOpen ? null : s.lessonIndex)}
 className="w-full flex items-center justify-between p-5 text-left hover:bg-[color:var(--pink-pale)]/40"
 >
 <div className="flex items-center gap-4">
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink w-16">{s.lessonTag.split(',')[0]}</div>
 <div className="font-serif text-lg text-dark">{s.title}</div>
 </div>
 <div className="flex items-center gap-3">
 <span className="text-[11px] tracking-[1.5px] uppercase text-muted-light">{s.estLength}</span>
 <span className={`text-pink transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
 </div>
 </button>
 {isOpen && (
 <div className="border-t border-[color:var(--border)] p-5 md:p-6 space-y-4">
 <div className="flex justify-end">
 <button
 onClick={() => copyFull(s)}
 className="text-[11px] tracking-[1.5px] uppercase bg-pink-light text-pink hover:bg-pink hover:text-white px-4 py-2 rounded-full transition"
 >
 {copied === `full-${s.lessonIndex}` ? 'Copied!' : 'Copy full script'}
 </button>
 </div>
 {s.blocks.map((b, i) => {
 const id = `${s.lessonIndex}-${i}`
 const isStage = b.label === 'STAGE'
 return (
 <div key={i} className={`relative rounded-xl border p-4 pr-14 ${isStage ? 'border-dashed border-[color:var(--border)] bg-[color:var(--pink-pale)]/40 italic text-mid' : 'border-[color:var(--border)] bg-white'}`}>
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">{b.label}</div>
 <div className="text-[14.5px] leading-relaxed text-dark whitespace-pre-wrap font-light">{b.text}</div>
 <button
 onClick={() => copy(b.text, id)}
 className="absolute top-3 right-3 text-[10px] tracking-[1px] uppercase text-pink hover:text-white hover:bg-pink bg-pink-light px-2.5 py-1 rounded-full transition"
 >
 {copied === id ? '✓' : 'Copy'}
 </button>
 </div>
 )
 })}
 </div>
 )}
 </div>
 )
 })}
 </div>
 )
}
