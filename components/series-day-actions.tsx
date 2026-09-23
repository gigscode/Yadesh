'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ArrowRight, Share2 } from 'lucide-react'
import { useSeriesProgress } from '@/hooks/use-series-progress'
import { ShareQuoteModal } from '@/components/share-quote-modal'
import { isPostHogConfigured } from '@/instrumentation-client'
import posthog from 'posthog-js'

interface SeriesDayActionsProps {
  slug: string
  day: number
  totalDays: number
  cardId?: string
  title?: string
  quote?: string
  source?: string
}

export function SeriesDayActions({
  slug,
  day,
  totalDays,
  cardId,
  title = '',
  quote = '',
  source = 'Yadesh',
}: SeriesDayActionsProps) {
  const { isDayComplete, markDayComplete } = useSeriesProgress(slug)
  const complete = isDayComplete(day)
  const hasNext = day < totalDays
  const [showShareModal, setShowShareModal] = useState(false)

  function handleMarkComplete() {
    if (!complete) {
      markDayComplete(day)
      if (isPostHogConfigured) {
        posthog.capture('series_day_completed', {
          series_slug: slug,
          day_number: day,
          total_days: totalDays,
        })
      }
    }
  }

  return (
    <>
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

        <button
          id={`series-day-share-${day}`}
          type="button"
          className="series-day-share-btn"
          onClick={() => setShowShareModal(true)}
          aria-label="Share day quote"
        >
          <Share2 size={15} aria-hidden="true" />
          Share quote
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

      {showShareModal && (
        <ShareQuoteModal
          title={title}
          quote={quote || title}
          source={source}
          category="SERIES"
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  )
}
