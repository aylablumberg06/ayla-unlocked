import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// 10 years; browsers clamp ~400 days, the SSR client refreshes on visit
const SESSION_TTL = 60 * 60 * 24 * 365 * 10

/**
 * GET /api/auth/m?t=<hashed_token>
 *
 * Server-side magic-link consumer. Bypasses the implicit-flow URL hash
 * dance that breaks in mobile email-client webviews. Calls verifyOtp
 * with the token, sets the Supabase session cookies on the response,
 * and redirects straight to /course. No client JS required.
 */
export async function GET(req: NextRequest) {
 const url = new URL(req.url)
 const tokenHash = url.searchParams.get('t')
 if (!tokenHash) {
 return NextResponse.redirect(new URL('/login?error=missing-token', req.url))
 }

 const res = NextResponse.redirect(new URL('/course', req.url))
 const supa = createServerClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 {
 cookies: {
 get(name: string) {
 return req.cookies.get(name)?.value
 },
 set(name: string, value: string, options: CookieOptions) {
 res.cookies.set({ name, value, ...options, maxAge: SESSION_TTL })
 },
 remove(name: string, options: CookieOptions) {
 res.cookies.set({ name, value: '', ...options, maxAge: 0 })
 },
 },
 }
 )

 const { error } = await supa.auth.verifyOtp({ token_hash: tokenHash, type: 'magiclink' })
 if (error) {
 console.error('[auth/m] verifyOtp error', error)
 return NextResponse.redirect(new URL('/login?error=expired', req.url))
 }
 return res
}
