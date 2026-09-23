'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Compass,
  Home,
  Layers,
  Library,
  Menu,
  Search,
  UserRound,
  Users,
  X,
  ShieldAlert,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

const primary: [string, string, LucideIcon][] = [
  ['Home', '/learn', Home],
  ['Explore', '/explore', Compass],
  ['Saved', '/saved', Library],
]

const library: [string, string, LucideIcon][] = [
  ['People', '/people', Users],
  ['Books', '/books', BookOpen],
  ['Series', '/series', Layers],
]

export function ProductChrome({
  children,
  isAdmin = false,
}: {
  children: React.ReactNode
  isAdmin?: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null
      if (!target) return
      if (headerRef.current?.contains(target) || menuRef.current?.contains(target)) {
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

  function isActive(href: string) {
    if (href === '/learn') return pathname === '/learn' || pathname.startsWith('/learn/')
    if (href === '/series') return pathname === '/series' || pathname.startsWith('/series/')
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

          {isAdmin && (
            <>
              <span className="nav-divider" />
              <Link
                href="/admin"
                className={isActive('/admin') ? 'active' : ''}
                aria-current={isActive('/admin') ? 'page' : undefined}
                style={{
                  background: isActive('/admin') ? '#fff' : '#f3e8ff',
                  color: '#7c3aed',
                  fontWeight: '900',
                }}
              >
                <ShieldAlert aria-hidden="true" size={16} />
                Admin Portal
              </Link>
            </>
          )}
        </nav>

        <div className="sidebar-note">
          <span>Read. Keep. Remember.</span>
          <small>Five focused minutes can give you one idea to keep.</small>
        </div>
        <footer className="product-legal-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/guidelines">Guidelines</Link>
        </footer>
      </aside>

      {/* Mobile header never unmounts */}
      <header ref={headerRef} className="product-mobile-header">
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
        <nav ref={menuRef} className="product-mobile-menu" aria-label="More navigation">
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
          {isAdmin && (
            <Link
              onClick={() => setMenuOpen(false)}
              href="/admin"
              style={{
                background: '#f3e8ff',
                color: '#7c3aed',
                fontWeight: '900',
              }}
            >
              <ShieldAlert aria-hidden="true" size={16} />
              Admin Portal
            </Link>
          )}
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
