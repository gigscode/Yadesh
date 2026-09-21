import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, BookOpen, ShieldCheck, Sparkles } from 'lucide-react'
import { peopleProfiles } from '@/lib/people-data'
import { getPersonProfile } from '@/lib/content-loader'

export function generateStaticParams() {
  return peopleProfiles.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = await getPersonProfile(slug)
  if (!person) return {}
  return {
    title: `${person.name} · Life, Accounts & Teachings · Yadesh`,
    description: person.shortBio,
  }
}

export default async function PersonProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const person = await getPersonProfile(slug)

  if (!person) {
    notFound()
  }

  return (
    <div style={{ maxWidth: '46rem', margin: '0 auto', paddingBottom: '6rem' }}>
      {/* Back button */}
      <Link
        href="/people"
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
        <ArrowLeft size={16} /> Back to all people
      </Link>

      {/* Hero Profile Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '999px',
              background: '#f4f0ff',
              color: '#7168ed',
              fontSize: '0.72rem',
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <User size={12} /> {person.role}
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 700 }}>
            {person.lifespan}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 3rem)', letterSpacing: '-0.04em', lineHeight: 1.05, margin: '0 0 0.75rem' }}>
          {person.name}
        </h1>

        <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, color: 'var(--muted-foreground)' }}>
          {person.shortBio}
        </p>
      </header>

      {/* Core Quote Banner */}
      <section
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
          CORE CONVICTION
        </p>
        <p style={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.45, fontWeight: 700, fontStyle: 'italic' }}>
          &ldquo;{person.coreQuote}&rdquo;
        </p>
      </section>

      {/* Lesser-Known Eyewitness Story */}
      <section style={{ marginBottom: '2.5rem' }} aria-labelledby="story-heading">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={18} style={{ color: '#7168ed' }} />
          <p className="eyebrow" style={{ margin: 0 }}>LESSER-KNOWN FIRSTHAND ACCOUNT</p>
        </div>
        <h2 id="story-heading" style={{ fontSize: '1.6rem', margin: '0 0 1.25rem', letterSpacing: '-0.03em' }}>
          {person.eyewitnessStory.title}
        </h2>

        <div
          style={{
            padding: '2rem clamp(1.5rem, 5vw, 2.25rem)',
            borderRadius: '1.5rem',
            background: '#fff',
            border: '1px solid var(--border)',
            boxShadow: '0 0.35rem 1.2rem rgba(23, 24, 29, 0.04)',
            marginBottom: '1rem',
          }}
        >
          <p style={{ margin: 0, fontSize: '1.02rem', lineHeight: 1.75, color: '#30313d' }}>
            {person.eyewitnessStory.account}
          </p>
        </div>

        {/* Primary Source Verification Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.85rem 1.25rem',
            borderRadius: '1rem',
            background: '#f8fdf9',
            border: '1px solid #bbf7d0',
            fontSize: '0.82rem',
            color: '#166534',
          }}
        >
          <ShieldCheck size={18} style={{ color: '#16a34a', flexShrink: 0 }} />
          <div>
            <strong>Verified Primary Source:</strong> {person.eyewitnessStory.primarySource} ({person.eyewitnessStory.sourceContext})
          </div>
        </div>
      </section>

      {/* Key Historical Facts */}
      <section style={{ marginBottom: '2.5rem' }} aria-labelledby="facts-heading">
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>HISTORICAL RECORDS</p>
        <h2 id="facts-heading" style={{ fontSize: '1.6rem', margin: '0 0 1.25rem', letterSpacing: '-0.03em' }}>
          Three Facts from Their Life
        </h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {person.keyFacts.map((fact, index) => (
            <article
              key={fact.factTitle}
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '1.25rem',
                background: '#fff',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                <span
                  style={{
                    display: 'inline-grid',
                    placeItems: 'center',
                    width: '1.6rem',
                    height: '1.6rem',
                    borderRadius: '50%',
                    background: '#f4f0ff',
                    color: '#7168ed',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                  }}
                >
                  {index + 1}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
                  {fact.factTitle}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--muted-foreground)', paddingLeft: '2.25rem' }}>
                {fact.detail}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Books Authored */}
      <section
        style={{
          padding: '1.75rem 2rem',
          borderRadius: '1.5rem',
          background: '#fdf0d8',
          border: '1px solid rgba(138, 90, 0, 0.15)',
          marginBottom: '3rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <BookOpen size={18} style={{ color: '#8a5a00' }} />
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#8a5a00', letterSpacing: '-0.02em' }}>
            Books Written by {person.name}
          </h3>
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', lineHeight: 1.7, fontSize: '0.92rem', color: '#543600' }}>
          {person.booksAuthored.map((bookTitle) => (
            <li key={bookTitle}>{bookTitle}</li>
          ))}
        </ul>
      </section>

      {/* Navigation Footer */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <Link
          href="/people"
          style={{
            color: '#7168ed',
            fontSize: '0.9rem',
            fontWeight: 800,
            textDecoration: 'none',
          }}
        >
          ← Browse more people
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

