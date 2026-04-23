import Link from 'next/link'
import { REAL_CHATS } from '@/lib/real-chats'

export const metadata = {
  title: 'Ayla Unlocked, Real Chats',
}

export default function RealChatsPage() {
  return (
    <main className="min-h-screen bg-cream text-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/course" className="font-serif text-lg tracking-wide">
            ayla <span className="text-pink italic">unlocked</span>
          </Link>
          <div className="flex gap-4 text-[11px] tracking-[1.5px] uppercase">
            <Link href="/course" className="text-mid hover:text-pink">Course</Link>
            <Link href="/course/prompts" className="text-mid hover:text-pink">Prompts</Link>
            <Link href="/course/notes" className="text-mid hover:text-pink">My notes</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">Real chats</div>
        <h1 className="font-serif text-5xl md:text-7xl italic leading-[1.05] mb-5">
          My actual chats with Claude.
        </h1>
        <p className="text-mid text-lg font-light mb-14 max-w-xl">
          Receipts. These are real messages I sent while building real things, including the unhinged ones.
          No filter. No &ldquo;proper AI tutorial&rdquo; energy. Just how I actually talk to it.
        </p>

        <div className="space-y-14">
          {REAL_CHATS.map((chat, idx) => (
            <article key={chat.id} className="relative">
              <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-3">
                Chat {String(idx + 1).padStart(2, '0')}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl mb-3 leading-tight">{chat.title}</h2>
              <p className="text-[14.5px] text-mid font-light italic mb-6 leading-relaxed">
                {chat.context}
              </p>

              <div className="bg-white rounded-3xl border border-[color:var(--border)] p-5 md:p-6 space-y-2">
                {chat.messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[14px] leading-snug ${
                        m.role === 'user'
                          ? m.mad
                            ? 'bg-[#C0001F] text-white font-medium rounded-br-md'
                            : 'bg-pink text-white rounded-br-md'
                          : 'bg-[#EFEFEF] text-dark rounded-bl-md'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {chat.lesson && (
                <div className="mt-5 p-5 bg-[color:var(--pink-pale)] border-l-2 border-pink rounded-r-xl">
                  <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">What to take from this</div>
                  <p className="text-[14.5px] text-dark leading-relaxed font-light">{chat.lesson}</p>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            href="/course"
            className="inline-block bg-pink text-white text-[11px] tracking-[1.5px] uppercase font-medium px-8 py-3.5 rounded-full hover:bg-[#C51F4E] transition"
          >
            Back to the course
          </Link>
        </div>
      </section>
    </main>
  )
}
