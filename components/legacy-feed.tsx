import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SharedNav } from '@/components/shared-nav'
import { LearningCard } from '@/components/learning-card'
import { learningCards } from '@/lib/learning-data'

export function LegacyFeed({
  showHero = true,
  showNav = true,
  isLoggedIn = false,
}: {
  showHero?: boolean
  showNav?: boolean
  isLoggedIn?: boolean
}) {
  const previewCards = learningCards.slice(0, 3)

  return (
    <div className="phone-shell">
      {showNav && <SharedNav isLoggedIn={isLoggedIn} />}

      <main id="top" className="app-content">

        {showHero && (
          <section className="landing-hero" aria-labelledby="page-title">
            <div className="hero-copy">
              <p className="kicker">A five minute habit for the Christian mind</p>
              <h1 id="page-title">
                <span className="hero-line hero-line-one">Trade scrolling.</span>
                <span className="hero-line hero-line-two hero-emphasis">Feed your</span>
                <span className="hero-line hero-line-three hero-emphasis">faith.</span>
              </h1>
              <p>
                Short, memorable lessons from great Christian books, biographies, and history. Built for busy people who want depth without the noise.
              </p>
              <div className="hero-actions">
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
              <span className="micro-trust">Read. Keep. Remember.</span>
            </div>
          </section>
        )}

        {/* Live Sample Preview: What you actually get */}
        <section className="product-section" aria-labelledby="preview-title" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <div className="section-heading" style={{ marginBottom: '1.25rem' }}>
            <div>
              <p className="kicker">What you will read</p>
              <h2 id="preview-title" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', margin: '0.35rem 0' }}>
                Five minutes. Real depth.
              </h2>
            </div>
          </div>
          <div className="learning-grid">
            {previewCards.map((item) => (
              <LearningCard key={item.id} {...item} />
            ))}
          </div>
        </section>

        <section className="how-section landing-method" aria-labelledby="how-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Why Yadesh</p>
              <h2 id="how-title">Built for real life, not endless feeds.</h2>
            </div>
            <span className="section-index">01 / 03</span>
          </div>
          <p className="method-intro">
            Most of us lose spare moments to mindless scrolling and leave feeling empty. Yadesh turns those moments into quiet growth from trusted Christian sources.
          </p>
          <div className="how-grid">
            <article>
              <span>01</span>
              <h3>Pick one idea</h3>
              <p>Choose a theme or open the daily reading from Christian leaders, thinkers, and classic books.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Read in 3 minutes</h3>
              <p>Understand the core lesson quickly with clear context, without getting lost in endless feeds.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Keep what matters</h3>
              <p>Save insights to your personal library so you can remember them and apply them in daily life.</p>
            </article>
          </div>
        </section>

        <section className="register-cta-section" aria-labelledby="cta-title">
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
