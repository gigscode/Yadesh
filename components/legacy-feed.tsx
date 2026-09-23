'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SharedNav } from '@/components/shared-nav'
import { LearningCard } from '@/components/learning-card'
import { learningCards } from '@/lib/learning-data'
import { allSeries } from '@/lib/series-data'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

export function LegacyFeed({
  showHero = true,
  showNav = true,
  isLoggedIn = false,
}: {
  showHero?: boolean
  showNav?: boolean
  isLoggedIn?: boolean
}) {
  const previewCards = learningCards.filter(c =>
    ['cs-lewis-from-atheist-to-apologist', 'grace-is-power-not-permission', 'mere-christianity-lewis'].includes(c.id)
  ).sort((a, b) => {
    const order = ['cs-lewis-from-atheist-to-apologist', 'grace-is-power-not-permission', 'mere-christianity-lewis']
    return order.indexOf(a.id) - order.indexOf(b.id)
  })
  const pageRef = useScrollReveal()
  const featuredSeries = allSeries[0]

  return (
    <div className="phone-shell" ref={pageRef as any}>
      {showNav && <SharedNav isLoggedIn={isLoggedIn} />}

      <main id="top" className="app-content">

        {showHero && (
          <section className="landing-hero" aria-labelledby="page-title">
            <div className="hero-copy">
              <p className="kicker anim-fade-up">A five minute habit for the Christian mind</p>
              <h1 id="page-title" className="anim-fade-up delay-1">
                <span className="hero-line hero-line-one">Trade scrolling.</span>
                <span className="hero-line hero-line-two hero-emphasis">Feed your</span>
                <span className="hero-line hero-line-three hero-emphasis">faith.</span>
              </h1>
              <p className="anim-fade-up delay-2">
                Short, memorable lessons from great Christian books, biographies, and history. Built for busy people who want depth without the noise.
              </p>
              <div className="hero-actions anim-fade-up delay-3">
                {isLoggedIn ? (
                  <Link className="hero-link" href="/learn">
                    Continue learning <ArrowUpRight aria-hidden="true" />
                  </Link>
                ) : (
                  <>
                    <Link className="hero-link" href="/register">
                      Start reading for free <ArrowUpRight aria-hidden="true" />
                    </Link>
                    <Link className="hero-secondary" href="/explore">
                      Browse topics <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </>
                )}
              </div>
              <span className="micro-trust anim-fade-up delay-4">Read. Keep. Remember.</span>
            </div>
          </section>
        )}

        {/* Live Sample Preview */}
        <section className="product-section" aria-labelledby="preview-title" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }} data-reveal>
            <div>
              <p className="kicker">What you will read</p>
              <h2 id="preview-title" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', margin: '0.35rem 0' }}>
                Five minutes. Real depth.
              </h2>
            </div>
          </div>
          <div className="learning-grid">
            {previewCards.map((item, i) => (
              <div key={item.id} data-reveal data-delay={String(i + 1)}>
                <LearningCard {...item} />
              </div>
            ))}
          </div>
        </section>

        <section className="how-section landing-method" aria-labelledby="how-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="kicker">Why Yadesh</p>
              <h2 id="how-title">Built for real life, not endless feeds.</h2>
            </div>
            <span className="section-index">01 / 03</span>
          </div>
          <p className="method-intro" data-reveal data-delay="1">
            Most of us lose spare moments to mindless scrolling and leave feeling empty. Yadesh turns those moments into quiet growth from trusted Christian sources.
          </p>
          <div className="how-grid">
            {[
              ['01', 'Pick one idea', 'Choose a theme or open the daily reading from Christian leaders, thinkers, and classic books.'],
              ['02', 'Read in 3 minutes', 'Understand the core lesson quickly with clear context, without getting lost in endless feeds.'],
              ['03', 'Keep what matters', 'Save insights to your personal library so you can remember them and apply them in daily life.'],
            ].map(([num, title, copy], i) => (
              <article key={num} data-reveal data-delay={String(i + 2)}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-series" aria-labelledby="series-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="kicker">Go deeper</p>
              <h2 id="series-title">Not just a reading. A journey.</h2>
            </div>
            <span className="section-index">02 / 03</span>
          </div>
          <div
            className="landing-series-feature"
            style={{ background: featuredSeries.accentColor, color: featuredSeries.textColor }}
            data-reveal
            data-delay="1"
          >
            <div className="landing-series-copy">
              <p className="landing-series-label">Premium guided series</p>
              <h3>{featuredSeries.title}</h3>
              <p className="landing-series-subtitle">{featuredSeries.subtitle}</p>
              <p className="landing-series-description">{featuredSeries.description}</p>
              <Link href="/register" className="landing-series-link">
                Start your free account <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <ol className="landing-series-days" aria-label={`${featuredSeries.title} preview`}>
              {featuredSeries.days.slice(0, 3).map((day) => (
                <li key={day.day}>
                  <span>{String(day.day).padStart(2, '0')}</span>
                  <strong>{day.title}</strong>
                </li>
              ))}
              <li className="landing-series-more">
                <span>21</span>
                <strong>days to build a lasting practice</strong>
              </li>
            </ol>
          </div>
        </section>

        {/* Pricing section */}
        <section className="landing-pricing" aria-labelledby="pricing-title" data-reveal>
          <div className="section-heading" style={{ marginBottom: '0.5rem' }}>
            <div>
              <p className="kicker">Simple pricing</p>
              <h2 id="pricing-title">Start free. Go deeper when ready.</h2>
            </div>
          </div>
          <p className="method-intro" style={{ marginBottom: '2rem' }}>
            The free plan is real, not a teaser. Premium unlocks the full archive, guided series, and no bookmark limits.
          </p>

          <div className="landing-pricing-grid">
            {/* Free */}
            <div className="landing-plan landing-plan-free" data-reveal data-delay="1">
              <div className="landing-plan-top">
                <p className="kicker">FREE</p>
                <p className="landing-plan-price"><strong>$0</strong><span>forever</span></p>
              </div>
              <ul>
                <li>1 new reading every day</li>
                <li>Browse all 4 content pillars</li>
                <li>Save up to 5 bookmarks</li>
                <li>Full reading detail pages</li>
              </ul>
              <Link href="/register" className="landing-plan-btn landing-plan-btn-free">
                Start for free <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>

            {/* Premium */}
            <div className="landing-plan landing-plan-premium" data-reveal data-delay="2">
              <div className="landing-plan-top">
                <p className="kicker" style={{ color: '#e4fb4f' }}>PREMIUM</p>
                <p className="landing-plan-price">
                  <strong>$4.99</strong><span>/ month</span>
                </p>
                <p className="landing-plan-annual">$39.99 / year, save 33%</p>
              </div>
              <ul>
                <li>Everything in free</li>
                <li>Full archive, all teachers</li>
                <li>Unlimited bookmarks</li>
                <li>21-day guided series</li>
                <li>Offline reading</li>
                <li>Audio versions</li>
              </ul>
              <Link href="/register" className="landing-plan-btn landing-plan-btn-premium">
                Start free, upgrade anytime <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <p className="landing-plan-note">No card required to start. Cancel anytime.</p>
            </div>
          </div>
        </section>

        <section className="register-cta-section" aria-labelledby="cta-title" data-reveal>
          <div>
            <p className="kicker">Start today</p>
            {isLoggedIn ? (
              <>
                <h2 id="cta-title">Keep your habit going.</h2>
                <p>Your library is waiting. Pick up where you left off or discover something new.</p>
              </>
            ) : (
              <>
                <h2 id="cta-title">Start your five minute habit today.</h2>
                <p>Create a free account and replace empty screen time with timeless Christian wisdom.</p>
              </>
            )}
          </div>
          <div className="register-cta-actions">
            {isLoggedIn ? (
              <Link className="hero-link" href="/learn">
                Continue learning <ArrowUpRight aria-hidden="true" />
              </Link>
            ) : (
              <>
                <Link className="hero-link" href="/register">
                  Create your free account <ArrowUpRight aria-hidden="true" />
                </Link>
                <Link className="hero-secondary" href="/login">Already have an account</Link>
              </>
            )}
          </div>
        </section>

      </main>

      <footer className="app-footer landing-radar">
        <span className="footer-rule" />
        <span>Read. Keep. Remember.</span>
        <span className="footer-rule" />
      </footer>
    </div>
  )
}

export default LegacyFeed
