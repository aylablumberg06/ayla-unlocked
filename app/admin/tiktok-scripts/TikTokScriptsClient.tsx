'use client'

import { useState } from 'react'
import type { TikTokScript } from '@/lib/tiktok-scripts'

export default function TikTokScriptsClient({ scripts }: { scripts: TikTokScript[] }) {
 return (
 <div className="space-y-10">
 {scripts.map((s) => (
 <ScriptCard key={s.id} script={s} />
 ))}
 </div>
 )
}

function ScriptCard({ script }: { script: TikTokScript }) {
 const [copied, setCopied] = useState(false)

 const spokenText = [
 script.hook,
 ...script.beats.map((b) => b.text),
 script.cta,
 ].join('\n\n')

 async function copyAll() {
 try {
 await navigator.clipboard.writeText(spokenText)
 setCopied(true)
 setTimeout(() => setCopied(false), 1800)
 } catch {
 // ignore
 }
 }

 return (
 <article className="bg-white rounded-2xl border border-[color:var(--border)] overflow-hidden">
 {/* Header strip */}
 <header className="bg-[color:var(--pink-pale)] px-5 md:px-7 py-4 flex flex-wrap items-center justify-between gap-3">
 <div>
 <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-pink">
 Script #{script.id} · {script.duration}
 </div>
 <h2 className="font-serif italic text-2xl md:text-3xl text-dark mt-0.5 leading-tight">
 {script.title}
 </h2>
 </div>
 <button
 onClick={copyAll}
 className={`text-[10px] tracking-[1.5px] uppercase font-semibold px-4 py-2 rounded-full transition ${
 copied
 ? 'bg-pink text-white'
 : 'bg-white border border-[color:var(--border)] text-mid hover:border-pink hover:text-pink'
 }`}
 >
 {copied ? '✓ Copied script' : 'Copy script'}
 </button>
 </header>

 <div className="p-5 md:p-7 space-y-6">
 {/* HOOK */}
 <section>
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">Hook (first 3 seconds)</div>
 <p className="font-serif italic text-xl md:text-2xl leading-snug">{script.hook}</p>
 </section>

 {/* BEATS */}
 <section>
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Beat by beat</div>
 <div className="space-y-3">
 {script.beats.map((b, i) => (
 <div key={i} className="grid md:grid-cols-[44px_1fr_1fr] gap-3 md:gap-5 items-start">
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink pt-1">{String(i + 1).padStart(2, '0')}</div>
 <div className="rounded-lg bg-cream border border-[color:var(--border)] p-3.5">
 <div className="text-[9px] tracking-[2px] uppercase text-mid mb-1">Say / on screen</div>
 <p className="text-[14.5px] leading-relaxed text-dark">{b.text}</p>
 </div>
 <div className="rounded-lg bg-[color:var(--pink-pale)]/40 border border-[color:var(--border)] p-3.5">
 <div className="text-[9px] tracking-[2px] uppercase text-pink mb-1">Visual</div>
 <p className="text-[13.5px] leading-relaxed text-mid">{b.visual}</p>
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* CTA */}
 <section>
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">Closer</div>
 <p className="font-serif italic text-lg md:text-xl leading-snug">{script.cta}</p>
 </section>

 {/* VISUALS TO CAPTURE */}
 <section className="border-t border-[color:var(--border)] pt-5">
 <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Visuals to capture before filming</div>
 <ul className="space-y-2.5">
 {script.visualsToCapture.map((v, i) => (
 <li key={i} className="flex items-start gap-3">
 <span className="shrink-0 mt-1 w-5 h-5 rounded-full border-2 border-pink flex items-center justify-center text-[10px] text-pink font-semibold">{i + 1}</span>
 <div>
 <div className="font-medium text-dark text-[14px]">{v.label}</div>
 <div className="text-[12.5px] text-mid leading-relaxed">{v.where}</div>
 {v.notes && <div className="text-[11.5px] text-muted-light italic mt-0.5">{v.notes}</div>}
 </div>
 </li>
 ))}
 </ul>
 </section>
 </div>
 </article>
 )
}
