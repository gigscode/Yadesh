'use client'

import { ArrowUpRight, Bookmark, Check, Link2, Scale, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSave } from '@/hooks/use-save'

export type PowerStory = {
  id: string
  minister: string
  year: string
  headline: string
  testimony: string
  scripture: string
  source: string
}

export type CrucibleStory = {
  id: string
  minister: string
  citation: string
  headline: string
  summary: string
  correction: string
  source: string
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

export function PowerCard({ story }: { story: PowerStory }) {
  const { saved, loading, toggle } = useSave(story.id)
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
          onClick={toggle}
          aria-pressed={saved}
          disabled={loading}
          type="button"
        >
          {saved ? <Check aria-hidden="true" /> : <Bookmark aria-hidden="true" />}
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
        <button
          className="icon-action"
          type="button"
          aria-label="Share this story"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: story.headline, url: window.location.href })
            }
          }}
        >
          <Share2 aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export function CrucibleCard({ story }: { story: CrucibleStory }) {
  const { saved, loading, toggle } = useSave(story.id)
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
          className={cn('quiet-action', saved && 'is-active')}
          onClick={toggle}
          aria-pressed={saved}
          disabled={loading}
          type="button"
        >
          {saved ? <Check aria-hidden="true" /> : <Scale aria-hidden="true" />}
          <span>{saved ? 'Saved' : 'Ponder'}</span>
        </button>
      </div>
    </article>
  )
}
