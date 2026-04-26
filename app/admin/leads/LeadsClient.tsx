'use client'

import { useState } from 'react'
import Link from 'next/link'

type Lead = {
  id: string
  handle: string
  source: string
  video_url: string | null
  video_caption: string | null
  comment_text: string | null
  intent_score: number
  intent_reason: string | null
  status: string
  notes: string | null
  sent_at: string | null
  created_at: string
}

const STATUSES = ['new', 'sent', 'replied', 'converted', 'skip'] as const

export default function LeadsClient({
  initialLeads,
  initialError,
}: {
  initialLeads: Lead[]
  initialError: string | null
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [filter, setFilter] = useState<'all' | 'new' | 'sent' | 'converted'>('all')
  const [scrapeBusy, setScrapeBusy] = useState(false)
  const [scrapeMsg, setScrapeMsg] = useState<string | null>(null)
  const [tab, setTab] = useState<'list' | 'dm'>('list')
  const [handleInput, setHandleInput] = useState('')
  const [focusInput, setFocusInput] = useState<'unlocked' | 'all'>('unlocked')
  const [maxVideos, setMaxVideos] = useState(10)

  // DM lead manual-add state
  const [dmHandle, setDmHandle] = useState('')
  const [dmText, setDmText] = useState('')
  const [dmScore, setDmScore] = useState(7)
  const [dmAdding, setDmAdding] = useState(false)
  const [dmMsg, setDmMsg] = useState<string | null>(null)

  const filtered =
    filter === 'all'
      ? leads
      : leads.filter((l) => (filter === 'new' ? l.status === 'new' : l.status === filter))

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    sent: leads.filter((l) => l.status === 'sent').length,
    converted: leads.filter((l) => l.status === 'converted').length,
    avgScore:
      leads.length > 0
        ? (leads.reduce((s, l) => s + (l.intent_score || 0), 0) / leads.length).toFixed(1)
        : '–',
  }

  async function runScrape() {
    setScrapeBusy(true)
    setScrapeMsg('Scraping… this can take a few minutes.')
    try {
      const r = await fetch('/api/scrape-tiktok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: handleInput || undefined,
          focus: focusInput,
          max_videos: maxVideos,
        }),
      })
      const out = await r.json()
      if (!r.ok) {
        setScrapeMsg(`✗ ${out.error || 'Scrape failed'}`)
      } else {
        setScrapeMsg(
          `✓ ${out.leads_inserted ?? 0} new leads (${out.leads_skipped_duplicates ?? 0} duplicates skipped). Scanned ${out.comments_total ?? 0} comments across ${out.videos_targeted ?? 0} videos.`
        )
        // Refresh
        const lr = await fetch('/api/leads')
        const ld = await lr.json()
        if (ld.leads) setLeads(ld.leads)
      }
    } catch (e: any) {
      setScrapeMsg(`✗ ${e?.message || e}`)
    } finally {
      setScrapeBusy(false)
    }
  }

  async function patchLead(id: string, patch: Partial<{ status: string; mark_sent: boolean; notes: string }>) {
    const optimistic = leads.map((l) =>
      l.id === id
        ? {
            ...l,
            status: patch.status ?? (patch.mark_sent === true ? 'sent' : patch.mark_sent === false ? 'new' : l.status),
            sent_at: patch.mark_sent === true ? new Date().toISOString() : patch.mark_sent === false ? null : l.sent_at,
            notes: patch.notes ?? l.notes,
          }
        : l
    )
    setLeads(optimistic)
    await fetch('/api/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...patch }),
    })
  }

  async function deleteLead(id: string) {
    if (!confirm('Delete this lead?')) return
    setLeads(leads.filter((l) => l.id !== id))
    await fetch('/api/leads', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  async function addDmLead() {
    const handle = dmHandle.trim().replace(/^@/, '')
    if (!handle) {
      setDmMsg('Need a handle.')
      return
    }
    setDmAdding(true)
    setDmMsg(null)
    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle,
          source: 'dm',
          comment_text: dmText.trim() || null,
          intent_score: dmScore,
          intent_reason: 'DM lead, manually added',
        }),
      })
      const out = await r.json()
      if (!r.ok) throw new Error(out.error || 'Add failed')
      setLeads([out.lead, ...leads])
      setDmHandle('')
      setDmText('')
      setDmScore(7)
      setDmMsg('✓ Added')
    } catch (e: any) {
      setDmMsg(`✗ ${e?.message || e}`)
    } finally {
      setDmAdding(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream text-dark p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2 gap-4 flex-wrap">
          <h1 className="font-serif text-4xl md:text-5xl">
            Leads <span className="text-pink italic">(TikTok)</span>
          </h1>
          <Link href="/admin" className="text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink">
            ← Back to admin
          </Link>
        </div>
        <p className="text-mid font-light mb-8 text-[15px]">
          People commenting on your TikToks who look like they&rsquo;d buy the course. Apify pulls comments from your last
          videos, Claude scores each one for purchase intent. Toggle &ldquo;Sent&rdquo; once you DM them.
        </p>

        {initialError && (
          <div className="mb-6 p-4 rounded-lg border-l-2 border-pink bg-pink-pale text-sm">
            <strong className="text-pink">Database error:</strong> {initialError}
            <br />
            <span className="text-mid">
              Run the SQL in <code className="text-pink">supabase-schema.sql</code> against your Supabase project to create the{' '}
              <code className="text-pink">tiktok_leads</code> table.
            </span>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <Stat label="Total" value={stats.total} />
          <Stat label="New" value={stats.new} highlight />
          <Stat label="Sent" value={stats.sent} />
          <Stat label="Converted" value={stats.converted} />
          <Stat label="Avg score" value={stats.avgScore} />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[color:var(--border)]">
          <TabBtn active={tab === 'list'} onClick={() => setTab('list')}>
            All leads
          </TabBtn>
          <TabBtn active={tab === 'dm'} onClick={() => setTab('dm')}>
            Add DM lead manually
          </TabBtn>
        </div>

        {tab === 'list' && (
          <>
            {/* Scrape controls */}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-5 md:p-6 mb-6">
              <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-pink mb-3">Pull new leads from TikTok</div>
              <div className="flex flex-wrap gap-3 items-end">
                <div>
                  <label className="block text-[10px] tracking-[1.5px] uppercase text-mid mb-1">TikTok handle</label>
                  <input
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                    placeholder="@theaylaedit (or env)"
                    className="px-3 py-2 rounded-lg border border-[color:var(--border)] bg-white text-sm w-56"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[1.5px] uppercase text-mid mb-1">Focus</label>
                  <select
                    value={focusInput}
                    onChange={(e) => setFocusInput(e.target.value as 'unlocked' | 'all')}
                    className="px-3 py-2 rounded-lg border border-[color:var(--border)] bg-white text-sm"
                  >
                    <option value="unlocked">Only “Ayla Unlocked” videos</option>
                    <option value="all">All recent videos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[1.5px] uppercase text-mid mb-1">Max videos</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={maxVideos}
                    onChange={(e) => setMaxVideos(Math.max(1, Math.min(30, Number(e.target.value) || 10)))}
                    className="px-3 py-2 rounded-lg border border-[color:var(--border)] bg-white text-sm w-20"
                  />
                </div>
                <button
                  onClick={runScrape}
                  disabled={scrapeBusy}
                  className="bg-pink text-white px-6 py-2.5 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] disabled:opacity-50 transition"
                >
                  {scrapeBusy ? 'Scraping…' : 'Run scrape now'}
                </button>
              </div>
              {scrapeMsg && <p className="text-[12px] text-mid mt-3">{scrapeMsg}</p>}
              <p className="text-[11px] text-muted-light mt-3 leading-relaxed">
                Requires <code className="text-pink">APIFY_API_TOKEN</code> in Vercel env vars. Free tier covers a few hundred comments per
                month, plenty for weekly runs. Heads up: TikTok DMs are private and can&rsquo;t be scraped, use the &ldquo;Add DM lead manually&rdquo;
                tab for those.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {(['all', 'new', 'sent', 'converted'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-[11px] tracking-[1.5px] uppercase font-medium transition ${
                    filter === f
                      ? 'bg-pink text-white'
                      : 'bg-white border border-[color:var(--border)] text-mid hover:border-pink hover:text-pink'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Leads list */}
            <div className="space-y-3">
              {filtered.length === 0 && (
                <div className="text-center text-mid py-12 text-sm">
                  No leads {filter === 'all' ? 'yet' : `with status “${filter}”`}. Run a scrape above or add one manually.
                </div>
              )}
              {filtered.map((l) => (
                <LeadCard key={l.id} lead={l} onPatch={patchLead} onDelete={deleteLead} />
              ))}
            </div>
          </>
        )}

        {tab === 'dm' && (
          <div className="rounded-2xl border border-[color:var(--border)] bg-white/60 p-6 md:p-8 max-w-2xl">
            <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-pink mb-3">Add a DM lead</div>
            <p className="text-sm text-mid mb-5">
              TikTok DMs are private, can&rsquo;t be scraped automatically. When someone DMs you something promising, drop their handle here so it&rsquo;s tracked alongside your comment leads.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-mid mb-1">Handle</label>
                <input
                  value={dmHandle}
                  onChange={(e) => setDmHandle(e.target.value)}
                  placeholder="@username"
                  className="w-full px-4 py-2.5 rounded-lg border border-[color:var(--border)] bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-mid mb-1">What did they say (optional)</label>
                <textarea
                  value={dmText}
                  onChange={(e) => setDmText(e.target.value)}
                  rows={3}
                  placeholder="paste their message"
                  className="w-full px-4 py-2.5 rounded-lg border border-[color:var(--border)] bg-white text-sm resize-y"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[1.5px] uppercase text-mid mb-1">
                  Intent score: <span className="text-pink font-semibold">{dmScore}</span>/10
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={dmScore}
                  onChange={(e) => setDmScore(Number(e.target.value))}
                  className="w-full accent-pink"
                />
              </div>
              <button
                onClick={addDmLead}
                disabled={dmAdding}
                className="bg-pink text-white px-6 py-2.5 rounded-full text-xs tracking-[1.5px] uppercase font-medium hover:bg-[#C51F4E] disabled:opacity-50 transition"
              >
                {dmAdding ? 'Adding…' : 'Add lead'}
              </button>
              {dmMsg && <p className="text-[12px] text-mid mt-2">{dmMsg}</p>}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function Stat({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlight ? 'bg-pink-light border border-pink' : 'bg-white border border-[color:var(--border)]'
      }`}
    >
      <div className="font-serif text-3xl font-medium text-pink">{value}</div>
      <div className="text-[10px] tracking-[2px] uppercase text-mid mt-1">{label}</div>
    </div>
  )
}

function TabBtn({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-[11px] tracking-[1.5px] uppercase font-medium border-b-2 -mb-px transition ${
        active ? 'border-pink text-pink' : 'border-transparent text-mid hover:text-pink'
      }`}
    >
      {children}
    </button>
  )
}

function buildDM(): string {
  return `Hi, I saw your comment on my post about AI. I made a course that explains everything I've learned. 30 lessons that take you from never having opened claude to building real stuff with it. plain english, no tech jargon aylaunlocked.com  !!`
}

function LeadCard({
  lead,
  onPatch,
  onDelete,
}: {
  lead: Lead
  onPatch: (id: string, patch: any) => void
  onDelete: (id: string) => void
}) {
  const [notes, setNotes] = useState(lead.notes ?? '')
  const [notesOpen, setNotesOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [dmOpen, setDmOpen] = useState(false)
  const dm = buildDM()
  const sentVisual = lead.status === 'sent' || lead.status === 'replied' || lead.status === 'converted'

  async function copyDM() {
    try {
      await navigator.clipboard.writeText(dm)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select textarea contents
      const ta = document.getElementById(`dm-${lead.id}`) as HTMLTextAreaElement | null
      if (ta) {
        ta.select()
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
  }

  const tiktokUrl = `https://www.tiktok.com/@${lead.handle}`
  const scoreColor = lead.intent_score >= 8 ? 'bg-pink text-white' : lead.intent_score >= 6 ? 'bg-pink-light text-pink' : 'bg-white border border-[color:var(--border)] text-mid'

  return (
    <div className={`rounded-2xl border p-4 md:p-5 ${sentVisual ? 'border-[color:var(--border)] bg-white/40 opacity-70' : 'border-[color:var(--border)] bg-white'}`}>
      <div className="flex items-start gap-4 flex-wrap">
        <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${scoreColor}`}>
          {lead.intent_score}
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-xl font-medium hover:text-pink"
            >
              @{lead.handle}
            </a>
            <span className="text-[10px] tracking-[1.5px] uppercase text-muted-light">
              {lead.source}
            </span>
            {lead.video_url && (
              <a
                href={lead.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[1.5px] uppercase text-pink hover:underline"
              >
                video ↗
              </a>
            )}
            <span className="text-[10px] text-muted-light">
              {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          {lead.comment_text && (
            <div className="text-sm text-dark mb-2 leading-relaxed italic">&ldquo;{lead.comment_text}&rdquo;</div>
          )}
          {lead.intent_reason && (
            <div className="text-[11px] text-mid">
              <span className="text-muted-light tracking-[1px] uppercase mr-2">why:</span>
              {lead.intent_reason}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 items-end">
          <button
            onClick={() => onPatch(lead.id, { mark_sent: !sentVisual })}
            className={`px-4 py-1.5 rounded-full text-[10px] tracking-[2px] uppercase font-semibold transition ${
              sentVisual
                ? 'bg-white border border-[color:var(--border)] text-mid hover:border-pink hover:text-pink'
                : 'bg-pink text-white hover:bg-[#C51F4E]'
            }`}
          >
            {sentVisual ? '↶ Mark unsent' : '✓ Mark sent'}
          </button>
          <select
            value={lead.status}
            onChange={(e) => onPatch(lead.id, { status: e.target.value })}
            className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-[color:var(--border)] text-mid hover:border-pink"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => onDelete(lead.id)}
            className="text-[10px] tracking-[1.5px] uppercase text-muted-light hover:text-pink"
          >
            delete
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-4 flex-wrap">
        <button
          onClick={() => setDmOpen((v) => !v)}
          className="text-[10px] tracking-[1.5px] uppercase text-mid hover:text-pink"
        >
          {dmOpen ? 'hide message' : 'view message'}
        </button>
        <button
          onClick={() => setNotesOpen((v) => !v)}
          className="text-[10px] tracking-[1.5px] uppercase text-mid hover:text-pink"
        >
          {notesOpen ? 'hide notes' : lead.notes ? 'view notes' : 'add notes'}
        </button>
      </div>
      {dmOpen && (
        <div className="mt-2 rounded-lg border border-[color:var(--border)] bg-pink-light/40 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-[2px] uppercase text-pink font-semibold">Draft DM</span>
            <button
              onClick={copyDM}
              className={`px-3 py-1 rounded-full text-[10px] tracking-[1.5px] uppercase font-semibold transition ${
                copied
                  ? 'bg-pink text-white'
                  : 'bg-white border border-[color:var(--border)] text-mid hover:border-pink hover:text-pink'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            id={`dm-${lead.id}`}
            readOnly
            value={dm}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-[color:var(--border)] bg-white text-sm resize-y leading-relaxed"
          />
          <p className="text-[10px] text-muted-light mt-2">
            Tweak before sending if you want — this is a starter draft.
          </p>
        </div>
      )}
      {notesOpen && (
        <div className="mt-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => {
              if (notes !== (lead.notes ?? '')) onPatch(lead.id, { notes })
            }}
            rows={2}
            placeholder="add a note (saves on blur)"
            className="w-full px-3 py-2 rounded-lg border border-[color:var(--border)] bg-cream text-sm resize-y"
          />
        </div>
      )}
    </div>
  )
}
