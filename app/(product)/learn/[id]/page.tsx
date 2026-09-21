import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReadingDetailActions } from '@/components/reading-detail-actions'
import { learningCards } from '@/lib/learning-data'
import { getLearningCardById, getAllLearningCards } from '@/lib/content-loader'
import { createClient } from '@/lib/supabase/server'

const typeAccent: Record<string, string> = {
  FAITH:    '#edfba0',
  MIRACLE:  '#fef3c7',
  LIFE:     '#e9c7f5',
  IDEA:     '#edfba0',
  HISTORY:  '#e4e2ff',
  BOOK:     '#fdf0d8',
  TEACHING: '#d8f5e4',
  STORY:    '#fff',
}

export function generateStaticParams() {
  return learningCards.map((card) => ({ id: card.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const card = await getLearningCardById(id)
  if (!card) return {}
  return {
    title: `${card.title} | Yadesh`,
    description: card.body,
  }
}

export default async function ReadingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const card = await getLearningCardById(id)
  if (!card) notFound()

  const allCards = await getAllLearningCards()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let initialSaved = false
  if (user) {
    const { data } = await supabase
      .from('saved_items')
      .select('content_key')
      .eq('user_id', user.id)
      .eq('content_key', card.id)
      .maybeSingle()
    initialSaved = !!data
  }

  const accent = typeAccent[card.type] ?? '#fff'
  const currentIndex = allCards.findIndex((c) => c.id === id)
  const prev = allCards[currentIndex - 1] ?? null
  const next = allCards[currentIndex + 1] ?? null

  return (
    <article className="reading-article" aria-labelledby="reading-title">

      <div className="reading-nav">
        <Link href="/learn" className="reading-back-link">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Home
        </Link>
        <span className="reading-type-badge" style={{ background: accent }}>
          {card.type}
        </span>
      </div>

      <header className="reading-hero" style={{ background: accent }}>
        <p className="eyebrow">{card.source}</p>
        <h1 id="reading-title">{card.title}</h1>
        <p className="reading-time-label">{card.time}</p>
      </header>

      <blockquote className="reading-pull-quote">
        <p>&ldquo;{card.pullQuote}&rdquo;</p>
      </blockquote>

      <div className="reading-body-full">
        {card.fullBody.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <aside className="reading-takeaway" aria-label="Key takeaway">
        <p className="eyebrow">KEY TAKEAWAY</p>
        <p>{card.takeaway}</p>
      </aside>

      <ReadingDetailActions
        id={card.id}
        title={card.title}
        pullQuote={card.pullQuote}
        source={card.source}
        type={card.type}
        initialSaved={initialSaved}
      />

      <nav className="reading-adjacent" aria-label="Next and previous readings">
        <div className="reading-adjacent-inner">
          {prev ? (
            <Link href={`/learn/${prev.id}`} className="reading-adj-link reading-adj-prev">
              <span className="reading-adj-dir">← Previous</span>
              <span className="reading-adj-title">{prev.title}</span>
              <span className="reading-adj-meta">{prev.source} · {prev.time}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/learn/${next.id}`} className="reading-adj-link reading-adj-next">
              <span className="reading-adj-dir">Next →</span>
              <span className="reading-adj-title">{next.title}</span>
              <span className="reading-adj-meta">{next.source} · {next.time}</span>
            </Link>
          ) : <span />}
        </div>
      </nav>

    </article>
  )
}
