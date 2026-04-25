'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * Fires a best-effort POST to /api/visit whenever the pathname changes.
 * Debounced so fast client-side nav doesn't spam the DB.
 * Skips: /admin (private), /api routes (never hit from browser anyway).
 */
export default function PageTracker() {
 const pathname = usePathname()
 const last = useRef<string>('')
 useEffect(() => {
 if (!pathname) return
 if (pathname === last.current) return
 if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return
 last.current = pathname
 const timer = setTimeout(() => {
 fetch('/api/visit', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 path: pathname,
 referrer: typeof document !== 'undefined' ? document.referrer || '' : '',
 }),
 keepalive: true,
 }).catch(() => {})
 }, 200)
 return () => clearTimeout(timer)
 }, [pathname])
 return null
}
