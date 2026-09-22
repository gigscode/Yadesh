import { PageHeader } from '@/components/page-header'
import { StreakBadge } from '@/components/streak-badge'
import { LearningFeedClient } from '@/components/learning-feed-client'
import { getAllLearningCards } from '@/lib/content-loader'
import { createClient } from '@/lib/supabase/server'

export default async function LearnPage() {
  const cards = await getAllLearningCards()
  const initialCard = cards[0]

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isPremium = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .maybeSingle()
    isPremium = Boolean(profile?.is_premium)
  }

  return (
    <>
      <PageHeader title="Home" />
      <StreakBadge />
      <LearningFeedClient
        cards={cards}
        initialCard={initialCard}
        isPremium={isPremium}
      />
    </>
  )
}