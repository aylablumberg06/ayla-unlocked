// ──────────────────────────────────────────────────────────
// Idea pool listings (shared between CourseDashboard quiz UI
// and admin dashboard "all ideas" reference table).
//
// The ACTUAL scoring functions live in CourseDashboard.tsx because
// they're tied to the runtime quiz answers. These exports are just
// the meta info (title, description, difficulty, time) for display.
// ──────────────────────────────────────────────────────────

export type IdeaMeta = {
  title: string
  description: string
  difficulty: string
  time: string
}

export const SELF_IDEA_POOL: IdeaMeta[] = [
  { title: 'Your personal website', difficulty: 'Easiest', time: '1-2 hours', description: 'This is literally the first thing I built with Claude and what I recommend starting with. Upload your resume, drop some inspo screenshots, describe your vibe. Claude builds the whole thing in one chat.' },
  { title: 'Cold outreach email system', difficulty: 'Intermediate', time: '1-2 days', description: 'An automated system that finds leads, personalizes emails to each one, and sends them on a schedule. Set it up once and let it run while you sleep.' },
  { title: 'Content caption generator agent', difficulty: 'Beginner', time: '2-3 hours', description: 'An agent that reads your video content and auto-writes captions, hashtags, and reply suggestions in your exact voice and style.' },
  { title: 'Proposal factory', difficulty: 'Intermediate', time: '1 day', description: 'Fill in a quick form about a client and Claude generates a full custom proposal with pricing, timeline, and your branding. You never start from scratch again.' },
  { title: 'Real estate client follow-up agent', difficulty: 'Intermediate', time: '1-2 days', description: 'An agent that sends personalized check-ins to your leads on a schedule so no potential client ever falls through the cracks.' },
  { title: 'TikTok analytics dashboard', difficulty: 'Intermediate', time: '1 day', description: "A custom dashboard that tracks your content performance and tells you exactly what to post based on what's actually working." },
  { title: 'Lead research agent', difficulty: 'Intermediate', time: '1-2 days', description: 'Give it a target audience and it automatically finds and compiles leads from social media, Google, or industry directories using Apify.' },
  { title: 'Personal AI assistant', difficulty: 'Easiest', time: '1 hour', description: 'Set Claude up with everything about you: your preferences, your schedule, your goals. Use it as a personal advisor you actually talk to every day.' },
]

export const CLIENT_IDEA_POOL: IdeaMeta[] = [
  { title: 'Local business websites ($500–$2k each)', difficulty: 'Easiest', time: '1 weekend per site', description: "Walk into a restaurant, salon, or gym near you, ask if they'd want a new website, charge $500–$2,000. Build it in a weekend with Claude. Most local businesses still have ugly sites or none. The easiest first money you can make." },
  { title: "Real estate agent's listing site", difficulty: 'Beginner', time: '1–2 days', description: 'Real estate agents need pretty, fast, mobile-friendly listing sites and almost none of them have one. Build a template, swap photos and addresses per agent, charge $1,500 per site or a $300/month retainer.' },
  { title: 'Cold outreach system for a sales team', difficulty: 'Intermediate', time: '3–5 days', description: 'Build the outreach pipeline I use, but for someone else. Finds leads, personalizes emails, sends on schedule. Companies pay $1,500–$5,000 to set this up because it replaces a $60k/yr SDR.' },
  { title: "A creator's content-automation pack", difficulty: 'Intermediate', time: '2–4 days', description: 'Caption generator, comment-reply agent, hashtag tool, all in their voice. Sell it as a $500–$1,500 setup or a monthly subscription. Creators will pay because their time is the bottleneck.' },
  { title: 'Booking + menu site for a restaurant', difficulty: 'Intermediate', time: '3–5 days', description: 'Online menu, OpenTable-style booking, simple "order ahead" flow with Stripe. $1,000–$3,000 each. Local food spots are dying for this and most owners are not doing it themselves.' },
  { title: 'Lawyer / doctor / dentist intake-form site', difficulty: 'Intermediate', time: '1 week', description: 'Trust-signal landing page + smart intake form that filters out time-wasters before they call. Pros pay well because every wasted consult costs them. $2,000–$5,000 plus an optional retainer.' },
  { title: 'Proposal factory for an agency', difficulty: 'Intermediate', time: '4–6 days', description: 'Agencies write the same proposal 50 times. Build them a tool that takes a 5-field intake and spits out a custom-branded proposal. Charge $3,000 setup + $200/month, or sell it as a one-time tool.' },
  { title: 'Mini-brand-in-a-day package', difficulty: 'Easiest', time: '1 day', description: 'Logo, color palette, fonts, one landing page. All AI-assisted. $500–$1,500 per package, takes you a day. Great for friends starting side hustles. Easy to refer.' },
  { title: 'Small-business AI receptionist', difficulty: 'Intermediate', time: '1 week', description: 'A bot on their website that books appointments, answers FAQs, and DMs the owner when something needs a human. Setup $1,500, plus $100–300/month. Local businesses would pay forever.' },
  { title: 'Custom CRM dashboard', difficulty: 'Intermediate', time: '3–5 days', description: 'A clean, simple lead/customer dashboard for a friend or agency, built in a weekend, that replaces their messy spreadsheet. People are willing to pay $1,000–$3,000 just to never look at Excel again.' },
  { title: 'Influencer DM-reply agent', difficulty: 'Intermediate', time: '3–4 days', description: "Read their DMs, draft replies in their voice, queue them for one-tap send. Most creators get hundreds a day and can't keep up. Charge $500 setup + $200/month per creator." },
  { title: "Stripe-checkout setup for someone's site", difficulty: 'Easiest', time: '2–4 hours', description: "Lots of people have a site but no way to actually take money on it. You wire up Stripe products, prices, and a checkout flow for them in a few hours. $300–$700 each. Easy first paid gig if you're nervous." },
  { title: 'Newsletter automation for a creator', difficulty: 'Intermediate', time: '3–4 days', description: 'Pull their best content from the week, draft the newsletter in their voice, queue it for review. Set it once, $300/month forever. The creator never writes another newsletter.' },
]
