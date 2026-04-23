import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

const OWNER_EMAIL = 'aylablumberg06@gmail.com'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')

  const supabase = createSupabaseServerClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('[auth/callback] exchange error', error)
      return NextResponse.redirect(`${origin}/unlock?error=auth`)
    }
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/unlock`)
  }

  // Owner override
  if (user.email?.toLowerCase() === OWNER_EMAIL) {
    return NextResponse.redirect(`${origin}/course`)
  }

  // Check paid flag
  const { data: row } = await supabase
    .from('users')
    .select('paid')
    .eq('email', user.email!.toLowerCase())
    .maybeSingle()

  if (row?.paid === true) {
    return NextResponse.redirect(`${origin}/course`)
  }

  return NextResponse.redirect(`${origin}/unlock`)
}
