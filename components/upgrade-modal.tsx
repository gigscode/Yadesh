'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, Bookmark, Zap, BookOpen, Wifi } from 'lucide-react'
import { FREE_BOOKMARK_LIMIT } from '@/hooks/use-subscription'

/**
 * Modal shown when a free user hits the 5-bookmark limit.
 * Trap focus, close on Escape or backdrop click.
 * The checkout button links to /upgrade - no live payment URL needed yet.
 */
export function UpgradeModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // Focus the close button on mount
  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="upgrade-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upgrade-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="upgrade-modal" ref={modalRef}>

        {/* Close */}
        <button
          ref={closeRef}
          className="upgrade-modal-close"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {/* Icon */}
        <div className="upgrade-modal-icon" aria-hidden="true">
          <Bookmark size={26} />
        </div>

        <p className="eyebrow" style={{ textAlign: 'center' }}>FREE PLAN LIMIT</p>
        <h2 id="upgrade-modal-title">
          You have saved {FREE_BOOKMARK_LIMIT} readings.
        </h2>
        <p className="upgrade-modal-sub">
          Free accounts keep up to {FREE_BOOKMARK_LIMIT} bookmarks. Go premium for unlimited saves, the full archive, and guided reading series.
        </p>

        {/* Feature list */}
        <ul className="upgrade-modal-features" aria-label="Premium features">
          <li>
            <Bookmark size={15} aria-hidden="true" />
            Unlimited bookmarks and collections
          </li>
          <li>
            <BookOpen size={15} aria-hidden="true" />
            Full archive unlocked, all teachers
          </li>
          <li>
            <Zap size={15} aria-hidden="true" />
            21-day guided series: Breakthrough, Prayer, Purpose
          </li>
          <li>
            <Wifi size={15} aria-hidden="true" />
            Offline reading and audio versions
          </li>
        </ul>

        {/* CTAs */}
        <Link href="/upgrade" className="upgrade-modal-cta" onClick={onClose}>
          See plans and pricing
        </Link>
        <button
          type="button"
          className="upgrade-modal-dismiss"
          onClick={onClose}
        >
          Stay on free plan
        </button>

      </div>
    </div>
  )
}
