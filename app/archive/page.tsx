import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import LegacyFeed from '@/components/legacy-feed'

export default function ArchivePage() {
  return (
    <div className="archive-page">
      <SharedNav />
      <div className="route-intro archive-hero">
        <p className="kicker">Learn beyond the scroll</p>
        <h1>Go deeper.</h1>
        <p>Explore the books, people, testimonies, teachings, and historical records behind every idea you discover on Yadesh.</p>
        <nav className="archive-links" aria-label="Archive sections">{['People','Books','Stories','Teachings','Testimonies','History','Topics'].map((item) => <a href="#archive" key={item}>{item}</a>)}</nav>
      </div>
      <LegacyFeed showHero={false} showNav={false} />
    </div>
  )
}
