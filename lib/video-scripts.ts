// ──────────────────────────────────────────────────────────
// Per-lesson video scripts. Ayla reads these on camera.
// Structure for each: HOOK (5-10s), TEACH (60-90s), CLOSER (5-10s).
// Keep them conversational. The [brackets] are stage directions.
// ──────────────────────────────────────────────────────────

export type VideoScript = {
 lessonIndex: number
 lessonTag: string
 title: string
 estLength: string
 blocks: Array<{
 label: 'HOOK' | 'TEACH' | 'EXAMPLE' | 'CLOSER' | 'STAGE'
 text: string
 }>
}

export const VIDEO_SCRIPTS: VideoScript[] = [
 {
 lessonIndex: 0, lessonTag: 'Welcome', title: "Hi. I'm Ayla.",
 estLength: '3-4 min',
 blocks: [
 { label: 'STAGE', text: "[Shoot this one looking directly into the phone camera, natural light, no tripod vibes. Like you literally FaceTimed a friend. Messy hair, coffee in hand, allowed.]" },
 { label: 'HOOK', text: "Welcome to Ayla Unlocked. Hi. Okay first of all, you just made such a good investment. You're investing in your future, and genuinely, this is the time to get into this. It's taking off right now. Like, right now. You're not late. You're early. Okay. Let me tell you why I made this." },
 { label: 'HOOK', text: "So every tech tutorial I've ever opened starts the same way. Some guy in a headset, a whiteboard behind him, saying, welcome back to the channel, today we're going to learn about large language models and the transformer architecture. And I'm like, I'm closing this. I don't want a lecture. I want somebody to just tell me what to do." },
 { label: 'TEACH', text: "So that's what I'm doing here. This whole course, I want it to feel like I FaceTimed you, propped my phone up against a candle, and I'm just, like, walking you through this. That's it. No whiteboard. No jargon. No, quote, let's dive in. If at any point I sound like a tech bro, yell at your screen, because something's gone very wrong." },
 { label: 'TEACH', text: "Real quick. I'm Ayla. I'm 19. I've never taken a coding class. I've never watched a single YouTube tutorial on how to build anything. Four months ago I genuinely did not know what Claude was. Like, I thought it was a guy." },
 { label: 'TEACH', text: "Here's the thing about me that matters for this. I have always loved making things. Like, since I was tiny. Little businesses, little websites, little design projects. I'd get an idea and want it to exist NOW. And I'd sit down to make it and hit some stupid technical wall, like, I don't know how to set up a domain, or, why is this button not working, and I would literally cry. Fully lose my mind. Quit. Come back a week later, same wall, same meltdown. That was my whole life up until this year." },
 { label: 'TEACH', text: "Then I found Claude. And the thing that changed everything for me, the whole reason I'm even making this course, is this one idea. With AI, you can figure out ANYTHING. Like, anything. Even if it takes a while. Even if it's frustrating in the moment. Even if you have no clue what you're doing. You just keep talking to it, you keep saying, that didn't work, try it a different way. And eventually, I swear, it figures itself out. You figure it out together. Nothing is actually stuck anymore. That's the part nobody tells you." },
 { label: 'TEACH', text: "So that's why we're here. I learned Claude in March. By April, I was getting hired to build actual AI agent teams for companies. Not because I'm smart. I'm really not. I'm just patient, and I got obsessed. And I wrote this whole course based on what I learned in that one month, so I could just hand you the shortcut instead of making you go find it." },
 { label: 'STAGE', text: "[Cut here to a quick phone recording of you opening the Claude app, or a little montage of something you built, maybe Elle messaging you in Telegram]" },
 { label: 'CLOSER', text: "If you've ever thought, I keep seeing all this AI stuff online and I have no idea where to start, this is that. This is your starting line. Grab a coffee, open the app on your phone if you want, and let's just do this together. Okay. Let's go." },
 ],
 },
 {
 lessonIndex: 1, lessonTag: '01, What Claude Is', title: 'Before we start. What even is this thing.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "Okay. So what even is Claude. If you're going to use it for the next month, you should know what it actually is." },
 { label: 'TEACH', text: "Claude is an AI made by a company called Anthropic. Anthropic was started by a group of people who used to work at OpenAI, the company that makes ChatGPT. Underneath, Claude is what's called an LLM, a Large Language Model. Which sounds scary but just means: it's a program that read almost the entire internet and now it can predict what words should come next in any conversation." },
 { label: 'EXAMPLE', text: "When you talk to Claude, you're not Googling something. You're talking to something that learned to think in language by reading millions of books, articles, and code files." },
 { label: 'CLOSER', text: "One thing to know before we start: Claude doesn't remember you between chats. Every new conversation is a blank slate. We'll talk about how to work around that later." },
 ],
 },
 {
 lessonIndex: 2, lessonTag: '02, What Claude Can Do', title: 'The full list. Wider than you think.',
 estLength: '90-120 sec',
 blocks: [
 { label: 'HOOK', text: "Most people open Claude, ask it to summarize an email, and close the tab. They never figure out what else is in there. The list is absurdly wider than you think." },
 { label: 'TEACH', text: "Claude can write anything. Emails, pitch decks, cover letters, scripts, blog posts. In your voice if you give it examples. It can code. Entire websites, automations, iPhone shortcuts. It can analyze. Upload a spreadsheet, it tells you what the data means. Upload a contract, it tells you what to negotiate. It can research. Compare products, break down industries, summarize 100 page PDFs in one paragraph. It can think. Career decisions, pricing your services, how to handle a hard conversation." },
 { label: 'STAGE', text: "[Show screen recording of you dragging a PDF into Claude and getting a summary]" },
 { label: 'CLOSER', text: "The pattern: anything that involves language, logic, or structured thinking, Claude can do with you. Or for you. That's this whole course in one sentence." },
 ],
 },
 {
 lessonIndex: 3, lessonTag: '03, The Mindset', title: 'Claude is not Google.',
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "The biggest mistake people make when they first open Claude: they treat it like Google. Quick question, quick answer, close the tab. That's maybe 5% of what it can do." },
 { label: 'TEACH', text: "The better way to think about it: you hired a really smart friend who's good at literally everything. Coding, writing, designing, planning. You're just explaining what you want done, and they go figure it out. They might not get it right the first try. You go back and forth. That's normal. You're the boss with the vision. Claude is the team." },
 { label: 'CLOSER', text: "Instead of Googling how to do something, you tell Claude to do it, and it does it. Instead of paying a developer thousands of dollars, you build it yourself, for free. That's the shift." },
 ],
 },
 {
 lessonIndex: 4, lessonTag: '04, The Big Divide', title: 'Everyone thinks AI is just a chatbot. They are wrong.',
 estLength: '90-120 sec',
 blocks: [
 { label: 'HOOK', text: "Here's the thing nobody talks about. Most people using AI are using it like a fancy Google. A completely different group is building with it. The gap is huge and it's only getting wider." },
 { label: 'TEACH', text: "Using Claude as a chatbot is like having a calculator. Building with it is like having an entire team you can direct from your phone while you're getting your nails done. Building means you make real things. Websites. Agents that run on a schedule. Products you can sell. Tools companies pay you to create." },
 { label: 'STAGE', text: "[Show stat: 0.4% of Americans use AI at the capability of actually building.]" },
 { label: 'CLOSER', text: "Every person who learns to build with AI closes that gap a little. You're about to be one of them. Let's go." },
 ],
 },
 {
 lessonIndex: 5, lessonTag: '05, Imposter Syndrome', title: "You're not behind. Nobody is.",
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "I need to say this. I see a lot of people, especially folks who weren't already \"in tech,\" hang back in AI because of it." },
 { label: 'TEACH', text: "You are not behind. Everybody in AI is lost right now. The tools change every month. The people calling themselves experts on Twitter are just louder, not smarter. I'm nineteen. I had zero background. I just had a willingness to look stupid in public for long enough to stop being stupid. That's the whole skill. If you feel imposter-y, that's a signal you're in new territory, which means you're learning. It's not a sign to stop. Ask the dumb question, use different words than the jargon, compare yourself to you from a month ago, not to Twitter." },
 { label: 'CLOSER', text: "The people who make it just keep building through the feeling. You're not behind. Go build the thing." },
 ],
 },
 {
 lessonIndex: 6, lessonTag: '06, Setup', title: 'Getting set up takes 5 minutes.',
 estLength: '60 sec',
 blocks: [
 { label: 'HOOK', text: "Three steps. That's all to get started." },
 { label: 'STAGE', text: "[Screen recording: go to claude.ai in Chrome, show the Download desktop app button]" },
 { label: 'TEACH', text: "One. Go to claude dot ai in Chrome and download the desktop app. Drag the Claude icon into your Applications folder when it asks. Log in with Google. Two. Start on the free plan. It's fine for learning. You'll know when you hit your limit because Claude tells you. When you're actually building for clients, the 20 dollar a month paid plan is worth it. Three. Know that Cowork exists, for later. Cowork is a separate tool where Claude controls your computer for you. We'll get to it." },
 { label: 'CLOSER', text: "That's the whole setup. Five minutes. No credit card required to start." },
 ],
 },
 {
 lessonIndex: 7, lessonTag: '07, Pricing Tiers', title: 'Free vs. Pro vs. Max.',
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "Claude has three tiers. Free, Pro, and Max. Picking the right one matters. Because the price jumps are real." },
 { label: 'TEACH', text: "Free is zero dollars. Fine for learning, writing, brainstorming. Solid daily limit. When you hit it, Claude tells you and waits a few hours. Perfect for everything in this course. Pro is 20 a month. About 5x the messages, newest model first. The second you're building something real and getting cut off, it's worth the 20. Max is a hundred to two hundred a month. Effectively unlimited. That's what I'm on, the $100 tier, I run this stuff like a job, so it pays for itself." },
 { label: 'STAGE', text: "[Screen recording: claude.ai/pricing showing the 3 cards side by side]" },
 { label: 'CLOSER', text: "Rule of thumb. Start free. Upgrade the moment Claude cuts you off mid-project more than twice a week. Don't pre-pay for a tier you're not using yet." },
 ],
 },
 {
 lessonIndex: 8, lessonTag: '08, Grammar? Never.', title: "Claude does not care about your grammar.",
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "This is not your English teacher. Type however you want. Seriously." },
 { label: 'TEACH', text: "Fragments. Typos. Ramble. Change direction mid sentence. Claude figures it out. When Claude does something wrong or gets stuck in a loop, I respond in all caps. I've literally sent OH MY GOD YOU'RE TERRIBLE AT THIS before. Claude doesn't have feelings. It doesn't take anything personally. It just keeps going." },
 { label: 'STAGE', text: "[Show screenshot of your mad mode message to Claude on screen]" },
 { label: 'CLOSER', text: "That said, being specific about what went wrong gets a better fix than just yelling. But both technically work." },
 ],
 },
 {
 lessonIndex: 9, lessonTag: '09, Just Yap', title: 'You talk. Claude builds.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "Talking to Claude is shockingly casual. Like texting a friend who's also a genius." },
 { label: 'TEACH', text: "You don't need to know how to do the thing. You don't need to know if it's possible. Just describe it. The one sentence that changes everything: at the end of anything important, add, ask me any clarifying questions before you start. This stops Claude from running off and building the wrong thing. Also, there's a microphone button. Tap it, talk. I have a keyboard shortcut so double tapping Control starts the mic anywhere on my Mac." },
 { label: 'STAGE', text: "[AYLA READS HER REAL MAD-MODE MESSAGES ON CAMERA. BEEP OUT THE CURSES IN POST. Examples to read: \"oh my god you're terrible at this. what the [BEEP] am i paying 100 a month for. JUST COPY THE PINTEREST INSPO PICS OMG.\" / \"[BEEP]ING WORK.\" / \"so i pay $100 a month and you can't do a simple task but make me wait 2 hours to figure that out. [BEEP] this.\" Keep tone playful. Laugh at yourself a little.]" },
 { label: 'CLOSER', text: "If you forget everything else from this video, remember: ask me any clarifying questions before you start. That one phrase." },
 ],
 },
 {
 lessonIndex: 10, lessonTag: "10, When It's Wrong", title: "Claude will get it wrong sometimes.",
 estLength: '60 sec',
 blocks: [
 { label: 'HOOK', text: "Claude is going to misunderstand you, build the wrong thing, go off on a tangent. This is normal. It happens to me every day." },
 { label: 'TEACH', text: "What actually helps. Be specific. Not, this is bad, but, the colors are wrong, I wanted pink not purple. Send a screenshot. If something doesn't make sense, paste a screenshot and say, what is this. Ask for simpler instructions. If it's too technical, say, explain this like I'm in 8th grade. Start fresh if needed. Sometimes opening a new chat and being more specific is faster than untangling." },
 { label: 'CLOSER', text: "You're the director. Claude is the production team. When the scene's not right, give specific notes." },
 ],
 },
 {
 lessonIndex: 11, lessonTag: '11, Stay Organized', title: "Organization actually matters here.",
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "Claude doesn't carry anything between chats. Starting a new conversation, it has no idea who you are. Every chat is a blank slate." },
 { label: 'TEACH', text: "Rule one. Stay in the same chat while you're building. Don't start a new one mid project. Rule two. Use Projects. Claude has a feature called Projects that groups related chats and lets you add a permanent briefing Claude always sees. Set up a Project for anything ongoing. Rule three. Always check which chat you're in before typing. I've made this mistake more than once." },
 { label: 'CLOSER', text: "Projects are the closest thing Claude has to actually remembering you." },
 ],
 },
 {
 lessonIndex: 12, lessonTag: '12, Get an Idea', title: 'First you need an idea.',
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "Claude can't do anything if you don't have a direction. That part is on you." },
 { label: 'TEACH', text: "Your idea doesn't have to be huge. A tiny thing that saves you time. A website for yourself. A business plan you've been sitting on. The first thing I built was a personal website. Uploaded my resume, dropped three screenshots of sites I thought were pretty, described the vibe in one sentence. Claude built the whole site in one chat." },
 { label: 'CLOSER', text: "If you're still blank on an idea, there's a quiz right under this lesson that'll give you three personalized options in 30 seconds." },
 ],
 },
 {
 lessonIndex: 13, lessonTag: '13, When Not to AI', title: 'The counter-intuitive lesson.',
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "Being good at this means knowing when to not use Claude." },
 { label: 'TEACH', text: "Don't use it for personal writing where vulnerability matters, birthday notes, eulogies. Don't use it when being wrong is dangerous, medical, legal, money. Don't use it when a task is actually faster manually. Don't use it for creative work where you want YOUR style to come through. Don't use it to skip a skill you actually want to learn. The people who go the furthest with AI are the ones intentional about when they put it down." },
 { label: 'CLOSER', text: "Using AI for everything is a sign you haven't figured out what it's actually for." },
 ],
 },
 {
 lessonIndex: 14, lessonTag: '14, The Four Modes', title: 'Chat, Claude Code, Cowork, and the Chrome extension.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "Claude has three different modes. They do different things. It matters which one you use." },
 { label: 'TEACH', text: "One. Claude Chat, at claude dot ai. The one you're using now. It makes things, but they live on your computer. Nobody else can access them. Great for learning, brainstorming, making stuff for yourself. Two. Claude Code. Installs inside a free app called VS Code. This is when you want something actually live. A real website, a system that runs automatically. Three. Cowork. Claude with hands. Controls your computer, clicks around apps, moves files. I don't personally use it yet." },
 { label: 'CLOSER', text: "Rule of thumb. Chat while learning. Claude Code when launching something. Cowork for repetitive computer tasks." },
 ],
 },
 {
 lessonIndex: 15, lessonTag: '15, HTML Files', title: 'When Claude makes you something in Chat, here is what it is.',
 estLength: '60 sec',
 blocks: [
 { label: 'HOOK', text: "When Claude builds you a website in Chat, the file it gives you is called an HTML file. Less scary than it sounds." },
 { label: 'TEACH', text: "An HTML file is just a file on your computer. Like a Word doc. Except when you double click it, your browser opens it and it looks like a real webpage. It's not on the internet. Nobody can find it. It's just sitting on your computer. Great for seeing what something will look like before launching." },
 { label: 'CLOSER', text: "When you're ready for it to actually be on the internet, that's Claude Code. We cover that next." },
 ],
 },
 {
 lessonIndex: 16, lessonTag: '16, Deploying', title: 'Homebrew. GitHub. Vercel.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "Three tools get your website live. Here's what each one does." },
 { label: 'TEACH', text: "Homebrew is a tool on your Mac that lets you install other tools. Nobody can fully explain it. Just install it first. GitHub is cloud storage for code. Think Google Drive, but for your project. Vercel is what actually puts your site live on the internet. Free for personal projects. This is what aylablumberg dot com runs on." },
 { label: 'STAGE', text: "[Screen recording: paste the Homebrew install command in Terminal, show it running]" },
 { label: 'CLOSER', text: "If anything throws an error, paste the error directly into Claude. It'll tell you exactly what to do next." },
 ],
 },
 {
 lessonIndex: 17, lessonTag: '17, Terminal', title: 'Terminal looks scary. It is not.',
 estLength: '60 sec',
 blocks: [
 { label: 'HOOK', text: "Terminal is a black text window on your Mac. It looks scary. It is not dangerous. You're not going to break anything." },
 { label: 'TEACH', text: "The workflow is simple. Claude tells you what to paste. You paste. Terminal does something. You copy what Terminal says, paste it back to Claude. You'll know Terminal is done when the cursor comes back to a new line ending in a percent symbol." },
 { label: 'CLOSER', text: "When you use Claude Code, you barely touch Terminal. Claude handles most of it." },
 ],
 },
 {
 lessonIndex: 18, lessonTag: '18, API Keys', title: 'API keys are how Claude connects to other apps.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "The moment you want Claude to touch Gmail, Instagram, Canva, anything else, you need an API key." },
 { label: 'TEACH', text: "Technically, an API key is a long string of random letters and numbers that acts as a private password between two apps. Real life analogy: a hotel key card. The hotel gives you a card that only works for your room. You hand that card to Claude. Now Claude can walk in on your behalf. If someone else gets your key card they can charge things to your account. So API keys only go inside your private Claude setup. Nowhere else. Ever." },
 { label: 'CLOSER', text: "Claude will always tell you when you need a key and where to get it. Just follow its steps." },
 ],
 },
 {
 lessonIndex: 19, lessonTag: '19, Real APIs', title: "The APIs you'll actually care about.",
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "Some APIs come up over and over. Here are the main ones." },
 { label: 'TEACH', text: "Gmail API. Lets Claude send emails from your Gmail, read your inbox, respond. If you're building any outreach or follow up system, this is the one. Apify. Scrapes data from the internet. TikTok comments, Instagram followers, Google Maps listings. When you need a list of leads, Apify is how you get it. Canva API. Lets Claude generate designs automatically. Anthropic API. Claude's own API. You use this when you start building agents, because it gives your agent access to Claude's intelligence." },
 { label: 'CLOSER', text: "The process is the same every time. Find the key. Paste it in. Claude handles the rest." },
 ],
 },
 {
 lessonIndex: 20, lessonTag: '20, Selling Online', title: 'So how do people actually buy things from you.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "If you're building anything to sell, you need a way to charge people. That's Stripe." },
 { label: 'TEACH', text: "Stripe is the company that handles payments online. Almost every site you've bought from uses it. Shopify. Substack. This course. You sign up, plug it in, and now you can take money from anyone with a card. Fee is around 2.9% plus 30 cents per transaction. Money lands in your bank 2 to 3 days later. Three things to know. Products are what you sell. Prices attach to products. Checkout is the page the customer enters their card on, Stripe gives you a pre-built one." },
 { label: 'CLOSER', text: "Build the site. Claude wires up the checkout. Money comes in. That's the whole model." },
 ],
 },
 {
 lessonIndex: 21, lessonTag: '21, Stripe Walkthrough', title: 'Let us actually wire up Stripe.',
 estLength: '120 sec',
 blocks: [
 { label: 'HOOK', text: "This is the exact same flow I used to set up payments for this course. Step by step." },
 { label: 'TEACH', text: "One. Go to stripe dot com, sign up. Two. Turn on Test mode, top right. Test mode lets you fake payments. Three. Left sidebar, Product catalog, Add product. Set a name and price. Four. Click into the product, find the price, copy the price ID. It starts with price underscore. Five. Developers, API keys. Copy the publishable key and the secret key. Then say to Claude: Add Stripe checkout to my site, here's my price ID, I'll give you the keys in a second. Claude handles it." },
 { label: 'STAGE', text: "[Screen recording: show each step in the Stripe dashboard]" },
 { label: 'CLOSER', text: "Always test in test mode first. Stripe gives you fake card numbers. Once it works in test, flip to live mode. You're in business." },
 ],
 },
 {
 lessonIndex: 22, lessonTag: '22, Your First Client', title: 'How to find your first paying client.',
 estLength: '90-120 sec',
 blocks: [
 { label: 'HOOK', text: "Tutorials are always vague on this. I'm going to be specific." },
 { label: 'TEACH', text: "Know what you're selling. Not AI consulting. One specific thing. A local business website. A cold outreach system. A content generator. A proposal factory. Pick one. Three places I actually get clients. One, local businesses without websites, I Google Maps them and walk in. Two, Instagram DMs to creators whose vibe I like, specific not generic. Three, my own network, I just post once that I'm taking three clients and someone in my circle bites." },
 { label: 'STAGE', text: "[On screen: a screenshot of one of your real first-client conversations would land here, but skip it if you'd rather]" },
 { label: 'CLOSER', text: "Don't undersell. Your first number becomes your anchor. Pick a price that feels slightly uncomfortable. That's the right one." },
 ],
 },
 {
 lessonIndex: 23, lessonTag: '23, Proposal vs Contract', title: 'Two different documents, both matter.',
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "People confuse these constantly. They do completely different things." },
 { label: 'TEACH', text: "A proposal is a sales doc. Pretty, persuasive, explains what you'll do and why you're the right person. Not legally binding. A contract is a legal doc. Boring by design. Payment terms, cancellation, who owns the work. Both are necessary. Order, proposal closes the deal, contract protects it. The easy way, tell Claude, write me a freelance proposal and a matching contract for this project, warm on the proposal, clear on the contract. Two docs in a minute." },
 { label: 'CLOSER', text: "One tip, put the price in the proposal, not buried in the contract. Surprising number of deals die because the client never saw what it would cost on page one." },
 ],
 },
 {
 lessonIndex: 24, lessonTag: '24, Agents', title: "Agents. Claude doing things on its own.",
 estLength: '90-120 sec',
 blocks: [
 { label: 'HOOK', text: "Everything in this course was the foundation. Here's where it gets actually wild. Agents." },
 { label: 'TEACH', text: "An agent is a version of Claude that has a specific job. Find leads, write emails, track data, post content, follow up with clients. It's connected to the apps it needs via API keys. It runs on a schedule, every morning at 8am. And it reports back when something needs your attention. My outreach system finds businesses without websites, builds them a site, and sends them a cold email every single morning. I didn't write any code. I just explained what I wanted." },
 { label: 'STAGE', text: "[End card: Now go build something. Open Claude and type: I want to build [your idea]. Ask me any clarifying questions.]" },
 { label: 'CLOSER', text: "That's the whole thing. Go." },
 ],
 },
 {
 lessonIndex: 25, lessonTag: '25, Claude on Phone', title: 'The mobile workflow almost nobody uses.',
 estLength: '60-90 sec',
 blocks: [
 { label: 'HOOK', text: "Half my best work happens when I'm not at my desk." },
 { label: 'TEACH', text: "Download the Claude mobile app, same chats sync. Voice dictation is the superpower, I talk to Claude way more than I type, the mic button is a better brain-dumper than the keyboard. Photograph anything and ask, receipt you don't get, error you don't understand, sign in another language, plant you're not sure how to water, picture to Claude, done. Text your Telegram agents from anywhere, from bed, from the Uber, from the bathroom, they reply in seconds." },
 { label: 'CLOSER', text: "If you only use Claude on a laptop, you're missing half of what it can do for you." },
 ],
 },
 {
 lessonIndex: 26, lessonTag: '26, A Day in My Life', title: 'What a chaotic AI life looks like.',
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "People always ask what my day looks like. I live a chaotic life, I'm not gonna pretend otherwise." },
 { label: 'TEACH', text: "There's no perfect 9-to-5 grid for this. But there are shapes to my day, the moves I make over and over. First thing I do every morning is open Telegram and read what my agents did overnight. That's my brief, before email, before social, before coffee. Then I pick a build block, a long uninterrupted chunk where it's just me and Claude making something. Phone face-down, no tabs, no notifications. That's where the actual money gets made." },
 { label: 'TEACH', text: "Calls happen on the move. I take live notes into a Claude chat on my phone and ask Claude to turn them into a proposal right after. There's always a chaos block in the day where the plan goes out the window, that's fine. End of day I read what my agents shipped, approve, reject, comment. And then I get into bed and tell myself I'll just tweak one thing, and somehow it's 2 AM. Every time." },
 { label: 'CLOSER', text: "I'm messy. My agents are not. Together we ship. That's the whole system." },
 ],
 },
 {
 lessonIndex: 27, lessonTag: '27, Favorite Mistakes', title: "Things I screwed up so you don't have to.",
 estLength: '90 sec',
 blocks: [
 { label: 'HOOK', text: "Two of my favorite mistakes. Neither of them broke me, both of them taught me more than a tutorial could." },
 { label: 'TEACH', text: "One. The morning my iMac container deleted everything. Code, configs, scheduled tasks, all gone overnight. I cried. Real cried. I thought months of work was wiped. Then I opened Claude and scrolled my chat history, because every single decision had been built in conversation with Claude. I told it, rebuild everything, you have the context. Three hours later, running again. Lesson: Claude chats are a backup, but actually push your code to GitHub too. Free insurance." },
 { label: 'TEACH', text: "Two. I tried to build a whole agent team on day one. Scrape, qualify, outreach, reply-handle, nurture, close, all in one go. It crashed constantly. I almost quit. Then I deleted everything, built ONE agent that just sent cold emails. Worked in an hour. Then I added the scraper. Then the reply handler. One piece at a time. Lesson: don't design the Death Star on day one. Build the smallest thing that works, then add to it." },
 { label: 'CLOSER', text: "Both became the stories. Yours will too. Push through." },
 ],
 },
 {
 lessonIndex: 28, lessonTag: '28, My Top Prompts', title: 'The 10 prompts I paste every single day.',
 estLength: '120 sec',
 blocks: [
 { label: 'HOOK', text: "If the prompt library is the menu, these are what I actually order." },
 { label: 'TEACH', text: "Number one, ask me any clarifying questions before you start. Forever. Every project. Number two, explain this like I'm in 8th grade when something sounds smart and I'm quietly lost. Three, here are ten real samples of my voice, match me. Four, stop, re-read what I asked, do only that. Five, interview me one question at a time. Six, make this feel expensive. Seven, add this feature but don't rewrite the whole site. Eight, pretend you're my target audience, what's confusing. Nine, write this cold email, don't use these specific banned words. Ten, stop telling me to do it myself, you have the tools, do it." },
 { label: 'CLOSER', text: "You don't need 500 prompts. You need 10 you actually use." },
 ],
 },
 {
 lessonIndex: 29, lessonTag: '29, Post While You Build', title: 'Post while you\u2019re building. Not after.',
 estLength: '2-3 min',
 blocks: [
 { label: 'HOOK', text: "Okay, final lesson. This is the one I wish someone had yelled at me about sooner. You need to post about what you're building. Like, publicly. While you're building it. Not when it's done, not when it's pretty, not when you finally feel ready. Now." },
 { label: 'TEACH', text: "I'm going to be honest with you. Posting on TikTok and Instagram about what I was making with Claude is the single biggest reason I got hired. Not my portfolio. Not cold outreach. Not a resume. The messy screen recordings of me figuring it out at 11 at night. Those got me paid." },
 { label: 'TEACH', text: "Within one month of starting to post, two companies slid into my DMs asking if I could build them agents. And an email from a founder who's now kind of a mentor to me. (I'm still hoping a podcast invite shows up at some point, putting it out there.) Every one of those came from a post that took me ten minutes to make. I'm not exaggerating." },
 { label: 'TEACH', text: "And here's the part nobody says out loud. Posting is how you find your people. The DMs coming in aren't just clients. They're other builders. Other nerds. Other people who get what you're doing. You can't always explain this stuff to friends who aren't in it, they don't really care, that's fine. The internet has your people. You just have to show up so they can find you." },
 { label: 'TEACH', text: "What to post? Four formats that work every single time. One, the I-don't-know-what-I'm-doing post. Screen record Claude making something for you, voiceover something like, I'm trying to build X, here's what's happening. That's a full post. Two, the before-slash-after. The prompt you gave, the thing Claude made. Fifteen seconds. Three, the problem-first post. Don't start with the AI, start with what was annoying you. I was spending two hours a day on X, so I built a thing. Four, the Sunday recap. Three things you learned this week. What surprised you, what broke, what clicked." },
 { label: 'TEACH', text: "Pro move. After Claude builds something, literally ask it, now write me a TikTok script for this in 45 seconds, casual, first person, no hashtags. Claude writes it. You hit record. Same for captions. The thing you just built is the content. You are never going to run out of stuff to post because you're always building." },
 { label: 'CLOSER', text: "The one rule: don't wait until you're ready. You won't be. Post this week. Tag me. At aylablumberg dot a-i, on TikTok and Instagram. I'll see it. I'll re-share you. Go." },
 ],
 },
]
