'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, Sparkles } from 'lucide-react'
import { useSeriesProgress } from '@/hooks/use-series-progress'
import { getSeriesDay } from '@/lib/series-data'

interface ContinueLearningCardProps {
  isPremium: boolean
}

export function ContinueLearningCard({ isPremium }: ContinueLearningCardProps) {
  const slug = '21-days-of-breakthrough'
  const { completedDays, isLoaded, nextDay, progressPercent } = useSeriesProgress(slug)

  if (!isPremium || !isLoaded) return null

  const isStarted = completedDays.length > 0
  const activeDayNum = Math.min(nextDay, 21)
  const activeDay = getSeriesDay(slug, activeDayNum)

  return (
    <section className="continue-learning-card" aria-label="Continue your guided series">
      <div className="continue-card-content">
        <div className="continue-card-eyebrow-row">
          <span className="continue-badge">
            <Sparkles size={12} aria-hidden="true" />
            {isStarted ? 'CONTINUE LEARNING' : 'FEATURED 21-DAY SERIES'}
          </span>
          <span className="continue-series-label">21 Days of Breakthrough</span>
        </div>

        <h2 className="continue-card-title">
          {isStarted
            ? `Day ${activeDayNum}: ${activeDay?.title || 'Next Reading'}`
            : 'Breakthrough starts with a decision, not a feeling'}
        </h2>

        <p className="continue-card-source">
          {activeDay?.source ? `${activeDay.source} · 3 min reading` : 'Daily guided spiritual momentum'}
        </p>

        {isStarted && (
          <div className="continue-progress-wrap">
            <div className="continue-progress-labels">
              <span>{completedDays.length} of 21 days complete</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="continue-progress-bar" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div className="continue-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="continue-card-action">
        <Link
          href={`/series/${slug}/day/${activeDayNum}`}
          className="continue-btn"
          id="continue-learning-cta"
        >
          {isStarted ? `Continue Day ${activeDayNum}` : 'Start Day 1'}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
