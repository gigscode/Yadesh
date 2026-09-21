import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { getAllBooks } from '@/lib/content-loader'
import { Clock, BookOpen, ArrowUpRight } from 'lucide-react'

export const metadata = {
  title: 'Christian Book Summaries · Yadesh',
  description: 'Four-minute executive summaries of timeless Christian books, theology, and spiritual classics.',
}

export default async function BooksPage() {
  const books = await getAllBooks()

  const categoryColors: Record<string, { bg: string; text: string }> = {
    FAITH: { bg: '#edfba0', text: '#5a6000' },
    MIRACLE: { bg: '#fef3c7', text: '#92400e' },
    TEACHING: { bg: '#d8f5e4', text: '#1a6e42' },
    LIFE: { bg: '#ede5f8', text: '#7c3aaa' },
    BOOK: { bg: '#fdf0d8', text: '#8a5a00' },
  }

  return (
    <>
      <PageHeader title="Books" />

      <section className="product-intro" style={{ marginBottom: '2rem' }}>
        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--muted-foreground)' }}>
          Four-minute executive summaries of foundational Christian classics. Start with the core insights, understand the context, and apply the principles today.
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
        {books.map((book) => {
          const colors = categoryColors[book.category] || categoryColors.BOOK

          return (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                borderRadius: '1.25rem',
                background: '#fff',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--foreground)',
                boxShadow: '0 0.35rem 1rem rgba(23, 24, 29, 0.04)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
              className="learning-card"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '999px',
                      background: colors.bg,
                      color: colors.text,
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <BookOpen size={11} /> {book.category}
                  </span>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>
                    <Clock size={11} /> {book.readTime}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.35rem', lineHeight: 1.15, margin: '0 0 0.35rem', letterSpacing: '-0.03em' }}>
                  {book.title}
                </h2>

                <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: '#7168ed', fontWeight: 800 }}>
                  {book.author}
                </p>

                <p style={{ margin: 0, fontSize: '0.84rem', lineHeight: 1.5, color: 'var(--muted-foreground)' }}>
                  {book.bigIdea}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(23, 24, 29, 0.06)',
                  fontSize: '0.82rem',
                  fontWeight: 900,
                  color: '#7168ed',
                }}
              >
                <span>Read 4-min summary</span>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
