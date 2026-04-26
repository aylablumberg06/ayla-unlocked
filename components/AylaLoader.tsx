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
  const px = size ?? (inline ? 36 : 88)
  const wrapClass = inline
    ? 'inline-flex flex-col items-center gap-2'
    : 'fixed inset-0 z-[120] flex flex-col items-center justify-center gap-3 bg-[rgba(253,246,240,0.78)] backdrop-blur-sm'
  return (
    <div className={wrapClass} role="status" aria-live="polite">
      <span
        className="ayla-loader-bob inline-block rounded-full overflow-hidden"
        style={{ width: px, height: px, boxShadow: '0 8px 22px rgba(232,41,92,0.18)' }}
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

function AylaThinkingAvatar() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
      <rect width="64" height="64" fill="#FFE4ED" />
      <path d="M10 38 C10 20 22 10 32 10 C42 10 54 20 54 38 L54 58 L10 58 Z" fill="#6B3D2A" />
      <ellipse cx="32" cy="34" rx="15" ry="17" fill="#F5D2B8" />
      <path d="M17 26 C20 19 26 15 32 15 C38 15 44 18 47 26 C43 22 37 21 32 21 C27 21 22 23 17 26 Z" fill="#6B3D2A" />
      <ellipse cx="26" cy="31" rx="1.4" ry="2" fill="#1A1A1A" />
      <ellipse cx="38" cy="31" rx="1.4" ry="2" fill="#1A1A1A" />
      <path d="M23 28 C25 26 28 26 29 28" stroke="#3B2416" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M35 27 C37 25 40 26 41 28" stroke="#3B2416" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M28 42 C30 43 33 43 36 41" stroke="#C45575" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <circle cx="23" cy="38" r="2.3" fill="#FF9BB3" opacity="0.55" />
      <circle cx="41" cy="38" r="2.3" fill="#FF9BB3" opacity="0.55" />
      <circle cx="32" cy="48" r="2.2" fill="#F5D2B8" />
      <path d="M32 46 L34 42 L36 41" stroke="#F5D2B8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="49" cy="14" r="4" fill="white" stroke="#E8295C" strokeWidth="1" />
      <circle cx="44" cy="20" r="1.8" fill="white" stroke="#E8295C" strokeWidth="0.8" />
    </svg>
  )
}
