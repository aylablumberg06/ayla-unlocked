import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300 // 5 min, Apify scrapes can take a while

// ──────────────────────────────────────────────────────────────
// POST /api/scrape-tiktok
//   Body: { handle?: string, max_videos?: number, focus?: 'unlocked'|'all' }
//   handle: defaults to env.AYLA_TIKTOK_HANDLE
//   focus: 'unlocked' = only videos whose caption mentions Ayla
//          Unlocked. 'all' = comments across all recent videos.
//   max_videos: cap on videos to comment-scrape (default 10)
//
// Flow:
//   1. Apify clockworks/tiktok-scraper pulls handle's recent videos
//   2. Filter to videos that match `focus`
//   3. For each, Apify clockworks/tiktok-comments-scraper pulls comments
//   4. Claude scores every comment 1–10 for purchase intent
//   5. Anything 4+ goes into tiktok_leads (idempotent on handle+video+text)
//
// Requires env: APIFY_API_TOKEN, ANTHROPIC_API_KEY, AYLA_TIKTOK_HANDLE (optional)
// ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Owner-only — same gate the admin dashboard uses (auth user must be the owner email)
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const ownerEmail = (process.env.OWNER_EMAIL || 'aylablumberg06@gmail.com').toLowerCase()
  if (!user?.email || user.email.toLowerCase() !== ownerEmail) {
    return NextResponse.json({ error: 'Owner only' }, { status: 401 })
  }

  const apifyToken = process.env.APIFY_API_TOKEN
  if (!apifyToken) {
    return NextResponse.json(
      {
        error:
          'APIFY_API_TOKEN is not set. Sign up at apify.com (free tier is plenty for this), copy the token from Settings → Integrations → Personal API tokens, paste it into Vercel env vars as APIFY_API_TOKEN, and redeploy.',
      },
      { status: 503 }
    )
  }

  const body = await req.json().catch(() => ({}))
  const handle: string = (body.handle || process.env.AYLA_TIKTOK_HANDLE || '').replace(/^@/, '').trim()
  if (!handle) {
    return NextResponse.json(
      { error: 'No TikTok handle. Pass { handle: "yourhandle" } or set AYLA_TIKTOK_HANDLE env var.' },
      { status: 400 }
    )
  }
  const focus: 'unlocked' | 'all' = body.focus === 'all' ? 'all' : 'unlocked'
  const maxVideos = Math.min(Math.max(Number(body.max_videos) || 10, 1), 30)

  const log: string[] = []
  const push = (s: string) => log.push(`${new Date().toISOString()} · ${s}`)
  push(`Scrape start: handle=@${handle}, focus=${focus}, max_videos=${maxVideos}`)

  // 1. Pull recent videos from Apify
  let videos: Array<{ url: string; caption: string; createTime?: number }> = []
  try {
    const profileItems = await runApifySync(
      'clockworks~tiktok-scraper',
      {
        profiles: [handle],
        resultsPerPage: 30,
        excludePinnedPosts: false,
        shouldDownloadCovers: false,
        shouldDownloadVideos: false,
        shouldDownloadSubtitles: false,
      },
      apifyToken
    )
    videos = (profileItems || [])
      .map((it: any) => ({
        url: String(it.webVideoUrl || it.shareUrl || ''),
        caption: String(it.text || it.desc || it.caption || ''),
        createTime: it.createTimeISO ? new Date(it.createTimeISO).getTime() : Number(it.createTime) || undefined,
      }))
      .filter((v) => v.url)
      .sort((a, b) => (b.createTime || 0) - (a.createTime || 0))
    push(`Pulled ${videos.length} videos from @${handle}`)
  } catch (e: any) {
    push(`Apify profile scrape failed: ${e?.message || e}`)
    return NextResponse.json({ error: `Apify profile scrape failed: ${e?.message || e}`, log }, { status: 502 })
  }

  // 2. Filter
  const targetVideos =
    focus === 'unlocked'
      ? videos.filter((v) => /ayla\s*unlocked|unlocked/i.test(v.caption))
      : videos
  const slice = targetVideos.slice(0, maxVideos)
  push(`Targeting ${slice.length} video(s) for comment scrape (filter=${focus})`)
  if (slice.length === 0) {
    return NextResponse.json({
      ok: true,
      log,
      videos_total: videos.length,
      videos_targeted: 0,
      message:
        focus === 'unlocked'
          ? 'No recent videos matched "Ayla Unlocked." Try { focus: "all" } to scan every video.'
          : 'No videos found at all. Check the handle.',
    })
  }

  // 3. Pull comments
  let allComments: Array<{ video_url: string; video_caption: string; handle: string; text: string }> = []
  try {
    const items = await runApifySync(
      'clockworks~tiktok-comments-scraper',
      {
        postURLs: slice.map((v) => v.url),
        commentsPerPost: 100,
        maxRepliesPerComment: 0,
      },
      apifyToken
    )
    for (const it of items || []) {
      const videoUrl = String(it.videoWebUrl || it.postUrl || it.webVideoUrl || '')
      const matchVideo = slice.find((v) => v.url === videoUrl) || slice.find((v) => videoUrl.includes(v.url.split('/video/')[1] || ''))
      const handle = String(it.uniqueId || it.user?.uniqueId || it.username || '').replace(/^@/, '')
      const text = String(it.text || it.comment || '').trim()
      if (!handle || !text) continue
      allComments.push({
        video_url: videoUrl || matchVideo?.url || '',
        video_caption: matchVideo?.caption || '',
        handle,
        text,
      })
    }
    push(`Pulled ${allComments.length} comments`)
  } catch (e: any) {
    push(`Apify comments scrape failed: ${e?.message || e}`)
    return NextResponse.json({ error: `Apify comments scrape failed: ${e?.message || e}`, log }, { status: 502 })
  }

  // De-dupe within this batch (same commenter saying same thing multiple times)
  const seen = new Set<string>()
  allComments = allComments.filter((c) => {
    const key = `${c.handle}|${c.video_url}|${c.text.slice(0, 200)}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  push(`After dedupe: ${allComments.length} unique comments`)

  // 4. Score with Claude — batched, single call
  let scored: Array<{ idx: number; score: number; reason: string }> = []
  if (allComments.length > 0) {
    try {
      scored = await scoreCommentsWithClaude(allComments)
      push(`Claude scored ${scored.length} comments`)
    } catch (e: any) {
      push(`Claude scoring failed: ${e?.message || e}. Falling back to heuristic scoring.`)
      scored = allComments.map((c, idx) => ({ idx, score: heuristicScore(c.text), reason: 'heuristic' }))
    }
  }

  // 5. Insert leads with score >= 4 into Supabase (skip lower)
  const admin = createSupabaseAdminClient()
  const rows = scored
    .filter((s) => s.score >= 4)
    .map((s) => {
      const c = allComments[s.idx]
      return {
        handle: c.handle.toLowerCase(),
        source: 'comment',
        video_url: c.video_url,
        video_caption: c.video_caption.slice(0, 500),
        comment_text: c.text.slice(0, 1000),
        intent_score: s.score,
        intent_reason: s.reason.slice(0, 300),
        status: 'new',
      }
    })

  let inserted = 0
  let skipped = 0
  if (rows.length > 0) {
    // Upsert with onConflict on the unique constraint
    const { data, error } = await admin
      .from('tiktok_leads')
      .upsert(rows, { onConflict: 'handle,video_url,comment_text', ignoreDuplicates: true })
      .select('id')
    if (error) {
      push(`Supabase insert error: ${error.message}`)
    } else {
      inserted = data?.length || 0
      skipped = rows.length - inserted
    }
  }
  push(`Inserted ${inserted} new leads (${skipped} were duplicates of existing rows)`)

  return NextResponse.json({
    ok: true,
    log,
    videos_total: videos.length,
    videos_targeted: slice.length,
    comments_total: allComments.length,
    leads_qualified: rows.length,
    leads_inserted: inserted,
    leads_skipped_duplicates: skipped,
  })
}

// ──────────────────────────────────────────────────────────────
// Apify helper: run an actor synchronously and return dataset items
// ──────────────────────────────────────────────────────────────
async function runApifySync(actorId: string, input: any, token: string): Promise<any[]> {
  const url = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${token}&timeout=240`
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!r.ok) {
    const txt = await r.text().catch(() => '')
    throw new Error(`Apify ${actorId} returned ${r.status}: ${txt.slice(0, 500)}`)
  }
  const data = await r.json().catch(() => null)
  return Array.isArray(data) ? data : []
}

