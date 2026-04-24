// ────────────────────────────────────────────────────────────
// Auto-censor: strike-through profanity so younger readers get the
// message without the raw word hitting. Used by CourseDashboard
// (DOM-level pass) and by the real-chats page (string-level pass).
// Matches case-insensitive, word-boundary, and preserves the original
// casing. Common compound/suffix variants are covered.
// ────────────────────────────────────────────────────────────

const BASE = [
  // explicit
  'fuck', 'fucks', 'fucked', 'fucking', 'fucker',
  'shit', 'shits', 'shitty', 'shitting',
  'bitch', 'bitches',
  'damn', 'damned', 'damnit', 'dammit',
  'bastard', 'bastards',
  'asshole', 'assholes',
  'piss', 'pissed', 'pissing',
  'crap', 'crappy',
]

// Build a single regex: case-insensitive, word-bounded
const PATTERN = new RegExp(`\\b(${BASE.join('|')})\\b`, 'gi')

/** Wraps profane words with <s class="au-censor">…</s>. */
export function censorHtml(s: string): string {
  if (!s) return s
  return s.replace(PATTERN, (m) => `<s class="au-censor">${m}</s>`)
}

/** Returns true if the string contains any profanity. */
export function hasProfanity(s: string): boolean {
  if (!s) return false
  PATTERN.lastIndex = 0
  return PATTERN.test(s)
}

/** The shared regex for other consumers (DOM walkers, etc.) */
export const PROFANITY_REGEX = PATTERN
