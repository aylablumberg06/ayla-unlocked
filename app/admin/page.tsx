import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { VIDEO_SCRIPTS } from '@/lib/video-scripts'
import AdminScripts from '@/components/AdminScripts'
import { SELF_IDEA_POOL, CLIENT_IDEA_POOL } from '@/lib/idea-pools'

export const metadata = {
  title: 'Ayla Unlocked, Admin',
}
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const admin = createSupabaseAdminClient()

  const [
    usersRes,
    progressRes,
    confusedRes,
    chatRes,
    contactRes,
    visitRes,
    submissionsRes,
  ] = await Promise.all([
    admin.from('users').select('*').order('created_at', { ascending: false }),
    admin.from('user_progress').select('*').order('updated_at', { ascending: false }),
    admin.from('confused_flags').select('*').order('created_at', { ascending: false }).limit(200),
    admin.from('chat_logs').select('*').order('created_at', { ascending: false }).limit(200),
    admin.from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(200),
    admin.from('visits').select('*').order('created_at', { ascending: false }).limit(500),
    admin.from('submissions').select('*').order('created_at', { ascending: false }).limit(100),
  ])

  const users = usersRes.data ?? []
  const progress = progressRes.data ?? []
  const confused = confusedRes.data ?? []
  const chatLogs = chatRes.data ?? []
  const contacts = contactRes.data ?? []
  const visits = visitRes.data ?? []
  const submissions = submissionsRes.data ?? []

  const paidCount = users.filter((u: any) => u.paid).length
  const completedCount = progress.filter((p: any) => p.completed_at).length
  const activeLast7 = progress.filter((p: any) => {
    const d = new Date(p.updated_at)
    return Date.now() - d.getTime() < 7 * 24 * 60 * 60 * 1000
  }).length

  // Aggregate confused flags by lesson
  const confusedByLesson = confused.reduce<Record<string, number>>((acc, r: any) => {
    const key = `${r.lesson_index} · ${r.lesson_tag ?? 'Unknown'}`
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})
  const confusedRanked = Object.entries(confusedByLesson).sort((a, b) => b[1] - a[1]).slice(0, 10)

  // Group chat logs by session for readability
  const chatSessions = chatLogs.reduce<Record<string, typeof chatLogs>>((acc, row: any) => {
    const k = row.session_id ?? row.email ?? row.id
    acc[k] = acc[k] ?? []
    acc[k].push(row)
    return acc
  }, {})

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(253,246,240,0.95)] border-b border-[color:var(--border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-wide">
            <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic">Unlocked</span>
            <span className="text-xs text-muted-light tracking-[2px] uppercase ml-3">Admin</span>
          </Link>
          <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
            <a href="#overview" className="text-mid hover:text-pink">Overview</a>
            <a href="#students" className="text-mid hover:text-pink">Students</a>
            <a href="#confused" className="text-mid hover:text-pink">Confused</a>
            <a href="#chats" className="text-mid hover:text-pink">Chats</a>
            <a href="#contacts" className="text-mid hover:text-pink">Contacts</a>
            <a href="#visits" className="text-mid hover:text-pink">Visits</a>
            <a href="#submissions" className="text-mid hover:text-pink">Builds</a>
            <a href="#quiz" className="text-mid hover:text-pink">Quiz log</a>
            <a href="#ideas" className="text-mid hover:text-pink">All ideas</a>
            <a href="#scripts" className="text-mid hover:text-pink">Scripts</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-16">
        {/* OVERVIEW */}
        <section id="overview">
          <h2 className="font-serif italic text-4xl mb-6">Overview.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Total signups" value={users.length} />
            <Stat label="Paid" value={paidCount} accent />
            <Stat label="Completed" value={completedCount} />
            <Stat label="Active (7d)" value={activeLast7} />
            <Stat label="Contact msgs" value={contacts.length} />
            <Stat label="Chat messages" value={chatLogs.length} />
            <Stat label="Confused flags" value={confused.length} />
            <Stat label="Page views" value={visits.length} />
          </div>
        </section>

        {/* STUDENTS */}
        <section id="students">
          <h2 className="font-serif italic text-4xl mb-6">Students, progress.</h2>
          <div className="bg-white rounded-2xl border border-[color:var(--border)] overflow-hidden overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead className="bg-[color:var(--pink-pale)] text-pink uppercase tracking-[1.5px] text-[10px]">
                <tr>
                  <Th>Email</Th><Th>Paid</Th><Th>Lesson</Th><Th>Completed</Th><Th>Bookmarks</Th><Th>Confused</Th><Th>Last active</Th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan={7} className="text-center p-10 text-muted-light italic">No signups yet.</td></tr>
                )}
                {users.map((u: any) => {
                  const p = progress.find((x: any) => x.email === u.email)
                  return (
                    <tr key={u.email} className="border-t border-[color:var(--border)] hover:bg-[color:var(--pink-pale)]/40">
                      <Td><span className="font-mono text-[12px]">{u.email}</span></Td>
                      <Td>{u.paid ? <Pill>paid</Pill> : <span className="text-muted-light text-[11px]">no</span>}</Td>
                      <Td>{p?.last_lesson ?? 0} / 19</Td>
                      <Td>{p?.completed_at ? <Pill>✓</Pill> : <span className="text-muted-light text-[11px]">—</span>}</Td>
                      <Td>{p?.bookmarks?.length ?? 0}</Td>
                      <Td>{p?.confused?.length ?? 0}</Td>
                      <Td>{p?.updated_at ? timeAgo(p.updated_at) : <span className="text-muted-light text-[11px]">never</span>}</Td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* CONFUSED */}
        <section id="confused">
          <h2 className="font-serif italic text-4xl mb-2">Confused flags.</h2>
          <p className="text-mid mb-6 text-[15px]">Most-flagged lessons. These are what to rewrite first.</p>
          {confusedRanked.length === 0 ? (
            <EmptyBox text="No one's flagged anything confusing yet." />
          ) : (
            <div className="bg-white rounded-2xl border border-[color:var(--border)] divide-y divide-[color:var(--border)]">
              {confusedRanked.map(([label, count]) => (
                <div key={label} className="flex items-center justify-between p-4 px-6">
                  <div className="font-mono text-[13px]">{label}</div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-[color:var(--pink-pale)] overflow-hidden">
                      <div className="h-full bg-pink" style={{ width: `${Math.min(100, count * 20)}%` }} />
                    </div>
                    <Pill>{count} flag{count === 1 ? '' : 's'}</Pill>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CHATS */}
        <section id="chats">
          <h2 className="font-serif italic text-4xl mb-2">Ask-Ayla chat logs.</h2>
          <p className="text-mid mb-6 text-[15px]">Every message through the floating widget. Latest first.</p>
          {Object.keys(chatSessions).length === 0 ? (
            <EmptyBox text="No chat activity yet." />
          ) : (
            <div className="space-y-4">
              {Object.entries(chatSessions).slice(0, 30).map(([k, msgs]) => (
                <div key={k} className="bg-white rounded-2xl border border-[color:var(--border)] p-5">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-[12px] text-mid font-mono">{(msgs as any[])[0]?.email ?? 'anonymous'}</div>
                    <div className="text-[11px] text-muted-light">{timeAgo((msgs as any[])[0]?.created_at)}</div>
                  </div>
                  <div className="space-y-2">
                    {(msgs as any[]).slice().reverse().map((m) => (
                      <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13.5px] ${
                          m.role === 'user' ? 'bg-pink text-white rounded-br-md' : 'bg-[#EFEFEF] text-dark rounded-bl-md'
                        }`}>{m.content}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CONTACTS */}
        <section id="contacts">
          <h2 className="font-serif italic text-4xl mb-2">Contact form + Ask-Ayla escalations.</h2>
          <p className="text-mid mb-6 text-[15px]">Reach-outs from the landing page + forwarded chat transcripts.</p>
          {contacts.length === 0 ? (
            <EmptyBox text="No messages yet." />
          ) : (
            <div className="space-y-3">
              {contacts.slice(0, 30).map((c: any) => (
                <div key={c.id} className="bg-white rounded-2xl border border-[color:var(--border)] p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-dark font-medium">{c.name ?? '(no name)'}</div>
                    <div className="text-[11px] text-muted-light">{timeAgo(c.created_at)}</div>
                  </div>
                  <div className="text-[12px] text-pink font-mono mb-2">{c.email}</div>
                  <div className="text-[14px] text-dark whitespace-pre-wrap leading-relaxed">{c.message}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* VISITS */}
        <section id="visits">
          <h2 className="font-serif italic text-4xl mb-2">Recent page visits.</h2>
          <p className="text-mid mb-6 text-[15px]">Lightweight site analytics, most recent 500.</p>
          {visits.length === 0 ? (
            <EmptyBox text="No visits logged yet. (Analytics starts tracking once someone hits any page.)" />
          ) : (
            <div className="bg-white rounded-2xl border border-[color:var(--border)] overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead className="bg-[color:var(--pink-pale)] text-pink uppercase tracking-[1.5px] text-[10px]">
                  <tr><Th>Time</Th><Th>Path</Th><Th>Email</Th><Th>Referrer</Th></tr>
                </thead>
                <tbody>
                  {visits.slice(0, 60).map((v: any) => (
                    <tr key={v.id} className="border-t border-[color:var(--border)]">
                      <Td><span className="text-muted-light">{timeAgo(v.created_at)}</span></Td>
                      <Td><code className="text-pink text-[12px]">{v.path}</code></Td>
                      <Td><span className="font-mono text-[12px]">{v.email ?? '—'}</span></Td>
                      <Td><span className="text-[12px] text-mid">{v.referrer ?? '—'}</span></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SUBMISSIONS */}
        <section id="submissions">
          <h2 className="font-serif italic text-4xl mb-2">Student builds.</h2>
          <p className="text-mid mb-6 text-[15px]">
            Submitted at /course/submit. Manually mark approved / featured in Supabase table
            <code className="mx-1 text-pink bg-[color:var(--pink-pale)] px-1.5 py-0.5 rounded">submissions</code>
            to show them on <a href="/built" className="text-pink underline">/built</a>.
          </p>
          {submissions.length === 0 ? (
            <EmptyBox text="No submissions yet." />
          ) : (
            <div className="space-y-4">
              {submissions.map((s: any) => (
                <div key={s.id} className="bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                      <div className="text-[10px] tracking-[2px] uppercase text-pink font-semibold mb-1">
                        {s.student_name || '(no name)'} · {s.email}
                      </div>
                      <h3 className="font-serif text-xl leading-tight">{s.project_name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.approved ? <Pill>approved</Pill> : <span className="text-[11px] text-muted-light tracking-[1px] uppercase">pending</span>}
                      {s.featured && <Pill>★ featured</Pill>}
                      <span className="text-[11px] text-muted-light">{timeAgo(s.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-[14px] text-dark whitespace-pre-wrap leading-relaxed mb-3 font-light">{s.description}</p>
                  <div className="flex gap-4 flex-wrap text-[12px]">
                    {s.project_url && <a href={s.project_url} target="_blank" rel="noopener noreferrer" className="text-pink underline">Live URL</a>}
                    {s.screenshot_url && <a href={s.screenshot_url} target="_blank" rel="noopener noreferrer" className="text-pink underline">Screenshot</a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* QUIZ LOG — what users entered + what got served back */}
        <section id="quiz">
          <h2 className="font-serif italic text-4xl mb-2">Quiz attempts.</h2>
          <p className="text-mid mb-6 text-[15px]">
            Every time someone runs the &ldquo;find my idea&rdquo; quiz (self-mode in lesson 12) or the &ldquo;find a money idea&rdquo; quiz (client-mode in lesson 17), their answers and top 3 results land here. Latest first.
          </p>
          {(() => {
            // Pull all quiz entries from user_progress.notes._quiz_log
            type Entry = { ts: string; mode: 'self' | 'client'; inputs: any; top: { title: string; score: number }[]; email: string }
            const entries: Entry[] = []
            for (const p of progress as any[]) {
              const log = p?.notes?._quiz_log
              if (typeof log !== 'string') continue
              try {
                const parsed = JSON.parse(log) as any[]
                for (const e of parsed) {
                  entries.push({ ...e, email: p.email })
                }
              } catch { /* skip bad rows */ }
            }
            entries.sort((a, b) => (a.ts < b.ts ? 1 : -1))
            if (entries.length === 0) {
              return <EmptyBox text="No quiz attempts yet. Once a student runs the idea-generator quiz, every input + result will show up here." />
            }
            return (
              <div className="space-y-3">
                {entries.slice(0, 60).map((e, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <Pill>{e.mode === 'client' ? 'Money mode' : 'For me'}</Pill>
                      <span className="font-mono text-[12px] text-mid">{e.email}</span>
                      <span className="text-[11px] text-muted-light tracking-[1px]">· {timeAgo(e.ts)}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">What they answered</div>
                        <ul className="text-[13.5px] text-dark font-light space-y-1">
                          {Array.isArray(e.inputs?.interests) && e.inputs.interests.length > 0 && (
                            <li><span className="text-mid">Interests / who they know:</span> {e.inputs.interests.join(', ')}</li>
                          )}
                          {e.inputs?.pain && <li><span className="text-mid">Pain / pricing:</span> {e.inputs.pain}</li>}
                          {e.inputs?.goal && <li><span className="text-mid">Goal / fun:</span> {e.inputs.goal}</li>}
                          {e.inputs?.intensity && <li><span className="text-mid">Intensity / hours:</span> {e.inputs.intensity}</li>}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">Top 3 ideas served</div>
                        <ol className="text-[13.5px] text-dark font-light space-y-1 list-decimal list-inside">
                          {e.top.map((t, j) => (
                            <li key={j}><strong>{t.title}</strong> <span className="text-muted-light text-[11px]">(score {t.score})</span></li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })()}
        </section>

        {/* IDEA POOLS — every possible result */}
        <section id="ideas">
          <h2 className="font-serif italic text-4xl mb-2">All possible quiz ideas.</h2>
          <p className="text-mid mb-6 text-[15px]">
            Every idea in both quizzes. Use this to remember what students could be told to build, edit copy, or add new ones in <code className="mx-1 text-pink bg-[color:var(--pink-pale)] px-1.5 py-0.5 rounded">lib/idea-pools.ts</code>.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6">
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Lesson 12 &middot; For yourself ({SELF_IDEA_POOL.length})</div>
              <ol className="space-y-3 text-[13.5px]">
                {SELF_IDEA_POOL.map((idea, i) => (
                  <li key={i} className="border-l-2 border-pink pl-3">
                    <div className="font-semibold text-dark mb-1">{idea.title}</div>
                    <div className="flex gap-2 mb-1.5"><Pill>{idea.difficulty}</Pill><Pill>{idea.time}</Pill></div>
                    <div className="text-mid font-light leading-relaxed">{idea.description}</div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white rounded-2xl border border-[color:var(--border)] p-5 md:p-6">
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Lesson 17 &middot; For other people ({CLIENT_IDEA_POOL.length})</div>
              <ol className="space-y-3 text-[13.5px]">
                {CLIENT_IDEA_POOL.map((idea, i) => (
                  <li key={i} className="border-l-2 border-pink pl-3">
                    <div className="font-semibold text-dark mb-1">{idea.title}</div>
                    <div className="flex gap-2 mb-1.5"><Pill>{idea.difficulty}</Pill><Pill>{idea.time}</Pill></div>
                    <div className="text-mid font-light leading-relaxed">{idea.description}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* VIDEO SCRIPTS */}
        <section id="scripts">
          <h2 className="font-serif italic text-4xl mb-2">Video scripts.</h2>
          <p className="text-mid mb-6 text-[15px]">
            Read these on camera. Click copy on any block. When you record + edit the video, drop it into
            <code className="mx-1 text-pink bg-[color:var(--pink-pale)] px-1.5 py-0.5 rounded">public/videos/lesson-NN.mp4</code>
            and the course dashboard will auto-play it.
          </p>
          <AdminScripts scripts={VIDEO_SCRIPTS} />
        </section>
      </div>
    </main>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? 'bg-pink text-white border-pink' : 'bg-white border-[color:var(--border)]'}`}>
      <div className={`font-serif text-4xl ${accent ? '' : 'text-pink'}`}>{value.toLocaleString()}</div>
      <div className={`text-[10px] tracking-[2px] uppercase mt-1 ${accent ? 'text-white/80' : 'text-mid'}`}>{label}</div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-semibold">{children}</th>
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-middle">{children}</td>
}
function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-block px-2.5 py-0.5 rounded-full bg-pink-light text-pink text-[11px] font-medium">{children}</span>
}
function EmptyBox({ text }: { text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[color:var(--border)] p-10 text-center">
      <p className="text-mid italic font-light">{text}</p>
    </div>
  )
}
function timeAgo(iso: string) {
  if (!iso) return ''
  const d = new Date(iso).getTime()
  const delta = Date.now() - d
  if (delta < 60_000) return `${Math.max(1, Math.floor(delta / 1000))}s ago`
  if (delta < 3_600_000) return `${Math.floor(delta / 60_000)}m ago`
  if (delta < 86_400_000) return `${Math.floor(delta / 3_600_000)}h ago`
  return `${Math.floor(delta / 86_400_000)}d ago`
}
