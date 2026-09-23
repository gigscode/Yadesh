'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Clock, Filter, Sparkles } from 'lucide-react'
import { LearningCard as LearningCardComponent } from '@/components/learning-card'
import { DailyLearningCard } from '@/components/daily-learning-card'
import { ContinueLearningCard } from '@/components/continue-learning-card'
import type { LearningCard } from '@/lib/learning-data'

interface LearningFeedClientProps {
  cards: LearningCard[]
  initialCard: LearningCard
  isPremium: boolean
}

type TimeFilter = 'ALL' | '30s' | '2m' | '5m' | '10m'
type TopicFilter = 'ALL' | 'FAITH' | 'LIFE' | 'BOOK' | 'HISTORY' | 'TEACHING' | 'MIRACLE'

export function LearningFeedClient({ cards, initialCard, isPremium }: LearningFeedClientProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('ALL')
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('ALL')
  const [greeting, setGreeting] = useState('Welcome back')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  // Filter cards
  const filteredCards = useMemo(() => {
    return cards
      .filter((card) => card.id !== initialCard.id)
      .filter((card) => {
        // Topic filter
        if (topicFilter !== 'ALL' && card.type !== topicFilter) {
          return false
        }

        // Time filter
        if (timeFilter === 'ALL') return true
        const timeLower = (card.time || '').toLowerCase()
        if (timeFilter === '30s') return timeLower.includes('30') || timeLower.includes('1 min')
        if (timeFilter === '2m') return timeLower.includes('2 min')
        if (timeFilter === '5m') return timeLower.includes('3 min') || timeLower.includes('4 min') || timeLower.includes('5 min')
        if (timeFilter === '10m') return timeLower.includes('6') || timeLower.includes('7') || timeLower.includes('8') || timeLower.includes('10')
        return true
      })
  }, [cards, initialCard.id, timeFilter, topicFilter])

  const topicOptions: { id: TopicFilter; label: string }[] = [
    { id: 'ALL', label: 'All Topics' },
    { id: 'FAITH', label: 'Faith' },
    { id: 'LIFE', label: 'Life' },
    { id: 'BOOK', label: 'Books' },
    { id: 'HISTORY', label: 'History' },
    { id: 'TEACHING', label: 'Teaching' },
    { id: 'MIRACLE', label: 'Miracles' },
  ]

  const timeOptions: { id: TimeFilter; label: string }[] = [
    { id: 'ALL', label: 'Any time' },
    { id: '30s', label: '30 sec' },
    { id: '2m', label: '2 min' },
    { id: '5m', label: '5 min' },
    { id: '10m', label: '10+ min' },
  ]

  return (
    <div className="learning-feed-container">
      {/* Greeting Banner */}
      <div className="feed-greeting-bar">
        <span className="eyebrow">{greeting}</span>
        <h1>What is worth learning right now?</h1>
      </div>

      {/* Featured Daily Card */}
      <DailyLearningCard cards={cards} initialCard={initialCard} />

      {/* Dynamic Continue Learning / 21-Day Series Card */}
      <ContinueLearningCard isPremium={isPremium} />

      {/* Filter Section: Time & Topic */}
      <section className="feed-filters-section" aria-label="Filter content feed">
        <div className="feed-filter-row">
          <div className="feed-filter-label">
            <Clock size={13} aria-hidden="true" />
            <span>Time</span>
          </div>
          <div className="feed-time-pills" role="radiogroup" aria-label="Time filter">
            {timeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`time-pill ${timeFilter === opt.id ? 'active' : ''}`}
                onClick={() => setTimeFilter(opt.id)}
                role="radio"
                aria-checked={timeFilter === opt.id}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="feed-filter-row">
          <div className="feed-filter-label">
            <Filter size={13} aria-hidden="true" />
            <span>Theme</span>
          </div>
          <div className="feed-topic-chips" role="radiogroup" aria-label="Topic filter">
            {topicOptions.map((topic) => (
              <button
                key={topic.id}
                type="button"
                className={`topic-chip ${topicFilter === topic.id ? 'active' : ''}`}
                onClick={() => setTopicFilter(topic.id)}
                role="radio"
                aria-checked={topicFilter === topic.id}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="product-section">
        <div className="section-row">
          <h2>
            {topicFilter === 'ALL' && timeFilter === 'ALL'
              ? 'More to carry with you'
              : `Filtered readings (${filteredCards.length})`}
          </h2>
          {(topicFilter !== 'ALL' || timeFilter !== 'ALL') ? (
            <button
              type="button"
              className="feed-reset-btn"
              onClick={() => {
                setTimeFilter('ALL')
                setTopicFilter('ALL')
              }}
            >
              Reset filters
            </button>
          ) : (
            <Link href="/explore">View all</Link>
          )}
        </div>

        {filteredCards.length > 0 ? (
          <div className="learning-grid">
            {filteredCards.map((item, index) => (
              <LearningCardComponent key={item.id} {...item} index={index} />
            ))}
          </div>
        ) : (
          <div className="feed-empty-state">
            <p>No readings match your selected time and topic filters.</p>
            <button
              type="button"
              className="feed-reset-btn"
              onClick={() => {
                setTimeFilter('ALL')
                setTopicFilter('ALL')
              }}
            >
              Show all readings
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
