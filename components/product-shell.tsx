'use client'

import Link from 'next/link'
import { BookOpen, Compass, Home, Library, Menu, Search, Settings, UserRound, Users, X } from 'lucide-react'
import { useState } from 'react'

const primary = [
  ['Home', '/learn', Home], ['Explore', '/explore', Compass], ['Saved', '/saved', Library],
]
const library = [['People', '/people', Users], ['Books', '/books', BookOpen]]

export function ProductShell({ children, title = 'Home' }: { children: React.ReactNode; title?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="product-shell">
    <aside className="product-sidebar" aria-label="Primary navigation">
      <Link href="/" className="product-logo"><span className="product-logo-mark"><img src="/yadesh2.jpg" alt="" /></span><span>Yadesh</span></Link>
      <nav className="product-nav">{primary.map(([label, href, Icon]) => <Link className={title === label ? 'active' : ''} href={href} key={label as string}><Icon aria-hidden="true" />{label}</Link>)}<span className="nav-divider" />{library.map(([label, href, Icon]) => <Link className={title === label ? 'active' : ''} href={href} key={label as string}><Icon aria-hidden="true" />{label}</Link>)}<span className="nav-divider" /><Link href="/you"><UserRound aria-hidden="true" />You</Link><Link href="/you#settings"><Settings aria-hidden="true" />Settings</Link></nav>
      <div className="sidebar-note"><span>Read. Verify. Remember.</span><small>Five focused minutes can change what you know.</small></div>
    </aside>
    <header className="product-mobile-header"><Link href="/" className="product-logo"><span className="product-logo-mark"><img src="/yadesh2.jpg" alt="" /></span><span>Yadesh</span></Link><button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button></header>
    {menuOpen && <nav className="product-mobile-menu">{[...primary, ...library, ['You', '/you', UserRound]].map(([label, href, Icon]) => <Link onClick={() => setMenuOpen(false)} href={href as string} key={label as string}><Icon aria-hidden="true" />{label}</Link>)}</nav>}
    <main className="product-main"><div className="product-topline"><div><span className="eyebrow">{title === 'Home' ? 'TODAY&apos;S LEARNING' : 'YADESH'}</span><h1>{title}</h1></div><Link className="search-trigger" href="/search"><Search aria-hidden="true" /><span>Search</span></Link></div>{children}</main>
    <nav className="product-bottom-nav" aria-label="Mobile navigation">{primary.map(([label, href, Icon]) => <Link className={title === label ? 'active' : ''} href={href} key={label as string}><Icon aria-hidden="true" /><span>{label}</span></Link>)}<Link href="/you"><UserRound aria-hidden="true" /><span>You</span></Link></nav>
  </div>
}

export function TopicChips() { return <div className="product-topic-chips">{['Faith','Prayer','Healing','Leadership','Revival','Holy Spirit','Calling','Discipline','Christian Living','Ministry'].map(topic => <Link href={`/search?q=${encodeURIComponent(topic)}`} key={topic}>{topic}</Link>)}</div> }

export function LearningCard({ type = 'IDEA', title, source, body, time = '2 min read', accent = false }: { type?: string; title: string; source: string; body: string; time?: string; accent?: boolean }) { return <article className={`learning-card ${accent ? 'accent' : ''}`}><div className="card-meta"><span>{type}</span><span>{time}</span></div><h3>{title}</h3><p className="card-source">{source}</p><p>{body}</p><div className="card-actions"><Link href="/learn">Read for {time.replace(' read','')}</Link><button aria-label={`Save ${title}`}>Save</button></div></article> }

