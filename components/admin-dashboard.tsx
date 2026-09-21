'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  PlusCircle,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  FileSpreadsheet,
  FileText,
  UploadCloud,
  HelpCircle,
  Copy,
  Sparkles,
  ExternalLink,
  Layers,
  Database,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type CardType = 'IDEA' | 'LIFE' | 'BOOK' | 'HISTORY' | 'TEACHING'

type AdminDashboardProps = {
  userEmail: string
  initialCards: any[]
}

const BULK_JSON_TEMPLATE = `[
  {
    "type": "IDEA",
    "title": "The Practice of the Presence of God",
    "source": "Brother Lawrence",
    "time": "3 min read",
    "body": "Brother Lawrence discovered that washing dishes in a monastery kitchen could be as holy as praying in a chapel.",
    "pullQuote": "We ought not to be weary of doing little things for the love of God.",
    "takeaway": "Turn your daily tasks into quiet conversation with God.",
    "fullBody": [
      "Brother Lawrence was a 17th century lay brother assigned to a noisy monastery kitchen.",
      "He initially disliked the menial labor, feeling it distracted him from contemplation.",
      "Over time, he realized that holiness is not about isolated places, but about carrying intentional awareness everywhere.",
      "His quiet insight reshaped how Christians view ordinary work."
    ]
  }
]`

