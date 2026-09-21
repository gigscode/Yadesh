import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2, Clock } from 'lucide-react'
import { bookSummaries } from '@/lib/book-summaries'
import { getBookSummary } from '@/lib/content-loader'

export function generateStaticParams() {
  return bookSummaries.map((b) => ({ slug: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await getBookSummary(slug)
  if (!book) return {}
  return {
    title: `${book.title} (Summary) · Yadesh`,
    description: book.bigIdea,
  }
}

export default async function BookSummaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await getBookSummary(slug)

  if (!book) {
    notFound()
  }

  const categoryColors: Record<string, { bg: string; text: string }> = {
    FAITH: { bg: '#edfba0', text: '#5a6000' },
    MIRACLE: { bg: '#fef3c7', text: '#92400e' },
    TEACHING: { bg: '#d8f5e4', text: '#1a6e42' },
    LIFE: { bg: '#ede5f8', text: '#7c3aaa' },
    BOOK: { bg: '#fdf0d8', text: '#8a5a00' },
  }

  const colors = categoryColors[book.category] || categoryColors.BOOK

  return (
    <div style={{ maxWidth: '46rem', margin: '0 auto', paddingBottom: '6rem' }}>
      {/* Back link */}
      <Link
        href="/books"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--muted-foreground)',
          fontSize: '0.85rem',
          fontWeight: 700,
          textDecoration: 'none',
          marginBottom: '1.5rem',
        }}
      >
        <ArrowLeft size={16} /> Back to all books
      </Link>

      {/* Hero Header */}
      <header
        style={{
          padding: '2rem clamp(1.5rem, 5vw, 2.5rem)',
          borderRadius: '1.75rem',
          background: '#fff',
          border: '1px solid var(--border)',
          boxShadow: '0 0.5rem 2rem rgba(23, 24, 29, 0.05)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              background: colors.bg,
              color: colors.text,
              fontSize: '0.72rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <BookOpen size={12} /> {book.category}
          </span>

          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>
            <Clock size={13} /> {book.readTime}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 0.5rem' }}>
          {book.title}
        </h1>

        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>
          by {book.author} {book.year ? `(${book.year})` : ''}
        </p>
      </header>

      {/* The Big Idea Box */}
      <section
        aria-labelledby="big-idea-heading"
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '1.5rem',
          background: 'linear-gradient(135deg, #17181d 0%, #292a34 100%)',
          color: '#fff',
          marginBottom: '2.5rem',
          boxShadow: '0 0.8rem 2.5rem rgba(23, 24, 29, 0.12)',
        }}
      >
        <p style={{ margin: '0 0 0.5rem', fontSize: '0.72rem', fontWeight: 950, letterSpacing: '0.12em', color: '#e4fb4f', textTransform: 'uppercase' }}>
          THE BIG IDEA IN ONE MINUTE
        </p>
        <p id="big-idea-heading" style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.55, fontWeight: 700 }}>
          {book.bigIdea}
        </p>
      </section>

      {/* Pull Quote */}
      <blockquote
        style={{
          margin: '0 0 2.5rem',
          padding: '1.5rem 2rem',
          borderRadius: '1.25rem',
          background: '#f8f8fb',
          borderLeft: '4px solid #7168ed',
          fontSize: '1.2rem',
          fontStyle: 'italic',
          lineHeight: 1.5,
          color: 'var(--foreground)',
        }}
      >
        &ldquo;{book.pullQuote}&rdquo;
        <footer style={{ marginTop: '0.75rem', fontSize: '0.85rem', fontStyle: 'normal', fontWeight: 700, color: 'var(--muted-foreground)' }}>
          {book.author} · {book.title}
        </footer>
      </blockquote>

      {/* Core Insights / Chapters */}
      <section style={{ marginBottom: '2.5rem' }} aria-labelledby="takeaways-heading">
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>CORE PRINCIPLES</p>
        <h2 id="takeaways-heading" style={{ fontSize: '1.6rem', margin: '0 0 1.25rem', letterSpacing: '-0.03em' }}>
          Key Insights from the Book
        </h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {book.takeaways.map((item) => (
            <article
              key={item.number}
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1.25rem',
                background: '#fff',
                border: '1px solid var(--border)',
                boxShadow: '0 0.3rem 1rem rgba(23, 24, 29, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    display: 'inline-grid',
                    placeItems: 'center',
                    width: '1.8rem',
                    height: '1.8rem',
                    borderRadius: '50%',
                    background: '#7168ed',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                  }}
                >
                  {item.number}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                  {item.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--muted-foreground)', paddingLeft: '2.55rem' }}>
                {item.explanation}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Full 3-Minute Summary */}
      <section style={{ marginBottom: '2.5rem' }} aria-labelledby="summary-heading">
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>EXECUTIVE BREAKDOWN</p>
        <h2 id="summary-heading" style={{ fontSize: '1.6rem', margin: '0 0 1.25rem', letterSpacing: '-0.03em' }}>
          The Heart of the Teaching
        </h2>

        <div
          style={{
            padding: '2rem clamp(1.5rem, 5vw, 2.25rem)',
            borderRadius: '1.5rem',
            background: '#fff',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: '#343541',
          }}
        >
          {book.summaryParagraphs.map((para, i) => (
            <p key={i} style={{ margin: 0 }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Practical Application */}
      <section
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '1.5rem',
          background: '#f4f0ff',
          border: '1px solid rgba(113, 104, 237, 0.2)',
          marginBottom: '3rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
          <Sparkles size={18} style={{ color: '#7168ed' }} />
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#7168ed', letterSpacing: '-0.02em' }}>
            How to Apply This Today
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--foreground)' }}>
          {book.application}
        </p>
      </section>

      {/* Footer navigation */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <Link
          href="/books"
          style={{
            color: '#7168ed',
            fontSize: '0.9rem',
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          ← Browse more book summaries
        </Link>
        <Link
          href="/learn"
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: '999px',
            background: '#17181d',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 900,
            textDecoration: 'none',
          }}
        >
          Back to daily reading →
        </Link>
      </footer>
    </div>
  )
}
