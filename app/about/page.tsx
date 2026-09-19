import Link from 'next/link'

const principles = [
  ['01', 'Read slowly', 'Attention is not a metric here. Make room for the record to speak.'],
  ['02', 'Verify first', 'Every account points toward a primary text, scan, or public historical record.'],
  ['03', 'Carry less', 'Keep what is useful. Leave the performance, outrage, and noise behind.'],
]

export default function AboutPage() {
  return (
    <main className="info-page">
      <header className="app-header route-header">
        <Link className="brand-lockup" href="/" aria-label="Yadesh home"><span className="brand-mark" aria-hidden="true">◉</span><span className="brand-wordmark">YADESH</span><span className="brand-subtitle">Live record</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation"><Link href="/archive" className="nav-topics">Topics <span aria-hidden="true">⌄</span></Link><Link href="/archive" className="nav-cta">Enter the feed</Link><Link href="/about" className="nav-login">About</Link><button className="nav-menu" type="button" aria-label="Open menu"><span aria-hidden="true">☰</span></button></nav>
      </header>
      <header className="info-header"><Link href="/" className="route-back">YADESH</Link><Link href="/archive" className="info-action">Open the archive <span aria-hidden="true">↗</span></Link></header>
      <section className="info-hero"><p className="kicker">A living archive for serious seekers</p><h1>Keep the signal.<br /><em>Leave the noise.</em></h1><p>Yadesh is a source-anchored place for experiential fire: real testimony, hard-won lessons, and quiet time with the original record.</p></section>
      <section className="info-grid" aria-label="Yadesh principles">{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
      <footer className="info-footer"><Link href="/">Back to Yadesh</Link><span>Read. Verify. Remember.</span></footer>
    </main>
  )
}
