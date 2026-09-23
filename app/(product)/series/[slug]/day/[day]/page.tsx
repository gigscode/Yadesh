import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SeriesDayActions } from '@/components/series-day-actions'
import { allSeries, getSeriesBySlug, getSeriesDay } from '@/lib/series-data'
import { createClient } from '@/lib/supabase/server'

export function generateStaticParams() {
  return allSeries.flatMap((series) =>
    series.days.map((day) => ({
      slug: series.slug,
      day: String(day.day),
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; day: string }>
}) {
  const { slug, day } = await params
  const series = getSeriesBySlug(slug)
  const dayItem = getSeriesDay(slug, Number(day))
  if (!series || !dayItem) return {}
  return {
    title: `Day ${dayItem.day}: ${dayItem.title} | ${series.title} | Yadesh`,
    description: dayItem.body,
  }
}

export default async function SeriesDayPage({
  params,
}: {
  params: Promise<{ slug: string; day: string }>
}) {
  const { slug, day } = await params
  const series = getSeriesBySlug(slug)
  const dayNumber = Number(day)
  const dayItem = getSeriesDay(slug, dayNumber)

  if (!series || !dayItem) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isPremium = false
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', user.id)
      .maybeSingle()
    isPremium = Boolean(profile?.is_premium)
  }

  if (!isPremium) {
    redirect('/upgrade')
  }

  return (
    <article className="series-reading-article" aria-labelledby="series-day-title">
      <div className="series-reading-nav">
        <Link href={`/series/${series.slug}`}>
          <ArrowLeft size={14} aria-hidden="true" />
          Back to {series.title}
        </Link>
        <span className="series-day-label">
          Day {dayItem.day} of {series.totalDays}
        </span>
      </div>

      <header
        className="series-day-hero"
        style={{ background: series.accentColor, color: series.textColor }}
      >
        <p className="eyebrow">{dayItem.source} &middot; Day {dayItem.day}</p>
        <h1 id="series-day-title">{dayItem.title}</h1>
        <p>{dayItem.body}</p>
      </header>

      <blockquote className="reading-pull-quote">
        <p>&ldquo;{dayItem.pullQuote}&rdquo;</p>
      </blockquote>

      <div className="reading-body-full">
        {dayItem.fullBody.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <aside className="reading-takeaway" aria-label="Key takeaway">
        <p className="eyebrow">KEY TAKEAWAY</p>
        <p>{dayItem.takeaway}</p>
      </aside>

      <SeriesDayActions
        slug={series.slug}
        day={dayItem.day}
        totalDays={series.totalDays}
        cardId={dayItem.cardId}
        title={dayItem.title}
        quote={dayItem.pullQuote}
        source={dayItem.source}
      />
    </article>
  )
}
