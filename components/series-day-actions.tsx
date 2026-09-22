'use client'

import Link from 'next/link'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { useSeriesProgress } from '@/hooks/use-series-progress'

interface SeriesDayActionsProps {
  slug: string
  day: number
  totalDays: number
  cardId?: string
}

export function SeriesDayActions({ slug, day, totalDays, cardId }: SeriesDayActionsProps) {
  const { isDayComplete, markDayComplete, nextDay } = useSeriesProgress(slug)
  const complete = isDayComplete(day)
  const hasNext = day < totalDays

  function handleMarkComplete() {
    if (!complete) markDayComplete(day)
  }

  return (
    <div className="series-day-actions">
      <button
        id={`series-day-complete-${day}`}
        className={`series-day-complete-btn${complete ? ' is-complete' : ''}`}
        onClick={handleMarkComplete}
        disabled={complete}
        aria-pressed={complete}
      >
        {complete ? (
          <>
            <CheckCircle2 size={16} aria-hidden="true" />
            Day {day} complete
          </>
        ) : (
          <>
            <Circle size={16} aria-hidden="true" />
            Mark day {day} complete
          </>
        )}
      </button>

      {hasNext && complete && (
        <Link
          href={`/series/${slug}/day/${day + 1}`}
          className="series-day-next-link"
          id={`series-day-next-${day}`}
        >
          Day {day + 1}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      )}

      {cardId && (
        <Link
          href={`/learn/${cardId}`}
          className="series-day-card-link"
          id={`series-day-full-${day}`}
        >
          Read the full teaching
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      )}

      <Link
        href={`/series/${slug}`}
        className="series-day-back-link"
        id={`series-day-back-${day}`}
      >
        Back to series
      </Link>
    </div>
  )
}
