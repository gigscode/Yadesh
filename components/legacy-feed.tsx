'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Bookmark,
  Check,
  Flame,
  Link2,
  Menu,
  Scale,
  Shield,
  Sparkles,
  Share2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
    scripture: '“They shall lay hands on the sick, and they shall recover.” — Mark 16:18',
    source: 'https://archive.org/details/ever-increasing-faith',
  },
  {
    id: 'john-g-lake-spokane-healing-rooms-1918',
    minister: 'John G. Lake',
    year: '1918',
    headline: 'The healing rooms that outlasted the plague',
    testimony:
      'During the Spokane healing ministry, Lake described ordinary people arriving with extraordinary need. He tells of prayer rooms filled from morning until night, where testimonies of recovery became part of the daily rhythm. His firsthand record insists that compassion, not spectacle, was the center of the work.',
    scripture: '“I am the Lord that healeth thee.” — Exodus 15:26',
    source: 'https://archive.org/details/adventures-in-god',
  },
  {
    id: 'kathryn-kuhlman-whisper-before-miracle-1972',
    minister: 'Kathryn Kuhlman',
    year: '1972',
    headline: 'A whisper before the miracle',
    testimony:
      'Kuhlman often described the moment before a healing as quiet, almost hidden. In one testimony she recounts a person entering with a diagnosis and leaving with a new report after prayer. Her emphasis was never on the minister, but on surrendering the room to the Holy Spirit.',
    scripture: '“Not by might, nor by power, but by my spirit.” — Zechariah 4:6',
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
          <span>{saved ? 'Saved to Altar' : 'Save to Altar'}</span>
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

export function LegacyFeed({ showHero = true }: { showHero?: boolean }) {
  const [tab, setTab] = useState<'power' | 'crucible'>('power')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="phone-shell">
      <header className="app-header">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a className="nav-brand brand-lockup" href="#top" aria-label="Yadesh home">
            <span className="brand-mark" aria-hidden="true"><Flame /></span>
          <span className="brand-wordmark">Yadesh</span>
          </a>
          <a href="/archive" className="nav-topics">Topics <span aria-hidden="true">⌄</span></a>
          <a href="#archive" className="nav-cta">Enter the feed</a>
          <a href="/login" className="nav-login">Log in</a>
          <button className="nav-menu" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu aria-hidden="true" /></button>
        </nav>
        {menuOpen && (
          <div className="menu-panel" role="dialog" aria-label="Yadesh navigation">
            <div className="menu-panel-head"><span>Move with intention.</span><button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
            <nav className="menu-links" aria-label="Menu links">
              <a href="#archive" onClick={() => setMenuOpen(false)}><span>01</span>Enter the feed <ArrowUpRight aria-hidden="true" /></a>
              <a href="/archive"><span>02</span>Browse records <ArrowUpRight aria-hidden="true" /></a>
              <a href="/about"><span>03</span>Why Yadesh <ArrowUpRight aria-hidden="true" /></a>
              <a href="#waitlist-title" onClick={() => setMenuOpen(false)}><span>04</span>Stay close <ArrowUpRight aria-hidden="true" /></a>
            </nav>
            <p className="menu-note">A quieter place for source-anchored testimony and sober lessons.</p>
          </div>
        )}
      </header>

      <main id="top" className="app-content">
        {showHero && <section className="landing-hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="kicker">A living archive for serious seekers</p>
            <h1 id="page-title"><span className="hero-line hero-line-one">Replace <span className="struck">doomscrolling</span></span><span className="hero-line hero-line-two">with <em>holy fire.</em></span></h1>
            <p>Trade the endless feed for testimonies, sober lessons, and the original records beneath them. Read slowly. Verify everything.</p>
            <div className="hero-actions"><a className="hero-link" href="#archive">Open the seeker feed <ArrowUpRight aria-hidden="true" /></a><a className="hero-secondary" href="#archive">Read a record <ArrowUpRight aria-hidden="true" /></a></div>
          </div>
        </section>}

        <section className="proof-band" aria-label="Yadesh proof points">
          <div><strong>62</strong><span>Stories kept close</span></div>
          <div><strong>100%</strong><span>Source anchored</span></div>
          <div><strong>0</strong><span>Noise in the room</span></div>
        </section>


        <section className="archive-section" id="archive" aria-labelledby="archive-title">
          <div className="section-heading"><div><p className="kicker">The seeker feed</p><h2 id="archive-title">Choose your pressure.</h2></div><span className="section-index">01 / 02</span></div>
          <div className="tab-wrap" role="tablist" aria-label="Kingdom Legacy archive">
          <button className={cn('archive-tab', tab === 'power' && 'is-selected')} onClick={() => setTab('power')} role="tab" aria-selected={tab === 'power'} type="button">
            <Sparkles aria-hidden="true" /> The Power
          </button>
          <button className={cn('archive-tab', tab === 'crucible' && 'is-selected')} onClick={() => setTab('crucible')} role="tab" aria-selected={tab === 'crucible'} type="button">
            <Shield aria-hidden="true" /> The Crucible
          </button>
        </div>

        <div className="feed" role="tabpanel">
          {tab === 'power'
            ? uniqueById(powerStories).map((story) => <PowerCard key={story.id} story={story} />)
            : uniqueById(crucibleStories).map((story) => <CrucibleCard key={story.id} story={story} />)}
        </div>
        </section>

        <section className="waitlist-section" aria-labelledby="waitlist-title">
          <div>
            <p className="kicker">Stay close to the record</p>
            <h2 id="waitlist-title">Keep the fire in view.</h2>
          </div>
          <form className="waitlist-form" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="waitlist-email">Email address</label>
            <input id="waitlist-email" type="email" placeholder="Your email address" required />
            <button type="submit">Join the waitlist <ArrowUpRight aria-hidden="true" /></button>
          </form>
        </section>
      </main>
      <footer className="app-footer"><span className="footer-rule" /> <span>Read. Verify. Remember.</span> <span className="footer-rule" /></footer>
    </div>
  )
}

export default LegacyFeed
