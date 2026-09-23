import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { allSeries } from '@/lib/series-data'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Guided Series | Yadesh',
  description: '21 readings on one theme, available with Yadesh Premium.',
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
      <PageHeader title="Guided Series" eyebrow="21 READINGS ON ONE THEME" />

      <section className="series-intro">
        <p>
          Each series gives you one reading per day for 21 days around one theme.
          {!isPremium && ' Available with Premium.'}
        </p>
      </section>

      {!isPremium && (
        <div className="series-premium-gate">
          <div className="series-gate-inner">
            <div>
              <p className="series-gate-kicker">YADESH PREMIUM</p>
              <strong>Three series. Twenty-one readings each.</strong>
              <p>Follow a theme for three weeks, save your progress, and return to each day when you are ready.</p>
            </div>
            <Link href="/upgrade" className="series-gate-btn">See Premium plans <span aria-hidden="true">→</span></Link>
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
              {isPremium ? 'Start series →' : 'View Premium →'}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
