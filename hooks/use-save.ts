'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { FREE_BOOKMARK_LIMIT } from '@/hooks/use-subscription'
import { isPostHogConfigured } from '@/instrumentation-client'
import posthog from 'posthog-js'

/**
 * Manages the saved state for a single content item.
 * Optimistically updates the UI and syncs with Supabase saved_items.
 * Redirects to /login via Next.js router if the user is not authenticated.
 * Calls onUpgradeRequired() if a free-tier user hits the 5-bookmark limit
 * instead of writing to the database.
 */
export function useSave(
  contentKey: string,
  initialSaved = false,
  onUpgradeRequired?: () => void,
) {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function toggle() {
    if (loading) return
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      setLoading(false)
      return
    }

    // Only enforce the limit when adding (not removing) a bookmark
    if (!saved) {
      const [profileResult, countResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', user.id)
          .maybeSingle(),
        supabase
          .from('saved_items')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id),
      ])

      const isPremium = Boolean(profileResult.data?.is_premium)
      const currentCount = countResult.count ?? 0

      if (!isPremium && currentCount >= FREE_BOOKMARK_LIMIT) {
        setLoading(false)
        onUpgradeRequired?.()
        return
      }
    }

    // Optimistic update
    setSaved((prev) => !prev)

    if (!saved) {
      const { error: upsertError } = await supabase
        .from('saved_items')
        .upsert(
          { user_id: user.id, content_key: contentKey },
          { onConflict: 'user_id,content_key', ignoreDuplicates: true }
        )

      if (upsertError) {
        setSaved(false)
        setError(upsertError.message)
      } else {
        if (isPostHogConfigured) posthog.capture('reading_saved', { content_id: contentKey })
      }
    } else {
      const { error: deleteError } = await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', user.id)
        .eq('content_key', contentKey)

      if (deleteError) {
        setSaved(true)
        setError(deleteError.message)
      } else {
        if (isPostHogConfigured) posthog.capture('reading_unsaved', { content_id: contentKey })
      }
    }

    setLoading(false)
  }

  return { saved, loading, error, toggle }
}
