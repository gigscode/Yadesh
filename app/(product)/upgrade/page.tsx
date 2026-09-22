import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { UpgradePricingSection } from '@/components/upgrade-pricing-section'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Upgrade to Premium | Yadesh',
  description: 'Unlock the full Yadesh archive, unlimited bookmarks, guided series, and offline reading with Pebble payment gateway.',
}

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
    <div className="upgrade-page-container">
      <PageHeader title="Go Premium" eyebrow="UPGRADE" />

      {isPremium ? (
        <section className="upgrade-already-premium">
          <div className="upgrade-premium-badge" aria-hidden="true">✦</div>
          <p className="eyebrow">ACTIVE PLAN</p>
          <h2>You are on Yadesh Premium.</h2>
          <p>You have full access to the archive, unlimited bookmarks, guided series, and everything else.</p>
          <Link href="/learn" className="upgrade-cta-btn">
            Continue learning &rarr;
          </Link>
        </section>
      ) : (
        <>
          <section className="upgrade-hero">
            <span className="upgrade-hero-pill">✦ YADESH PATRONAGE &amp; MEMBERSHIP</span>
            <h2>Five minutes a day.<br />The whole archive behind it.</h2>
            <p>
              Free gets you started with a consistent daily rhythm. Premium removes every limit: the complete archive, the 21-day guided series, offline access, and audio narrations.
            </p>
          </section>

          <UpgradePricingSection userEmail={user?.email} />
        </>
      )}
    </div>
  )
}
