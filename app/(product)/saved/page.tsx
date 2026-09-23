import Link from 'next/link'
import { LearningCard } from '@/components/learning-card'
import { PageHeader } from '@/components/page-header'
import { learningCards } from '@/lib/learning-data'
import { createClient } from '@/lib/supabase/server'
import { FREE_BOOKMARK_LIMIT } from '@/hooks/use-subscription'

export default async function SavedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let savedKeys: string[] = []
  let saveError: string | null = null
  let isPremium = false

  if (user) {
    const [savedResult, profileResult] = await Promise.all([
      supabase
        .from('saved_items')
        .select('content_key')
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false }),
      supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .maybeSingle(),
    ])

    savedKeys = savedResult.data?.map((row) => row.content_key) ?? []
    saveError = savedResult.error?.message ?? null
    isPremium = Boolean(profileResult.data?.is_premium)
  }

  const savedCards = learningCards.filter((card) => savedKeys.includes(card.id))
  const savesCount = savedCards.length
  const isAtLimit = !isPremium && savesCount >= FREE_BOOKMARK_LIMIT
  const isNearLimit = !isPremium && savesCount === FREE_BOOKMARK_LIMIT - 1

  return (
    <>
      <PageHeader title="Saved" eyebrow="YOUR LIBRARY" />

      {!user ? (
        <section className="empty-state">
          <p className="eyebrow">YOUR LIBRARY</p>
          <h2>Sign in to see your saved readings.</h2>
          <p>Create an account or log in to start saving ideas, stories, and lessons worth returning to.</p>
          <Link className="hero-link" href="/login">Log in to your account <span aria-hidden="true">↗</span></Link>
        </section>
      ) : saveError ? (
        <section className="empty-state" role="alert">
          <p className="eyebrow">LIBRARY UNAVAILABLE</p>
          <h2>We could not load your saved readings.</h2>
          <p>Please refresh the page and try again.</p>
        </section>
      ) : savedCards.length === 0 ? (
        <section className="empty-state">
          <p className="eyebrow">YOUR LIBRARY</p>
          <h2>Collect what is worth remembering.</h2>
          <p>Save ideas, people, and books here so your next five minutes always have somewhere useful to begin.</p>
          <Link className="hero-link" href="/explore">Explore learning <span aria-hidden="true">↗</span></Link>
        </section>
      ) : (
        <section className="product-section">
          <div className="section-row">
            <h2>Saved readings</h2>
            <span>{savesCount} {savesCount === 1 ? 'item' : 'items'}</span>
          </div>

          {/* At-limit banner */}
          {isAtLimit && (
            <div className="saved-limit-banner saved-limit-banner-full" role="status">
              <div className="saved-limit-banner-copy">
                <strong>Library full</strong>
                <span>You have reached the {FREE_BOOKMARK_LIMIT}-bookmark free limit. Upgrade to save without limit.</span>
              </div>
              <Link href="/upgrade" className="saved-limit-upgrade-btn">
                Upgrade
              </Link>
            </div>
          )}

          {/* Near-limit nudge */}
          {isNearLimit && (
            <div className="saved-limit-banner saved-limit-banner-near" role="status">
              <div className="saved-limit-banner-copy">
                <strong>1 save remaining</strong>
                <span>Free accounts keep up to {FREE_BOOKMARK_LIMIT} bookmarks.</span>
              </div>
              <Link href="/upgrade" className="saved-limit-upgrade-btn saved-limit-upgrade-btn-soft">
                Go premium
              </Link>
            </div>
          )}

          <div className="learning-grid">
            {savedCards.map((item, index) => (
              <LearningCard key={item.id} {...item} initialSaved={true} index={index} />
            ))}
          </div>

          {/* Premium upsell below grid for free users */}
          {!isPremium && (
            <div className="saved-premium-upsell">
              <div>
                <p className="eyebrow">YADESH PREMIUM</p>
                <h3>Keep more of what you find.</h3>
                <p>Premium adds unlimited saves and access to the 21-day guided series for $4.99 a month.</p>
              </div>
              <Link href="/upgrade" className="upgrade-cta-btn">
                See plans →
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  )
}
