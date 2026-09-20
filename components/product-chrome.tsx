'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Compass,
  Home,
  Library,
  Menu,
  Search,
  UserRound,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'

const primary: [string, string, LucideIcon][] = [
  ['Home', '/learn', Home],
  ['Explore', '/explore', Compass],
  ['Saved', '/saved', Library],
]

const library: [string, string, LucideIcon][] = [
  ['People', '/people', Users],
  ['Books', '/books', BookOpen],
]

export function ProductChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/learn') return pathname === '/learn' || pathname.startsWith('/learn/')
    return pathname === href
  }

  return (
    <div className="product-shell">
      {/* Desktop sidebar never unmounts */}
      <aside className="product-sidebar" aria-label="Primary navigation">
        <Link href="/" className="product-logo">
          <span className="product-logo-mark">
            <img src="/yadesh-mark.png" alt="" width="34" height="34" loading="eager" />
          </span>
          <span>Yadesh</span>
        </Link>

        <nav className="product-nav">
          {primary.map(([label, href, Icon]) => (
            <Link
              key={label}
              href={href}
              className={isActive(href) ? 'active' : ''}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
          <span className="nav-divider" />
          {library.map(([label, href, Icon]) => (
            <Link
              key={label}
              href={href}
              className={isActive(href) ? 'active' : ''}
              aria-current={isActive(href) ? 'page' : undefined}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
          <span className="nav-divider" />
          <Link
            href="/you"
            className={isActive('/you') ? 'active' : ''}
            aria-current={isActive('/you') ? 'page' : undefined}
          >
            <UserRound aria-hidden="true" />
            You
          </Link>
        </nav>

        <div className="sidebar-note">
          <span>Read. Keep. Remember.</span>
          <small>Five focused minutes can change what you know.</small>
        </div>
        <footer className="product-legal-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/guidelines">Guidelines</Link>
        </footer>
      </aside>

      {/* Mobile header never unmounts */}
      <header className="product-mobile-header">
        <Link href="/" className="product-logo">
          <span className="product-logo-mark">
            <img src="/yadesh-mark.png" alt="" width="34" height="34" loading="eager" />
          </span>
          <span>Yadesh</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      {/* Mobile overflow menu */}
      {menuOpen && (
        <nav className="product-mobile-menu" aria-label="More navigation">
          <Link onClick={() => setMenuOpen(false)} href="/search">
            <Search aria-hidden="true" />Search
          </Link>
          {library.map(([label, href, Icon]) => (
            <Link key={label} onClick={() => setMenuOpen(false)} href={href}>
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
          <Link onClick={() => setMenuOpen(false)} href="/about">
            <BookOpen aria-hidden="true" />About Yadesh
          </Link>
          <span className="nav-divider" />
          <Link onClick={() => setMenuOpen(false)} href="/privacy">Privacy</Link>
          <Link onClick={() => setMenuOpen(false)} href="/terms">Terms</Link>
          <Link onClick={() => setMenuOpen(false)} href="/guidelines">Guidelines</Link>
        </nav>
      )}

      {/* Page content slot only this swaps on navigation */}
      <main className="product-main">
        {children}
      </main>

      {/* Mobile bottom nav never unmounts */}
      <nav className="product-bottom-nav" aria-label="Mobile navigation">
        {primary.map(([label, href, Icon]) => (
          <Link
            key={label}
            href={href}
            aria-label={label}
            aria-current={isActive(href) ? 'page' : undefined}
            className={isActive(href) ? 'active' : ''}
          >
            <Icon aria-hidden="true" />
          </Link>
        ))}
        <Link
          href="/you"
          aria-label="You"
          aria-current={isActive('/you') ? 'page' : undefined}
          className={isActive('/you') ? 'active' : ''}
        >
          <UserRound aria-hidden="true" />
        </Link>
      </nav>
    </div>
  )
}
