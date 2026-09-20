'use client'

import Link from 'next/link'
import { Menu, ArrowUpRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function SharedNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="app-header">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <span className="nav-group nav-group-left"><Link className="nav-brand brand-lockup" href="/" aria-label="Yadesh home"><span className="brand-mark" aria-hidden="true"><img src="/yadesh-mark.png" alt="" /></span><span className="brand-wordmark">Yadesh</span></Link><Link href="/explore" className="nav-topics">Topics <ChevronDown aria-hidden="true" /></Link></span>
          <span className="nav-group nav-group-right"><Link href="/learn" className="nav-cta">Start learning</Link><Link href="/login" className="nav-login">Log in</Link><button className="nav-menu" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Menu aria-hidden="true" /></button></span>
        </nav>
      </header>
      {menuOpen && <div className="menu-panel" role="dialog" aria-label="Yadesh navigation">
        <div className="menu-panel-head"><span>Move with intention.</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
        <nav className="menu-links" aria-label="Menu links">
          <Link href="/learn" onClick={() => setMenuOpen(false)}><span>01</span>Learn <ArrowUpRight aria-hidden="true" /></Link>
          <Link href="/explore" onClick={() => setMenuOpen(false)}><span>02</span>Explore <ArrowUpRight aria-hidden="true" /></Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}><span>03</span>About Yadesh <ArrowUpRight aria-hidden="true" /></Link>
        </nav>
        <p className="menu-note">Christian micro-learning from books, people, teachings, testimonies, and history.</p>
      </div>}
    </>
  )
}
