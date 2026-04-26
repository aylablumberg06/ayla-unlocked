'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'

/**
 * Supabase admin-generated magic links use the implicit flow:
 * after Supabase verifies the token, it redirects to
 *   <redirect_to>#access_token=...&refresh_token=...&type=magiclink
 * The hash fragment never reaches the server. This client component
 * runs once on mount, parses the hash, sets the Supabase session
 * cookie via the browser client, then routes the user to /course.
 *
 * Mounted on the landing page so it catches the redirect even if the
 * full /api/auth/callback path got stripped by Supabase's URL
 * normalization.
 */
export default function MagicLinkHashHandler() {
 const router = useRouter()
 const [working, setWorking] = useState(false)

 useEffect(() => {
 if (typeof window === 'undefined') return
 const hash = window.location.hash
 if (!hash || !hash.includes('access_token=')) return

 const params = new URLSearchParams(hash.replace(/^#/, ''))
 const access_token = params.get('access_token')
 const refresh_token = params.get('refresh_token')
 if (!access_token || !refresh_token) return

 setWorking(true)
 const supa = createBrowserClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 )
 supa.auth
 .setSession({ access_token, refresh_token })
 .then(({ error }) => {
 if (error) {
 console.error('[magic-link] setSession error', error)
 router.replace('/login?error=auth')
 return
 }
 // strip the hash, send them into the course
 history.replaceState(null, '', window.location.pathname)
 router.replace('/course')
 })
 .catch((err) => {
 console.error('[magic-link] unhandled', err)
 router.replace('/login?error=auth')
 })
 }, [router])

 if (!working) return null
 return (
 <div className="fixed inset-0 z-[100] flex items-center justify-center bg-cream/95 backdrop-blur-sm">
 <div className="text-center">
 <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Signing you in</div>
 <div className="font-serif italic text-3xl">One sec…</div>
 </div>
 </div>
 )
}
