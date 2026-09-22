import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Upgrade to Premium | Yadesh',
  description: 'Unlock the full Yadesh archive, unlimited bookmarks, guided series, and offline reading.',
}

const FREE_FEATURES = [
  { label: '1 new reading per day', included: true },
  { label: 'Browse all 4 content pillars', included: true },
  { label: 'Save up to 5 bookmarks', included: true },
  { label: 'Full archive access', included: false },
  { label: 'Unlimited bookmarks and collections', included: false },
  { label: '21-day guided series', included: false },
  { label: 'Offline reading', included: false },
  { label: 'Audio versions', included: false },
]

const PREMIUM_FEATURES = [
  { label: '1 new reading per day', included: true },
  { label: 'Browse all 4 content pillars', included: true },
  { label: 'Unlimited bookmarks and collections', included: true },
  { label: 'Full archive, all teachers, all history', included: true },
  { label: '21-day guided series (Breakthrough, Prayer, Purpose)', included: true },
  { label: 'Offline reading', included: true },
  { label: 'Audio versions', included: true },
  { label: 'Early access to new features', included: true },
]

export default async function UpgradePage() {
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
      <PageHeader title="Go Premium" eyebrow="UPGRADE" />

      {isPremium ? (
        <section className="upgrade-already-premium">
          <div className="upgrade-premium-badge" aria-hidden="true">✦</div>
          <p className="eyebrow">ACTIVE PLAN</p>
          <h2>You are on Yadesh Premium.</h2>
          <p>You have full access to the archive, unlimited bookmarks, guided series, and everything else.</p>
          <Link href="/learn" className="upgrade-cta-btn">
            Continue learning →
          </Link>
        </section>
      ) : (
        <>
          {/* Hero */}
          <section className="upgrade-hero">
            <p className="eyebrow">THE FULL LIBRARY</p>
            <h2>Five minutes a day.<br />The whole archive behind it.</h2>
            <p>
              Free gets you started. Premium removes every limit: the archive,
              the guided series, offline access, and everything still being built.
            </p>
          </section>

          {/* Pricing cards */}
          <div className="upgrade-plans">

            {/* Free */}
            <div className="upgrade-plan upgrade-plan-free">
              <div className="upgrade-plan-head">
                <p className="eyebrow">CURRENT PLAN</p>
                <p className="upgrade-plan-name">Free</p>
                <p className="upgrade-plan-price">
                  <strong>$0</strong>
                  <span>forever</span>
                </p>
              </div>
              <ul className="upgrade-feature-list" aria-label="Free plan features">
                {FREE_FEATURES.map((f) => (
                  <li key={f.label} className={f.included ? '' : 'upgrade-feature-missing'}>
                    {f.included
                      ? <Check size={14} aria-label="Included" />
                      : <X size={14} aria-label="Not included" />}
                    {f.label}
                  </li>
                ))}
              </ul>
              <span className="upgrade-plan-current-label">Your current plan</span>
            </div>

            {/* Premium */}
            <div className="upgrade-plan upgrade-plan-premium">
              <div className="upgrade-plan-head">
                <p className="eyebrow" style={{ color: '#e4fb4f' }}>BEST VALUE</p>
                <p className="upgrade-plan-name">Premium</p>
                <p className="upgrade-plan-price">
                  <strong>$4.99</strong>
                  <span>/ month</span>
                </p>
                <p className="upgrade-plan-annual">or $39.99 / year, save 33%</p>
              </div>
              <ul className="upgrade-feature-list" aria-label="Premium plan features">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f.label}>
                    <Check size={14} aria-label="Included" />
                    {f.label}
                  </li>
                ))}
              </ul>

              {/* Checkout stub — replace href with Lemon Squeezy checkout URL when live */}
              <a
                href="#coming-soon"
                className="upgrade-cta-btn upgrade-cta-btn-primary"
                aria-describedby="upgrade-payment-note"
              >
                Get Premium
              </a>
              <p id="upgrade-payment-note" className="upgrade-payment-note">
                Secure payment via Lemon Squeezy. Cancel anytime.
              </p>
            </div>

          </div>

          {/* Trust strip */}
          <section className="upgrade-trust" aria-label="Why upgrade">
            <div>
              <strong>No risk</strong>
              <span>Cancel any time, no questions asked.</span>
            </div>
            <div>
              <strong>One price</strong>
              <span>Everything unlocked, no tiers within premium.</span>
            </div>
            <div>
              <strong>Built to last</strong>
              <span>Yadesh is editorial, not algorithmic. Your library stays yours.</span>
            </div>
          </section>

          {/* FAQ */}
          <section className="upgrade-faq">
            <h3>Common questions</h3>
            <div className="upgrade-faq-list">
              <details>
                <summary>What is in the guided series?</summary>
                <p>Themed 21-day journeys built around a single focus: 21 Days of Breakthrough, 21 Days of Prayer, Kingdom Purpose. Each day is one focused reading, sequenced so the ideas build on each other. The first series launches with premium at release.</p>
              </details>
              <details>
                <summary>Can I try premium before paying?</summary>
                <p>The free plan lets you read one new piece daily and save up to 5 readings, so you can experience the quality of the content before committing. A free trial period will be added when the payment system is live.</p>
              </details>
              <details>
                <summary>What happens to my bookmarks if I cancel?</summary>
                <p>Your saved readings stay in your account. You keep access to your first 5. If you saved more while on premium, they remain visible but you cannot add new ones until you resubscribe.</p>
              </details>
              <details>
                <summary>Is payment secure?</summary>
                <p>Payments are processed by Lemon Squeezy, a fully PCI-compliant merchant of record. Yadesh never sees or stores your card details.</p>
              </details>
            </div>
          </section>
        </>
      )}
    </>
  )
}
