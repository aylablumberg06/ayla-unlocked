import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import ContactForm from '@/components/ContactForm'
import HeroCover from '@/components/HeroCover'
import ScrollReveal, { ScrollProgressBar } from '@/components/ScrollReveal'
import { TOTAL_READ_SEC, formatMinutes } from '@/lib/estimates'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-cream text-dark">
      <ScrollProgressBar />
      {/* sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.88)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg tracking-wide flex items-center gap-2 hover:opacity-80 transition">
            <BrandLogo size={26} />
            <span>Ayla <span className="text-pink italic">Unlocked</span></span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/login"
              className="link-underline text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink px-3 py-2.5 transition"
            >
              Log in
            </Link>
            <Link
              href="/unlock"
              className="magnetic bg-pink text-white text-[11px] tracking-[1.5px] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-[#C51F4E]"
            >
              Get Access · $39
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO COVER (client, handles video popup) */}
      <HeroCover />

      {/* WHO THIS IS FOR */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">01 · Who this is for</div>
        <ScrollReveal><h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
          For the person who keeps seeing AI stuff online and has no idea where to start.
        </h2></ScrollReveal>
        <p className="text-lg text-mid leading-relaxed font-light">
          Every explanation feels like it&apos;s made for someone who already knows what they&apos;re
          doing. Every tutorial assumes you know what a terminal is. Every thread is written by a
          tech bro for other tech bros. This course is the one that finally explains it like you&apos;re
          talking to a friend, because I&apos;m 19, I taught myself from zero, and I remember what
          it felt like to have no idea where to start.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]" />
      </div>

      {/* WHAT YOU'LL BE ABLE TO DO */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">02 · What you&apos;ll be able to do</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
          Build websites. Automate repetitive tasks. Create systems that run on their own.
        </h2>
        <p className="text-lg text-mid leading-relaxed font-light mb-8">
          After this course, you&apos;ll be able to make things you can actually sell, or use to get
          hired. Real things. Live websites. Automated outreach. Agents that do a whole person&apos;s job
          while you sleep. You won&apos;t write a line of code. You&apos;ll just talk to Claude and direct it.
        </p>
        <ul className="space-y-4 text-base text-dark">
          <li className="flex gap-4"><span className="text-pink font-serif text-2xl leading-none">&middot;</span>Build and deploy a real website from scratch.</li>
          <li className="flex gap-4"><span className="text-pink font-serif text-2xl leading-none">&middot;</span>Automate the annoying parts of your job or business.</li>
          <li className="flex gap-4"><span className="text-pink font-serif text-2xl leading-none">&middot;</span>Build agents that run on a schedule without you.</li>
          <li className="flex gap-4"><span className="text-pink font-serif text-2xl leading-none">&middot;</span>Actually take payments from real customers online.</li>
          <li className="flex gap-4"><span className="text-pink font-serif text-2xl leading-none">&middot;</span>Make something real enough to sell or show a client.</li>
        </ul>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]" />
      </div>

      {/* WHAT'S INSIDE */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">03 · What&apos;s inside</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-4">
          Five sections. Twenty-nine lessons. Zero gatekeeping.
        </h2>
        <p className="text-mid font-light mb-6 text-[15px]">
          About <span className="text-pink font-medium">3 hours total</span> if you actually do the hands-on exercises &mdash; and you should. Break it up however you want.
          Speed the videos to 2x and cut through faster. Read-only mode? <span className="text-pink font-medium">{formatMinutes(TOTAL_READ_SEC)}</span>.
        </p>
        <p className="text-[13px] text-muted-light italic mb-10">
          Take it in chunks. A lesson + its &ldquo;try this now&rdquo; challenge is usually 10&ndash;20 minutes. You can do the whole thing in an afternoon or spread it over a week.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 1 &middot; What this is</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>01 &middot; What Claude actually is</li>
              <li>02 &middot; What Claude can do</li>
              <li>03 &middot; The mindset shift</li>
              <li>04 &middot; The big divide</li>
              <li>05 &middot; Imposter syndrome, real talk</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 2 &middot; How to talk to it</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>06 &middot; Getting set up</li>
              <li>07 &middot; Free vs. Pro vs. Max</li>
              <li>08 &middot; Grammar? Never.</li>
              <li>09 &middot; Just yap to it</li>
              <li>10 &middot; When Claude gets it wrong</li>
              <li>11 &middot; Staying organized</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 3 &middot; What to build</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>12 &middot; Finding your first idea</li>
              <li>13 &middot; When NOT to use AI</li>
              <li>14 &middot; The four modes (Chat, Code, Cowork, Chrome)</li>
              <li>15 &middot; HTML files, explained</li>
              <li>16 &middot; Deploying to the internet</li>
              <li>17 &middot; Terminal, demystified</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 4 &middot; Selling &amp; scaling</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>18 &middot; API keys</li>
              <li>19 &middot; Real APIs you&apos;ll use</li>
              <li>20 &middot; Selling online (Stripe explained)</li>
              <li>21 &middot; Stripe step-by-step</li>
              <li>22 &middot; Your first paying client</li>
              <li>23 &middot; Proposal vs. contract</li>
              <li>24 &middot; Agents, the next level</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 5 &middot; The real stuff</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>25 &middot; Claude on my phone</li>
              <li>26 &middot; A day in my chaotic AI life</li>
              <li>27 &middot; My favorite mistakes</li>
              <li>28 &middot; My top 10 daily prompts</li>
              <li>29 &middot; Post while you build</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]" />
      </div>

      {/* WHAT I'VE BUILT — portfolio proof */}
      <section className="px-6 md:px-10 py-24 max-w-5xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">04 · What I&apos;ve built</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-4">
          This is what I&apos;ve shipped with Claude.
        </h2>
        <p className="text-lg text-mid font-light mb-10 max-w-2xl">
          All of this was built without writing code. Just by talking to Claude. If I can do it, you can too.
          The course teaches you exactly how.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <a
            href="https://aylablumberg.com"
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover group bg-white rounded-2xl border border-[color:var(--border)] p-6 md:p-7"
          >
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">Personal site</div>
            <h3 className="font-serif text-2xl mb-2 leading-tight">aylablumberg.com</h3>
            <p className="text-[14px] text-mid font-light leading-relaxed mb-4">
              My own portfolio. First thing I ever built with Claude. Resume in, design references in, site out. One chat.
            </p>
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase text-pink group-hover:gap-3 transition-all">
              Visit site →
            </span>
          </a>

          <div className="bg-gradient-to-br from-[color:var(--pink-pale)] to-white rounded-2xl border-2 border-dashed border-pink/30 p-6 md:p-7 flex flex-col justify-center text-center">
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-2">And a dozen more</div>
            <h3 className="font-serif italic text-2xl mb-2 leading-tight">Cold outreach systems. Agent teams. Dashboards.</h3>
            <p className="text-[14px] text-mid font-light leading-relaxed">
              Proposal factories, lead trackers, content agents, full businesses running on Claude. Built in months, not years. Every single one is the kind of thing this course teaches you to make.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]" />
      </div>

      {/* WHY ME */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">05 · Why me</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
          I&apos;m no genius. I&apos;m just ambitious and patient.
        </h2>
        <p className="text-lg text-mid leading-relaxed font-light mb-6">
          I learned Claude mid-March and wrote this course mid-April. That&apos;s how learnable this is.
          If I can do it from nothing, in a month, you can too. You just need someone who will actually
          explain it, without the jargon, without the gatekeeping, without assuming you already know.
        </p>
        <blockquote className="font-serif italic text-2xl md:text-3xl leading-snug border-l-2 border-pink pl-6 text-dark my-10">
          &ldquo;All this stuff is intimidating and can sometimes feel like it&apos;s impossible to catch up.
          But I learned Claude mid-March and wrote this course mid-April. It&apos;s much easier than it
          seems.&rdquo;
        </blockquote>
        <div className="pt-8">
          <Link
            href="/unlock"
            className="bg-pink text-white text-xs tracking-[1.5px] uppercase font-medium px-8 py-4 rounded-full hover:bg-[#C51F4E] transition inline-block"
          >
            Get Access · $39
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-10 py-24 max-w-2xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">Reach out</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
          Got a question? Write me.
        </h2>
        <p className="text-mid mb-10 font-light">
          I read every message that comes in. Whether you&apos;re on the fence, stuck somewhere, or
          want to hire me to build with you, tell me what&apos;s up.
        </p>
        <ContactForm />
      </section>

      <footer className="border-t border-[color:var(--border)] py-10 px-6 md:px-10 text-center text-xs text-muted-light tracking-[1px]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <BrandLogo size={20} />
          <span>Ayla <span className="text-pink italic">Unlocked</span></span>
        </div>
        <div className="mb-4">&copy; {new Date().getFullYear()} Ayla Blumberg</div>
        <div className="max-w-2xl mx-auto text-[10px] tracking-[0.3px] leading-relaxed text-muted-light/80 normal-case font-light">
          This course is for educational purposes only. It is not legal, financial, or career advice, and individual results vary &mdash; what worked for me won&rsquo;t necessarily work the same way for you.
          Ayla Unlocked is not affiliated with, endorsed by, or sponsored by Anthropic, Stripe, GitHub, Vercel, Canva, Apify, Telegram, or any other company mentioned in the lessons.
          External links are provided for convenience only; clicking them sends you to third-party sites we don&rsquo;t control. Use Claude and any AI tool at your own discretion &mdash; double-check anything important (legal, medical, financial, etc.) with a qualified professional.
        </div>
      </footer>
    </main>
  )
}
