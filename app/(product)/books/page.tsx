import Link from 'next/link'
import { PageHeader } from '@/components/page-header'

const books: [string, string][] = [
  ['Growing Up, Spiritually', 'Kenneth E. Hagin'],
  ['The Authority of the Believer', 'Kenneth E. Hagin'],
  ['Good Morning, Holy Spirit', 'Benny Hinn'],
  ['The Pursuit of God', 'A.W. Tozer'],
  ['The Purpose Driven Life', 'Rick Warren'],
  ['Celebration of Discipline', 'Richard Foster'],
]

export default function BooksPage() {
  return (
    <>
      <PageHeader title="Books" />
      <section className="product-intro">
        <p>Start with a book. Follow the thread.</p>
      </section>
      <div className="book-grid">
        {books.map(([title, author]) => (
          <Link className="book-card" href="/learn" key={title}>
            <div className="book-cover"><span>Y</span></div>
            <span className="eyebrow">BOOK</span>
            <h2>{title}</h2>
            <p>{author}</p>
            <span>Start learning ↗</span>
          </Link>
        ))}
      </div>
    </>
  )
}
