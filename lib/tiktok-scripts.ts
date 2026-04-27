// ──────────────────────────────────────────────────────────
// TikTok scripts for marketing Ayla Unlocked.
// Each script: HOOK (3-5s), BEATS (text + paired visual cue),
// CTA. Plus a list of visuals to screenshot before filming.
// ──────────────────────────────────────────────────────────

export type TikTokScript = {
 id: number
 title: string
 hook: string
 duration: string
 beats: Array<{
 text: string
 visual: string
 }>
 cta: string
 visualsToCapture: Array<{
 label: string
 where: string
 notes?: string
 }>
}

export const TIKTOK_SCRIPTS: TikTokScript[] = [
 {
 id: 1,
 title: 'Tech bros vs. me',
 hook: "If you've ever tried to learn AI from a YouTube tutorial and immediately closed the tab, this is for you.",
 duration: '30-45 sec',
 beats: [
 {
 text: "Every tutorial about building with AI looks like this.",
 visual: 'Cut to: stitched grid of 3-4 generic "tech bro" YouTube thumbnails — guys in headsets, whiteboards behind them, titles like "Build an AI Agent in 10 Minutes" or "LangChain Deep Dive".',
 },
 {
 text: "Or this.",
 visual: 'Cut to: terminal screenshot full of red error text + a stack trace. Holds for 1 second.',
 },
 {
 text: "I'm 19. I've never taken a coding class. I learned Claude in 30 days and I got hired to build AI agent teams for companies.",
 visual: 'Cut to: you on camera, soft natural light, no setup energy. Hold for the line.',
 },
 {
 text: "So I built the course I wish someone had handed me.",
 visual: 'Cut to: the Ayla Unlocked landing page hero. Slow zoom in on "Ayla Unlocked".',
 },
 {
 text: "29 lessons. No jargon. It feels like FaceTiming a friend who just figured it out.",
 visual: 'Cut to: the /course lesson dashboard, scrolling through the lesson list.',
 },
 {
 text: "Things I built using exactly what I teach in here.",
 visual: 'Quick montage: Elle Woods orb screenshot, agent team graphic, a TikTok lead scrape result, the certificate page.',
 },
 ],
 cta: "Course is unlocked.aylablumberg.com. $79 lifetime, code AYLA50 for half off this week.",
 visualsToCapture: [
 { label: 'Generic tech-bro YouTube thumbnails (4)', where: 'Search YouTube for "build AI agent tutorial" or "LangChain", grab the most generic-looking thumbnails. Stitch into a 2x2 grid.' },
 { label: 'Terminal stack trace', where: '/public/lesson-bad-output.jpg already in the project — perfect.' },
 { label: 'Landing page hero', where: 'https://unlocked.aylablumberg.com/ — grab the top fold with "Ayla Unlocked" title and the inline video.' },
 { label: '/course lesson dashboard', where: 'Sign in as owner, screen-record scrolling through the left sidebar lesson list.' },
 { label: 'Elle Woods orb', where: '/public/lesson-elle-orb.jpg', notes: 'Already in the codebase.' },
 { label: 'Agent team', where: '/public/agent-team.jpg', notes: 'Already in the codebase.' },
 { label: 'Certificate', where: 'Sign in as owner, finish the course (or use /course/certificate?name=Ayla&id=AU-2026-DEMO&date=April%2027,%202026), screenshot the cert.' },
 ],
 },
 {
 id: 2,
 title: 'My mom proof',
 hook: "If my 56-year-old mom can build with AI in a week, you have no excuse.",
 duration: '30-40 sec',
 beats: [
 {
 text: "I taught my mom Claude over one weekend.",
 visual: 'Cut to: photo or video of your mom. If you don\'t have one, a hand reaching for a coffee cup with a phone showing the Claude app.',
 },
 {
 text: "She paid for my course on day one. She's currently in lesson 8.",
 visual: 'Cut to: admin dashboard showing her in the Students table — blur her email but show "Lesson 8 / 29".',
 },
 {
 text: "She's drafting follow-up emails for her real estate clients in Claude. Faster than she ever did them by hand.",
 visual: 'Cut to: Claude chat showing a polished email being generated.',
 },
 {
 text: "She doesn't know what an API is. She doesn't need to.",
 visual: 'Text overlay: "She doesn\'t know what an API is. She doesn\'t need to."',
 },
 {
 text: "If you\'ve been waiting for the right time to start this, this is the sign.",
 visual: 'Cut back to you on camera.',
 },
 ],
 cta: "$79 lifetime. unlocked.aylablumberg.com. Code AYLA50 for 50% off.",
 visualsToCapture: [
 { label: 'Mom photo or B-roll', where: 'Personal photo library, OR a clean stock-style shot of an older woman on a phone (avoid actual stock — feels fake).' },
 { label: 'Admin dashboard, Students row', where: '/admin once deployed — screenshot the row + blur her email in CapCut.' },
 { label: 'Claude email draft', where: 'Open Claude, paste a real "follow up with seller" prompt, screenshot the output.' },
 ],
 },
 {
 id: 3,
 title: 'My agent team works while I sleep',
 hook: "I have 8 AI agents working for me 24/7. They cost me $0 a month.",
 duration: '40-50 sec',
 beats: [
 {
 text: "Meet the team. Elle. Gabriella. Sharpay. Ryan. Taylor. Zeke. Troy. Chad.",
 visual: 'Quick cuts: 8 stylized "agent cards" from your /Users/ayla/Desktop/ayla-agents folder, one per name.',
 },
 {
 text: "Each one has a job. Elle DMs leads. Gabriella writes my newsletter. Sharpay schedules content.",
 visual: 'Three short loops of each agent doing its thing — Telegram messages, draft email previews, calendar.',
 },
 {
 text: "I built this whole team in two weekends. The course teaches you exactly how in lesson 24.",
 visual: 'Cut to: lesson 24 in the /course dashboard, "Build your agent team" highlighted.',
 },
 {
 text: "It runs while I sleep. While I\'m at the gym. While I\'m on a date.",
 visual: 'Quick stills: bed, gym, restaurant. Snappy cuts.',
 },
 ],
 cta: "$79 once. Forever. unlocked.aylablumberg.com.",
 visualsToCapture: [
 { label: '8 agent cards', where: '/Users/ayla/Desktop/ayla-agents/ folder OR build a quick 2x4 grid in Canva.' },
 { label: 'Telegram message from Elle', where: 'Your phone, scroll back to a real Elle DM, screenshot.' },
 { label: 'Draft email from Gabriella', where: 'Gmail drafts folder, find one she wrote.' },
 { label: 'Lesson 24 in /course', where: 'Sign in, navigate to lesson 24, screenshot the lesson title + intro.' },
 ],
 },
 {
 id: 4,
 title: 'Receipts',
 hook: "I made a course on AI 3 days ago. Here\'s what happened.",
 duration: '20-30 sec',
 beats: [
 {
 text: "Day 1: launched at $79.",
 visual: 'Stripe dashboard showing the first sale come in.',
 },
 {
 text: "Day 2: 6 paying customers.",
 visual: 'Admin dashboard "Paying customers: 6" tile + "Net revenue: $474" tile.',
 },
 {
 text: "Day 3: my mom bought it.",
 visual: 'Stripe Customers row showing "Sharon Blumberg".',
 },
 {
 text: "All built with the exact stuff I teach in the course. By me. Alone. In one month.",
 visual: 'Quick montage of the codebase folder, the live site, the admin panel.',
 },
 ],
 cta: "If you want this, it\'s yours. unlocked.aylablumberg.com. $79 once. AYLA50 cuts it in half.",
 visualsToCapture: [
 { label: 'Stripe sale notification', where: 'Stripe Dashboard → Payments → first $79 success. Screenshot the row.' },
 { label: 'Admin overview tiles', where: '/admin once deployed.' },
 { label: 'Stripe customer row (mom)', where: 'Stripe Dashboard → Customers → Sharon Blumberg.' },
 ],
 },
]
