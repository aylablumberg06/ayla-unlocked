import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `You are Ayla's friendly assistant on her course site, Ayla Unlocked.

ABOUT THE COURSE:
- Ayla Unlocked is a $39 one-time-purchase course by Ayla Blumberg, a 19-year-old who taught herself to build with AI from zero in about a month.
- The course teaches non-technical women how to use Claude (Anthropic's AI) to build real things, websites, automations, and agents, without writing code.
- There are 20 lessons covering: what Claude is, what it can do, the mindset shift, setup, how to talk to it, finding an idea, Claude Chat vs. Claude Code vs. Cowork, HTML files, deploying (Homebrew/GitHub/Vercel), Terminal, API keys, real APIs (Gmail/Apify/Canva/Anthropic), selling online with Stripe, a Stripe step-by-step, what to do when Claude gets it wrong, staying organized, and agents.
- Lifetime access, one-time $39 payment via Stripe.
- Purchase at /unlock. After paying, users enter their email to get a magic link by email and are taken to the course.

YOUR JOB:
- Answer questions about the course, Claude (the AI), building with AI, Ayla's background, pricing, access, setup, warmly, briefly, in plain English.
- Match Ayla's voice: warm, casual, direct, no tech-bro jargon, a little playful. Short sentences. No em-dashes except as natural punctuation. No bullet-point walls of text unless the user asks for a list.
- Never make up facts about pricing or the course. The price is $39, lifetime, one-time.

WHEN TO ESCALATE:
- If the user asks something only Ayla personally can answer (hiring, custom work, refunds, account issues with their specific email/payment, timing questions about video releases), or if you genuinely don't know, say:
 "That one's better for Ayla directly, tap the 'Ask Ayla' button below and I'll forward it to her."
- If they just need a factual answer you can give, don't escalate.

TONE EXAMPLES:
- "Claude is an AI made by Anthropic, kinda like ChatGPT but made by different people. I like it because it's the best for actually building things."
- "Totally, you don't need any coding background. The whole course is designed for people starting from zero."

Keep replies under ~120 words unless the user specifically asks for more detail.`

type InMsg = { role: 'user' | 'assistant'; content: string }

export async function POST(req: NextRequest) {
 try {
 if (!process.env.ANTHROPIC_API_KEY) {
 return NextResponse.json(
 { error: 'Chat is not configured yet.' },
 { status: 503 }
 )
 }

 const { messages } = (await req.json()) as { messages: InMsg[] }
 if (!Array.isArray(messages) || messages.length === 0) {
 return NextResponse.json({ error: 'No messages' }, { status: 400 })
 }

 const anthropic = new Anthropic({
 apiKey: process.env.ANTHROPIC_API_KEY,
 timeout: 120_000,
 })

 const trimmed = messages.slice(-12).map((m) => ({
 role: m.role,
 content: String(m.content || '').slice(0, 2000),
 }))

 const resp = await anthropic.messages.create({
 model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5',
 max_tokens: 600,
 system: [
 {
 type: 'text',
 text: SYSTEM_PROMPT,
 cache_control: { type: 'ephemeral' },
 },
 ],
 messages: trimmed,
 })

 const text = resp.content
 .filter((b) => b.type === 'text')
 .map((b) => (b.type === 'text' ? b.text : ''))
 .join('\n')
 .trim()

 // Log the new exchange (last user msg + assistant reply). Best-effort.
 try {
 const { createSupabaseAdminClient, createSupabaseServerClient } = await import('@/lib/supabase')
 const supa = createSupabaseServerClient()
 const { data: { user } } = await supa.auth.getUser().catch(() => ({ data: { user: null } as any }))
 const email = user?.email?.toLowerCase() ?? null
 const sessionId = req.headers.get('x-session-id') ?? null
 const lastUser = [...trimmed].reverse().find((m) => m.role === 'user')
 const admin = createSupabaseAdminClient()
 const rows = []
 if (lastUser) rows.push({ email, session_id: sessionId, role: 'user', content: String(lastUser.content).slice(0, 4000) })
 if (text) rows.push({ email, session_id: sessionId, role: 'assistant', content: text.slice(0, 4000) })
 if (rows.length) await admin.from('chat_logs').insert(rows)
 } catch (logErr) {
 console.warn('[ask-claude] log failed', logErr)
 }

 return NextResponse.json({ reply: text })
 } catch (e: any) {
 console.error('[ask-claude]', e)
 return NextResponse.json(
 { error: e?.message || 'Something went wrong.' },
 { status: 500 }
 )
 }
}
