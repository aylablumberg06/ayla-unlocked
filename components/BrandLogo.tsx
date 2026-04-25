/**
 * Small inline logo lockup matching the favicon (option 8: pink padlock + cream "AU").
 * Use beside or inside the "Ayla Unlocked" wordmark anywhere on the site.
 *
 * Default size = 28px. Pass `size` to override.
 *
 * Renders as inline-block so it sits beside text comfortably.
 */
export default function BrandLogo({
 size = 28,
 className = '',
}: {
 size?: number
 className?: string
}) {
 return (
 <span
 aria-hidden="true"
 className={`inline-block shrink-0 align-middle ${className}`}
 style={{ width: size, height: size }}
 >
 <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
 <rect width="256" height="256" rx="56" fill="#E8295C" />
 <path
 d="M82 124 V 80 a44 44 0 0 1 88 0 V 96"
 fill="none"
 stroke="#FDF6F0"
 strokeWidth="18"
 strokeLinecap="round"
 />
 <rect x="56" y="120" width="144" height="100" rx="16" fill="#FDF6F0" />
 <text
 x="128"
 y="195"
 textAnchor="middle"
 fontFamily="'Cormorant Garamond', Georgia, serif"
 fontStyle="italic"
 fontSize="86"
 fontWeight="500"
 fill="#E8295C"
 letterSpacing="-2"
 >
 AU
 </text>
 </svg>
 </span>
 )
}
