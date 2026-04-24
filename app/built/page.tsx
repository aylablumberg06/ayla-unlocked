import Link from 'next/link'
import { createSupabaseAdminClient } from '@/lib/supabase'

export const metadata = { title: 'Ayla Unlocked, What students built' }
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BuiltPage() {
  const admin = createSupabaseAdminClient()
  const { data } = await admin
    .from('submissions')
    .select('*')
    .eq('approved', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100)
  const subs = data ?? []

  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-wide">
            Ayla <span className="text-pink italic">Unlocked</span>
          </Link>
          <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
            <Link href="/" className="text-mid hover:text-pink">Home</Link>
            <Link href="/unlock" className="text-mid hover:text-pink">Get Access</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Showcase</div>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-5">What students built.</h1>
        <p className="text-mid text-lg font-light mb-12 max-w-2xl">
          Real things real students shipped after taking this course. No coding backgrounds.
          Just Claude and some nerve.
        </p>

        {subs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[color:var(--border)] p-16 text-center">
            <p className="font-serif italic text-3xl mb-3">Nothing here yet.</p>
            <p className="text-mid font-light mb-8 max-w-md mx-auto">
              Students, come be the first. If you just finished the course,{' '}
              <Link href="/course/submit" className="text-pink underline">drop what you built</Link>{' '}
              and I&rsquo;ll feature it here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {subs.map((s: any) => (
              <a
                key={s.id}
                href={s.project_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`card-hover block bg-white rounded-2xl border p-6 md:p-7 relative ${s.featured ? 'border-pink shadow-xl shadow-pink/10' : 'border-[color:var(--border)]'}`}
              >
                {s.featured && (
                  <span className="absolute -top-3 left-6 bg-pink text-white text-[10px] tracking-[2px] uppercase font-semibold px-3 py-1 rounded-full">
                    ★ Featured
                  </span>
                )}
                {s.screenshot_url && (
                  <div className="rounded-xl overflow-hidden mb-4 aspect-[16/9] bg-[color:var(--pink-pale)]" style={{ backgroundImage: `url(${s.screenshot_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                )}
                <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">
                  {s.student_name || 'Student'}
                </div>
                <h3 className="font-serif text-2xl mb-2 leading-tight">{s.project_name}</h3>
                <p className="text-[14px] text-mid font-light leading-relaxed">{s.description}</p>
                {s.project_url && (
                  <div className="mt-4 text-[11px] tracking-[1.5px] uppercase text-pink">Visit →</div>
                )}
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
