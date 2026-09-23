'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Share2, Download, Check, Sparkles, Smartphone, Square } from 'lucide-react'
import { isPostHogConfigured } from '@/instrumentation-client'
import posthog from 'posthog-js'

interface ShareQuoteModalProps {
  title: string
  quote: string
  source: string
  category?: string
  onClose: () => void
}

type CardFormat = 'square' | 'story'
type CardTheme = 'periwinkle' | 'lime' | 'cream'

export function ShareQuoteModal({
  title,
  quote,
  source,
  category = 'FAITH',
  onClose,
}: ShareQuoteModalProps) {
  const [format, setFormat] = useState<CardFormat>('story')
  const [theme, setTheme] = useState<CardTheme>('periwinkle')
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isSharing, setIsSharing] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Draw card on canvas
  const renderCard = useCallback(() => {
    const isStory = format === 'story'
    const width = 1080
    const height = isStory ? 1920 : 1080

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    // Theme definitions
    const themes = {
      periwinkle: {
        bg: '#17181d',
        cardBg: '#1f2029',
        accent: '#7168ed',
        text: '#ffffff',
        subText: '#a4a5ba',
        border: 'rgba(113, 104, 237, 0.4)',
        pillBg: 'rgba(113, 104, 237, 0.25)',
        pillText: '#e4e2ff',
      },
      lime: {
        bg: '#17181d',
        cardBg: '#1b1d24',
        accent: '#e4fb4f',
        text: '#ffffff',
        subText: '#9da0b5',
        border: 'rgba(228, 251, 79, 0.35)',
        pillBg: '#e4fb4f',
        pillText: '#17181d',
      },
      cream: {
        bg: '#fbfbf8',
        cardBg: '#ffffff',
        accent: '#7168ed',
        text: '#17181d',
        subText: '#6a6b7c',
        border: 'rgba(113, 104, 237, 0.2)',
        pillBg: '#f0eeff',
        pillText: '#7168ed',
      },
    }

    const t = themes[theme]

    // 1. Canvas Background
    ctx.fillStyle = t.bg
    ctx.fillRect(0, 0, width, height)

    // 2. Inner Frame / Card Container
    const margin = isStory ? 90 : 80
    const cardW = width - margin * 2
    const cardH = height - margin * 2

    ctx.fillStyle = t.cardBg
    ctx.beginPath()
    ctx.roundRect(margin, margin, cardW, cardH, 48)
    ctx.fill()

    ctx.strokeStyle = t.border
    ctx.lineWidth = 4
    ctx.stroke()

    // 3. Top Header: Brand & Pill
    const contentX = margin + 80
    let cursorY = margin + 110

    // YADESH Logo Text
    ctx.fillStyle = t.accent
    ctx.font = 'bold 36px Arial, Helvetica, sans-serif'
    ctx.letterSpacing = '0.08em'
    ctx.fillText('YADESH', contentX, cursorY)

    // Subtitle
    ctx.fillStyle = t.subText
    ctx.font = '700 20px Arial, Helvetica, sans-serif'
    ctx.fillText('FIVE MINUTES OF SOMETHING WORTH KNOWING', contentX, cursorY + 36)

    // Category Pill
    const pillY = cursorY + 80
    const pillText = (category || 'DAILY WISDOM').toUpperCase()
    ctx.font = '900 22px Arial, Helvetica, sans-serif'
    const pillMetrics = ctx.measureText(pillText)
    const pillW = pillMetrics.width + 36
    const pillH = 44

    ctx.fillStyle = t.pillBg
    ctx.beginPath()
    ctx.roundRect(contentX, pillY, pillW, pillH, 999)
    ctx.fill()

    ctx.fillStyle = t.pillText
    ctx.fillText(pillText, contentX + 18, pillY + 30)

    // 4. Quote Body
    const quoteText = `"${quote || title}"`
    const maxTextW = cardW - 160
    ctx.fillStyle = t.text
    ctx.font = isStory
      ? 'bold 54px Arial Black, Arial, Helvetica, sans-serif'
      : 'bold 44px Arial Black, Arial, Helvetica, sans-serif'

    const words = quoteText.split(' ')
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxTextW && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)

    // Position quote vertically
    const lineHeight = isStory ? 80 : 66
    const totalQuoteHeight = lines.length * lineHeight
    const availableHeight = cardH - 520
    const startQuoteY = margin + 340 + Math.max(0, (availableHeight - totalQuoteHeight) / 2)

    lines.forEach((line, index) => {
      ctx.fillText(line, contentX, startQuoteY + index * lineHeight)
    })

    // 5. Author Attribution
    const authorY = startQuoteY + totalQuoteHeight + 70
    ctx.fillStyle = t.accent
    ctx.font = 'bold 36px Arial, Helvetica, sans-serif'
    ctx.fillText(`· ${source}`, contentX, authorY)

    // 6. Bottom Call to Action
    const footerY = margin + cardH - 70
    ctx.fillStyle = t.subText
    ctx.font = '700 24px Arial, Helvetica, sans-serif'
    ctx.fillText('Read in 3 minutes on yadesh.com', contentX, footerY)

    return canvas.toDataURL('image/png')
  }, [format, theme, quote, title, source, category])

  // Update preview on changes
  useEffect(() => {
    const dataUrl = renderCard()
    setPreviewUrl(dataUrl)
  }, [renderCard])

  // Native share or download
  const handleShare = async () => {
    setIsSharing(true)
    try {
      const dataUrl = renderCard()
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const fileName = `yadesh-${source.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-quote.png`
      const file = new File([blob], fileName, { type: 'image/png' })

      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({
          files: [file],
          title: `${title} | Yadesh`,
          text: `"${quote}" - ${source} on Yadesh`,
          url: 'https://yadesh.com',
        })
        if (isPostHogConfigured) {
          posthog.capture('quote_graphic_shared', { share_method: 'native', format, theme, category })
        }
      } else {
        // Fallback: direct download
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        if (isPostHogConfigured) {
          posthog.capture('quote_graphic_shared', { share_method: 'download_fallback', format, theme, category })
        }
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2500)
      }
    } catch {
      // User cancelled share
    } finally {
      setIsSharing(false)
    }
  }

  const handleDownload = () => {
    const dataUrl = renderCard()
    const fileName = `yadesh-${source.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-quote.png`
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    if (isPostHogConfigured) {
      posthog.capture('quote_graphic_downloaded', { format, theme, category })
    }
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2500)
  }

  return (
    <div className="share-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="share-modal-title">
      <div className="share-modal-container">
        {/* Header */}
        <div className="share-modal-head">
          <div className="share-modal-title-group">
            <Sparkles size={16} className="share-sparkle-icon" aria-hidden="true" />
            <h3 id="share-modal-title">Share Quote Graphic</h3>
          </div>
          <button type="button" className="share-close-btn" onClick={onClose} aria-label="Close share builder">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Content area: Preview & Controls */}
        <div className="share-modal-body">
          {/* Live Preview Display */}
          <div className="share-preview-wrapper">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Quote graphic preview"
                className={`share-preview-img ${format === 'story' ? 'aspect-story' : 'aspect-square'}`}
              />
            ) : (
              <div className="share-preview-placeholder">Rendering preview...</div>
            )}
          </div>

          {/* Customization Controls */}
          <div className="share-controls">
            {/* Format Switcher */}
            <div className="share-control-group">
              <label className="share-control-label">Aspect Ratio</label>
              <div className="share-toggle-row">
                <button
                  type="button"
                  className={`share-format-btn ${format === 'story' ? 'active' : ''}`}
                  onClick={() => setFormat('story')}
                >
                  <Smartphone size={14} aria-hidden="true" />
                  <span>Story (9:16)</span>
                </button>
                <button
                  type="button"
                  className={`share-format-btn ${format === 'square' ? 'active' : ''}`}
                  onClick={() => setFormat('square')}
                >
                  <Square size={14} aria-hidden="true" />
                  <span>Square (1:1)</span>
                </button>
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="share-control-group">
              <label className="share-control-label">Color Theme</label>
              <div className="share-theme-row">
                <button
                  type="button"
                  className={`share-theme-chip ${theme === 'periwinkle' ? 'active' : ''}`}
                  onClick={() => setTheme('periwinkle')}
                  title="Deep Periwinkle"
                >
                  <span className="theme-dot periwinkle-dot" />
                  <span>Periwinkle</span>
                </button>
                <button
                  type="button"
                  className={`share-theme-chip ${theme === 'lime' ? 'active' : ''}`}
                  onClick={() => setTheme('lime')}
                  title="Lime Dark"
                >
                  <span className="theme-dot lime-dot" />
                  <span>Lime Dark</span>
                </button>
                <button
                  type="button"
                  className={`share-theme-chip ${theme === 'cream' ? 'active' : ''}`}
                  onClick={() => setTheme('cream')}
                  title="Warm Minimal"
                >
                  <span className="theme-dot cream-dot" />
                  <span>Warm Cream</span>
                </button>
              </div>
            </div>

            <p className="share-note">
              100% client-generated in crisp 1080p resolution. Ready for Instagram Stories, WhatsApp, and X.
            </p>

            {/* Actions */}
            <div className="share-action-buttons">
              <button
                type="button"
                className="share-main-btn"
                onClick={handleShare}
                disabled={isSharing}
              >
                <Share2 size={16} aria-hidden="true" />
                <span>{isSharing ? 'Sharing...' : 'Share Graphic'}</span>
              </button>
              <button
                type="button"
                className="share-secondary-btn"
                onClick={handleDownload}
              >
                {isCopied ? <Check size={16} aria-hidden="true" /> : <Download size={16} aria-hidden="true" />}
                <span>{isCopied ? 'Saved!' : 'Download PNG'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
