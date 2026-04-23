'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: 0 | 1 | 2 | 3
  className?: string
  /**
   * If true, only reveal once. Default true.
   * Set false to re-trigger on every scroll-in (rare).
   */
  once?: boolean
  threshold?: number
}

/** Fades + rises into view as you scroll to it. */
export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  once = true,
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            if (once) obs.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once, threshold])

  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${delayClass} ${className}`}>
      {children}
    </div>
  )
}

/** Top-of-page scroll progress bar. Drop once near the top of your layout. */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const scrollable = h.scrollHeight - h.clientHeight
        setProgress(scrollable > 0 ? h.scrollTop / scrollable : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <div className="scroll-progress" style={{ ['--scroll-progress' as string]: progress }} />
  )
}
