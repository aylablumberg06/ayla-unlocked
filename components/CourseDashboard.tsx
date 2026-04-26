'use client'

import { useEffect, useRef, useState } from 'react'
import { PROFANITY_REGEX } from '@/lib/censor'
import BrandLogo from '@/components/BrandLogo'
import VideoPlayer from '@/components/VideoPlayer'

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
 <p>This course is for the person who keeps seeing AI stuff online and thinking: <em>this looks insane, I don't know where to start, and every explanation feels like it's made for someone who already knows what they're doing.</em> Let&rsquo;s go.</p>
 <div class="callout"><div class="callout-tag">What you'll be able to do after this</div>Build websites, automate repetitive tasks, generate content, create business plans, and make things that run on their own while you sleep. All just by talking. No code required.</div>
 <figure class="lesson-photo">
 <img src="/lesson-welcome-hero.jpg" alt="A dashboard I built where my agents are working on a project in real time" />
 <figcaption>My agents working on a project. <strong>An example of what you&rsquo;ll be able to build by the end of the course.</strong></figcaption>
 </figure>

 <hr class="l-divider" />

 <h2 class="l-sub-head">How this course actually works.</h2>
 <p>Before we jump in, a 60 second walkthrough of how I built this so you actually know how to use it. I'd rather spend a minute now than have you miss half of what's here.</p>

 <div class="how-it-works">
 <div class="how-step">
 <div class="how-step-n">01</div>
 <div class="how-step-body">
 <h3>Every lesson has a video.</h3>
 <p>Press play at the top. It's me, talking at you the way I'd talk at a friend. Watch it on 1.5x if I'm yapping too slow, I won't be offended.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">02</div>
 <div class="how-step-body">
 <h3>Every lesson has text too.</h3>
 <p>Exactly what's in the video, but written. So you can skim, re-read, or copy something without scrubbing back through the video. If you're a reader instead of a watcher, it's all here.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">03</div>
 <div class="how-step-body">
 <h3>You can highlight anything.</h3>
 <p>Drag your cursor across any sentence that hits you. It'll save. Your highlights live in <strong>Notes</strong> so you can pull them up later. This works the same way highlighting does in a Kindle book.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">04</div>
 <div class="how-step-body">
 <h3>Press <kbd>⌘ K</kbd> anywhere to search.</h3>
 <p>Forgot which lesson I talked about Stripe? Press Command-K (or Control-K on Windows), type "stripe," and jump there. It searches every lesson title and every section. Faster than scrolling.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">05</div>
 <div class="how-step-body">
 <h3>Three tabs in the nav bar you'll actually use.</h3>
 <p><strong>Prompts</strong> → my library of prompts I actually paste into Claude. Copy them, paste them, edit them. These took me a month to figure out.<br>
 <strong>My Chats</strong> → real conversations I've had with Claude. Watch how I actually talk to it, word for word, when I'm building stuff. Nothing edited for the camera.<br>
 <strong>Ask Ayla</strong> → a little widget in the corner if you get stuck on a lesson. It can answer questions about the course.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">06</div>
 <div class="how-step-body">
 <h3>Save a lesson with the <span class="how-icon"><svg viewBox="0 0 24 24" width="12" height="12"><g transform="translate(0,0.75)"><path d="M12 17.3L5.8 21l1.6-7.3L2 8.8l7.4-.6L12 1.5l2.6 6.7 7.4.6-5.4 4.9L18.2 21 12 17.3z" fill="currentColor"/></g></svg></span> button.</h3>
 <p>Top of every lesson you&rsquo;ll see a star. Tap it to save the lesson to your Notes tab. Useful when you know you&rsquo;ll need it again at 2am.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">07</div>
 <div class="how-step-body">
 <h3>Flag confusing parts with the <span class="how-icon"><svg viewBox="0 0 24 24" width="12" height="12"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9.2 9.5 a2.8 2.8 0 1 1 4.4 2.3 c-1 .55 -1.6 1.05 -1.6 2.3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="17.2" r="1.2" fill="currentColor"/></svg></span> button.</h3>
 <p>If a lesson loses you, hit the question-mark button. It tells me, I rewrite that lesson. This course gets better because you told me when it wasn&rsquo;t working.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">08</div>
 <div class="how-step-body">
 <h3>Certificate at the end.</h3>
 <p>Finish all the lessons and you get a real certificate you can screenshot, print, post, put on LinkedIn. Yes, I'm serious. You earned it.</p>
 </div>
 </div>
 </div>

 <div class="callout"><div class="callout-tag">One more thing</div>This course is meant to be <em>multi-modal</em>. That's a fancy way of saying: you can watch, read, highlight, try things, ask questions, and post about what you're building, all in here. Not every lesson works the same way for every brain. That's the point.</div>

 <div class="callout"><div class="callout-tag">Take breaks whenever you want</div>For real, close this tab mid-lesson if you need to. Go get coffee. Come back tomorrow. We&rsquo;ll drop you right where you left off. It&rsquo;s not like I can see where you&rsquo;re at and judge you&hellip; <br><br><em>Actually. I can. I have a dashboard where I can see exactly what lesson everyone&rsquo;s on. But don&rsquo;t let me judge you. Take the break. Go.</em></div>
 </div>`
 },
 {
 tag: '01 - What Claude Is', leftTitle: 'Before we start. What even is this thing.', num: '01', vid: 'Lesson 01: What Claude actually is',
 html: `
 <h1 class="l-head">Okay. So what even is Claude?</h1>
 <p class="l-sub">Let's actually understand what you're about to use.</p>
 <div class="l-body">
 <div class="tools-strip">
 <span class="tools-strip-label">In this lesson</span>
 <a class="tool-pill" href="https://claude.ai" target="_blank" rel="noopener noreferrer"><img src="/brands/claude.svg" alt="" />Claude</a>
 <a class="tool-pill" href="https://anthropic.com" target="_blank" rel="noopener noreferrer"><img src="/brands/anthropic.svg" alt="" />Anthropic</a>
 <a class="tool-pill" href="https://chatgpt.com" target="_blank" rel="noopener noreferrer"><img src="/brands/openai.svg" alt="" />ChatGPT</a>
 <a class="tool-pill" href="https://gemini.google.com" target="_blank" rel="noopener noreferrer"><img src="/brands/googlegemini.svg" alt="" />Gemini</a>
 </div>
 <p>Claude is an AI made by a company called <a href="https://anthropic.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>Anthropic</strong></a>. Anthropic is based in San Francisco and was started by a group of people who used to work at OpenAI (the company that makes ChatGPT). They left to make something they thought was safer and more useful. That's the short version.</p>
 <p>Underneath, Claude is what's called an <strong>LLM</strong>, a Large Language Model. Which sounds scary but just means: it's a program that reads basically the entire internet, and now it can predict what words should come next in any conversation. That's it. That's the whole magic.</p>
 <p>When you talk to Claude, you're not searching a database. You're talking to something that learned how to think in language by reading millions of books, articles, code files, conversations, and websites. That's why it can write, code, analyze, summarize, plan, debate, and explain things all in the same chat.</p>
 <div class="callout"><div class="callout-tag">Claude vs. ChatGPT vs. Gemini</div>Claude (Anthropic), ChatGPT (OpenAI), and Gemini (Google) are all LLMs. They do similar things. I use Claude because it's the best for actually building. It writes better code, follows instructions more carefully, and gets into fewer weird spirals. Other people swear by ChatGPT. I used to be diehard ChatGPT, then I learned about Claude and BROKE UP with Chat and switched sides. Honestly, the exact model matters less than learning how to direct any of them well. This course teaches you with Claude because that's what I use every day.</div>
 <p>Anthropic publishes something called a "Constitution" for Claude, basically a list of principles it's trained to follow. Things like: be honest, be helpful, don't help people hurt themselves or others. It's why Claude will sometimes push back on you or ask if you're sure. That's intentional. You're not just using software, you're working with something that has guardrails.</p>
 <p>One more thing to know: <strong>Claude doesn't remember you between chats.</strong> Every time you start a new conversation, it's starting from scratch. We'll get into how to work around that later. Just know that going in.</p>
 <div class="a-quote">"It learned how language works by reading more than any human ever could. Now it can do anything you can describe in words."</div>
 <div class="exercise" data-exercise-id="ex-01a-meet">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now · 2 min
 </div>
 <div class="exercise-title">Go say hi.</div>
 <div class="exercise-body">Open <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>claude.ai</strong></a> in a new tab. In the message box, type anything. <em>Anything</em>. Ask it how its day is. Ask it to describe itself. Ask it what you should wear today. <br><br>Point: feel how it answers you. That vibe is what you&rsquo;ll be riding for the next few hours.</div>
 <button class="exercise-done" data-exercise-id="ex-01a-meet">I did it →</button>
 </div>
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
 <div class="exercise" data-exercise-id="ex-02a-upload">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now · 3 min
 </div>
 <div class="exercise-title">Throw a random file at it.</div>
 <div class="exercise-body">Grab something off your desktop. A screenshot, a PDF, a spreadsheet, your resume, whatever. Drag it into Claude and type:<div class="q">What is this, what can I do with it, and what would you build from it?</div>Read what Claude says. Notice how it didn&rsquo;t need instructions. It just&hellip; got it.</div>
 <button class="exercise-done" data-exercise-id="ex-02a-upload">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '03 - The Mindset', leftTitle: 'Think of Claude like a really smart friend who can do anything.', num: '03', vid: 'Lesson 03: How to think about Claude',
 html: `
 <h1 class="l-head">Claude is not Google.</h1>
 <p class="l-sub">This is a fundamentally different thing and it matters that you understand why.</p>
 <div class="l-body">
 <p>You&rsquo;re probably treating Claude like a search engine right now. Quick question in, quick answer out, close the tab. That&rsquo;s the wrong frame entirely.</p>
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
 <p>The gap between those two groups is huge, and it grows every week. Chatbot users get help with one task at a time. Builders create things that work for them on autopilot, forever. One is asking a really smart friend for advice. The other is putting that friend on payroll and letting them run the business.</p>
 <p>Most people will spend the next decade in the chatbot group and won&rsquo;t even realize there was another option. They&rsquo;ll use AI to write slightly better emails and feel productive, while a much smaller group quietly builds entire products, businesses, and systems on top of the exact same tools. That gap is the single biggest opportunity of our generation, and it&rsquo;s wide open right now because barely anyone has noticed yet.</p>
 <div class="callout"><div class="callout-tag">Two very different uses</div><strong>Chatbot users:</strong> ask a question, copy the answer, move on. Use AI a couple times a day. Treat it like Google with better grammar.<br><br><strong>Builders:</strong> describe the thing they want to exist, watch Claude make it, ship it, and let it run. Use AI like infrastructure. Treat it like a team they direct.</div>
 <div class="stat-grid">
 <div class="stat-card"><div class="stat-num">0.4%</div><div class="stat-lab">of Americans use AI to the capability of actually coding or building anything</div></div>
 <div class="stat-card"><div class="stat-num">22%</div><div class="stat-lab">of AI professionals globally are women (World Economic Forum)</div></div>
 <div class="stat-card"><div class="stat-num">12%</div><div class="stat-lab">of machine learning researchers are women (MIT)</div></div>
 <div class="stat-card"><div class="stat-num">26%</div><div class="stat-lab">of the computing workforce is female, despite women being nearly half the overall workforce</div></div>
 </div>
 <p>These numbers matter because the people who know how to build with AI are going to run things for the next decade. Right now that group is small, and it skews heavily toward people who already came from tech. The loudest faces in AI on Twitter, LinkedIn, and on stage are not random, they&rsquo;re the people who got here first.</p>
 <p>This is exactly why right now is the moment for everyone else to show up, and especially women. Not because anyone needs to be pushed out, but because the room is still being built and we should be in it from the start. The next era of business, art, automation, and everyday tools is going to be defined by the people who can talk to AI and build with it. If only one demographic is in that room, the things that get built will only solve that demographic&rsquo;s problems. We need new voices, new perspectives, and new use cases at the table.</p>
 <p>This isn&rsquo;t about becoming a coder. It&rsquo;s about becoming the person who knows how to use the most powerful tool that exists right now, before everyone else figures it out. I&rsquo;m 19 and I figured it out in a month with zero background. You absolutely can too. Every person who learns to build narrows the gap on both sides, more builders, and a wider mix of who&rsquo;s building.</p>
 <div class="callout"><div class="callout-tag">Why now specifically</div>The job market is shifting fast. Marketing, PR, content, admin roles are being automated. But people who know how to direct AI and build with it? They're getting hired, starting businesses, and making real money. The window to get ahead is open right now. You're reading this course because you already sense that.</div>
 </div>`
 },
 {
 tag: '05 - Imposter Syndrome', leftTitle: "You're not behind. Nobody is.", num: '05', vid: 'Lesson 05: The imposter thing',
 html: `
 <h1 class="l-head">Nobody actually knows what they&rsquo;re doing.</h1>
 <p class="l-sub">Real talk from somebody who taught herself.</p>
 <div class="l-body">
 <p>I need to say this because I think about it a lot. And I see a lot of people, especially people who weren&rsquo;t already &ldquo;in tech,&rdquo; hang back because of it.</p>

 <p><strong>You&rsquo;re not behind.</strong> Not on anything. The honest truth is that <em>everybody in AI is lost right now.</em> The tools change every day. What counted as expertise six months ago is outdated. The people on Twitter calling themselves &ldquo;AI experts&rdquo; are mostly just louder, not smarter.</p>

 <p>I built two businesses inside of a few months. I&rsquo;m nineteen. I had no background. What I had was <strong>a willingness to look stupid in public for long enough to stop being stupid.</strong> That is the whole skill.</p>

 <div class="a-quote">&ldquo;If you&rsquo;re feeling imposter-y, that means you&rsquo;re in new territory. It&rsquo;s a signal you&rsquo;re learning. Not a signal you should stop.&rdquo;</div>

 <p>A few reframes that helped me:</p>

 <ul>
 <li><strong>&ldquo;I don&rsquo;t know the vocab&rdquo;</strong>, fine. Use different words. The concepts matter, not the jargon. Most of it is a gatekeeping scam anyway.</li>
 <li><strong>&ldquo;I&rsquo;ll look dumb if I ask&rdquo;</strong>, you look dumber when you pretend. Ask Claude the &ldquo;dumb&rdquo; question. It won&rsquo;t judge. And after a while you&rsquo;ll stop asking because you&rsquo;ll actually know.</li>
 <li><strong>&ldquo;Other people are further along&rdquo;</strong>, the only comparison that matters is you vs. you a month ago. Everybody&rsquo;s chart starts flat. Mine did.</li>
 <li><strong>&ldquo;What if I sell something and it breaks&rdquo;</strong>, charge less at first. Overdeliver. Fix it when it breaks. This is how every business in history has worked.</li>
 </ul>

 <p>The people who make it are the ones who just keep building through the feeling. <strong>You&rsquo;re not behind. Go build the thing.</strong></p>
 </div>`
 },
 {
 tag: '06 - Setup', leftTitle: 'Getting you set up takes about 5 minutes.', num: '06', vid: 'Lesson 06: Setup walkthrough',
 html: `
 <h1 class="l-head">Let's get you set up.</h1>
 <p class="l-sub">Three steps. That's all.</p>
 <div class="l-body">
 <ol class="steps">
 <li><div><strong>Go to <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="brand-link">claude.ai</a> in Chrome and download the desktop app.</strong> When it asks you to drag the Claude icon into another icon, do it. Open the app. Log in with Google. You're in.</div></li>
 <li><div><strong>Start on the free plan.</strong> Completely fine for learning. You'll know when you hit your limit because Claude tells you directly. When you're actually building real things for people, the paid plan ($20/month) is worth it. You get way more messages and better features.</div></li>
 <li><div><strong>Know that Cowork exists, for later.</strong> Cowork is a separate desktop tool where Claude can literally control your computer, click through apps, open files, and do things for you. I don't personally use Cowork yet, but it's a powerful option once you're comfortable with the basics.</div></li>
 </ol>
 <div class="callout"><div class="callout-tag">If anything is confusing</div>You can send Claude a screenshot of whatever you're looking at and say "I don't understand this, explain it more simply." You can also just say "explain this like I'm in 8th grade" at any point and it will. Claude does not judge you for not knowing things. It just helps.</div>
 <div class="exercise" data-exercise-id="ex-05a-download">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do this now · 3 min
 </div>
 <div class="exercise-title">Download Claude. For real.</div>
 <div class="exercise-body">Go to <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>claude.ai</strong></a> in Chrome. Click the <strong>Download desktop app</strong> link at the top. Drag Claude into your Applications folder. Sign in with Google. Pin it to your dock. <br><br>That&rsquo;s it. Everything after this assumes you&rsquo;ve got the app open.</div>
 <button class="exercise-done" data-exercise-id="ex-05a-download">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '07 - Pricing Tiers', leftTitle: 'Free vs. Pro vs. Max. What to actually pay for.', num: '07', vid: 'Lesson 07: Which Claude plan to pick',
 html: `
 <h1 class="l-head">Free vs. Pro vs. Max. What to actually pay for.</h1>
 <p class="l-sub">Short version: start free. Upgrade only when you actually need to.</p>
 <div class="l-body">
 <p>Claude has three tiers. Free, Pro, and Max. The price jumps are real, so you should know which one fits where you are right now. Don&rsquo;t prepay for something you&rsquo;re not using yet.</p>

 <div class="callout"><div class="callout-tag">Free, $0/month</div>Totally fine for learning, brainstorming, writing, and light coding. You get a solid daily message limit and access to the current Claude model. When you hit the limit, Claude literally tells you and waits a few hours to reset. <strong>Start here.</strong> It&rsquo;s perfect for this course.</div>

 <div class="callout"><div class="callout-tag">Pro, $20/month</div>Roughly 5x the message limit. Upload more files at once. Access to the newest model first. The moment you&rsquo;re building a real thing and getting cut off mid-project is the moment Pro is worth it. If you&rsquo;re actively working on something for more than 2 hours a day, upgrade.</div>

 <div class="callout"><div class="callout-tag">Max, $100&ndash;200/month</div>The &ldquo;I&rsquo;m running this as my job&rdquo; tier. Effectively unlimited. Priority access when servers are slammed. <strong>This is what I personally pay for, $100/month.</strong> Only jump here if you&rsquo;re building every day, running client work, or operating agents at volume. If you&rsquo;re a one-person agency or doing cold outreach daily, Max pays for itself in an afternoon.</div>

 <div class="a-quote">&ldquo;Start free. You&rsquo;ll know when you need Pro because Claude will literally cut you off mid-thought. That&rsquo;s the signal.&rdquo;</div>

 <p><strong>My actual progression.</strong> I was on Free for like two days. Hit the limit constantly. Upgraded to Pro and stayed there for two weeks. Once I was using it for client work every day, jumped to Max.</p>

 <div class="callout"><div class="callout-tag">The rule of thumb</div>Hit rate limits more than twice a week? Upgrade one tier. Hit them daily? Jump again. Never hit them? You&rsquo;re on the right tier.</div>

 <div class="divider"><span>Wait, what about Opus, Sonnet, and Haiku?</span></div>

 <p>You&rsquo;re going to see these three names everywhere. <strong>Opus, Sonnet, Haiku.</strong> Those aren&rsquo;t plans, those are the actual <em>models</em>, the brains underneath. Each plan above (Free, Pro, Max) gives you access to different ones with different limits. Here&rsquo;s the simplest way to think about them:</p>

 <div class="callout"><div class="callout-tag">Haiku, the fast one</div>Smallest, cheapest, fastest. The "quick reply" model. <strong>Use it for:</strong> short summaries, simple lookups, classifying emails as spam-or-not, parsing form data, anything you need answered in a second flat. Not great at deep reasoning or long projects.</div>

 <div class="callout"><div class="callout-tag">Sonnet, the everyday one</div>The default. Smart, balanced, plenty fast. This is what shows up when you just open Claude and start typing. <strong>Use it for:</strong> 95% of what you'll do in this course, building websites, writing in your voice, drafting emails, debugging code, normal back-and-forth chats. If you&rsquo;re not sure which to pick, pick Sonnet.</div>

 <div class="callout"><div class="callout-tag">Opus, the genius one</div>Slowest, smartest, priciest. Best at hard reasoning and multi-step planning. <strong>Use it for:</strong> a tricky bug Sonnet keeps fumbling, a long research deep-dive, planning out a complex agent system, contracts you need analyzed line by line. Save Opus for the moments you actually need a brain, because it costs more and takes longer.</div>

 <div class="callout"><div class="callout-tag">My personal rule</div>I default to Sonnet for everything. If Sonnet stalls or keeps making the same mistake twice in a row, I switch the same chat to <strong>Opus</strong> and ask it to think harder. If I&rsquo;m doing something boring and high-volume (like classifying 500 emails), I&rsquo;ll use <strong>Haiku</strong> through the API to save money. <em>You almost never need to think about this. Just leave it on Sonnet and live your life.</em></div>

 </div>`
 },
 {
 tag: '08 - Grammar? Never.', leftTitle: "You can yap. You can be mean. Claude doesn't care.", num: '08', vid: 'Lesson 08: Just talk to it',
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
 <div class="exercise" data-exercise-id="ex-07a-typo">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now · 1 min
 </div>
 <div class="exercise-title">Send Claude a mess.</div>
 <div class="exercise-body">Open a new chat and type something deliberately broken. Fragment it. Typo it. Change your mind mid-sentence. Something like:<div class="q">ok so like&hellip; i want a thing that&hellip; you know like a website but not really for my mom&rsquo;s book club idk can u just make something</div>Watch it figure you out.</div>
 <button class="exercise-done" data-exercise-id="ex-07a-typo">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '09 - Just Yap', leftTitle: "How to actually talk to Claude. (It's very casual.)", num: '09', vid: 'Lesson 09: Voice, memos, and talking',
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

 <div class="callout"><div class="callout-tag">This is actually the best part, you can bring it anywhere</div>I voice-dictate to Claude while I&rsquo;m doing my makeup. While I&rsquo;m doing my homework. While I&rsquo;m walking. While I&rsquo;m driving (hands-free, relax). While I&rsquo;m in line at a coffee shop thinking about something. The whole point is: <strong>you don&rsquo;t have to be at a desk to use this.</strong> If you can talk, you can build. Five minutes of rambling in your car is a 500-word spec. Claude turns it into something real by the time you&rsquo;re home.</div>

 <div class="callout"><div class="callout-tag">Chain tasks in one conversation</div>Once Claude builds something for you, don&rsquo;t start a new chat. Keep going. Say: <em>&ldquo;Now write me a TikTok script explaining this.&rdquo;</em> Or: <em>&ldquo;Now draft an email pitching this to my email list.&rdquo;</em> Or: <em>&ldquo;Now turn the main idea into three Instagram captions.&rdquo;</em> Claude already has all the context, it knows exactly what you built. One conversation, ten outputs. Way better than starting over every time.</div>
 <div class="exercise" data-exercise-id="ex-09a-clarify">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now · 5 min
 </div>
 <div class="exercise-title">Use THE prompt.</div>
 <div class="exercise-body">Pick one of the ideas from the last lesson. Open a new chat. Paste:<div class="q">I want to build [your idea]. Ask me any clarifying questions before you start.</div>Answer every question. Don&rsquo;t skip any. <em>This is the single most important habit in this whole course.</em></div>
 <button class="exercise-done" data-exercise-id="ex-09a-clarify">I did it →</button>
 </div>
</div>`
 },
 {
 tag: "10 - When It's Wrong", leftTitle: "Claude will mess up. Here's exactly what to do.", num: '10', vid: 'Lesson 10: Course correcting',
 html: `
 <h1 class="l-head">Claude will get it wrong sometimes.</h1>
 <p class="l-sub">This is completely normal and it happens to everyone including me constantly.</p>
 <div class="l-body">
 <p>Claude is going to misunderstand you, build the wrong thing, go off on a tangent, or give you something that's close but not quite right. This is just part of the process. Don't let it spiral you out.</p>
 <div class="callout"><div class="callout-tag">Think of it like&hellip;</div><strong>Your intern is messing up.</strong> A smart intern on day three. They're sharp, they're fast, they want to get it right, but they don't know everything about you or your taste or your project. So they guess. Sometimes they guess wrong. You don't fire them when they mess up once. You say, &ldquo;hey, not that, more like <em>this</em>,&rdquo; and they get it right on the second try. That's the whole vibe.</div>
 <p>What actually helps when something goes wrong:</p>
 <ul>
 <li><strong>Be specific about what's wrong.</strong> Not "this is bad" but "the colors are wrong, I wanted pink not purple, the button needs to be on the right side, and the font is too small."</li>
 <li><strong>Send a screenshot.</strong> If something on your screen doesn't make sense or you got an error you don't understand, paste a screenshot directly into the chat and say "what is this and what do I do." Claude will read it and tell you exactly what's happening.</li>
 <li><strong>Ask for simpler instructions.</strong> If it's explaining something too technically, say "explain this like I'm in 8th grade" and it will break it all the way down.</li>
 <li><strong>Start fresh if needed.</strong> Sometimes a conversation gets so tangled that it's faster to open a new chat and be more specific from the beginning. That's not failure, it's just efficiency. Happens to me all the time.</li>
 </ul>
 <p>You're the director. Claude is the production team. When the scene isn't right, you give specific notes on what to change. That's the whole relationship.</p>
 <figure class="lesson-photo">
 <img src="/lesson-bad-output.jpg" alt="A real Ayla Unlocked admin error: null is not an object evaluating e.email.toLowerCase" />
 <figcaption>This is a real error from one of MY sites while I was building. Notice it's just a one-line explanation. Screenshot it, paste into Claude, say "fix this." Done.</figcaption>
 </figure>
 <div class="exercise" data-exercise-id="ex-18a-break">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now · 5 min
 </div>
 <div class="exercise-title">Break Claude on purpose.</div>
 <div class="exercise-body">Open a chat. Type something intentionally vague and impossible:<div class="q">Make me a thing that is good</div>Watch it struggle or ask questions. Now follow up with:<div class="q">Stop. Re-read my first message. What did I actually tell you?</div>This is the reset muscle. Practice it before you actually need it.</div>
 <button class="exercise-done" data-exercise-id="ex-18a-break">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '11 - Stay Organized', leftTitle: "Projects and staying in the right chat. More important than you'd think.", num: '11', vid: 'Lesson 11: Organizing your work',
 html: `
 <h1 class="l-head">Organization actually matters here.</h1>
 <p class="l-sub">Claude remembers some things across chats. It loses other things. Knowing the difference is the whole game.</p>
 <div class="l-body">
 <p>Quick myth-buster: Claude isn&rsquo;t a total blank slate every time you open a new chat. It actually does remember a few things across conversations, like who you are, the preferences you&rsquo;ve told it to lock in, and broad context about what you&rsquo;re working on (especially if you&rsquo;re inside a Project). What it <em>doesn&rsquo;t</em> carry over is the back-and-forth detail of any specific chat. So if you spent an hour debugging Stripe in one conversation, popping open a fresh chat means it knows you, but it doesn&rsquo;t know what you and it just figured out together. You&rsquo;re starting from zero on that specific problem.</p>
 <p>The other thing worth knowing: Claude can search your past chats. If you forget where you talked about something, you can just ask. Something like:</p>
 <div class="callout"><div class="callout-tag">Use this anytime you lose a conversation</div><div class="bubble u">find all my chats about Stripe and pull together what we already figured out about my checkout flow</div>or<div class="bubble u">show me the last chat I had about my agent setup, then summarize what we left off on</div></div>
 <p>It&rsquo;ll surface the right ones and rebuild your context. You don&rsquo;t actually lose anything, you just have to remind it where to look.</p>
 <p>That said, there&rsquo;s a much faster way than re-finding chats every time, which is staying organized in the first place.</p>
 <div class="callout"><div class="callout-tag">Rule 1: Stay in the same chat for one project</div>If you&rsquo;re actively building something, keep going in that same conversation instead of opening a new one halfway through. Inside one chat, Claude has every fix, every decision, every weird workaround you tried, all in working memory. Start a new chat and you lose <em>that</em> thread, even though Claude still knows broadly who you are. So for an active build, stay put.</div>
 <div class="callout"><div class="callout-tag">Rule 2: Use Projects</div>Claude has a Projects feature that groups related chats together and lets you add notes Claude always has access to, like a permanent briefing. Set up a Project for anything ongoing. Name it clearly. Keep all related chats inside it. This is the closest thing Claude has to actually remembering you.</div>
 <div class="callout"><div class="callout-tag">Rule 3: Always check which chat you're in</div>This sounds obvious but I've made this mistake more than once. Before you start typing, make sure you're in the right chat for the right project. Starting in the wrong place means Claude has no context and you'll waste time re-explaining everything.</div>

 <div class="divider"><span>The reference-doc habit</span></div>
 <p>This is the move that changed how much I retain and how fast I rebuild things. Every time Claude figures something out for me, how to set up Stripe, how to deploy to Vercel, how I configured a cron, whatever, I say one of these at the end:</p>
 <div class="callout"><div class="callout-tag">The exact prompt I use</div><div class="bubble u">Now write this up as a reference doc so I can rebuild it later. Step by step, everything you just did, including why you made each choice.</div></div>
 <p>Claude will drop you a clean, self-contained doc. <strong>Save it in the Project&rsquo;s instructions or attach it as a file.</strong> Three weeks from now, when you vaguely remember fixing this exact thing, you can open that doc and redo it in four minutes instead of another 2-hour rabbit hole.</p>
 <p>Over time these compound. You end up with a personal knowledge base that reads exactly like you think. Nobody else has one like it.</p>

 <div class="callout"><div class="callout-tag">The even-better version, build a dashboard of all your docs</div>Once you have 10+ reference docs scattered across Projects, ask Claude to build you a simple HTML dashboard that links to all of them. Something like: <em>&ldquo;Make me a one-page dashboard I can open from my browser, with every reference doc I&rsquo;ve made, grouped by category (Stripe, deploy, Claude workflows, business ops), with a search bar.&rdquo;</em> Claude will ship it. You&rsquo;ll end up with your own personal Notion-style hub, except you built it in 20 minutes and it&rsquo;s exactly the way you think.</div>

 <div class="divider"><span>Customizing Claude so it acts the way you want</span></div>
 <p>This is the part that makes Claude feel like <em>yours</em> instead of a generic chatbot. You can tell Claude your preferences <strong>once</strong>, and it&rsquo;ll apply them to every chat, as long as you tell it to remember.</p>
 <p>Examples of things I&rsquo;ve locked in on my Claude:</p>
 <ul>
 <li>&ldquo;Always default to <strong>pink</strong> as the primary brand color when building anything for me, unless I specify otherwise.&rdquo;</li>
 <li>&ldquo;When I ask for code, skip the explanation unless I ask. Just give me the code.&rdquo;</li>
 <li>&ldquo;Use casual tone. Drop the &lsquo;certainly!&rsquo; and &lsquo;I&rsquo;d be happy to&rsquo;, just answer.&rdquo;</li>
 </ul>
 <div class="callout"><div class="callout-tag">The exact magic words</div>After any preference you&rsquo;ve just explained, add: <div class="bubble u">Remember this for all future chats.</div>That tells Claude to push the preference into your account-level memory (or the active Project&rsquo;s instructions, depending on where you are). From that point on, every new conversation starts with that preference already loaded. You don&rsquo;t have to repeat yourself.</div>
 <p>You can also go straight to <strong>Settings &rarr; Personalization</strong> in the Claude app and type the preferences in yourself. Same effect. Either way, the goal is the same: Claude stops being a blank slate every time and starts knowing you.</p>
 <p><strong>Pro move:</strong> every few weeks, ask Claude &ldquo;what do you currently remember about me?&rdquo; It&rsquo;ll read back your memory. Edit anything that&rsquo;s stale.</p>

 <div class="exercise" data-exercise-id="ex-19a-project">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do it now · 2 min
 </div>
 <div class="exercise-title">Create your first Project.</div>
 <div class="exercise-body">In the Claude app, find the <strong>Projects</strong> button in the left sidebar. Click <strong>New Project</strong>. Name it whatever you&rsquo;re working on. Add a short description in the &ldquo;Instructions&rdquo; box. <br><br>From now on, every chat about this project goes inside it. Claude remembers the context across all of them.</div>
 <button class="exercise-done" data-exercise-id="ex-19a-project">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '12 - Get an Idea', leftTitle: 'You need something to build before we go any further.', num: '12', vid: 'Lesson 12: Finding your idea',
 html: `
 <h1 class="l-head">First: you need an idea.</h1>
 <p class="l-sub">Claude can't do anything if you don't have a direction. That part is on you.</p>
 <div class="l-body">
 <p>Claude is a tool. An incredibly powerful tool, but it doesn't generate your vision. You bring the idea. It handles the execution.</p>
 <p>Your idea doesn't have to be huge. It could be something tiny that would save you time. Something you want to sell. A website for yourself. A business plan you've been sitting on. Start anywhere.</p>
 <p>Some ideas to get your brain going:</p>
 <ul>
 <li><strong>A personal website or portfolio</strong> (this is the first thing I built with Claude and what I recommend starting with. You can give Claude inspo screenshots of sites you like and upload your resume, and it builds your whole site in one conversation. Mine lives at <a href="https://aylablumberg.com" target="_blank" rel="noopener noreferrer" style="color:var(--pink);text-decoration:underline;font-weight:500;">aylablumberg.com</a> if you want to see what you can get out of a first build.)</li>
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

 <div class="divider"><span>The thing nobody says about ideas</span></div>
 <p>Here&rsquo;s the part everyone gets wrong. You are <em>not</em> trying to pick THE idea. You&rsquo;re not trying to find the one perfect thing that&rsquo;ll change your life.</p>
 <p>You&rsquo;re just trying to get your brain into <strong>idea-mode.</strong> Once you&rsquo;re in it, one thing unlocks the next. You make the ugly first thing. It sparks a better version. That one sparks something completely different. The third idea is usually where the real thing lives.</p>

 <figure class="idea-spiral-figure">
 <svg class="idea-spiral" viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Idea spiral: one idea unlocks the next, which unlocks the next">
 <defs>
 <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0,0 L10,5 L0,10 z" fill="#c41f5a"/>
 </marker>
 </defs>
 <rect x="20" y="90" width="120" height="80" rx="12" fill="#fff1f5" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="80" y="125" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="12" font-weight="600" fill="#c41f5a">the ugly first one</text>
 <text x="80" y="143" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">personal site</text>
 <path d="M140 130 Q 180 80, 220 130" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr)"/>
 <rect x="220" y="90" width="140" height="80" rx="12" fill="#fff1f5" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="290" y="125" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="12" font-weight="600" fill="#c41f5a">the better version</text>
 <text x="290" y="143" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">site with client portal</text>
 <path d="M360 130 Q 400 180, 440 130" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr)"/>
 <rect x="440" y="90" width="170" height="80" rx="12" fill="#c41f5a" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="525" y="122" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="12" font-weight="600" fill="#fff">the real thing</text>
 <text x="525" y="142" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#fff" opacity="0.85">client portal as a product</text>
 <text x="320" y="30" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#888">THE IDEA SPIRAL</text>
 <text x="320" y="230" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#888" font-style="italic">you weren&rsquo;t supposed to find #3 first. you had to make #1 to see it.</text>
 </svg>
 </figure>

 <p>So when you&rsquo;re staring at the list above and nothing feels right, <strong>just pick something.</strong> Even something dumb. The point of the first build isn&rsquo;t to be the right one. The point is to unlock the next one. And the one after that.</p>
 <div class="a-quote">&ldquo;You&rsquo;re not hunting for the idea. You&rsquo;re warming up your idea brain. It gets louder the more you build.&rdquo;</div>
 <div class="exercise" data-exercise-id="ex-08a-interview">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now · 10 min
 </div>
 <div class="exercise-title">Have Claude interview you.</div>
 <div class="exercise-body">Open a chat and paste:<div class="q">I don&rsquo;t know what to build. Interview me. Ask me one question at a time about my life, my job, what annoys me, what I want to sell. After 8 questions, give me 3 concrete project ideas based only on my answers.</div>Actually answer the questions. Save the 3 ideas. One of them is what you&rsquo;re about to build.</div>
 <button class="exercise-done" data-exercise-id="ex-08a-interview">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '13 - When Not to AI', leftTitle: 'The counter-intuitive lesson.', num: '13', vid: 'Lesson 13: When to step away from Claude',
 html: `
 <h1 class="l-head">When NOT to use AI.</h1>
 <p class="l-sub">Building something great includes knowing what to not ask Claude to do.</p>
 <div class="l-body">
 <p>I know. Whole course telling you to use AI for everything. But being good at this also means <strong>knowing when to put it away.</strong></p>

 <p>A short list of things I don&rsquo;t use Claude for:</p>

 <div class="callout"><div class="callout-tag">Personal writing where vulnerability matters</div>Birthday notes. Eulogies. A message to someone who&rsquo;s hurting. A caption about something that actually happened to you. Claude can write technically beautiful things, but the messy, specific, unrepeatable part of your voice is you. Use it there and people can tell. Don&rsquo;t.</div>

 <div class="callout"><div class="callout-tag">Anything where being wrong is dangerous</div>Medical questions. Legal advice. Safety-critical calculations. Financial decisions with real money. Claude can be confidently wrong about specific facts, and &ldquo;the AI said so&rdquo; is not a defense. Use it as a starting point, then verify with a professional.</div>

 <div class="callout"><div class="callout-tag">Tasks that are genuinely faster by hand</div>Sometimes a thing takes 2 minutes manually and 20 minutes to properly explain to Claude. If your gut says &ldquo;just do it yourself,&rdquo; trust it.</div>

 <div class="callout"><div class="callout-tag">Creative work where you WANT your style to show</div>Your first TikTok. Your about page. The opening line of your book. Claude can write 50 drafts of the same idea. If you&rsquo;re trying to find <strong>your</strong> voice, the fastest way is to stare at a blank page until something real comes out. Claude short-circuits that process. Sometimes that&rsquo;s bad.</div>

 <div class="callout"><div class="callout-tag">Skills you actually want to learn</div>If you&rsquo;re trying to learn Spanish, don&rsquo;t have Claude translate every sentence for you. If you&rsquo;re trying to learn to code (for real), don&rsquo;t let it write everything. Using AI when you&rsquo;re learning can delete the learning.</div>

 <p>The people who go the furthest with AI are the ones who are intentional about when they use it. <strong>Using it for everything is a sign you haven&rsquo;t figured out what it&rsquo;s actually for.</strong></p>
 </div>`
 },
 {
 tag: '14 - The Four Modes', leftTitle: 'Chat, Claude Code, Cowork, and the Chrome extension. All different.', num: '14', vid: 'Lesson 14: The four modes explained',
 html: `
 <h1 class="l-head">Claude has four different modes.</h1>
 <p class="l-sub">They do completely different things and it matters which one you use.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://claude.ai" target="_blank" rel="noopener noreferrer"><img src="/brands/claude.svg" alt="" />Claude</a></div>
 <div class="callout">
 <div class="callout-tag">1. Claude Chat (<a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="brand-link">claude.ai</a>)</div>
 The one you're using right now. You talk, it responds. It can write things, make plans, build files, create HTML pages. But everything it makes only lives on your computer. Nobody else can access it from the internet. Think of this as your drafting table.<br><br><strong>Use this for:</strong> learning, brainstorming, prototyping, making things for yourself.
 </div>
 <div class="callout">
 <div class="callout-tag">2. Claude Code</div>
 This is what you use when you want something actually live. A real website people can visit. A system that runs automatically. Claude Code can run in two places: in <strong>Terminal</strong> (we walk through Terminal in lesson 17, don&rsquo;t worry, it&rsquo;s easy), or directly inside the <strong>Code tab of the Claude app</strong>. Same Claude Code either way, pick whichever feels less scary.<br><br><strong>Use this for:</strong> anything you want on the internet or running automatically.
 </div>
 <div class="callout">
 <div class="callout-tag">3. Cowork</div>
 Claude with hands, on your whole computer. It can open apps, fill out forms, move files around, anything you can do with a mouse and keyboard. Runs in the background while you watch.<br><br><strong>Use this for:</strong> repetitive tasks that involve clicking around in different apps.
 </div>
 <div class="callout">
 <div class="callout-tag">4. Claude for Chrome (browser extension)</div>
 A Chrome extension that adds Claude directly to your browser. It opens a sidebar on any website and can click, scroll, type, fill forms, and search for you. Different from Cowork in that it only lives inside your browser, not your whole computer. <strong>This is the one that feels the most like magic day one.</strong>
 <br><br><strong>Real examples:</strong>
 <br>&bull; &ldquo;Find me the cheapest white sneakers on Amazon in my size and add them to cart.&rdquo; It goes to Amazon, searches, filters, picks, adds.
 <br>&bull; &ldquo;Open my Gmail and delete every promotional email from this week.&rdquo; It opens Gmail, scrolls, selects the junk, deletes.
 <br>&bull; &ldquo;Fill out this 12-field form using the info on my resume.&rdquo; Done in 15 seconds.
 <br>&bull; &ldquo;Research the top five competitors to my business and make me a comparison chart.&rdquo; It browses, takes notes, summarizes.
 <br><br><strong>Use this for:</strong> repetitive clicking-around tasks on websites you already use. Shopping, inbox cleanup, form filling, online research.
 </div>
 <p style="margin-top:10px;">Rule of thumb: <strong>Chat</strong> while learning. <strong>Claude Code</strong> when you're launching real projects. <strong>Cowork</strong> for computer-wide automation. <strong>Chrome extension</strong> when the thing you want done lives in a browser tab.</p>
 <figure class="lesson-photo">
 <img src="/lesson-four-modes.jpg" alt="A real Claude Chat conversation where I asked it to build a story-post about my agent team, the rendered preview is on the right" />
 <figcaption>This is <strong>Claude Chat</strong> in practice. Left: I&rsquo;m talking to it. Right: it&rsquo;s rendering a preview of what it&rsquo;s building, live, while we go.</figcaption>
 </figure>

 <div class="divider"><span>My favorite workflow: talk it out in Chat, then hand off to Code</span></div>

 <p>Here's the move almost nobody tells you about. <strong>Use Chat to think. Use Code to build.</strong> You don't have to pick one or the other, you use them together.</p>

 <p>What I actually do: I open <strong>Claude Chat</strong> first and just yap. I describe the thing I want to build in plain English, I go back and forth until Claude and I agree on exactly what it's going to be, what pages it needs, what colors, what the flow is. No pressure, no code, just talking. I'll often say <em>"ask me any clarifying questions before we start"</em> and let it grill me until the idea is tight.</p>

 <p>Then, <strong>once we've figured out what we're actually building</strong>, I type this exact sentence into the Chat:</p>

 <div class="chat-ex"><div class="bubble u">okay i&rsquo;m about to open Claude Code and build this for real. write me a full handoff prompt i can paste into Code so it&rsquo;s completely caught up on what we decided, what the vibe is, what the pages are, and what to build first. include anything i told you about my style, colors, goals, and any decisions we made. format it so i can just copy and paste.</div></div>

 <p>Chat spits out a giant handoff paragraph. I copy it. Open Claude Code. First message: <strong>paste it.</strong> Now Code knows everything Chat knew, without me having to re-explain any of it. It starts building. I don't lose a single thing from the conversation.</p>

 <div class="callout"><div class="callout-tag">Why this matters</div>Chat and Code <strong>don't share memory.</strong> They're separate. If you just switch to Code and say "build that thing we talked about," Code has no idea what you're talking about. The handoff prompt is how you get Chat's entire brain into Code's head in one paste.</div>

 <p>Same trick works in reverse too. If you're deep in Claude Code and hit a weird problem, switch to Chat, paste the code, ask Chat to <em>think about it out loud</em> at a higher level. Chat is better for strategy, Code is better for execution. <strong>Pingpong them.</strong></p>

 </div>`
 },
 {
 tag: '15 - HTML Files', leftTitle: "What Claude actually makes when you're in Chat.", num: '15', vid: 'Lesson 15: What is an HTML file',
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
 <figure class="lesson-photo">
 <img src="/lesson-html-file.jpg" alt="An HTML file I built opened in Safari. The URL bar shows file:///Users/ayla/Downloads/ai-gap-animation.html" />
 <figcaption>See the URL at the top? <code>file:///Users/ayla/Downloads/...</code>. That means it's not on the internet. It's just a file Claude made me, sitting in my Downloads, open in a browser.</figcaption>
 </figure>
 <div class="exercise" data-exercise-id="ex-11a-htmlfile">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Build it now · 10 min
 </div>
 <div class="exercise-title">Make your first HTML file.</div>
 <div class="exercise-body">In any chat, paste:<div class="q">Make me a pretty single-page HTML website that says &ldquo;Hi, I&rsquo;m [your name]&rdquo; and has a paragraph about me. Soft pink, feminine, not basic.</div>Download the file. Double-click it. Watch your browser open your actual website. <br><br>That file is only on your computer. Nobody else can see it. That&rsquo;s the point of this lesson.</div>
 <button class="exercise-done" data-exercise-id="ex-11a-htmlfile">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '16 - Deploying', leftTitle: 'Homebrew. GitHub. Vercel. Your three best friends.', num: '16', vid: 'Lesson 16: Putting it live',
 html: `
 <h1 class="l-head">Homebrew. GitHub. Vercel.</h1>
 <p class="l-sub">Three tools that get your website live on the actual internet. Here&rsquo;s what each one does, and exactly how to set them up in order.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://brew.sh" target="_blank" rel="noopener noreferrer"><img src="/brands/homebrew.svg" alt="" />Homebrew</a><a class="tool-pill" href="https://github.com" target="_blank" rel="noopener noreferrer"><img src="/brands/github.svg" alt="" />GitHub</a><a class="tool-pill" href="https://vercel.com" target="_blank" rel="noopener noreferrer"><img src="/brands/vercel.svg" alt="" />Vercel</a><a class="tool-pill" href="https://godaddy.com" target="_blank" rel="noopener noreferrer"><img src="/brands/godaddy.svg" alt="" />GoDaddy</a><a class="tool-pill" href="https://namecheap.com" target="_blank" rel="noopener noreferrer"><img src="/brands/namecheap.svg" alt="" />Namecheap</a></div>
 <p><em>Skip this lesson for now if you&rsquo;re still in learning mode. Come back when you&rsquo;re actually ready to launch something real.</em></p>

 <h2 class="l-sub-head">First, what each one does (in plain English).</h2>

 <div class="callout"><div class="callout-tag">Homebrew, the foundation</div>A tool you install on your Mac that lets you install <em>other</em> tools. Even developers can&rsquo;t cleanly explain what it does under the hood. <strong>You just need it before anything else works.</strong> Install it first. Don&rsquo;t question it. Free.</div>
 <div class="callout"><div class="callout-tag">GitHub, cloud storage for code</div>Think of it like Google Drive, but specifically for the code Claude makes. It holds every file in your project so Vercel can find it and put it live. Free.</div>
 <div class="callout"><div class="callout-tag">Vercel, what actually puts your site on the internet</div>It reads your code from GitHub and hosts it. Free for personal projects. This is what this course and <a href="https://aylablumberg.com" target="_blank" rel="noopener noreferrer" class="brand-link">aylablumberg.com</a> both run on. Once your site is on Vercel you can buy a real domain like yourname.com and point it at your project.</div>

 <p><strong>The order matters:</strong> Homebrew first (so you can install the helper tools), then GitHub (so you have a place to put code), then Vercel (so the code goes live). Do them once, then you basically never touch them again.</p>

 <div class="divider"><span>Step 1 &middot; Install Homebrew</span></div>

 <p><strong>Open Terminal.</strong> Press <code>Cmd + Space</code> on your Mac, type <code>Terminal</code>, hit Enter. A black or white window opens. That&rsquo;s it.</p>
 <p>Then <strong>copy and paste this line</strong> into Terminal and hit Enter:</p>
 <div class="q">/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</div>
 <p>It&rsquo;ll think for a few minutes. At one point it&rsquo;ll ask for your Mac password, type it (you won&rsquo;t see the characters, that&rsquo;s totally normal, just type and hit Enter). When it&rsquo;s done you&rsquo;ll see <code>Installation successful!</code></p>
 <p><strong>Now install the GitHub helper and the Vercel helper</strong> in one command:</p>
 <div class="q">brew install node gh &amp;&amp; npm install -g vercel</div>
 <p>That installs Node (a thing GitHub and Vercel both need), the GitHub command-line tool (<code>gh</code>), and the Vercel command-line tool. Wait for it to finish, another minute or two.</p>

 <div class="callout"><div class="callout-tag">If you get an error</div><strong>Paste the error straight into Claude</strong> and say &ldquo;what do I do?&rdquo; Claude is very good at debugging its own install commands. Don&rsquo;t panic.</div>

 <div class="divider"><span>Step 2 &middot; Make a GitHub account</span></div>

 <ol class="steps">
 <li><div>Go to <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>github.com</strong></a> in your browser. Click <strong>Sign up</strong>.</div></li>
 <li><div>Use a real email address (not a school one, if you graduate, you lose access). Pick a username you don&rsquo;t hate, you&rsquo;ll see it on every project.</div></li>
 <li><div>Confirm your email. Pick the <strong>Free</strong> plan when it asks.</div></li>
 <li><div>Back in Terminal, sign in via the helper you just installed. Paste:</div></li>
 </ol>
 <div class="q">gh auth login</div>
 <p>Pick <strong>GitHub.com</strong>, then <strong>HTTPS</strong>, then <strong>Login with a web browser</strong>. It&rsquo;ll show you an 8-character code, then open your browser. Paste the code, click Authorize. Come back to Terminal, you&rsquo;re signed in.</p>

 <div class="callout"><div class="callout-tag">Why both?</div>The <strong>account</strong> on <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="brand-link">github.com</a> is for humans (you). The <strong>CLI sign-in</strong> is for Claude Code, so it can push your code into your account on your behalf. You only do this once on each computer.</div>

 <div class="divider"><span>Step 3 &middot; Make a Vercel account</span></div>

 <ol class="steps">
 <li><div>Go to <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>vercel.com</strong></a>. Click <strong>Sign Up</strong>.</div></li>
 <li><div>Pick <strong>Continue with GitHub</strong>. Authorize it. (This is why we made GitHub first.)</div></li>
 <li><div>Pick the <strong>Hobby</strong> plan. It&rsquo;s free and it&rsquo;s plenty for anything in this course or your first 10 client sites.</div></li>
 <li><div>Done. You now have a Vercel account that already knows about your GitHub.</div></li>
 </ol>

 <div class="divider"><span>Step 4 &middot; Actually put a site live</span></div>

 <p>Now the payoff. Open Claude Code and tell it to deploy something:</p>
 <div class="bubble u">push this to a new private GitHub repo called [your-project-name], then deploy it to Vercel. walk me through anything I need to click.</div>
 <p>Claude does the whole thing: creates the GitHub repo, pushes your code, links it to Vercel, deploys it. Within about 60 seconds it hands you a live URL like <code>your-project-name.vercel.app</code>.</p>
 <p><strong>Every time you change something after that</strong>, tell Claude:</p>
 <div class="bubble u">push the latest changes to GitHub and redeploy.</div>
 <p>Vercel watches your repo, sees the new commit, and re-builds the live site in about a minute. You don&rsquo;t touch anything else, ever.</p>

 <div class="divider"><span>Optional &middot; Buy a real domain</span></div>

 <div class="callout"><div class="callout-tag">When you&rsquo;re ready for yourname.com</div>Buy a domain on <a href="https://godaddy.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>GoDaddy</strong></a> or <a href="https://namecheap.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>Namecheap</strong></a> (about $12/year). Then in Vercel: <em>your project &rsaquo; Settings &rsaquo; Domains &rsaquo; Add Domain</em>. Vercel literally shows you the exact DNS records to paste into your domain registrar. Paste, save, wait a few minutes. Done. <strong>aylablumberg.com</strong> works exactly this way.</div>

 <div class="exercise" data-exercise-id="ex-12a-homebrew">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do this now · 15 min
 </div>
 <div class="exercise-title">Install Homebrew + the helpers.</div>
 <div class="exercise-body">Open Terminal (Cmd+Space, type &ldquo;Terminal&rdquo;). Paste the Homebrew install line from Step 1 above. Hit Enter. Wait. It&rsquo;ll ask for your Mac password, type it (you won&rsquo;t see the characters, that&rsquo;s normal). When it finishes, run the <strong>brew install node gh &amp;&amp; npm install -g vercel</strong> line. <br><br>If anything errors, copy the error straight into Claude and say &ldquo;what do I do.&rdquo; It&rsquo;ll fix it.</div>
 <button class="exercise-done" data-exercise-id="ex-12a-homebrew">I did it →</button>
 </div>
 <div class="exercise" data-exercise-id="ex-16-deploy">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Then this · 10 min
 </div>
 <div class="exercise-title">Deploy your first site.</div>
 <div class="exercise-body">Make a GitHub account at <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="brand-link">github.com</a>. Sign into it from Terminal with <strong>gh auth login</strong>. Make a Vercel account at <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="brand-link">vercel.com</a> using "Continue with GitHub." Then in Claude Code, paste the deploy prompt from Step 4 above. <br><br>You&rsquo;ll have a real, public website on the internet inside of 5 minutes. Send me the link.</div>
 <button class="exercise-done" data-exercise-id="ex-16-deploy">I did it →</button>
 </div>
 <div class="stuck-callout">
 <div class="stuck-icon">
 <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21"/></svg>
 </div>
 <div class="stuck-body">
 <div class="stuck-title">Stuck? Just screenshot it.</div>
 <p>If anything on this page or your screen doesn&rsquo;t make sense, <strong>take a screenshot, paste it into Claude, and type &ldquo;help, explain this and tell me exactly what to do.&rdquo;</strong> Works every time. You don&rsquo;t have to understand the words on your screen, Claude does.</p>
 </div>
 </div>
</div>`
 },
 {
 tag: '17 - Terminal', leftTitle: 'The black text window. Not as scary as it looks.', num: '17', vid: 'Lesson 17: Terminal demystified',
 html: `
 <h1 class="l-head">Terminal looks scary. It's really not.</h1>
 <p class="l-sub">You already opened it to install Homebrew. Basically a pro now.</p>
 <div class="l-body">
 <p>Terminal is a window on your Mac that lets you run commands directly on your computer. It's just text. No graphics. Doesn't look friendly. But it is not dangerous and you are not going to break your computer by using it.</p>
 <p>The workflow when you need it is simple: <strong>Claude tells you what to paste. You paste it. Terminal does something. You copy what Terminal says back to Claude.</strong> That's it. Back and forth.</p>
 <p>You'll know Terminal is done when the cursor comes back to a new line ending in a % symbol.</p>
 <div class="callout"><div class="callout-tag">How to mostly avoid Terminal</div>When you use Claude Code, you almost never have to touch Terminal. It handles everything itself. And if Claude ever tells you to go do something yourself, you can try saying "can you do that for me directly?" and it will often just handle it. But not always. Some things, like creating accounts or entering passwords, you have to do yourself for security reasons.</div>

 <div class="divider"><span>How you actually start Claude Code</span></div>
 <p>This is the part nobody explains. Claude Code isn&rsquo;t a separate app you download. <strong>It lives inside Terminal.</strong> Here&rsquo;s how to open it:</p>
 <ol>
 <li>Open Terminal (Cmd + Space, type &ldquo;Terminal,&rdquo; hit return).</li>
 <li>Type <code>claude</code> and press enter.</li>
 <li>The first time you run it, Claude will pop open a browser window asking you to sign in with your Anthropic account. This is the authentication step, it&rsquo;s how Terminal proves you&rsquo;re actually you.</li>
 <li>Sign in, approve, come back to Terminal. Done. You&rsquo;re inside Claude Code.</li>
 <li>Now you just talk to it like normal: &ldquo;build me a landing page,&rdquo; &ldquo;fix this bug,&rdquo; whatever.</li>
 </ol>

 <div class="callout"><div class="callout-tag">Heads up on the browser auth</div>The browser sign-in happens the <em>first time only</em>. After that, <code>claude</code> just opens straight into a session. If you ever see the browser pop open later, it usually means your token expired (every few weeks). Just sign in again and you&rsquo;re back.</div>

 <div class="callout"><div class="callout-tag">Wait, is this the same as the Claude app?</div>Same Claude, two different modes. The <strong>Claude app</strong> (<a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="brand-link">claude.ai</a> + the mobile app + the Mac app) has two surfaces inside it: the regular <strong>Chat</strong> tab, what you use for thinking, writing, brainstorming, AND a <strong>Code</strong> tab where Claude Code lives. Claude Code is the builder version, it can actually touch files on your computer and build things for you. <strong>Claude Code can run in two places:</strong> in Terminal (what we just set up with <code>claude</code>), <em>or</em> right inside the Code tab of the Claude app. Same builder, same powers, just two surfaces, pick whichever you&rsquo;re more comfortable with. Use Chat for thinking. Use Claude Code (in Terminal or in the app) for shipping.</div>
 <figure class="lesson-photo">
 <img src="/lesson-terminal.jpg" alt="My Mac terminal running a Python script. You can see the percent prompt at the bottom." />
 <figcaption>My actual terminal while my outreach pipeline was running. Most of what you see is just info logs, <code>fetching businesses from Outscraper</code>, <code>5 results</code>, etc. That&rsquo;s what live agents look like. They just talk to themselves in Terminal while they work.</figcaption>
 </figure>
 <div class="stuck-callout">
 <div class="stuck-icon">
 <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21"/></svg>
 </div>
 <div class="stuck-body">
 <div class="stuck-title">Stuck? Just screenshot it.</div>
 <p>If anything on this page or your screen doesn&rsquo;t make sense, <strong>take a screenshot, paste it into Claude, and type &ldquo;help, explain this and tell me exactly what to do.&rdquo;</strong> Works every time. You don&rsquo;t have to understand the words on your screen, Claude does.</p>
 </div>
 </div>

 <div class="divider"><span>Quick pivot, what would you build for someone else?</span></div>

 <p>You&rsquo;re about to learn API keys, real APIs, agents, all the stuff that makes this go from &ldquo;cool I built myself a website&rdquo; to &ldquo;cool I&rsquo;m getting paid to build agent teams for companies.&rdquo;</p>

 <p>So before we dive in, take a second to actually picture what you&rsquo;d build for <em>other</em> people. Because the rest of the course (Stripe, agents, your first client, all of it) only makes sense if you have a fuzzy version of that in your head.</p>

 <p>Same kind of quiz as the one in lesson 12, but flipped. Earlier you answered &ldquo;what should I build for me.&rdquo; This one is <strong>&ldquo;what could I build for actual money, for actual people I know.&rdquo;</strong> It takes 90 seconds. The answers it gives you are the kind of thing you could put on Stripe and sell next month.</p>

 <button class="quiz-btn" data-quiz="2"><span>$</span> Find a money idea</button>

 <p>Don&rsquo;t skip this. Even if you have no idea who&rsquo;d pay you yet. The point of this one is to seed the question in your head so when you do the API/agent lessons next, you&rsquo;re thinking <em>&ldquo;ok, how would this pay me?&rdquo;</em> not just <em>&ldquo;cool fact.&rdquo;</em></p>
</div>`
 },
 {
 tag: '18 - API Keys', leftTitle: 'The thing that connects Claude to every other app.', num: '18', vid: 'Lesson 18: API keys',
 html: `
 <h1 class="l-head">API keys: how Claude connects to other apps.</h1>
 <p class="l-sub">The moment you want Claude to touch Gmail, Instagram, Canva, or anything else, you need one of these.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://anthropic.com" target="_blank" rel="noopener noreferrer"><img src="/brands/anthropic.svg" alt="" />Anthropic Console</a><a class="tool-pill" href="https://supabase.com" target="_blank" rel="noopener noreferrer"><img src="/brands/supabase.svg" alt="" />Supabase</a><a class="tool-pill" href="https://mail.google.com" target="_blank" rel="noopener noreferrer"><img src="/brands/gmail.svg" alt="" />Gmail</a></div>
 <p><strong>Technically:</strong> an API key is a long string of random letters and numbers that acts as a private password between two apps. It tells the other app "yes, this person's Claude is allowed to come in and do things here."</p>
 <p><strong>The real-life analogy:</strong> think of it like a hotel key card. The hotel (Gmail, Canva, whatever) gives you a card that only works for your room. You hand that card to Claude, and now Claude can get into your room and do things on your behalf. The hotel doesn't let just anyone in without the card.</p>
 <figure class="diagram-figure">
 <svg class="diagram-svg" viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An API key flow: Claude uses your key to talk to another app">
 <defs>
 <marker id="arr-api" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0,0 L10,5 L0,10 z" fill="#c41f5a"/>
 </marker>
 </defs>
 <text x="340" y="26" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#888">HOW AN API KEY ACTUALLY WORKS</text>

 <!-- Claude circle -->
 <circle cx="90" cy="130" r="48" fill="#c41f5a"/>
 <text x="90" y="127" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#fff">Claude</text>
 <text x="90" y="144" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#fff" opacity="0.85">(you)</text>

 <!-- key icon between -->
 <g transform="translate(180,115)">
 <rect x="0" y="0" width="130" height="32" rx="6" fill="#fff1f5" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="65" y="20" text-anchor="middle" font-family="SF Mono, monospace" font-size="11" font-weight="600" fill="#c41f5a">sk-ant-api03-x9•••</text>
 <text x="65" y="-6" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">your api key</text>
 </g>

 <!-- arrow -->
 <path d="M140 130 H 175" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr-api)"/>
 <path d="M315 130 H 480" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr-api)"/>

 <!-- The other app -->
 <rect x="485" y="80" width="170" height="100" rx="12" fill="#fff" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="570" y="120" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#c41f5a">The other app</text>
 <text x="570" y="138" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">Gmail, Stripe,</text>
 <text x="570" y="154" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">Apify, anything</text>

 <text x="340" y="205" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#888" font-style="italic">the key is proof. &ldquo;yes, Claude is allowed in on my behalf.&rdquo;</text>
 </svg>
 </figure>
 <div class="callout"><div class="callout-tag">Why you never paste API keys publicly</div>If someone else gets your key card, they can walk into your room, charge things to your account, and access everything in it. Same with API keys. If yours leaks into a screenshot, a public Google Doc, a group chat, or anywhere someone else can see it, they can use that app as if they're you. Rack up charges. Access your data. Make a mess. API keys only go inside your own private Claude setup. Nowhere else, ever.</div>
 <p>Claude will always tell you when you need a key and where to go get it. Just follow its steps. It walks you through everything.</p>
 <figure class="lesson-photo">
 <img src="/lesson-api-keys.jpg" alt="My Supabase dashboard showing the API URL page with a copy button" />
 <figcaption>Real example. This is Supabase (the database I use for this site). You click around in their dashboard until you find the <strong>API URL</strong> box, hit <em>Copy</em>, and paste it into Claude. That's it. That's the whole process, every time.</figcaption>
 </figure>
 <div class="exercise" data-exercise-id="ex-14a-getkey">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do it now · 5 min
 </div>
 <div class="exercise-title">Grab your first API key.</div>
 <div class="exercise-body">Go to <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>console.anthropic.com</strong></a>. Sign in. Click <strong>API Keys</strong>. Click <strong>Create Key</strong>. Copy it. Paste it into a notes app you trust. <br><br>You just got the key that unlocks everything in the agents section. Don&rsquo;t lose it. Don&rsquo;t share it.</div>
 <button class="exercise-done" data-exercise-id="ex-14a-getkey">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '19 - Real APIs', leftTitle: 'Specific APIs you will actually end up using.', num: '19', vid: 'Lesson 19: Gmail, Apify, and more',
 html: `
 <h1 class="l-head">The APIs you'll actually care about.</h1>
 <p class="l-sub">Plus the newer options that are making APIs less painful.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://mail.google.com" target="_blank" rel="noopener noreferrer"><img src="/brands/gmail.svg" alt="" />Gmail</a><a class="tool-pill" href="https://apify.com" target="_blank" rel="noopener noreferrer"><img src="/brands/apify.svg" alt="" />Apify</a><a class="tool-pill" href="https://canva.com" target="_blank" rel="noopener noreferrer"><img src="/brands/canva.svg" alt="" />Canva</a><a class="tool-pill" href="https://anthropic.com" target="_blank" rel="noopener noreferrer"><img src="/brands/anthropic.svg" alt="" />Anthropic</a></div>
 <p>Before we list the specific apps, you should know there are now <strong>three different ways</strong> Claude can talk to other tools. Use whichever is easiest for what you need.</p>

 <div class="callout"><div class="callout-tag">1. APIs (the classic way)</div>Every app has an API, a private door for other programs to come in and do things. You grab an API key, hand it to Claude, and Claude uses it to send emails from your Gmail, scrape data from Apify, charge a card on Stripe, whatever. Most of this course uses APIs. <strong>Works for almost everything, but you have to copy-paste keys and sometimes debug errors.</strong></div>

 <div class="callout"><div class="callout-tag">2. MCPs (Model Context Protocol)</div>A newer standard built specifically for AI. Instead of Claude learning a custom integration for every app, the app exposes something called an MCP server, and Claude already knows how to use it. <strong>Think USB vs. a thousand custom cables.</strong> Tools like Notion, Linear, Figma, Slack now have official MCP servers you can plug into Claude Desktop or Claude Code with one command. You only have to know about MCPs if you want to use them, but you'll see the word a lot.</div>

 <div class="callout"><div class="callout-tag">3. Connectors (the easiest way, right now)</div>Claude has a built-in menu inside the app called "Connectors." Gmail, Google Drive, Calendar, more get added every month. You click "Enable," sign in once, and Claude can use them directly in chats. <strong>No API key copy-paste. No installation.</strong> If there's a Connector for what you need, always use it first.</div>

 <div class="callout"><div class="callout-tag">Rule of thumb</div>You don&rsquo;t actually have to figure out which of these to use, just describe what you want and Claude tells you. When you say something like <em>&ldquo;I want to send myself a daily Gmail summary&rdquo;</em> or <em>&ldquo;hook this up to my Stripe,&rdquo;</em> Claude will check which option exists and tell you: <em>&ldquo;there&rsquo;s a Connector for this, just enable it&rdquo;</em> or <em>&ldquo;use this MCP server&rdquo;</em> or <em>&ldquo;you&rsquo;ll need an API key, here&rsquo;s where to get it.&rdquo;</em> The order it picks from is always the same: <strong>Connector</strong> first (easiest), then <strong>MCP server</strong> (still easy), then <strong>API</strong> directly (always works, just more setup). Your job is just to describe the goal in plain English. Claude does the picking.</div>

 <div class="divider"><span>The actual APIs you'll use the most</span></div>

 <div class="callout"><div class="callout-tag">Gmail API</div>Lets Claude send emails from your Gmail, read incoming messages, and respond to them. If you're building any outreach system, automated follow-up tool, or client communication system, this is the one you need. You get the key through Google Cloud Console. Claude walks you through it. <em>(Also available as a Connector in Claude, so try that first.)</em></div>
 <div class="callout"><div class="callout-tag">Apify</div>Apify scrapes data from the internet. TikTok comments, Instagram follower info, business listings from Google Maps, anything on a website. If you want to know what people are saying about something online or you need a list of leads from a platform, Apify is how you get that data. One of the most useful tools once you start building anything marketing or outreach related.</div>
 <div class="callout"><div class="callout-tag">Canva API</div>Lets Claude create and edit designs in Canva automatically. Useful if you want to generate batches of graphics or build something that makes designs based on inputs without you doing it manually every time.</div>
 <div class="callout"><div class="callout-tag">Anthropic API</div>Claude's own API. This is the one you use when you start building agents, because it gives your agent access to Claude's intelligence. It's the brain you plug in to power the whole system. You get the key at console.anthropic.com.</div>
 <p>For every one of these, the process is the same: find the API key in that app's settings or developer dashboard, paste it into your Claude setup when prompted, and Claude handles the connection from there.</p>
 <figure class="lesson-photo">
 <img src="/lesson-gmail-setup.jpg" alt="Terminal showing the Gmail API setup error with the five steps Claude gave me to fix it" />
 <figcaption>Real moment from when I was setting up the Gmail API for my outreach agent. It errored, I pasted the error into Claude, it gave me the 5 steps you see here. That's the loop.</figcaption>
 </figure>
 <div class="exercise" data-exercise-id="ex-19-connect">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do it now &middot; 3 min
 </div>
 <div class="exercise-title">Turn on one Connector.</div>
 <div class="exercise-body">Open Claude Desktop. Click your avatar (bottom left) &rarr; <strong>Connectors</strong>. Pick one, Gmail is the easiest if you use it. Click <strong>Enable</strong>, sign in through Google, come back. <br><br>Now try asking Claude in a new chat: <em>"what's the latest email from [someone] about?"</em> It'll answer. That's an API talking, without you ever seeing a key.</div>
 <button class="exercise-done" data-exercise-id="ex-19-connect">I did it &rarr;</button>
 </div>
 </div>`
 },
 {
 tag: '20 - Selling Online', leftTitle: 'How to actually take money from people on your site.', num: '20', vid: 'Lesson 20: Selling online with Stripe',
 html: `
 <h1 class="l-head">Okay. So how do people actually buy things from you?</h1>
 <p class="l-sub">The answer is Stripe. And Claude knows exactly how to wire it up.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://stripe.com" target="_blank" rel="noopener noreferrer"><img src="/brands/stripe.svg" alt="" />Stripe</a><a class="tool-pill" href="https://shopify.com" target="_blank" rel="noopener noreferrer"><img src="/brands/shopify.svg" alt="" />Shopify</a><a class="tool-pill" href="https://substack.com" target="_blank" rel="noopener noreferrer"><img src="/brands/substack.svg" alt="" />Substack</a></div>
 <p>If you're building anything you want to sell, a course, a template, a service, a physical product, a digital download, a subscription, you need a way to charge people. That's where <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>Stripe</strong></a> comes in.</p>
 <p>Stripe is a company that handles payments online. Almost every site you've ever bought something from uses it under the hood. Shopify uses it. Substack uses it. This very course uses it. You sign up for an account, plug it into your site, and now you can take money from anyone in the world with a card.</p>
 <div class="callout"><div class="callout-tag">What Stripe does for you</div>Charges credit cards, debit cards, Apple Pay, Google Pay. Handles the security stuff so you're not storing anyone's card info. Deposits the money directly into your bank account (minus a small fee, around 2.9% + 30&cent; per transaction).</div>
 <p>Before Stripe existed, accepting online payments was a nightmare. You had to get a "merchant account," deal with banks, pay monthly fees, build all kinds of security into your site. Now you sign up, verify your identity, and you're live in an afternoon.</p>
 <div class="divider"><span>The three things you need to know</span></div>
 <div class="callout"><div class="callout-tag">1. Products</div>The things you're selling. A one-time thing (a course, a template) or a subscription (monthly access to something). You create these in the Stripe dashboard.</div>
 <div class="callout"><div class="callout-tag">2. Prices</div>Each product has one or more prices attached to it. You can charge $39 one time. Or $10 a month. Or $100 a year. Stripe calls these "prices" and gives each one a unique ID.</div>
 <div class="callout"><div class="callout-tag">3. Checkout</div>The page where your customer enters their card info. Stripe gives you a pre-built, pretty, secure checkout page for free, you just tell it what price ID to charge.</div>
 <p>You build the site. Claude wires up the checkout. Money comes in. That's the whole model.</p>
 <figure class="diagram-figure">
 <svg class="diagram-svg" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="How Stripe money flow works: customer pays, Stripe handles it, money lands in your bank">
 <defs>
 <marker id="arr-stripe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0,0 L10,5 L0,10 z" fill="#c41f5a"/>
 </marker>
 </defs>
 <text x="340" y="24" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#888">HOW THE MONEY ACTUALLY GETS TO YOU</text>

 <!-- Customer -->
 <rect x="20" y="80" width="140" height="80" rx="12" fill="#fff1f5" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="90" y="116" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#c41f5a">your customer</text>
 <text x="90" y="136" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">types card info</text>

 <!-- arrow 1 -->
 <path d="M160 120 H 210" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr-stripe)"/>

 <!-- Stripe -->
 <rect x="215" y="80" width="160" height="80" rx="12" fill="#c41f5a" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="295" y="110" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#fff">Stripe</text>
 <text x="295" y="128" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#fff" opacity="0.85">charges the card,</text>
 <text x="295" y="142" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#fff" opacity="0.85">keeps 2.9% + 30&cent;</text>

 <!-- arrow 2 -->
 <path d="M375 120 H 425" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr-stripe)"/>

 <!-- Bank -->
 <rect x="430" y="80" width="200" height="80" rx="12" fill="#fff" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="530" y="110" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#c41f5a">your bank</text>
 <text x="530" y="128" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">money lands in</text>
 <text x="530" y="144" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#555">2-3 business days</text>

 <text x="340" y="195" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" fill="#888" font-style="italic">you never touch a credit card. you never store card info. Stripe does all of it.</text>
 </svg>
 </figure>
 <div class="exercise" data-exercise-id="ex-16a-stripe">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do it now · 10 min
 </div>
 <div class="exercise-title">Create a Stripe account.</div>
 <div class="exercise-body">Go to <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>stripe.com</strong></a>. Sign up with your email. Flip on <strong>Test mode</strong> (top right). Click <strong>Product catalog</strong> &rarr; <strong>Add product</strong>. Name it anything. Set a test price ($1 or $39, whatever). Save. <br><br>You just have the infrastructure to accept money. Cool.</div>
 <button class="exercise-done" data-exercise-id="ex-16a-stripe">I did it →</button>
 </div>
</div>`
 },
 {
 tag: '21 - Stripe Walkthrough', leftTitle: 'Actually setting it up. Step by step.', num: '21', vid: 'Lesson 21: Stripe setup walkthrough',
 html: `
 <h1 class="l-head">Let's actually wire up Stripe.</h1>
 <p class="l-sub">This is the exact same flow I used to set up payments for this course.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://stripe.com" target="_blank" rel="noopener noreferrer"><img src="/brands/stripe.svg" alt="" />Stripe</a></div>
 <ol class="steps">
 <li><div><strong>Go to <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" class="brand-link">stripe.com</a> and create an account.</strong> Sign up with your email. You'll need to verify your phone, then eventually enter your business info and bank account to actually get paid. You can skip the bank part while you're just testing.</div></li>
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
 <div class="exercise" data-exercise-id="ex-17a-checkout">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Build it now · 20 min
 </div>
 <div class="exercise-title">Add Stripe checkout to something.</div>
 <div class="exercise-body">In Claude Code, with a site open (doesn&rsquo;t matter what, even your HTML file from lesson 15), paste:<div class="q">Add a Stripe checkout button for my price_XXX. When clicked, go to Stripe&rsquo;s hosted page. Redirect to /thanks on success. Also set up the webhook.</div>When it asks for your keys, paste them. Walk through whatever it prompts. Test with card <strong>4242 4242 4242 4242</strong>. <br><br>You just built an actual payment flow.</div>
 <button class="exercise-done" data-exercise-id="ex-17a-checkout">I did it →</button>
 </div>
 <div class="stuck-callout">
 <div class="stuck-icon">
 <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21"/></svg>
 </div>
 <div class="stuck-body">
 <div class="stuck-title">Stuck? Just screenshot it.</div>
 <p>If anything on this page or your screen doesn&rsquo;t make sense, <strong>take a screenshot, paste it into Claude, and type &ldquo;help, explain this and tell me exactly what to do.&rdquo;</strong> Works every time. You don&rsquo;t have to understand the words on your screen, Claude does.</p>
 </div>
 </div>
</div>`
 },
 {
 tag: '22 - Your First Client', leftTitle: 'From zero to a paid invoice. The tactical version.', num: '22', vid: 'Lesson 22: How to actually get hired',
 html: `
 <h1 class="l-head">How to find your first paying client.</h1>
 <p class="l-sub">The actual tactics, not the LinkedIn platitudes.</p>
 <div class="l-body">
 <p>Most tutorials are vague on this. &ldquo;Network!&rdquo; &ldquo;Post on social media!&rdquo; Cool. I&rsquo;ll be specific.</p>
 <p>First, know <strong>what you&rsquo;re selling.</strong> You don&rsquo;t need to be an &ldquo;AI consultant.&rdquo; You need <strong>one specific thing a specific person will pay for.</strong> Here are things students have actually sold:</p>
 <ul>
 <li><strong>Websites for local businesses</strong> without one ($500 to $2,500 each)</li>
 <li><strong>Personal portfolio sites</strong> for people in creative fields ($200 to $800)</li>
 <li><strong>Automated cold outreach systems</strong> for sales teams ($1,500 to $5,000)</li>
 <li><strong>Content generators</strong> for creators who post daily ($300 to $1,200 a month)</li>
 <li><strong>Proposal factories</strong> for agencies who write a lot of proposals ($800 to $2,500)</li>
 <li><strong>Booking / scheduling automations</strong> for service businesses</li>
 <li><strong>Lead lists</strong> scraped + enriched for early-stage startups ($500 to $2,000)</li>
 <li><strong>Internal AI dashboards</strong> (trackers, pipelines) for small teams</li>
 <li><strong>Agent teams</strong> that run a whole function (outreach, support, content), premium pricing</li>
 </ul>
 <p>Pick one. Literally one. You can diversify later. Right now you need a clear answer when someone asks &ldquo;what do you do?&rdquo;</p>

 <div class="divider"><span>The three places I actually get clients</span></div>

 <div class="callout"><div class="callout-tag">1. Local businesses without websites</div>Google Maps your city for [type of business]. Filter for ones without websites listed. Walk in, DM, or email the owner. Script: &ldquo;Hi, I build small websites for businesses like yours in [city]. Most of my clients pay around $[X]. Want one?&rdquo; Do this 60 times. At least three say yes.</div>

 <div class="callout"><div class="callout-tag">2. Instagram DMs to creators</div>Find creators (20k-200k followers) whose vibe you like. Look for the ones <strong>without sponsorships yet</strong> or with outdated media kits. Slide in with something specific: &ldquo;Saw your last 3 posts, your vibe is [X]. I built a tool that does [Y] in your exact style. Want to see it?&rdquo; Show, don&rsquo;t pitch.</div>

 <div class="callout"><div class="callout-tag">3. Your own network</div>You have more contacts than you think. Post one thing on Instagram: &ldquo;Taking 3 clients this month to build [specific thing] for $[X]. DM me.&rdquo; Tag nobody. Let it breathe. Somebody in your circle has been waiting for exactly this.</div>

 <p>My first paying client came from option 3. <strong>$400 to build her a personal website.</strong> That was it. Then she told two friends. Then I raised my prices. That&rsquo;s the whole arc.</p>

 <div class="callout"><div class="callout-tag">The one rule</div>Don&rsquo;t undersell. Your first client sets your pricing anchor. Pick a number that feels <em>slightly</em> uncomfortable. That&rsquo;s the right price.</div>

 <div class="exercise" data-exercise-id="ex-22-outreach">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do it today &middot; 15 min
 </div>
 <div class="exercise-title">Send one outreach message.</div>
 <div class="exercise-body">Pick ONE of the three channels above. Write to ONE person. Use this prompt to draft it: <div class="q">Draft a 3-sentence outreach message to a [local business / creator / person in my network] offering to build them [X]. Specific, warm, no buzzwords. Pricing: $[number]. Use my real voice, casual, lowercase.</div> Paste Claude&rsquo;s draft. Tweak one line so it sounds like you. Send it. That&rsquo;s the exercise.</div>
 <button class="exercise-done" data-exercise-id="ex-22-outreach">I sent it &rarr;</button>
 </div>
 </div>`
 },
 {
 tag: '23 - Proposal vs Contract', leftTitle: 'Two different documents. Both matter.', num: '23', vid: 'Lesson 23: Closing the deal properly',
 html: `
 <h1 class="l-head">Proposal vs. contract.</h1>
 <p class="l-sub">People confuse these constantly. They do totally different things.</p>
 <div class="l-body">
 <p>When you&rsquo;re about to work with a client, there are two documents flying around. Most beginners only do one and get burned. Do both.</p>

 <div class="callout"><div class="callout-tag">The Proposal</div><strong>A sales document.</strong> You send it <em>before</em> they say yes. It explains what you&rsquo;ll do, when, for how much. Its job is to close the deal. It&rsquo;s allowed to be pretty. It&rsquo;s allowed to talk about why you&rsquo;re the right person. Think of it as your pitch in written form. It&rsquo;s not legally binding.</div>

 <div class="callout"><div class="callout-tag">The Contract</div><strong>A legal document.</strong> You send it <em>after</em> they say yes, before any work starts. It protects both of you. Payment terms, cancellation, what happens if scope changes, who owns the final work, what happens if one of you ghosts. Boring by design. It is legally binding.</div>

 <p>Order: <strong>proposal closes the deal. Contract protects the deal.</strong> You need both.</p>

 <div class="divider"><span>What to put in the proposal</span></div>
 <ul>
 <li><strong>One-line summary</strong>, what you&rsquo;re building, in plain English</li>
 <li><strong>Scope</strong>, what&rsquo;s included and (crucial) what&rsquo;s NOT included</li>
 <li><strong>Timeline</strong>, realistic, with a little buffer</li>
 <li><strong>Price</strong>, fixed amount or hourly rate + estimated hours</li>
 <li><strong>Deliverables</strong>, bullet list of what they&rsquo;ll actually receive</li>
 <li><strong>Why me</strong>, one paragraph. Don&rsquo;t oversell.</li>
 <li><strong>Next steps</strong>, &ldquo;reply if this looks right and I&rsquo;ll send the contract + invoice.&rdquo;</li>
 </ul>

 <div class="divider"><span>What to put in the contract</span></div>
 <ul>
 <li><strong>Names &amp; dates</strong> (you, them, start, end)</li>
 <li><strong>Payment schedule</strong> (50% upfront, 50% on delivery is standard)</li>
 <li><strong>What happens if they change the scope</strong> (my rule: &ldquo;1 round of revisions included, additional revisions billed at $X&rdquo;)</li>
 <li><strong>What happens if they cancel</strong> (deposit non-refundable, remaining work billed pro rata)</li>
 <li><strong>Who owns the final work</strong> (usually them, once paid in full)</li>
 <li><strong>How disputes get handled</strong> (one round of good-faith discussion, then mediation)</li>
 </ul>

 <div class="callout"><div class="callout-tag">The easy way</div>Tell Claude:<div class="q">Write me a freelance proposal for [project] and a matching contract. Use $[X] total, [timeline], and these deliverables: [list]. Warm tone, not legalese on the proposal, clear on the contract.</div>Two docs in 60 seconds. Edit the parts that don&rsquo;t sound like you.</div>

 <p>One real tip: <strong>put the price in the proposal, not just the contract.</strong> A surprising number of deals die because the price was buried. Show it confidently on page 1. You&rsquo;re not embarrassed, they shouldn&rsquo;t be either.</p>
 </div>`
 },
 {
 tag: '24 - Agents', leftTitle: 'Agents. The thing that makes this go from a tool to a business.', num: '24', vid: 'Lesson 24: What agents are',
 html: `
 <h1 class="l-head">Agents: Claude doing things on its own.</h1>
 <p class="l-sub">Everything in this course was the foundation. Here's where it gets actually wild.</p>
 <div class="l-body">
 <div class="tools-strip"><span class="tools-strip-label">In this lesson</span><a class="tool-pill" href="https://claude.ai" target="_blank" rel="noopener noreferrer"><img src="/brands/claude.svg" alt="" />Claude</a><a class="tool-pill" href="https://telegram.org" target="_blank" rel="noopener noreferrer"><img src="/brands/telegram.svg" alt="" />Telegram</a><a class="tool-pill" href="https://anthropic.com" target="_blank" rel="noopener noreferrer"><img src="/brands/anthropic.svg" alt="" />Anthropic API</a></div>
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

 <div class="divider"><span>How I actually come up with agent ideas</span></div>

 <p>Every agent I've built started the same way. I noticed I was doing the exact same annoying task over and over. Writing the same email. Checking the same sites. Tracking the same thing in a spreadsheet. <strong>That's the signal. If you do it more than twice a week, it's agent territory.</strong></p>

 <p>From there I don't try to figure out the plan myself. I just open Claude and brain-dump it:</p>

 <div class="chat-ex"><div class="bubble u">i keep doing [the annoying thing] manually and it's eating my time. help me think through whether this could be an agent. walk me through what it would need to do, what apps it would need to connect to, and what could go wrong. ask me clarifying questions first.</div></div>

 <p>Claude turns into my co-founder for the next hour. It asks questions I wouldn't have thought of. It breaks the task into steps. It tells me which steps can be fully automated and which ones I'd need to keep doing myself. <strong>By the end of the chat I have a full spec</strong>, the order of operations, the integrations needed, the edge cases.</p>

 <p>Only then do I build. I just paste back to Claude:</p>

 <div class="chat-ex"><div class="bubble u">okay build me this agent. set up the API keys we need, write the code, and make it run every morning at 8am. walk me through each step as you go and ask me for any keys when you need them.</div></div>

 <p>That's literally it. Claude writes the whole thing. I paste API keys when it asks, fix errors when they pop up (by screenshotting them back into Claude), and <strong>watch the agent start running while I do something else.</strong></p>

 <div class="callout"><div class="callout-tag">The real trick</div>Don&rsquo;t try to design the agent in your head first. You&rsquo;ll get stuck. Describe the annoying task in plain English, let Claude interview you, and the agent design falls out of the conversation. <strong>You don&rsquo;t design agents. You describe problems.</strong></div>

 <p>A few agents I&rsquo;ve built this way, just so you can see the range:</p>
 <ul>
 <li><strong>Cold outreach system</strong>, finds local businesses without websites, builds each one a preview site, and sends a personalized cold email every morning. Replies land in my Gmail. I just hit send on the ones I like.</li>
 <li><strong>Prospect tracker</strong>, watches a Google Sheet of leads, re-scores them every night based on replies, moves them between stages, and pings me if a hot one goes cold.</li>
 <li><strong>Content caption agent</strong>, reads my drafts folder, writes three caption options per video in my voice, and drops them into a doc for me to pick.</li>
 </ul>
 <p>None of these took more than a weekend. None of them required me to know what I was doing. <strong>Just me, Claude, and a clear description of what was annoying me.</strong></p>

 <div class="divider"><span>Meet Elle, my personal agent</span></div>

 <p>Before I show you my whole team, I want to zoom in on one agent specifically: <strong>Elle.</strong> She&rsquo;s my personal assistant agent and the one I talk to the most. If you take nothing else from this lesson, take this: <em>you should have an Elle.</em></p>

 <div class="callout"><div class="callout-tag">Why I named her Elle Woods</div>I named her after Elle from Legally Blonde on purpose. Elle is what I want my assistant agent to be, warm, relentless, underestimated, and actually good at the job. She&rsquo;s not a robot checking off tasks. She&rsquo;s a team member who speaks in my voice, handles the boring stuff, and keeps me sane. Also, naming her matters. I know it sounds dumb, but you talk to her differently when she&rsquo;s Elle than when she&rsquo;s &ldquo;assistant.&rdquo; The name pulls a personality out of her.</div>

 <p>What Elle actually does every day:</p>
 <ul>
 <li><strong>Morning brief at 8:10am.</strong> She pings me in Telegram with everything that happened overnight, which client replies came in, which automated tasks completed, what errored, what needs my eyes first. So I wake up and instead of opening 9 apps, I open Telegram and read one message from Elle.</li>
 <li><strong>Error triage.</strong> When any of my other agents break, Elle is the first to know. She screenshots the error, tags the right fixer (usually Gabriella), and tells me whether I can ignore it or need to jump in.</li>
 <li><strong>Status on demand.</strong> I can text her anytime: &ldquo;how&rsquo;s the pipeline,&rdquo; &ldquo;any client replies today,&rdquo; &ldquo;did the cron run,&rdquo; &ldquo;summarize the week.&rdquo; She answers in 10 seconds. That&rsquo;s what I mean by &ldquo;personal agent&rdquo;, she&rsquo;s the front door to everything else.</li>
 <li><strong>Free-text help.</strong> I can also just vent to her. &ldquo;Elle I&rsquo;m stressed about X what should I do.&rdquo; Because I gave her context about my business, she gives actually useful answers.</li>
 </ul>

 <p>Under the hood Elle&rsquo;s pretty simple. She uses Claude&rsquo;s API to think and a Telegram bot to talk, you set it up once and basically never touch it again.</p>

 <div class="a-quote">&ldquo;Elle is the one you build first. She&rsquo;s the command center. Everything else is just another teammate she introduces to you.&rdquo;</div>

 <div class="divider"><span>What my first real agent team looked like</span></div>

 <p>About two weeks into learning Claude, I built a whole <strong>team</strong> around Elle for my web-design business. Each one has a specific job. They talk to each other, they report through Elle. Here&rsquo;s who they are:</p>

 <figure class="diagram-figure">
 <svg class="diagram-svg" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Agent team hierarchy: you talk to Elle, Elle talks to everyone else">
 <defs>
 <marker id="arr-team" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0,0 L10,5 L0,10 z" fill="#c41f5a"/>
 </marker>
 </defs>
 <text x="340" y="22" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#888">YOU TALK TO ELLE. ELLE TALKS TO EVERYONE ELSE.</text>

 <!-- YOU -->
 <rect x="280" y="42" width="120" height="44" rx="22" fill="#c41f5a"/>
 <text x="340" y="69" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#fff">you</text>

 <!-- arrow down to Elle -->
 <path d="M340 86 V 110" fill="none" stroke="#c41f5a" stroke-width="1.5" marker-end="url(#arr-team)"/>

 <!-- ELLE -->
 <rect x="265" y="114" width="150" height="50" rx="12" fill="#fff1f5" stroke="#c41f5a" stroke-width="1.5"/>
 <text x="340" y="138" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="13" font-weight="600" fill="#c41f5a">Elle</text>
 <text x="340" y="154" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">chief of staff</text>

 <!-- arrows to specialists -->
 <path d="M290 164 Q 160 190, 90 215" fill="none" stroke="#c41f5a" stroke-width="1.2" marker-end="url(#arr-team)"/>
 <path d="M310 164 Q 240 190, 215 215" fill="none" stroke="#c41f5a" stroke-width="1.2" marker-end="url(#arr-team)"/>
 <path d="M340 164 V 215" fill="none" stroke="#c41f5a" stroke-width="1.2" marker-end="url(#arr-team)"/>
 <path d="M370 164 Q 440 190, 465 215" fill="none" stroke="#c41f5a" stroke-width="1.2" marker-end="url(#arr-team)"/>
 <path d="M390 164 Q 520 190, 590 215" fill="none" stroke="#c41f5a" stroke-width="1.2" marker-end="url(#arr-team)"/>

 <!-- specialist boxes -->
 <rect x="20" y="218" width="140" height="44" rx="10" fill="#fff" stroke="#c41f5a" stroke-width="1"/>
 <text x="90" y="238" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" font-weight="600" fill="#c41f5a">Troy</text>
 <text x="90" y="252" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">orchestrator</text>

 <rect x="170" y="218" width="130" height="44" rx="10" fill="#fff" stroke="#c41f5a" stroke-width="1"/>
 <text x="235" y="238" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" font-weight="600" fill="#c41f5a">Gabriella</text>
 <text x="235" y="252" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">error fixer</text>

 <rect x="308" y="218" width="110" height="44" rx="10" fill="#fff" stroke="#c41f5a" stroke-width="1"/>
 <text x="363" y="238" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" font-weight="600" fill="#c41f5a">Sharpay</text>
 <text x="363" y="252" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">aesthetic QA</text>

 <rect x="428" y="218" width="130" height="44" rx="10" fill="#fff" stroke="#c41f5a" stroke-width="1"/>
 <text x="493" y="238" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" font-weight="600" fill="#c41f5a">Barney</text>
 <text x="493" y="252" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">lead gen</text>

 <rect x="568" y="218" width="90" height="44" rx="10" fill="#fff" stroke="#c41f5a" stroke-width="1"/>
 <text x="613" y="238" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="11" font-weight="600" fill="#c41f5a">Chad</text>
 <text x="613" y="252" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" fill="#888">deploy</text>
 </svg>
 </figure>


 <div class="agent-team">
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">E</div><div><div class="agent-name">Elle</div><div class="agent-meta">Legally Blonde &middot; Chief of Staff</div></div></div><div class="agent-quote">&ldquo;Good morning. Two things resolved overnight. Three items need your eyes. What do you want first?&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">S</div><div><div class="agent-name">Sharpay</div><div class="agent-meta">HSM &middot; Aesthetic QA</div></div></div><div class="agent-quote">&ldquo;Rejected. The font pairing is giving budget PowerPoint. This is not going live. Do not show me this again until it&rsquo;s fixed.&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">G</div><div><div class="agent-name">Gabriella</div><div class="agent-meta">HSM &middot; Error Fixer</div></div></div><div class="agent-quote">&ldquo;288KB of base64 image data was getting crammed into every prompt. The drop logic thought it was removing them. Patched.&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">C</div><div><div class="agent-name">Chad</div><div class="agent-meta">HSM &middot; Deploy</div></div></div><div class="agent-quote">&ldquo;On it. Sites 2, 4, 5 deploying now. All live. Site 3 had a build timeout, flagged for Gabriella.&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">T</div><div><div class="agent-name">Taylor</div><div class="agent-meta">HSM &middot; Review &amp; Taste</div></div></div><div class="agent-quote">&ldquo;4 sites ready. I&rsquo;d approve #2 and #5, both polished. #1 borderline. #4 reject. Want me to auto-approve the good ones?&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">L</div><div><div class="agent-name">Lily</div><div class="agent-meta">HIMYM &middot; Client Intel</div></div></div><div class="agent-quote">&ldquo;Johnson brief: frequents certain local spots. Recent life events noted. Vibe: warm, modern, neighborhood-rooted. Lead with walkability.&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">B</div><div><div class="agent-name">Barney</div><div class="agent-meta">HIMYM &middot; Lead Gen</div></div></div><div class="agent-quote">&ldquo;12 outreach emails sent, 3 opened, 1 replied. The Garcias want a call. Flagged Ted to prep the brief. Legendary.&rdquo;</div></div>
 <div class="agent-card"><div class="agent-head"><div class="agent-avatar">T</div><div><div class="agent-name">Troy</div><div class="agent-meta">HSM &middot; Orchestrator</div></div></div><div class="agent-quote">&ldquo;Pipeline: 6 sites generated. Sharpay approved 4, rejected 2. Gabriella fixed a font import bug. Taylor has 4 queued. Chad is holding for your call.&rdquo;</div></div>
 </div>

 <p class="agent-footnote"><em>Yes I named them after Legally Blonde, High School Musical, and How I Met Your Mother characters. Yes it&rsquo;s on brand. No I won&rsquo;t apologize.</em></p>

 <figure class="agent-team-photo">
 <img src="/agent-team.jpg" alt="My actual agent lineup with each agent's name, role, and a one-liner that's true to how they actually work" />
 <figcaption>My actual agent lineup. Each one has a job, a personality, and a one-liner you&rsquo;d recognize from the kind of message they&rsquo;d send me.</figcaption>
 </figure>

 <div class="divider"><span>How agents actually talk to you</span></div>

 <p>The question I get the most once someone understands agents: <em>&ldquo;so once it&rsquo;s running, how do I know what it did?&rdquo;</em></p>

 <p><a href="https://telegram.org" target="_blank" rel="noopener noreferrer" class="brand-link"><strong>Telegram.</strong></a> You set up a Telegram bot, give the bot&rsquo;s token to your agents, and they start messaging you from inside Telegram like a real contact. You can message them back. I can literally text Elle &ldquo;how&rsquo;s the pipeline today?&rdquo; and she replies with a status in seconds.</p>

 <p>Telegram is the secret weapon because it&rsquo;s <strong>free, instant, and handles anything</strong>: text, images, files, voice notes. Plus no character limit, and you can reply from your phone at any hour. Email works too but clogs up your inbox and feels slower.</p>

 <div class="callout"><div class="callout-tag">Wait, what is Telegram?</div>Quick context in case you&rsquo;ve never used it: Telegram is basically iMessage / WhatsApp, but free on every platform and it lets <strong>bots</strong> live inside your chat list like real people. Install the Telegram app, make an account, and now any agent you build can text you there. It&rsquo;s the same chat list that has your friends, except Elle is in it too. That&rsquo;s all.</div>

 <div class="divider"><span>How to actually set up Telegram for your agents</span></div>
 <ol>
 <li><strong>Install Telegram.</strong> Download the app on your phone + laptop. Sign up with your phone number.</li>
 <li><strong>Find @BotFather inside Telegram.</strong> Search &ldquo;BotFather&rdquo; in Telegram. It&rsquo;s the official bot-creator bot (yes, a bot that makes bots, very Claude-coded of them).</li>
 <li><strong>Send <code>/newbot</code> to BotFather.</strong> It&rsquo;ll ask you what to name your bot and what username to give it. I named mine &ldquo;Elle&rdquo; with the handle <code>@ayla_elle_bot</code>.</li>
 <li><strong>Copy the token it gives you.</strong> Looks like <code>123456789:ABC-DEF1234ghIkl...</code>. Don&rsquo;t share this token anywhere public, it&rsquo;s the password to your bot. Save it in a password manager or a <code>.env</code> file.</li>
 <li><strong>Get your chat ID.</strong> Tell Claude:<div class="q">I just made a Telegram bot, walk me through getting my chat ID so the bot knows where to message me.</div>It&rsquo;ll give you a little curl command that returns your chat ID. Save that too.</li>
 <li><strong>Give Claude the token and chat ID</strong> when you&rsquo;re building an agent, and tell it: &ldquo;every time something important happens, have the bot send me a message.&rdquo; Claude does the rest.</li>
 </ol>

 <div class="callout"><div class="callout-tag">Why this specifically, and not Slack / email / texting</div>Telegram bots are the easiest integration of anything I&rsquo;ve tried. No approval process, no marketplace, no rate limit for personal use, no cost. You set one up in under 10 minutes. Slack bots require a whole app setup. iMessage is Apple-only and locked down. Email gets marked as spam. Telegram just &hellip; works.</div>

 <div class="divider"><span>Making it actually run 24/7</span></div>

 <p>This is the part most tutorials skip. When Claude Code builds you an agent, <strong>by default it only runs while your laptop is open and online.</strong> Close the lid, agent stops. Which defeats the point.</p>

 <p>To make an agent run truly 24/7 you have to <strong>host it in the cloud</strong>, the same way you host a website. A few options:</p>
 <ul>
 <li><strong>Nanoclaw.</strong> What I use. A hosted Claude runtime specifically designed for agents. You drop your agent in, it runs on their servers, you pay a small monthly fee, and you never think about it. Closest thing to &ldquo;it just works.&rdquo;</li>
 <li><strong>Vercel Cron Jobs.</strong> Free for scheduled tasks (like &ldquo;run every morning at 8am&rdquo;). Limited to short runs, but fine for simple agents.</li>
 <li><strong>Railway / Render / Replit.</strong> Cheap Linux servers you can rent for a few bucks a month. More flexible, but you&rsquo;ll deal with setup pain.</li>
 </ul>

 <p>Whichever you pick, <strong>the setup process is the same</strong>: you tell Claude &ldquo;deploy this agent to [the service]&rdquo; and it walks you through adding the keys, pushing the code, and scheduling it.</p>

 <div class="callout"><div class="callout-tag">Real talk: agents are the hardest part of this course</div>
 <strong>I&rsquo;m going to be honest with you.</strong> This is the hardest thing in the course, and it&rsquo;s the one part I genuinely can&rsquo;t fully walk you through step-by-step. <strong>Building agents is mostly trial and error with Claude.</strong> The more time you spend with Claude, the more you get a feel for HOW to explain what you want building, and at some point you just&hellip; figure it out. There&rsquo;s no perfect script for it.
 <br><br>
 What I CAN tell you is what to expect. Expect to spend a full weekend on your first agent. Expect &ldquo;invalid API key&rdquo; to haunt you. Expect to screenshot 40 error messages back into Claude. Expect to add an API, hit a rate limit, fix it, add another, realize you forgot a dependency, and start over. None of that means you&rsquo;re bad at this. That IS the process.
 <br><br>
 <strong>The good news:</strong> the process is still the same thing you&rsquo;ve been doing this whole course. You describe the annoying problem. You let Claude interview you. You build one piece at a time. You screenshot errors back. You keep going. Eventually it works, and you have a tiny employee working for you forever.
 <br><br>
 The difference between agents and websites is just <em>more pieces, more things that can break, more patience.</em> <strong>Not more skill. You already have the skill.</strong>
 </div>

 <div class="callout"><div class="callout-tag">You&rsquo;re done. Go build something.</div>Open a new chat. Type &ldquo;I want to build [your idea]. Ask me any clarifying questions before we start.&rdquo; That&rsquo;s literally it. That&rsquo;s the whole thing. Go.</div>
 </div>`
 },
 {
 tag: '25 - Claude on My Phone', leftTitle: 'The mobile workflow almost nobody uses.', num: '25', vid: 'Lesson 25: Claude from your phone',
 html: `
 <h1 class="l-head">How I use Claude on my phone.</h1>
 <p class="l-sub">Half my best work happens when I&rsquo;m not at my desk.</p>
 <div class="l-body">
 <p>Everybody thinks AI work requires a laptop. It doesn&rsquo;t. Most of what I do day-to-day happens on my phone. I think it&rsquo;s actually <em>better</em> this way: you&rsquo;re forced to think in plain English instead of fiddling with code.</p>

 <div class="callout"><div class="callout-tag">The Claude mobile app</div>Download it from the App Store. Same account, same chats, same Projects. Everything syncs in real time. I&rsquo;ll start a thought on my phone in an Uber and pick it up on my laptop at home.</div>

 <div class="callout"><div class="callout-tag">Important, the phone app is CHAT ONLY</div>Quick clarification because this trips people up: <strong>the Claude app on your phone is just chat.</strong> Regular conversations, voice, image uploads, photos, all that works. But the thing we call <em>Claude Code</em> (the terminal-based builder from lessons 14 and 17) <strong>does not exist on phone.</strong> Claude Code is desktop only. It has to be, it needs a terminal and a file system. So on your phone: chat for thinking, brainstorming, and quick builds. On your laptop: chat + Claude Code for actually shipping stuff. Both are &ldquo;Claude,&rdquo; same account, different tools.</div>

 <div class="callout"><div class="callout-tag">Voice dictation is the superpower</div>I talk to Claude way more than I type to it. Tap the mic, explain the problem out loud like you&rsquo;re venting to a friend, hit send. I&rsquo;ve ranted at it about business strategy while walking to coffee. I&rsquo;ve explained a whole agent idea in a 3-minute voice note. <strong>Your phone mic is a better brain-dumper than your keyboard.</strong></div>

 <div class="callout"><div class="callout-tag">Photograph anything and ask about it</div>Receipt I don&rsquo;t understand? Take a picture, send to Claude, &ldquo;break this down.&rdquo; Weird error on my laptop? Phone picture of the screen, &ldquo;what do I do?&rdquo; A sign in a foreign language? Same. A plant I&rsquo;m not sure how to take care of? Same. The photo &rarr; Claude habit alone is worth the monthly fee.</div>

 <div class="callout"><div class="callout-tag">Texting my agents from Telegram</div>My agents live in Telegram (we covered this in lesson 24). That means I can <strong>text them from anywhere.</strong> I&rsquo;ve sent Elle a status request from my bed, from the Uber, from the bathroom. She replies in 10 seconds. Nobody would know I&rsquo;m not at a desk running a business.</div>

 <p>The phone is an underrated tool. <strong>If you can only use Claude on a laptop, you&rsquo;re missing half of what it can do for you.</strong></p>
 </div>`
 },
 {
 tag: '26 - Day in My Life', leftTitle: 'What a chaotic AI life actually looks like.', num: '26', vid: 'Lesson 26: A real schedule',
 html: `
 <h1 class="l-head">A day in my AI life.</h1>
 <p class="l-sub">I live a chaotic life. I&rsquo;m not going to pretend otherwise.</p>
 <div class="l-body">
 <p>I get asked &ldquo;what does your day actually look like?&rdquo; all the time. Truth: it&rsquo;s messy. There&rsquo;s no perfect 9-to-5 grid. But there are <strong>shapes</strong> to my day, the moves I make over and over no matter what time it is.</p>

 <div class="callout"><div class="callout-tag">First thing I do</div>Open Telegram. My agents have been running overnight. Whatever they flagged is the first thing I actually look at, before email, before social, before coffee. That&rsquo;s the morning brief.</div>

 <div class="callout"><div class="callout-tag">My best build hours</div>I do real building in long, uninterrupted chunks. Phone face-down, Telegram muted, no tabs open except Claude Code and the thing I&rsquo;m making. One site, one agent, one problem at a time. This is where the money actually gets made.</div>

 <div class="callout"><div class="callout-tag">Client + prospect calls happen on the move</div>Sometimes Zoom, sometimes in person. I take live notes into a Claude chat on my phone, then ask Claude to &ldquo;turn this into a proposal&rdquo; or &ldquo;pull out the three things I agreed to do&rdquo; right after.</div>

 <div class="callout"><div class="callout-tag">The chaos block</div>There is always a part of every day where the plan goes out the window. A client texts something urgent, I get a new idea, a TikTok takes off or doesn&rsquo;t, friends want to grab dinner. I do most of my best-feeling work in this chunk, from my phone, while I&rsquo;m not at my desk.</div>

 <div class="callout"><div class="callout-tag">Agent check-in</div>End of day, I read what each agent did. Approve, reject, comment back, fix what didn&rsquo;t work. They don&rsquo;t need micromanaging. They just need someone to read the report.</div>

 <div class="callout"><div class="callout-tag">&ldquo;I&rsquo;ll just tweak one thing&rdquo;</div>This is how I end up working until 2 AM way more nights than I should. We covered this in the welcome warning. It&rsquo;s still happening.</div>

 <p><strong>The shape of the day is: chaotic human, steady agents.</strong> I&rsquo;m messy. My agents are not. Together we ship. That&rsquo;s the whole system.</p>
 </div>`
 },
 {
 tag: '27 - Favorite Mistakes', leftTitle: "Things I screwed up so you don't have to.", num: '27', vid: 'Lesson 27: My favorite mistakes',
 html: `
 <h1 class="l-head">My favorite mistakes.</h1>
 <p class="l-sub">These are the stories I&rsquo;d tell you at dinner if you asked how I learned.</p>
 <div class="l-body">
 <p>Neither of these broke me. Both taught me something more useful than a tutorial could.</p>

 <div class="callout"><div class="callout-tag">1. The morning the container deleted everything</div>I woke up one morning and the iMac container running my entire agent setup had wiped itself. Code, configs, scheduled tasks, everything. <strong>I flipped out.</strong> I cried for real. I thought months of work was gone.<br><br>Then I opened Claude and scrolled through the chat history. Because <em>every piece of that system had been built in conversation with Claude,</em> the logic, the decisions, the API connections, the edge cases, were all in there. I said: &ldquo;rebuild everything we had, you have the context.&rdquo; Three hours later it was running again.<br><br><strong>Lesson: your conversations with Claude are a backup. But actually back up your code too.</strong> Push to GitHub every single day. It&rsquo;s free. Do it.</div>

 <div class="callout"><div class="callout-tag">2. Tried to build the whole agent team on day one</div>My first agent attempt was going to be a full pipeline: scrape, qualify, outreach, reply-handle, nurture, close. All day one. It crashed constantly. Nothing worked. I got so frustrated I almost quit.<br><br>Then I deleted everything, built ONE agent that just sent cold emails. It worked in an hour. Then I added the scraper. Then the reply handler. One piece at a time.<br><br><strong>Lesson: build one thing. Get it working. Add the next. Don&rsquo;t design the Death Star on day one.</strong></div>

 <p>Both of these became the stories. Every one of them made me slightly better. <strong>Yours will too.</strong></p>
 <div class="exercise" data-exercise-id="ex-27-backup">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Do it now &middot; 2 min
 </div>
 <div class="exercise-title">Back up your thing, right now.</div>
 <div class="exercise-body">Whatever you&rsquo;re currently building with Claude, <strong>push it to GitHub today.</strong> If it&rsquo;s a website, the whole folder. If it&rsquo;s a set of prompts, save them in a Google Doc. If it&rsquo;s a conversation you&rsquo;d hate to lose, export the chat. <br><br>Two minutes. You won&rsquo;t feel it now. You&rsquo;ll feel it the day something wipes.</div>
 <button class="exercise-done" data-exercise-id="ex-27-backup">I did it &rarr;</button>
 </div>
 </div>`
 },
 {
 tag: '28 - My Top Prompts', leftTitle: 'The 10 prompts I actually paste every single day.', num: '28', vid: 'Lesson 28: My daily driver prompts',
 html: `
 <h1 class="l-head">My top 10 prompts, ranked.</h1>
 <p class="l-sub">If the prompt library is the menu, these are what I actually order.</p>
 <div class="l-body">
 <p>You&rsquo;ve already seen the full prompt library in the top nav. These are the 10 I keep coming back to. Copy them, paste them, swap the brackets, use them daily.</p>

 <div class="callout"><div class="callout-tag">#1, The clarifying-questions opener</div><div class="bubble u">I want to build [your thing]. Ask me any clarifying questions before you start so we don&rsquo;t build the wrong thing.</div>This is the single most important one. Forever. Every project.</div>

 <div class="callout"><div class="callout-tag">#2, The &ldquo;explain like I&rsquo;m in 8th grade&rdquo; reset</div><div class="bubble u">I don&rsquo;t understand any of this. Explain it like I&rsquo;m in 8th grade. Use an analogy if you can.</div>I use this every time something sounds smart and I&rsquo;m quietly lost.</div>

 <div class="callout"><div class="callout-tag">#3, The voice-match prompt</div><div class="bubble u">Here are 10 real captions/emails/posts I wrote. Match my voice. Don&rsquo;t generic-ify me.</div>Pasting real samples is the only way to get actual-you output instead of AI-ish output.</div>

 <div class="callout"><div class="callout-tag">#4, The &ldquo;stop&rdquo; reset</div><div class="bubble u">Stop. Re-read what I originally asked. You&rsquo;re doing something I didn&rsquo;t ask for. Here&rsquo;s what I actually need: [one sentence]. Do only that.</div>When Claude is off the rails, this pulls it back faster than anything.</div>

 <div class="callout"><div class="callout-tag">#5, The interview-me prompt</div><div class="bubble u">Interview me. One question at a time. After 8 questions, give me a plan.</div>Anywhere I&rsquo;m stuck on deciding what to build or pitch, this one wins.</div>

 <div class="callout"><div class="callout-tag">#6, The &ldquo;make it feel expensive&rdquo; design prompt</div><div class="bubble u">Redo this. Make it feel expensive. Better fonts, real color palette, actual hierarchy, subtle animations. Mobile-first.</div>Magic phrase. Works way better than &ldquo;make it nicer.&rdquo;</div>

 <div class="callout"><div class="callout-tag">#7, The &ldquo;don&rsquo;t rewrite my whole site&rdquo; guard</div><div class="bubble u">Add [this feature] to my site. Don&rsquo;t rewrite the whole site. Hand me the new section and tell me exactly where to paste it.</div>Protects you from Claude &ldquo;helpfully&rdquo; changing 14 other things.</div>

 <div class="callout"><div class="callout-tag">#8, The &ldquo;what would you change&rdquo; critique</div><div class="bubble u">Here&rsquo;s [thing I made]. Pretend you&rsquo;re [target audience]. What&rsquo;s confusing? What&rsquo;s boring? What would make you close the tab?</div>Harsh feedback on demand. Always use &ldquo;pretend you&rsquo;re&rdquo; for honesty.</div>

 <div class="callout"><div class="callout-tag">#9, The cold-email rule set</div><div class="bubble u">Write a cold email to [person] offering [thing]. Under 120 words. Open with something specific, not &ldquo;I hope this finds you well.&rdquo; Don&rsquo;t use: leverage, solution, partner, synergy.</div>The banned-words trick is what stops your email from sounding like every cold email.</div>

 <div class="callout"><div class="callout-tag">#10, The &ldquo;do it for me&rdquo; command</div><div class="bubble u">Stop telling me to do it myself. You have the tools. Do it. If you really can&rsquo;t, explain why in one sentence.</div>Only works in Claude Code / Cowork / Chrome extension. Doesn&rsquo;t work in Chat. But when it works, it works.</div>

 <p>Pin these. Screenshot them. Memorize them. <strong>You don&rsquo;t need 500 prompts. You need 10 you actually use.</strong></p>

 <div class="exercise" data-exercise-id="ex-28-pickprompts">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now &middot; 3 min
 </div>
 <div class="exercise-title">Copy your three favorite prompts.</div>
 <div class="exercise-body">Scroll back up. Pick the <strong>three prompts</strong> that would make the biggest difference for what you&rsquo;re building right now. Copy them into a note on your phone, or into a pinned Claude chat called &ldquo;Daily prompts.&rdquo; Next time you sit down to work, paste one and go. That&rsquo;s how you actually internalize these, by using them on day one.</div>
 <button class="exercise-done" data-exercise-id="ex-28-pickprompts">I copied them &rarr;</button>
 </div>
 </div>`
 },
 {
 tag: '29 - Post While You Build', leftTitle: 'Nobody talks about this part. Post what you\u2019re building.', num: '29', vid: 'Lesson 29: Post while you build',
 html: `
 <h1 class="l-head">Post while you\u2019re building.</h1>
 <p class="l-sub">This is the unlock nobody tells you about. The reason you should post isn&rsquo;t ego. It&rsquo;s compounding.</p>
 <div class="l-body">
 <p>Here&rsquo;s a thing that nobody tells you when you start learning this stuff, and I wish someone had told me: <strong>post about what you&rsquo;re building as you&rsquo;re building it.</strong> Not when it&rsquo;s done. Not when it&rsquo;s perfect. While it&rsquo;s half-broken and you&rsquo;re figuring it out in real time.</p>

 <div class="a-quote">"The stuff I posted at the ugliest stage, when I had no idea what I was doing, is what got me my first three clients."</div>

 <h2 class="l-sub-head">Why posting changes everything (real talk).</h2>
 <p>I cannot overstate this. <strong>Posting about what I was building is the single biggest reason I got hired.</strong> Not my resume. Not my portfolio site. Not cold outreach. The TikToks I made at 11pm of me losing my mind at Claude.</p>

 <div class="callout"><div class="callout-tag">What actually happened to me</div>Within the first month of posting, I got: <strong>inbound DMs from two companies asking if I could build them agents.</strong> An email from a founder who ended up becoming a mentor.<br><br>(I&rsquo;m also still hoping a podcast invite shows up one day, that would be cool. Hasn&rsquo;t happened yet, but I&rsquo;m putting it out there.)<br><br>Every one of those things came from a post that took me 10 minutes to make. The ROI on posting is insane, and nobody talks about it enough.</div>

 <p>When you post what you&rsquo;re working on, a bunch of things happen at once:</p>
 <ul>
 <li><strong>Opportunities land in your DMs.</strong> Real ones. People asking you to build things for them. Post consistently for 30 days and something will land. I&rsquo;d bet money on it.</li>
 <li><strong>You attract the right people.</strong> Builders. Potential clients. Mentors. They find you <em>because</em> you&rsquo;re visibly the person making stuff. The algorithm does the matchmaking.</li>
 <li><strong>You get free feedback.</strong> Someone in the comments will tell you about a tool you didn&rsquo;t know existed. A bug in your demo. A use case you hadn&rsquo;t thought of. Basically free consulting.</li>
 <li><strong>You build a portfolio in public.</strong> Instead of a fake case-study deck, you have 40 TikToks of you actually doing the thing. A thousand times more credible than a resume.</li>
 <li><strong>It forces you to learn out loud.</strong> Explaining a thing on camera makes you understand it way better. The brain just works that way.</li>
 </ul>

 <h2 class="l-sub-head">The honest thing about the gap.</h2>
 <p>When I started posting about AI building, I noticed almost immediately: <strong>most of the loud public faces in this space look pretty similar.</strong> Mostly the same vibe, mostly the same demographic. Not all, but a lot.</p>
 <p>That&rsquo;s an opportunity, not a grievance. <strong>If you don&rsquo;t fit the standard tech-guy mold, the space is wide open for you.</strong> Whatever your background, if you&rsquo;re young, female, non-traditional, career-switching, whatever, post. Tag me. I&rsquo;ll re-share you. I want more variety up here.</p>
 <p>And if you do already fit the standard mold and you&rsquo;re here too: welcome. The course is for anyone who wants to actually build. The space gets better when all kinds of people show up in it.</p>

 <h2 class="l-sub-head">What to actually post.</h2>
 <div class="how-it-works">
 <div class="how-step">
 <div class="how-step-n">01</div>
 <div class="how-step-body">
 <h3>The &ldquo;I don\u2019t know what I&rsquo;m doing&rdquo; post.</h3>
 <p>Screen-record Claude making something for you. Voiceover: &ldquo;I&rsquo;m trying to build X, here\u2019s what&rsquo;s happening.&rdquo; That\u2019s a full post. Seriously.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">02</div>
 <div class="how-step-body">
 <h3>The before &#47; after.</h3>
 <p>Two screens: the prompt you gave, the thing Claude made. That&rsquo;s a TikTok. 15 seconds.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">03</div>
 <div class="how-step-body">
 <h3>The &ldquo;why I even did this&rdquo; post.</h3>
 <p>Talk about the problem before the solution. &ldquo;I was spending 2 hours a day on X. So I built a thing that does it for me.&rdquo; Problem-first posts do numbers.</p>
 </div>
 </div>
 <div class="how-step">
 <div class="how-step-n">04</div>
 <div class="how-step-body">
 <h3>The &ldquo;things I learned this week&rdquo; post.</h3>
 <p>Every Sunday. Three bullet points. What surprised you. What broke. What clicked. That\u2019s it.</p>
 </div>
 </div>
 </div>

 <div class="callout"><div class="callout-tag">Pro tip, let Claude write your TikTok scripts</div>After Claude builds something for you, paste this:<div class="q">Now write me a TikTok script explaining this in 45 seconds. Casual, no hashtags, first person.</div>It will. Then you just hit record. Same for captions, threads, LinkedIn posts, whatever platform you&rsquo;re on. The thing you just built is the content.</div>

 <div class="callout"><div class="callout-tag">How I actually edit them</div>I edit everything in <strong>CapCut</strong>, all my videos, overlays, cuts, and captions live there. Free app, way more than enough. You don&rsquo;t need premium. Throw the screen recording in, slap on auto-captions, drop in some text overlays for the punchline moments, cut the dead air. Done.</div>

 <h2 class="l-sub-head">The one rule.</h2>
 <p>Don\u2019t wait until you&rsquo;re &ldquo;ready.&rdquo; You will never be ready. The people you\u2019re watching online weren\u2019t ready either. They just posted before they were.</p>
 <p>Post this week. Tag me. <strong>@aylablumberg.ai on TikTok and IG.</strong> I&rsquo;ll see it.</p>

 <div class="exercise" data-exercise-id="ex-29-first-post">
 <div class="exercise-tag">
 <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
 Try it now \u00b7 10 min
 </div>
 <p><strong>Post one thing this week about what you&rsquo;re building.</strong> Doesn\u2019t have to be polished. A screen recording with a voiceover counts. A single photo of your laptop with a caption counts. Tag me. That&rsquo;s the whole exercise.</p>
 </div>
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
// CLIENT-MODE QUIZ, "what to build for OTHER people"
// (Opens via the second "Find a money idea" button later in the course.)
// ──────────────────────────────────────────────────────────
const clientQuizSteps: QuizStep[] = [
 {
 q: 'Who do you actually know in real life?', hint: 'Pick all that apply', multi: true, opts: [
 { l: 'Local businesses (salons, gyms, restaurants)', v: 'local' },
 { l: 'Real estate agents', v: 'realestate' },
 { l: 'Creators or influencers', v: 'creators' },
 { l: 'Coaches or consultants', v: 'coaches' },
 { l: 'Lawyers, doctors, dentists', v: 'pro' },
 { l: 'Friends with side hustles', v: 'friends' },
 { l: 'Designers or artists', v: 'designers' },
 { l: 'People who hate their current website', v: 'hatesite' },
 ],
 },
 {
 q: 'What do you actually want to charge?', hint: 'Pick the closest one', multi: false, opts: [
 { l: '$200–500 per project (testing the waters)', v: 'low' },
 { l: '$500–2,000 (real services)', v: 'mid' },
 { l: '$2,000–10,000 (agency-style packages)', v: 'high' },
 { l: '$300–2,000/month (monthly retainer)', v: 'retainer' },
 { l: 'I want recurring / passive money', v: 'passive' },
 ],
 },
 {
 q: 'How many hours a week can you actually put in?', hint: 'Be honest', multi: false, opts: [
 { l: '~5 hours, side hustle vibes', v: 'side' },
 { l: '10–20 hours, real second income', v: 'second' },
 { l: 'Full time, this is becoming my job', v: 'full' },
 ],
 },
 {
 q: 'What sounds most fun to make for someone?', hint: 'Pick one', multi: false, opts: [
 { l: 'Pretty websites people drool over', v: 'sites' },
 { l: 'Automations that handle the boring stuff', v: 'autos' },
 { l: 'Content / captions / posts in their voice', v: 'content' },
 { l: 'Dashboards and trackers', v: 'dashboards' },
 { l: 'Sales pages, checkout, payments', v: 'sales' },
 ],
 },
]

const clientIdeaPool: Idea[] = [
 { t: 'Local business websites ($500–$2k each)', d: "Walk into a restaurant, salon, or gym near you, ask if they'd want a new website, charge $500–$2,000. Build it in a weekend with Claude. Most local businesses still have ugly sites or none. The easiest first money you can make. I started here.", diff: 'Easiest', time: '1 weekend per site', sc: (i, p, g) => (i.includes('local') || i.includes('hatesite') ? 4 : 0) + (g === 'sites' ? 4 : 0) + (p === 'low' || p === 'mid' ? 2 : 0) },
 { t: "Real estate agent's listing site", d: "Real estate agents need pretty, fast, mobile-friendly listing sites and almost none of them have one. Build a template, swap photos and addresses per agent, charge $1,500 per site or a $300/month retainer.", diff: 'Beginner', time: '1–2 days', sc: (i, p, g) => (i.includes('realestate') ? 6 : 0) + (g === 'sites' ? 2 : 0) + (p === 'mid' || p === 'retainer' ? 2 : 0) },
 { t: 'Cold outreach system for a sales team', d: 'Build the outreach pipeline I use, but for someone else. Finds leads, personalizes emails, sends on schedule. Companies pay $1,500–$5,000 to set this up because it replaces a $60k/yr SDR.', diff: 'Intermediate', time: '3–5 days', sc: (i, p, g) => (i.includes('coaches') || i.includes('pro') ? 2 : 0) + (g === 'autos' ? 5 : 0) + (p === 'high' || p === 'mid' ? 3 : 0) },
 { t: "A creator's content-automation pack", d: 'Caption generator, comment-reply agent, hashtag tool, all in their voice. Sell it as a $500–$1,500 setup or a monthly subscription. Creators will pay because their time is the bottleneck.', diff: 'Intermediate', time: '2–4 days', sc: (i, p, g) => (i.includes('creators') ? 5 : 0) + (g === 'content' ? 4 : 0) + (p === 'retainer' || p === 'passive' ? 3 : 0) },
 { t: 'Booking + menu site for a restaurant', d: 'Online menu, OpenTable-style booking, simple "order ahead" flow with Stripe. $1,000–$3,000 each. Local food spots are dying for this and most owners are not doing it themselves.', diff: 'Intermediate', time: '3–5 days', sc: (i, p, g) => (i.includes('local') ? 4 : 0) + (g === 'sites' || g === 'sales' ? 3 : 0) + (p === 'mid' || p === 'high' ? 2 : 0) },
 { t: 'Lawyer / doctor / dentist intake-form site', d: "Trust-signal landing page + smart intake form that filters out time-wasters before they call. Pros pay well because every wasted consult costs them. $2,000–$5,000 plus an optional retainer.", diff: 'Intermediate', time: '1 week', sc: (i, p, g) => (i.includes('pro') ? 6 : 0) + (g === 'sites' || g === 'autos' ? 2 : 0) + (p === 'high' || p === 'mid' ? 3 : 0) },
 { t: 'Proposal factory for an agency', d: "Agencies write the same proposal 50 times. Build them a tool that takes a 5-field intake and spits out a custom-branded proposal. Charge $3,000 setup + $200/month, or sell it as a one-time tool.", diff: 'Intermediate', time: '4–6 days', sc: (i, p, g) => (i.includes('coaches') || i.includes('friends') ? 2 : 0) + (g === 'autos' || g === 'sales' ? 3 : 0) + (p === 'high' || p === 'retainer' ? 4 : 0) },
 { t: 'Mini-brand-in-a-day package', d: 'Logo, color palette, fonts, one landing page. All AI-assisted. $500–$1,500 per package, takes you a day. Great for friends starting side hustles. Easy to refer.', diff: 'Easiest', time: '1 day', sc: (i, p, g) => (i.includes('friends') || i.includes('designers') ? 4 : 0) + (g === 'sites' ? 2 : 0) + (p === 'low' || p === 'mid' ? 3 : 0) + (p === 'side' ? 2 : 0) },
 { t: 'Small-business AI receptionist', d: 'A bot on their website that books appointments, answers FAQs, and DMs the owner when something needs a human. Setup $1,500, plus $100–300/month. Local businesses would pay forever.', diff: 'Intermediate', time: '1 week', sc: (i, p, g) => (i.includes('local') || i.includes('pro') ? 4 : 0) + (g === 'autos' ? 4 : 0) + (p === 'retainer' || p === 'passive' ? 5 : 0) },
 { t: 'Custom CRM dashboard', d: "A clean, simple lead/customer dashboard for a friend or agency, built in a weekend, that replaces their messy spreadsheet. People are willing to pay $1,000–$3,000 just to never look at Excel again.", diff: 'Intermediate', time: '3–5 days', sc: (i, p, g) => (i.includes('coaches') || i.includes('friends') ? 2 : 0) + (g === 'dashboards' ? 5 : 0) + (p === 'mid' || p === 'high' ? 3 : 0) },
 { t: 'Influencer DM-reply agent', d: 'Read their DMs, draft replies in their voice, queue them for one-tap send. Most creators get hundreds a day and can\'t keep up. Charge $500 setup + $200/month per creator.', diff: 'Intermediate', time: '3–4 days', sc: (i, p, g) => (i.includes('creators') ? 5 : 0) + (g === 'content' || g === 'autos' ? 3 : 0) + (p === 'retainer' || p === 'passive' ? 3 : 0) },
 { t: 'Stripe-checkout setup for someone\'s site', d: "Lots of people have a site but no way to actually take money on it. You wire up Stripe products, prices, and a checkout flow for them in a few hours. $300–$700 each. Easy first paid gig if you're nervous.", diff: 'Easiest', time: '2–4 hours', sc: (i, p, g) => (g === 'sales' ? 5 : 0) + (i.includes('hatesite') || i.includes('friends') ? 2 : 0) + (p === 'low' ? 3 : 0) + (p === 'side' ? 2 : 0) },
 { t: 'Newsletter automation for a creator', d: 'Pull their best content from the week, draft the newsletter in their voice, queue it for review. Set it once, $300/month forever. The creator never writes another newsletter.', diff: 'Intermediate', time: '3–4 days', sc: (i, p, g) => (i.includes('creators') || i.includes('coaches') ? 4 : 0) + (g === 'content' ? 3 : 0) + (p === 'retainer' || p === 'passive' ? 5 : 0) },
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
 { word: 'Vercel', def: 'The service that makes your website live on the internet. Free for personal projects. This is what <a href="https://aylablumberg.com" target="_blank" rel="noopener noreferrer" class="brand-link">aylablumberg.com</a> runs on.' },
 { word: 'Domain', def: "Your website's name, like yourname.com. Buy it on GoDaddy, then point it to Vercel." },
 { word: 'API Key', def: 'A private code that lets Claude connect to another app. Like a hotel key card. Keep it secret or someone else can use it as you.' },
 { word: 'Agent', def: 'Claude doing things automatically on a schedule, without you having to type anything. The advanced version of all this.' },
 { word: 'Cron Job', def: 'A scheduled task. Like setting an alarm that says "run this code every morning at 8am."' },
 { word: 'Cron', def: 'Short for cron job. A scheduled task that runs your code on a timer (every morning at 8am, every hour, every Sunday, etc.) without you touching it.' },
 { word: 'Claude Code', def: 'The version of Claude that actually builds and deploys things. Runs in Terminal or directly in the Code tab of the Claude app.' },
 { word: 'Cowork', def: 'A desktop tool where Claude controls your computer for you. Like Claude having hands.' },
 { word: 'Project (Claude)', def: 'A folder in Claude that keeps related chats together with shared context. Use this to stay organized.' },
 { word: 'Context', def: "What Claude knows about your conversation. It only remembers what's in the current chat, which is why staying in the right one matters." },
 { word: 'Apify', def: 'A platform that scrapes data from the internet: TikTok comments, Instagram followers, Google Maps listings. Connects to Claude with an API key.' },
 { word: 'LLM', def: 'Large Language Model. The AI brain underneath Claude. Using one vs. building with one are very different things.' },
]

// ──────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────
type Progress = {
 last_lesson: number
 bookmarks: number[]
 confused: number[]
 notes: Record<string, string>
 highlights: Record<string, string[]>
 completed_lessons: number[]
 exercises_done: string[]
 streak_days: number
 longest_streak: number
 last_visit_date: string | null
 notifications_seen: Record<string, boolean>
 completed_at: string | null
}

const DEFAULT_PROGRESS: Progress = {
 highlights: {},
 completed_lessons: [],
 exercises_done: [],
 streak_days: 0,
 longest_streak: 0,
 last_visit_date: null,
 notifications_seen: {},
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
 const [quizMode, setQuizMode] = useState<'self' | 'client'>('self')
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
 highlights: p.highlights ?? {},
 completed_lessons: p.completed_lessons ?? [],
 exercises_done: p.exercises_done ?? [],
 streak_days: p.streak_days ?? 0,
 longest_streak: p.longest_streak ?? 0,
 last_visit_date: p.last_visit_date ?? null,
 notifications_seen: p.notifications_seen ?? {},
 completed_at: p.completed_at ?? null,
 })
 // Fire daily check-in so the streak counter ticks
 fetch('/api/progress', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ checkin: true }),
 })
 .then((r) => (r.ok ? r.json() : null))
 .then((out) => {
 if (out?.streak_days !== undefined) {
 setProgress((prev) => ({
 ...prev,
 streak_days: out.streak_days,
 longest_streak: out.longest_streak,
 last_visit_date: out.last_visit_date,
 }))
 }
 })
 .catch(() => {})
 // Priority: ?lesson=N URL param > saved last_lesson
 const urlLesson = (() => {
 if (typeof window === 'undefined') return null
 const n = Number(new URLSearchParams(window.location.search).get('lesson'))
 return Number.isFinite(n) && n >= 0 && n < lessons.length ? n : null
 })()
 if (urlLesson !== null) {
 setCur(urlLesson)
 } else if (typeof p.last_lesson === 'number' && p.last_lesson > 0 && p.last_lesson < lessons.length) {
 setCur(p.last_lesson)
 }
 setProgressLoaded(true)
 })
 .catch(() => setProgressLoaded(true))
 return () => { cancel = true }
 }, [])

 // If the user is already on /course and triggers ⌘K to a different lesson,
 // the URL changes but the component doesn't unmount. Listen for URL changes.
 useEffect(() => {
 function jumpToUrlLesson() {
 if (typeof window === 'undefined') return
 const n = Number(new URLSearchParams(window.location.search).get('lesson'))
 if (Number.isFinite(n) && n >= 0 && n < lessons.length) {
 setCur(n)
 }
 }
 window.addEventListener('popstate', jumpToUrlLesson)
 // Also listen to a custom event that we'll dispatch from CmdKSearch
 window.addEventListener('au:lesson-jump', jumpToUrlLesson)
 return () => {
 window.removeEventListener('popstate', jumpToUrlLesson)
 window.removeEventListener('au:lesson-jump', jumpToUrlLesson)
 }
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
 const lessonHighlights = progress.highlights[String(cur)] ?? []

 // Selection-based highlight toolbar ────────────────────────
 const [highlightPopup, setHighlightPopup] = useState<{ x: number; y: number; text: string } | null>(null)
 const [notesOpen, setNotesOpen] = useState(false)

 useEffect(() => {
 const el = rightRef.current
 if (!el) return
 const onMouseUp = (e: MouseEvent) => {
 // If the click/mouseup happened ON the highlight popup itself, let onClick handle it
 const t = e.target as HTMLElement | null
 if (t && t.closest('.hl-popup')) return
 const sel = window.getSelection()
 if (!sel || sel.isCollapsed) { setHighlightPopup(null); return }
 const text = sel.toString().trim()
 if (!text || text.length < 2) { setHighlightPopup(null); return }
 // Only count selections inside the lesson body
 const range = sel.getRangeAt(0)
 const container = el.querySelector('.lesson-wrap')
 if (!container || !container.contains(range.commonAncestorContainer)) { setHighlightPopup(null); return }
 const rect = range.getBoundingClientRect()
 // Use pageY/pageX so coords survive scroll; actually rect is viewport, set fixed positioning
 setHighlightPopup({
 x: rect.left + rect.width / 2,
 y: rect.top - 4,
 text,
 })
 }
 const onMouseDown = (e: MouseEvent) => {
 const t = e.target as HTMLElement | null
 // Don't dismiss if the user is clicking the popup button itself
 if (t && t.closest('.hl-popup')) return
 setHighlightPopup(null)
 }
 document.addEventListener('mouseup', onMouseUp)
 document.addEventListener('mousedown', onMouseDown)
 return () => {
 document.removeEventListener('mouseup', onMouseUp)
 document.removeEventListener('mousedown', onMouseDown)
 }
 }, [cur])

 async function addHighlight(text: string) {
 const t = text.trim()
 if (!t) return
 setProgress((prev) => {
 const key = String(cur)
 const existing = prev.highlights[key] ?? []
 if (existing.includes(t)) return prev
 return { ...prev, highlights: { ...prev.highlights, [key]: [...existing, t] } }
 })
 setHighlightPopup(null)
 window.getSelection()?.removeAllRanges()
 await fetch('/api/progress', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ highlight: { index: cur, text: t, op: 'add' } }),
 })
 }

 async function removeHighlight(text: string) {
 setProgress((prev) => {
 const key = String(cur)
 const existing = prev.highlights[key] ?? []
 const next = existing.filter((t) => t !== text)
 const highlights = { ...prev.highlights }
 if (next.length) highlights[key] = next
 else delete highlights[key]
 return { ...prev, highlights }
 })
 await fetch('/api/progress', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ highlight: { index: cur, text, op: 'remove' } }),
 })
 }

 // Auto-censor: wrap any profanity in the rendered lesson in <s class="au-censor">.
 useEffect(() => {
 const wrap = rightRef.current?.querySelector('.lesson-wrap') as HTMLElement | null
 if (!wrap) return
 wrap.querySelectorAll('s.au-censor').forEach((s) => {
 const parent = s.parentNode
 if (!parent) return
 while (s.firstChild) parent.insertBefore(s.firstChild, s)
 parent.removeChild(s)
 parent.normalize()
 })
 const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT)
 const nodes: Text[] = []
 let n: Node | null
 // eslint-disable-next-line no-cond-assign
 while ((n = walker.nextNode())) nodes.push(n as Text)
 for (const textNode of nodes) {
 const parentEl = textNode.parentElement
 if (!parentEl) continue
 const tag = parentEl.tagName
 if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'PRE') continue
 if (parentEl.classList.contains('au-censor')) continue
 const txt = textNode.nodeValue ?? ''
 PROFANITY_REGEX.lastIndex = 0
 if (!PROFANITY_REGEX.test(txt)) continue
 PROFANITY_REGEX.lastIndex = 0
 const frag = document.createDocumentFragment()
 let last = 0
 let m: RegExpExecArray | null
 // eslint-disable-next-line no-cond-assign
 while ((m = PROFANITY_REGEX.exec(txt))) {
 if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)))
 const s = document.createElement('s')
 s.className = 'au-censor'
 s.textContent = m[0]
 frag.appendChild(s)
 last = m.index + m[0].length
 }
 if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)))
 const parent = textNode.parentNode
 if (parent) parent.replaceChild(frag, textNode)
 }
 }, [cur])

 // Paint glossary-term hovers onto the rendered lesson HTML.
 // Runs after each lesson switch, before highlights so hover tooltips don't
 // collide with user highlights.
 useEffect(() => {
 const wrap = rightRef.current?.querySelector('.lesson-wrap') as HTMLElement | null
 if (!wrap) return
 // Strip any old auto-underlines
 wrap.querySelectorAll('span.au-gloss').forEach((s) => {
 const parent = s.parentNode
 if (!parent) return
 while (s.firstChild) parent.insertBefore(s.firstChild, s)
 parent.removeChild(s)
 parent.normalize()
 })
 // Longest terms first so "Claude Code" matches before "Claude"
 const terms = [...glossary].sort((a, b) => b.word.length - a.word.length)
 for (const { word, def } of terms) {
 const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT)
 const nodes: Text[] = []
 let n: Node | null
 // eslint-disable-next-line no-cond-assign
 while ((n = walker.nextNode())) nodes.push(n as Text)
 for (const textNode of nodes) {
 const parentEl = textNode.parentElement
 if (!parentEl) continue
 // skip inside marks, existing gloss, headings, code, buttons
 const tag = parentEl.tagName
 if (tag === 'MARK' || tag === 'CODE' || tag === 'BUTTON' || tag === 'PRE') continue
 if (parentEl.classList.contains('au-gloss')) continue
 // skip inside headings too, word definitions clutter titles
 if (tag === 'H1' || tag === 'H2' || tag === 'H3') continue
 const txt = textNode.nodeValue ?? ''
 const lower = txt.toLowerCase()
 const needle = word.toLowerCase()
 const idx = lower.indexOf(needle)
 if (idx === -1) continue
 // Word boundary check
 const before = idx > 0 ? txt[idx - 1] : ' '
 const after = idx + word.length < txt.length ? txt[idx + word.length] : ' '
 if (/[a-z0-9]/i.test(before) || /[a-z0-9]/i.test(after)) continue
 const matchText = txt.slice(idx, idx + word.length)
 const span = document.createElement('span')
 span.className = 'au-gloss'
 span.textContent = matchText
 span.setAttribute('data-def', def)
 const parent = textNode.parentNode
 if (!parent) break
 const beforeText = txt.slice(0, idx)
 const afterText = txt.slice(idx + word.length)
 if (beforeText) parent.insertBefore(document.createTextNode(beforeText), textNode)
 parent.insertBefore(span, textNode)
 if (afterText) parent.insertBefore(document.createTextNode(afterText), textNode)
 parent.removeChild(textNode)
 break // only first occurrence per lesson per term
 }
 }
 }, [cur])

 // Paint saved highlights onto the rendered lesson HTML whenever the lesson
 // changes or the highlight set for this lesson changes.
 useEffect(() => {
 const wrap = rightRef.current?.querySelector('.lesson-wrap') as HTMLElement | null
 if (!wrap) return
 // Strip existing marks first
 wrap.querySelectorAll('mark.au-hl').forEach((m) => {
 const parent = m.parentNode
 if (!parent) return
 while (m.firstChild) parent.insertBefore(m.firstChild, m)
 parent.removeChild(m)
 parent.normalize()
 })
 if (lessonHighlights.length === 0) return
 // For each saved highlight, walk text nodes and wrap first match
 lessonHighlights.forEach((snippet) => {
 const needle = snippet.trim()
 if (!needle) return
 const walker = document.createTreeWalker(wrap, NodeFilter.SHOW_TEXT)
 const nodes: Text[] = []
 let n: Node | null
 // eslint-disable-next-line no-cond-assign
 while ((n = walker.nextNode())) nodes.push(n as Text)
 for (const textNode of nodes) {
 const text = textNode.nodeValue ?? ''
 const idx = text.indexOf(needle)
 if (idx === -1) continue
 const before = text.slice(0, idx)
 const match = text.slice(idx, idx + needle.length)
 const after = text.slice(idx + needle.length)
 const mark = document.createElement('mark')
 mark.className = 'au-hl'
 mark.textContent = match
 const parent = textNode.parentNode
 if (!parent) break
 if (before) parent.insertBefore(document.createTextNode(before), textNode)
 parent.insertBefore(mark, textNode)
 if (after) parent.insertBefore(document.createTextNode(after), textNode)
 parent.removeChild(textNode)
 break // one occurrence per snippet
 }
 })
 }, [cur, lessonHighlights])

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

 // Scroll to top on lesson change (instant, no smooth animation)
 useEffect(() => {
 if (rightRef.current) rightRef.current.scrollTop = 0
 }, [cur])

 // Arrow-key navigation between lessons (ignore when typing)
 useEffect(() => {
 function onKey(e: KeyboardEvent) {
 const t = e.target as HTMLElement | null
 const tag = t?.tagName
 if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return
 if (glossaryOpen || quizOpen || completion) return
 if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
 else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
 }
 window.addEventListener('keydown', onKey)
 return () => window.removeEventListener('keydown', onKey)
 }, [cur, glossaryOpen, quizOpen, completion])

 // Mark previous lesson complete whenever user advances (going forward only)
 const prevCurRef = useRef<number>(cur)
 useEffect(() => {
 if (!progressLoaded) { prevCurRef.current = cur; return }
 const was = prevCurRef.current
 prevCurRef.current = cur
 if (cur > was) {
 // moving forward, mark the lesson we just left complete
 const completeIdx = was
 if (!progress.completed_lessons.includes(completeIdx)) {
 setProgress((prev) => ({
 ...prev,
 completed_lessons: Array.from(new Set([...prev.completed_lessons, completeIdx])).sort((a, b) => a - b),
 }))
 fetch('/api/progress', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ complete_lesson: { index: completeIdx, on: true } }),
 }).catch(() => {})
 }
 }
 }, [cur, progressLoaded])

 // TikTok nudges on specific lessons
 const tiktokNotifs: Record<number, { key: string; title: string; body: string; cta: string }> = {
 4: {
 key: 'tiktok-1',
 title: 'Quick favor.',
 body: "Follow me on TikTok @aylablumberg.ai for more of this but in video form.",
 cta: 'Open TikTok',
 },
 8: {
 key: 'tiktok-2',
 title: "You better already be following me.",
 body: "If you're not on TikTok @aylablumberg.ai by now, we have a problem. Fix it real quick.",
 cta: 'Follow @aylablumberg.ai',
 },
 13: {
 key: 'tiktok-3',
 title: "One more ask.",
 body: "Send this course to a friend and tell them to follow me on TikTok too. @aylablumberg.ai. It's how this gets bigger.",
 cta: 'Share my TikTok',
 },
 }
 const activeNotif = tiktokNotifs[cur]
 const showNotif = !!activeNotif && !progress.notifications_seen[activeNotif.key]

 async function dismissNotif() {
 if (!activeNotif) return
 const key = activeNotif.key
 setProgress((prev) => ({
 ...prev,
 notifications_seen: { ...prev.notifications_seen, [key]: true },
 }))
 await fetch('/api/progress', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ notification_seen: key }),
 })
 }

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
 const mode = quizBtn.getAttribute('data-quiz') === '2' ? 'client' : 'self'
 openQuiz(mode)
 return
 }
 const exerciseBtn = t.closest('.exercise-done') as HTMLElement | null
 if (exerciseBtn) {
 const id = exerciseBtn.getAttribute('data-exercise-id') || ''
 if (!id) return
 const exerciseEl = exerciseBtn.closest('.exercise') as HTMLElement | null
 const wasDone = exerciseEl?.classList.contains('done') ?? false
 const nextDone = !wasDone
 if (exerciseEl) exerciseEl.classList.toggle('done', nextDone)
 exerciseBtn.textContent = nextDone ? '✓ Nice, done' : 'I did it →'
 setProgress((prev) => {
 const set = new Set(prev.exercises_done)
 if (nextDone) set.add(id)
 else set.delete(id)
 return { ...prev, exercises_done: Array.from(set) }
 })
 fetch('/api/progress', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ exercise: { id, on: nextDone } }),
 }).catch(() => {})
 }
 }
 el.addEventListener('click', onClick)
 return () => el.removeEventListener('click', onClick)
 }, [cur])

 // Paint "done" class on exercises that are already marked done for this user
 useEffect(() => {
 const wrap = rightRef.current?.querySelector('.lesson-wrap') as HTMLElement | null
 if (!wrap) return
 wrap.querySelectorAll('.exercise').forEach((node) => {
 const el = node as HTMLElement
 const id = el.getAttribute('data-exercise-id') || ''
 const done = id && progress.exercises_done.includes(id)
 el.classList.toggle('done', !!done)
 const btn = el.querySelector('.exercise-done') as HTMLElement | null
 if (btn) btn.textContent = done ? '✓ Nice, done' : 'I did it →'
 })
 }, [cur, progress.exercises_done])

 // Inject "copy" buttons on every prompt block (.bubble.u, .q)
 // so the user can paste straight into Claude.
 useEffect(() => {
 const wrap = rightRef.current?.querySelector('.lesson-wrap') as HTMLElement | null
 if (!wrap) return
 // Skip .mad bubbles, those are real ranty messages I've sent, not prompts to copy
 const targets = wrap.querySelectorAll<HTMLElement>('.bubble.u:not(.mad), .q')
 targets.forEach((el) => {
 // Avoid double-decorating
 if (el.querySelector(':scope > .copy-btn')) return
 // Make sure the element can host an absolutely-positioned button
 const cs = window.getComputedStyle(el)
 if (cs.position === 'static') el.style.position = 'relative'

 const btn = document.createElement('button')
 btn.className = 'copy-btn'
 btn.type = 'button'
 btn.setAttribute('aria-label', 'Copy this prompt')
 btn.innerHTML = `
 <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 <rect x="9" y="9" width="13" height="13" rx="2" />
 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
 </svg>
 <span class="copy-btn-label">Copy</span>
 `
 btn.addEventListener('click', async (e) => {
 e.preventDefault()
 e.stopPropagation()
 // Pull text from element WITHOUT the copy button itself
 const clone = el.cloneNode(true) as HTMLElement
 clone.querySelectorAll('.copy-btn').forEach((b) => b.remove())
 const text = (clone.innerText || clone.textContent || '').trim()
 try {
 await navigator.clipboard.writeText(text)
 } catch {
 // Fallback for older browsers / iframes
 const ta = document.createElement('textarea')
 ta.value = text
 ta.style.position = 'fixed'
 ta.style.opacity = '0'
 document.body.appendChild(ta)
 ta.select()
 try { document.execCommand('copy') } catch { /* noop */ }
 document.body.removeChild(ta)
 }
 btn.classList.add('copied')
 const label = btn.querySelector('.copy-btn-label') as HTMLElement | null
 if (label) label.textContent = 'Copied!'
 setTimeout(() => {
 btn.classList.remove('copied')
 if (label) label.textContent = 'Copy'
 }, 1500)
 })
 el.appendChild(btn)
 })
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

 function openQuiz(mode: 'self' | 'client' = 'self') {
 setQuizMode(mode)
 setQStep(0)
 setQAns([[], null, null, null])
 setQuizOpen(true)
 }

 // POST quiz results once when the user lands on the results step.
 // (The actual fire happens in another effect below, after resultTop is computed.)
 const quizPostedRef = useRef<string | null>(null)

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
 const activeQuizSteps = quizMode === 'client' ? clientQuizSteps : quizSteps
 const activeIdeaPool = quizMode === 'client' ? clientIdeaPool : ideaPool
 const resultRanks = quizMode === 'client'
 ? ['Closest match', 'Strong option', 'Worth considering']
 : ['Perfect for you', 'Great option', 'Worth considering']
 const resultTop = [...activeIdeaPool].map(x => ({ ...x, s: x.sc(interests, pain, goal) })).sort((a, b) => b.s - a.s).slice(0, 3)

 // Fire-once POST when user lands on the results screen
 useEffect(() => {
 if (!quizOpen) return
 if (qStep < activeQuizSteps.length) return
 const sig = JSON.stringify({ mode: quizMode, qAns, top: resultTop.map(r => r.t) })
 if (quizPostedRef.current === sig) return
 quizPostedRef.current = sig
 fetch('/api/quiz', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 mode: quizMode,
 inputs: {
 interests: Array.isArray(qAns[0]) ? qAns[0] : [],
 pain: typeof qAns[1] === 'string' ? qAns[1] : null,
 goal: typeof qAns[2] === 'string' ? qAns[2] : null,
 intensity: typeof qAns[3] === 'string' ? qAns[3] : null,
 },
 top: resultTop.map(r => ({ title: r.t, score: r.s })),
 }),
 }).catch(() => { /* swallow, not critical */ })
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [quizOpen, qStep, quizMode])

 const quizHeadline = quizMode === 'client'
 ? 'Here\u2019s what to actually charge for.'
 : 'Here\u2019s where to start.'

 return (
 <div className="course-root">
 <style jsx global>{`
 .course-root { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--dark); min-height: 100vh; overflow: hidden; }
 .progress-line { position: fixed; top: 0; left: 0; height: 2px; background: var(--pink); z-index: 101; transition: width 0.5s cubic-bezier(.4,0.2,1); }
 .top-nav { position: fixed; top: 0; left: 0; right: 0; height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 32px; background: rgba(253,246,240,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); z-index: 100; }
 .course-brand { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; letter-spacing: 0.3px; color: var(--dark); text-decoration: none; cursor: pointer; transition: opacity 0.15s; display: inline-flex; align-items: center; }
 .course-brand:hover { opacity: 0.7; }
 .course-brand span { color: var(--pink); font-style: italic; }
 /* Lesson progress track. Dashed pink runway with a paper plane
    flying along it. Each lesson is an invisible click target. */
 .progress-track { position: relative; flex: 1; max-width: 520px; min-width: 280px; height: 26px; display: flex; align-items: center; margin: 0 24px; }
 .progress-track-bg { position: absolute; top: 50%; left: 0; right: 0; height: 3px; background-image: repeating-linear-gradient(90deg, rgba(232,41,92,0.3) 0 7px, transparent 7px 13px); transform: translateY(-50%); border-radius: 2px; }
 .progress-track-fill { position: absolute; top: 50%; left: 0; height: 3px; background-image: repeating-linear-gradient(90deg, var(--pink) 0 7px, transparent 7px 13px); transform: translateY(-50%); transition: width 0.55s cubic-bezier(.45,0,.15,1); border-radius: 2px; }
 .progress-track-tick { flex: 1; height: 26px; cursor: pointer; background: transparent; border: 0; padding: 0; position: relative; }
 .progress-track-tick.has-bookmark::after { content: '★'; position: absolute; top: 1px; left: 50%; transform: translateX(-50%); font-size: 8px; color: #E8B14A; line-height: 1; text-shadow: 0 1px 2px rgba(0,0,0,0.08); pointer-events: none; }
 .progress-track-marker { position: absolute; top: 50%; width: 22px; height: 22px; transform: translate(-50%, -50%); transition: left 0.55s cubic-bezier(.45,0,.15,1); pointer-events: none; z-index: 2; display: flex; align-items: center; justify-content: center; color: var(--pink); filter: drop-shadow(0 2px 5px rgba(232,41,92,0.4)); animation: planeFloat 2.6s ease-in-out infinite; }
 .progress-track-marker svg { width: 20px; height: 20px; transform: rotate(90deg); }
 @keyframes planeFloat {
 0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
 50% { transform: translate(-50%, -50%) translateY(-2px); }
 }
 .glossary-btn { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--pink); background: var(--pink-light); border: none; padding: 7px 16px; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
 .glossary-btn:hover { background: var(--pink); color: white; }
 .top-links { display: flex; align-items: center; gap: 6px; }
 .streak { display: inline-flex; align-items: center; gap: 4px; background: linear-gradient(135deg, #FF6B1A, #FF2E7E); color: white; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.3px; margin-right: 4px; box-shadow: 0 2px 8px rgba(255,46,126,0.25); }
 .tk-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 250; display: flex; align-items: center; justify-content: center; padding: 20px; animation: tkFade 0.2s ease; }
 @keyframes tkFade { from { opacity: 0; } to { opacity: 1; } }
 .tk-card { background: white; max-width: 420px; width: 100%; border-radius: 22px; padding: 32px 28px 26px; position: relative; box-shadow: 0 30px 80px rgba(0,0,0,0.28); animation: tkPop 0.25s cubic-bezier(0.22,0.61,0.36,1); }
 @keyframes tkPop { from { transform: translateY(14px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
 .tk-close { position: absolute; top: 14px; right: 14px; width: 30px; height: 30px; border: none; border-radius: 50%; background: var(--pink-light); color: var(--pink); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1; }
 .tk-close:hover { background: var(--pink); color: white; }
 .tk-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--pink); margin-bottom: 8px; }
 .tk-title { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 30px; line-height: 1.15; color: var(--dark); margin-bottom: 10px; }
 .tk-body { font-size: 14.5px; line-height: 1.6; color: var(--mid); font-weight: 300; margin-bottom: 16px; }
 .tk-handle { font-family: 'Courier New', monospace; font-size: 15px; color: var(--pink); font-weight: 600; padding: 10px 14px; background: var(--pink-pale); border-radius: 10px; margin-bottom: 18px; text-align: center; letter-spacing: 0.3px; }
 .tk-actions { display: flex; gap: 10px; }
 .tk-primary { flex: 1; background: var(--pink); color: white; text-decoration: none; text-align: center; padding: 12px 14px; border-radius: 999px; font-size: 11px; tracking-[1.5px]; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 500; transition: background 0.2s; }
 .tk-primary:hover { background: #C51F4E; }
 .tk-secondary { background: transparent; border: 1px solid var(--border); color: var(--mid); padding: 12px 18px; border-radius: 999px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 500; cursor: pointer; transition: all 0.2s; }
 .tk-secondary:hover { border-color: var(--pink); color: var(--pink); }
 .top-link { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.2px; text-transform: uppercase; color: var(--mid); padding: 7px 12px; border-radius: 20px; text-decoration: none; transition: all 0.2s; }
 .top-link:hover { color: var(--pink); background: var(--pink-light); }
 .dot.has-bookmark { box-shadow: 0 0 0 3px rgba(232,41,92,0.2); }
 .lesson-toolbar { display: flex; gap: 8px; margin-bottom: 28px; }
 .toolbar-btn { display: inline-flex; align-items: center; gap: 7px; background: white; border: 1px solid var(--border); color: var(--mid); padding: 8px 14px; border-radius: 20px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; cursor: pointer; transition: all 0.2s; }
 .toolbar-btn:hover { border-color: var(--pink); color: var(--pink); }
 .toolbar-btn.on { background: var(--pink); border-color: var(--pink); color: white; }
 .toolbar-btn-icon { padding: 8px 10px; }
 .lesson-wrap mark.au-hl { background: var(--pink-light); color: var(--dark); padding: 1px 3px; border-radius: 3px; box-decoration-break: clone; -webkit-box-decoration-break: clone; cursor: pointer; transition: background 0.2s; }
 .lesson-wrap mark.au-hl:hover { background: #FFCFDE; }
 .lesson-wrap span.au-gloss { border-bottom: 1px dotted var(--pink); cursor: help; position: relative; }
 .lesson-wrap span.au-gloss:hover { color: var(--pink); }
 .lesson-wrap span.au-gloss::after {
 content: attr(data-def);
 position: absolute; left: 50%; top: calc(100% + 8px); transform: translateX(-50%);
 width: 260px; max-width: 82vw;
 background: var(--dark); color: white; padding: 10px 14px; border-radius: 10px;
 font-size: 12px; line-height: 1.5; font-weight: 300; letter-spacing: 0.2px;
 z-index: 200; box-shadow: 0 10px 28px rgba(0,0,0,0.25);
 text-transform: none; font-style: normal;
 opacity: 0; pointer-events: none; transition: opacity 0.15s;
 }
 .lesson-wrap span.au-gloss::before {
 content: ''; position: absolute; left: 50%; top: 100%; transform: translateX(-50%);
 margin-top: 2px; border: 6px solid transparent; border-bottom-color: var(--dark);
 z-index: 201; opacity: 0; transition: opacity 0.15s; pointer-events: none;
 }
 .lesson-wrap span.au-gloss:hover::after,
 .lesson-wrap span.au-gloss:hover::before { opacity: 1; }
 /* Auto-censor strikethrough, works on lesson body, chat bubbles (.u and .c), and any inline mention */
 s.au-censor, .lesson-wrap s.au-censor, .bubble s.au-censor, .au-censor {
 text-decoration: line-through !important;
 text-decoration-color: currentColor !important;
 text-decoration-thickness: 2.5px !important;
 text-decoration-skip-ink: none !important;
 opacity: 0.78;
 }
 /* Slightly thicker on the colored bubbles where small strokes get lost on the saturated bg */
 .bubble.u s.au-censor, .bubble.u.mad s.au-censor { text-decoration-thickness: 3px !important; opacity: 0.9; }
 .exercise {
 margin: 28px 0;
 background: linear-gradient(135deg, #FFF5F8 0%, #FFE4ED 100%);
 border: 2px solid var(--pink);
 border-radius: 16px;
 padding: 22px 22px 20px;
 position: relative;
 box-shadow: 0 6px 20px rgba(232,41,92,0.08);
 transition: all 0.3s ease;
 }
 .exercise.done {
 background: linear-gradient(135deg, #FFFBFC 0%, #FFF0F5 100%);
 border-color: rgba(232,41,92,0.3);
 opacity: 0.75;
 }
 .exercise.done::after {
 content: '✓';
 position: absolute;
 top: 14px;
 right: 14px;
 width: 28px; height: 28px; border-radius: 50%;
 background: var(--pink); color: white;
 display: flex; align-items: center; justify-content: center;
 font-size: 14px; font-weight: 700;
 }
 .exercise-tag {
 display: inline-flex; align-items: center; gap: 6px;
 font-size: 10px; font-weight: 600; letter-spacing: 2.5px;
 text-transform: uppercase; color: var(--pink);
 background: white; padding: 5px 12px; border-radius: 999px;
 margin-bottom: 10px;
 }
 .exercise-title {
 font-family: 'Cormorant Garamond', serif;
 font-size: 22px; font-style: italic; font-weight: 500;
 color: var(--dark); line-height: 1.3; margin: 4px 0 10px;
 }
 .exercise-body {
 font-size: 14.5px; line-height: 1.65; color: var(--dark); font-weight: 300;
 margin-bottom: 14px;
 }
 .exercise-body strong { font-weight: 600; }
 .exercise-body code {
 background: white; color: var(--pink);
 padding: 2px 8px; border-radius: 6px;
 font-family: 'Courier New', monospace; font-size: 13px;
 border: 1px solid rgba(232,41,92,0.2);
 }
 .exercise-body .q {
 background: white; border: 1px dashed rgba(232,41,92,0.35);
 border-radius: 10px; padding: 12px 16px; margin: 10px 0;
 font-size: 13.5px; color: var(--dark); font-weight: 400;
 font-family: 'Courier New', monospace; line-height: 1.55;
 }
 .exercise-done {
 background: var(--pink); color: white; border: none;
 padding: 10px 20px; border-radius: 999px;
 font-size: 11px; font-weight: 500; letter-spacing: 1.5px;
 text-transform: uppercase; cursor: pointer;
 font-family: 'DM Sans', sans-serif;
 transition: all 0.2s;
 }
 .exercise-done:hover { background: #C51F4E; transform: translateY(-1px); }
 .exercise.done .exercise-done { background: rgba(232,41,92,0.3); }
 .agent-team { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin: 24px 0 8px; }
 .agent-card { background: white; border: 1px solid var(--border); border-radius: 14px; padding: 14px 16px; transition: transform 0.25s cubic-bezier(.2,.8,.2,1), box-shadow 0.25s ease, border-color 0.25s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.04); cursor: default; }
 .agent-card:hover { transform: translateY(-3px) rotate(-0.4deg); box-shadow: 0 14px 36px rgba(232,41,92,0.15), 0 4px 12px rgba(232,41,92,0.08); border-color: var(--pink); }
 .agent-card:hover .agent-avatar { transform: scale(1.08) rotate(6deg); background: var(--pink); color: white; }
 .agent-avatar { transition: transform 0.25s cubic-bezier(.2,.8,.2,1), background 0.25s ease, color 0.25s ease; }
 .agent-card:hover { border-color: var(--pink); box-shadow: 0 6px 22px rgba(232,41,92,0.12); }
 .agent-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
 .agent-avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #FFD6E3 0%, #FF8FAB 100%); color: white; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 18px; font-style: italic; flex-shrink: 0; }
 .agent-name { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; color: var(--dark); line-height: 1; }
 .agent-meta { font-size: 10px; letter-spacing: 1.3px; text-transform: uppercase; color: var(--pink); margin-top: 3px; }
 .agent-quote { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 13.5px; line-height: 1.45; color: var(--dark); font-weight: 400; padding-top: 8px; border-top: 1px dashed var(--border); }
 .agent-footnote { font-size: 12.5px; color: var(--mid); margin-top: 10px; text-align: center; }
 .stuck-callout { display: flex; gap: 14px; align-items: flex-start; background: linear-gradient(135deg, #FFFBFC 0%, #FFF0F5 100%); border: 2px dashed rgba(232,41,92,0.35); border-radius: 14px; padding: 16px 18px; margin: 24px 0; }
 .stuck-icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%; background: var(--pink); color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(232,41,92,0.25); }
 .stuck-body { flex: 1; min-width: 0; }
 .stuck-title { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 20px; color: var(--dark); margin-bottom: 4px; font-weight: 500; }
 .stuck-body p { font-size: 14px; color: var(--dark); font-weight: 300; line-height: 1.55; margin: 0; }
 @media (max-width: 800px) { .agent-team { grid-template-columns: 1fr; } }
 .agent-team-photo { margin: 32px 0 12px; padding: 0; display: flex; flex-direction: column; align-items: center; }
 .agent-team-photo img { width: 100%; max-width: 640px; border-radius: 14px; border: 1px solid var(--border); box-shadow: 0 12px 40px rgba(0,0,0,0.10); display: block; transition: transform 0.4s cubic-bezier(.2,.8,.2,1), box-shadow 0.4s ease; cursor: zoom-in; }
 .agent-team-photo:hover img { transform: scale(1.02); box-shadow: 0 24px 60px rgba(232,41,92,0.18), 0 8px 18px rgba(0,0,0,0.10); }
 .agent-team-photo figcaption { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: var(--mid); margin-top: 12px; text-align: center; font-weight: 300; }
 .lesson-photo { margin: 28px 0 8px; padding: 0; display: flex; flex-direction: column; align-items: center; }
 .lesson-photo img { width: 100%; max-width: 720px; border-radius: 12px; border: 1px solid var(--border); box-shadow: 0 10px 32px rgba(0,0,0,0.08); display: block; transition: transform 0.4s cubic-bezier(.2,.8,.2,1), box-shadow 0.4s ease; cursor: zoom-in; }
 .lesson-photo:hover img { transform: scale(1.015); box-shadow: 0 22px 50px rgba(232,41,92,0.15), 0 6px 16px rgba(0,0,0,0.08); }
 .lesson-photo figcaption { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: var(--mid); margin-top: 10px; text-align: center; font-weight: 300; max-width: 560px; line-height: 1.45; }
 .lesson-photo figcaption code { font-family: 'SF Mono', ui-monospace, monospace; font-size: 12px; background: var(--pink-light); color: var(--pink); padding: 1px 6px; border-radius: 4px; font-style: normal; }
 /* SVG diagrams (idea-spiral, API-key flow, Stripe flow, agent hierarchy), interactive on hover */
 .idea-spiral-figure, .diagram-figure { transition: transform 0.3s cubic-bezier(.2,.8,.2,1), box-shadow 0.3s ease; }
 .idea-spiral-figure:hover, .diagram-figure:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(232,41,92,0.10); }
 /* SVG inner-element hover effects (groups + boxes glow when you mouse over them) */
 .idea-spiral rect, .diagram-svg rect, .diagram-svg circle, .diagram-svg path[fill]:not([fill="none"]) { transition: filter 0.2s ease, transform 0.2s cubic-bezier(.2,.8,.2,1); transform-origin: center; transform-box: fill-box; }
 .idea-spiral rect:hover, .diagram-svg rect:hover, .diagram-svg circle:hover { filter: drop-shadow(0 4px 10px rgba(232,41,92,0.35)); transform: scale(1.04); }
 .hl-popup { position: fixed; transform: translate(-50%, -100%); z-index: 1000; background: var(--pink); color: white; padding: 8px 14px; border-radius: 999px; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; box-shadow: 0 8px 24px rgba(232,41,92,0.3); cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 6px; animation: popIn 0.15s cubic-bezier(0.4, 0, 0.2, 1); }
 .hl-popup:hover { background: #C51F4E; }
 @keyframes popIn { from { opacity: 0; transform: translate(-50%, -95%); } to { opacity: 1; transform: translate(-50%, -100%); } }
 .notes-popover { margin: 14px 0 0; background: white; border: 1.5px solid var(--pink); border-radius: 14px; padding: 16px 18px 12px; max-width: 600px; box-shadow: 0 10px 28px rgba(232,41,92,0.12); animation: notePop 0.22s cubic-bezier(0.22,0.61,0.36,1); }
 @keyframes notePop { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
 .notes-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
 .notes-label { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--pink); }
 .notes-status { font-size: 10px; color: var(--light); letter-spacing: 1px; }
 .notes-status.s-saved { color: #4CAF50; }
 .notes-input { width: 100%; resize: vertical; border: none; outline: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 14px; line-height: 1.6; color: var(--dark); font-weight: 300; min-height: 100px; }
 .notes-input::placeholder { color: var(--light); font-style: italic; }
 .notes-all-link { display: inline-block; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--pink); font-weight: 500; text-decoration: none; width: 100%; transition: color 0.15s; }
 .notes-all-link:hover { color: #C51F4E; }
 .layout { display: flex; height: 100vh; padding-top: 56px; }
 .left { width: 38%; min-width: 320px; max-width: 480px; background: var(--left-bg); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: relative; overflow: hidden; }
 .left-inner { padding: 28px 28px 28px; display: flex; flex-direction: column; height: 100%; min-height: 0; }
 .l-tag { font-size: 10px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: var(--pink); margin-bottom: 8px; }
 .l-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; line-height: 1.3; color: var(--dark); font-style: italic; }
 .l-num-bg { font-family: 'Cormorant Garamond', serif; font-size: 80px; font-weight: 300; color: rgba(232,41,92,0.14); line-height: 0.9; position: absolute; right: 22px; bottom: 18px; user-select: none; pointer-events: none; font-style: italic; letter-spacing: -2px; z-index: 0; }
 .vid-wrap { margin-top: 16px; flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; position: relative; z-index: 1; }
 .vid-box { background: #000; border: 1px solid var(--border); border-radius: 18px; aspect-ratio: 9/16; height: 100%; max-height: 100%; width: auto; max-width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; position: relative; box-shadow: 0 18px 50px rgba(0,0,0,0.10), 0 4px 12px rgba(232,41,92,0.08); }
 .vid-box video { width: 100%; height: 100%; object-fit: cover; }
 .vid-fallback { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; width: 100%; height: 100%; background: linear-gradient(155deg, #FFE4ED 0%, #FFF7FA 50%, #FFE4ED 100%); padding: 24px; }
 .vid-icon { width: 56px; height: 56px; background: var(--pink); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(232,41,92,0.25); }
 .vid-icon svg { width: 20px; height: 20px; fill: white; margin-left: 3px; }
 .vid-label { font-size: 11px; color: var(--pink); text-align: center; padding: 0 12px; line-height: 1.5; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; }
 .right { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 52px 60px 110px; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; scroll-behavior: auto; }
 .right::-webkit-scrollbar { width: 3px; }
 .right::-webkit-scrollbar-thumb { background: rgba(232,41,92,0.2); border-radius: 2px; }
 .lesson-wrap { max-width: 600px; animation: courseSlideIn 0.4s cubic-bezier(.4,0.2,1); }
 @keyframes courseSlideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
 .l-head { font-family: 'Cormorant Garamond', serif; font-size: 46px; font-weight: 400; line-height: 1.1; color: var(--dark); margin-bottom: 10px; }
 .l-sub { font-size: 14px; color: var(--mid); font-weight: 400; margin-bottom: 36px; line-height: 1.5; }
 .l-body { font-size: 15.5px; line-height: 1.78; color: var(--dark); font-weight: 400; }
 .l-body p { margin-bottom: 18px; }
 .l-body strong { font-weight: 700; color: var(--pink); }
 .l-body em { font-style: italic; color: var(--dark); font-weight: 400; }
 .l-body .pop { color: var(--pink); font-weight: 700; }
 .l-body ul, .l-body ol { padding-left: 22px; margin: 14px 0; }
 .l-body ul { list-style: disc; }
 .l-body ul li::marker { color: var(--pink); font-size: 1.05em; }
 .l-body ol { list-style: decimal; }
 .l-body ol li::marker { color: var(--pink); font-weight: 600; }
 .l-body li { margin-bottom: 9px; line-height: 1.65; padding-left: 4px; }
 .callout { background: var(--pink-pale); border-left: 3px solid var(--pink); border-radius: 0 10px 10px 0; padding: 16px 20px; margin: 22px 0; font-size: 14.5px; line-height: 1.65; }
 .callout-tag { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--pink); margin-bottom: 7px; }
 .l-divider { border: 0; border-top: 1px solid var(--border); margin: 36px 0 28px; }
 .l-sub-head { font-size: 26px; font-weight: 600; margin: 0 0 14px; color: var(--dark); letter-spacing: -0.01em; }
 /* "Tools you'll use" strip at the top of relevant lessons */
 .tools-strip { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 6px 0 22px; padding: 12px 14px; background: rgba(232,41,92,0.05); border: 1px solid rgba(232,41,92,0.15); border-radius: 12px; }
 .tools-strip-label { font-size: 9.5px; letter-spacing: 2px; text-transform: uppercase; color: var(--pink); font-weight: 700; margin-right: 8px; }
 .tool-pill { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid var(--border); border-radius: 999px; padding: 5px 11px 5px 7px; font-size: 12px; font-weight: 500; color: var(--dark); text-decoration: none; transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s, color 0.15s; cursor: pointer; }
 .tool-pill:hover { border-color: var(--pink); color: var(--pink); transform: translateY(-1px); box-shadow: 0 2px 8px rgba(232,41,92,0.12); }
 .tool-pill img { width: 16px; height: 16px; flex-shrink: 0; }
 /* Inline app logo (smaller, next to a single mention) */
 .app-logo { display: inline-block; width: 16px; height: 16px; vertical-align: -3px; margin-right: 4px; }
 /* Inline brand links (e.g. "go to stripe.com") */
 .brand-link { color: var(--pink); text-decoration: none; border-bottom: 1px dashed rgba(232,41,92,0.4); transition: border-color 0.15s; }
 .brand-link:hover { border-bottom-color: var(--pink); border-bottom-style: solid; }
 .brand-link strong { color: var(--pink); }
 .how-it-works { display: flex; flex-direction: column; gap: 14px; margin: 22px 0 10px; }
 .how-step { display: grid; grid-template-columns: 42px 1fr; gap: 16px; align-items: start; background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; transition: border-color 0.15s ease, transform 0.15s ease; }
 .how-step:hover { border-color: var(--pink); }
 .how-step-n { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 14px; color: var(--pink); letter-spacing: 2px; padding-top: 4px; }
 .how-icon { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 999px; background: var(--pink-pale); color: var(--pink); border: 1px solid rgba(232,41,92,0.25); vertical-align: middle; margin: 0 4px; line-height: 0; position: relative; top: -1px; }
 .how-icon svg { display: block; }
 .how-step-body h3 { font-size: 15.5px; font-weight: 600; margin: 0 0 6px; color: var(--dark); letter-spacing: -0.005em; }
 .how-step-body p { font-size: 14px; line-height: 1.65; color: var(--muted, #555); margin: 0; font-weight: 400; }
 .how-step-body kbd { font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: 12px; padding: 2px 7px; border-radius: 5px; background: #f4f0f2; border: 1px solid var(--border); color: var(--dark); font-weight: 600; }
 @media (max-width: 560px) { .how-step { grid-template-columns: 1fr; gap: 4px; } .how-step-n { padding-top: 0; } }
 .idea-spiral-figure { margin: 28px 0; background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
 .idea-spiral { width: 100%; height: auto; max-height: 260px; display: block; }
 .diagram-figure { margin: 28px 0; background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 18px; }
 .diagram-svg { width: 100%; height: auto; display: block; }
 .code-wrap { position: relative; margin: 22px 0; }
 .code-block { background: #181818; color: #E8E8E8; padding: 18px 20px; border-radius: 10px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.65; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
 .copy-btn { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.1); border: none; color: #888; font-size: 11px; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; letter-spacing: 0.5px; }
 .copy-btn:hover { background: rgba(255,255,255,0.22); color: white; }
 .chat-ex { margin: 20px 0; }
 .bubble { display: table; padding: 11px 16px; border-radius: 18px; font-size: 13.5px; line-height: 1.5; max-width: 82%; margin-bottom: 6px; word-break: break-word; }
 .bubble.u { padding-right: 72px; padding-bottom: 14px; }
 .bubble.u { background: var(--pink); color: white; border-bottom-right-radius: 4px; margin-left: auto; }
 .bubble.u.mad { background: #C0001F; font-weight: 500; }
 .bubble.c { background: #EFEFEF; color: var(--dark); border-bottom-left-radius: 4px; }

 /* Copy button injected next to every prompt block (.bubble.u, .q) */
 .copy-btn {
 position: absolute; top: 6px; right: 6px;
 display: inline-flex; align-items: center; gap: 4px;
 background: rgba(255,255,255,0.18);
 color: inherit;
 border: 1px solid rgba(255,255,255,0.32);
 font-family: 'DM Sans', sans-serif;
 font-size: 9.5px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
 padding: 4px 8px 4px 7px; border-radius: 999px;
 cursor: pointer; line-height: 1;
 transition: background 0.15s, transform 0.15s, opacity 0.15s;
 opacity: 0.7;
 backdrop-filter: blur(4px);
 }
 .copy-btn:hover { opacity: 1; background: rgba(255,255,255,0.32); transform: translateY(-1px); }
 .copy-btn svg { flex-shrink: 0; }
 .copy-btn.copied { background: white; color: var(--pink); border-color: white; opacity: 1; }
 /* Light variant on the dashed-bordered .q boxes (white bg) */
 .q .copy-btn, .exercise-body .q .copy-btn {
 background: var(--pink-pale); border-color: rgba(232,41,92,0.35); color: var(--pink);
 }
 .q .copy-btn:hover, .exercise-body .q .copy-btn:hover { background: var(--pink); color: white; border-color: var(--pink); }
 .q .copy-btn.copied, .exercise-body .q .copy-btn.copied { background: var(--pink); color: white; border-color: var(--pink); }
 /* Make .q boxes have room for the button */
 .q, .exercise-body .q { padding-right: 70px !important; position: relative; }
 .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 24px 0; }
 .stat-card { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 18px; text-align: center; }
 .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 600; color: var(--pink); line-height: 1; margin-bottom: 6px; }
 .stat-lab { font-size: 12px; color: var(--mid); line-height: 1.4; }
 .a-quote { font-family: 'Cormorant Garamond', serif; font-size: 21px; font-style: italic; font-weight: 400; color: var(--dark); line-height: 1.5; border-left: 3px solid var(--pink); padding: 12px 20px; margin: 26px 0; }
 .divider { display: flex; align-items: center; gap: 14px; margin: 28px 0; }
 .divider::before.divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
 .divider span { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--mid); font-weight: 600; }
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
 .layout { flex-direction: column; height: auto; }
 .left { width: 100%; min-width: unset; max-width: unset; height: auto; padding-bottom: 0; }
 .left-inner { padding: 18px 22px 8px; flex-direction: column; align-items: stretch; gap: 0; height: auto; }
 .l-num-bg { display: none; }
 .vid-wrap { margin-top: 14px; flex: unset; }
 .vid-box { aspect-ratio: 9/16; height: auto; max-height: 70vh; width: 75vw; max-width: 280px; margin: 0 auto; border-radius: 16px; }
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
 <a href="/" className="course-brand" aria-label="Back to Ayla Unlocked home"><BrandLogo size={20} className="mr-2" />Ayla <span>Unlocked</span></a>
 <div className="progress-track" role="navigation" aria-label="Lesson progress">
 <div className="progress-track-bg" />
 <div
 className="progress-track-fill"
 style={{ width: lessons.length > 1 ? `${(cur / (lessons.length - 1)) * 100}%` : '0%' }}
 />
 {lessons.map((les, i) => {
 const isDone = progress.completed_lessons.includes(i)
 const hasBm = progress.bookmarks.includes(i)
 return (
 <button
 key={i}
 type="button"
 className={`progress-track-tick${i === cur ? ' now' : (isDone || i < cur) ? ' done' : ''}${hasBm ? ' has-bookmark' : ''}`}
 onClick={() => go(0, i)}
 title={les.tag + (hasBm ? ' ★' : '') + (isDone ? ' ✓' : '')}
 aria-label={les.tag}
 />
 )
 })}
 <div
 className="progress-track-marker"
 style={{ left: lessons.length > 1 ? `${(cur / (lessons.length - 1)) * 100}%` : '0%' }}
 aria-hidden="true"
 >
 <svg viewBox="0 0 24 24" fill="currentColor">
 <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
 </svg>
 </div>
 </div>
 <div className="top-links">
 {progress.streak_days > 0 && (
 <span className="streak" title={`Longest streak: ${progress.longest_streak} days`}>
 <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M13 2S4 12 4 17a8 8 0 0 0 16 0c0-2-1-4-2.5-5.5L15 9s1 4-1 5c0-3-1-5-1-5V2z"/></svg>
 {progress.streak_days}
 </span>
 )}
 <a className="top-link" href="/course/prompts">Prompts</a>
 <a className="top-link" href="/course/real-chats">Chats</a>
 <a className="top-link" href="/course/notes">Notes</a>
 <a className="top-link" href="/course/submit">Submit</a>
 <button className="glossary-btn" onClick={() => setGlossaryOpen(true)}>Glossary</button>
 </div>
 </nav>

 <div className="layout">
 <div className="left">
 <div className="left-inner">
 <div className="l-tag">{l.tag}</div>
 <div className="l-title">{l.leftTitle}</div>
 {l.num && <div className="l-num-bg">{l.num}</div>}
 <div className="vid-wrap">
 <div className="vid-box">
 <VideoPlayer
 src={`/videos/lesson-${String(cur).padStart(2, '0')}.mp4`}
 fallback={
 <div className="vid-fallback">
 <div className="vid-icon">
 <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
 </div>
 <div className="vid-label">{l.vid}</div>
 </div>
 }
 />
 </div>
 </div>
 </div>
 </div>
 <div className="right" ref={rightRef}>
 <div className="lesson-toolbar">
 <button
 className={`toolbar-btn toolbar-btn-icon ${isBookmarked ? 'on' : ''}`}
 onClick={toggleBookmark}
 title={isBookmarked ? 'Saved, click to remove' : 'Save this lesson'}
 aria-label="Save lesson"
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
 </button>
 <button
 className={`toolbar-btn toolbar-btn-icon ${isConfused ? 'on' : ''}`}
 onClick={toggleConfused}
 title={isConfused ? "Flagged as confusing, click to un-flag" : "This part's confusing? Flag it for Ayla"}
 aria-label="Flag as confusing"
 >
 <svg viewBox="0 0 24 24" width="16" height="16">
 <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
 <path d="M9.2 9.5 a2.8 2.8 0 1 1 4.4 2.3 c-1 .55 -1.6 1.05 -1.6 2.3" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
 <circle cx="12" cy="17.2" r="1.05" fill="currentColor" />
 </svg>
 </button>
 <button
 className={`toolbar-btn toolbar-btn-icon ${noteDraft.trim() ? 'on' : ''}`}
 onClick={() => setNotesOpen((v) => !v)}
 title={noteDraft.trim() ? 'You have a note on this lesson' : 'Add a note on this lesson'}
 aria-label="Notes"
 >
 <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={noteDraft.trim() ? 'currentColor' : 'none'} />
 <polyline points="14 2 14 8 20 8" stroke={noteDraft.trim() ? 'white' : 'currentColor'} />
 <line x1="8" y1="13" x2="16" y2="13" stroke={noteDraft.trim() ? 'white' : 'currentColor'} />
 <line x1="8" y1="17" x2="13" y2="17" stroke={noteDraft.trim() ? 'white' : 'currentColor'} />
 </svg>
 </button>
 </div>

 {notesOpen && (
 <div className="notes-popover">
 <div className="notes-head">
 <span className="notes-label">Your note on this lesson</span>
 <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
 <span className={`notes-status s-${noteSaved}`}>
 {noteSaved === 'saving' ? 'saving…' : noteSaved === 'saved' ? 'saved' : ''}
 </span>
 <button
 onClick={() => setNotesOpen(false)}
 aria-label="Close notes"
 style={{ background: 'transparent', border: 'none', color: 'var(--mid)', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}
 >×</button>
 </div>
 </div>
 <textarea
 className="notes-input"
 placeholder="Jot something down, ideas, questions, things you want to try..."
 value={noteDraft}
 onChange={(e) => setNoteDraft(e.target.value)}
 rows={5}
 autoFocus
 />
 <a className="notes-all-link" href="/course/notes">
 See all my notes &amp; saves &rarr;
 </a>
 </div>
 )}
 <div
 className="lesson-wrap"
 key={cur}
 dangerouslySetInnerHTML={{ __html: l.html }}
 onClick={(e) => {
 // Click an existing highlight to remove it
 const t = e.target as HTMLElement
 if (t?.tagName === 'MARK' && t.classList.contains('au-hl')) {
 const text = t.textContent || ''
 if (confirm('Remove this highlight?')) removeHighlight(text)
 }
 }}
 />
 {highlightPopup && (
 <button
 className="hl-popup"
 style={{ left: highlightPopup.x, top: highlightPopup.y }}
 onMouseDown={(e) => e.preventDefault()}
 onClick={() => addHighlight(highlightPopup.text)}
 >
 <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
 <path d="M9 11L7 9l-4 4v4h4l4-4-2-2zm9.7-7.3l-1.4-1.4a1 1 0 0 0-1.4 0L8 10.2l3.8 3.8 7.9-7.9a1 1 0 0 0 0-1.4z"/>
 </svg>
 Highlight
 </button>
 )}
 </div>
 </div>

 <div className="bot-nav">
 <button className="nav-btn prev" disabled={cur === 0} onClick={() => go(-1)}>Previous</button>
 <div className="nav-cnt">{lessons[cur].num ? `${lessons[cur].num} / 29` : 'Intro'}</div>
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
 <div className="g-def" dangerouslySetInnerHTML={{ __html: g.def }} />
 </div>
 ))}
 </div>
 </div>

 {/* QUIZ */}
 <div className={`q-overlay${quizOpen ? ' open' : ''}`}>
 <button className="q-close" onClick={() => setQuizOpen(false)}>&times;</button>
 <div className="q-inner">
 {qStep < activeQuizSteps.length ? (
 <div>
 <div className="q-num">{qStep + 1} of {activeQuizSteps.length}{quizMode === 'client' && ' · Money mode'}</div>
 <div className="q-question">{activeQuizSteps[qStep].q}</div>
 {activeQuizSteps[qStep].hint && <div className="q-hint">{activeQuizSteps[qStep].hint}</div>}
 <div className="q-opts">
 {activeQuizSteps[qStep].opts.map((o) => (
 <button
 key={o.v}
 className={`q-opt${isQSel(qStep, o.v) ? ' sel' : ''}`}
 onClick={() => pickQ(qStep, o.v, activeQuizSteps[qStep].multi)}
 >
 {o.l}
 </button>
 ))}
 </div>
 <button className="q-go" onClick={() => setQStep(qStep + 1)}>
 {qStep === activeQuizSteps.length - 1 ? 'See my ideas' : 'Next'}
 </button>
 {qStep > 0 && <button className="q-back" onClick={() => setQStep(qStep - 1)}>Go back</button>}
 </div>
 ) : (
 <div>
 <div className="q-num">Your results</div>
 <div className="q-question" style={{ fontSize: '28px', marginBottom: '24px' }}>{quizHeadline}</div>
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

 {/* TIKTOK NUDGE, lesson 4 / 8 / 13 */}
 {showNotif && activeNotif && (
 <div className="tk-overlay" onClick={(e) => { if (e.target === e.currentTarget) dismissNotif() }}>
 <div className="tk-card">
 <button className="tk-close" onClick={dismissNotif} aria-label="Close">&times;</button>
 <div className="tk-eyebrow">From Ayla</div>
 <div className="tk-title">{activeNotif.title}</div>
 <p className="tk-body">{activeNotif.body}</p>
 <div className="tk-handle">@aylablumberg.ai</div>
 <div className="tk-actions">
 <a
 className="tk-primary"
 href="https://www.tiktok.com/@aylablumberg.ai"
 target="_blank"
 rel="noopener noreferrer"
 onClick={dismissNotif}
 >
 {activeNotif.cta}
 </a>
 <button className="tk-secondary" onClick={dismissNotif}>Later</button>
 </div>
 </div>
 </div>
 )}

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
// CompletionPanel, final screen with name input + Complete Course button.
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
 {/* Completion video, Ayla on camera celebrating with the student */}
 <div style={{ position: 'relative', width: '100%', maxWidth: 320, aspectRatio: '9 / 16', maxHeight: 480, margin: '0 auto 24px', borderRadius: 18, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 18px 50px rgba(232,41,92,0.18)', background: '#000' }}>
 <VideoPlayer src="/videos/completion.mp4" />
 </div>
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
