import { redirect } from 'next/navigation'
import { ProfileScreen } from '@/components/profile-screen'
import { createClient } from '@/lib/supabase/server'

export default async function YouPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: profile, error: profileError }, { count: savesCount, error: savesError }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('saved_items').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
  ])
  if (profileError && profileError.code !== 'PGRST116') {
    return (
      <section className="empty-state" role="alert">
        <p className="eyebrow">PROFILE UNAVAILABLE</p>
        <h2>We could not load your profile.</h2>
        <p>Please refresh the page and try again.</p>
      </section>
    )
  }

  const resolvedProfile = profile ?? {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? null,
    email: user.email ?? null,
    bio: null,
    avatar_url: null,
    created_at: user.created_at,
  }

  return (
    <ProfileScreen
      profile={resolvedProfile}
      savesCount={savesCount ?? 0}
      savesUnavailable={Boolean(savesError)}
      isPremium={Boolean(resolvedProfile.is_premium)}
    />
  )
}
