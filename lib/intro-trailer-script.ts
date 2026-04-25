// ──────────────────────────────────────────────────────────
// Pre-paid intro / trailer video script.
// This is the 60–90 second clip that plays when someone hits
// "Play intro" on the landing page (HeroCover.tsx → /hero-video.mp4).
// Record once, export as /public/hero-video.mp4.
//
// Also in this file: HOW_TO_USE_SCRIPT, the ~90-second "course tour"
// video that plays on the onboarding screen right after paying.
// Save it to /public/how-to-use-video.mp4.
// ──────────────────────────────────────────────────────────

export const HOW_TO_USE_SCRIPT = {
 title: "Ayla Unlocked, How to Use This Course",
 estLength: "90–120 sec",
 stageNote:
 "Shoot right after the Welcome video, same outfit/look if you can. Sit at the laptop so you can gesture at the screen as you explain. You can even screen-record the course and voice over it, but a face cam feels warmer. Whichever's easier.",
 blocks: [
 {
 label: "HOOK",
 text:
 "Okay, before we dive into anything, let me show you how this course actually works. Because I built it in a very specific way and if you don't know about the buttons, you're going to miss half of it.",
 },
 {
 label: "TEACH",
 text:
 "So. Every single lesson has a video and text. The video is me, talking at you the way I'd talk at a friend. If I'm yapping too slow, put me on 1.5x, I won't cry. If you don't feel like watching, scroll past the player and read the text. Same thing, just written. Pick whichever your brain is feeling that day.",
 },
 {
 label: "TEACH",
 text:
 "You can also highlight things. Literally drag your finger or cursor across any sentence that hits you. A pink pill pops up, hit it, and that quote lives in your Notes tab forever. It's like highlighting a Kindle book, but it actually remembers for you.",
 },
 {
 label: "TEACH",
 text:
 "And, big one, you can search anything with Command-K. Or Control-K on Windows. Hit that anywhere on the site, type whatever you're looking for, and it jumps straight to the lesson, prompt, or chat it's in. I use this constantly. Use it.",
 },
 {
 label: "TEACH",
 text:
 "At the top of the page there are three tabs you'll actually use. Prompts, that's my library of the prompts I paste into Claude every single day, copy them, steal them, don't ask. My Chats, real screenshots of conversations I've actually had with Claude while building, nothing edited for the camera. And Ask Ayla, a little chat button in the corner if you get stuck on anything, it's basically me.",
 },
 {
 label: "TEACH",
 text:
 "Every lesson also has a star, a question mark, and a note box at the bottom. Star it if you want to save it. Hit the question mark if the lesson loses you, that tells me directly, and I'll rewrite it. Type whatever you want in the note box, it auto-saves, and all your notes live under the Notes tab.",
 },
 {
 label: "TEACH",
 text:
 "And then, finish all 29 lessons and I make you a certificate with your name on it. Like, a real one. Post it. Screenshot it. Put it on LinkedIn. You earned it.",
 },
 {
 label: "CLOSER",
 text:
 "That's the whole tour. Take breaks whenever you want, we'll drop you right back where you left off. Okay. Now let's actually start.",
 },
 ],
};

// ──────────────────────────────────────────────────────────
// Pre-paid intro / trailer video script.
// ──────────────────────────────────────────────────────────

export const INTRO_TRAILER_SCRIPT = {
 title: "Ayla Unlocked, Pre-Paid Intro Trailer",
 estLength: "60–90 sec",
 stageNote:
 "Same energy as the Welcome video, direct-to-camera, natural light, no tripod vibes. Record vertically or square so it crops nicely to whatever aspect the hero modal ends up at. Keep it tight.",
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
 "Also, yes, everything is pink. Sorry boys. That's just how it is. The code still works. The agents still run. You just have to look at a little pink while you learn. I'll live.",
 },
 {
 label: "TEACH",
 text:
 "If you keep seeing people making insane stuff with AI and you have no clue where to start, this is your starting line. There's no prerequisite. No coding. No computer-science background. Just you, a laptop, and like 10 minutes a day.",
 },
 {
 label: "TEACH",
 text:
 "Also quick thing. Everyone says \"easier said than done.\" I actually think it's the opposite, everything is easier DONE than said the first time. Like, stuff sounds really hard, and then you just do it, and you're like, oh damn, that was easy, what's next? This course is exactly that. It sounds intimidating and crazy at first. Twenty-nine lessons, API keys, agents, deploying to the internet, that reads scary. Then you start doing it and within like two hours you're building stuff and going, wait, this is not hard at all. I promise.",
 },
 {
 label: "TEACH",
 text:
 "Inside you get 29 lessons. Short videos. Every lesson you watch, read, highlight, try it, repeat. I show you my real chats with Claude, the exact way I talk to it when I'm building. My top prompts. How I get paid. How I set up agents that run my business while I'm at the gym.",
 },
 {
 label: "TEACH",
 text:
 "And listen, this is the moment. AI is taking off right now, faster than any tech thing I've ever seen. Six months from now, half the people you know will be using this stuff every day. You want to be the one showing them how, not the one catching up.",
 },
 {
 label: "HOOK",
 text:
 "Real talk, if you're still watching this and you haven't hit unlock yet, you are genuinely missing out on the good stuff. Like, this trailer is the teaser. The actual course is where I give you the prompts that close clients. The agent setups that make money while I sleep. The real chats with Claude that nobody else is publishing. The embarrassing mistakes I'd never say on TikTok. That's all behind the paywall on purpose, because it's what makes this worth it. So. $39. One-time. Stop watching free trailers.",
 },
 {
 label: "CLOSER",
 text:
 "Click unlock. Let's build something. I'll see you inside.",
 },
 ],
};
