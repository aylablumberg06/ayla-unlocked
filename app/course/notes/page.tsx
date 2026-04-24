import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const metadata = {
  title: 'Ayla Unlocked, Saved & Noted',
}
export const dynamic = 'force-dynamic'

// Lesson index → human label (mirrors CourseDashboard tag strings after the
// Pricing Tiers insertion)
const LESSON_LABELS: Record<number, string> = {
  0: 'Welcome',
  1: '01, What Claude Is',
  2: '02, What Claude Can Do',
  3: '03, The Mindset',
  4: '04, The Big Divide',
  5: '05, Imposter Syndrome',
  6: '06, Setup',
  7: '07, Pricing Tiers',
  8: '08, Grammar? Never.',
  9: '09, Just Yap',
  10: "10, When It's Wrong",
  11: '11, Stay Organized',
  12: '12, Get an Idea',
  13: '13, When Not to AI',
  14: '14, The Four Modes',
  15: '15, HTML Files',
  16: '16, Deploying',
  17: '17, Terminal',
  18: '18, API Keys',
  19: '19, Real APIs',
  20: '20, Selling Online',
  21: '21, Stripe Walkthrough',
  22: '22, Your First Client',
  23: '23, Proposal vs Contract',
  24: '24, Agents',
  25: '25, Claude on My Phone',
  26: '26, A Day in My Life',
  27: '27, Favorite Mistakes',
  28: '28, My Top Prompts',
}

const RESERVED_KEYS = new Set(['_cert_id', '_cert_name'])

export default async function NotesPage() {
  const supa = createSupabaseServerClient()
  const { data: { user } } = await supa.auth.getUser()
  if (!user?.email) redirect('/login')

  const admin = createSupabaseAdminClient()
  const { data } = await admin
    .from('user_progress')
    .select('notes, bookmarks, confused, highlights, last_lesson, updated_at')
    .eq('email', user.email.toLowerCase())
    .maybeSingle()

  const notesRaw = (data?.notes ?? {}) as Record<string, string>
  const bookmarks: number[] = Array.from(new Set<number>(data?.bookmarks ?? []))
  const confused = new Set<number>(data?.confused ?? [])
  const highlightsRaw = (data?.highlights ?? {}) as Record<string, string[]>
  const highlightMap = new Map<number, string[]>()
  let totalHighlights = 0
  for (const [k, arr] of Object.entries(highlightsRaw)) {
    const idx = Number(k)
    if (Number.isNaN(idx)) continue
    const cleaned = Array.isArray(arr) ? arr.filter((s) => typeof s === 'string' && s.trim().length > 0) : []
    if (cleaned.length) {
      highlightMap.set(idx, cleaned)
      totalHighlights += cleaned.length
    }
  }

  // Real notes (skip reserved keys)
  const noteMap = new Map<number, string>()
  for (const [k, v] of Object.entries(notesRaw)) {
    if (RESERVED_KEYS.has(k)) continue
    const idx = Number(k)
    if (Number.isNaN(idx)) continue
    const text = typeof v === 'string' ? v.trim() : ''
    if (text) noteMap.set(idx, text)
  }

  // Union of all lesson indexes that have EITHER a note, a bookmark, or a highlight
  const allIndexes = Array.from(
    new Set<number>([
      ...Array.from(noteMap.keys()),
      ...bookmarks,
      ...Array.from(highlightMap.keys()),
    ])
  ).sort((a, b) => a - b)

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/course" className="font-serif text-lg tracking-wide">
            <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic">Unlocked</span>
          </Link>
          <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
            <Link href="/course" className="text-mid hover:text-pink link-underline">Course</Link>
            <Link href="/course/prompts" className="text-mid hover:text-pink link-underline">Prompts</Link>
            <Link href="/course/real-chats" className="text-mid hover:text-pink link-underline">Chats</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Saved &amp; noted</div>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-4">Your library.</h1>
        <p className="text-mid text-lg font-light mb-10 max-w-xl">
          Every lesson you&rsquo;ve starred, every note you&rsquo;ve written, every flag you&rsquo;ve
          raised. All in one place so nothing you wanted to remember gets lost.
        </p>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          <StatBox num={bookmarks.length} label={`bookmark${bookmarks.length === 1 ? '' : 's'}`} />
          <StatBox num={totalHighlights} label={`highlight${totalHighlights === 1 ? '' : 's'}`} />
          <StatBox num={noteMap.size} label={`note${noteMap.size === 1 ? '' : 's'}`} />
          <StatBox num={confused.size} label={`flag${confused.size === 1 ? '' : 's'}`} />
        </div>

        {allIndexes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[color:var(--border)] p-10 text-center">
            <p className="font-serif italic text-2xl mb-2">Nothing saved yet.</p>
            <p className="text-mid font-light mb-6 max-w-md mx-auto text-[14.5px]">
              Star lessons you want to come back to, or type a note at the bottom of any lesson. Anything
              you save shows up here.
            </p>
            <Link
              href="/course"
              className="inline-block bg-pink text-white text-[11px] tracking-[1.5px] uppercase font-medium px-6 py-3 rounded-full hover:bg-[#C51F4E] transition"
            >
              Back to course
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {allIndexes.map((idx) => {
              const label = LESSON_LABELS[idx] ?? `Lesson ${idx}`
              const isBm = bookmarks.includes(idx)
              const isConf = confused.has(idx)
              const noteText = noteMap.get(idx)
              const highlights = highlightMap.get(idx) ?? []
              return (
                <Link
                  key={idx}
                  href={`/course?lesson=${idx}`}
                  className="card-hover block bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6"
                >
                  <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                    <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-pink">{label}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {isBm && <Tag>★ saved</Tag>}
                      {highlights.length > 0 && <Tag>{highlights.length} highlight{highlights.length === 1 ? '' : 's'}</Tag>}
                      {isConf && <Tag>? flagged</Tag>}
                      {noteText && <Tag>noted</Tag>}
                    </div>
                  </div>

                  {highlights.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {highlights.map((h, i) => (
                        <div key={i} className="bg-[color:var(--pink-light)] border-l-2 border-pink pl-3 pr-2 py-1.5 rounded-r text-[14px] text-dark leading-relaxed">
                          &ldquo;{h}&rdquo;
                        </div>
                      ))}
                    </div>
                  )}

                  {noteText ? (
                    <p className="text-[14.5px] text-dark leading-relaxed whitespace-pre-wrap font-light">{noteText}</p>
                  ) : highlights.length === 0 ? (
                    <p className="text-[13.5px] italic text-muted-light font-light">
                      Bookmarked for later. No note or highlights yet.
                    </p>
                  ) : null}
                  <div className="text-[11px] text-muted-light tracking-[1px] mt-4 uppercase">
                    Open lesson &rarr;
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] tracking-[1.5px] uppercase text-pink bg-pink-light px-2.5 py-1 rounded-full">
      {children}
    </span>
  )
}

function StatBox({ num, label }: { num: number; label: string }) {
  return (
    <div className="bg-white border border-[color:var(--border)] rounded-2xl p-5 text-center">
      <div className="font-serif text-pink text-4xl leading-none">{num}</div>
      <div className="text-[10px] tracking-[2px] uppercase text-mid mt-2">{label}</div>
    </div>
  )
}
