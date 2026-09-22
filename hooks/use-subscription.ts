'use client'

import { useMemo, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export const FREE_BOOKMARK_LIMIT = 5

export type SubscriptionState = {
  isPremium: boolean
  savesCount: number
  isAtLimit: boolean
  isNearLimit: boolean  // at 4 of 5 — show soft nudge
  isLoaded: boolean
}

/**
 * Reads the current user's premium status and bookmark count.
 * isPremium comes from profiles.is_premium (set by Lemon Squeezy webhook).
 * savesCount comes from a live count of saved_items rows.
 *
 * Returns isLoaded:false until both queries resolve so callers can defer rendering.
 */
export function useSubscription(): SubscriptionState {
  const supabase = useMemo(() => createClient(), [])

  const [isPremium, setIsPremium] = useState(false)
  const [savesCount, setSavesCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        if (!cancelled) setIsLoaded(true)
        return
      }

      const [profileResult, savesResult] = await Promise.all([
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

      if (cancelled) return

      setIsPremium(Boolean(profileResult.data?.is_premium))
      setSavesCount(savesResult.count ?? 0)
      setIsLoaded(true)
    }

    load()
    return () => { cancelled = true }
  }, [supabase])

  return {
    isPremium,
    savesCount,
    isAtLimit: !isPremium && savesCount >= FREE_BOOKMARK_LIMIT,
    isNearLimit: !isPremium && savesCount === FREE_BOOKMARK_LIMIT - 1,
    isLoaded,
  }
}
