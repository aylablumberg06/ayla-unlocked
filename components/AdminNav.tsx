'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import BrandLogo from '@/components/BrandLogo'

type Item =
 | { type: 'anchor'; href: string; label: string; accent?: boolean }
 | { type: 'route'; href: string; label: string; accent?: boolean }

const GROUPS: Array<{ label: string; items: Item[] }> = [
 {
 label: 'Performance',
 items: [
 { type: 'anchor', href: '#overview', label: 'Overview' },
 { type: 'anchor', href: '#confused', label: 'Confused flags' },
 { type: 'anchor', href: '#visits', label: 'Visits' },
 ],
 },
 {
 label: 'People',
 items: [
 { type: 'anchor', href: '#students', label: 'Students' },
 { type: 'anchor', href: '#contacts', label: 'Contacts' },
 { type: 'anchor', href: '#chats', label: 'Chats' },
 { type: 'anchor', href: '#submissions', label: 'Builds' },
 ],
 },
 {
 label: 'Marketing',
 items: [
 { type: 'route', href: '/admin/leads', label: 'Leads', accent: true },
 { type: 'route', href: '/admin/tiktok-scripts', label: 'TikTok scripts', accent: true },
 { type: 'anchor', href: '#scripts', label: 'Video scripts' },
 ],
 },
 {
 label: 'Reference',
 items: [
 { type: 'anchor', href: '#quiz', label: 'Quiz log' },
 { type: 'anchor', href: '#ideas', label: 'All ideas' },
 ],
 },
]

export default function AdminNav() {
 const [openIdx, setOpenIdx] = useState<number | null>(null)
 const navRef = useRef<HTMLDivElement>(null)

 // Close on outside click + Escape
 useEffect(() => {
 if (openIdx === null) return
 function onDocClick(e: MouseEvent) {
 if (!navRef.current) return
 if (!navRef.current.contains(e.target as Node)) setOpenIdx(null)
 }
 function onKey(e: KeyboardEvent) {
 if (e.key === 'Escape') setOpenIdx(null)
 }
 document.addEventListener('mousedown', onDocClick)
 document.addEventListener('keydown', onKey)
 return () => {
 document.removeEventListener('mousedown', onDocClick)
 document.removeEventListener('keydown', onKey)
 }
 }, [openIdx])

 function close() { setOpenIdx(null) }

 return (
 <nav
 ref={navRef}
 className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(253,246,240,0.95)] border-b border-[color:var(--border)]"
 >
 <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between gap-6">
 <Link href="/" className="font-serif text-lg tracking-wide flex items-center shrink-0">
 <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic mx-1">Unlocked</span>
 <span className="text-xs text-muted-light tracking-[2px] uppercase ml-3 hidden sm:inline">Admin</span>
 </Link>

 <div className="flex items-center gap-1 md:gap-2">
 {GROUPS.map((g, i) => {
 const isOpen = openIdx === i
 return (
 <div key={g.label} className="relative">
 <button
 type="button"
 onClick={() => setOpenIdx(isOpen ? null : i)}
 aria-expanded={isOpen}
 className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10.5px] tracking-[1.5px] uppercase font-semibold transition ${
 isOpen
 ? 'bg-pink text-white'
 : 'text-mid hover:text-pink hover:bg-white'
 }`}
 >
 {g.label}
 <svg
 viewBox="0 0 12 12"
 width="9"
 height="9"
 fill="currentColor"
 className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
 >
 <path d="M2 4l4 4 4-4z" />
 </svg>
 </button>

 {isOpen && (
 <div className="absolute right-0 mt-2 min-w-[180px] rounded-xl bg-white border border-[color:var(--border)] shadow-xl shadow-pink/10 overflow-hidden z-50">
 {g.items.map((it) => {
 const cls = `block px-4 py-2.5 text-[12px] tracking-[0.5px] transition border-b border-[color:var(--border)] last:border-b-0 ${
 it.accent
 ? 'text-pink font-semibold hover:bg-[color:var(--pink-pale)]'
 : 'text-mid hover:bg-[color:var(--pink-pale)] hover:text-pink'
 }`
 if (it.type === 'route') {
 return (
 <Link key={it.label} href={it.href} className={cls} onClick={close}>
 {it.label} →
 </Link>
 )
 }
 return (
 <a key={it.label} href={it.href} className={cls} onClick={close}>
 {it.label}
 </a>
 )
 })}
 </div>
 )}
 </div>
 )
 })}
 </div>
 </div>
 </nav>
 )
}
