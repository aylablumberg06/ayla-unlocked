'use client'

import { usePathname } from 'next/navigation'
import AskAylaWidget from '@/components/AskAylaWidget'
import PageTracker from '@/components/PageTracker'
import CmdKSearch from '@/components/CmdKSearch'

/**
 * Client wrapper that decides whether to render the Ask-Ayla widget
 * and the PageTracker on the current route. Kept in one place so layout.tsx
 * stays a pure server component.
 */
export default function ConditionalChrome() {
  const pathname = usePathname()
  const hideWidget =
    !!pathname && (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/course/certificate')
    )

  return (
    <>
      <PageTracker />
      <CmdKSearch />
      {!hideWidget && <AskAylaWidget />}
    </>
  )
}
