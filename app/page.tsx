import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import LegacyFeed from '@/components/legacy-feed'

// Authenticated users have no use for the marketing page.
// Send them straight to their home feed with no delay.
async function AuthGate() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/learn')
  return <LegacyFeed isLoggedIn={false} />
}

export default function Page() {
  // Paint the marketing page instantly as the fallback.
  // If the user is authenticated, the redirect fires server-side
  // before they ever see the landing page.
  return (
    <Suspense fallback={<LegacyFeed isLoggedIn={false} />}>
      <AuthGate />
    </Suspense>
  )
}
