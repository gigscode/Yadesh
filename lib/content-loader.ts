import { learningCards, type LearningCard } from '@/lib/learning-data'
import { bookSummaries, type BookSummary, getBookSummaryById } from '@/lib/book-summaries'
import { peopleProfiles, type PersonProfile, getPersonProfileById } from '@/lib/people-data'
import { createClient } from '@/lib/supabase/server'

/**
 * Fetches dynamic cards from Supabase using the request-aware server client.
 * The admin publish action revalidates the pages that consume this data.
 */
async function fetchDbCards(): Promise<LearningCard[]> {
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
}

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

/**
 * Loads all book summaries by merging:
 * 1. Curated baseline book summaries in lib/book-summaries.ts
 * 2. Dynamic books uploaded to Supabase content table (type = 'BOOK')
 */
export async function getAllBooks(): Promise<BookSummary[]> {
  try {
    const supabase = await createClient()
    const { data: dbRows } = await supabase
      .from('content')
      .select('*')
      .eq('type', 'BOOK')
      .order('created_at', { ascending: false })

    if (!dbRows || dbRows.length === 0) {
      return bookSummaries
    }

    const mappedDbBooks: BookSummary[] = dbRows.map((row: any) => {
      const fullBody = Array.isArray(row.full_body) ? row.full_body : [row.full_body]
      return {
        id: row.id,
        title: row.title,
        author: row.source,
        category: 'BOOK',
        readTime: row.time || '4 min read',
        bigIdea: row.body,
        pullQuote: row.pull_quote,
        takeaways: [
          { number: '01', title: 'Core Principle', explanation: fullBody[0] || row.body },
          { number: '02', title: 'Biblical Anchor', explanation: fullBody[1] || row.pull_quote },
          { number: '03', title: 'Living Faith', explanation: fullBody[2] || row.takeaway },
        ],
        summaryParagraphs: fullBody,
        application: row.takeaway,
      }
    })

    const dbIds = new Set(mappedDbBooks.map((b) => b.id))
    const uniqueStaticBooks = bookSummaries.filter((b) => !dbIds.has(b.id))
    return [...mappedDbBooks, ...uniqueStaticBooks]
  } catch {
    return bookSummaries
  }
}

/**
 * Fetches a single book summary by id/slug from dynamic database or static collection
 */
export async function getBookSummary(id: string): Promise<BookSummary | null> {
  const staticBook = getBookSummaryById(id)
  if (staticBook) return staticBook

  try {
    const supabase = await createClient()
    const { data: row } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .eq('type', 'BOOK')
      .maybeSingle()

    if (!row) return null

    const fullBody = Array.isArray(row.full_body) ? row.full_body : [row.full_body]
    return {
      id: row.id,
      title: row.title,
      author: row.source,
      category: 'BOOK',
      readTime: row.time || '4 min read',
      bigIdea: row.body,
      pullQuote: row.pull_quote,
      takeaways: [
        { number: '01', title: 'Core Principle', explanation: fullBody[0] || row.body },
        { number: '02', title: 'Biblical Anchor', explanation: fullBody[1] || row.pull_quote },
        { number: '03', title: 'Living Faith', explanation: fullBody[2] || row.takeaway },
      ],
      summaryParagraphs: fullBody,
      application: row.takeaway,
    }
  } catch {
    return null
  }
}

/**
 * Loads all people profiles by merging:
 * 1. Curated baseline profiles in lib/people-data.ts
 * 2. Dynamic people uploaded to Supabase content table (type = 'PERSON')
 */
export async function getAllPeopleProfiles(): Promise<PersonProfile[]> {
  try {
    const supabase = await createClient()
    const { data: dbRows } = await supabase
      .from('content')
      .select('*')
      .eq('type', 'PERSON')
      .order('created_at', { ascending: false })

    if (!dbRows || dbRows.length === 0) {
      return peopleProfiles
    }

    const mappedDbPeople: PersonProfile[] = dbRows.map((row: any) => {
      const fullBody = Array.isArray(row.full_body) ? row.full_body : [row.full_body]
      return {
        id: row.id,
        name: row.title,
        lifespan: row.time || 'Contemporary',
        role: row.source,
        coreQuote: row.pull_quote,
        shortBio: row.body,
        eyewitnessStory: {
          title: 'Firsthand Account',
          account: fullBody.join('\n\n'),
          primarySource: row.takeaway,
          sourceContext: 'Autobiographical account from ministry records.',
        },
        keyFacts: [
          { factTitle: 'Life and Calling', detail: fullBody[0] || row.body },
          { factTitle: 'Spiritual Emphasis', detail: fullBody[1] || row.pull_quote },
          { factTitle: 'Lasting Impact', detail: fullBody[2] || row.takeaway },
        ],
        booksAuthored: [],
      }
    })

    const dbIds = new Set(mappedDbPeople.map((p) => p.id))
    const uniqueStaticPeople = peopleProfiles.filter((p) => !dbIds.has(p.id))
    return [...mappedDbPeople, ...uniqueStaticPeople]
  } catch {
    return peopleProfiles
  }
}

/**
 * Fetches a single person profile by id/slug from dynamic database or static collection
 */
export async function getPersonProfile(id: string): Promise<PersonProfile | null> {
  const staticPerson = getPersonProfileById(id)
  if (staticPerson) return staticPerson

  try {
    const supabase = await createClient()
    const { data: row } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .eq('type', 'PERSON')
      .maybeSingle()

    if (!row) return null

    const fullBody = Array.isArray(row.full_body) ? row.full_body : [row.full_body]
    return {
      id: row.id,
      name: row.title,
      lifespan: row.time || 'Contemporary',
      role: row.source,
      coreQuote: row.pull_quote,
      shortBio: row.body,
      eyewitnessStory: {
        title: 'Documented Firsthand Account',
        account: fullBody.join('\n\n'),
        primarySource: row.takeaway,
        sourceContext: 'Verified autobiographical account from ministry records.',
      },
      keyFacts: [
        { factTitle: 'Life and Calling', detail: fullBody[0] || row.body },
        { factTitle: 'Spiritual Emphasis', detail: fullBody[1] || row.pull_quote },
        { factTitle: 'Lasting Impact', detail: fullBody[2] || row.takeaway },
      ],
      booksAuthored: [],
    }
  } catch {
    return null
  }
}

