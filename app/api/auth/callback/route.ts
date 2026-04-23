import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

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

  if (!user?.email) {
    return NextResponse.redirect(`${origin}/unlock`)
  }

  const email = user.email.toLowerCase()
  const isOwner = email === OWNER_EMAIL
  const admin = createSupabaseAdminClient()

  // paid check (owner always allowed)
  if (!isOwner) {
    const { data: row } = await admin
      .from('users')
      .select('paid')
      .eq('email', email)
      .maybeSingle()
    if (row?.paid !== true) {
      return NextResponse.redirect(`${origin}/unlock`)
    }
  }

  // First-time? → welcome. Otherwise → course.
  const { data: prog } = await admin
    .from('user_progress')
    .select('onboarded')
    .eq('email', email)
    .maybeSingle()

  if (!prog?.onboarded) {
    return NextResponse.redirect(`${origin}/course/welcome`)
  }
  return NextResponse.redirect(`${origin}/course`)
}
