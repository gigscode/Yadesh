import Link from 'next/link'
import { Search } from 'lucide-react'

export function PageHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  const label = eyebrow ?? (title === 'Home' ? "TODAY'S LEARNING" : 'YADESH')
  return (
    <div className="product-topline">
      <div>
        <span className="eyebrow">{label}</span>
        <h1>{title}</h1>
      </div>
      <Link className="search-trigger" href="/search">
        <Search aria-hidden="true" />
        <span>Search</span>
      </Link>
    </div>
  )
}
