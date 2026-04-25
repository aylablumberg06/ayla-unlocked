import { Suspense } from 'react'
import Paygate from '@/components/Paygate'

export const metadata = {
 title: 'Ayla Unlocked, Get Access',
}

export default function UnlockPage() {
 return (
 <Suspense fallback={<div className="min-h-screen bg-cream" />}>
 <Paygate />
 </Suspense>
 )
}
