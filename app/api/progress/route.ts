import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'


// GET, return the current user's progress
export async function GET() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const email = user.email.toLowerCase()

  const admin = createSupabaseAdminClient()
  const { data, error } = await admin
    .from('user_progress')
    .select('*')
    .eq('email', email)
    .maybeSingle()
  if (error) {
    // Table might not exist yet (schema not run). Return defaults gracefully.
    console.warn('[progress GET] falling back to defaults:', error.message)
    return NextResponse.json({
      email,
      last_lesson: 0,
      bookmarks: [],
      confused: [],
      notes: {},
      completed_at: null,
    })
  }

  return NextResponse.json({
    email,
    last_lesson: data?.last_lesson ?? 0,
    bookmarks: data?.bookmarks ?? [],
    confused: data?.confused ?? [],
    notes: data?.notes ?? {},
    completed_at: data?.completed_at ?? null,
  })
}

// POST, partial upsert. Body can include any of:
//   { last_lesson, bookmark: {index, on}, confused: {index, on, tag?, note?}, note: {index, text}, completed }
export async function POST(req: NextRequest) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const email = user.email.toLowerCase()

  const body = await req.json().catch(() => ({}))
  const admin = createSupabaseAdminClient()

  // Load current row (or default)
  const { data: existing } = await admin
    .from('user_progress')
    .select('*')
    .eq('email', email)
    .maybeSingle()

  const current = {
    email,
    last_lesson: existing?.last_lesson ?? 0,
    bookmarks: (existing?.bookmarks ?? []) as number[],
    confused: (existing?.confused ?? []) as number[],
    notes: (existing?.notes ?? {}) as Record<string, string>,
    completed_at: existing?.completed_at ?? null,
  }

  if (typeof body.last_lesson === 'number') {
    current.last_lesson = body.last_lesson
  }

  if (body.bookmark && typeof body.bookmark.index === 'number') {
    const idx = body.bookmark.index
    const on = !!body.bookmark.on
    const set = new Set(current.bookmarks)
    if (on) set.add(idx)
    else set.delete(idx)
    current.bookmarks = Array.from(set).sort((a, b) => a - b)
  }

  if (body.confused && typeof body.confused.index === 'number') {
    const idx = body.confused.index
    const on = !!body.confused.on
    const set = new Set(current.confused)
    if (on) {
      set.add(idx)
      // also log to aggregate table so Ayla can review the most confusing lessons
      await admin.from('confused_flags').insert({
        email,
        lesson_index: idx,
        lesson_tag: body.confused.tag ?? null,
        note: body.confused.note ?? null,
      })
    } else {
      set.delete(idx)
    }
    current.confused = Array.from(set).sort((a, b) => a - b)
  }

  if (body.note && typeof body.note.index === 'number') {
    const key = String(body.note.index)
    if (body.note.text && body.note.text.trim()) {
      current.notes[key] = body.note.text.slice(0, 10_000)
    } else {
      delete current.notes[key]
    }
  }

  if (body.completed === true && !current.completed_at) {
    current.completed_at = new Date().toISOString()
  }

  const { error } = await admin.from('user_progress').upsert(
    {
      email,
      last_lesson: current.last_lesson,
      bookmarks: current.bookmarks,
      confused: current.confused,
      notes: current.notes,
      completed_at: current.completed_at,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'email' }
  )
  if (error) {
    console.error('[progress POST]', error)
    return NextResponse.json({ error: 'db error' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    last_lesson: current.last_lesson,
    bookmarks: current.bookmarks,
    confused: current.confused,
    notes: current.notes,
    completed_at: current.completed_at,
  })
}
