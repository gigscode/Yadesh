'use client'

import { useState, useEffect } from 'react'
import { Download, X, Share2, PlusSquare } from 'lucide-react'

const DISMISS_KEY = 'yadesh_pwa_dismissed_until'
const COOLDOWN_DAYS = 7

export function MobilePwaPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // 1. Strict check: Must be a mobile or tablet device, NOT a PC/laptop
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const ua = navigator.userAgent || ''
    const isMobileUa =
      /android|iphone|ipad|ipod|tablet|mobile/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))

    const isSmallOrMediumScreen = window.innerWidth <= 1024

    // If it's a PC with a fine mouse or desktop browser without mobile signals, exit immediately
    if (!isCoarsePointer && !isMobileUa) {
      return
    }

    if (!isMobileUa && !isSmallOrMediumScreen) {
      return
    }

    // 2. Check if already running in standalone PWA mode (installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true)

    if (isStandalone) {
      return
    }

    // 3. Check dismissal cooldown (7 days)
    const dismissedUntil = localStorage.getItem(DISMISS_KEY)
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) {
      return
    }

    // 4. Detect iOS Safari
    const isIosDevice =
      /iphone|ipad|ipod/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua))
    setIsIos(isIosDevice)

    // 5. Intercept Android / Chromium beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // For iOS, show after a short pleasant delay so the page loads first
    let timer: ReturnType<typeof setTimeout>
    if (isIosDevice) {
      timer = setTimeout(() => {
        setShowPrompt(true)
      }, 2500)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      if (timer) clearTimeout(timer)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setShowPrompt(false)
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
        ) : (
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
        )}
      </div>
    </aside>
  )
}
