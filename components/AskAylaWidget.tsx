'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

const INITIAL_BOT_MSG: Msg = {
  role: 'assistant',
  content:
    "Hi! I'm Ayla's little assistant. Ask me anything about the course, Claude, pricing, setup, whatever. If I can't answer it, I'll get Ayla for you.",
}

export default function AskAylaWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([INITIAL_BOT_MSG])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [handoff, setHandoff] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [forwardStatus, setForwardStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const logRef = useRef<HTMLDivElement>(null)

  // The /course dashboard has a fixed bottom Prev/Next nav (68px tall) —
  // push the bubble above it so they don't overlap.
  const isCoursePage = pathname === '/course'
  const buttonBottom = isCoursePage ? 'bottom-[90px] md:bottom-24' : 'bottom-5'
  const panelBottom = isCoursePage ? 'bottom-[158px] md:bottom-[168px]' : 'bottom-24'

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  async function send() {
    const text = input.trim()
    if (!text || sending) return
    const next: Msg[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setSending(true)
    try {
      const r = await fetch('/api/ask-claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const { reply, error } = await r.json()
      if (error) throw new Error(error)
      setMessages([...next, { role: 'assistant', content: reply || "Hmm, not sure. Try asking Ayla directly." }])
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            "Hmm, I'm having trouble right now. Tap \"Ask Ayla directly\" below and she'll get back to you.",
        },
      ])
    } finally {
      setSending(false)
    }
  }

  async function forwardToAyla() {
    if (forwardStatus === 'sending') return
    if (!email.trim() || !email.includes('@')) {
      alert('Need your email so she can reply.')
      return
    }
    setForwardStatus('sending')
    try {
      const r = await fetch('/api/ask-ayla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), transcript: messages }),
      })
      if (!r.ok) throw new Error()
      setForwardStatus('sent')
    } catch {
      setForwardStatus('error')
    }
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        aria-label="Ask Ayla"
        onClick={() => setOpen((v) => !v)}
        className={`fixed ${buttonBottom} right-5 z-[70] group transition-all`}
      >
        <span className="block relative w-16 h-16 rounded-full bg-pink text-white shadow-xl shadow-pink/25 hover:shadow-pink/40 transition-all overflow-hidden border-2 border-white">
          {/* Ayla avatar, thinking face SVG placeholder. Swap /public/ayla-thinking.png in when you have a real photo. */}
          <AylaThinkingAvatar />
        </span>
        {/* static ring (no pulsing) */}
        <span className="absolute inset-0 rounded-full ring-2 ring-pink/20 -z-0" />
        {/* label */}
        <span className="absolute -top-9 right-0 bg-dark text-white text-[10px] tracking-[1.5px] uppercase px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
          Ask Ayla
        </span>
      </button>

      {/* CHAT PANEL */}
      {open && (
        <div className={`fixed ${panelBottom} right-5 z-[70] w-[92vw] max-w-[380px] h-[560px] max-h-[70vh] rounded-3xl bg-cream border border-[color:var(--border)] shadow-2xl shadow-pink/10 flex flex-col overflow-hidden`}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-[color:var(--border)] flex items-center gap-3 bg-white/60">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink bg-pink-light">
              <AylaThinkingAvatar />
            </div>
            <div className="flex-1">
              <div className="font-serif italic text-lg leading-tight">Ask Ayla</div>
              <div className="text-[10px] uppercase tracking-[1.5px] text-pink">Powered by Claude</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-pink-light text-pink hover:bg-pink hover:text-white transition flex items-center justify-center text-lg"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          {!handoff ? (
            <>
              {/* Messages */}
              <div ref={logRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-2 text-[14px]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl leading-snug ${
                        m.role === 'user'
                          ? 'bg-pink text-white rounded-br-md'
                          : 'bg-white text-dark rounded-bl-md border border-[color:var(--border)]'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[color:var(--border)] rounded-2xl rounded-bl-md px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-pink animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-pink animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-[color:var(--border)] bg-white/60">
                <div className="flex gap-2 items-end">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        send()
                      }
                    }}
                    placeholder="Ask anything..."
                    rows={1}
                    className="flex-1 resize-none px-3 py-2.5 rounded-2xl border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none text-[14px] max-h-24"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || sending}
                    className="w-10 h-10 rounded-full bg-pink text-white flex items-center justify-center hover:bg-[#C51F4E] transition disabled:opacity-40"
                    aria-label="Send"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => setHandoff(true)}
                  className="mt-2 text-[11px] tracking-[1.5px] uppercase text-pink hover:underline w-full text-center py-1"
                >
                  Ask Ayla directly &rarr;
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {forwardStatus !== 'sent' ? (
                <>
                  <div className="font-serif italic text-xl mb-2">Sending this chat to Ayla.</div>
                  <p className="text-[13px] text-mid mb-5 font-light">
                    Drop your name and email and she&apos;ll reply personally. She reads every message.
                  </p>
                  <div className="space-y-3 mb-4">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3 py-2.5 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none text-[14px]"
                    />
                    <input
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-3 py-2.5 rounded-lg border border-[color:var(--border)] bg-white focus:border-pink focus:outline-none text-[14px]"
                    />
                  </div>
                  {forwardStatus === 'error' && (
                    <p className="text-[12px] text-pink mb-3">Couldn&apos;t send. Try again?</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHandoff(false)}
                      className="flex-1 text-[11px] tracking-[1px] uppercase text-mid border border-[color:var(--border)] rounded-full py-2.5 hover:border-pink hover:text-pink transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={forwardToAyla}
                      disabled={forwardStatus === 'sending'}
                      className="flex-1 bg-pink text-white text-[11px] tracking-[1px] uppercase rounded-full py-2.5 hover:bg-[#C51F4E] transition disabled:opacity-50"
                    >
                      {forwardStatus === 'sending' ? 'Sending...' : 'Send to Ayla'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="font-serif italic text-2xl mb-3">It&apos;s on its way.</div>
                  <p className="text-[13px] text-mid leading-relaxed font-light">
                    Ayla will reply to <span className="text-dark">{email}</span> personally. She reads every message.
                  </p>
                  <button
                    onClick={() => {
                      setOpen(false)
                      setTimeout(() => {
                        setHandoff(false)
                        setForwardStatus('idle')
                        setMessages([INITIAL_BOT_MSG])
                      }, 300)
                    }}
                    className="mt-6 bg-pink text-white text-[11px] tracking-[1.5px] uppercase rounded-full px-6 py-2.5 hover:bg-[#C51F4E] transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

/**
 * Ayla thinking-face avatar. Stylized SVG placeholder.
 * To use a real photo: put `public/ayla-thinking.png` and replace this with:
 *   <img src="/ayla-thinking.png" alt="Ayla" className="w-full h-full object-cover" />
 */
function AylaThinkingAvatar() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      {/* soft pink backdrop */}
      <rect width="64" height="64" fill="#FFE4ED" />
      {/* hair back */}
      <path d="M10 38 C10 20 22 10 32 10 C42 10 54 20 54 38 L54 58 L10 58 Z" fill="#6B3D2A" />
      {/* face */}
      <ellipse cx="32" cy="34" rx="15" ry="17" fill="#F5D2B8" />
      {/* hair bangs */}
      <path d="M17 26 C20 19 26 15 32 15 C38 15 44 18 47 26 C43 22 37 21 32 21 C27 21 22 23 17 26 Z" fill="#6B3D2A" />
      {/* eyes, looking up (thinking) */}
      <ellipse cx="26" cy="31" rx="1.4" ry="2" fill="#1A1A1A" />
      <ellipse cx="38" cy="31" rx="1.4" ry="2" fill="#1A1A1A" />
      {/* brow, raised on one side */}
      <path d="M23 28 C25 26 28 26 29 28" stroke="#3B2416" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M35 27 C37 25 40 26 41 28" stroke="#3B2416" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* mouth, slight side purse, thinking */}
      <path d="M28 42 C30 43 33 43 36 41" stroke="#C45575" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* cheek blush */}
      <circle cx="23" cy="38" r="2.3" fill="#FF9BB3" opacity="0.55" />
      <circle cx="41" cy="38" r="2.3" fill="#FF9BB3" opacity="0.55" />
      {/* finger on chin */}
      <circle cx="32" cy="48" r="2.2" fill="#F5D2B8" />
      <path d="M32 46 L34 42 L36 41" stroke="#F5D2B8" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* thought bubble */}
      <circle cx="49" cy="14" r="4" fill="white" stroke="#E8295C" strokeWidth="1" />
      <circle cx="44" cy="20" r="1.8" fill="white" stroke="#E8295C" strokeWidth="0.8" />
    </svg>
  )
}
