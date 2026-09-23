import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { UpgradePricingSection } from '@/components/upgrade-pricing-section'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Upgrade to Premium | Yadesh',
  description: 'Add guided 21-day series and unlimited bookmarks to your Yadesh account.',
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
          <p>You have unlimited bookmarks and access to all available guided series.</p>
          <Link href="/learn" className="upgrade-cta-btn">
            Continue learning &rarr;
          </Link>
        </section>
      ) : (
        <>
          <section className="upgrade-hero">
            <span className="upgrade-hero-pill">✦ YADESH PREMIUM</span>
            <h2>Five minutes a day.<br />A path when you want to keep going.</h2>
            <p>
              The free plan includes the full reading library. Premium adds guided 21-day series and unlimited bookmarks when you want a more focused way to continue.
            </p>
          </section>

          <UpgradePricingSection userEmail={user?.email} />
        </>
      )}
    </div>
  )
}
