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
      document.body.classList.add('pwa-hydrated')
      setShowSplash(true)
      const timer = setTimeout(() => setShowSplash(false), 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return

    // Track whether this document was already controlled by a service worker on load.
    // If it was not (first visit / clean cache), controllerchange should NOT force a reload.
    const hadControllerOnLoad = Boolean(navigator.serviceWorker.controller)
    let refreshing = false
    let intervalId: ReturnType<typeof setInterval> | null = null
    let removeUpdateListeners: (() => void) | null = null

    const handleControllerChange = () => {
      if (refreshing || !hadControllerOnLoad) return
      refreshing = true
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    navigator.serviceWorker
      .register('/sw.js', { scope: '/', updateViaCache: 'none' })
      .then((registration) => {
        const checkForUpdate = () => {
          if (document.visibilityState === 'visible' && navigator.onLine) {
            registration.update().catch(() => {})
          }
        }

        checkForUpdate()
        intervalId = setInterval(checkForUpdate, 15 * 60 * 1000)
        window.addEventListener('focus', checkForUpdate)
        window.addEventListener('online', checkForUpdate)
        document.addEventListener('visibilitychange', checkForUpdate)

        const handleUpdateFound = () => {
          const installingWorker = registration.installing
          if (!installingWorker) return
          const handleStateChange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              installingWorker.postMessage({ type: 'SKIP_WAITING' })
            }
          }
          installingWorker.addEventListener('statechange', handleStateChange)
        }
        registration.addEventListener('updatefound', handleUpdateFound)

        removeUpdateListeners = () => {
          window.removeEventListener('focus', checkForUpdate)
          window.removeEventListener('online', checkForUpdate)
          document.removeEventListener('visibilitychange', checkForUpdate)
          registration.removeEventListener('updatefound', handleUpdateFound)
        }
      })
      .catch(() => {
        // Registration can fail in local previews or restricted contexts.
      })

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
      if (intervalId !== null) clearInterval(intervalId)
      removeUpdateListeners?.()
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
