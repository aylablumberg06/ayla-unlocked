import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'
import { TIKTOK_SCRIPTS } from '@/lib/tiktok-scripts'
import TikTokScriptsClient from './TikTokScriptsClient'

export const metadata = {
 title: 'Ayla Unlocked, TikTok Scripts',
}
export const dynamic = 'force-dynamic'

export default function TikTokScriptsPage() {
 return (
 <main className="min-h-screen bg-cream text-dark">
 <nav className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(253,246,240,0.95)] border-b border-[color:var(--border)]">
 <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
 <Link href="/admin" className="font-serif text-lg tracking-wide flex items-center">
 <BrandLogo size={22} className="mr-2" />Ayla <span className="text-pink italic mx-1">Unlocked</span>
 <span className="text-xs text-muted-light tracking-[2px] uppercase ml-3">TikTok scripts</span>
 </Link>
 <Link href="/admin" className="text-[11px] tracking-[1.5px] uppercase text-mid hover:text-pink">&larr; Admin</Link>
 </div>
 </nav>

 <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
 <h1 className="font-serif italic text-4xl md:text-5xl mb-3">TikTok scripts.</h1>
 <p className="text-mid font-light max-w-2xl mb-10 leading-relaxed">
 Marketing scripts for the course. Each one has a hook, beat-by-beat
 dialogue paired with what to show on screen, and a checklist of
 visuals to capture before filming. Tap <span className="font-semibold">Copy</span> on any
 script to grab just the spoken text.
 </p>

 <TikTokScriptsClient scripts={TIKTOK_SCRIPTS} />
 </div>
 </main>
 )
}
