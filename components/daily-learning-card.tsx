'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { LearningCard } from '@/lib/learning-data'

const DAY_IN_MS = 86400000

function getDailyCard(cards: LearningCard[]) {
  return cards[Math.floor(Date.now() / DAY_IN_MS) % cards.length] || cards[0]
}

export function DailyLearningCard({ cards, initialCard }: { cards: LearningCard[]; initialCard: LearningCard }) {
  const [dailyCard, setDailyCard] = useState(initialCard)

  useEffect(() => {
    setDailyCard(getDailyCard(cards))
  }, [cards])

  return (
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
  )
}