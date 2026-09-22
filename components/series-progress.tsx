'use client'

import Link from 'next/link'
import { CheckCircle2, Circle, Lock } from 'lucide-react'
import { useSeriesProgress } from '@/hooks/use-series-progress'
import type { SeriesDay } from '@/lib/series-data'

interface SeriesProgressProps {
  slug: string
  days: SeriesDay[]
}

export function SeriesProgress({ slug, days }: SeriesProgressProps) {
  const { completedDays, isLoaded, isDayComplete, nextDay } = useSeriesProgress(slug)

  if (!isLoaded) {
    return (
      <div>
        <div className="series-day-progress-bar">
          <div className="series-day-progress-bar-fill" style={{ width: '0%' }} />
        </div>
        <div className="series-day-list">
          {days.map((day) => (
            <div key={day.day} className="series-day-item series-day-item-locked">
              <span className="series-day-item-num">{day.day}</span>
              <span className="series-day-item-info">
                <span className="series-day-item-title">{day.title}</span>
                <span className="series-day-item-source">{day.source}</span>
              </span>
              <span className="series-day-item-icon" aria-hidden="true">
                <Circle size={16} />
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const pct = Math.round((completedDays.length / days.length) * 100)

  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: '.6rem' }}>
        {completedDays.length} of {days.length} days complete
      </p>
      <div className="series-day-progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Series progress">
        <div className="series-day-progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="series-day-list">
        {days.map((day) => {
          const complete = isDayComplete(day.day)
          const isNext = day.day === nextDay
          const locked = day.day > nextDay

          const itemClass = [
            'series-day-item',
            complete ? 'series-day-item-complete' : '',
            isNext ? 'series-day-item-active' : '',
            locked ? 'series-day-item-locked' : '',
          ].filter(Boolean).join(' ')

          if (locked) {
            return (
              <div key={day.day} className={itemClass} aria-label={`Day ${day.day}: locked`}>
                <span className="series-day-item-num">{day.day}</span>
                <span className="series-day-item-info">
                  <span className="series-day-item-title">{day.title}</span>
                  <span className="series-day-item-source">{day.source}</span>
                </span>
                <span className="series-day-item-icon" aria-hidden="true">
                  <Lock size={15} />
                </span>
              </div>
            )
          }

          return (
            <Link
              key={day.day}
              href={`/series/${slug}/day/${day.day}`}
              className={itemClass}
              aria-label={`Day ${day.day}: ${day.title}${complete ? ' (complete)' : ''}${isNext ? ' (current)' : ''}`}
            >
              <span className="series-day-item-num">{day.day}</span>
              <span className="series-day-item-info">
                <span className="series-day-item-title">{day.title}</span>
                <span className="series-day-item-source">{day.source}</span>
              </span>
              <span className="series-day-item-icon" aria-hidden="true">
                {complete ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
