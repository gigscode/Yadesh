'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, Trash2, CheckCircle2, AlertCircle, Loader2, Sparkles, Eye } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type CardType = 'IDEA' | 'LIFE' | 'BOOK' | 'HISTORY' | 'TEACHING'

type AdminDashboardProps = {
  userEmail: string
  initialCards: any[]
}

export function AdminDashboard({ userEmail, initialCards }: AdminDashboardProps) {
  const router = useRouter()
  const supabase = createClient()

  const [cards, setCards] = useState<any[]>(initialCards)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [previewMode, setPreviewMode] = useState(false)

  // Form State
  const [type, setType] = useState<CardType>('IDEA')
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [time, setTime] = useState('3 min read')
  const [body, setBody] = useState('')
  const [pullQuote, setPullQuote] = useState('')
  const [takeaway, setTakeaway] = useState('')
  const [fullBodyText, setFullBodyText] = useState('')

  // Generate URL slug from title
  const generateSlug = (t: string) => {
    return t
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!title || !source || !body || !pullQuote || !takeaway || !fullBodyText) {
      setMessage({ type: 'error', text: 'Please fill in all fields before publishing.' })
      return
    }

    setSubmitting(true)
    const slug = generateSlug(title)

    // Split paragraphs by blank line or newline
    const paragraphs = fullBodyText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)

    const payload = {
      id: slug,
      type,
      title: title.trim(),
      source: source.trim(),
      time: time.trim(),
      body: body.trim(),
      pull_quote: pullQuote.trim(),
      takeaway: takeaway.trim(),
      full_body: paragraphs,
    }

    try {
      const { error } = await supabase.from('content').insert([payload])

      if (error) {
        if (error.code === '42501') {
          setMessage({
            type: 'error',
            text: 'Permission denied: Ensure your logged in email matches the admin RLS policy in Supabase.',
          })
        } else if (error.code === '23505') {
          setMessage({
            type: 'error',
            text: 'A card with this title or ID slug already exists. Please adjust the title.',
          })
        } else {
          setMessage({ type: 'error', text: error.message })
        }
        setSubmitting(false)
        return
      }

      setMessage({ type: 'success', text: `Published successfully: "${title}" is now live!` })

      // Prepend to current list
      setCards([payload, ...cards])

      // Reset form
      setTitle('')
      setSource('')
      setBody('')
      setPullQuote('')
      setTakeaway('')
      setFullBodyText('')
      setPreviewMode(false)

      router.refresh()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'An error occurred.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, cardTitle: string) => {
    if (!window.confirm(`Delete "${cardTitle}" from live content?`)) return

    try {
      const { error } = await supabase.from('content').delete().eq('id', id)
      if (error) {
        alert(error.message)
        return
      }
      setCards(cards.filter((c) => c.id !== id))
      router.refresh()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return (
    <div style={{ maxWidth: '46rem', margin: '0 auto', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="eyebrow">EDITORIAL DESK</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.4rem 0 0.8rem', lineHeight: 1 }}>
          Publish New Reading
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>
          Logged in as <b>{userEmail}</b>. Cards published here go live immediately across Home, Explore, and Search.
        </p>
      </div>

      {message && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '1rem 1.25rem',
            borderRadius: '1rem',
            marginBottom: '2rem',
            background: message.type === 'success' ? '#d8f5e4' : '#fee2e2',
            color: message.type === 'success' ? '#14532d' : '#991b1b',
            fontWeight: '800',
            fontSize: '0.88rem',
          }}
          role="status"
        >
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
              TYPE
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CardType)}
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)',
                background: '#fff',
                fontWeight: '800',
              }}
            >
              <option value="IDEA">IDEA (Lime accent)</option>
              <option value="LIFE">LIFE (Lavender accent)</option>
              <option value="BOOK">BOOK (Amber accent)</option>
              <option value="HISTORY">HISTORY (Periwinkle accent)</option>
              <option value="TEACHING">TEACHING (Green accent)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
              READ TIME
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 3 min read"
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--border)',
                background: '#fff',
                fontWeight: '700',
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
            TITLE (PROVOCATIVE, CLEAR HEADLINE)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Grace is power, not permission"
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              background: '#fff',
              fontSize: '1rem',
              fontWeight: '800',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
            AUTHOR OR SOURCE
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. Dietrich Bonhoeffer"
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              background: '#fff',
              fontWeight: '700',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
            PREVIEW BODY (SUMMARY SHOWN ON CARD, ~45-60 WORDS)
          </label>
          <textarea
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="A short, clear overview of the lesson..."
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              background: '#fff',
              fontFamily: 'inherit',
              lineHeight: 1.5,
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
            PULL QUOTE (THE ONE SENTENCE TO ANCHOR THE PIECE AND SHARE CARD)
          </label>
          <input
            type="text"
            value={pullQuote}
            onChange={(e) => setPullQuote(e.target.value)}
            placeholder="e.g. Cheap grace is the deadly enemy of our church."
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              background: '#fff',
              fontWeight: '700',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
            TAKEAWAY (PRACTICAL 1-LINE CONCLUSION)
          </label>
          <input
            type="text"
            value={takeaway}
            onChange={(e) => setTakeaway(e.target.value)}
            placeholder="e.g. Grace is not a license to stay the same. It makes change possible."
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              background: '#fff',
              fontWeight: '700',
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '900', marginBottom: '0.4rem' }}>
            FULL BODY (SEPARATE PARAGRAPHS WITH A BLANK LINE)
          </label>
          <textarea
            rows={8}
            value={fullBodyText}
            onChange={(e) => setFullBodyText(e.target.value)}
            placeholder="Paragraph 1: Historical context...&#10;&#10;Paragraph 2: The tension or problem...&#10;&#10;Paragraph 3: The core lesson..."
            style={{
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border)',
              background: '#fff',
              fontFamily: 'inherit',
              lineHeight: 1.6,
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.4rem',
              borderRadius: '999px',
              background: '#17181d',
              color: '#fff',
              fontWeight: '900',
              border: 0,
              cursor: submitting ? 'wait' : 'pointer',
            }}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <PlusCircle size={16} /> Publish to Live App
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.85rem 1.2rem',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: '#fff',
              fontWeight: '800',
              cursor: 'pointer',
            }}
          >
            <Eye size={15} /> {previewMode ? 'Hide Preview' : 'Live Card Preview'}
          </button>
        </div>
      </form>

      {/* Live Preview Card */}
      {previewMode && (
        <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '2px dashed var(--periwinkle)', borderRadius: '1.25rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>PREVIEW OF HOW IT LOOKS</p>
          <article className={`learning-card card-type-${type.toLowerCase()}`}>
            <div className="card-meta">
              <span>{type}</span>
              <span>{time}</span>
            </div>
            <h3>{title || 'Card Title Headline'}</h3>
            <p className="card-source">{source || 'Author / Source'}</p>
            <p>{body || 'Preview text summary will appear here...'}</p>
          </article>
        </div>
      )}

      {/* Published from Database */}
      <section style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>
          Database Published Readings ({cards.length})
        </h2>

        {cards.length === 0 ? (
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
            No database cards published yet. The app is currently serving the initial 21 static curated cards.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {cards.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '0.85rem',
                  background: '#fff',
                  border: '1px solid var(--border)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#7168ed' }}>{c.type} · {c.time}</span>
                  <h3 style={{ margin: '0.2rem 0', fontSize: '1.1rem' }}>{c.title}</h3>
                  <span style={{ color: 'var(--muted-foreground)', fontSize: '0.8rem' }}>{c.source}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Link
                    href={`/learn/${c.id}`}
                    target="_blank"
                    style={{
                      padding: '0.45rem 0.8rem',
                      borderRadius: '999px',
                      background: '#f4f0ff',
                      color: '#7168ed',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      textDecoration: 'none',
                    }}
                  >
                    View live ↗
                  </Link>

                  <button
                    onClick={() => handleDelete(c.id, c.title)}
                    style={{
                      padding: '0.45rem',
                      border: 0,
                      background: 'transparent',
                      color: '#ef4444',
                      cursor: 'pointer',
                    }}
                    title="Delete reading"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

