import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import { FaqSection } from '@/components/faq-section'

const principles = [
  ['01', 'Ideas worth five minutes', 'Every piece on Yadesh starts with one clear idea from a trusted book, person, teaching, or testimony. Short enough to finish. Meaningful enough to stay with you.'],
  ['02', 'Learning that points to the source', 'Yadesh does not replace the original. It introduces you to it. Every piece points toward the book, biography, or historical record it came from so you can go further when something matters.'],
  ['03', 'A library you actually return to', 'Save what resonates. Build a quiet collection of ideas, lives, and lessons you can come back to without hunting through a feed.'],
]

export default function AboutPage() {
  return (
    <main className="info-page">
      <SharedNav />
      <section className="info-hero">
        <p className="kicker">The Yadesh approach</p>
        <h1>Learning that takes<br /><em>the faith seriously.</em></h1>
        <p>Yadesh brings together ideas, people, books, teachings, testimonies, and history from across Christianity in short, sourced, honest readings. Not a Bible app. Not a sermon stream. Something more like a library that fits in five minutes.</p>
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
