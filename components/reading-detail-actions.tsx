'use client'

import { useState, useEffect } from 'react'
import { Bookmark, Check, BookCheck, Share2, Flame } from 'lucide-react'
import { useSave } from '@/hooks/use-save'
import { useHabitTracker } from '@/hooks/use-habit-tracker'
import { UpgradeModal } from '@/components/upgrade-modal'
import { ShareQuoteModal } from '@/components/share-quote-modal'

export function ReadingDetailActions({
  id,
  title,
  pullQuote,
  source,
  type,
  initialSaved,
}: {
  id: string
  title: string
  pullQuote?: string
  source?: string
  type?: string
  initialSaved: boolean
}) {
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const { saved, loading, error, toggle } = useSave(id, initialSaved, () => setShowUpgrade(true))
  const { isCardRead, logReadingCompleted } = useHabitTracker()
  const [read, setRead] = useState(false)
  const [streakToast, setStreakToast] = useState<string | null>(null)

  useEffect(() => {
    if (isCardRead(id)) {
      setRead(true)
    }
  }, [id, isCardRead])

  const handleToggleRead = () => {
    const nextRead = !read
    setRead(nextRead)
    if (nextRead) {
      const result = logReadingCompleted(id, 3)
      if (result.streakUpdated) {
        setStreakToast(`🔥 ${result.newStreak} day streak! Keep building your habit.`)
        setTimeout(() => setStreakToast(null), 3500)
      }
    }
  }

  const handleShareQuote = () => {
    setShowShareModal(true)
  }

  return (
    <>
    <div className="reading-actions-bar">
      <button
        className={`reading-action-btn reading-read-btn${read ? ' is-read' : ''}`}
        onClick={handleToggleRead}
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
        {saved ? (
          <>
            <Check size={16} aria-hidden="true" /> Saved
          </>
        ) : (
          <>
            <Bookmark size={16} aria-hidden="true" /> Save reading
          </>
        )}
      </button>

      <button
        className="reading-action-btn reading-share-btn"
        onClick={handleShareQuote}
        aria-label="Share quote card"
        type="button"
      >
        <Share2 size={16} aria-hidden="true" /> Share quote
      </button>

      {streakToast && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            marginTop: '0.5rem',
            padding: '0.75rem 1rem',
            borderRadius: '999px',
            background: '#e9c7f5',
            color: '#17181d',
            fontSize: '0.82rem',
            fontWeight: '900',
            animation: 'fadeIn 0.2s ease-in-out',
          }}
          role="status"
        >
          <Flame size={16} color="#7168ed" aria-hidden="true" />
          <span>{streakToast}</span>
        </div>
      )}

      {error && (
        <span className="save-error" role="alert">
          Could not update your saved readings.
        </span>
      )}
    </div>

    {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    {showShareModal && (
      <ShareQuoteModal
        title={title}
        quote={pullQuote || title}
        source={source || 'Yadesh'}
        category={type}
        onClose={() => setShowShareModal(false)}
      />
    )}
  </>
  )
}
