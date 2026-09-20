'use client'

import Link from 'next/link'
import { Bookmark, Check } from 'lucide-react'
import { useSave } from '@/hooks/use-save'

type LearningCardProps = {
  id: string
  type: string
  title: string
  source: string
  body: string
  time: string
  accent?: boolean
  initialSaved?: boolean
}

export function LearningCard({
  id,
  type,
  title,
  source,
  body,
  time,
  accent = false,
  initialSaved = false,
}: LearningCardProps) {
  const { saved, loading, error, toggle } = useSave(id, initialSaved)

  return (
    <article className={`learning-card${accent ? ' accent' : ''}`}>
      <div className="card-meta">
        <span>{type}</span>
        <span>{time}</span>
      </div>
      <h3>{title}</h3>
      <p className="card-source">{source}</p>
      <p>{body}</p>
      <div className="card-actions">
        <Link href={`/learn/${id}`}>Read for {time.replace(' read', '')}</Link>
        <button
          aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          aria-pressed={saved}
          onClick={toggle}
          disabled={loading}
          className={saved ? 'save-btn is-saved' : 'save-btn'}
          type="button"
        >
          {saved
            ? <Check aria-hidden="true" size={15} />
            : <Bookmark aria-hidden="true" size={15} />}
        </button>
      </div>
      {error && <span className="save-error" role="alert">Could not update your saved readings.</span>}
    </article>
  )
}
