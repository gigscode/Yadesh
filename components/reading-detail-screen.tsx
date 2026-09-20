'use client'

import Link from 'next/link'
import { Bookmark, Check } from 'lucide-react'
import { useSave } from '@/hooks/use-save'
import type { LearningCard } from '@/lib/learning-data'

export function ReadingDetailScreen({ card, initialSaved }: { card: LearningCard; initialSaved: boolean }) {
  const { saved, loading, error, toggle } = useSave(card.id, initialSaved)

  return (
    <article className="reading-detail">
      <Link className="reading-back" href="/learn">Back to learning</Link>
      <p className="eyebrow">{card.type}</p>
      <h2>{card.title}</h2>
      <p className="reading-source">{card.source} · {card.time}</p>
      <p className="reading-body">{card.body}</p>
      <div className="reading-actions">
        <button
          className={saved ? 'save-btn is-saved' : 'save-btn'}
          type="button"
          aria-label={saved ? `Unsave ${card.title}` : `Save ${card.title}`}
          aria-pressed={saved}
          onClick={toggle}
          disabled={loading}
        >
          {saved ? <Check aria-hidden="true" size={16} /> : <Bookmark aria-hidden="true" size={16} />}
          <span>{saved ? 'Saved' : 'Save reading'}</span>
        </button>
      </div>
      {error && <p className="auth-error" role="alert">Could not update your saved readings.</p>}
    </article>
  )
}
