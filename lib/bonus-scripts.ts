// ──────────────────────────────────────────────────────────
// BONUS VIDEO SCRIPTS — short clips that play INLINE inside specific
// sections of a lesson (not the main lesson video). Each one is
// designed to add personality, a story moment, or a humor break to
// a section that's currently text-only.
//
// File naming when you record + export:
//   /public/videos/bonus-{slug}.mp4
//
// Once you drop the file in, I'll wire the inline <video> into the
// right spot inside CourseDashboard.tsx.
// ──────────────────────────────────────────────────────────

export type BonusScript = {
  slug: string             // file name slug → /public/videos/bonus-{slug}.mp4
  lessonNum: number        // which lesson it belongs in
  lessonTag: string        // for the table of contents
  sectionLabel: string     // "where in the lesson" — what's adjacent
  estLength: string        // 15–60s typically
  why: string              // why this clip helps
  blocks: { label: 'HOOK' | 'TEACH' | 'CLOSER' | 'STAGE'; text: string }[]
}

export const BONUS_SCRIPTS: BonusScript[] = [
  {
    slug: 'money-mode-intro',
    lessonNum: 17,
    lessonTag: '17 · Terminal',
    sectionLabel: 'Right above the "Find a money idea" pink button',
    estLength: '20–35 sec',
    why: 'Sets up the money quiz with the "we\'re here for fun BUT also $$$" wink. Currently text-only.',
    blocks: [
      { label: 'STAGE', text: '[Direct to camera. Maybe at your desk, smirky energy. Hold up your phone briefly to gesture at the Stripe app.]' },
      { label: 'HOOK', text: "Okay quick sidebar. We are doing this whole course for the love of building, obviously." },
      { label: 'TEACH', text: "But also? I want you to make money. Like a lot of it. The whole reason this stuff is fun is that it actually pays. So before we get into agents and APIs, just hit the pink button below this and play the money-idea game. It picks something you could literally charge for next week. Don't think about it, just click it." },
      { label: 'CLOSER', text: "Then come back. We'll keep going." },
    ],
  },
  {
    slug: 'i-cried-container-deleted',
    lessonNum: 27,
    lessonTag: '27 · Favorite Mistakes',
    sectionLabel: 'Inside callout #1 — "The morning the container deleted everything"',
    estLength: '30–45 sec',
    why: 'This story is GOLD on camera. Makes the lesson land 10x harder than reading it.',
    blocks: [
      { label: 'STAGE', text: '[Direct to camera, slightly emotional / dramatic re-enactment energy. Maybe even pull up the actual Claude chat history on your laptop and turn the screen to show it briefly.]' },
      { label: 'HOOK', text: "Okay so. I want to tell you about the morning I cried because I thought I lost everything." },
      { label: 'TEACH', text: "I woke up, the iMac container running my whole agent system had wiped itself overnight. Code, configs, Telegram bot tokens, scheduled tasks, gone. I genuinely had a panic attack. And then I opened Claude, scrolled through my chat history, and I realized — every single decision I'd made building this thing was IN the conversation. So I just said, rebuild it, you have the context. Three hours later it was running again." },
      { label: 'CLOSER', text: "Lesson: your Claude chats are a backup. But also, push your code to GitHub every day. Free insurance. Just do it." },
    ],
  },
  {
    slug: 'first-client-walk-in',
    lessonNum: 22,
    lessonTag: '22 · Your First Client',
    sectionLabel: 'After the "Three places I actually get clients" list',
    estLength: '40–60 sec',
    why: 'Demystifies "walking in" — most students will never imagine doing it until they see you do it.',
    blocks: [
      { label: 'STAGE', text: '[Selfie/walk-and-talk style if possible — shoot it walking to a real café or salon near you, even if we never see the actual conversation.]' },
      { label: 'HOOK', text: "Okay, I'm gonna tell you exactly how I get local clients. It is so much less scary than it sounds." },
      { label: 'TEACH', text: "I literally Google Maps a salon, a coffee shop, a med spa near me. I check their website — like 10 seconds, you can tell when it's outdated. I walk in, and I'm like, hey, super random question, do you guys do your own website? Most of the time they go, oh my god no, ours is awful, can you actually fix it. And I tell them yes, here's what I'd do, here's what it costs." },
      { label: 'CLOSER', text: "That's the whole pitch. Most owners are not annoyed. They are RELIEVED someone is offering. Try one this week." },
    ],
  },
  {
    slug: 'meet-elle-demo',
    lessonNum: 24,
    lessonTag: '24 · Agents',
    sectionLabel: 'Inside the "Meet Elle" section',
    estLength: '30–45 sec',
    why: 'Watching you actually message Elle and get a real reply IS the whole sell. Words can\'t do this justice.',
    blocks: [
      { label: 'STAGE', text: '[Hold your phone up to camera with Telegram open. Type a real message to Elle live. Wait for her reply. Read it out loud. THIS is the magic moment.]' },
      { label: 'HOOK', text: "I want to actually show you Elle. She's my chief-of-staff agent. She's just an entry in my Telegram." },
      { label: 'TEACH', text: "Watch — I'm going to text her right now. [type something like \"how's the pipeline today\"]. Send. And she's typing… [wait]. There. She just told me three sites went live overnight, two clients replied, and one needs a contract sent. And I haven't done anything. She just runs all the time. THAT'S an agent. It's a contact in your phone that texts you the report." },
      { label: 'CLOSER', text: "By the end of this lesson, you'll know how to build her sister." },
    ],
  },
  {
    slug: 'posting-got-me-paid',
    lessonNum: 29,
    lessonTag: '29 · Post While You Build',
    sectionLabel: 'Inside the "What actually happened to me" callout',
    estLength: '30–45 sec',
    why: 'You said posting got you hired. Worth a face-to-camera moment, not just a bullet list.',
    blocks: [
      { label: 'HOOK', text: "Real talk for a second. I want to be specific about what posting actually got me." },
      { label: 'TEACH', text: "Within the first month of posting: two companies slid into my DMs asking if I could build them agents. And an email from a founder who's now kind of a mentor to me — someone I would never have crossed paths with otherwise. (And I'm honestly still hoping a podcast invite shows up. Hasn't yet, but I'm putting that energy out there.)" },
      { label: 'TEACH', text: "Every one of those came from a post that took me ten minutes. The point isn't reach. It's that posting publicly is a SIGNAL. It tells the right people you exist and what you're building. They find you, you don't have to find them." },
      { label: 'CLOSER', text: "If you do nothing else from this lesson — post. Today. Tag me. I'm @aylablumberg.ai, and I'll re-share it." },
    ],
  },
  {
    slug: 'just-yap-mad-mode',
    lessonNum: 9,
    lessonTag: '09 · Just Yap',
    sectionLabel: 'Right after the existing mad-mode chat bubbles',
    estLength: '15–25 sec',
    why: 'You\'re already showing screenshots of you yelling at Claude — reading them on camera with the BEEPS in post is comedy gold.',
    blocks: [
      { label: 'STAGE', text: '[Direct to camera, slightly mock-angry, performative. Edit the curses out with bleeps in post — it makes it funnier, not less.]' },
      { label: 'HOOK', text: "These are real things I have actually sent Claude. Out loud. Directly into my AirPods." },
      { label: 'TEACH', text: "[Read with feeling] \"Oh my god, you're TERRIBLE at this, what the [BEEP] am I paying $100 a month for, just COPY THE PINTEREST INSPO PICS, OMG.\" [Beat] \"[BEEP]ING WORK.\" [Beat] \"So I pay $100 a month and you can't do a simple task, [BEEP] this.\"" },
      { label: 'CLOSER', text: "Claude does not care. Claude does not have feelings. Claude just keeps going. You can say whatever you want." },
    ],
  },
  {
    slug: 'set-it-and-forget-it',
    lessonNum: 24,
    lessonTag: '24 · Agents',
    sectionLabel: 'After the "Making it actually run 24/7" section',
    estLength: '20–30 sec',
    why: 'The "agents are hard but worth it" emotional payoff lands better as a one-take pep talk than as a paragraph.',
    blocks: [
      { label: 'HOOK', text: "Quick honesty thing. Building agents is hard. Like, the hardest thing in the course." },
      { label: 'TEACH', text: "Your first one is going to take a weekend. You're going to scream at the words \"invalid API key\" so many times. You're going to want to quit halfway through. And then you'll get it working, and you'll go to bed, and you'll wake up to your agent having sent five emails on its own, and you will literally cry happy tears." },
      { label: 'CLOSER', text: "I did. It's worth it. Push through the API errors." },
    ],
  },
]
