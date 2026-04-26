// ──────────────────────────────────────────────────────────────
// Real chats, actual Ayla messages, curated from her chat history.
// Context added so students see WHY she said what she said.
// These are real. No AI-generated stand-ins.
// ──────────────────────────────────────────────────────────────

export type ChatExchange = {
 id: string
 title: string // Short title for the exchange
 context: string // What Ayla was trying to do
 messages: Array<{
 role: 'user' | 'claude'
 text: string
 mad?: boolean // Render in "mad mode" styling
 }>
 lesson?: string // What students should take away
}

export const REAL_CHATS: ChatExchange[] = [
 {
 id: 'rc-1',
 title: "When it ignored my clear instructions",
 context:
 "I was building a dashboard and told Claude to remove references to a sports thing I had in there earlier. It kept leaving pieces of it in. I got mean.",
 messages: [
 { role: 'user', text: 'I SAID TO TAKE OUT ANY REFERENCE TO THIS SPORTS THING.', mad: true },
 { role: 'claude', text: "You're right. I'm sorry, I missed a few spots. Removing all remaining references now..." },
 ],
 lesson:
 "All caps isn't strategy, it's venting. But when Claude ignores you repeatedly, being blunt about what it ignored gets it back on track. Name the specific thing it missed.",
 },

 {
 id: 'rc-2',
 title: "When prospects disappeared from my dashboard",
 context:
 "I had built a dashboard tracking potential clients. Suddenly a bunch of them were gone. I panicked.",
 messages: [
 {
 role: 'user',
 text: "what the hell just happened a few of the people who made a team on my website just dissapeared from prospects on the dash",
 },
 {
 role: 'claude',
 text: "Let me check what happened. I'll look at the last few changes to the prospects table and tell you exactly what got removed and why.",
 },
 ],
 lesson:
 "Don't assume it's gone forever. Tell Claude exactly what happened (\"X disappeared\") and ask it to investigate. It can almost always recover or explain.",
 },

 {
 id: 'rc-3',
 title: "When I accidentally deleted someone else's work",
 context:
 "I was cleaning up the dashboard and hit delete on something that turned out to be another user's entire team.",
 messages: [
 { role: 'user', text: "i just deleted one of the girls teams she built on accident. please bring it back." },
 { role: 'claude', text: "Let me pull it back from the backup logs. One sec." },
 ],
 lesson:
 "When you panic, just say exactly what happened in plain English. No need for technical language. Claude can almost always roll it back.",
 },

 {
 id: 'rc-4',
 title: "When it was too technical to understand",
 context:
 "I just wanted to see who submitted forms on my website. Claude went into database schemas and RLS policies. I had no idea what any of it meant.",
 messages: [
 {
 role: 'user',
 text: "i dont understand - please explain what i need to do. i want to be able to see every submission someone makes on my website",
 },
 {
 role: 'claude',
 text: "Got it. Forget the technical stuff. Here's the simplest version: I'll make you a page at /admin that shows every submission in a nice list. You click the link, you see it. That's it. Ready to build it?",
 },
 ],
 lesson:
 'When Claude gets too technical, name it. "I don\'t understand, what do I actually need to do?" is the cleanest reset. It\'ll swap to the version your baby cousin could follow.',
 },

 {
 id: 'rc-5',
 title: "The 'just make it HTML for now' move",
 context:
 "I was going in circles trying to decide between a full deployment vs. a quick preview. Finally I just decided to not care about production.",
 messages: [
 { role: 'user', text: "just do it as a html for now" },
 { role: 'claude', text: "Done. Here's the HTML file, double-click it and your browser will open it. We can deploy it whenever you're ready." },
 ],
 lesson:
 'Sometimes the fastest answer is "I don\'t need it live yet, just show me the file." HTML files are free, instant, and completely private until you deploy them.',
 },

 {
 id: 'rc-6',
 title: "Protecting work-in-progress",
 context:
 "I was adding new stuff and wanted to make sure Claude didn't overwrite the festival planning files I'd already done.",
 messages: [
 {
 role: 'user',
 text: "before i sent that to the agent - confirm that it doesnt overwrite anything from the festival files - just adds",
 },
 {
 role: 'claude',
 text: "Confirmed, I'll only append new entries, nothing in the existing files will change. Want me to show you a diff first?",
 },
 ],
 lesson:
 "Before running anything destructive, literally just ask: 'does this overwrite anything?' That one question has saved me hours.",
 },

 {
 id: 'rc-7',
 title: "When a deploy reverted itself",
 context:
 "My site had been working. Then I pushed a new change and the old links broke. Claude was insisting the site was fine.",
 messages: [
 {
 role: 'user',
 text: "you are likely wrong! look at the live site, it was built and working, but looks like it reverted and the main page stayed, but the links are now broken.",
 },
 {
 role: 'claude',
 text: "You're right, I was wrong. Looking at the latest deployment now, the main page did ship but the navigation partial didn't. Fixing.",
 },
 ],
 lesson:
 "If Claude says something works and you know it doesn't, push back. It'll re-check. It's not offended. Trust your eyes first.",
 },

 {
 id: 'rc-9',
 title: "The \"stop telling me to do it myself\" rule",
 context:
 "Claude kept giving me step-by-step instructions for stuff it could have just done directly. I set the rule once and never looked back.",
 messages: [
 { role: 'user', text: "never tell me to do something you can do. do everything yourself. if you actually can't, explain why in one sentence." },
 { role: 'claude', text: "Understood. I'll execute directly and only ask you for things I genuinely cannot do (accounts, passwords, clicks in a browser)." },
 ],
 lesson:
 "This is my single most important rule. Claude defaults to giving you instructions. You want a doer, not a tutor. Paste this at the top of any project chat and everything downstream gets faster.",
 },

 {
 id: 'rc-8',
 title: "Password-gating instead of full auth",
 context:
 "I was getting deep into building proper authentication and realized I just needed a simple password for a draft page.",
 messages: [
 { role: 'user', text: "stop, let's just put a standard simple password gate on it." },
 { role: 'claude', text: "Simpler and way faster. I'll add a one-password gate to the whole site. Pick a password." },
 ],
 lesson:
 "If the solution feels like overkill, stop and ask for the simple version. 'Just put a password on it' is often all you actually need.",
 },
]
