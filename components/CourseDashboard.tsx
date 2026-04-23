'use client'

import { useEffect, useRef, useState } from 'react'

// ──────────────────────────────────────────────────────────
// LESSON CONTENT, preserved word for word from ayla-unlocked.html
// ──────────────────────────────────────────────────────────
type Lesson = { tag: string; leftTitle: string; num: string; vid: string; html: string }

const lessons: Lesson[] = [
  {
    tag: 'Welcome', leftTitle: "Hi. I'm Ayla.", num: '', vid: 'Ayla welcome video',
    html: `
    <div class="badge">Ayla Unlocked</div>
    <h1 class="l-head">Welcome.</h1>
    <p class="l-sub">Let's actually learn this, in a way that makes sense.</p>
    <div class="l-body">
      <p>I'm 19. I've never taken a coding class or even watched a YouTube explanation of how to code. I'm building two AI businesses and am starting to get hired to make AI agent teams for people and businesses.</p>
      <div class="a-quote">"All this stuff is intimidating and can sometimes feel like it's impossible to catch up. But I learned Claude mid-March and wrote this course mid-April. It's much easier than it seems. I'm no genius. I'm just ambitious and patient."</div>
      <p>This course is for the person who keeps seeing AI stuff online and thinking: <em>this looks insane, I don't know where to start, and every explanation feels like it's made for someone who already knows what they're doing.</em></p>
      <p>That's exactly who this is for. Let's go.</p>
      <div class="callout"><div class="callout-tag">What you'll be able to do after this</div>Build websites, automate repetitive tasks, generate content, create business plans, and make things that run on their own while you sleep. All just by talking. No code required.</div>
      <div class="ss">[ Photo: Something Ayla built ]</div>
    </div>`
  },
  {
    tag: '01 - What Claude Is', leftTitle: 'Before we start. What even is this thing.', num: '01', vid: 'Lesson 01: What Claude actually is',
    html: `
    <h1 class="l-head">Okay. So what even is Claude?</h1>
    <p class="l-sub">Let's actually understand what you're about to use.</p>
    <div class="l-body">
      <p>Claude is an AI made by a company called <strong>Anthropic</strong>. Anthropic is based in San Francisco and was started by a group of people who used to work at OpenAI (the company that makes ChatGPT). They left to make something they thought was safer and more useful. That's the short version.</p>
      <p>Underneath, Claude is what's called an <strong>LLM</strong>, a Large Language Model. Which sounds scary but just means: it's a program that read basically the entire internet, and now it can predict what words should come next in any conversation. That's it. That's the whole magic.</p>
      <p>When you talk to Claude, you're not searching a database. You're talking to something that learned how to think in language by reading millions of books, articles, code files, conversations, and websites. That's why it can write, code, analyze, summarize, plan, debate, and explain things all in the same chat.</p>
      <div class="callout"><div class="callout-tag">Claude vs. ChatGPT vs. Gemini</div>Claude (Anthropic), ChatGPT (OpenAI), and Gemini (Google) are all LLMs. They do similar things. I use Claude because it's the best for actually building. It writes better code, follows instructions more carefully, and gets into fewer weird spirals. Other people swear by ChatGPT. Honestly, the exact model matters less than learning how to direct any of them well. This course teaches you with Claude because that's what I use every day.</div>
      <p>Anthropic publishes something called a "Constitution" for Claude, basically a list of principles it's trained to follow. Things like: be honest, be helpful, don't help people hurt themselves or others. It's why Claude will sometimes push back on you or ask if you're sure. That's intentional. You're not just using software, you're working with something that has guardrails.</p>
      <p>One more thing to know: <strong>Claude doesn't remember you between chats.</strong> Every time you start a new conversation, it's starting from scratch. We'll get into how to work around that later. Just know that going in.</p>
      <div class="a-quote">"It learned how language works by reading more than any human ever could. Now it can do anything you can describe in words."</div>
    </div>`
  },
  {
    tag: '02 - What Claude Can Do', leftTitle: 'The full list. Wider than you think.', num: '02', vid: 'Lesson 02: Capabilities tour',
    html: `
    <h1 class="l-head">Claude can do a lot more than you think.</h1>
    <p class="l-sub">Most people use 5% of it. Here's the actual menu.</p>
    <div class="l-body">
      <p>Before we get into the "how," let's walk through what's actually possible. Because most people open Claude, ask it to summarize an email, and close the tab. They never find out what else is in there.</p>
      <div class="callout"><div class="callout-tag">Writing</div>Emails, captions, business plans, pitch decks, proposals, cover letters, essays, scripts, ad copy, blog posts, newsletters, LinkedIn posts, tweets, anything. In your voice if you give it examples. From scratch if not.</div>
      <div class="callout"><div class="callout-tag">Coding &amp; building</div>Websites, apps, tools, automations, calculators, forms, dashboards, browser extensions, iPhone shortcuts. You describe it, it builds it. No programming background needed on your end.</div>
      <div class="callout"><div class="callout-tag">Research</div>Comparing products, pulling information together from sources, breaking down industries, understanding any topic at the exact depth you want, analyzing trends, summarizing 100-page PDFs in one paragraph.</div>
      <div class="callout"><div class="callout-tag">Analysis</div>Upload a spreadsheet, ask what the data means. Upload a resume, ask what to change. Upload a contract, ask what to negotiate. Upload your calendar, ask where you're wasting time.</div>
      <div class="callout"><div class="callout-tag">Design thinking</div>Color palettes, CSS, layouts, critiques of your own designs, five versions of a website to pick from. It can't hand you a polished Photoshop file but it can hand you something Claude Code can turn into a real site.</div>
      <div class="callout"><div class="callout-tag">Talking things out</div>Business strategy, career decisions, hard conversations, pricing your services, how to respond to a difficult email. Shockingly good as a thinking partner.</div>
      <div class="callout"><div class="callout-tag">Agents &amp; automation</div>Claude can run on its own on a schedule, do tasks without you, and report back. This is the top of the pyramid. We get to this at the end of the course.</div>
      <p>The pattern: anything that involves language, logic, or structured thinking, Claude can help with. And with the right setup, it can go do those things for you while you sleep.</p>
      <p>This course walks you through exactly how to unlock each level. By the end, you'll know when to use Claude for a quick answer, when to use it to build something real, and when to set it up as an agent that works while you don't.</p>
    </div>`
  },
  {
    tag: '03 - The Mindset', leftTitle: 'Think of Claude like a really smart friend who can do anything.', num: '03', vid: 'Lesson 03: How to think about Claude',
    html: `
    <h1 class="l-head">Claude is not Google.</h1>
    <p class="l-sub">This is a fundamentally different thing and it matters that you understand why.</p>
    <div class="l-body">
      <p>Most people open Claude and treat it like a search engine. Quick question, quick answer, close the tab. That's using maybe 5% of what it can actually do.</p>
      <p>The better way to think about it: <strong>you hired a really smart friend who's good at literally everything.</strong> Coding, writing, designing, researching, planning, building. And you're just explaining to them what you want done.</p>
      <p>They'll figure it out. They might not get it perfect on the first try, and you'll go back and forth a little. That's normal. That's the process. You're the boss with the vision. Claude is the team executing it.</p>
      <div class="callout"><div class="callout-tag">The big shift</div>Instead of Googling how to do something, you tell Claude to do it and it does it. Instead of paying a developer thousands of dollars, you build it yourself for free. Instead of spending a week writing emails, you do it in an hour. Claude saves you time and lets you operate at a scale you couldn't reach alone.</div>
      <p>That's what this is. The most powerful shortcut that almost nobody knows how to use correctly yet. You're about to be one of the people who does.</p>
    </div>`
  },
  {
    tag: '04 - The Big Divide', leftTitle: 'Using AI as a chatbot vs. actually building with it. Not the same thing.', num: '04', vid: 'Lesson 04: Chatbot vs builder',
    html: `
    <h1 class="l-head">Everyone thinks AI is just a chatbot. They're wrong.</h1>
    <p class="l-sub">There's a massive divide that nobody talks about, and it's changing everything.</p>
    <div class="l-body">
      <p>Right now, most people using AI are using it like a fancy Google. Asking it questions. Getting it to help write an email. Summarizing something. That's useful, but it barely scratches the surface.</p>
      <p><strong>There's a completely different thing almost nobody knows about: actually building with AI.</strong></p>
      <p>Building means you use Claude to create real things that exist in the world. Websites people can visit. Systems that run automatically. Agents that do tasks on their own. Products you can sell. Tools other businesses pay you to make for them.</p>
      <p>Using a chatbot is like having a calculator. Building with AI is like having an entire team you can direct from your phone while you're getting your nails done.</p>
      <div class="stat-grid">
        <div class="stat-card"><div class="stat-num">0.4%</div><div class="stat-lab">of Americans use AI to the capability of actually coding or building anything</div></div>
        <div class="stat-card"><div class="stat-num">22%</div><div class="stat-lab">of AI professionals globally are women (World Economic Forum)</div></div>
        <div class="stat-card"><div class="stat-num">12%</div><div class="stat-lab">of machine learning researchers are women (MIT)</div></div>
        <div class="stat-card"><div class="stat-num">26%</div><div class="stat-lab">of the computing workforce is female, despite women being nearly half the overall workforce</div></div>
      </div>
      <p>These numbers matter because the people who know how to build with AI are going to run things for the next decade. And right now that group is overwhelmingly male, overwhelmingly "tech guys," and overwhelmingly not representing anyone who looks like us.</p>
      <p>Every woman who learns to build with AI closes that gap a little. This isn't about becoming a coder. It's about becoming the person who knows how to use the most powerful tool that exists right now, before everyone else figures it out.</p>
      <div class="callout"><div class="callout-tag">Why now specifically</div>The job market is shifting fast. Marketing, PR, content, admin roles are being automated. But people who know how to direct AI and build with it? They're getting hired, starting businesses, and making real money. The window to get ahead is open right now. You're reading this course because you already sense that.</div>
    </div>`
  },
  {
    tag: '05 - Setup', leftTitle: 'Getting you set up takes about 5 minutes.', num: '05', vid: 'Lesson 05: Setup walkthrough',
    html: `
    <h1 class="l-head">Let's get you set up.</h1>
    <p class="l-sub">Three steps. That's all.</p>
    <div class="l-body">
      <ol class="steps">
        <li><div><strong>Go to claude.ai in Chrome and download the desktop app.</strong> When it asks you to drag the Claude icon into another icon, do it. Open the app. Log in with Google. You're in.<div class="ss">[ Screenshot: Download flow ]</div></div></li>
        <li><div><strong>Start on the free plan.</strong> Completely fine for learning. You'll know when you hit your limit because Claude tells you directly. When you're actually building real things for people, the paid plan ($20/month) is worth it. You get way more messages and better features.</div></li>
        <li><div><strong>Know that Cowork exists, for later.</strong> Cowork is a separate desktop tool where Claude can literally control your computer, click through apps, open files, and do things for you. I don't personally use Cowork yet, but it's a powerful option once you're comfortable with the basics.</div></li>
      </ol>
      <div class="callout"><div class="callout-tag">If anything is confusing</div>You can send Claude a screenshot of whatever you're looking at and say "I don't understand this, explain it more simply." You can also just say "explain this like I'm in 8th grade" at any point and it will. Claude does not judge you for not knowing things. It just helps.</div>
    </div>`
  },
  {
    tag: '06 - Grammar? Never.', leftTitle: "You can yap. You can be mean. Claude doesn't care.", num: '06', vid: 'Lesson 06: Just talk to it',
    html: `
    <h1 class="l-head">Claude does not care about your grammar.</h1>
    <p class="l-sub">This is not your English teacher. Type however you want.</p>
    <div class="l-body">
      <p>Seriously. Type in fragments. Have typos everywhere. Go "okay so like... I want this thing but like not exactly like that, more like... you know?" and Claude will understand. You can ramble, change direction mid-sentence, forget what you were saying and restart in the same message. It figures it out.</p>
      <p>And yes, sometimes when Claude does something completely wrong or gets stuck in a loop, I respond in all caps. Here are real things I have actually sent:</p>
      <div class="chat-ex"><div class="bubble u mad">oh my god youre terrible at this. what the actual fuck am i paying 100 a month for. JUST COPY THE PINTEREST INSPO PICS OMG. if ur this bad at it maybe try in canva</div></div>
      <div class="chat-ex"><div class="bubble u mad">FUCKING WORK.</div></div>
      <div class="chat-ex"><div class="bubble u mad">so i pay $100 a month and you cant do a simple task but make me wait 2 hours to figure that out and tell me to just do it myself. fuck this.</div></div>
      <p>Claude doesn't have feelings. It doesn't take anything personally. It just keeps going. That said, being specific about what went wrong ("the colors are wrong, I wanted pink not purple, and the button needs to be on the right side not the left") will get you a better fix than just yelling. But both technically work.</p>
      <div class="callout"><div class="callout-tag">When you don't understand something</div>If Claude explains something and you don't get it, just say "I have no idea what that means, explain it way more simply." Or take a screenshot of your screen and paste it in and say "help, what is this." You can literally just send a photo of your screen. It will tell you what to do.</div>
    </div>`
  },
  {
    tag: '07 - Get an Idea', leftTitle: 'You need something to build before we go any further.', num: '07', vid: 'Lesson 07: Finding your idea',
    html: `
    <h1 class="l-head">First: you need an idea.</h1>
    <p class="l-sub">Claude can't do anything if you don't have a direction. That part is on you.</p>
    <div class="l-body">
      <p>Claude is a tool. An incredibly powerful tool, but it doesn't generate your vision. You bring the idea. It handles the execution.</p>
      <p>Your idea doesn't have to be huge. It could be something tiny that would save you time. Something you want to sell. A website for yourself. A business plan you've been sitting on. Start anywhere.</p>
      <p>Some ideas to get your brain going:</p>
      <ul>
        <li><strong>A personal website or portfolio</strong> (this is the first thing I built with Claude and what I recommend starting with. You can give Claude inspo screenshots of sites you like and upload your resume, and it builds your whole site in one conversation.)</li>
        <li>A website or landing page for something you want to sell</li>
        <li>An automated email or outreach system so you're not doing it manually</li>
        <li>A business plan or pitch deck you can show people</li>
        <li>A proposal template that builds itself once you fill in a few details</li>
        <li>A content calendar for your social media</li>
        <li>A lead tracker that organizes your clients automatically</li>
        <li>Anything at your job or in your life that's repetitive and annoying</li>
      </ul>
      <p>Still nothing? Take the quiz below. Answer four questions and I'll give you three personalized ideas based on what you're actually into.</p>
      <button class="quiz-btn" data-quiz="1"><span>&#10022;</span> Find my idea</button>
    </div>`
  },
  {
    tag: '08 - Just Yap', leftTitle: "How to actually talk to Claude. (It's very casual.)", num: '08', vid: 'Lesson 08: Voice, memos, and talking',
    html: `
    <h1 class="l-head">You talk. Claude builds.</h1>
    <p class="l-sub">Shockingly casual. Like texting a friend who's also a genius.</p>
    <div class="l-body">
      <p>Once you have an idea, the way to work with Claude is to just explain what you want like you're talking to a friend. You don't need to know how to do the thing. You don't need to know if it's even possible. Just describe it and Claude figures out the rest.</p>
      <div class="callout"><div class="callout-tag">Real things you can say</div>
        "I want to start a business that does X, I have no idea where to start"<br><br>
        "Can you build me a website for this? Make it pink and really pretty"<br><br>
        "I don't understand how to do this part, explain it like I'm in middle school"<br><br>
        "That's not what I meant, more like this..."<br><br>
        "I have no idea what that word means, can you just do it for me"
      </div>
      <p><strong>The one sentence that changes everything:</strong> at the end of whatever you say, add <em>"ask me any clarifying questions before you start."</em> This makes Claude stop and confirm it understood you before running off and building the wrong thing. Use this every single time on anything important.</p>
      <div class="divider"><span>Voice dictating</span></div>
      <p>There is a microphone button in Claude. Tap it and start talking. Way faster than typing. You can explain a whole business idea in two minutes out loud.</p>
      <p><strong>Even better on Mac:</strong> go to System Settings, then Keyboard, and set up a keyboard shortcut for dictation. I set mine so double-tapping Control starts the mic anywhere on my computer. No matter what I'm looking at, I just double-tap and start talking.</p>
      <p><strong>For voice memos:</strong> if you recorded something in the iPhone Voice Memos app, press the three dots on the recording and tap Transcribe. Copy the transcript and paste it directly into Claude. Or just upload the audio file and Claude will read it. Either works.</p>
      <div class="ss">[ Screenshot: Mic button in Claude + system settings dictation shortcut ]</div>
    </div>`
  },
  {
    tag: '09 - The Three Modes', leftTitle: 'Chat, Claude Code, and Cowork. Very different things.', num: '09', vid: 'Lesson 09: The three modes explained',
    html: `
    <h1 class="l-head">Claude has three different modes.</h1>
    <p class="l-sub">They do completely different things and it matters which one you use.</p>
    <div class="l-body">
      <div class="callout">
        <div class="callout-tag">Claude Chat (claude.ai)</div>
        The one you're using right now. You talk, it responds. It can write things, make plans, build files, create HTML pages. But everything it makes only lives on your computer. Nobody else can access it from the internet. Think of this as your drafting table.<br><br><strong>Use this for:</strong> learning, brainstorming, prototyping, making things for yourself.
      </div>
      <div class="callout">
        <div class="callout-tag">Claude Code</div>
        This is what you use when you want something actually live. A real website people can visit. A system that runs automatically. Claude Code installs inside VS Code (a free app) and handles all the technical stuff itself. You barely have to touch Terminal.<br><br><strong>Use this for:</strong> anything you want on the internet or running automatically.
      </div>
      <div class="callout">
        <div class="callout-tag">Cowork</div>
        Claude with hands. It can literally control your computer, open apps, fill out forms, and move files around. I don't personally use Cowork yet, but it's there when you're ready for it.<br><br><strong>Use this for:</strong> repetitive tasks that involve a lot of clicking around on your computer.
      </div>
      <p style="margin-top:10px;">Rule of thumb: <strong>Chat while learning. Claude Code when you're ready to launch something. Cowork when you want to automate computer tasks.</strong></p>
      <div class="ss">[ Screenshot: Chat vs Claude Code vs Cowork side by side ]</div>
    </div>`
  },
  {
    tag: '10 - HTML Files', leftTitle: "What Claude actually makes when you're in Chat.", num: '10', vid: 'Lesson 10: What is an HTML file',
    html: `
    <h1 class="l-head">When Claude builds you something in Chat, here's what it is.</h1>
    <p class="l-sub">It's called an HTML file. It's way less scary than it sounds.</p>
    <div class="l-body">
      <p>An HTML file is just a file on your computer, like a Word doc or a photo, except when you double-click it, your browser opens it and it looks like a real webpage.</p>
      <p><strong>It is NOT on the internet.</strong> It's sitting on your computer, looking like a site, but only you can see it. No one else can visit it or find it anywhere.</p>
      <p>This is great for:</p>
      <ul>
        <li>Seeing what something will look like before you launch it</li>
        <li>Building a prototype you can show someone in person</li>
        <li>Making something just for yourself that doesn't need to be public</li>
      </ul>
      <p>When you're ready for it to be real and live on the internet, that's when you use Claude Code and deploy it. Which is exactly what we cover next.</p>
      <div class="ss">[ Screenshot: HTML file in Finder on left, what it looks like when opened in browser on right ]</div>
    </div>`
  },
  {
    tag: '11 - Deploying', leftTitle: 'Homebrew. GitHub. Vercel. Your three best friends.', num: '11', vid: 'Lesson 11: Putting it live',
    html: `
    <h1 class="l-head">Homebrew. GitHub. Vercel.</h1>
    <p class="l-sub">Three tools that get your website live on the actual internet. Here's what each one is and how to install them.</p>
    <div class="l-body">
      <p><em>Skip this lesson for now if you're still in learning mode. Come back when you're ready to launch something real.</em></p>
      <div class="callout"><div class="callout-tag">Homebrew</div>A tool you install on your Mac that makes it possible to install other tools. Even developers can't fully explain what it does under the hood. You just need it installed before anything else works. It's the foundation. Install it first, don't question it.</div>
      <div class="callout"><div class="callout-tag">GitHub</div>Cloud storage for code. Think of it like Google Drive but specifically for your project's code. It holds everything so Vercel can find it and put it live.</div>
      <div class="callout"><div class="callout-tag">Vercel</div>The thing that actually puts your site live on the internet. It reads your code from GitHub and hosts it for free. This is what I use for aylablumberg.com and everything else I build. Once it's on Vercel, you can buy a real domain name on GoDaddy and point it there so it has a real address.</div>
      <div class="divider"><span>How to install all three</span></div>
      <p>Open Terminal on your Mac (press Command + Space, type "Terminal", hit Enter). Then paste these one at a time and hit Enter after each:</p>
      <p><strong>Step 1: Install Homebrew</strong></p>
      <div class="code-wrap"><div class="code-block" data-code="cb1">/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</div><button class="copy-btn" data-copy="cb1">Copy</button></div>
      <p>Wait for it to finish (takes a few minutes, totally normal). Then:</p>
      <p><strong>Step 2: Install GitHub and Vercel tools</strong></p>
      <div class="code-wrap"><div class="code-block" data-code="cb2">brew install node gh &amp;&amp; npm install -g vercel</div><button class="copy-btn" data-copy="cb2">Copy</button></div>
      <p>If anything throws an error, paste the error message directly into Claude and it will tell you exactly what to do next. Claude is very good at debugging its own instructions.</p>
      <div class="ss">[ Diagram: Your computer to GitHub to Vercel to live website ]</div>
    </div>`
  },
  {
    tag: '12 - Terminal', leftTitle: 'The black text window. Not as scary as it looks.', num: '12', vid: 'Lesson 12: Terminal demystified',
    html: `
    <h1 class="l-head">Terminal looks scary. It's really not.</h1>
    <p class="l-sub">You already opened it to install Homebrew. Basically a pro now.</p>
    <div class="l-body">
      <p>Terminal is a window on your Mac that lets you run commands directly on your computer. It's just text. No graphics. Doesn't look friendly. But it is not dangerous and you are not going to break your computer by using it.</p>
      <p>The workflow when you need it is simple: <strong>Claude tells you what to paste. You paste it. Terminal does something. You copy what Terminal says back to Claude.</strong> That's it. Back and forth.</p>
      <p>You'll know Terminal is done when the cursor comes back to a new line ending in a % symbol.</p>
      <div class="callout"><div class="callout-tag">How to mostly avoid Terminal</div>When you use Claude Code, you almost never have to touch Terminal. It handles everything itself. And if Claude ever tells you to go do something yourself, you can try saying "can you do that for me directly?" and it will often just handle it. But not always. Some things, like creating accounts or entering passwords, you have to do yourself for security reasons.</div>
      <div class="ss">[ Screenshot: What Terminal looks like, with the % cursor visible ]</div>
    </div>`
  },
  {
    tag: '13 - API Keys', leftTitle: 'The thing that connects Claude to every other app.', num: '13', vid: 'Lesson 13: API keys',
    html: `
    <h1 class="l-head">API keys: how Claude connects to other apps.</h1>
    <p class="l-sub">The moment you want Claude to touch Gmail, Instagram, Canva, or anything else, you need one of these.</p>
    <div class="l-body">
      <p><strong>Technically:</strong> an API key is a long string of random letters and numbers that acts as a private password between two apps. It tells the other app "yes, this person's Claude is allowed to come in and do things here."</p>
      <p><strong>The real-life analogy:</strong> think of it like a hotel key card. The hotel (Gmail, Canva, whatever) gives you a card that only works for your room. You hand that card to Claude, and now Claude can get into your room and do things on your behalf. The hotel doesn't let just anyone in without the card.</p>
      <div class="callout"><div class="callout-tag">Why you never paste API keys publicly</div>If someone else gets your key card, they can walk into your room, charge things to your account, and access everything in it. Same with API keys. If yours leaks into a screenshot, a public Google Doc, a group chat, or anywhere someone else can see it, they can use that app as if they're you. Rack up charges. Access your data. Make a mess. API keys only go inside your own private Claude setup. Nowhere else, ever.</div>
      <p>Claude will always tell you when you need a key and where to go get it. Just follow its steps. It walks you through everything.</p>
      <div class="ss">[ Screenshot: Example of where to find an API key in an app dashboard ]</div>
    </div>`
  },
  {
    tag: '14 - Real APIs', leftTitle: 'Specific APIs you will actually end up using.', num: '14', vid: 'Lesson 14: Gmail, Apify, and more',
    html: `
    <h1 class="l-head">The APIs you'll actually care about.</h1>
    <p class="l-sub">Here are the ones that come up constantly when building real things.</p>
    <div class="l-body">
      <div class="callout"><div class="callout-tag">Gmail API</div>Lets Claude send emails from your Gmail, read incoming messages, and respond to them. If you're building any outreach system, automated follow-up tool, or client communication system, this is the one you need. You get the key through Google Cloud Console. Claude walks you through it.</div>
      <div class="callout"><div class="callout-tag">Apify</div>Apify scrapes data from the internet. TikTok comments, Instagram follower info, business listings from Google Maps, anything on a website. If you want to know what people are saying about something online or you need a list of leads from a platform, Apify is how you get that data. One of the most useful tools once you start building anything marketing or outreach related.</div>
      <div class="callout"><div class="callout-tag">Canva API</div>Lets Claude create and edit designs in Canva automatically. Useful if you want to generate batches of graphics or build something that makes designs based on inputs without you doing it manually every time.</div>
      <div class="callout"><div class="callout-tag">Anthropic API</div>Claude's own API. This is the one you use when you start building agents, because it gives your agent access to Claude's intelligence. It's the brain you plug in to power the whole system. You get the key at console.anthropic.com.</div>
      <p>For every one of these, the process is the same: find the API key in that app's settings or developer dashboard, paste it into your Claude setup when prompted, and Claude handles the connection from there.</p>
      <div class="ss">[ Screenshot: Where to find Gmail API key + Apify API key ]</div>
    </div>`
  },
  {
    tag: '15 - Selling Online', leftTitle: 'How to actually take money from people on your site.', num: '15', vid: 'Lesson 15: Selling online with Stripe',
    html: `
    <h1 class="l-head">Okay. So how do people actually buy things from you?</h1>
    <p class="l-sub">The answer is Stripe. And Claude knows exactly how to wire it up.</p>
    <div class="l-body">
      <p>If you're building anything you want to sell, a course, a template, a service, a physical product, a digital download, a subscription, you need a way to charge people. That's where <strong>Stripe</strong> comes in.</p>
      <p>Stripe is a company that handles payments online. Almost every site you've ever bought something from uses it under the hood. Shopify uses it. Substack uses it. This very course uses it. You sign up for an account, plug it into your site, and now you can take money from anyone in the world with a card.</p>
      <div class="callout"><div class="callout-tag">What Stripe does for you</div>Charges credit cards, debit cards, Apple Pay, Google Pay. Handles the security stuff so you're not storing anyone's card info. Deposits the money directly into your bank account (minus a small fee, around 2.9% + 30&cent; per transaction).</div>
      <p>Before Stripe existed, accepting online payments was a nightmare. You had to get a "merchant account," deal with banks, pay monthly fees, build all kinds of security into your site. Now you sign up, verify your identity, and you're live in an afternoon.</p>
      <div class="divider"><span>The three things you need to know</span></div>
      <div class="callout"><div class="callout-tag">1. Products</div>The things you're selling. A one-time thing (a course, a template) or a subscription (monthly access to something). You create these in the Stripe dashboard.</div>
      <div class="callout"><div class="callout-tag">2. Prices</div>Each product has one or more prices attached to it. You can charge $39 one time. Or $10 a month. Or $100 a year. Stripe calls these "prices" and gives each one a unique ID.</div>
      <div class="callout"><div class="callout-tag">3. Checkout</div>The page where your customer enters their card info. Stripe gives you a pre-built, pretty, secure checkout page for free, you just tell it what price ID to charge.</div>
      <p>You build the site. Claude wires up the checkout. Money comes in. That's the whole model.</p>
      <div class="ss">[ Screenshot: Stripe dashboard products page ]</div>
    </div>`
  },
  {
    tag: '16 - Stripe Walkthrough', leftTitle: 'Actually setting it up. Step by step.', num: '16', vid: 'Lesson 16: Stripe setup walkthrough',
    html: `
    <h1 class="l-head">Let's actually wire up Stripe.</h1>
    <p class="l-sub">This is the exact same flow I used to set up payments for this course.</p>
    <div class="l-body">
      <ol class="steps">
        <li><div><strong>Go to stripe.com and create an account.</strong> Sign up with your email. You'll need to verify your phone, then eventually enter your business info and bank account to actually get paid. You can skip the bank part while you're just testing.</div></li>
        <li><div><strong>Turn on "Test mode" in the dashboard.</strong> Top right of the Stripe dashboard, there's a toggle. Turn it on. Test mode lets you set everything up and fake payments without charging real cards. You'll switch to "Live mode" right before launch.</div></li>
        <li><div><strong>Create a product.</strong> In the left sidebar, click "Product catalog" then "+ Add product." Give it a name (like "Website template" or "Consulting call"). Set a price. Choose whether it's one-time or recurring. Save.</div></li>
        <li><div><strong>Copy the price ID.</strong> Click into your product. Find the price (shows like "$39.00 USD &middot; One time"). Click the three dots &rarr; "Copy ID." It starts with <strong>price_</strong> and looks like gibberish. This is what you give Claude.</div></li>
        <li><div><strong>Get your API keys.</strong> In the dashboard, click "Developers" &rarr; "API keys." You'll see a <strong>Publishable key</strong> (safe to use anywhere) and a <strong>Secret key</strong> (keep secret, server-only). Both of these go to Claude when you tell it to add checkout to your site.</div></li>
      </ol>
      <div class="divider"><span>What you say to Claude</span></div>
      <p>Once you have the price ID and keys, just say this to Claude Code:</p>
      <div class="chat-ex"><div class="bubble u">Add Stripe checkout to my site. Here's my price ID: price_ABC123. I'll give you the keys in a second. When someone clicks the Buy button, they should go to Stripe's hosted checkout page. After they pay, redirect them to a thank-you page.</div></div>
      <p>That's it. Claude knows what to do from there. It'll ask you for the keys, create the files, and wire the whole thing up.</p>
      <div class="callout"><div class="callout-tag">Webhooks, the one tricky part</div>A webhook is how Stripe tells your site when a payment actually went through. Without it, your site doesn't know who paid. When you ask Claude to add checkout, also say: "also set up a webhook so I know when someone pays." Claude will give you a URL to paste into Stripe's webhook settings, and Stripe will send you a signing secret to paste back.</div>
      <div class="callout"><div class="callout-tag">Test mode vs. live mode</div>Always test in test mode first. Stripe gives you fake card numbers (like <strong>4242 4242 4242 4242</strong>) you can use to fake a successful payment. Once everything works in test mode, flip the switch to live mode, get new keys, get new price IDs, and paste those in. Then you're live.</div>
      <p>One more thing: Stripe handles taxes, receipts, refunds, and disputes through its dashboard. You barely have to think about any of it once it's set up. Customers pay. Money lands in your bank account 2-3 days later. That's the loop.</p>
      <div class="ss">[ Screenshot: Stripe checkout page on mobile ]</div>
    </div>`
  },
  {
    tag: "17 - When It's Wrong", leftTitle: "Claude will mess up. Here's exactly what to do.", num: '17', vid: 'Lesson 17: Course correcting',
    html: `
    <h1 class="l-head">Claude will get it wrong sometimes.</h1>
    <p class="l-sub">This is completely normal and it happens to everyone including me constantly.</p>
    <div class="l-body">
      <p>Claude is going to misunderstand you, build the wrong thing, go off on a tangent, or give you something that's close but not quite right. This is just part of the process. Don't let it spiral you out.</p>
      <p>What actually helps when something goes wrong:</p>
      <ul>
        <li><strong>Be specific about what's wrong.</strong> Not "this is bad" but "the colors are wrong, I wanted pink not purple, the button needs to be on the right side, and the font is too small."</li>
        <li><strong>Send a screenshot.</strong> If something on your screen doesn't make sense or you got an error you don't understand, paste a screenshot directly into the chat and say "what is this and what do I do." Claude will read it and tell you exactly what's happening.</li>
        <li><strong>Ask for simpler instructions.</strong> If it's explaining something too technically, say "explain this like I'm in 8th grade" and it will break it all the way down.</li>
        <li><strong>Start fresh if needed.</strong> Sometimes a conversation gets so tangled that it's faster to open a new chat and be more specific from the beginning. That's not failure, it's just efficiency. Happens to me all the time.</li>
      </ul>
      <p>You're the director. Claude is the production team. When the scene isn't right, you give specific notes on what to change. That's the whole relationship.</p>
      <div class="ss">[ Screenshot: Example of a bad first output vs the corrected version after feedback ]</div>
    </div>`
  },
  {
    tag: '18 - Stay Organized', leftTitle: "Projects and staying in the right chat. More important than you'd think.", num: '18', vid: 'Lesson 18: Organizing your work',
    html: `
    <h1 class="l-head">Organization actually matters here.</h1>
    <p class="l-sub">Claude only knows what's in the current chat. Use that to your advantage.</p>
    <div class="l-body">
      <p>Claude doesn't carry anything between separate chats. Start a new conversation and it has no idea who you are, what you've been building, or what you discussed before. Every new chat is a blank slate.</p>
      <p>This is why how you structure your work really matters.</p>
      <div class="callout"><div class="callout-tag">Rule 1: Stay in the same chat</div>If you're actively building something, don't start a new chat in the middle of it. Keep going in the same one. Claude remembers everything you've discussed throughout that conversation. Starting over means it forgets everything and you have to re-explain your whole project.</div>
      <div class="callout"><div class="callout-tag">Rule 2: Use Projects</div>Claude has a Projects feature that groups related chats together and lets you add notes Claude always has access to, like a permanent briefing. Set up a Project for anything ongoing. Name it clearly. Keep all related chats inside it. This is the closest thing Claude has to actually remembering you.</div>
      <div class="callout"><div class="callout-tag">Rule 3: Always check which chat you're in</div>This sounds obvious but I've made this mistake more than once. Before you start typing, make sure you're in the right chat for the right project. Starting in the wrong place means Claude has no context and you'll waste time re-explaining everything.</div>
      <div class="ss">[ Screenshot: Claude Projects feature, how to create and name a project ]</div>
    </div>`
  },
  {
    tag: "19 - What's Next", leftTitle: 'Agents. The thing that makes this go from a tool to a business.', num: '19', vid: 'Lesson 19: What agents are',
    html: `
    <h1 class="l-head">Agents: Claude doing things on its own.</h1>
    <p class="l-sub">Everything in this course was the foundation. Here's where it gets actually wild.</p>
    <div class="l-body">
      <p>Everything you've learned in this course is about how you use Claude. Agents are about Claude using itself, automatically, without you having to tell it anything each time.</p>
      <p>An agent is basically a version of Claude that:</p>
      <ul>
        <li>Has a specific job (find leads, write emails, track data, post content, follow up with clients)</li>
        <li>Is connected to the apps it needs to do that job via API keys</li>
        <li>Runs on a schedule, like every morning at 8am, without you doing anything</li>
        <li>Reports back when something needs your attention</li>
      </ul>
      <p>Building agents uses the exact same skills you've been practicing this whole course: talking clearly, being specific, and iterating when something isn't right. It's just more layers on top of what you already know.</p>
      <div class="a-quote">"My outreach system finds businesses without websites, builds them a site, and sends a cold email every single morning. I didn't write any code. I just explained what I wanted and kept refining it."</div>
      <p>Agents are what take this from a useful tool to a business. They're how you do the work of a whole team by yourself. They're the next level, and you're ready to start going there.</p>
      <div class="callout"><div class="callout-tag">You're done. Go build something.</div>Open a new chat. Type "I want to build [your idea]. Ask me any clarifying questions before we start." That's literally it. That's the whole thing. Go.</div>
    </div>`
  },
]

