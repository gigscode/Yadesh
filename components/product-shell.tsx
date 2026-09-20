'use client'

import Link from 'next/link'
import { BookOpen, Compass, Home, Library, Menu, Search, UserRound, Users, X, Bookmark, Check } from 'lucide-react'
import { useState } from 'react'
import { useSave } from '@/hooks/use-save'

const primary = [
  ['Home', '/learn', Home], ['Explore', '/explore', Compass], ['Saved', '/saved', Library],
]
const library = [['People', '/people', Users], ['Books', '/books', BookOpen]]

export function ProductShell({ children, title = 'Home' }: { children: React.ReactNode; title?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="product-shell">
    <aside className="product-sidebar" aria-label="Primary navigation">
      <Link href="/" className="product-logo"><span className="product-logo-mark"><img src="/yadesh-mark.png" alt="" /></span><span>Yadesh</span></Link>
      <nav className="product-nav">{primary.map(([label, href, Icon]) => <Link className={title === label ? 'active' : ''} href={href} key={label as string}><Icon aria-hidden="true" />{label}</Link>)}<span className="nav-divider" />{library.map(([label, href, Icon]) => <Link className={title === label ? 'active' : ''} href={href} key={label as string}><Icon aria-hidden="true" />{label}</Link>)}<span className="nav-divider" /><Link href="/you"><UserRound aria-hidden="true" />You</Link></nav>
      <div className="sidebar-note"><span>Read. Keep. Remember.</span><small>Five focused minutes can change what you know.</small></div><footer className="product-legal-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/guidelines">Guidelines</Link></footer>
    </aside>
    <header className="product-mobile-header"><Link href="/" className="product-logo"><span className="product-logo-mark"><img src="/yadesh-mark.png" alt="" /></span><span>Yadesh</span></Link><button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button></header>
    {menuOpen && <nav className="product-mobile-menu" aria-label="More navigation"><Link onClick={() => setMenuOpen(false)} href="/search"><Search aria-hidden="true" />Search</Link>{library.map(([label, href, Icon]) => <Link onClick={() => setMenuOpen(false)} href={href as string} key={label as string}><Icon aria-hidden="true" />{label}</Link>)}<Link onClick={() => setMenuOpen(false)} href="/about"><BookOpen aria-hidden="true" />About Yadesh</Link><span className="nav-divider" /><Link onClick={() => setMenuOpen(false)} href="/privacy">Privacy</Link><Link onClick={() => setMenuOpen(false)} href="/terms">Terms</Link><Link onClick={() => setMenuOpen(false)} href="/guidelines">Guidelines</Link></nav>}
    <main className="product-main">{title !== 'Your learning space' && <div className="product-topline"><div><span className="eyebrow">{title === 'Home' ? "TODAY'S LEARNING" : 'YADESH'}</span><h1>{title}</h1></div>{title !== 'You' && <Link className="search-trigger" href="/search"><Search aria-hidden="true" /><span>Search</span></Link>}</div>}{children}</main>
    <nav className="product-bottom-nav" aria-label="Mobile navigation">{primary.map(([label, href, Icon]) => <Link aria-label={label as string} title={label as string} className={title === label ? 'active' : ''} href={href} key={label as string}><Icon aria-hidden="true" /></Link>)}<Link aria-label="You" title="You" className={title === 'You' ? 'active' : ''} href="/you"><UserRound aria-hidden="true" /></Link></nav>
  </div>
}

export function TopicChips() { return <div className="product-topic-chips">{['Faith','Prayer','Healing','Leadership','Revival','Holy Spirit','Calling','Discipline','Christian Living','Ministry'].map(topic => <Link href={`/search?q=${encodeURIComponent(topic)}`} key={topic}>{topic}</Link>)}</div> }

export function LearningCard({ id = '', type = 'IDEA', title, source, body, time = '2 min read', accent = false }: { id?: string; type?: string; title: string; source: string; body: string; time?: string; accent?: boolean }) {
  const { saved, loading, toggle } = useSave(id)
  return (
    <article className={`learning-card ${accent ? 'accent' : ''}`}>
      <div className="card-meta"><span>{type}</span><span>{time}</span></div>
      <h3>{title}</h3>
      <p className="card-source">{source}</p>
      <p>{body}</p>
      <div className="card-actions">
        <Link href="/learn">Read for {time.replace(' read', '')}</Link>
        <button
          aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          aria-pressed={saved}
          onClick={toggle}
          disabled={loading}
          className={saved ? 'save-btn is-saved' : 'save-btn'}
        >
          {saved ? <Check aria-hidden="true" size={15} /> : <Bookmark aria-hidden="true" size={15} />}
        </button>
      </div>
    </article>
  )
}

