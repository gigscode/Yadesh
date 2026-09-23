import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import { FaqSection } from '@/components/faq-section'
import { createClient } from '@/lib/supabase/server'

const principles = [
  [
    '01',
    'Real depth in five minutes',
    'You do not need an hour of free time or a seminary degree to grow. Every reading focuses on one clear lesson from a trusted Christian author, leader, or historical event, written to be finished in five minutes and carried with you through the day.',
  ],
  [
    '02',
    'Guided journeys, not scattered content',
    'Premium members can follow structured 21-day series on prayer, breakthrough, and the Kingdom of God. Each day builds on the last, tracks your progress, and can be shared as a high-resolution graphic card ready for Instagram, WhatsApp, and X.',
  ],
  [
    '03',
    'Anchored in original sources',
    'Yadesh does not replace original books or scripture. It introduces you to them. Every reading links directly to the real book, biography, or historical record so you can explore further whenever an idea moves you.',
  ],
  [
    '04',
    'A personal library you keep',
    'Save your favourite readings with one tap. Build a personal collection of wisdom that stays with you, ready whenever you need encouragement or reflection. Install Yadesh on your home screen as a PWA for instant access even when you are offline.',
  ],
]

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isLoggedIn = Boolean(user)

  return (
    <main className="info-page">
      <SharedNav isLoggedIn={isLoggedIn} />
      <section className="info-hero">
        <p className="kicker">Why we built Yadesh</p>
        <h1>A daily habit for Christians<br /><em>who want depth without noise.</em></h1>
        <p>
          Most of us spend spare minutes checking social media, only to close our phones feeling drained. We want to read classic Christian books, learn church history, and grow in our faith, but life is busy. Yadesh gives you short, three to five minute lessons drawn from real books, biographies, and teachings that you can easily finish, remember, and keep.
        </p>
      </section>
      <section className="info-grid" aria-label="Yadesh principles">
        {principles.map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      {/* Name story section */}
      <section
        aria-labelledby="name-story-heading"
        style={{
          maxWidth: '48rem',
          margin: '5rem auto 0',
          padding: '2.5rem clamp(1.5rem, 5vw, 3rem)',
          borderRadius: '1.75rem',
          background: '#f4f0ff',
          border: '1px solid rgba(113, 104, 237, 0.15)',
        }}
      >
        <p className="kicker" style={{ marginBottom: '1rem' }}>THE NAME</p>
        <h2 id="name-story-heading" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', margin: '0 0 1.5rem', lineHeight: 1 }}>
          Why Yadesh?
        </h2>

        <p style={{ marginBottom: '1.75rem', lineHeight: 1.65, fontSize: '1.05rem' }}>
          The name is built from two ancient Hebrew words placed together on purpose.
        </p>

        <div style={{ display: 'grid', gap: '1.25rem', marginBottom: '2rem' }}>
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '1.15rem',
              background: '#fff',
              borderLeft: '4px solid #7168ed',
            }}
          >
            <p style={{ margin: '0 0 0.35rem', fontSize: '1.3rem', fontWeight: '950', letterSpacing: '-0.04em', color: '#7168ed' }}>
              Yada
            </p>
            <p style={{ margin: '0 0 0.4rem', fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a09fd8' }}>
              Hebrew: yada (to know)
            </p>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
              To know intimately. Not knowledge stored in a notebook, but knowledge lived and felt. It is the word the Bible uses when God says he knows you by name. Relational, personal, deep.
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '1.15rem',
              background: '#fff',
              borderLeft: '4px solid #e9c7f5',
            }}
          >
            <p style={{ margin: '0 0 0.35rem', fontSize: '1.3rem', fontWeight: '950', letterSpacing: '-0.04em', color: '#7168ed' }}>
              Darash
            </p>
            <p style={{ margin: '0 0 0.4rem', fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a09fd8' }}>
              Hebrew: darash (to seek)
            </p>
            <p style={{ margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
              To seek diligently, to inquire, to search with intention. It is the word behind Psalm 119: earnest pursuit of truth, not passive curiosity. You are actively going somewhere.
            </p>
          </div>
        </div>

        <p style={{ margin: 0, lineHeight: 1.65, fontSize: '1rem', color: '#454651', borderTop: '1px solid rgba(113, 104, 237, 0.15)', paddingTop: '1.5rem' }}>
          Together, <strong>Yadesh</strong> means to know through seeking. It is the conviction that real faith is not inherited or absorbed passively. It is pursued. And when you pursue it honestly, what you find is not just information. It is encounter.
        </p>
      </section>

      <FaqSection />
      <footer className="info-footer">
        <Link href="/">Back to Yadesh</Link>
        <span>Read. Keep. Remember.</span>
      </footer>
    </main>
  )
}
