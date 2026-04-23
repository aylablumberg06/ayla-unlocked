// ─────────────────────────────────────────────────────────────
// Prompt library, the actual prompts Ayla uses.
// Copy-paste ready. Ayla's voice.
// ─────────────────────────────────────────────────────────────

export type Prompt = {
  id: string
  category: PromptCategory
  title: string
  body: string
  tip?: string
}

export type PromptCategory =
  | 'website'
  | 'outreach'
  | 'writing'
  | 'business'
  | 'stuck'
  | 'starter'
  | 'agents'
  | 'selling'

export const CATEGORIES: { id: PromptCategory; label: string; desc: string }[] = [
  { id: 'starter', label: 'Starter prompts', desc: "The first things I say in a fresh chat. Get the vibe right from line one." },
  { id: 'website', label: 'Build a website', desc: "Getting Claude to make you a real site from scratch." },
  { id: 'writing', label: 'Writing things', desc: "Captions, emails, posts, pitches, in your voice." },
  { id: 'outreach', label: 'Cold outreach', desc: "Finding people, writing the message, following up." },
  { id: 'business', label: 'Business & planning', desc: "Naming, pricing, proposals, business plans." },
  { id: 'selling', label: 'Selling online', desc: "Stripe, checkout, pricing pages, refund flows." },
  { id: 'agents', label: 'Building agents', desc: "The stuff that runs while you sleep." },
  { id: 'stuck', label: 'When Claude is being annoying', desc: "What to say when it's ignoring you, hallucinating, or being dumb." },
]

