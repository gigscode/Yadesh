import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import LegacyFeed from '@/components/legacy-feed'

export default function ArchivePage() {
  return (
    <div className="archive-page">
      <SharedNav />
      <div className="route-intro archive-hero">
        <Link href="/" className="route-back">Yadesh</Link>
        <p className="kicker">The archive</p>
        <h1>Records worth returning to.</h1>
        <p>Browse testimony and sober lessons with the source visible before the claim travels any further.</p>
        <Link href="#archive" className="hero-link">Open the seeker feed <span aria-hidden="true">↗</span></Link>
      </div>
      <LegacyFeed showHero={false} showNav={false} />
    </div>
  )
}
