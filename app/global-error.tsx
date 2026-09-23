'use client'

import { useEffect } from 'react'
import { isPostHogConfigured } from '@/instrumentation-client'
import posthog from 'posthog-js'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (isPostHogConfigured) posthog.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>Please try again.</p>
          <button onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  )
}
