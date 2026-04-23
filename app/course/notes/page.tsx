import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseAdminClient } from '@/lib/supabase'

export const metadata = {
  title: 'Ayla Unlocked, My Notes',
}
export const dynamic = 'force-dynamic'

// Lesson index → human label (mirrors CourseDashboard tag strings)
const LESSON_LABELS: Record<number, string> = {
  0: 'Welcome',
  1: '01, What Claude Is',
  2: '02, What Claude Can Do',
  3: '03, The Mindset',
  4: '04, The Big Divide',
  5: '05, Setup',
  6: '06, Grammar? Never.',
  7: '07, Get an Idea',
  8: '08, Just Yap',
  9: '09, The Three Modes',
  10: '10, HTML Files',
  11: '11, Deploying',
  12: '12, Terminal',
  13: '13, API Keys',
  14: '14, Real APIs',
  15: '15, Selling Online',
  16: '16, Stripe Walkthrough',
  17: "17, When It's Wrong",
  18: '18, Stay Organized',
  19: "19, What's Next",
}

const RESERVED_KEYS = new Set(['_cert_id', '_cert_name'])

export default async function NotesPage() {
  const supa = createSupabaseServerClient()
  const { data: { user } } = await supa.auth.getUser()
  if (!user?.email) redirect('/login')

  const admin = createSupabaseAdminClient()
  const { data } = await admin
    .from('user_progress')
    .select('notes, bookmarks, confused, last_lesson, updated_at')
    .eq('email', user.email.toLowerCase())
    .maybeSingle()

  const notesRaw = (data?.notes ?? {}) as Record<string, string>
  const bookmarks = new Set<number>(data?.bookmarks ?? [])
  const confused = new Set<number>(data?.confused ?? [])

  // Build sorted list of real notes (skip reserved keys like _cert_id)
  const entries = Object.entries(notesRaw)
    .filter(([k, v]) => !RESERVED_KEYS.has(k) && typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => ({ index: Number(k), text: String(v) }))
    .filter((e) => !Number.isNaN(e.index))
    .sort((a, b) => a.index - b.index)

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/course" className="font-serif text-lg tracking-wide">
            Ayla <span className="text-pink italic">Unlocked</span>
          </Link>
          <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
            <Link href="/course" className="text-mid hover:text-pink link-underline">Course</Link>
            <Link href="/course/prompts" className="text-mid hover:text-pink link-underline">Prompts</Link>
            <Link href="/course/real-chats" className="text-mid hover:text-pink link-underline">Chats</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Your notes</div>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-4">Everything you&apos;ve written.</h1>
        <p className="text-mid text-lg font-light mb-10 max-w-xl">
          All the thoughts, questions, and ideas you dropped into each lesson. In one place,
          so you never lose them.
        </p>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <StatBox num={entries.length} label={`note${entries.length === 1 ? '' : 's'}`} />
          <StatBox num={bookmarks.size} label={`bookmark${bookmarks.size === 1 ? '' : 's'}`} />
          <StatBox num={confused.size} label={`flag${confused.size === 1 ? '' : 's'}`} />
        </div>

        {entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[color:var(--border)] p-10 text-center">
            <p className="font-serif italic text-2xl mb-2">No notes yet.</p>
            <p className="text-mid font-light mb-6 max-w-md mx-auto text-[14.5px]">
              Scroll to the bottom of any lesson and start writing. It auto-saves and lives forever.
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
            {entries.map((e) => {
              const label = LESSON_LABELS[e.index] ?? `Lesson ${e.index}`
              const isBm = bookmarks.has(e.index)
              const isConf = confused.has(e.index)
              return (
                <Link
                  key={e.index}
                  href={`/course?lesson=${e.index}`}
                  className="card-hover block bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="text-[10px] font-semibold tracking-[2.5px] uppercase text-pink">{label}</div>
                    <div className="flex items-center gap-2">
                      {isBm && (
                        <span className="inline-flex items-center gap-1 text-[10px] tracking-[1.5px] uppercase text-pink bg-pink-light px-2.5 py-1 rounded-full">
                          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                            <path d="M12 17.3L5.8 21l1.6-7.3L2 8.8l7.4-.6L12 1.5l2.6 6.7 7.4.6-5.4 4.9L18.2 21 12 17.3z" />
                          </svg>
                          saved
                        </span>
                      )}
                      {isConf && (
                        <span className="inline-flex items-center gap-1 text-[10px] tracking-[1.5px] uppercase text-pink bg-pink-light px-2.5 py-1 rounded-full">
                          ?  flagged
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[14.5px] text-dark leading-relaxed whitespace-pre-wrap font-light">{e.text}</p>
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

function StatBox({ num, label }: { num: number; label: string }) {
  return (
    <div className="bg-white border border-[color:var(--border)] rounded-2xl p-5 text-center">
      <div className="font-serif text-pink text-4xl leading-none">{num}</div>
      <div className="text-[10px] tracking-[2px] uppercase text-mid mt-2">{label}</div>
    </div>
  )
}
