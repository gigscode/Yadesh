import Link from 'next/link'
import { Lock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { allSeries } from '@/lib/series-data'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Guided Series | Yadesh',
  description: '21-day guided reading journeys built around a single theme. Premium feature.',
}

export default async function SeriesPage() {
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

  return (
    <>
      <PageHeader title="Guided Series" eyebrow="21-DAY JOURNEYS" />

      <section className="series-intro">
        <p>
          Each series is a sequenced 21-day journey built around one theme. One reading per day, each building on the last.
          {!isPremium && ' Premium feature.'}
        </p>
      </section>

      {!isPremium && (
        <div className="series-premium-gate">
          <div className="series-gate-inner">
            <Lock size={22} aria-hidden="true" />
            <div>
              <strong>Premium feature</strong>
              <p>Guided series are included with Yadesh Premium at $4.99/month.</p>
            </div>
            <Link href="/upgrade" className="series-gate-btn">Unlock series</Link>
          </div>
        </div>
      )}

      <div className="series-grid">
        {allSeries.map((series) => (
          <Link
            key={series.id}
            href={isPremium ? `/series/${series.slug}` : '/upgrade'}
            className="series-card"
            style={{ background: series.accentColor, color: series.textColor }}
            aria-label={`${series.title}${!isPremium ? ' (Premium)' : ''}`}
          >
            {!isPremium && (
              <span className="series-card-lock" aria-hidden="true">
                <Lock size={14} />
              </span>
            )}
            <p className="eyebrow" style={{ color: series.accentColor === '#17181d' ? '#e4fb4f' : 'rgba(255,255,255,0.7)' }}>
              {series.theme}
            </p>
            <h2>{series.title}</h2>
            <p className="series-card-sub">{series.subtitle}</p>
            <p className="series-card-desc">{series.description}</p>
            <div className="series-card-meta">
              <span>{series.totalDays} days</span>
              <span>{series.season}</span>
            </div>
            <span className="series-card-cta">
              {isPremium ? 'Start series →' : 'Upgrade to unlock →'}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
