import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import { FaqSection } from '@/components/faq-section'

const principles = [
  ['01', 'Discover in minutes', 'Start with a clear idea, story, or lesson you can understand without committing to a long feed.'],
  ['02', 'Learn from the source', 'Go beyond the summary with books, people, teachings, testimonies, and historical records.'],
  ['03', 'Keep what helps', 'Save the ideas worth revisiting and build a quieter, more intentional learning habit.'],
]

export default function AboutPage() {
  return (
    <main className="info-page">
      <SharedNav />
      <section className="info-hero"><p className="kicker">Christian micro-learning</p><h1>Five minutes can<br /><em>change what you know.</em></h1><p>Yadesh helps you discover meaningful Christian ideas from books, people, teachings, testimonies, and the history of the faith, one useful piece at a time.</p></section>
      <section className="info-grid" aria-label="Yadesh principles">{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
      <FaqSection />
      <footer className="info-footer"><Link href="/">Back to Yadesh</Link><span>Read. Verify. Remember.</span></footer>
    </main>
  )
}