// ──────────────────────────────────────────────────────────
// QUIZ
// ──────────────────────────────────────────────────────────
type QuizOpt = { l: string; v: string }
type QuizStep = { q: string; hint: string; multi: boolean; opts: QuizOpt[] }

const quizSteps: QuizStep[] = [
  {
    q: 'What are you actually into?', hint: 'Pick up to 3', multi: true, opts: [
      { l: 'Fashion & beauty', v: 'fashion' },
      { l: 'Business & money', v: 'business' },
      { l: 'Content creation', v: 'content' },
      { l: 'Real estate', v: 'realestate' },
      { l: 'Health & wellness', v: 'health' },
      { l: 'Travel & lifestyle', v: 'travel' },
      { l: 'School & academics', v: 'school' },
      { l: 'Selling products', v: 'products' },
    ],
  },
  {
    q: "What's wasting your time right now?", hint: 'Pick one', multi: false, opts: [
      { l: 'Sending the same emails over and over', v: 'emails' },
      { l: 'Writing captions and posts', v: 'captions' },
      { l: 'Tracking things in spreadsheets', v: 'tracking' },
      { l: 'Researching stuff manually', v: 'research' },
      { l: 'Reaching out to new clients or people', v: 'outreach' },
      { l: 'Scheduling and organizing', v: 'scheduling' },
    ],
  },
  {
    q: 'What would you actually want to end up with?', hint: 'Pick one', multi: false, opts: [
      { l: 'A website that represents me', v: 'website' },
      { l: 'Something running automatically', v: 'automation' },
      { l: 'A plan or proposal to show someone', v: 'plan' },
      { l: 'I just want to learn first', v: 'learning' },
    ],
  },
  {
    q: 'How serious are you about this?', hint: 'Be honest', multi: false, opts: [
      { l: 'Just exploring for now', v: 'exploring' },
      { l: 'I want to build something this month', v: 'building' },
      { l: "I'm trying to make real money from this", v: 'money' },
    ],
  },
]

