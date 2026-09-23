'use client'

import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type NavLink = {
  label: string
  href: string
}

function getMenuLinks(isLoggedIn: boolean): NavLink[] {
  const links: NavLink[] = [
    { label: 'Learn', href: '/learn' },
    { label: 'Explore', href: '/explore' },
    { label: 'About Yadesh', href: '/about' },
  ]
  if (!isLoggedIn) {
    links.push({ label: 'Log in', href: '/login' })
  }
  return links
}

export function SharedNav({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuLinks = getMenuLinks(isLoggedIn)
  const headerRef = useRef<HTMLElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null
      if (!target) return
      if (headerRef.current?.contains(target) || menuPanelRef.current?.contains(target)) {
        return
      }
      setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <>
      <header ref={headerRef} className="app-header">
        <nav className="desktop-nav" aria-label="Primary navigation">

          {/* Left group: brand + topics */}
          <span className="nav-group nav-group-left">
            <Link className="nav-brand brand-lockup" href="/" aria-label="Yadesh home">
              <span className="brand-mark" aria-hidden="true">
                <img src="/yadesh-mark.png" alt="" width="32" height="32" />
              </span>
              <span className="brand-wordmark">Yadesh</span>
            </Link>
            <Link href="/explore" className="nav-topics">
              Topics <ChevronDown aria-hidden="true" />
            </Link>
          </span>

          {/* Right group: CTA + conditional login + menu toggle */}
          <span className="nav-group nav-group-right">
            <Link href="/learn" className="nav-cta">
              {isLoggedIn ? 'Continue learning' : 'Start learning'}
            </Link>
            {!isLoggedIn && (
              <Link href="/login" className="nav-login">
                Log in
              </Link>
            )}
            <button
              className="nav-menu"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="nav-menu-panel"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen
                ? <X aria-hidden="true" />
                : <Menu aria-hidden="true" />}
            </button>
          </span>

        </nav>
      </header>

      {/* Slide-down menu panel */}
      {menuOpen && (
        <div
          ref={menuPanelRef}
          id="nav-menu-panel"
          className="menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Yadesh navigation menu"
        >
          <div className="menu-panel-head">
            <span>Explore Yadesh.</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="menu-links" aria-label="Menu links">
            {menuLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {link.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <p className="menu-note">
            Short readings from Christian books, people, teachings, and history.
          </p>
        </div>
      )}
    </>
  )
}
