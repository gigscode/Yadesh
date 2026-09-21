import { learningCards, type LearningCard } from '@/lib/learning-data'
import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'

/**
 * Fetches dynamic cards from Supabase.
 * Cached server-side with the 'content' tag for 60 seconds.
 * Revalidated on demand when the admin publishes new content.
 */
const fetchDbCards = unstable_cache(
  async (): Promise<LearningCard[]> => {
    try {
      const supabase = await createClient()
      const { data: dbCards, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !dbCards || dbCards.length === 0) {
        return []
      }

      return dbCards.map((row: any) => ({
        id: row.id,
        type: row.type,
        title: row.title,
        source: row.source,
        body: row.body,
        fullBody: Array.isArray(row.full_body) ? row.full_body : [row.full_body],
        pullQuote: row.pull_quote,
        takeaway: row.takeaway,
        time: row.time,
      }))
    } catch {
      return []
    }
  },
  ['content-db-cards'],
  { tags: ['content'], revalidate: 60 }
)

/**
 * Loads all learning cards by merging:
 * 1. Static curated cards (instant, from bundle)
 * 2. Dynamic cards published via /admin (cached, from Supabase)
 */
export async function getAllLearningCards(): Promise<LearningCard[]> {
  const dbCards = await fetchDbCards()

  if (dbCards.length === 0) return learningCards

  const dbIds = new Set(dbCards.map((c) => c.id))
  const uniqueStaticCards = learningCards.filter((c) => !dbIds.has(c.id))
  return [...dbCards, ...uniqueStaticCards]
}

/**
 * Fetch a single learning card by id from dynamic content or static data
 */
export async function getLearningCardById(id: string): Promise<LearningCard | null> {
  // Check static first for speed
  const staticMatch = learningCards.find((c) => c.id === id)
  if (staticMatch) return staticMatch

  try {
    const supabase = await createClient()
    const { data: row, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error || !row) return null

    return {
      id: row.id,
      type: row.type,
      title: row.title,
      source: row.source,
      body: row.body,
      fullBody: Array.isArray(row.full_body) ? row.full_body : [row.full_body],
      pullQuote: row.pull_quote,
      takeaway: row.takeaway,
      time: row.time,
    }
  } catch {
    return null
  }
}

