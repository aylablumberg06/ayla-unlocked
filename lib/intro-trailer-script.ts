// ──────────────────────────────────────────────────────────
// Pre-paid intro / trailer video script.
// This is the 60–90 second clip that plays when someone hits
// "Play intro" on the landing page (HeroCover.tsx → /hero-video.mp4).
// Record once, export as /public/hero-video.mp4.
// ──────────────────────────────────────────────────────────

export const INTRO_TRAILER_SCRIPT = {
  title: "Ayla Unlocked — Pre-Paid Intro Trailer",
  estLength: "60–90 sec",
  stageNote:
    "Same energy as the Welcome video — direct-to-camera, natural light, no tripod vibes. Record vertically or square so it crops nicely to whatever aspect the hero modal ends up at. Keep it tight.",
  blocks: [
    {
      label: "HOOK",
      text:
        "Hi. I'm Ayla. This is Ayla Unlocked, and I'm the professor of this course. That's a very aggressive word, I know. But hear me out.",
    },
    {
      label: "HOOK",
      text:
        "I'm gonna teach you to follow exactly what I did to go, in one month, from zero, from not knowing what Claude was, to basically having a makeshift coding degree. Way more awesome than a real one honestly, because Claude can do the coding part now. So it's really just about learning how to work with it.",
    },
    {
      label: "HOOK",
      text:
        "Quick context. I'm 19. I've never taken a coding class in my life. Four months ago I didn't know what Claude was, I literally thought it was a guy. Now I'm building AI agent teams for companies. Hired. Paid. This is real. And I put every single thing I learned to get here into this course.",
    },
    {
      label: "HOOK",
      text:
        "Also — yes, everything is pink. Sorry boys. That's just how it is. The code still works. The agents still run. You just have to look at a little pink while you learn. I'll live.",
    },
    {
      label: "TEACH",
      text:
        "If you keep seeing people making insane stuff with AI and you have no clue where to start — this is your starting line. There's no prerequisite. No coding. No computer-science background. Just you, a laptop, and like 10 minutes a day.",
    },
    {
      label: "TEACH",
      text:
        "Also quick thing. Everyone says \"easier said than done.\" I actually think it's the opposite — everything is easier DONE than said the first time. Like, stuff sounds really hard, and then you just do it, and you're like, oh damn, that was easy, what's next? This course is exactly that. It sounds intimidating and crazy at first. Twenty-nine lessons, API keys, agents, deploying to the internet — that reads scary. Then you start doing it and within like two hours you're building stuff and going, wait, this is not hard at all. I promise.",
    },
    {
      label: "TEACH",
      text:
        "Inside you get 29 lessons. Short videos. Every lesson you watch, read, highlight, try it, repeat. I show you my real chats with Claude — the exact way I talk to it when I'm building. My top prompts. How I get paid. How I set up agents that run my business while I'm at the gym.",
    },
    {
      label: "TEACH",
      text:
        "And listen — this is the moment. AI is taking off right now, faster than any tech thing I've ever seen. Six months from now, half the people you know will be using this stuff every day. You want to be the one showing them how, not the one catching up.",
    },
    {
      label: "HOOK",
      text:
        "Real talk — if you're still watching this and you haven't hit unlock yet, you are genuinely missing out on the good stuff. Like, this trailer is the teaser. The actual course is where I give you the prompts that close clients. The agent setups that make money while I sleep. The real chats with Claude that nobody else is publishing. The embarrassing mistakes I'd never say on TikTok. That's all behind the paywall on purpose — because it's what makes this worth it. So. $39. One-time. Stop watching free trailers.",
    },
    {
      label: "CLOSER",
      text:
        "Click unlock. Let's build something. I'll see you inside.",
    },
  ],
};
