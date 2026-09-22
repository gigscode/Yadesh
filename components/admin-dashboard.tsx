'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { revalidateContent } from '@/app/actions/revalidate-content'
import {
  PlusCircle,
  Trash2,
  CheckCircle2,
  Check,
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

type CardType = 'FAITH' | 'MIRACLE' | 'TEACHING' | 'LIFE' | 'HISTORY' | 'BOOK' | 'PERSON' | 'STORY' | 'IDEA'

type AdminDashboardProps = {
  userEmail: string
  initialCards: any[]
}

const BULK_LESSONS_TEMPLATE = `[
  {
    "type": "MIRACLE",
    "title": "The Believer's Authority in Healing",
    "source": "Kenneth E. Hagin",
    "time": "3 min read",
    "body": "Bedridden as a teenager with a deformed heart, Kenneth Hagin took Mark 11:23-24 literally, received his healing, and spent six decades teaching that God's power is real today.",
    "pullQuote": "Faith begins where the will of God is known.",
    "takeaway": "God's healing power does not depend on human strength. It answers bold, humble trust in His Word.",
    "fullBody": [
      "Kenneth E. Hagin was informed by doctors at age fifteen that he was hopelessly paralyzed.",
      "During sixteen months confined to bed, he immersed himself in scripture, discovering that believing precedes seeing.",
      "He stood up on paralyzed legs by faith and was instantly restored, going on to minister worldwide.",
      "His life reminds us that signs and wonders follow those who take God at His Word."
    ]
  },
  {
    "type": "FAITH",
    "title": "Grace and Faith in Receiving Healing",
    "source": "Andrew Wommack",
    "time": "3 min read",
    "body": "Andrew Wommack taught that healing is not something God doles out reluctantly. Through the cross, grace has already provided it, and faith simply receives it.",
    "pullQuote": "Faith does not force God to move. Faith receives what God has already provided through grace.",
    "takeaway": "Stop begging God to heal. Rest in Christ's finished work and receive with thanksgiving.",
    "fullBody": [
      "Many Christians spend years begging God for healing, wondering if it is His will.",
      "At Calvary, Jesus bore both our sins and our sicknesses according to 1 Peter 2:24.",
      "Faith is the hand that receives what grace has already established.",
      "Resting in His finished work unlocks peace and divine health."
    ]
  }
]`

const BULK_BOOKS_TEMPLATE = `[
  {
    "type": "BOOK",
    "title": "The Authority of the Believer",
    "source": "Kenneth E. Hagin",
    "time": "4 min read",
    "body": "Christians do not need to beg God for authority over darkness and sickness; Jesus already delegated His legal authority to every believer on earth.",
    "pullQuote": "The authority that belongs to Christ also belongs to the Church, because the Church is His body.",
    "takeaway": "Identify any area in your life where you have been passively waiting, and begin exercising your authority in Jesus' name.",
    "fullBody": [
      "Kenneth E. Hagin challenges passive religion: believers are seated with Christ in heavenly places far above all demonic power.",
      "Just as a traffic officer stops ten-ton trucks by the authority of the state, a believer resists darkness backed by Jesus' name.",
      "The authority must be exercised; God will not speak the Word of command for you.",
      "Stand on your New Covenant rights and command the adversary to loose his hold."
    ]
  }
]`

const BULK_PEOPLE_TEMPLATE = `[
  {
    "type": "PERSON",
    "title": "Kenneth E. Hagin",
    "source": "Pioneer of Faith Teaching and Divine Healing",
    "time": "1917 to 2003",
    "body": "Known as the father of modern faith teaching, Kenneth E. Hagin spent sixty years ministering across the globe, emphasizing the authority of the believer, divine healing, and the integrity of God's Word.",
    "pullQuote": "Faith begins where the will of God is known.",
    "takeaway": "Kenneth E. Hagin, I Believe in Visions (1972) and I Went to Hell (1982)",
    "fullBody": [
      "In 1933 in McKinney, Texas, fifteen-year-old Kenneth Hagin was completely paralyzed and bedridden with a deformed heart.",
      "During sixteen months confined to bed, his heart stopped beating three times before a divine voice pulled him back.",
      "Meditating on Mark 11:23-24, he realized believing precedes seeing and stepped out of bed permanently healed on August 8, 1934.",
      "He went on to minister worldwide for sixty years and founded RHEMA Bible Training College."
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

  // AI Prompt Helper State
  const [showPromptHelper, setShowPromptHelper] = useState(false)
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [promptCategory, setPromptCategory] = useState<'ALL' | 'MIRACLE' | 'FAITH' | 'TEACHING' | 'HISTORY'>('ALL')
  const [promptNamesMode, setPromptNamesMode] = useState<'SPECIFIC' | 'AUTO'>('SPECIFIC')
  const [promptNamesText, setPromptNamesText] = useState('Kenneth E. Hagin, Andrew Wommack, Charles and Frances Hunter, Smith Wigglesworth')
  const [promptCount, setPromptCount] = useState(5)

  // Single Form State
  const [type, setType] = useState<CardType>('FAITH')
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [time, setTime] = useState('3 min read')
  const [body, setBody] = useState('')
  const [pullQuote, setPullQuote] = useState('')
  const [takeaway, setTakeaway] = useState('')
  const [fullBodyText, setFullBodyText] = useState('')

  // Bulk Upload State
  const [bulkJson, setBulkJson] = useState('')
  const [bulkTemplateType, setBulkTemplateType] = useState<'LESSON' | 'BOOK' | 'PERSON'>('LESSON')

  const generateSlug = (t: string) => {
    return t
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  const getActiveTemplate = () => {
    if (bulkTemplateType === 'BOOK') return BULK_BOOKS_TEMPLATE
    if (bulkTemplateType === 'PERSON') return BULK_PEOPLE_TEMPLATE
    return BULK_LESSONS_TEMPLATE
  }

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(getActiveTemplate())
    setCopiedTemplate(true)
    setTimeout(() => setCopiedTemplate(false), 2000)
  }

  const handleLoadTemplateIntoBox = () => {
    setBulkJson(getActiveTemplate())
  }

  const getGeneratedPrompt = () => {
    const categoryGuidance =
      promptCategory === 'ALL'
        ? 'Include a balanced mix across: FAITH (living convictions and spiritual principles), MIRACLE (signs, wonders, divine healing, and supernatural accounts), TEACHING (biblical depth and discipleship), LIFE (biographies and spiritual walk), and HISTORY (church history and revivals).'
        : promptCategory === 'MIRACLE'
        ? 'Focus exclusively on category "MIRACLE": accounts of divine healing, signs and wonders, supernatural deliverances, and undeniable manifestations of God\'s power confirming the Gospel.'
        : promptCategory === 'FAITH'
        ? 'Focus exclusively on category "FAITH": lessons on spiritual authority, trusting God, the finished work of Christ at Calvary, and believing for the impossible.'
        : `Focus exclusively on category "${promptCategory}".`

    const figuresGuidance =
      promptNamesMode === 'SPECIFIC'
        ? `Generate lessons specifically highlighting these preachers, ministers, or leaders:\n${promptNamesText.trim()}`
        : 'Choose a diverse selection of notable Christian ministers, revivalists, theologians, and church history figures across eras and continents.'

    return `You are an expert Christian writer and historian creating micro-learning lesson cards for Yadesh, a Christian daily habit app.

TASK:
Generate an array of exactly ${promptCount} lessons in valid JSON format.

CATEGORY:
${categoryGuidance}

FIGURES / SOURCES:
${figuresGuidance}

FORMAT RULES:
1. Return ONLY a single raw JSON array of objects. Do not include markdown code fence ticks (\`\`\`json), greetings, or explanations.
2. Each object MUST have these exact fields:
   - "type": One of "FAITH", "MIRACLE", "TEACHING", "LIFE", "HISTORY", "BOOK", "PERSON"
   - "title": A short, gripping headline (4 to 8 words)
   - "source": Name of the author, minister, or movement (e.g. "Kenneth E. Hagin", "Andrew Wommack", "Smith Wigglesworth")
   - "time": Estimated reading time (e.g. "3 min read")
   - "body": 2 to 3 clear, memorable sentences for the preview card
   - "pullQuote": One punchy, unforgettable sentence to anchor the reading
   - "takeaway": One practical sentence applying the truth to daily life
   - "fullBody": An array of 3 to 5 rich paragraphs explaining the account, context, and spiritual lesson
3. IMPORTANT COPY RULE: Do NOT use any em dashes (em dash or en dash) anywhere in the text. Use commas, colons, or periods instead.
4. Ensure all biographical, historical, and biblical details are accurate and uplifting.`
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(getGeneratedPrompt())
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2500)
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

      // Clear server cache so /learn and /explore show the new card immediately
      await revalidateContent()
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

        const validTypes: CardType[] = ['FAITH', 'MIRACLE', 'TEACHING', 'LIFE', 'HISTORY', 'BOOK', 'PERSON', 'STORY', 'IDEA']
        const cardType = (item.type || 'FAITH').toUpperCase() as CardType
        const normalizedType = validTypes.includes(cardType)
          ? (cardType === 'IDEA' ? 'FAITH' : cardType)
          : 'FAITH'

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
      await revalidateContent()
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
      await revalidateContent()
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
                  <option value="FAITH">FAITH (Living convictions & spiritual principles)</option>
                  <option value="MIRACLE">MIRACLE (Signs & wonders, divine healing, testimonies)</option>
                  <option value="TEACHING">TEACHING (Discipleship & biblical depth)</option>
                  <option value="LIFE">LIFE (Christian biography & spiritual walk)</option>
                  <option value="HISTORY">HISTORY (Church history, revivals & martyrs)</option>
                  <option value="BOOK">BOOK (Classic Christian literature)</option>
                  <option value="PERSON">PERSON (Pastor, leader, revivalist verified profile)</option>
                  <option value="STORY">STORY (Parables & illustrations)</option>
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

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowPromptHelper(!showPromptHelper)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.6rem 1.1rem',
                  borderRadius: '999px',
                  border: '1px solid #7168ed',
                  background: showPromptHelper ? '#7168ed' : '#f5f4fe',
                  color: showPromptHelper ? '#fff' : '#7168ed',
                  fontWeight: '900',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Sparkles size={14} /> {showPromptHelper ? 'Hide Prompt Generator' : 'AI Prompt Generator for ChatGPT/Claude'}
              </button>

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
          </div>

          {/* AI Prompt Generator Panel */}
          {showPromptHelper && (
            <div
              style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                borderRadius: '1.25rem',
                background: '#f8f7ff',
                border: '1px solid rgba(113, 104, 237, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Sparkles size={18} style={{ color: '#7168ed' }} />
                <h3 style={{ margin: 0, fontSize: '1.1rem', letterSpacing: '-0.03em' }}>
                  AI Prompt Builder for ChatGPT and Claude
                </h3>
              </div>
              <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                Configure your criteria below, click <b>Copy Prompt</b>, paste it into ChatGPT or Claude, and copy the returned JSON directly into the box below.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                {/* 1. Category Focus */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    1. CATEGORY FOCUS
                  </label>
                  <select
                    value={promptCategory}
                    onChange={(e) => setPromptCategory(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border)',
                      background: '#fff',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                    }}
                  >
                    <option value="ALL">Balanced Mix (All Categories)</option>
                    <option value="MIRACLE">MIRACLE (Signs & wonders, divine healing)</option>
                    <option value="FAITH">FAITH (Spiritual authority, living trust)</option>
                    <option value="TEACHING">TEACHING (Biblical depth & discipleship)</option>
                    <option value="HISTORY">HISTORY (Church history & revivals)</option>
                  </select>
                </div>

                {/* 2. Figures Mode */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    2. PREACHERS / FIGURES
                  </label>
                  <select
                    value={promptNamesMode}
                    onChange={(e) => setPromptNamesMode(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border)',
                      background: '#fff',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                    }}
                  >
                    <option value="SPECIFIC">I have specific names in mind</option>
                    <option value="AUTO">Auto-select diverse Christian leaders</option>
                  </select>
                </div>

                {/* 3. Number of Lessons */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    3. LESSON COUNT
                  </label>
                  <select
                    value={promptCount}
                    onChange={(e) => setPromptCount(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border)',
                      background: '#fff',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                    }}
                  >
                    <option value={3}>3 lessons (Quick test)</option>
                    <option value={5}>5 lessons (Recommended)</option>
                    <option value={10}>10 lessons (Full pack)</option>
                  </select>
                </div>
              </div>

              {/* Specific names textarea if mode is SPECIFIC */}
              {promptNamesMode === 'SPECIFIC' && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    NAMES OF PREACHERS / MINISTERS / EVENTS (SEPARATED BY COMMAS)
                  </label>
                  <input
                    type="text"
                    value={promptNamesText}
                    onChange={(e) => setPromptNamesText(e.target.value)}
                    placeholder="e.g. Kenneth E. Hagin, Andrew Wommack, Smith Wigglesworth, Charles and Frances Hunter"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.75rem',
                      border: '1px solid var(--border)',
                      background: '#fff',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
              )}

              {/* Copy Prompt Button & Preview */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.35rem',
                    borderRadius: '999px',
                    background: copiedPrompt ? '#16a34a' : '#7168ed',
                    color: '#fff',
                    border: 0,
                    fontWeight: '900',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {copiedPrompt ? <Check size={16} /> : <Copy size={16} />}
                  {copiedPrompt ? 'Copied prompt to clipboard!' : 'Copy prompt for ChatGPT or Claude'}
                </button>
                <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>
                  Enforces valid JSON, proper card categories, and zero em dashes.
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handlePublishBulk} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Template Selector Bar */}
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '1.15rem',
                background: '#fcfcfd',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>
                  SELECT CONTENT TYPE TO IMPORT
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={handleCopyTemplate}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '999px',
                      border: '1px solid var(--border)',
                      background: copiedTemplate ? '#d8f5e4' : '#fff',
                      color: copiedTemplate ? '#14532d' : 'var(--foreground)',
                      fontWeight: '800',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Copy size={13} /> {copiedTemplate ? 'Copied template!' : 'Copy Template JSON'}
                  </button>
                  <button
                    type="button"
                    onClick={handleLoadTemplateIntoBox}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '999px',
                      border: '1px solid #7168ed',
                      background: '#f4f0ff',
                      color: '#7168ed',
                      fontWeight: '800',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    <FileText size={13} /> Load Sample into Editor
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => setBulkTemplateType('LESSON')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.85rem',
                    border: bulkTemplateType === 'LESSON' ? '2px solid #7168ed' : '1px solid var(--border)',
                    background: bulkTemplateType === 'LESSON' ? '#f4f0ff' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: '900', fontSize: '0.85rem', color: bulkTemplateType === 'LESSON' ? '#7168ed' : 'var(--foreground)' }}>
                    Daily Lessons
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                    FAITH, MIRACLE, TEACHING
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBulkTemplateType('BOOK')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.85rem',
                    border: bulkTemplateType === 'BOOK' ? '2px solid #7168ed' : '1px solid var(--border)',
                    background: bulkTemplateType === 'BOOK' ? '#f4f0ff' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: '900', fontSize: '0.85rem', color: bulkTemplateType === 'BOOK' ? '#7168ed' : 'var(--foreground)' }}>
                    Book Summaries
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                    Executive summaries (BOOK)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBulkTemplateType('PERSON')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.85rem',
                    border: bulkTemplateType === 'PERSON' ? '2px solid #7168ed' : '1px solid var(--border)',
                    background: bulkTemplateType === 'PERSON' ? '#f4f0ff' : '#fff',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontWeight: '900', fontSize: '0.85rem', color: bulkTemplateType === 'PERSON' ? '#7168ed' : 'var(--foreground)' }}>
                    Pastors & Leaders
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)', marginTop: '0.2rem' }}>
                    Verified profiles (PERSON)
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '950', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                JSON DATA ARRAY ({bulkTemplateType === 'BOOK' ? 'Executive Books' : bulkTemplateType === 'PERSON' ? 'Pastors and Leaders' : 'Daily Lessons'})
              </label>
              <textarea
                rows={12}
                value={bulkJson}
                onChange={(e) => setBulkJson(e.target.value)}
                placeholder={getActiveTemplate()}
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
                    href={c.type === 'BOOK' ? `/books/${c.id}` : c.type === 'PERSON' ? `/people/${c.id}` : `/learn/${c.id}`}
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
