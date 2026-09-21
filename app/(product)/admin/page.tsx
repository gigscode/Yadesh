import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from '@/components/admin-dashboard'

export const metadata = {
  title: 'Content Admin | Yadesh',
}

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Must be authenticated to access /admin
  if (!user) {
    redirect('/login?redirect=/admin')
  }

  // Verify that the user has admin rights
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    // Non-admin authenticated users are redirected away to their home feed
    redirect('/learn')
  }

  // Fetch recent cards from database
  const { data: dbCards } = await supabase
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminDashboard userEmail={user.email || ''} initialCards={dbCards || []} />
}

