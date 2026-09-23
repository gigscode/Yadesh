'use client'

import { useEffect, useRef, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import posthog from 'posthog-js'
import { isPostHogConfigured } from '@/instrumentation-client'
import { createClient } from '@/lib/supabase/client'

export function PwaUpdater() {
  const [showSplash, setShowSplash] = useState(false)
  const identifiedUserId = useRef<string | null>(null)

  useEffect(() => {
    if (!isPostHogConfigured) return

    const supabase = createClient()

    const identifyUser = (user: User) => {
      if (identifiedUserId.current === user.id) return

      if (identifiedUserId.current) posthog.reset()

      const properties: { email?: string; name?: string } = {}
      if (user.email) properties.email = user.email
      if (typeof user.user_metadata.full_name === 'string') {
        properties.name = user.user_metadata.full_name
      }

      posthog.identify(user.id, properties)
      identifiedUserId.current = user.id
    }

    void supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) identifyUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        if (identifiedUserId.current) {
          posthog.reset()
          identifiedUserId.current = null
        }
        return
      }

      if (session?.user) identifyUser(session.user)
    })

    return () => subscription.unsubscribe()
  }, [])

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
