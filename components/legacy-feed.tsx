'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Link2,
  Scale,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SharedNav } from '@/components/shared-nav'

type PowerStory = {
  id: string
  minister: string
  year: string
  headline: string
  testimony: string
  scripture: string
  source: string
}

type CrucibleStory = {
  id: string
  minister: string
  citation: string
  headline: string
  summary: string
  correction: string
  source: string
}

const powerStories: PowerStory[] = [
  {
    id: 'smith-wigglesworth-healing-room-1922',
    minister: 'Smith Wigglesworth',
    year: '1922',
    headline: 'When a room full of skeptics fell silent',
    testimony:
      'Wigglesworth records that a woman, considered beyond medical hope, was brought to his meeting. He prayed with a fierce simplicity, then watched strength return to her body in front of the gathered church. The account became a summons to believe that God still meets people in their impossible places.',
    scripture: '“They shall lay hands on the sick, and they shall recover.” Mark 16:18',
    source: 'https://archive.org/details/ever-increasing-faith',
  },
  {
    id: 'john-g-lake-spokane-healing-rooms-1918',
    minister: 'John G. Lake',
    year: '1918',
    headline: 'The healing rooms that outlasted the plague',
    testimony:
      'During the Spokane healing ministry, Lake described ordinary people arriving with extraordinary need. He tells of prayer rooms filled from morning until night, where testimonies of recovery became part of the daily rhythm. His firsthand record insists that compassion, not spectacle, was the center of the work.',
    scripture: '“I am the Lord that healeth thee.” Exodus 15:26',
    source: 'https://archive.org/details/adventures-in-god',
  },
  {
    id: 'kathryn-kuhlman-whisper-before-miracle-1972',
    minister: 'Kathryn Kuhlman',
    year: '1972',
    headline: 'A whisper before the miracle',
    testimony:
      'Kuhlman often described the moment before a healing as quiet, almost hidden. In one testimony she recounts a person entering with a diagnosis and leaving with a new report after prayer. Her emphasis was never on the minister, but on surrendering the room to the Holy Spirit.',
    scripture: '“Not by might, nor by power, but by my spirit.” Zechariah 4:6',
    source: 'https://archive.org/details/i-believe-in-miracles',
  },
]

const crucibleStories: CrucibleStory[] = [
  {
    id: 'aimee-semple-mcpherson-momentum-discernment',
    minister: 'Aimee Semple McPherson',
    citation: 'Autobiography · This Is That',
    headline: 'When momentum became a substitute for discernment',
    summary:
      'McPherson writes candidly about the pressures of visibility, travel, and a ministry growing faster than her private life could bear. A season of exhaustion and public confusion exposed how easily calling can be confused with constant motion. Her account does not erase the failure; it lets the lesson remain visible.',
    correction: 'The Divine Correction: Return to hidden obedience before public influence.',
    source: 'https://archive.org/details/this-is-that-aimee-semple-mcpherson',
  },
  {
    id: 'charles-finney-method-over-god',
    minister: 'Charles Finney',
    citation: 'Memoirs · Charles G. Finney',
    headline: 'The danger of trusting a method more than God',
    summary:
      'Finney reflects on revival meetings where human technique could begin to imitate spiritual power. He saw that emotional response and lasting transformation were not the same thing. His correction was to recover prayerful dependence instead of leaning on a repeatable formula.',
    correction: 'The Divine Correction: Let the altar shape the method, never the method the altar.',
    source: 'https://archive.org/details/memoirs-of-charles-g-finney',
  },
]

function uniqueById<T extends { id: string }>(stories: T[]) {
  return Array.from(new Map(stories.map((story) => [story.id, story])).values())
}

function SourceLink({ href, label }: { href: string; label: string }) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      <Link2 aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight aria-hidden="true" />
    </a>
  )
}

