import Link from 'next/link'
import { ProductShell } from '@/components/product-shell'

const stats = [
  ['0', 'Saved ideas'],
  ['0', 'Learning minutes'],
  ['0', 'Sources explored'],
]

export default function YouPage() {
  return (
    <ProductShell title="You">
      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-avatar" aria-hidden="true">Y</div>
        <div>
          <p className="eyebrow">YOUR LEARNING SPACE</p>
          <h2 id="profile-title">Your Yadesh profile</h2>
          <p>Build a quieter learning habit by saving the ideas, sources, and lessons that stay with you.</p>
        </div>
        <Link className="profile-edit" href="/you#settings">Edit profile</Link>
      </section>

      <section className="profile-stats" aria-label="Your learning summary">
        {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      <section className="profile-grid">
        <article className="profile-panel">
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h2>Start with five minutes.</h2>
          <p>Choose one idea from Explore, read the short lesson, and save what deserves another look.</p>
          <Link className="text-link" href="/explore">Explore learning <span aria-hidden="true">↗</span></Link>
        </article>
        <article className="profile-panel profile-panel-accent" id="settings">
          <p className="eyebrow">PROFILE SETTINGS</p>
          <h2>Make Yadesh yours.</h2>
          <p>Your account preferences, learning topics, and saved sources will live here.</p>
          <button type="button" disabled>Settings coming with account connection</button>
        </article>
      </section>
    </ProductShell>
  )
}
