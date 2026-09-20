'use client'

import { useEffect, useState } from 'react'

export function PwaUpdater() {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Only show the splash when launched as an installed PWA (standalone mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in window.navigator &&
        (window.navigator as { standalone?: boolean }).standalone === true)

    if (isStandalone) {
      setShowSplash(true)
      const timer = setTimeout(() => setShowSplash(false), 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return

    let refreshing = false
    let intervalId: ReturnType<typeof setInterval> | null = null

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
        intervalId = setInterval(() => registration.update(), 60 * 60 * 1000)
      })
      .catch(() => {
        // Registration can fail in local previews or restricted contexts.
      })

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
      if (intervalId !== null) clearInterval(intervalId)
    }
  }, [])

  if (!showSplash) return null

  return (
    <div role="status" aria-label="Loading Yadesh" className="pwa-splash">
      <div className="pwa-splash-brand">
        <img src="/yadesh-splash.png" alt="Yadesh" />
      </div>
    </div>
  )
}
