import { learningCards, type LearningCard } from '@/lib/learning-data'
import { createClient } from '@/lib/supabase/server'

/**
 * Loads all learning cards by merging:
 * 1. Static curated cards from lib/learning-data.ts
 * 2. Dynamic cards published in the Supabase `content` table
 */
export async function getAllLearningCards(): Promise<LearningCard[]> {
  try {
    const supabase = await createClient()
    const { data: dbCards, error } = await supabase
      .from('content')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !dbCards || dbCards.length === 0) {
      return learningCards
    }

    // Map database rows to LearningCard shape
    const mappedDbCards: LearningCard[] = dbCards.map((row: any) => ({
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

    // Merge: Dynamic cards appear first, followed by static cards
    const staticIds = new Set(mappedDbCards.map((c) => c.id))
    const uniqueStaticCards = learningCards.filter((c) => !staticIds.has(c.id))

    return [...mappedDbCards, ...uniqueStaticCards]
  } catch {
    // Fallback safely to static cards if offline or during build
    return learningCards
  }
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

