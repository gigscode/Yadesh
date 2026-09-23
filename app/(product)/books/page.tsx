import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { getAllBooks } from '@/lib/content-loader'
import { Clock, BookOpen, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Christian Book Summaries | Yadesh',
  description: 'Four-minute summaries of Christian books and spiritual classics.',
}

const categoryAccent: Record<string, string> = {
  FAITH:    '#4f5600',
  MIRACLE:  '#92400e',
  TEACHING: '#1a6e42',
  LIFE:     '#7c3aaa',
  BOOK:     '#8a5a00',
}

const categoryClass: Record<string, string> = {
  FAITH:    'card-type-faith',
  MIRACLE:  'card-type-miracle',
  TEACHING: 'card-type-teaching',
  LIFE:     'card-type-life',
  BOOK:     'card-type-book',
}

export default async function BooksPage() {
  const books = await getAllBooks()

  return (
    <>
      <PageHeader title="Books" />

      <section className="product-intro" style={{ marginBottom: '2rem' }}>
        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--muted-foreground)' }}>
          Four-minute summaries of Christian classics. Start with the main idea, see the context, and decide where you want to read further.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
          paddingBottom: '5rem',
        }}
      >
        {books.map((book, index) => {
          const typeClass = categoryClass[book.category] ?? 'card-type-book'
          const accentColor = categoryAccent[book.category] ?? '#8a5a00'
          const delay = Math.min(index + 1, 6)

          return (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className={`learning-card ${typeClass} anim-fade-up delay-${delay}`}
              style={{ textDecoration: 'none', color: 'var(--foreground)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <div className="card-meta">
                  <span className="card-badge">
                    <BookOpen size={10} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                    {book.category}
                  </span>
                  <span className="card-meta-time" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={10} /> {book.readTime}
                  </span>
                </div>

                <h3 style={{ color: accentColor }}>{book.title}</h3>

                <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--muted-foreground)', fontWeight: 800 }}>
                  {book.author}
                </p>

                <p style={{ margin: 0, fontSize: '0.84rem', lineHeight: 1.5, color: '#454651' }}>
                  {book.bigIdea}
                </p>
              </div>

              <div className="card-actions" style={{ marginTop: '1.5rem' }}>
                <span style={{ color: accentColor, fontWeight: 900, fontSize: '0.82rem' }}>Read the summary</span>
                <ArrowUpRight size={16} style={{ color: accentColor }} />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
