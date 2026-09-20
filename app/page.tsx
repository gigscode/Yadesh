import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import LegacyFeed from '@/components/legacy-feed'

// Checks auth and re-renders LegacyFeed with the correct isLoggedIn value.
// Runs in the background while the unauthenticated shell paints instantly.
async function AuthAwareLanding() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return <LegacyFeed isLoggedIn={!!user} />
}

export default function Page() {
  return (
    // LegacyFeed with isLoggedIn=false renders instantly as the fallback.
    // Once the auth check resolves, it swaps in with the correct state.
    // This eliminates the blank delay caused by blocking on supabase.auth.getUser().
    <Suspense fallback={<LegacyFeed isLoggedIn={false} />}>
      <AuthAwareLanding />
    </Suspense>
  )
}
