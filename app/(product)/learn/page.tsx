import Link from 'next/link'
import { DailyLearningCard } from '@/components/daily-learning-card'
import { LearningCard } from '@/components/learning-card'
import { PageHeader } from '@/components/page-header'
import { StreakBadge } from '@/components/streak-badge'
import { getAllLearningCards } from '@/lib/content-loader'

export default async function LearnPage() {
  const cards = await getAllLearningCards()
  const initialCard = cards[0]

  return (
    <>
      <PageHeader title="Home" />

      <StreakBadge />

      <DailyLearningCard cards={cards} initialCard={initialCard} />

      <section className="product-section">
        <div className="section-row">
          <h2>More to carry with you</h2>
          <Link href="/explore">View all</Link>
        </div>
        <div className="learning-grid">
          {cards
            .filter((item) => item.id !== initialCard.id)
            .map((item, index) => (
              <LearningCard key={item.id} {...item} index={index} />
            ))}
        </div>
      </section>
    </>
  )
}