// ──────────────────────────────────────────────────────────────
// Claude scoring: score every comment 1-10 for purchase intent
// ──────────────────────────────────────────────────────────────
async function scoreCommentsWithClaude(
  comments: Array<{ handle: string; text: string }>
): Promise<Array<{ idx: number; score: number; reason: string }>> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
  const model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514'

  // Chunk into groups of 50 to keep token use reasonable
  const out: Array<{ idx: number; score: number; reason: string }> = []
  const chunkSize = 50
  for (let i = 0; i < comments.length; i += chunkSize) {
    const chunk = comments.slice(i, i + chunkSize)
    const numbered = chunk
      .map((c, j) => `${j}. @${c.handle}: ${c.text.replace(/\s+/g, ' ').slice(0, 220)}`)
      .join('\n')

    const prompt = `You are scoring TikTok comments for "Ayla Unlocked," a $39 self-paced course teaching people how to actually build with Claude (websites, agents, automations) without a coding background. The audience skews young, female, non-tech.

Score each comment 1-10 for likelihood the commenter would buy this course right now if they saw the link.

10 = explicit ask to buy / "where can I get this" / "drop the link"
7-9 = "teach me" / "how do I learn this" / "I want to do this" / "show me how" / asking to be shown the workflow
4-6 = curious or impressed but not asking to learn ("this is cool", "love this")
1-3 = unrelated, sarcastic, just an emoji, or very low engagement

Output JSON only. Format:
[{"i":0,"s":9,"r":"asked how to get started"},{"i":1,"s":3,"r":"just emoji"}]

Comments:
${numbered}`

    const resp = await anthropic.messages.create({
      model,
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = resp.content
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')
    const json = text.match(/\[[\s\S]*\]/)?.[0] || '[]'
    let parsed: Array<{ i: number; s: number; r: string }> = []
    try {
      parsed = JSON.parse(json)
    } catch {
      parsed = []
    }
    for (const p of parsed) {
      if (typeof p?.i === 'number' && p.i >= 0 && p.i < chunk.length) {
        out.push({
          idx: i + p.i,
          score: Math.max(1, Math.min(10, Math.round(p.s) || 1)),
          reason: String(p.r || '').slice(0, 200),
        })
      }
    }
  }
  return out
}

// Heuristic fallback if Claude API fails
function heuristicScore(text: string): number {
  const t = text.toLowerCase()
  if (/(drop the link|link please|where can i get|sign me up|sold|i'?m buying|how much)/i.test(t)) return 9
  if (/(teach me|show me|how do (i|you)|how did you|tutorial|walk me through|i wanna learn|guide me)/i.test(t)) return 8
  if (/(this is amazing|this is sick|need this|want this|so good|obsessed)/i.test(t)) return 5
  return 2
}
