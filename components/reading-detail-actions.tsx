'use client'

import { useState } from 'react'
import { Bookmark, Check, BookCheck } from 'lucide-react'
import { useSave } from '@/hooks/use-save'

export function ReadingDetailActions({
  id,
  title,
  initialSaved,
}: {
  id: string
  title: string
  initialSaved: boolean
}) {
  const { saved, loading, error, toggle } = useSave(id, initialSaved)
  const [read, setRead] = useState(false)

  return (
    <div className="reading-actions-bar">
      <button
        className={`reading-action-btn reading-read-btn${read ? ' is-read' : ''}`}
        onClick={() => setRead((prev) => !prev)}
        aria-pressed={read}
        type="button"
      >
        <BookCheck size={16} aria-hidden="true" />
        {read ? 'Marked as read' : 'Mark as read'}
      </button>

      <button
        className={`reading-action-btn reading-save-btn${saved ? ' is-saved' : ''}`}
        onClick={toggle}
        disabled={loading}
        aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
        aria-pressed={saved}
        type="button"
      >
        {saved
          ? <><Check size={16} aria-hidden="true" /> Saved</>
          : <><Bookmark size={16} aria-hidden="true" /> Save reading</>}
      </button>

      {error && (
        <span className="save-error" role="alert">
          Could not update your saved readings.
        </span>
      )}
    </div>
  )
}
