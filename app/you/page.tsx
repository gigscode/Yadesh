import Link from 'next/link'
import { ProductShell } from '@/components/product-shell'

export default function YouPage() {
  return (
    <ProductShell title="Your learning space">
      <section className="you-page-heading" aria-labelledby="you-heading"><p className="eyebrow">YOUR SPACE</p><h1 id="you-heading">Your learning space</h1></section>
      <section className="you-next-step" aria-labelledby="next-step-title">
        <div>
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h2 id="next-step-title">Start with five minutes.</h2>
          <p>One short reading is enough to begin a quieter learning habit today.</p>
        </div>
        <Link className="you-primary-action" href="/learn">Start today&apos;s reading <span aria-hidden="true">→</span></Link>
      </section>

      <section className="you-summary" aria-labelledby="summary-title">
        <div className="you-section-heading"><div><p className="eyebrow">YOUR PROGRESS</p><h2 id="summary-title">A little learning adds up.</h2></div><span className="you-summary-badge">NEW</span></div>
        <div className="you-progress-grid">
          <Link href="/saved"><strong>0</strong><span>Saved readings</span><small>Save something to return to →</small></Link>
          <Link href="/learn"><strong>0</strong><span>Minutes learned</span><small>Start your first session →</small></Link>
          <Link href="/explore"><strong>0</strong><span>Sources explored</span><small>Find a source to follow →</small></Link>
        </div>
      </section>

      <section className="you-profile" id="settings" aria-labelledby="profile-title">
        <div className="profile-avatar" aria-hidden="true">Y</div>
        <div><p className="eyebrow">YOUR PROFILE</p><h2 id="profile-title">Make Yadesh yours.</h2><p>Your saved readings, topics, and account preferences will live here.</p></div>
        <Link className="profile-edit" href="/you#settings">Edit profile</Link>
      </section>
    </ProductShell>
  )
}
