import { createClient } from '@/lib/supabase/server'
import LegacyFeed from '@/components/legacy-feed'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return <LegacyFeed isLoggedIn={!!user} />
}
