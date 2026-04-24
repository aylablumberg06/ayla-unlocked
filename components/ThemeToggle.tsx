'use client'

import { useEffect, useState } from 'react'

/**
 * Light / dark theme toggle. Default = light.
 * Persists choice to localStorage under key "au-theme".
 * Applies `dark` class to <html> so CSS can swap variables.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('au-theme')) || 'light'
    const t = saved === 'dark' ? 'dark' : 'light'
    setTheme(t)
    document.documentElement.classList.toggle('dark', t === 'dark')
  }, [])

  if (!theme) return null

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('au-theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.5-7.5-1.4 1.4M7.9 16.1l-1.4 1.4m11 0-1.4-1.4M7.9 7.9 6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
        </svg>
      )}
    </button>
  )
}
