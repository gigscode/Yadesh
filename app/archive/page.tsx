import Link from 'next/link'
import LegacyFeed from '@/components/legacy-feed'

export default function ArchivePage() {
  return (
    <div className="archive-page">
      <header className="app-header route-header">
        <Link className="brand-lockup" href="/" aria-label="Yadesh home"><span className="brand-mark" aria-hidden="true">◉</span><span className="brand-wordmark">YADESH</span><span className="brand-subtitle">Live record</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation"><Link href="/archive" className="nav-topics">Topics <span aria-hidden="true">⌄</span></Link><Link href="/" className="nav-cta">Enter the feed</Link><Link href="/about" className="nav-login">About</Link><button className="nav-menu" type="button" aria-label="Open menu"><span aria-hidden="true">☰</span></button></nav>
      </header>
      <div className="route-intro archive-hero">
        <Link href="/" className="route-back">YADESH</Link>
        <p className="kicker">The archive</p>
        <h1>Records worth returning to.</h1>
        <p>Browse testimony and sober lessons with the source visible before the claim travels any further.</p>
        <Link href="#archive" className="hero-link">Open the seeker feed <span aria-hidden="true">↗</span></Link>
      </div>
      <LegacyFeed showHero={false} />
    </div>
  )
}
