import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient, createSupabaseAdminClient } from '@/lib/supabase'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const path = req.nextUrl.pathname

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supaConfigured = !!supaUrl && !supaUrl.includes('placeholder')

  // ──────────────────────────────────────────────────────────
  // /admin is owner-only
  // ──────────────────────────────────────────────────────────
  if (path.startsWith('/admin')) {
    if (!supaConfigured) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      const supabase = createSupabaseMiddlewareClient(req, res)
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email?.toLowerCase() === OWNER_EMAIL) return res
      return NextResponse.redirect(new URL('/login', req.url))
    } catch {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // ──────────────────────────────────────────────────────────
  // /login: if the visitor is already a signed-in paid user,
  // send them straight into /course (no reason to show a login
  // form to someone already logged in). The logo at "/" stays
  // public so signed-in users can still see the marketing site.
  // ──────────────────────────────────────────────────────────
  if (supaConfigured && path === '/login') {
    try {
      const supabase = createSupabaseMiddlewareClient(req, res)
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        const email = user.email.toLowerCase()
        if (email === OWNER_EMAIL) {
          return NextResponse.redirect(new URL('/course', req.url))
        }
        const adminClient = createSupabaseAdminClient()
        const { data: row } = await adminClient
          .from('users')
          .select('paid')
          .eq('email', email)
          .maybeSingle()
        if (row?.paid === true) {
          return NextResponse.redirect(new URL('/course', req.url))
        }
      }
    } catch (e) {
      console.error('[middleware] /login auth check failed', e)
    }
    return res
  }

  // ──────────────────────────────────────────────────────────
  // /course/certificate is public — students share their completion
  // certificate with friends/LinkedIn/employers. The page renders
  // purely from URL params (?name=&id=&date=), no DB read needed,
  // so opening it doesn't expose anything sensitive.
  // ──────────────────────────────────────────────────────────
  if (path.startsWith('/course/certificate')) {
    return res
  }

  // ──────────────────────────────────────────────────────────
  // /course (everything else) is paid-only
  // ──────────────────────────────────────────────────────────
  if (!path.startsWith('/course')) {
    return res
  }

  if (!supaConfigured) {
    return NextResponse.redirect(new URL('/unlock', req.url))
  }

  try {
    const supabase = createSupabaseMiddlewareClient(req, res)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/unlock', req.url))
    }

    if (user.email?.toLowerCase() === OWNER_EMAIL) {
      return res
    }

    const adminClient = createSupabaseAdminClient()
    const { data: row } = await adminClient
      .from('users')
      .select('paid')
      .eq('email', user.email!.toLowerCase())
      .maybeSingle()

    if (row?.paid === true) {
      return res
    }

    return NextResponse.redirect(new URL('/unlock', req.url))
  } catch (e) {
    console.error('[middleware] auth check failed', e)
    return NextResponse.redirect(new URL('/unlock', req.url))
  }
}

export const config = {
  matcher: ['/login', '/course/:path*', '/admin/:path*'],
}
