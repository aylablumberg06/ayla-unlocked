'use client'

/**
 * Ayla "thinking" character used as the loading indicator across the site.
 * Shows when a route is loading or any async UI is mid-flight.
 *
 * Usage:
 *   <AylaLoader />               — fullscreen overlay
 *   <AylaLoader inline />        — inline (e.g. inside a card)
 *   <AylaLoader size={32} />     — custom size
 */
export default function AylaLoader({
  inline,
  size,
  label,
}: {
  inline?: boolean
  size?: number
  label?: string
}) {
  const px = size ?? (inline ? 56 : 140)
  const wrapClass = inline
    ? 'inline-flex flex-col items-center gap-2'
    : 'fixed inset-0 z-[120] flex flex-col items-center justify-center gap-3 bg-[rgba(253,246,240,0.92)] backdrop-blur-sm'
  return (
    <div className={wrapClass} role="status" aria-live="polite">
      <span
        className="ayla-loader-bob inline-block rounded-full overflow-hidden"
        style={{ width: px, height: px, boxShadow: '0 10px 28px rgba(232,41,92,0.22)' }}
      >
        <AylaThinkingAvatar />
      </span>
      {(label || !inline) && (
        <span className="text-[10px] font-semibold tracking-[2.5px] uppercase text-pink">
          {label ?? 'Loading…'}
        </span>
      )}
      <style jsx>{`
        .ayla-loader-bob {
          animation: aylaBob 1.6s ease-in-out infinite;
        }
        @keyframes aylaBob {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayla-loader-bob { animation: none; }
        }
      `}</style>
    </div>
  )
}

/**
 * Brighter, less-black avatar so the loader doesn't look like a dark
 * blob at small sizes. Hair is warm honey-brown (was near-black brown),
 * eyes are deep plum (was #1A1A1A), and the whole face is bigger
 * relative to the frame so the character reads clearly even at 56px.
 */
function AylaThinkingAvatar() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      {/* warm pale background */}
      <rect width="64" height="64" fill="#FFE4ED" />
      {/* hair — softer caramel instead of dark brown */}
      <path d="M10 36 C10 18 22 8 32 8 C42 8 54 18 54 36 L54 60 L10 60 Z" fill="#B8763C" />
      {/* highlight on hair */}
      <path d="M14 30 C18 22 24 16 32 16 C40 16 46 22 50 30 C46 26 40 24 32 24 C24 24 18 26 14 30 Z" fill="#D89758" opacity="0.7" />
      {/* face */}
      <ellipse cx="32" cy="34" rx="16" ry="18" fill="#F8DBC0" />
      {/* eyes — deep plum, softer than near-black */}
      <ellipse cx="25" cy="32" rx="1.6" ry="2.2" fill="#5C2C50" />
      <ellipse cx="39" cy="32" rx="1.6" ry="2.2" fill="#5C2C50" />
      {/* tiny eye highlight */}
      <circle cx="25.4" cy="31.4" r="0.5" fill="#FFF" />
      <circle cx="39.4" cy="31.4" r="0.5" fill="#FFF" />
      {/* eyebrows */}
      <path d="M22 28 C24 26.6 27 26.6 28.5 28" stroke="#8B5A33" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M35.5 28 C37 26.6 40 26.6 42 28" stroke="#8B5A33" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* smile */}
      <path d="M27 41 C30 43 34 43 37 41" stroke="#C45575" strokeWidth="1.7" fill="none" strokeLinecap="round" />
      {/* blush */}
      <circle cx="22" cy="38" r="2.6" fill="#FF9BB3" opacity="0.55" />
      <circle cx="42" cy="38" r="2.6" fill="#FF9BB3" opacity="0.55" />
      {/* sparkles around the head */}
      <g fill="#E8295C">
        <circle cx="51" cy="14" r="1.2" />
        <circle cx="13" cy="18" r="0.9" />
        <circle cx="55" cy="26" r="0.8" />
      </g>
    </svg>
  )
}
