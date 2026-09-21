import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import { FaqSection } from '@/components/faq-section'

const principles = [
  [
    '01',
    'Real depth in five minutes',
    'You do not need an hour of free time or a seminary degree to grow. Every reading focuses on one clear lesson from a trusted Christian author, leader, or historical event, written to be finished in five minutes.',
  ],
  [
    '02',
    'Anchored in original sources',
    'Yadesh does not replace original books or scripture, it introduces you to them. Every reading links directly to the real book, biography, or historical record so you can explore further whenever an idea moves you.',
  ],
  [
    '03',
    'A personal library you keep',
    'Save your favourite readings with one tap. Build a personal collection of wisdom that stays with you, ready whenever you need encouragement or reflection.',
  ],
]

export default function AboutPage() {
  return (
    <main className="info-page">
      <SharedNav />
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
      <FaqSection />
      <footer className="info-footer">
        <Link href="/">Back to Yadesh</Link>
        <span>Read. Keep. Remember.</span>
      </footer>
    </main>
  )
}
