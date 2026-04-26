import LeadsClient from './LeadsClient'
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Leads · Ayla Unlocked Admin' }

export default async function LeadsPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const ownerEmail = (process.env.OWNER_EMAIL || 'aylablumberg06@gmail.com').toLowerCase()
  if (!user?.email || user.email.toLowerCase() !== ownerEmail) {
    redirect('/login?next=/admin/leads')
  }

  const admin = createSupabaseAdminClient()
  const { data, error } = await admin
    .from('tiktok_leads')
    .select('*')
    .order('intent_score', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(500)

  return <LeadsClient initialLeads={data ?? []} initialError={error?.message ?? null} />
}