type Idea = { t: string; d: string; diff: string; time: string; sc: (i: string[], p: string | null, g: string | null) => number }
const ideaPool: Idea[] = [
  { t: 'Your personal website', d: 'This is literally the first thing I built with Claude and what I recommend starting with. Upload your resume, drop some inspo screenshots, describe your vibe. Claude builds the whole thing in one chat.', diff: 'Easiest', time: '1-2 hours', sc: (_i, _p, g) => (g === 'website' ? 6 : g === 'learning' ? 4 : 2) },
  { t: 'Cold outreach email system', d: 'An automated system that finds leads, personalizes emails to each one, and sends them on a schedule. Set it up once and let it run while you sleep.', diff: 'Intermediate', time: '1-2 days', sc: (i, p, g) => (p === 'emails' || p === 'outreach' ? 3 : 0) + (i.includes('business') ? 2 : 0) + (g === 'automation' ? 2 : 0) },
  { t: 'Content caption generator agent', d: 'An agent that reads your video content and auto-writes captions, hashtags, and reply suggestions in your exact voice and style.', diff: 'Beginner', time: '2-3 hours', sc: (i, p) => (i.includes('content') ? 3 : 0) + (p === 'captions' ? 4 : 0) },
  { t: 'Proposal factory', d: 'Fill in a quick form about a client and Claude generates a full custom proposal with pricing, timeline, and your branding. You never start from scratch again.', diff: 'Intermediate', time: '1 day', sc: (i, p, g) => (i.includes('business') ? 2 : 0) + (g === 'plan' ? 4 : 0) + (p === 'outreach' ? 2 : 0) },
  { t: 'Real estate client follow-up agent', d: 'An agent that sends personalized check-ins to your leads on a schedule so no potential client ever falls through the cracks.', diff: 'Intermediate', time: '1-2 days', sc: (i, p) => (i.includes('realestate') ? 5 : 0) + (p === 'emails' || p === 'tracking' ? 2 : 0) },
  { t: 'TikTok analytics dashboard', d: "A custom dashboard that tracks your content performance and tells you exactly what to post based on what's actually working.", diff: 'Intermediate', time: '1 day', sc: (i, p) => (i.includes('content') ? 3 : 0) + (p === 'tracking' || p === 'research' ? 3 : 0) },
  { t: 'Lead research agent', d: 'Give it a target audience and it automatically finds and compiles leads from social media, Google, or industry directories using Apify.', diff: 'Intermediate', time: '1-2 days', sc: (i, p, g) => (i.includes('business') ? 2 : 0) + (p === 'research' || p === 'outreach' ? 4 : 0) + (g === 'automation' ? 2 : 0) },
  { t: 'Personal AI assistant', d: 'Set Claude up with everything about you: your preferences, your schedule, your goals. Use it as a personal advisor you actually talk to every day.', diff: 'Easiest', time: '1 hour', sc: (_i, p, g) => (g === 'learning' ? 5 : p === 'scheduling' ? 3 : 1) },
]