export function AdminDashboard({ userEmail, initialCards }: AdminDashboardProps) {
  const router = useRouter()
  const supabase = createClient()

  const [cards, setCards] = useState<any[]>(initialCards)
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [copiedTemplate, setCopiedTemplate] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Single Form State
  const [type, setType] = useState<CardType>('IDEA')
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [time, setTime] = useState('3 min read')
  const [body, setBody] = useState('')
  const [pullQuote, setPullQuote] = useState('')
  const [takeaway, setTakeaway] = useState('')
  const [fullBodyText, setFullBodyText] = useState('')

  // Bulk Upload State
  const [bulkJson, setBulkJson] = useState('')

  const generateSlug = (t: string) => {
    return t
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(BULK_JSON_TEMPLATE)
    setCopiedTemplate(true)
    setTimeout(() => setCopiedTemplate(false), 2000)
  }

  // Single Card Publish
  const handlePublishSingle = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!title || !source || !body || !pullQuote || !takeaway || !fullBodyText) {
      setMessage({ type: 'error', text: 'Please fill in all fields before publishing.' })
      return
    }

    setSubmitting(true)
    const slug = generateSlug(title)

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
            text: 'Permission denied. Make sure your email has is_admin = true in the profiles table.',
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

  // Bulk Upload Publish
  const handlePublishBulk = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!bulkJson.trim()) {
      setMessage({ type: 'error', text: 'Please paste valid JSON data before uploading.' })
      return
    }

    setSubmitting(true)

    try {
      const parsed = JSON.parse(bulkJson)
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('JSON must be a non-empty array of card objects [ { ... }, { ... } ].')
      }

      const validatedPayloads = parsed.map((item, index) => {
        if (!item.title || !item.source || !item.body || !item.pullQuote || !item.takeaway) {
          throw new Error(`Item #${index + 1} (${item.title || 'Untitled'}) is missing required fields.`)
        }

        const validTypes: CardType[] = ['IDEA', 'LIFE', 'BOOK', 'HISTORY', 'TEACHING']
        const cardType = (item.type || 'IDEA').toUpperCase() as CardType
        const normalizedType = validTypes.includes(cardType) ? cardType : 'IDEA'

        const fullBodyArr = Array.isArray(item.fullBody)
          ? item.fullBody
          : typeof item.fullBody === 'string'
            ? item.fullBody.split(/\n\s*\n/).filter(Boolean)
            : [item.body]

        return {
          id: item.id ? generateSlug(item.id) : generateSlug(item.title),
          type: normalizedType,
          title: String(item.title).trim(),
          source: String(item.source).trim(),
          time: item.time ? String(item.time).trim() : '3 min read',
          body: String(item.body).trim(),
          pull_quote: String(item.pullQuote).trim(),
          takeaway: String(item.takeaway).trim(),
          full_body: fullBodyArr,
        }
      })

      const { error } = await supabase.from('content').upsert(validatedPayloads, {
        onConflict: 'id',
      })

      if (error) {
        throw error
      }

      setMessage({
        type: 'success',
        text: `Bulk upload successful! ${validatedPayloads.length} readings published or updated live.`,
      })

      setCards([...validatedPayloads, ...cards])
      setBulkJson('')
      router.refresh()
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: `Bulk upload failed: ${err.message || 'Invalid JSON format'}`,
      })
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
    <div style={{ maxWidth: '54rem', margin: '0 auto', paddingBottom: '6rem' }}>
      {/* Editorial Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          padding: '2rem 2.25rem',
          borderRadius: '1.75rem',
          background: 'linear-gradient(135deg, #17181d 0%, #292a34 100%)',
          color: '#fff',
          marginBottom: '2.5rem',
          boxShadow: '0 1rem 3rem rgba(23, 24, 29, 0.12)',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#e4fb4f', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            <Sparkles size={15} /> EDITORIAL COMMAND DESK
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0 0 0.6rem', lineHeight: 1, letterSpacing: '-0.05em' }}>
            Content Studio
          </h1>
          <p style={{ margin: 0, color: '#d9d9df', fontSize: '0.92rem', maxWidth: '32rem', lineHeight: 1.5 }}>
            Logged in as <b>{userEmail}</b>. Publish single lessons or bulk import batches. All changes stream live instantly.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '1.15rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: '950', lineHeight: 1, color: '#e4fb4f' }}>
              {cards.length}
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0a0ab', marginTop: '0.2rem' }}>
              DB Readings
            </div>
          </div>

          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '1.15rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: '950', lineHeight: 1, color: '#e9c7f5' }}>
              21
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0a0ab', marginTop: '0.2rem' }}>
              Core Static
            </div>
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {message && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.1rem 1.4rem',
            borderRadius: '1.25rem',
            marginBottom: '2rem',
            background: message.type === 'success' ? '#d8f5e4' : '#fee2e2',
            color: message.type === 'success' ? '#14532d' : '#991b1b',
            fontWeight: '800',
            fontSize: '0.92rem',
            boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,0.05)',
          }}
          role="status"
        >
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Tab Switcher: Single vs Bulk */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.35rem',
          borderRadius: '999px',
          background: '#ededf0',
          width: 'max-content',
          marginBottom: '2rem',
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('single')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.35rem',
            borderRadius: '999px',
            border: 0,
            background: activeTab === 'single' ? '#17181d' : 'transparent',
            color: activeTab === 'single' ? '#fff' : '#686976',
            fontWeight: '900',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <FileText size={16} /> Single Lesson
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bulk')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.35rem',
            borderRadius: '999px',
            border: 0,
            background: activeTab === 'bulk' ? '#7168ed' : 'transparent',
            color: activeTab === 'bulk' ? '#fff' : '#686976',
            fontWeight: '900',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <FileSpreadsheet size={16} /> Bulk JSON Upload
        </button>
      </div>

      {/* TAB 1: Single Lesson Form */}
      {activeTab === 'single' && (
        <section
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '1.75rem',
            padding: '2rem clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 0.8rem 2.5rem rgba(23, 24, 29, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.45rem', margin: 0, letterSpacing: '-0.04em' }}>Draft & Publish</h2>
              <p style={{ margin: '0.2rem 0 0', color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                Fill out the editorial fields below.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: previewMode ? '#f4f0ff' : '#fff',
                color: previewMode ? '#7168ed' : 'var(--foreground)',
                fontWeight: '900',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <Eye size={14} /> {previewMode ? 'Hide Preview' : 'Live Card Preview'}
            </button>
          </div>

          <form onSubmit={handlePublishSingle} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  THEME CATEGORY
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CardType)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: '#fbfbf8',
                    fontWeight: '800',
                  }}
                >
                  <option value="IDEA">IDEA (Lime accent)</option>
                  <option value="LIFE">LIFE (Lavender accent)</option>
                  <option value="BOOK">BOOK (Warm amber accent)</option>
                  <option value="HISTORY">HISTORY (Periwinkle accent)</option>
                  <option value="TEACHING">TEACHING (Green accent)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  ESTIMATED READ TIME
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 3 min read"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.85rem',
                    border: '1px solid var(--border)',
                    background: '#fbfbf8',
                    fontWeight: '700',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                HEADLINE / TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grace is power, not permission"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontSize: '1.05rem',
                  fontWeight: '850',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                SOURCE OR AUTHOR
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Dietrich Bonhoeffer (The Cost of Discipleship)"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontWeight: '700',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                CARD PREVIEW BODY (~45 TO 60 WORDS)
              </label>
              <textarea
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="A concise, compelling overview of the core insight shown on the browse card..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontFamily: 'inherit',
                  lineHeight: 1.5,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                PULL QUOTE (FOR DETAIL PAGE & SOCIAL SHARE CARD)
              </label>
              <input
                type="text"
                value={pullQuote}
                onChange={(e) => setPullQuote(e.target.value)}
                placeholder="e.g. Cheap grace is the deadly enemy of our church."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontWeight: '700',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                ACTIONABLE TAKEAWAY
              </label>
              <input
                type="text"
                value={takeaway}
                onChange={(e) => setTakeaway(e.target.value)}
                placeholder="e.g. Grace is not an excuse to stay the same. It makes transformation possible."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontWeight: '700',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                FULL READING BODY (SEPARATE PARAGRAPHS WITH BLANK LINES)
              </label>
              <textarea
                rows={7}
                value={fullBodyText}
                onChange={(e) => setFullBodyText(e.target.value)}
                placeholder="Paragraph 1: Historical context and tension...&#10;&#10;Paragraph 2: The story or insight...&#10;&#10;Paragraph 3: How it applies to modern life..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontFamily: 'inherit',
                  lineHeight: 1.6,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '0.95rem 1.5rem',
                borderRadius: '999px',
                background: '#17181d',
                color: '#fff',
                fontWeight: '900',
                border: 0,
                cursor: submitting ? 'wait' : 'pointer',
                marginTop: '0.5rem',
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Publishing reading...
                </>
              ) : (
                <>
                  <PlusCircle size={18} /> Publish to Live App
                </>
              )}
            </button>
          </form>

          {/* Live Preview */}
          {previewMode && (
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', border: '2px dashed var(--periwinkle)', borderRadius: '1.25rem', background: '#faf9fd' }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>LIVE PREVIEW (HOW IT LOOKS IN FEED)</p>
              <article className={`learning-card card-type-${type.toLowerCase()}`}>
                <div className="card-meta">
                  <span>{type}</span>
                  <span>{time}</span>
                </div>
                <h3>{title || 'Card Headline Preview'}</h3>
                <p className="card-source">{source || 'Author Name'}</p>
                <p>{body || 'Preview summary text will appear here...'}</p>
              </article>
            </div>
          )}
        </section>
      )}

      {/* TAB 2: Bulk JSON Upload */}
      {activeTab === 'bulk' && (
        <section
          style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '1.75rem',
            padding: '2rem clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 0.8rem 2.5rem rgba(23, 24, 29, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.45rem', margin: 0, letterSpacing: '-0.04em' }}>Bulk JSON Upload</h2>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    type="button"
                    onClick={() => setShowTooltip(!showTooltip)}
                    style={{ background: 'transparent', border: 0, cursor: 'pointer', padding: '0.2rem', color: '#7168ed' }}
                    title="View format instructions"
                  >
                    <HelpCircle size={18} />
                  </button>

                  {showTooltip && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '1.8rem',
                        top: '-1rem',
                        width: '20rem',
                        padding: '1rem',
                        borderRadius: '0.85rem',
                        background: '#17181d',
                        color: '#fff',
                        fontSize: '0.78rem',
                        lineHeight: 1.45,
                        zIndex: 30,
                        boxShadow: '0 1rem 2rem rgba(0,0,0,0.25)',
                      }}
                    >
                      <b>Format rules:</b> Paste an array of JSON objects. Each item must have: <code>type</code>, <code>title</code>, <code>source</code>, <code>time</code>, <code>body</code>, <code>pullQuote</code>, <code>takeaway</code>, and <code>fullBody</code> (array of paragraphs).
                    </div>
                  )}
                </div>
              </div>
              <p style={{ margin: '0.2rem 0 0', color: 'var(--muted-foreground)', fontSize: '0.85rem' }}>
                Paste batches of cards generated by ChatGPT or Claude to publish multiple lessons at once.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyTemplate}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: copiedTemplate ? '#d8f5e4' : '#fbfbf8',
                color: copiedTemplate ? '#14532d' : 'var(--foreground)',
                fontWeight: '900',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <Copy size={14} /> {copiedTemplate ? 'Copied template!' : 'Copy sample JSON template'}
            </button>
          </div>

          <form onSubmit={handlePublishBulk} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                JSON DATA ARRAY
              </label>
              <textarea
                rows={12}
                value={bulkJson}
                onChange={(e) => setBulkJson(e.target.value)}
                placeholder={BULK_JSON_TEMPLATE}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border)',
                  background: '#fbfbf8',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '0.95rem 1.5rem',
                borderRadius: '999px',
                background: '#7168ed',
                color: '#fff',
                fontWeight: '900',
                border: 0,
                cursor: submitting ? 'wait' : 'pointer',
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Uploading and validating...
                </>
              ) : (
                <>
                  <UploadCloud size={18} /> Parse and Publish Batch to Live App
                </>
              )}
            </button>
          </form>
        </section>
      )}

      {/* Published Readings Inventory */}
      <section style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="eyebrow">DATABASE INVENTORY</span>
            <h2 style={{ fontSize: '1.65rem', margin: '0.2rem 0 0', letterSpacing: '-0.04em' }}>
              Live Published Cards ({cards.length})
            </h2>
          </div>
        </div>

        {cards.length === 0 ? (
          <div
            style={{
              padding: '2.5rem',
              textAlign: 'center',
              borderRadius: '1.5rem',
              background: '#fff',
              border: '1px dashed var(--border)',
              color: 'var(--muted-foreground)',
            }}
          >
            <Database size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
            <p style={{ margin: 0, fontWeight: '700' }}>No database cards published yet.</p>
            <small>Publish a single card or bulk upload a batch to see them here.</small>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            {cards.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.1rem 1.4rem',
                  borderRadius: '1.15rem',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  boxShadow: '0 0.4rem 1.2rem rgba(23, 24, 29, 0.03)',
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px',
                      fontSize: '0.62rem',
                      fontWeight: '950',
                      letterSpacing: '0.08em',
                      background: '#f4f0ff',
                      color: '#7168ed',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {c.type} · {c.time}
                  </span>
                  <h3 style={{ margin: '0.1rem 0 0.2rem', fontSize: '1.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.title}
                  </h3>
                  <span style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem', fontWeight: '700' }}>
                    {c.source}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
                  <Link
                    href={`/learn/${c.id}`}
                    target="_blank"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.5rem 0.9rem',
                      borderRadius: '999px',
                      background: '#f4f0ff',
                      color: '#7168ed',
                      fontSize: '0.78rem',
                      fontWeight: '900',
                      textDecoration: 'none',
                    }}
                  >
                    Live <ExternalLink size={13} />
                  </Link>

                  <button
                    onClick={() => handleDelete(c.id, c.title)}
                    style={{
                      display: 'grid',
                      placeItems: 'center',
                      width: '2.1rem',
                      height: '2.1rem',
                      borderRadius: '50%',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      background: 'rgba(239, 68, 68, 0.05)',
                      color: '#ef4444',
                      cursor: 'pointer',
                    }}
                    title="Delete reading"
                  >
                    <Trash2 size={15} />
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
