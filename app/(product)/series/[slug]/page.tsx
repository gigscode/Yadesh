import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SeriesProgress } from '@/components/series-progress'
import { allSeries, getSeriesBySlug } from '@/lib/series-data'
import { createClient } from '@/lib/supabase/server'

export function generateStaticParams() {
  return allSeries.map((series) => ({ slug: series.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const series = getSeriesBySlug(slug)
  if (!series) return {}
  return {
    title: `${series.title} | Yadesh`,
    description: series.description,
  }
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const series = getSeriesBySlug(slug)
  if (!series) notFound()

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
    <article className="series-detail-article" aria-labelledby="series-title">
      <div className="series-detail-nav">
        <Link href="/series" className="series-back-link">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Series
        </Link>
        <span
          className="series-theme-badge"
          style={{ background: series.accentColor, color: series.textColor }}
        >
          {series.theme}
        </span>
      </div>

      <header
        className="series-day-hero"
        style={{ background: series.accentColor, color: series.textColor }}
      >
        <p className="eyebrow">{series.season}</p>
        <h1 id="series-title">{series.title}</h1>
        <p>
          {series.subtitle} &middot; {series.description}
        </p>
      </header>

      <SeriesProgress slug={series.slug} days={series.days} />
    </article>
  )
}
