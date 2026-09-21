'use client'

import { useState, useEffect } from 'react'
import { Bookmark, Check, BookCheck, Share2, Loader2, Flame } from 'lucide-react'
import { useSave } from '@/hooks/use-save'
import { useHabitTracker } from '@/hooks/use-habit-tracker'

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
  const { saved, loading, error, toggle } = useSave(id, initialSaved)
  const { isCardRead, logReadingCompleted } = useHabitTracker()
  const [read, setRead] = useState(false)
  const [streakToast, setStreakToast] = useState<string | null>(null)
  const [sharing, setSharing] = useState(false)

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

  const handleShareQuote = async () => {
    if (sharing) return
    setSharing(true)

    try {
      // 1. Generate client-side graphic on an off-screen high-res Canvas (1080x1080)
      const canvas = document.createElement('canvas')
      canvas.width = 1080
      canvas.height = 1080
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Canvas context not available')
      }

      // Background
      ctx.fillStyle = '#fbfbf8'
      ctx.fillRect(0, 0, 1080, 1080)

      // Top decorative card tint pill
      const accentColors: Record<string, string> = {
        FAITH: '#edfba0',
        MIRACLE: '#fef3c7',
        LIFE: '#e9c7f5',
        IDEA: '#edfba0',
        HISTORY: '#e4e2ff',
        BOOK: '#fdf0d8',
        TEACHING: '#d8f5e4',
      }
      ctx.fillStyle = accentColors[type || ''] || '#edfba0'
      ctx.beginPath()
      ctx.roundRect(80, 80, 920, 920, 48)
      ctx.fill()

      // Inner white card for crisp reading
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.roundRect(110, 110, 860, 860, 36)
      ctx.fill()

      // Brand Header: "YADESH"
      ctx.fillStyle = '#7168ed'
      ctx.font = 'bold 36px Arial, Helvetica, sans-serif'
      ctx.fillText('YADESH', 180, 210)

      // Category Pill
      if (type) {
        ctx.fillStyle = '#686976'
        ctx.font = 'bold 22px Arial, Helvetica, sans-serif'
        ctx.fillText(type.toUpperCase(), 180, 248)
      }

      // Pull quote text wrapping
      const quoteText = `"${pullQuote || title}"`
      ctx.fillStyle = '#17181d'
      ctx.font = 'bold 46px Arial Black, Arial, Helvetica, sans-serif'

      const words = quoteText.split(' ')
      let line = ''
      let y = 370
      const maxWidth = 720
      const lineHeight = 64

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && n > 0) {
          ctx.fillText(line, 180, y)
          line = words[n] + ' '
          y += lineHeight
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, 180, y)

      // Author / Source
      if (source) {
        ctx.fillStyle = '#7168ed'
        ctx.font = 'bold 32px Arial, Helvetica, sans-serif'
        ctx.fillText(`· ${source}`, 180, y + 80)
      }

      // Footer call to action
      ctx.fillStyle = '#686976'
      ctx.font = 'bold 24px Arial, Helvetica, sans-serif'
      ctx.fillText('Read in 3 minutes on yadesh.com', 180, 870)

      // 2. Export canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setSharing(false)
          return
        }

        const file = new File([blob], `yadesh-${id}-quote.png`, {
          type: 'image/png',
        })

        // 3. Try native Web Share API (mobile share sheet to WhatsApp, Instagram, X)
        if (
          navigator.canShare &&
          navigator.canShare({ files: [file] }) &&
          navigator.share
        ) {
          try {
            await navigator.share({
              files: [file],
              title: `${title} | Yadesh`,
              text: `${pullQuote || title} (${source || 'Yadesh'})`,
              url: window.location.href,
            })
          } catch {
            // User dismissed share sheet
          }
        } else {
          // Fallback: Trigger instant download
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `yadesh-${id}-quote.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        setSharing(false)
      }, 'image/png')
    } catch {
      setSharing(false)
    }
  }

  return (
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
        disabled={sharing}
        aria-label="Share quote card"
        type="button"
      >
        {sharing ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Generating...
          </>
        ) : (
          <>
            <Share2 size={16} aria-hidden="true" /> Share quote
          </>
        )}
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
  )
}
