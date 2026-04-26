import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function ownerOnly() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const ownerEmail = (process.env.OWNER_EMAIL || 'aylablumberg06@gmail.com').toLowerCase()
  return !!user?.email && user.email.toLowerCase() === ownerEmail
}

// GET — list leads (server-side; admin page uses this)
export async function GET() {
  if (!(await ownerOnly())) return NextResponse.json({ error: 'Owner only' }, { status: 401 })
  const admin = createSupabaseAdminClient()
  const { data, error } = await admin
    .from('tiktok_leads')
    .select('*')
    .order('intent_score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ leads: data ?? [] })
}

// PATCH — update status / notes / mark sent
//   Body: { id, status?, notes?, mark_sent?: boolean }
export async function PATCH(req: NextRequest) {
  if (!(await ownerOnly())) return NextResponse.json({ error: 'Owner only' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const admin = createSupabaseAdminClient()
  const patch: any = {}
  if (typeof body.status === 'string') patch.status = body.status.slice(0, 30)
  if (typeof body.notes === 'string') patch.notes = body.notes.slice(0, 2000)
  if (body.mark_sent === true) {
    patch.status = 'sent'
    patch.sent_at = new Date().toISOString()
  }
  if (body.mark_sent === false) {
    patch.status = 'new'
    patch.sent_at = null
  }
  const { data, error } = await admin.from('tiktok_leads').update(patch).eq('id', body.id).select().maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lead: data })
}

// POST — manually add a lead (DM tab uses this)
//   Body: { handle, comment_text?, source?: 'dm'|'manual', intent_score?, intent_reason?, video_url? }
export async function POST(req: NextRequest) {
  if (!(await ownerOnly())) return NextResponse.json({ error: 'Owner only' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const handle = String(body.handle || '').replace(/^@/, '').trim().toLowerCase()
  if (!handle) return NextResponse.json({ error: 'Missing handle' }, { status: 400 })
  const admin = createSupabaseAdminClient()
  const row = {
    handle,
    source: body.source === 'manual' ? 'manual' : 'dm',
    video_url: body.video_url ?? null,
    video_caption: null,
    comment_text: body.comment_text?.slice(0, 1000) ?? null,
    intent_score: Math.max(1, Math.min(10, Number(body.intent_score) || 7)),
    intent_reason: body.intent_reason?.slice(0, 300) ?? 'manually added',
    status: 'new',
  }
  const { data, error } = await admin.from('tiktok_leads').insert(row).select().maybeSingle()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ lead: data })
}

// DELETE — remove a lead
//   Body: { id }
export async function DELETE(req: NextRequest) {
  if (!(await ownerOnly())) return NextResponse.json({ error: 'Owner only' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  if (!body?.id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const admin = createSupabaseAdminClient()
  const { error } = await admin.from('tiktok_leads').delete().eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
