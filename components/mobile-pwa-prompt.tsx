'use client'

import { useState, useEffect } from 'react'
import { Download, X, Share2, PlusSquare, MoreVertical, Check } from 'lucide-react'

const DISMISS_KEY = 'yadesh_pwa_dismissed_until'
const COOLDOWN_DAYS = 3

// Capture beforeinstallprompt as soon as bundle scripts execute
let cachedInstallPrompt: any = null
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    cachedInstallPrompt = e
  })
}

export function MobilePwaPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(() => cachedInstallPrompt)

  useEffect(() => {
    // 1. Strict check: Must be a mobile or tablet device, NOT a PC/laptop
    const ua = navigator.userAgent || ''
    const isMobileUa =
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isTouchDevice = navigator.maxTouchPoints > 0 || isCoarsePointer
    const isSmallOrMediumScreen = window.innerWidth <= 1024

    // Query parameter override for instant testing: ?pwa=1 or ?install=1
    const urlParams = new URLSearchParams(window.location.search)
    const forcePwa = urlParams.has('pwa') || urlParams.has('install')

    // Desktop PC exclusion: mouse-only pointer with non-mobile UA, or wide screen without touch
    if (!forcePwa && !isMobileUa && (!isTouchDevice || !isSmallOrMediumScreen)) {
      return
    }

    // 2. Check if already running in standalone PWA mode (installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true)

    if (!forcePwa && isStandalone) {
      return
    }

    // 3. Check dismissal cooldown
    if (forcePwa) {
      localStorage.removeItem(DISMISS_KEY)
    } else {
      const dismissedUntil = localStorage.getItem(DISMISS_KEY)
      if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
        return
      }
    }

    // 4. Detect iOS Safari
    const isIosDevice =
      /iphone|ipad|ipod/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))
    setIsIos(isIosDevice)

    // 5. Intercept Android / Chromium beforeinstallprompt event if not already cached
    if (cachedInstallPrompt) {
      setDeferredPrompt(cachedInstallPrompt)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      cachedInstallPrompt = e
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // 6. Show prompt after a short pleasant 2-second delay so page paints smoothly
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 2000)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      clearTimeout(timer)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
          setShowPrompt(false)
        }
      } catch {
        // Handled silently if aborted
      }
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    const cooldownTime = Date.now() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000
    localStorage.setItem(DISMISS_KEY, String(cooldownTime))
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <aside className="mobile-pwa-drawer" aria-label="Install Yadesh App">
      <div className="mobile-pwa-inner">
        <button
          type="button"
          className="mobile-pwa-close"
          onClick={handleDismiss}
          aria-label="Dismiss install prompt"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="mobile-pwa-info">
          <img
            src="/yadesh-mark.png"
            alt="Yadesh Logo"
            className="mobile-pwa-icon"
            width={40}
            height={40}
          />
          <div className="mobile-pwa-text">
            <strong>Keep Yadesh close</strong>
            <p>Install on your home screen for instant daily readings and offline access.</p>
          </div>
        </div>

        {isIos ? (
          <div className="mobile-pwa-ios-instructions">
            <span>
              Tap the Share button <Share2 size={13} aria-hidden="true" /> below, then choose{' '}
              <strong>Add to Home Screen</strong> <PlusSquare size={13} aria-hidden="true" />.
            </span>
          </div>
        ) : deferredPrompt ? (
          <div className="mobile-pwa-action-row">
            <button
              type="button"
              className="mobile-pwa-install-btn"
              onClick={handleInstallClick}
            >
              <Download size={15} aria-hidden="true" />
              Install App
            </button>
            <button
              type="button"
              className="mobile-pwa-later-btn"
              onClick={handleDismiss}
            >
              Maybe later
            </button>
          </div>
        ) : (
          <>
            <div className="mobile-pwa-ios-instructions">
              <span>
                Tap your browser menu <MoreVertical size={13} aria-hidden="true" /> then choose{' '}
                <strong>Install app</strong> or <strong>Add to Home screen</strong>.
              </span>
            </div>
            <div className="mobile-pwa-action-row">
              <button
                type="button"
                className="mobile-pwa-install-btn"
                onClick={handleDismiss}
              >
                <Check size={14} aria-hidden="true" />
                Got it
              </button>
              <button
                type="button"
                className="mobile-pwa-later-btn"
                onClick={handleDismiss}
              >
                Maybe later
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
}