// ──────────────────────────────────────────────────────────
// GLOSSARY
// ──────────────────────────────────────────────────────────
const glossary = [
  { word: 'Terminal', def: 'A black text window on your Mac that runs commands on your computer. Looks scary, not actually scary. In Claude Code you barely need it.' },
  { word: 'HTML', def: 'A file that looks like a webpage but only lives on your computer. Double-click it and your browser opens it. It is NOT on the internet yet.' },
  { word: 'Deploy', def: 'Putting something live on the internet so other people can visit it. Vercel does this for you.' },
  { word: 'Homebrew', def: 'A tool you install on your Mac before everything else. Nobody can fully explain what it does under the hood. Just install it first and move on.' },
  { word: 'GitHub', def: 'Cloud storage specifically for code. Your project lives here so Vercel can find it and put it live.' },
  { word: 'Vercel', def: 'The service that makes your website live on the internet. Free for personal projects. This is what aylablumberg.com runs on.' },
  { word: 'Domain', def: "Your website's name, like yourname.com. Buy it on GoDaddy, then point it to Vercel." },
  { word: 'API Key', def: 'A private code that lets Claude connect to another app. Like a hotel key card. Keep it secret or someone else can use it as you.' },
  { word: 'Agent', def: 'Claude doing things automatically on a schedule, without you having to type anything. The advanced version of all this.' },
  { word: 'Cron Job', def: 'A scheduled task. Like setting an alarm that says "run this code every morning at 8am."' },
  { word: 'Claude Code', def: 'The version of Claude that actually builds and deploys things. Installs in VS Code. No Terminal needed.' },
  { word: 'Cowork', def: 'A desktop tool where Claude controls your computer for you. Like Claude having hands.' },
  { word: 'Project (Claude)', def: 'A folder in Claude that keeps related chats together with shared context. Use this to stay organized.' },
  { word: 'Context', def: "What Claude knows about your conversation. It only remembers what's in the current chat, which is why staying in the right one matters." },
  { word: 'Apify', def: 'A platform that scrapes data from the internet: TikTok comments, Instagram followers, Google Maps listings. Connects to Claude with an API key.' },
  { word: 'LLM', def: 'Large Language Model. The AI brain underneath Claude. Using one vs. building with one are very different things.' },
  { word: 'VS Code', def: 'A free code editor app. This is where Claude Code lives. You can download it at code.visualstudio.com.' },
]

