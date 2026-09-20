'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

/**
 * Manages the saved state for a single content item.
 * Optimistically updates the UI and syncs with Supabase saved_items.
 * Redirects to /login via Next.js router if the user is not authenticated.
 */
export function useSave(contentKey: string, initialSaved = false) {
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

    // Optimistic update
    setSaved((prev) => !prev)

    if (!saved) {
      const { error } = await supabase
        .from('saved_items')
        .insert({ user_id: user.id, content_key: contentKey })

      if (error) {
        // 23505 = unique violation — already saved, treat as saved
        if (error.code === '23505') {
          setSaved(true)
        } else {
          setSaved(false)
          setError(error.message)
        }
      }
    } else {
      const { error } = await supabase
        .from('saved_items')
        .delete()
        .eq('user_id', user.id)
        .eq('content_key', contentKey)

      if (error) {
        setSaved(true)
        setError(error.message)
      }
    }

    setLoading(false)
  }

  return { saved, loading, error, toggle }
}
