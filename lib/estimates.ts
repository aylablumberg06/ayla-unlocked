// Auto-generated reading/viewing estimates. Regenerate if lessons or video scripts change.

export const LESSON_ESTIMATES: { index: number; readSec: number; watchSec: number }[] = [
  { index: 0, readSec: 58, watchSec: 75 },
  { index: 1, readSec: 112, watchSec: 90 },
  { index: 2, readSec: 107, watchSec: 105 },
  { index: 3, readSec: 65, watchSec: 75 },
  { index: 4, readSec: 101, watchSec: 105 },
  { index: 5, readSec: 120, watchSec: 75 },
  { index: 6, readSec: 61, watchSec: 60 },
  { index: 7, readSec: 96, watchSec: 75 },
  { index: 8, readSec: 86, watchSec: 75 },
  { index: 9, readSec: 97, watchSec: 90 },
  { index: 10, readSec: 78, watchSec: 60 },
  { index: 11, readSec: 72, watchSec: 75 },
  { index: 12, readSec: 70, watchSec: 75 },
  { index: 13, readSec: 110, watchSec: 75 },
  { index: 14, readSec: 66, watchSec: 90 },
  { index: 15, readSec: 52, watchSec: 60 },
  { index: 16, readSec: 91, watchSec: 90 },
  { index: 17, readSec: 58, watchSec: 60 },
  { index: 18, readSec: 75, watchSec: 90 },
  { index: 19, readSec: 79, watchSec: 90 },
  { index: 20, readSec: 100, watchSec: 90 },
  { index: 21, readSec: 148, watchSec: 120 },
  { index: 22, readSec: 140, watchSec: 105 },
  { index: 23, readSec: 130, watchSec: 75 },
  { index: 24, readSec: 76, watchSec: 105 },
  { index: 25, readSec: 110, watchSec: 75 },
  { index: 26, readSec: 140, watchSec: 120 },
  { index: 27, readSec: 180, watchSec: 120 },
  { index: 28, readSec: 160, watchSec: 120 },
]

export const TOTAL_READ_SEC = 2839
export const TOTAL_WATCH_SEC = 2520
/** 13 hands-on exercises — realistic completion time (~89 min total). */
export const TOTAL_HANDS_ON_SEC = 89 * 60
export const TOTAL_COMBINED_SEC = TOTAL_READ_SEC + TOTAL_WATCH_SEC + TOTAL_HANDS_ON_SEC

export function formatMinutes(sec: number): string {
  const m = Math.max(1, Math.round(sec / 60))
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60); const r = m % 60
  return r === 0 ? `${h} hr` : `${h} hr ${r} min`
}
