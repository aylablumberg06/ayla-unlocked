import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** POST /api/visit, logs a page view. Best-effort, never blocks UX. */
export async function POST(req: NextRequest) {
 try {
 const { path, referrer } = await req.json().catch(() => ({}))
 if (typeof path !== 'string' || path.length > 500) {
 return NextResponse.json({ ok: true }, { status: 200 })
 }

 // Best-effort auth lookup (anonymous visits still get logged)
 const supa = createSupabaseServerClient()
 let email: string | null = null
 try {
 const { data } = await supa.auth.getUser()
 email = data.user?.email?.toLowerCase() ?? null
 } catch { /* anon */ }

 const admin = createSupabaseAdminClient()
 await admin.from('visits').insert({
 email,
 path: path.slice(0, 500),
 referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : null,
 user_agent: (req.headers.get('user-agent') ?? '').slice(0, 500),
 })
 return NextResponse.json({ ok: true })
 } catch (e) {
 console.error('[visit]', e)
 return NextResponse.json({ ok: true })
 }
}
