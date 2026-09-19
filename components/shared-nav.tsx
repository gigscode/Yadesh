'use client'

import Link from 'next/link'
import { Flame, Menu, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

export function SharedNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="app-header route-header">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className="nav-brand brand-lockup" href="/" aria-label="Yadesh home"><span className="brand-mark" aria-hidden="true"><Flame /></span><span className="brand-wordmark">YADESH</span></Link>
          <Link href="/archive" className="nav-topics">Topics <span aria-hidden="true">⌄</span></Link>
          <Link href="/" className="nav-cta">Enter the feed</Link>
          <Link href="/about" className="nav-login">Log in</Link>
          <button className="nav-menu" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Menu aria-hidden="true" /></button>
        </nav>
      </header>
      {menuOpen && <div className="menu-panel" role="dialog" aria-label="Yadesh navigation">
        <div className="menu-panel-head"><span>Move with intention.</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
        <nav className="menu-links" aria-label="Menu links">
          <Link href="/" onClick={() => setMenuOpen(false)}><span>01</span>Enter the feed <ArrowUpRight aria-hidden="true" /></Link>
          <Link href="/archive" onClick={() => setMenuOpen(false)}><span>02</span>Browse records <ArrowUpRight aria-hidden="true" /></Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}><span>03</span>Why Yadesh <ArrowUpRight aria-hidden="true" /></Link>
        </nav>
        <p className="menu-note">A quieter place for source-anchored testimony and sober lessons.</p>
      </div>}
    </>
  )
}
