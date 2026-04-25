import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/quiz
 *
 * Saves the user's quiz attempt (mode + inputs + ranked output ideas)
 * onto user_progress.notes._quiz_log as a JSON-stringified array of entries.
 * No schema change required, we piggyback on the existing notes jsonb column.
 *
 * Each entry: { ts: ISO, mode: 'self'|'client', inputs: { interests, pain, goal, intensity }, top: [{ title, score }] }
 */

type QuizEntry = {
 ts: string
 mode: 'self' | 'client'
 inputs: {
 interests?: string[]
 pain?: string | null
 goal?: string | null
 intensity?: string | null
 }
 top: { title: string; score: number }[]
}

const MAX_ENTRIES = 20 // keep last 20 attempts per user

export async function POST(req: NextRequest) {
 const supa = createSupabaseServerClient()
 const { data: { user } } = await supa.auth.getUser()
 if (!user?.email) {
 return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
 }
 const email = user.email.toLowerCase()

 let body: any
 try {
 body = await req.json()
 } catch {
 return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })
 }
 const { mode, inputs, top } = body || {}
 if (mode !== 'self' && mode !== 'client') {
 return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
 }

 const entry: QuizEntry = {
 ts: new Date().toISOString(),
 mode,
 inputs: inputs || {},
 top: Array.isArray(top) ? top.slice(0, 3) : [],
 }

 const admin = createSupabaseAdminClient()
 const { data: existing } = await admin
 .from('user_progress')
 .select('notes')
 .eq('email', email)
 .maybeSingle()

 const notes = (existing?.notes as Record<string, string> | null) || {}

 let log: QuizEntry[] = []
 if (typeof notes._quiz_log === 'string') {
 try { log = JSON.parse(notes._quiz_log) } catch { log = [] }
 }
 log.unshift(entry)
 log = log.slice(0, MAX_ENTRIES)

 const newNotes = { ...notes, _quiz_log: JSON.stringify(log) }

 const { error: upErr } = await admin
 .from('user_progress')
 .upsert({ email, notes: newNotes }, { onConflict: 'email' })

 if (upErr) {
 console.error('[quiz POST] upsert failed:', upErr.message)
 return NextResponse.json({ error: 'Save failed' }, { status: 500 })
 }

 return NextResponse.json({ ok: true })
}
