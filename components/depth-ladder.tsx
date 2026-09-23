import Link from 'next/link'
import { Clock, User, BookOpen, Scroll, Sparkles, ArrowRight, Layers } from 'lucide-react'
import type { LearningCard } from '@/lib/learning-data'
import { peopleProfiles } from '@/lib/people-data'
import { bookSummaries } from '@/lib/book-summaries'

interface DepthLadderProps {
  card: LearningCard
}

export function DepthLadder({ card }: DepthLadderProps) {
  // Find matching author profile
  const matchedPerson = peopleProfiles.find(
    (p) =>
      p.name.toLowerCase() === card.source.toLowerCase() ||
      p.id === card.source.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  )

  // Find matching book if card mentions book or matches author
  const matchedBook = bookSummaries.find(
    (b) =>
      b.title.toLowerCase() === card.title.toLowerCase() ||
      b.author.toLowerCase() === card.source.toLowerCase()
  )

  return (
    <section className="depth-ladder" aria-label="Yadesh Depth Ladder">
      <div className="depth-ladder-header">
        <div className="depth-ladder-badge">
          <Layers size={13} aria-hidden="true" />
          <span>DEPTH LADDER</span>
        </div>
        <h3>How deep do you want to go?</h3>
        <p>
          Every idea in Yadesh is a doorway. Choose your depth from a 30-second spark to the full historical source.
        </p>
      </div>

      <div className="depth-ladder-steps">
        {/* Step 1: 30 Sec */}
        <div className="depth-step">
          <div className="depth-step-indicator">
            <span className="depth-step-num">30s</span>
            <span className="depth-step-line" aria-hidden="true" />
          </div>
          <div className="depth-step-content">
            <div className="depth-step-meta">THE SPARK</div>
            <h4>&ldquo;{card.pullQuote}&rdquo;</h4>
            <span className="depth-step-tag">One memorable sentence to anchor your memory</span>
          </div>
        </div>

        {/* Step 2: 2 Min */}
        <div className="depth-step">
          <div className="depth-step-indicator">
            <span className="depth-step-num">2m</span>
            <span className="depth-step-line" aria-hidden="true" />
          </div>
          <div className="depth-step-content">
            <div className="depth-step-meta">THE PRACTICAL PRINCIPLE</div>
            <p>{card.takeaway}</p>
            <span className="depth-step-tag">Key spiritual application for your day</span>
          </div>
        </div>

        {/* Step 3: 5 Min (Current Reading) */}
        <div className="depth-step depth-step-current">
          <div className="depth-step-indicator">
            <span className="depth-step-num current-num">5m</span>
            <span className="depth-step-line" aria-hidden="true" />
          </div>
          <div className="depth-step-content">
            <div className="depth-step-meta">THE FULL TEACHING</div>
            <h4>{card.title}</h4>
            <p className="depth-current-note">You are currently reading this 5-minute study.</p>
          </div>
        </div>

        {/* Step 4: Person */}
        <div className="depth-step">
          <div className="depth-step-indicator">
            <span className="depth-step-num"><User size={13} /></span>
            <span className="depth-step-line" aria-hidden="true" />
          </div>
          <div className="depth-step-content">
            <div className="depth-step-meta">UNDERSTAND THE LIFE</div>
            <h4>{card.source}</h4>
            {matchedPerson ? (
              <Link href={`/people/${matchedPerson.id}`} className="depth-step-link">
                Explore {card.source}&apos;s life and teachings
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            ) : (
              <Link href="/people" className="depth-step-link">
                Explore biographies of faith
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        {/* Step 5: Book */}
        <div className="depth-step">
          <div className="depth-step-indicator">
            <span className="depth-step-num"><BookOpen size={13} /></span>
            <span className="depth-step-line" aria-hidden="true" />
          </div>
          <div className="depth-step-content">
            <div className="depth-step-meta">EXPLORE THE LARGER WORK</div>
            {matchedBook ? (
              <>
                <h4>{matchedBook.title}</h4>
                <Link href={`/books/${matchedBook.id}`} className="depth-step-link">
                  Read the 4-minute book breakdown
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </>
            ) : (
              <>
                <h4>Theological &amp; Historical Classics</h4>
                <Link href="/books" className="depth-step-link">
                  Browse the Christian book summaries
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Step 6: Historical Source */}
        <div className="depth-step">
          <div className="depth-step-indicator">
            <span className="depth-step-num"><Scroll size={13} /></span>
          </div>
          <div className="depth-step-content">
            <div className="depth-step-meta">SOURCE INFORMATION</div>
            <p className="depth-step-source-desc">
              References from the original published discourse and historical records associated with {card.source}, where available.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