function PowerCard({ story }: { story: PowerStory }) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="legacy-card power-card">
      <div className="card-meta">
        <span>{story.minister}</span>
        <span className="meta-dot" aria-hidden="true" />
        <span>{story.year}</span>
      </div>
      <h2>{story.headline}</h2>
      <p className="story-copy">{story.testimony}</p>
      <div className="scripture-box">
        <span className="eyebrow">Scripture anchor</span>
        <p>{story.scripture}</p>
      </div>
      <div className="verification-box">
        <span className="eyebrow">Primary source</span>
        <SourceLink href={story.source} label="Verify Original Testimony" />
      </div>
      <div className="card-actions">
        <button
          className={cn('quiet-action', saved && 'is-active')}
          onClick={() => setSaved(!saved)}
          aria-pressed={saved}
          type="button"
        >
          {saved ? <Check aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
        <button className="icon-action" type="button" aria-label="Text share">
          <Share2 aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

function CrucibleCard({ story }: { story: CrucibleStory }) {
  const [pondered, setPondered] = useState(false)

  return (
    <article className="legacy-card crucible-card">
      <div className="card-meta">
        <span>{story.minister}</span>
        <span className="meta-dot" aria-hidden="true" />
        <span className="citation-badge">{story.citation}</span>
      </div>
      <h2>{story.headline}</h2>
      <p className="story-copy">{story.summary}</p>
      <div className="correction-box">
        <span className="eyebrow">The divine correction</span>
        <p>{story.correction}</p>
      </div>
      <div className="guardrail-box">
        <span className="eyebrow">Anti-hallucination guardrail</span>
        <p>Confirm historical source before carrying the lesson forward.</p>
        <SourceLink href={story.source} label="Read Original Text on Archive.org" />
      </div>
      <div className="card-actions">
        <button
          className={cn('quiet-action', pondered && 'is-active')}
          onClick={() => setPondered(!pondered)}
          aria-pressed={pondered}
          type="button"
        >
          {pondered ? <Check aria-hidden="true" /> : <Scale aria-hidden="true" />}
          <span>{pondered ? 'Pondered' : 'Ponder'}</span>
        </button>
      </div>
    </article>
  )
}

export function LegacyFeed({ showHero = true, showNav = true }: { showHero?: boolean; showNav?: boolean }) {
  return (
    <div className="phone-shell">
      {showNav && <SharedNav />}

      <main id="top" className="app-content">
        {showHero && <section className="landing-hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="kicker">Christian micro-learning</p>
            <h1 id="page-title"><span className="hero-line hero-line-one">Five minutes</span><span className="hero-line hero-line-two">can change</span><span className="hero-line hero-line-three hero-emphasis">what you know.</span></h1>
            <p>Discover powerful ideas, stories, and lessons from Christian books, ministers, biographies, and the history of the faith, one meaningful piece at a time.</p>
            <div className="hero-actions"><a className="hero-link" href="/learn">Start learning <ArrowUpRight aria-hidden="true" /></a><a className="hero-secondary" href="/explore">Find your next reading <ArrowUpRight aria-hidden="true" /></a></div>
            <span className="micro-trust">Read. Keep. Remember.</span>
          </div>
        </section>}

        <section className="how-section landing-method" aria-labelledby="how-title">
          <div className="section-heading"><div><p className="kicker">A quieter way to grow</p><h2 id="how-title">Learning with context, not noise.</h2></div><span className="section-index">01 / 03</span></div>
          <p className="method-intro">Yadesh turns meaningful Christian sources into focused moments of learning you can understand, remember, and return to.</p>
          <div className="how-grid">
            <article><span>01</span><h3>Find the signal</h3><p>Start with one clear idea from a trusted book, person, teaching, or testimony.</p></article>
            <article><span>02</span><h3>Take the lesson</h3><p>Learn the essential context in a few focused minutes, without an endless feed.</p></article>
            <article><span>03</span><h3>Follow the source</h3><p>Go deeper when an idea deserves your attention, practice, and memory.</p></article>
          </div>
        </section>

        <section className="waitlist-section" aria-labelledby="waitlist-title">
          <div>
            <p className="kicker">Join the waitlist</p>
            <h2 id="waitlist-title">Keep learning with intention.</h2>
          </div>
          <form className="waitlist-form" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="waitlist-email">Email address</label>
            <input id="waitlist-email" type="email" placeholder="Your email address" required />
            <button type="submit">Join the waitlist <ArrowUpRight aria-hidden="true" /></button>
          </form>
        </section>
      </main>
      <footer className="app-footer landing-radar"><span className="footer-rule" /> <span>Read. Keep. Remember.</span> <span className="footer-rule" /></footer>
    </div>
  )
}

export default LegacyFeed