// ──────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────
type Progress = {
  last_lesson: number
  bookmarks: number[]
  confused: number[]
  notes: Record<string, string>
  completed_at: string | null
}

const DEFAULT_PROGRESS: Progress = {
  last_lesson: 0,
  bookmarks: [],
  confused: [],
  notes: {},
  completed_at: null,
}

export default function CourseDashboard() {
  const [cur, setCur] = useState(0)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [qStep, setQStep] = useState(0)
  const [qAns, setQAns] = useState<(string[] | string | null)[]>([[], null, null, null])
  const [completion, setCompletion] = useState(false)
  const [progress, setProgress] = useState<Progress>(DEFAULT_PROGRESS)
  const [progressLoaded, setProgressLoaded] = useState(false)
  const [noteDraft, setNoteDraft] = useState('')
  const [noteSaved, setNoteSaved] = useState<'idle' | 'saving' | 'saved'>('idle')
  const rightRef = useRef<HTMLDivElement>(null)

  // Load progress once on mount, jump to last-visited lesson.
  useEffect(() => {
    let cancel = false
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((p: Progress) => {
        if (cancel) return
        setProgress({
          last_lesson: p.last_lesson ?? 0,
          bookmarks: p.bookmarks ?? [],
          confused: p.confused ?? [],
          notes: p.notes ?? {},
          completed_at: p.completed_at ?? null,
        })
        if (typeof p.last_lesson === 'number' && p.last_lesson > 0 && p.last_lesson < lessons.length) {
          setCur(p.last_lesson)
        }
        setProgressLoaded(true)
      })
      .catch(() => setProgressLoaded(true))
    return () => { cancel = true }
  }, [])

  // Persist last-visited lesson whenever it changes (after initial load).
  useEffect(() => {
    if (!progressLoaded) return
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ last_lesson: cur }),
    }).catch(() => {})
  }, [cur, progressLoaded])

  // Sync note draft when lesson changes.
  useEffect(() => {
    setNoteDraft(progress.notes[String(cur)] ?? '')
    setNoteSaved('idle')
  }, [cur, progress.notes])

  // Debounced save for note draft.
  useEffect(() => {
    if (!progressLoaded) return
    const existing = progress.notes[String(cur)] ?? ''
    if (noteDraft === existing) return
    setNoteSaved('saving')
    const t = setTimeout(async () => {
      try {
        const r = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ note: { index: cur, text: noteDraft } }),
        })
        const out = await r.json().catch(() => null)
        if (out?.notes) {
          setProgress((prev) => ({ ...prev, notes: out.notes }))
        }
        setNoteSaved('saved')
        setTimeout(() => setNoteSaved('idle'), 1200)
      } catch {
        setNoteSaved('idle')
      }
    }, 600)
    return () => clearTimeout(t)
  }, [noteDraft, cur, progressLoaded, progress.notes])

  const isBookmarked = progress.bookmarks.includes(cur)
  const isConfused = progress.confused.includes(cur)

  async function toggleBookmark() {
    const next = !isBookmarked
    setProgress((prev) => ({
      ...prev,
      bookmarks: next
        ? [...prev.bookmarks, cur].sort((a, b) => a - b)
        : prev.bookmarks.filter((b) => b !== cur),
    }))
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookmark: { index: cur, on: next } }),
    })
  }

  async function toggleConfused() {
    const next = !isConfused
    setProgress((prev) => ({
      ...prev,
      confused: next
        ? [...prev.confused, cur].sort((a, b) => a - b)
        : prev.confused.filter((b) => b !== cur),
    }))
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        confused: {
          index: cur,
          on: next,
          tag: lessons[cur]?.tag,
        },
      }),
    })
  }

  // Scroll to top on lesson change
  useEffect(() => {
    rightRef.current?.scrollTo({ top: 0 })
  }, [cur])

  // Delegate clicks for copy buttons + quiz trigger inside dangerouslySetInnerHTML lesson content
  useEffect(() => {
    const el = rightRef.current
    if (!el) return
    const onClick = (e: Event) => {
      const t = e.target as HTMLElement
      const copyBtn = t.closest('.copy-btn') as HTMLElement | null
      if (copyBtn) {
        const key = copyBtn.getAttribute('data-copy')
        const codeEl = el.querySelector(`.code-block[data-code="${key}"]`)
        const text = codeEl?.textContent?.trim() || ''
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.textContent = 'Copied!'
          setTimeout(() => { copyBtn.textContent = 'Copy' }, 2000)
        })
        return
      }
      const quizBtn = t.closest('[data-quiz]') as HTMLElement | null
      if (quizBtn) {
        openQuiz()
      }
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [cur])

  // Confetti on completion
  const confettiRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!completion) return
    const c = confettiRef.current
    if (!c) return
    c.width = window.innerWidth
    c.height = window.innerHeight
    const ctx = c.getContext('2d')!
    const cols = ['#E8295C', '#FFD6E3', '#FF8FAB', '#FFB3C6', '#1A1A1A', '#F7EEE7', '#FADADD']
    const ps = Array.from({ length: 130 }, () => ({
      x: Math.random() * c.width, y: -20,
      r: Math.random() * 6 + 3,
      col: cols[Math.floor(Math.random() * cols.length)],
      vx: (Math.random() - 0.5) * 3, vy: Math.random() * 4 + 1.5,
      rot: Math.random() * 360, rs: (Math.random() - 0.5) * 6,
      type: Math.random() > 0.5 ? 'c' : 'r',
    }))
    let raf = 0
    function draw() {
      ctx.clearRect(0, 0, c!.width, c!.height)
      let alive = false
      ps.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.rot += p.rs
        if (p.y < c!.height + 20) alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot * Math.PI / 180)
        ctx.fillStyle = p.col
        if (p.type === 'c') {
          ctx.beginPath()
          ctx.arc(0, 0, p.r, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r)
        }
        ctx.restore()
      })
      if (alive) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [completion])

  function openQuiz() {
    setQStep(0)
    setQAns([[], null, null, null])
    setQuizOpen(true)
  }

  function pickQ(step: number, v: string, multi: boolean) {
    setQAns(prev => {
      const next = [...prev]
      if (multi) {
        const arr = Array.isArray(next[step]) ? [...(next[step] as string[])] : []
        const idx = arr.indexOf(v)
        if (idx > -1) arr.splice(idx, 1)
        else if (arr.length < 3) arr.push(v)
        next[step] = arr
      } else {
        next[step] = v
      }
      return next
    })
  }

  function isQSel(step: number, v: string) {
    const a = qAns[step]
    return Array.isArray(a) ? a.includes(v) : a === v
  }

  function go(dir: number, direct?: number) {
    let next = direct !== undefined ? direct : cur + dir
    if (next < 0) next = 0
    if (next >= lessons.length) {
      setCompletion(true)
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      }).catch(() => {})
      return
    }
    setCur(next)
  }

  const l = lessons[cur]
  const progressPct = ((cur + 1) / lessons.length) * 100

  const interests = (Array.isArray(qAns[0]) ? qAns[0] : []) as string[]
  const pain = (typeof qAns[1] === 'string' ? qAns[1] : null) as string | null
  const goal = (typeof qAns[2] === 'string' ? qAns[2] : null) as string | null
  const resultRanks = ['Perfect for you', 'Great option', 'Worth considering']
  const resultTop = [...ideaPool].map(x => ({ ...x, s: x.sc(interests, pain, goal) })).sort((a, b) => b.s - a.s).slice(0, 3)

  return (
    <div className="course-root">
      <style jsx global>{`
        .course-root { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--dark); min-height: 100vh; overflow: hidden; }
        .progress-line { position: fixed; top: 0; left: 0; height: 2px; background: var(--pink); z-index: 101; transition: width 0.5s cubic-bezier(.4,0.2,1); }
        .top-nav { position: fixed; top: 0; left: 0; right: 0; height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; background: rgba(253,246,240,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); z-index: 100; }
        .course-brand { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; letter-spacing: 0.3px; color: var(--dark); }
        .course-brand span { color: var(--pink); }
        .progress-dots { display: flex; gap: 5px; align-items: center; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: transparent; border: 1.5px solid rgba(232,41,92,0.3); transition: all 0.3s ease; cursor: pointer; }
        .dot.done { background: var(--pink); border-color: var(--pink); }
        .dot.now { background: var(--pink); border-color: var(--pink); transform: scale(1.5); }
        .glossary-btn { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--pink); background: var(--pink-light); border: none; padding: 7px 16px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
        .glossary-btn:hover { background: var(--pink); color: white; }
        .top-links { display: flex; align-items: center; gap: 6px; }
        .top-link { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mid); padding: 7px 12px; border-radius: 20px; text-decoration: none; transition: all 0.2s; }
        .top-link:hover { color: var(--pink); background: var(--pink-light); }
        .dot.has-bookmark { box-shadow: 0 0 0 3px rgba(232,41,92,0.2); }
        .lesson-toolbar { display: flex; gap: 8px; margin-bottom: 28px; }
        .toolbar-btn { display: inline-flex; align-items: center; gap: 7px; background: white; border: 1px solid var(--border); color: var(--mid); padding: 8px 14px; border-radius: 20px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; cursor: pointer; transition: all 0.2s; }
        .toolbar-btn:hover { border-color: var(--pink); color: var(--pink); }
        .toolbar-btn.on { background: var(--pink); border-color: var(--pink); color: white; }
        .notes-pane { margin-top: 44px; background: white; border: 1px solid var(--border); border-radius: 14px; padding: 16px 18px; max-width: 600px; }
        .notes-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .notes-label { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--pink); }
        .notes-status { font-size: 10px; color: var(--light); letter-spacing: 1px; }
        .notes-status.s-saved { color: #4CAF50; }
        .notes-input { width: 100%; resize: vertical; border: none; outline: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.6; color: var(--dark); font-weight: 300; min-height: 90px; }
        .notes-input::placeholder { color: var(--light); font-style: italic; }
        .layout { display: flex; height: 100vh; padding-top: 56px; }
        .left { width: 37%; min-width: 300px; background: var(--left-bg); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: relative; overflow: hidden; }
        .left-inner { padding: 44px 36px; display: flex; flex-direction: column; height: 100%; }
        .l-tag { font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--pink); margin-bottom: 14px; }
        .l-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 400; line-height: 1.3; color: var(--dark); font-style: italic; margin-bottom: auto; }
        .l-num-bg { font-family: 'Cormorant Garamond', serif; font-size: 170px; font-weight: 300; color: rgba(232,41,92,0.065); line-height: 1; position: absolute; bottom: 60px; right: -15px; user-select: none; pointer-events: none; transition: all 0.4s; }
        .vid-wrap { margin-top: 32px; }
        .vid-box { background: rgba(232,41,92,0.05); border: 1.5px dashed rgba(232,41,92,0.22); border-radius: 14px; aspect-ratio: 16/9; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; }
        .vid-icon { width: 44px; height: 44px; background: var(--pink-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .vid-icon svg { width: 16px; height: 16px; fill: var(--pink); margin-left: 3px; }
        .vid-label { font-size: 11px; color: var(--light); text-align: center; padding: 0 16px; line-height: 1.4; }
        .right { flex: 1; overflow-y: auto; padding: 52px 60px 110px; }
        .right::-webkit-scrollbar { width: 3px; }
        .right::-webkit-scrollbar-thumb { background: rgba(232,41,92,0.2); border-radius: 2px; }
        .lesson-wrap { max-width: 600px; animation: courseSlideIn 0.4s cubic-bezier(.4,0.2,1); }
        @keyframes courseSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .l-head { font-family: 'Cormorant Garamond', serif; font-size: 46px; font-weight: 400; line-height: 1.1; color: var(--dark); margin-bottom: 10px; }
        .l-sub { font-size: 14px; color: var(--mid); font-weight: 300; margin-bottom: 36px; line-height: 1.5; }
        .l-body { font-size: 15.5px; line-height: 1.78; color: var(--dark); font-weight: 300; }
        .l-body p { margin-bottom: 18px; }
        .l-body strong { font-weight: 600; }
        .l-body em { font-style: italic; }
        .l-body ul.l-body ol { padding-left: 20px; margin: 14px 0; }
        .l-body li { margin-bottom: 9px; line-height: 1.65; }
        .callout { background: var(--pink-pale); border-left: 3px solid var(--pink); border-radius: 0 10px 10px 0; padding: 16px 20px; margin: 22px 0; font-size: 14.5px; line-height: 1.65; }
        .callout-tag { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--pink); margin-bottom: 7px; }
        .code-wrap { position: relative; margin: 22px 0; }
        .code-block { background: #181818; color: #E8E8E8; padding: 18px 20px; border-radius: 10px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.65; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
        .copy-btn { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.1); border: none; color: #888; font-size: 11px; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; letter-spacing: 0.5px; }
        .copy-btn:hover { background: rgba(255,255,255,0.22); color: white; }
        .chat-ex { margin: 20px 0; }
        .bubble { display: table; padding: 11px 16px; border-radius: 18px; font-size: 13.5px; line-height: 1.5; max-width: 82%; margin-bottom: 6px; word-break: break-word; }
        .bubble.u { background: var(--pink); color: white; border-bottom-right-radius: 4px; margin-left: auto; }
        .bubble.u.mad { background: #C0001F; font-weight: 500; }
        .bubble.c { background: #EFEFEF; color: var(--dark); border-bottom-left-radius: 4px; }
        .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 24px 0; }
        .stat-card { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 18px; text-align: center; }
        .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 600; color: var(--pink); line-height: 1; margin-bottom: 6px; }
        .stat-lab { font-size: 12px; color: var(--mid); line-height: 1.4; }
        .a-quote { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-style: italic; font-weight: 400; color: var(--dark); line-height: 1.5; border-left: 3px solid var(--pink); padding: 12px 20px; margin: 26px 0; }
        .divider { display: flex; align-items: center; gap: 14px; margin: 28px 0; }
        .divider::before.divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .divider span { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--light); }
        .steps { list-style: none; padding: 0; counter-reset: s; }
        .steps li { counter-increment: s; display: flex; gap: 14px; margin-bottom: 22px; align-items: flex-start; }
        .steps li::before { content: counter(s); min-width: 26px; height: 26px; background: var(--pink); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; margin-top: 2px; }
        .ss { background: #F0ECEC; border: 1px dashed #D0CCCC; border-radius: 10px; height: 180px; display: flex; align-items: center; justify-content: center; margin: 22px 0; font-size: 11px; color: #BBBBBB; letter-spacing: 1.5px; text-transform: uppercase; }
        .quiz-btn { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #E8295C, #FF6B9D); color: white; border: none; padding: 15px 30px; border-radius: 40px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.3s; box-shadow: 0 4px 20px rgba(232,41,92,0.3); margin: 22px 0; }
        .quiz-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(232,41,92,0.4); }
        .badge { display: inline-block; background: var(--pink-light); color: var(--pink); font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; margin-bottom: 22px; }
        .bot-nav { position: fixed; bottom: 0; left: 37%; right: 0; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 60px; background: rgba(253,246,240,0.96); backdrop-filter: blur(12px); border-top: 1px solid var(--border); z-index: 100; }
        .nav-btn { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; padding: 10px 26px; border-radius: 24px; border: 1.5px solid; cursor: pointer; transition: all 0.2s; background: transparent; }
        .nav-btn.prev { border-color: rgba(232,41,92,0.25); color: var(--mid); }
        .nav-btn.prev:hover:not(:disabled) { border-color: var(--pink); color: var(--pink); }
        .nav-btn.next { background: var(--pink); border-color: var(--pink); color: white; }
        .nav-btn.next:hover { background: #C51F4E; }
        .nav-btn:disabled { opacity: 0.28; cursor: not-allowed; pointer-events: none; }
        .nav-cnt { font-size: 11px; color: var(--light); letter-spacing: 1px; }
        .g-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.28); z-index: 200; opacity: 0; visibility: hidden; transition: all 0.3s; }
        .g-overlay.open { opacity: 1; visibility: visible; }
        .g-panel { position: absolute; top: 0; right: 0; bottom: 0; width: 370px; background: var(--cream); box-shadow: -8px 0 40px rgba(0,0,0,0.08); transform: translateX(100%); transition: transform 0.35s cubic-bezier(.4,0.2,1); overflow-y: auto; padding: 44px 36px; }
        .g-overlay.open .g-panel { transform: translateX(0); }
        .g-close { position: absolute; top: 18px; right: 18px; width: 30px; height: 30px; border: none; background: var(--pink-light); border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; color: var(--pink); transition: all 0.2s; line-height: 1; }
        .g-close:hover { background: var(--pink); color: white; }
        .g-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 400; font-style: italic; margin-bottom: 28px; }
        .g-term { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
        .g-term:last-child { border-bottom: none; }
        .g-word { font-weight: 600; font-size: 14px; color: var(--pink); margin-bottom: 3px; }
        .g-def { font-size: 13.5px; color: var(--mid); line-height: 1.6; font-weight: 300; }
        .q-overlay { position: fixed; inset: 0; background: var(--cream); z-index: 300; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s; }
        .q-overlay.open { opacity: 1; visibility: visible; }
        .q-inner { max-width: 540px; width: 90%; text-align: center; }
        .q-num { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--pink); margin-bottom: 18px; }
        .q-question { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 400; line-height: 1.2; color: var(--dark); margin-bottom: 10px; }
        .q-hint { font-size: 12px; color: var(--light); margin-bottom: 22px; }
        .q-opts { display: flex; flex-wrap: wrap; gap: 9px; justify-content: center; margin-bottom: 28px; }
        .q-opt { background: white; border: 1.5px solid var(--border); border-radius: 40px; padding: 9px 18px; font-size: 13.5px; color: var(--dark); cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; font-weight: 400; }
        .q-opt:hover { border-color: var(--pink); color: var(--pink); }
        .q-opt.sel { background: var(--pink); border-color: var(--pink); color: white; }
        .q-go { background: var(--pink); color: white; border: none; padding: 13px 38px; border-radius: 40px; font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
        .q-go:hover { background: #C51F4E; }
        .q-back { background: transparent; border: none; color: var(--light); font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; margin-top: 14px; display: block; margin-inline: auto; }
        .q-close { position: fixed; top: 22px; right: 22px; background: var(--pink-light); border: none; border-radius: 50%; width: 38px; height: 38px; cursor: pointer; font-size: 17px; color: var(--pink); display: flex; align-items: center; justify-content: center; transition: all 0.2s; line-height: 1; z-index: 301; }
        .q-close:hover { background: var(--pink); color: white; }
        .idea-cards { display: flex; flex-direction: column; gap: 14px; text-align: left; margin-bottom: 24px; }
        .idea-card { background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 18px 22px; transition: all 0.2s; }
        .idea-card:hover { border-color: var(--pink); box-shadow: 0 4px 18px rgba(232,41,92,0.1); }
        .idea-rank { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--pink); margin-bottom: 5px; }
        .idea-title { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-weight: 500; color: var(--dark); margin-bottom: 5px; }
        .idea-desc { font-size: 13px; color: var(--mid); line-height: 1.6; font-weight: 300; }
        .idea-meta { display: flex; gap: 8px; margin-top: 9px; }
        .idea-pill { font-size: 10px; padding: 3px 9px; background: var(--pink-pale); color: var(--pink); border-radius: 20px; }
        .comp { position: fixed; inset: 0; background: var(--cream); z-index: 400; display: flex; align-items: center; justify-content: center; flex-direction: column; opacity: 0; visibility: hidden; transition: all 0.5s; }
        .comp.open { opacity: 1; visibility: visible; }
        .comp-title { font-family: 'Cormorant Garamond', serif; font-size: 76px; font-weight: 300; font-style: italic; color: var(--dark); margin-bottom: 14px; text-align: center; }
        .comp-sub { font-size: 16px; color: var(--mid); margin-bottom: 36px; font-weight: 300; text-align: center; }
        .comp-btn { background: var(--pink); color: white; border: none; padding: 14px 40px; border-radius: 40px; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s; }
        .comp-btn:hover { background: #C51F4E; }
        #cc { position: fixed; inset: 0; pointer-events: none; z-index: 399; }
        @media (max-width: 800px) {
          .layout { flex-direction: column; }
          .left { width: 100%; min-width: unset; height: auto; }
          .left-inner { padding: 20px 22px; flex-direction: row; align-items: center; gap: 14px; }
          .l-num-bg.vid-wrap { display: none; }
          .l-title { font-size: 17px; margin-bottom: 0; }
          .l-tag { margin-bottom: 4px; }
          .right { padding: 28px 22px 100px; }
          .l-head { font-size: 30px; }
          .bot-nav { left: 0; padding: 0 22px; }
          .top-nav { padding: 0 18px; }
          .g-panel { width: 92vw; }
        }
      `}</style>

      <div className="progress-line" style={{ width: `${progressPct}%` }} />

      <nav className="top-nav">
        <div className="course-brand">Ayla <span>Unlocked</span></div>
        <div className="progress-dots">
          {lessons.map((les, i) => (
            <div
              key={i}
              className={`dot${i === cur ? ' now' : i < cur ? ' done' : ''}${progress.bookmarks.includes(i) ? ' has-bookmark' : ''}`}
              onClick={() => go(0, i)}
              title={les.tag + (progress.bookmarks.includes(i) ? ' ★' : '')}
            />
          ))}
        </div>
        <div className="top-links">
          <a className="top-link" href="/course/prompts">Prompts</a>
          <a className="top-link" href="/course/real-chats">Chats</a>
          <a className="top-link" href="/course/notes">Notes</a>
          <button className="glossary-btn" onClick={() => setGlossaryOpen(true)}>Glossary</button>
        </div>
      </nav>

      <div className="layout">
        <div className="left">
          <div className="left-inner">
            <div className="l-tag">{l.tag}</div>
            <div className="l-title">{l.leftTitle}</div>
            <div className="vid-wrap">
              <div className="vid-box">
                <div className="vid-icon">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div className="vid-label">{l.vid}</div>
              </div>
            </div>
          </div>
          <div className="l-num-bg">{l.num}</div>
        </div>
        <div className="right" ref={rightRef}>
          <div className="lesson-toolbar">
            <button
              className={`toolbar-btn ${isBookmarked ? 'on' : ''}`}
              onClick={toggleBookmark}
              title={isBookmarked ? 'Bookmarked, click to remove' : 'Bookmark this lesson'}
              aria-label="Bookmark"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M12 17.3L5.8 21l1.6-7.3L2 8.8l7.4-.6L12 1.5l2.6 6.7 7.4.6-5.4 4.9L18.2 21 12 17.3z"
                  fill={isBookmarked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
            <button
              className={`toolbar-btn ${isConfused ? 'on' : ''}`}
              onClick={toggleConfused}
              title={isConfused ? "Flagged as confusing, click to un-flag" : "This part's confusing? Flag it for Ayla"}
              aria-label="Confused"
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <circle cx="12" cy="12" r="9.5" fill={isConfused ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 9.5a3 3 0 1 1 4.5 2.6c-1 .5-1.5 1-1.5 2V15" stroke={isConfused ? 'white' : 'currentColor'} strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="17.5" r="1" fill={isConfused ? 'white' : 'currentColor'} />
              </svg>
              <span>{isConfused ? 'Flagged' : 'Confusing?'}</span>
            </button>
          </div>
          <div className="lesson-wrap" key={cur} dangerouslySetInnerHTML={{ __html: l.html }} />
          <div className="notes-pane">
            <div className="notes-head">
              <span className="notes-label">Your notes on this lesson</span>
              <span className={`notes-status s-${noteSaved}`}>
                {noteSaved === 'saving' ? 'saving…' : noteSaved === 'saved' ? 'saved' : ''}
              </span>
            </div>
            <textarea
              className="notes-input"
              placeholder="Jot something down, ideas, questions, things you want to try..."
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="bot-nav">
        <button className="nav-btn prev" disabled={cur === 0} onClick={() => go(-1)}>Previous</button>
        <div className="nav-cnt">{cur + 1} / {lessons.length}</div>
        <button className="nav-btn next" onClick={() => go(1)}>{cur === lessons.length - 1 ? 'Finish' : 'Next'}</button>
      </div>

      {/* GLOSSARY */}
      <div
        className={`g-overlay${glossaryOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setGlossaryOpen(false) }}
      >
        <div className="g-panel">
          <button className="g-close" onClick={() => setGlossaryOpen(false)}>&times;</button>
          <h2 className="g-title">The Dictionary</h2>
          {glossary.map((g, i) => (
            <div key={i} className="g-term">
              <div className="g-word">{g.word}</div>
              <div className="g-def">{g.def}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUIZ */}
      <div className={`q-overlay${quizOpen ? ' open' : ''}`}>
        <button className="q-close" onClick={() => setQuizOpen(false)}>&times;</button>
        <div className="q-inner">
          {qStep < quizSteps.length ? (
            <div>
              <div className="q-num">{qStep + 1} of {quizSteps.length}</div>
              <div className="q-question">{quizSteps[qStep].q}</div>
              {quizSteps[qStep].hint && <div className="q-hint">{quizSteps[qStep].hint}</div>}
              <div className="q-opts">
                {quizSteps[qStep].opts.map((o) => (
                  <button
                    key={o.v}
                    className={`q-opt${isQSel(qStep, o.v) ? ' sel' : ''}`}
                    onClick={() => pickQ(qStep, o.v, quizSteps[qStep].multi)}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              <button className="q-go" onClick={() => setQStep(qStep + 1)}>
                {qStep === quizSteps.length - 1 ? 'See my ideas' : 'Next'}
              </button>
              {qStep > 0 && <button className="q-back" onClick={() => setQStep(qStep - 1)}>Go back</button>}
            </div>
          ) : (
            <div>
              <div className="q-num">Your results</div>
              <div className="q-question" style={{ fontSize: '28px', marginBottom: '24px' }}>Here&apos;s where to start.</div>
              <div className="idea-cards">
                {resultTop.map((x, i) => (
                  <div key={i} className="idea-card">
                    <div className="idea-rank">{resultRanks[i]}</div>
                    <div className="idea-title">{x.t}</div>
                    <div className="idea-desc">{x.d}</div>
                    <div className="idea-meta">
                      <span className="idea-pill">{x.diff}</span>
                      <span className="idea-pill">{x.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="q-go" onClick={() => setQuizOpen(false)}>Got it, back to the course</button>
            </div>
          )}
        </div>
      </div>

      {/* COMPLETION */}
      <div className={`comp${completion ? ' open' : ''}`}>
        <canvas id="cc" ref={confettiRef} />
        <CompletionPanel
          savedName={progress.notes['_cert_name'] ?? ''}
          onRestart={() => { setCompletion(false); setCur(0) }}
        />
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────
// CompletionPanel — final screen with name input + Complete Course button.
// Calls POST /api/certificate to email the student their cert.
// ──────────────────────────────────────────────────────────
function CompletionPanel({
  savedName,
  onRestart,
}: {
  savedName: string
  onRestart: () => void
}) {
  const [name, setName] = useState(savedName)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [certUrl, setCertUrl] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function complete() {
    const n = name.trim()
    if (!n) {
      setErr('Drop your name so we can put it on your certificate.')
      return
    }
    setErr(null)
    setStatus('sending')
    try {
      const r = await fetch('/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n }),
      })
      const out = await r.json()
      if (!r.ok) throw new Error(out?.error || 'Something went wrong.')
      setCertUrl(out.viewUrl)
      setStatus('done')
    } catch (e: any) {
      setErr(e?.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <div style={{ position: 'relative', zIndex: 401, textAlign: 'center', padding: '0 20px', maxWidth: 560 }}>
      <div style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--pink)', marginBottom: '14px' }}>
        You did it.
      </div>
      {status !== 'done' ? (
        <>
          <div className="comp-title">What? Like it&apos;s hard?</div>
          <div className="comp-sub">
            Drop your name and we&apos;ll mint your certificate right now. You&apos;ll get it emailed,
            plus you can download it as a PDF from the next screen.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 20 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="The name you want on your certificate"
              maxLength={60}
              style={{
                width: '100%',
                maxWidth: 400,
                padding: '14px 20px',
                borderRadius: 999,
                border: '1.5px solid rgba(232,41,92,0.25)',
                background: 'white',
                fontFamily: 'inherit',
                fontSize: 15,
                textAlign: 'center',
                outline: 'none',
              }}
            />
            {err && <div style={{ color: 'var(--pink)', fontSize: 12 }}>{err}</div>}
            <button
              className="magnetic comp-btn"
              onClick={complete}
              disabled={status === 'sending'}
              style={{ opacity: status === 'sending' ? 0.6 : 1 }}
            >
              {status === 'sending' ? 'Minting your certificate…' : 'Complete Course'}
            </button>
            <button
              onClick={onRestart}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--light)',
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginTop: 6,
                cursor: 'pointer',
              }}
            >
              Or start from the beginning again
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="comp-title">Congrats, legend.</div>
          <div className="comp-sub">
            Certificate generated. Check your email, or open and download the PDF below.
            Screenshot it. Post it. Go build something.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginTop: 20 }}>
            {certUrl && (
              <a className="magnetic comp-btn" href={certUrl} style={{ display: 'inline-block', textDecoration: 'none' }}>
                Open my certificate &amp; download PDF &rarr;
              </a>
            )}
            <p style={{ fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--pink)', marginTop: 14 }}>
              Check your inbox (and spam) &middot; arrives within a minute
            </p>
            <button
              onClick={onRestart}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--light)',
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginTop: 6,
                cursor: 'pointer',
              }}
            >
              Back to the course
            </button>
          </div>
        </>
      )}
    </div>
  )
}
