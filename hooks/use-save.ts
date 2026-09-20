'use client'

import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

/**
 * Manages the saved state for a single content item.
 * Optimistically updates the UI and syncs with Supabase saved_items.
 * If the user is not logged in, redirects to /login on save attempt.
 */
export function useSave(contentKey: string, initialSaved = false) {
  const supabase = useMemo(() => createClient(), [])
  const [saved, setSaved] = useState(initialSaved)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    if (loading) return
    setLoading(true)

    // Check auth first
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/login'
      setLoading(false)
      return
    }

    // Optimistic update
    setSaved((prev) => !prev)

    if (!saved) {
      // Save
      const { error } = await supabase
        .from('saved_items')
        .insert({ user_id: user.id, content_key: contentKey })

      if (error) {
        // Rollback on error (duplicate key = already saved, treat as saved)
        if (error.code === '23505') {
          setSaved(true)
        } else {
          setSaved(false)
          console.error('Save failed:', error.message)
        }
      }
    } else {
      // Unsave
      const { error } = await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', user.id)
        .eq('content_key', contentKey)

      if (error) {
        // Rollback on error
        setSaved(true)
        console.error('Unsave failed:', error.message)
      }
    }

    setLoading(false)
  }

  return { saved, loading, toggle }
}
