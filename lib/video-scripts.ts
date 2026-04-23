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
    estLength: '60-90 sec',
    blocks: [
      { label: 'HOOK', text: "Hi, I'm Ayla. I'm 19. I've never taken a coding class. I've never watched a single YouTube tutorial on how to build anything. Four months ago I didn't know what Claude was." },
      { label: 'TEACH', text: "I learned Claude in March. By April I was getting hired to build AI agent teams for companies. I wrote this course based on what I learned in a month, so I could hand you the exact shortcut I wish someone had handed me." },
      { label: 'STAGE', text: "[Cut to: a clip of one of your builds, or a phone recording of you opening the Claude app]" },
      { label: 'CLOSER', text: "If you've ever thought, I see all this AI stuff and I have no idea where to start, this is that starting line. Let's go." },
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
      { label: 'STAGE', text: "[Show stat: 0.4% of Americans use AI to the capability of actually building. 22% of AI professionals globally are women.]" },
      { label: 'CLOSER', text: "Every woman who learns to build with AI closes this gap a little. You're about to be one of the people who can. Let's go." },
    ],
  },
  {
    lessonIndex: 5, lessonTag: '05, Setup', title: 'Getting set up takes 5 minutes.',
    estLength: '60 sec',
    blocks: [
      { label: 'HOOK', text: "Three steps. That's all to get started." },
      { label: 'STAGE', text: "[Screen recording: go to claude.ai in Chrome, show the Download desktop app button]" },
      { label: 'TEACH', text: "One. Go to claude dot ai in Chrome and download the desktop app. Drag the Claude icon into your Applications folder when it asks. Log in with Google. Two. Start on the free plan. It's fine for learning. You'll know when you hit your limit because Claude tells you. When you're actually building for clients, the 20 dollar a month paid plan is worth it. Three. Know that Cowork exists, for later. Cowork is a separate tool where Claude controls your computer for you. We'll get to it." },
      { label: 'CLOSER', text: "That's the whole setup. Five minutes. No credit card required to start." },
    ],
  },
  {
    lessonIndex: 6, lessonTag: '06, Grammar? Never.', title: "Claude does not care about your grammar.",
    estLength: '60-90 sec',
    blocks: [
      { label: 'HOOK', text: "This is not your English teacher. Type however you want. Seriously." },
      { label: 'TEACH', text: "Fragments. Typos. Ramble. Change direction mid sentence. Claude figures it out. When Claude does something wrong or gets stuck in a loop, I respond in all caps. I've literally sent OH MY GOD YOU'RE TERRIBLE AT THIS before. Claude doesn't have feelings. It doesn't take anything personally. It just keeps going." },
      { label: 'STAGE', text: "[Show screenshot of your mad mode message to Claude on screen]" },
      { label: 'CLOSER', text: "That said, being specific about what went wrong gets a better fix than just yelling. But both technically work." },
    ],
  },
  {
    lessonIndex: 7, lessonTag: '07, Get an Idea', title: 'First you need an idea.',
    estLength: '60-90 sec',
    blocks: [
      { label: 'HOOK', text: "Claude can't do anything if you don't have a direction. That part is on you." },
      { label: 'TEACH', text: "Your idea doesn't have to be huge. A tiny thing that saves you time. A website for yourself. A business plan you've been sitting on. The first thing I built was a personal website. Uploaded my resume, dropped three screenshots of sites I thought were pretty, described the vibe in one sentence. Claude built the whole site in one chat." },
      { label: 'CLOSER', text: "If you're still blank on an idea, there's a quiz right under this lesson that'll give you three personalized options in 30 seconds." },
    ],
  },
  {
    lessonIndex: 8, lessonTag: '08, Just Yap', title: 'You talk. Claude builds.',
    estLength: '60 sec',
    blocks: [
      { label: 'HOOK', text: "Talking to Claude is shockingly casual. Like texting a friend who's also a genius." },
      { label: 'TEACH', text: "You don't need to know how to do the thing. You don't need to know if it's possible. Just describe it. The one sentence that changes everything: at the end of anything important, add, ask me any clarifying questions before you start. This stops Claude from running off and building the wrong thing. Also, there's a microphone button. Tap it, talk. I have a keyboard shortcut so double tapping Control starts the mic anywhere on my Mac." },
      { label: 'CLOSER', text: "If you forget everything else from this video, remember: ask me any clarifying questions before you start. That one phrase." },
    ],
  },
  {
    lessonIndex: 9, lessonTag: '09, The Three Modes', title: 'Chat, Claude Code, and Cowork.',
    estLength: '90 sec',
    blocks: [
      { label: 'HOOK', text: "Claude has three different modes. They do different things. It matters which one you use." },
      { label: 'TEACH', text: "One. Claude Chat, at claude dot ai. The one you're using now. It makes things, but they live on your computer. Nobody else can access them. Great for learning, brainstorming, making stuff for yourself. Two. Claude Code. Installs inside a free app called VS Code. This is when you want something actually live. A real website, a system that runs automatically. Three. Cowork. Claude with hands. Controls your computer, clicks around apps, moves files. I don't personally use it yet." },
      { label: 'CLOSER', text: "Rule of thumb. Chat while learning. Claude Code when launching something. Cowork for repetitive computer tasks." },
    ],
  },
  {
    lessonIndex: 10, lessonTag: '10, HTML Files', title: 'When Claude makes you something in Chat, here is what it is.',
    estLength: '60 sec',
    blocks: [
      { label: 'HOOK', text: "When Claude builds you a website in Chat, the file it gives you is called an HTML file. Less scary than it sounds." },
      { label: 'TEACH', text: "An HTML file is just a file on your computer. Like a Word doc. Except when you double click it, your browser opens it and it looks like a real webpage. It's not on the internet. Nobody can find it. It's just sitting on your computer. Great for seeing what something will look like before launching." },
      { label: 'CLOSER', text: "When you're ready for it to actually be on the internet, that's Claude Code. We cover that next." },
    ],
  },
  {
    lessonIndex: 11, lessonTag: '11, Deploying', title: 'Homebrew. GitHub. Vercel.',
    estLength: '90 sec',
    blocks: [
      { label: 'HOOK', text: "Three tools get your website live. Here's what each one does." },
      { label: 'TEACH', text: "Homebrew is a tool on your Mac that lets you install other tools. Nobody can fully explain it. Just install it first. GitHub is cloud storage for code. Think Google Drive, but for your project. Vercel is what actually puts your site live on the internet. Free for personal projects. This is what aylablumberg dot com runs on." },
      { label: 'STAGE', text: "[Screen recording: paste the Homebrew install command in Terminal, show it running]" },
      { label: 'CLOSER', text: "If anything throws an error, paste the error directly into Claude. It'll tell you exactly what to do next." },
    ],
  },
  {
    lessonIndex: 12, lessonTag: '12, Terminal', title: 'Terminal looks scary. It is not.',
    estLength: '60 sec',
    blocks: [
      { label: 'HOOK', text: "Terminal is a black text window on your Mac. It looks scary. It is not dangerous. You're not going to break anything." },
      { label: 'TEACH', text: "The workflow is simple. Claude tells you what to paste. You paste. Terminal does something. You copy what Terminal says, paste it back to Claude. You'll know Terminal is done when the cursor comes back to a new line ending in a percent symbol." },
      { label: 'CLOSER', text: "When you use Claude Code, you barely touch Terminal. Claude handles most of it." },
    ],
  },
  {
    lessonIndex: 13, lessonTag: '13, API Keys', title: 'API keys are how Claude connects to other apps.',
    estLength: '90 sec',
    blocks: [
      { label: 'HOOK', text: "The moment you want Claude to touch Gmail, Instagram, Canva, anything else, you need an API key." },
      { label: 'TEACH', text: "Technically, an API key is a long string of random letters and numbers that acts as a private password between two apps. Real life analogy: a hotel key card. The hotel gives you a card that only works for your room. You hand that card to Claude. Now Claude can walk in on your behalf. If someone else gets your key card they can charge things to your account. So API keys only go inside your private Claude setup. Nowhere else. Ever." },
      { label: 'CLOSER', text: "Claude will always tell you when you need a key and where to get it. Just follow its steps." },
    ],
  },
  {
    lessonIndex: 14, lessonTag: '14, Real APIs', title: "The APIs you'll actually care about.",
    estLength: '90 sec',
    blocks: [
      { label: 'HOOK', text: "Some APIs come up over and over. Here are the main ones." },
      { label: 'TEACH', text: "Gmail API. Lets Claude send emails from your Gmail, read your inbox, respond. If you're building any outreach or follow up system, this is the one. Apify. Scrapes data from the internet. TikTok comments, Instagram followers, Google Maps listings. When you need a list of leads, Apify is how you get it. Canva API. Lets Claude generate designs automatically. Anthropic API. Claude's own API. You use this when you start building agents, because it gives your agent access to Claude's intelligence." },
      { label: 'CLOSER', text: "The process is the same every time. Find the key. Paste it in. Claude handles the rest." },
    ],
  },
  {
    lessonIndex: 15, lessonTag: '15, Selling Online', title: 'So how do people actually buy things from you.',
    estLength: '90 sec',
    blocks: [
      { label: 'HOOK', text: "If you're building anything to sell, you need a way to charge people. That's Stripe." },
      { label: 'TEACH', text: "Stripe is the company that handles payments online. Almost every site you've bought from uses it. Shopify. Substack. This course. You sign up, plug it in, and now you can take money from anyone with a card. Fee is around 2.9% plus 30 cents per transaction. Money lands in your bank 2 to 3 days later. Three things to know. Products are what you sell. Prices attach to products. Checkout is the page the customer enters their card on, Stripe gives you a pre-built one." },
      { label: 'CLOSER', text: "Build the site. Claude wires up the checkout. Money comes in. That's the whole model." },
    ],
  },
  {
    lessonIndex: 16, lessonTag: '16, Stripe Walkthrough', title: 'Let us actually wire up Stripe.',
    estLength: '120 sec',
    blocks: [
      { label: 'HOOK', text: "This is the exact same flow I used to set up payments for this course. Step by step." },
      { label: 'TEACH', text: "One. Go to stripe dot com, sign up. Two. Turn on Test mode, top right. Test mode lets you fake payments. Three. Left sidebar, Product catalog, Add product. Set a name and price. Four. Click into the product, find the price, copy the price ID. It starts with price underscore. Five. Developers, API keys. Copy the publishable key and the secret key. Then say to Claude: Add Stripe checkout to my site, here's my price ID, I'll give you the keys in a second. Claude handles it." },
      { label: 'STAGE', text: "[Screen recording: show each step in the Stripe dashboard]" },
      { label: 'CLOSER', text: "Always test in test mode first. Stripe gives you fake card numbers. Once it works in test, flip to live mode. You're in business." },
    ],
  },
  {
    lessonIndex: 17, lessonTag: '17, When It Goes Wrong', title: "Claude will get it wrong sometimes.",
    estLength: '60 sec',
    blocks: [
      { label: 'HOOK', text: "Claude is going to misunderstand you, build the wrong thing, go off on a tangent. This is normal. It happens to me every day." },
      { label: 'TEACH', text: "What actually helps. Be specific. Not, this is bad, but, the colors are wrong, I wanted pink not purple. Send a screenshot. If something doesn't make sense, paste a screenshot and say, what is this. Ask for simpler instructions. If it's too technical, say, explain this like I'm in 8th grade. Start fresh if needed. Sometimes opening a new chat and being more specific is faster than untangling." },
      { label: 'CLOSER', text: "You're the director. Claude is the production team. When the scene's not right, give specific notes." },
    ],
  },
  {
    lessonIndex: 18, lessonTag: '18, Stay Organized', title: "Organization actually matters here.",
    estLength: '60-90 sec',
    blocks: [
      { label: 'HOOK', text: "Claude doesn't carry anything between chats. Starting a new conversation, it has no idea who you are. Every chat is a blank slate." },
      { label: 'TEACH', text: "Rule one. Stay in the same chat while you're building. Don't start a new one mid project. Rule two. Use Projects. Claude has a feature called Projects that groups related chats and lets you add a permanent briefing Claude always sees. Set up a Project for anything ongoing. Rule three. Always check which chat you're in before typing. I've made this mistake more than once." },
      { label: 'CLOSER', text: "Projects are the closest thing Claude has to actually remembering you." },
    ],
  },
  {
    lessonIndex: 19, lessonTag: '19, What Next', title: "Agents. Claude doing things on its own.",
    estLength: '90-120 sec',
    blocks: [
      { label: 'HOOK', text: "Everything in this course was the foundation. Here's where it gets actually wild. Agents." },
      { label: 'TEACH', text: "An agent is a version of Claude that has a specific job. Find leads, write emails, track data, post content, follow up with clients. It's connected to the apps it needs via API keys. It runs on a schedule, every morning at 8am. And it reports back when something needs your attention. My outreach system finds businesses without websites, builds them a site, and sends them a cold email every single morning. I didn't write any code. I just explained what I wanted." },
      { label: 'STAGE', text: "[End card: Now go build something. Open Claude and type: I want to build [your idea]. Ask me any clarifying questions.]" },
      { label: 'CLOSER', text: "That's the whole thing. Go." },
    ],
  },
]
