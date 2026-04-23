import Link from 'next/link'
import { renderCertificateHtml, makeCertId } from '@/lib/certificate-html'

export const metadata = {
  title: 'Ayla Unlocked, Your Certificate',
}

// Query params: ?name=...&id=...&date=...
export default function CertificatePage({
  searchParams,
}: {
  searchParams: { name?: string; id?: string; date?: string }
}) {
  const name = (searchParams.name || '').trim()
  const hasName = name.length > 0
  const certId = searchParams.id || makeCertId(name || 'preview')
  const date = searchParams.date || new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })

  const certHtml = renderCertificateHtml({
    name: hasName ? name : '[Your Name Here]',
    dateString: date,
    certId,
    mode: 'fragment',
  })

  return (
    <main className="min-h-screen bg-cream">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(253,246,240,0.92)] border-b border-[color:var(--border)] print:hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <Link href="/course" className="font-serif text-lg tracking-wide">
            Ayla <span className="text-pink italic">Unlocked</span>
          </Link>
          <div className="flex gap-3 text-[11px] tracking-[1.5px] uppercase">
            <PrintButton />
            <Link href="/course" className="text-mid hover:text-pink px-3 py-1.5">Back to course</Link>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div dangerouslySetInnerHTML={{ __html: certHtml }} />
      </div>

      {!hasName && (
        <div className="max-w-3xl mx-auto px-6 pb-12 print:hidden">
          <div className="bg-white rounded-2xl border border-[color:var(--border)] p-6 mt-8 text-sm text-mid">
            This is a preview. To generate your real certificate with your name, click{' '}
            <strong className="text-dark">Complete Course</strong> at the end of lesson 19.
          </div>
        </div>
      )}
    </main>
  )
}

function PrintButton() {
  // Server component, render a client-safe link that triggers print()
  return (
    <a
      href="javascript:window.print()"
      className="bg-pink text-white px-4 py-1.5 rounded-full hover:bg-[#C51F4E] transition"
    >
      Download PDF
    </a>
  )
}
