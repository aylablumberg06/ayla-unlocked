import { Suspense } from 'react'
import LoginForm from '@/components/LoginForm'

export const metadata = {
 title: 'Ayla Unlocked, Log in',
}

export default function LoginPage() {
 return (
 <Suspense fallback={<div className="min-h-screen bg-cream" />}>
 <LoginForm />
 </Suspense>
 )
}
