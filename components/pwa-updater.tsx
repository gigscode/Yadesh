'use client'

import { useEffect, useState } from 'react'

export function PwaUpdater() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Only show the splash when launched as an installed PWA (standalone mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true)

    if (isStandalone) {
      setShowSplash(true)
      // Hide after animation completes (matches the pwa-splash-in animation duration + buffer)
      const timer = setTimeout(() => setShowSplash(false), 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return

    let refreshing = false
    const handleControllerChange = () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((registration) => {
        registration.update()
        window.setInterval(() => registration.update(), 60 * 60 * 1000)
      })
      .catch(() => {
        // Registration can fail in local previews or restricted contexts.
      })

    return () => navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
  }, [])

  if (!showSplash) return null

  return (
    <main className="pwa-splash" aria-label="Loading Yadesh" aria-live="polite">
      <div className="pwa-splash-brand">
        <img src="/yadesh-splash.png" alt="Yadesh" />
      </div>
    </main>
  )
}
