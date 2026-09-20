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
      <section className="info-hero"><p className="kicker">The Yadesh approach</p><h1>Keep what<br /><em>helps you grow.</em></h1><p>Yadesh is a quieter way to discover meaningful Christian ideas, understand their source, and return to the lessons worth carrying.</p></section>
      <section className="info-grid" aria-label="Yadesh principles">{principles.map(([number, title, copy]) => <article key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></article>)}</section>
      <FaqSection />
      <footer className="info-footer"><Link href="/">Back to Yadesh</Link><span>Read. Verify. Remember.</span></footer>
    </main>
  )
}
