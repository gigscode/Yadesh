import Link from 'next/link'
import { LearningCard } from '@/components/learning-card'
import { PageHeader } from '@/components/page-header'
import { StreakBadge } from '@/components/streak-badge'
import { getAllLearningCards } from '@/lib/content-loader'

export default async function LearnPage() {
  const cards = await getAllLearningCards()
  const dailyCard = cards[Math.floor(Date.now() / 86400000) % cards.length] || cards[0]

  return (
    <>
      <PageHeader title="Home" />

      <StreakBadge />

      <section className="daily-learning-card">
        <div className="daily-learning-copy">
          <p className="eyebrow">FOR TODAY</p>
          <h2>{dailyCard.title}</h2>
          <p className="daily-learning-source">{dailyCard.source} · {dailyCard.time}</p>
          <p>{dailyCard.body}</p>
          <Link href={`/learn/${dailyCard.id}`} className="daily-learning-action">
            Start today&apos;s reading <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="product-section">
        <div className="section-row">
          <h2>More to carry with you</h2>
          <Link href="/explore">View all</Link>
        </div>
        <div className="learning-grid">
          {cards
            .filter((item) => item.id !== dailyCard.id)
            .map((item) => (
              <LearningCard key={item.id} {...item} />
            ))}
        </div>
      </section>
    </>
  )
}
