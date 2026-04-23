import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import ConditionalChrome from '@/components/ConditionalChrome'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ayla Unlocked',
  description:
    "A course by Ayla Blumberg. Learn how to build with AI, no code, no coding background, no gatekeeping. I'll teach you how to build things that run while you sleep.",
  openGraph: {
    title: 'Ayla Unlocked',
    description: "Learn how to build with AI, I'll teach you how to build things that run while you sleep.",
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="grain">
        {children}
        <ConditionalChrome />
      </body>
    </html>
  )
}
