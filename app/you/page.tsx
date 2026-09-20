import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ProductShell } from '@/components/product-shell'
import { ProfileScreen } from '@/components/profile-screen'
import { createClient } from '@/lib/supabase/server'

export default async function YouPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const [{ data: profile, error: profileError }, { count: savesCount, error: savesError }] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single(),
    supabase
      .from('saved_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id),
  ])

  if (savesError || (profileError && profileError.code !== 'PGRST116')) {
    return (
      <ProductShell title="You">
        <section className="empty-state" role="alert">
          <p className="eyebrow">PROFILE UNAVAILABLE</p>
          <h2>We could not load your profile.</h2>
          <p>Please refresh the page and try again.</p>
        </section>
      </ProductShell>
    )
  }

  // Fallback if trigger hasn't created the profile row yet
  const resolvedProfile = profile ?? {
    id: user.id,
    full_name: user.user_metadata?.full_name ?? null,
    email: user.email ?? null,
    bio: null,
    avatar_url: null,
    created_at: user.created_at,
  }

  return (
    <ProductShell title="You">
      <ProfileScreen
        profile={resolvedProfile}
        savesCount={savesCount ?? 0}
      />
    </ProductShell>
  )
}
