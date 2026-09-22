import { createClient } from '@supabase/supabase-js'

/**
 * Creates an administrative Supabase client using the service role key or anon key.
 * Used exclusively for server-to-server operations like webhook processing.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase admin credentials. Check .env.local.')
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