export const PROMPTS: Prompt[] = [
  // ─── STARTER ───
  {
    id: 's1',
    category: 'starter',
    title: 'The "ask me clarifying questions" opener',
    body: `I want to build [your thing in 1-2 sentences]. Ask me any clarifying questions before you start so we don't build the wrong thing.`,
    tip: "This is the single most important prompt. Use it every single time on anything important. It stops Claude from running off and building garbage.",
  },
  {
    id: 's2',
    category: 'starter',
    title: 'The "explain like I\'m in 8th grade" rescue',
    body: `I don't understand any of what you just said. Can you explain it like I'm in 8th grade and have never touched tech? Use a real-life analogy if you can.`,
    tip: "Works on anything confusing. No shame, just restart the explanation.",
  },
  {
    id: 's3',
    category: 'starter',
    title: 'When you\'re totally lost',
    body: `I have zero idea where to even start. I want [rough idea]. Ask me questions one at a time like you're interviewing me, and at the end give me a full plan.`,
    tip: "Turns Claude into your consultant instead of your assistant.",
  },
  {
    id: 's4',
    category: 'starter',
    title: 'When you want multiple options',
    body: `Give me 5 different versions of [the thing] so I can pick my favorite. Make each one distinctly different in vibe, not small variations.`,
    tip: "The word 'distinctly' is the secret. Without it you get 5 near-copies.",
  },
  {
    id: 's5',
    category: 'starter',
    title: 'Upload anything and just say',
    body: `Look at what I just uploaded and tell me what I can do with it.`,
    tip: "Screenshots, PDFs, spreadsheets, audio files, code files, whatever. Claude will tell you every option.",
  },

  // ─── WEBSITE ───
  {
    id: 'w1',
    category: 'website',
    title: 'Personal website from resume + vibe',
    body: `Build me a personal website. I'm going to upload my resume and a few screenshots of sites I think are pretty. Make it in that style, but personalized to me. Use my exact words from the resume, don't rewrite anything. Ask me any clarifying questions before you start.`,
    tip: "Upload 3-5 screenshots of aesthetic sites. Claude pulls the vibe from them without copying any specific one.",
  },
  {
    id: 'w2',
    category: 'website',
    title: 'Landing page for a product',
    body: `Build me a one-page landing site to sell [product]. Hero section, 3-4 benefit sections, testimonials placeholder, pricing section, FAQ, footer. Mobile-first. Here's the vibe I want: [paste description or upload inspo]. Use exactly these words for the hero: [your hero copy]. Ask any questions.`,
    tip: "Give it the hero copy word-for-word. That's the one part Claude shouldn't 'improve.'",
  },
  {
    id: 'w3',
    category: 'website',
    title: 'Making an existing site better',
    body: `Here's a screenshot of my current site. It feels [ugly / boring / dated / confusing / slow]. Specifically what's wrong is [X, Y, Z]. Rewrite the whole thing keeping the same content but fixing those issues. Make it feel expensive.`,
    tip: "'Make it feel expensive' is a magic phrase. Works way better than 'make it nicer.'",
  },
  {
    id: 'w4',
    category: 'website',
    title: 'Adding a specific interactive feature',
    body: `On my existing site, I want to add [feature, e.g. a quiz / a calculator / a before-after slider / an email signup]. Don't rewrite the whole site. Just hand me the new section and tell me exactly where to paste it.`,
    tip: "'Don't rewrite the whole site' protects you from Claude helpfully changing 12 other things.",
  },
  {
    id: 'w5',
    category: 'website',
    title: 'The "make it pretty" pass',
    body: `The site works but looks basic. Do a full design pass. Better fonts, a real color palette, better spacing, subtle animations, actual hierarchy. Still mobile-first. Show me before/after side by side.`,
  },

  // ─── WRITING ───
  {
    id: 'wr1',
    category: 'writing',
    title: 'Captions in your voice',
    body: `Write me 5 TikTok captions for a video where I [describe the video]. Match my voice, here are 10 real captions I wrote before: [paste 10 of your actual captions]. Stay casual. No hashtags, I'll add them.`,
    tip: "Pasting 10 of your real captions as voice samples is the cheat code. Without them you get generic AI captions.",
  },
  {
    id: 'wr2',
    category: 'writing',
    title: 'Cold email that sounds human',
    body: `Write a cold email to [type of person] offering [what you offer]. Keep it short (under 120 words). Open with something specific, not "I hope this finds you well." Don't use the word "leverage" or "solution" or "partner." Match this voice: casual, warm, direct, not salesy.`,
    tip: "The list of banned words is key. Cold emails fail when they sound like every other cold email.",
  },
  {
    id: 'wr3',
    category: 'writing',
    title: 'Instagram bio that doesn\'t suck',
    body: `Write me 5 Instagram bio options. I [what you do] for [who you serve] and I'm known for [your thing]. Each should be under 150 characters and distinctly different in vibe. One playful, one serious, one mysterious, one specific/niche, one provocative.`,
  },
  {
    id: 'wr4',
    category: 'writing',
    title: 'The "rewrite this but better" prompt',
    body: `Here's what I wrote: [paste]. Rewrite it so it's tighter, clearer, and sounds more like me. Don't make it formal. Keep my slang. Cut anything that's filler.`,
  },
  {
    id: 'wr5',
    category: 'writing',
    title: 'Email reply when you\'re overwhelmed',
    body: `I got this email: [paste]. Write a reply that [says no / buys me time / counter-offers / politely declines]. Keep it warm, short, and don't apologize for no reason. I don't want it to sound AI-written.`,
  },

  // ─── OUTREACH ───
  {
    id: 'o1',
    category: 'outreach',
    title: 'Finding a list of leads',
    body: `I want to find [type of business/person] in [location]. Can you help me get a list of 50 of them with their email addresses and any relevant info? Walk me through exactly how, whether I need Apify, Google Maps, LinkedIn, or something else.`,
    tip: "Claude will walk you through the exact Apify scraper or Google Maps extraction to use.",
  },
  {
    id: 'o2',
    category: 'outreach',
    title: 'Personalizing at scale',
    body: `Here's a list of 20 leads I just scraped (upload CSV). Write a personalized first line for each one based on their business name, location, and any signal I have about them. Output as a CSV I can paste back into my outreach tool.`,
    tip: "Personalization is the difference between 1% and 10% reply rate.",
  },
  {
    id: 'o3',
    category: 'outreach',
    title: 'Follow-up sequence that isn\'t annoying',
    body: `Write me a 3-email follow-up sequence for someone who didn't reply to my first cold email. Spread over 10 days. Each one should be shorter than the last and try a different angle. Last one should be a polite breakup email.`,
  },
  {
    id: 'o4',
    category: 'outreach',
    title: 'DMing on Instagram',
    body: `Write me 3 opening DM messages I could send to [type of creator/business] on Instagram. Under 50 words each. Not pitchy. The goal is to start a conversation, not close a deal in DM 1.`,
  },

  // ─── BUSINESS ───
  {
    id: 'b1',
    category: 'business',
    title: 'Business name brainstorm',
    body: `I'm starting a business that does [description] for [target customer]. The vibe should feel [3 adjectives]. Give me 15 name options. For each one, tell me if the .com is likely available and why the name works for this vibe.`,
  },
  {
    id: 'b2',
    category: 'business',
    title: 'Pricing my services',
    body: `I'm [what you do]. I'm trying to figure out what to charge. Here's what I know: [your experience, your area, any market data]. Walk me through 3 pricing structures, hourly, per-project, and retainer. Tell me which makes most sense for someone at my level and why.`,
  },
  {
    id: 'b3',
    category: 'business',
    title: 'Proposal for a client',
    body: `Write me a proposal for a client who wants [what they want]. They seem like [one-line description of the vibe]. My price is [$X]. Include: scope, timeline, deliverables, what's not included, payment terms, a "why me" section. Keep it under 2 pages when printed.`,
  },
  {
    id: 'b4',
    category: 'business',
    title: 'Business plan in 1 hour',
    body: `Build me a business plan for [your idea]. Sections: the problem, the solution, target customer (be specific), competitive landscape (name real competitors), pricing, go-to-market for month 1, 12-month revenue forecast (show the math), and the first 5 things I should do this week. Ask me clarifying questions before you start.`,
  },

  // ─── SELLING ───
  {
    id: 'se1',
    category: 'selling',
    title: 'Add Stripe checkout to my site',
    body: `Add Stripe checkout to my site. Here's my price ID: price_XXX. I'll give you the keys in a second. When someone clicks the Buy button, they should go to Stripe's hosted checkout page. After they pay, redirect them to a thank-you page. Also set up a webhook so my site knows when someone pays.`,
    tip: "The webhook line is crucial. Without it, payments succeed but your site has no clue.",
  },
  {
    id: 'se2',
    category: 'selling',
    title: 'Pricing page with 3 tiers',
    body: `Build me a pricing page with 3 tiers: starter, most popular (highlighted), and premium. For each tier include: name, price, 1-line description, 5-7 feature bullets, CTA button. The most popular one should have a colored border and a "Most popular" ribbon.`,
  },
  {
    id: 'se3',
    category: 'selling',
    title: 'Refund / cancellation policy',
    body: `Write me a short, human-sounding refund policy for my [product/service]. I'll offer refunds if [conditions]. Don't make it legalese, make it feel like a real person wrote it.`,
  },

  // ─── AGENTS ───
  {
    id: 'a1',
    category: 'agents',
    title: 'Daily outreach agent',
    body: `Build me a daily agent that [does thing] every morning at 8am. It should [detailed list of steps]. At the end, email me a summary of what it did. Use my Gmail via the Gmail API. Walk me through setting up API keys one at a time.`,
  },
  {
    id: 'a2',
    category: 'agents',
    title: 'Reply-handling agent',
    body: `I get a lot of email replies to my cold outreach. Build me an agent that reads my Gmail inbox, identifies replies to my outreach, scores them 1-10 on purchase intent, and drafts a response (but doesn't send). Show me the drafts at the end of each day.`,
  },
  {
    id: 'a3',
    category: 'agents',
    title: 'Scraper that watches a competitor',
    body: `Build me an agent that checks [competitor's URL or social handle] every morning and tells me if anything changed, new post, new product, new pricing, new team member. Send me a daily digest.`,
  },
  {
    id: 'a4',
    category: 'agents',
    title: 'Lead-finder agent',
    body: `Build me an agent that runs every morning and finds 20 new [type of lead] matching these criteria: [criteria]. Use Apify. Add them to a Google Sheet I own. Don't re-add anyone already in the sheet.`,
  },

  // ─── STUCK / ANNOYING ───
  {
    id: 'st1',
    category: 'stuck',
    title: 'When it\'s ignoring your instructions',
    body: `Stop. Re-read what I originally asked for. You're doing something I didn't ask for. Here's what I actually need: [restate in one sentence]. Do only that. Nothing else.`,
    tip: "The word 'Stop.' as a sentence alone works surprisingly well.",
  },
  {
    id: 'st2',
    category: 'stuck',
    title: 'When it\'s making up stuff (hallucinating)',
    body: `Wait, that doesn't sound right. Are you making that up? Give me a source or admit you don't know. I'd rather you say "I don't know" than invent something.`,
    tip: "Gives Claude explicit permission to say 'I don't know.' Which it should more often.",
  },
  {
    id: 'st3',
    category: 'stuck',
    title: 'When you need a reset mid-chat',
    body: `We've gotten tangled. Forget everything and start over. Here's what we're really trying to do: [one-sentence goal]. Ignore everything before this message.`,
  },
  {
    id: 'st4',
    category: 'stuck',
    title: 'When it\'s too technical',
    body: `I can't follow any of that. Break it down. What's the actual first click I do? What's the second click? Assume I've never seen this screen before.`,
  },
  {
    id: 'st5',
    category: 'stuck',
    title: 'When the error message is scary',
    body: `[Paste the error]. I don't know what this means. Explain what went wrong in plain English and tell me exactly what to do next. Don't assume I know any of the words in that error.`,
  },
  {
    id: 'st6',
    category: 'stuck',
    title: 'The "just do it" demand',
    body: `Stop telling me to do it myself. You have the tools to do this directly. Do it. If you genuinely can't, explain why in one sentence.`,
    tip: "Only works in Claude Code / Cowork. Doesn't work in plain Chat.",
  },
]
