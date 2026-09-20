import Link from 'next/link'
import { ProductShell, LearningCard } from '@/components/product-shell'
import { learningCards } from '@/lib/learning-data'

export default function LearnPage() {
  const dailyCard = learningCards[Math.floor(Date.now() / 86400000) % learningCards.length]

  return <ProductShell title="Home">
    <section className="daily-learning-card">
      <div className="daily-learning-copy">
        <p className="eyebrow">FOR TODAY</p>
        <h2>{dailyCard.title}</h2>
        <p className="daily-learning-source">{dailyCard.source} · {dailyCard.time}</p>
        <p>{dailyCard.body}</p>
        <Link href="/learn" className="daily-learning-action">Start today&apos;s reading <span aria-hidden="true">→</span></Link>
      </div>
    </section>
    <section className="continue-card"><div><p className="eyebrow">CONTINUE LEARNING</p><h2>The Authority of the Believer</h2><p>Kenneth E. Hagin · 8 min remaining</p></div><Link href="/learn">Continue</Link></section>
    <section className="product-section"><div className="section-row"><h2>More to carry with you</h2><Link href="/explore">View all</Link></div><div className="learning-grid">{learningCards.filter(item => item.title !== dailyCard.title).map(item => <LearningCard key={item.title} {...item} />)}</div></section>
  </ProductShell>
}
