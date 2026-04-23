import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseMiddlewareClient } from '@/lib/supabase'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // only guard /course
  if (!req.nextUrl.pathname.startsWith('/course')) {
    return res
  }

  // If Supabase env isn't configured yet (e.g. first deploy before keys set),
  // fail safe to /unlock instead of 500ing.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url || url.includes('placeholder')) {
    return NextResponse.redirect(new URL('/unlock', req.url))
  }

  try {
    const supabase = createSupabaseMiddlewareClient(req, res)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.redirect(new URL('/unlock', req.url))
    }

    // owner override
    if (user.email?.toLowerCase() === OWNER_EMAIL) {
      return res
    }

    const { data: row } = await supabase
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
  matcher: ['/course/:path*'],
}
