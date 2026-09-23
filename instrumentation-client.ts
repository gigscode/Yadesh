import posthog from 'posthog-js'

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

export const isPostHogConfigured = Boolean(projectToken && host)

if (!projectToken) {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured'
    )
  }
} else if (!host) {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(
      'NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured'
    )
  }
} else {
  posthog.init(projectToken, {
    api_host: host,
    defaults: '2026-01-30',
    capture_pageview: 'history_change',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
  })
}
