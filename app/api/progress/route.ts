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
 highlights: data?.highlights ?? {},
 completed_lessons: data?.completed_lessons ?? [],
 exercises_done: data?.exercises_done ?? [],
 streak_days: data?.streak_days ?? 0,
 longest_streak: data?.longest_streak ?? 0,
 last_visit_date: data?.last_visit_date ?? null,
 notifications_seen: data?.notifications_seen ?? {},
 completed_at: data?.completed_at ?? null,
 })
}

// POST, partial upsert. Body can include any of:
// { last_lesson, bookmark: {index, on}, confused: {index, on, tag?, note?}, note: {index, text}, completed }
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
 highlights: (existing?.highlights ?? {}) as Record<string, string[]>,
 completed_lessons: (existing?.completed_lessons ?? []) as number[],
 exercises_done: (existing?.exercises_done ?? []) as string[],
 streak_days: (existing?.streak_days ?? 0) as number,
 longest_streak: (existing?.longest_streak ?? 0) as number,
 last_visit_date: (existing?.last_visit_date ?? null) as string | null,
 notifications_seen: (existing?.notifications_seen ?? {}) as Record<string, boolean>,
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

 // Mark lesson complete / uncomplete
 if (body.complete_lesson && typeof body.complete_lesson.index === 'number') {
 const idx = body.complete_lesson.index
 const on = body.complete_lesson.on !== false // default true
 const set = new Set(current.completed_lessons)
 if (on) set.add(idx)
 else set.delete(idx)
 current.completed_lessons = Array.from(set).sort((a, b) => a - b)
 }

 // Bump streak on an explicit check-in (called once per course load, client-side).
 if (body.checkin === true) {
 const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
 if (current.last_visit_date !== today) {
 const last = current.last_visit_date
 if (last) {
 const lastDate = new Date(last)
 const todayDate = new Date(today)
 const deltaDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000)
 if (deltaDays === 1) {
 current.streak_days = (current.streak_days || 0) + 1
 } else if (deltaDays > 1) {
 current.streak_days = 1
 }
 } else {
 current.streak_days = 1
 }
 if (current.streak_days > (current.longest_streak || 0)) {
 current.longest_streak = current.streak_days
 }
 current.last_visit_date = today
 }
 }

 // Mark a notification as seen so it doesn't show again
 if (typeof body.notification_seen === 'string') {
 current.notifications_seen = { ...current.notifications_seen, [body.notification_seen]: true }
 }

 // Exercise done / undone: { exercise: { id: 'ex-xx', on: true|false } }
 if (body.exercise && typeof body.exercise.id === 'string') {
 const id = body.exercise.id.trim().slice(0, 80)
 const on = body.exercise.on !== false
 const set = new Set(current.exercises_done)
 if (on) set.add(id)
 else set.delete(id)
 current.exercises_done = Array.from(set)
 }

 // Highlights: { index, text, op: 'add' | 'remove' }
 if (body.highlight && typeof body.highlight.index === 'number' && typeof body.highlight.text === 'string') {
 const idx = String(body.highlight.index)
 const text = body.highlight.text.trim().slice(0, 1000)
 const op = body.highlight.op === 'remove' ? 'remove' : 'add'
 const arr = Array.isArray(current.highlights[idx]) ? [...current.highlights[idx]] : []
 if (op === 'add' && text && !arr.includes(text)) {
 arr.push(text)
 } else if (op === 'remove') {
 const i = arr.indexOf(text)
 if (i > -1) arr.splice(i, 1)
 }
 if (arr.length) current.highlights[idx] = arr
 else delete current.highlights[idx]
 }

 const { error } = await admin.from('user_progress').upsert(
 {
 email,
 last_lesson: current.last_lesson,
 bookmarks: current.bookmarks,
 confused: current.confused,
 notes: current.notes,
 highlights: current.highlights,
 completed_lessons: current.completed_lessons,
 exercises_done: current.exercises_done,
 streak_days: current.streak_days,
 longest_streak: current.longest_streak,
 last_visit_date: current.last_visit_date,
 notifications_seen: current.notifications_seen,
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
 highlights: current.highlights,
 completed_lessons: current.completed_lessons,
 exercises_done: current.exercises_done,
 streak_days: current.streak_days,
 longest_streak: current.longest_streak,
 last_visit_date: current.last_visit_date,
 notifications_seen: current.notifications_seen,
 completed_at: current.completed_at,
 })
}
