'use client'

import { useEffect } from 'react'

export function PwaUpdater() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return

    let refreshing = false
    const handleControllerChange = () => {
      if (refreshing) return
      refreshing = true
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' }).then((registration) => {
      registration.update()
      window.setInterval(() => registration.update(), 60 * 60 * 1000)
    }).catch(() => {
      // A browser can reject registration in local previews or restricted contexts.
    })

    return () => navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
  }, [])

  return null
}
