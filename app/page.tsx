import Link from 'next/link'
import ContactForm from '@/components/ContactForm'
import HeroCover from '@/components/HeroCover'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-cream text-dark">
      {/* sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.88)] border-b border-[color:var(--border)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="font-serif text-lg tracking-wide">
            ayla <span className="text-pink italic">unlocked</span>
          </div>
          <Link
            href="/unlock"
            className="bg-pink text-white text-[11px] tracking-[1.5px] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-[#C51F4E] transition"
          >
            Get Access &mdash; $39
          </Link>
        </div>
      </nav>

      {/* HERO COVER (client — handles video popup) */}
      <HeroCover />

      {/* WHO THIS IS FOR */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">01 &mdash; Who this is for</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
          The girl who keeps seeing AI stuff online and doesn&apos;t know where to start.
        </h2>
        <p className="text-lg text-mid leading-relaxed font-light">
          Every explanation feels like it&apos;s made for someone who already knows what they&apos;re
          doing. Every tutorial assumes you know what a terminal is. Every thread is written by a
          tech bro for other tech bros. This course is the one that finally explains it like you&apos;re
          talking to a friend &mdash; because I&apos;m 19, I taught myself from zero, and I remember what
          it felt like to have no idea where to start.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]" />
      </div>

      {/* WHAT YOU'LL BE ABLE TO DO */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">02 &mdash; What you&apos;ll be able to do</div>
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
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">03 &mdash; What&apos;s inside</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-10">
          20 lessons. Four sections. Zero gatekeeping.
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 1 &middot; What this is</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>01 &middot; What Claude actually is</li>
              <li>02 &middot; What Claude can do</li>
              <li>03 &middot; The mindset shift</li>
              <li>04 &middot; The big divide</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 2 &middot; How to use it</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>05 &middot; Getting set up</li>
              <li>06 &middot; Grammar? Never.</li>
              <li>07 &middot; Finding your first idea</li>
              <li>08 &middot; Just yap to it</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 3 &middot; Building for real</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>09 &middot; Chat vs. Claude Code vs. Cowork</li>
              <li>10 &middot; HTML files, explained</li>
              <li>11 &middot; Deploying to the internet</li>
              <li>12 &middot; Terminal, demystified</li>
              <li>13 &middot; API keys</li>
              <li>14 &middot; Real APIs you&apos;ll use</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-pink mb-3">Part 4 &middot; Selling &amp; scaling</div>
            <ul className="space-y-2 text-dark font-light text-[15px]">
              <li>15 &middot; Selling online (Stripe explained)</li>
              <li>16 &middot; Stripe step-by-step</li>
              <li>17 &middot; When Claude gets it wrong</li>
              <li>18 &middot; Staying organized</li>
              <li>19 &middot; Agents &mdash; the next level</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="h-px bg-[color:var(--border)]" />
      </div>

      {/* WHY ME */}
      <section className="px-6 md:px-10 py-24 max-w-4xl mx-auto">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-pink mb-4">04 &mdash; Why me</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-6">
          I&apos;m no genius. I&apos;m just ambitious and patient.
        </h2>
        <p className="text-lg text-mid leading-relaxed font-light mb-6">
          I learned Claude mid-March and wrote this course mid-April. That&apos;s how learnable this is.
          If I can do it from nothing, in a month, you can too. You just need someone who will actually
          explain it &mdash; without the jargon, without the gatekeeping, without assuming you already know.
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
            Get Access &mdash; $39
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
          want to hire me to build with you &mdash; tell me what&apos;s up.
        </p>
        <ContactForm />
      </section>

      <footer className="border-t border-[color:var(--border)] py-10 px-6 md:px-10 text-center text-xs text-muted-light tracking-[1px]">
        &copy; {new Date().getFullYear()} Ayla Blumberg &middot; Ayla Unlocked
      </footer>
    </main>
  )
}
