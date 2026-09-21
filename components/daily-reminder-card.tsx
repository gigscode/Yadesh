'use client'

import { useState } from 'react'
import {
  Bell,
  BellRing,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Check,
  Send,
} from 'lucide-react'
import {
  useDailyReminder,
  type ReminderPreset,
} from '@/hooks/use-daily-reminder'

const PRESETS: { preset: ReminderPreset; label: string; time: string; note: string }[] = [
  { preset: 'morning', label: '7:00 AM', time: '07:00', note: 'Morning focus' },
  { preset: 'commute', label: '8:30 AM', time: '08:30', note: 'Commute' },
  { preset: 'midday', label: '1:00 PM', time: '13:00', note: 'Midday reset' },
  { preset: 'evening', label: '9:00 PM', time: '21:00', note: 'Evening reflection' },
]

export function DailyReminderCard() {
  const {
    settings,
    permission,
    isLoaded,
    testSent,
    updateSettings,
    requestPermission,
    sendTestNotification,
    getGoogleCalendarUrl,
    downloadIcsFile,
  } = useDailyReminder()

  const [requesting, setRequesting] = useState(false)
  const [copiedCalendar, setCopiedCalendar] = useState(false)

  if (!isLoaded) return null

  const handleToggle = async () => {
    if (!settings.enabled) {
      if (permission !== 'granted') {
        setRequesting(true)
        const res = await requestPermission()
        setRequesting(false)
        if (res === 'granted') {
          updateSettings({ enabled: true })
        } else {
          // Enable locally so calendar alerts still work
          updateSettings({ enabled: true })
        }
      } else {
        updateSettings({ enabled: true })
      }
    } else {
      updateSettings({ enabled: false })
    }
  }

  const handleSelectPreset = (preset: ReminderPreset, time: string) => {
    updateSettings({ preset, time })
  }

  const handleCustomTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ preset: 'custom', time: e.target.value })
  }

  return (
    <section className="you-summary" aria-labelledby="reminder-title" style={{ marginTop: '1.25rem' }}>
      <div className="you-section-heading" style={{ alignItems: 'center' }}>
        <div>
          <p className="eyebrow">DAILY RHYTHM</p>
          <h2 id="reminder-title" style={{ margin: '0.25rem 0 0.4rem', fontSize: 'clamp(1.4rem, 4vw, 1.9rem)' }}>
            Reading Reminder
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted-foreground)', maxWidth: '28rem' }}>
            Set a dedicated daily prompt to protect your quiet time from scrolling.
          </p>
        </div>

        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={settings.enabled}
          onClick={handleToggle}
          disabled={requesting}
          style={{
            position: 'relative',
            width: '3.25rem',
            height: '1.85rem',
            borderRadius: '999px',
            background: settings.enabled ? '#7168ed' : '#dcdde2',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.2s ease',
            padding: '2px',
          }}
          title={settings.enabled ? 'Turn off daily reminder' : 'Turn on daily reminder'}
        >
          <span
            style={{
              display: 'block',
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              transform: settings.enabled ? 'translateX(1.4rem)' : 'translateX(2px)',
              transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
          />
        </button>
      </div>

      {settings.enabled && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(23,24,29,0.08)', paddingTop: '1.25rem' }}>
          {/* Time Picker Chips */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted-foreground)', marginBottom: '0.5rem' }}>
              Choose your reading window
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              {PRESETS.map((p) => {
                const isSelected = settings.preset === p.preset && settings.time === p.time
                return (
                  <button
                    key={p.preset}
                    type="button"
                    onClick={() => handleSelectPreset(p.preset, p.time)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      border: isSelected ? '1px solid #7168ed' : '1px solid rgba(23,24,29,0.12)',
                      background: isSelected ? '#7168ed' : '#fff',
                      color: isSelected ? '#fff' : 'var(--foreground)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>{p.label}</span>
                    <span style={{ fontSize: '0.72rem', opacity: isSelected ? 0.9 : 0.6 }}>({p.note})</span>
                  </button>
                )
              })}

              {/* Custom time input */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  border: settings.preset === 'custom' ? '1px solid #7168ed' : '1px solid rgba(23,24,29,0.12)',
                  background: settings.preset === 'custom' ? '#f5f4fe' : '#fff',
                }}
              >
                <Clock size={13} style={{ color: '#7168ed' }} />
                <input
                  type="time"
                  value={settings.time}
                  onChange={handleCustomTime}
                  aria-label="Custom reminder time"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontFamily: 'inherit',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Device notification status banner */}
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '0.85rem',
              background: permission === 'granted' ? '#f0fdf4' : permission === 'denied' ? '#fef2f2' : '#f8f8fb',
              border: `1px solid ${
                permission === 'granted' ? '#bbf7d0' : permission === 'denied' ? '#fecaca' : 'rgba(23,24,29,0.08)'
              }`,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {permission === 'granted' ? (
                <CheckCircle2 size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
              ) : permission === 'denied' ? (
                <AlertCircle size={16} style={{ color: '#dc2626', flexShrink: 0 }} />
              ) : (
                <Bell size={16} style={{ color: '#7168ed', flexShrink: 0 }} />
              )}

              <span style={{ fontSize: '0.85rem', color: 'var(--foreground)' }}>
                {permission === 'granted' && 'Push notifications active for this device at ' + settings.time + '.'}
                {permission === 'denied' && 'Browser notifications are blocked. You can re-enable in site permissions.'}
                {permission === 'default' && 'Allow browser notifications so Yadesh can alert you on this device.'}
                {permission === 'unsupported' && 'Notifications not directly supported in this browser. Use Calendar below.'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {permission === 'default' && (
                <button
                  type="button"
                  onClick={requestPermission}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    background: '#7168ed',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <BellRing size={13} />
                  Enable push
                </button>
              )}

              {permission === 'granted' && (
                <button
                  type="button"
                  onClick={sendTestNotification}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    background: testSent ? '#16a34a' : '#fff',
                    color: testSent ? '#fff' : 'var(--foreground)',
                    border: '1px solid rgba(23,24,29,0.15)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {testSent ? (
                    <>
                      <Check size={13} />
                      Sent to device
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      Test alert
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Calendar Sync Fallback: 100% Reliable across all phones */}
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '0.85rem',
              background: '#fbfcff',
              border: '1px dashed rgba(113, 104, 237, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Calendar size={15} style={{ color: '#7168ed' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--foreground)' }}>
                Guaranteed daily alarm via your phone calendar
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted-foreground)', lineHeight: 1.4 }}>
              If your phone silences browser push alerts, sync a daily 10-minute quiet block directly to your calendar app.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: '#fff',
                  border: '1px solid rgba(23,24,29,0.15)',
                  color: 'var(--foreground)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                Add to Google Calendar ↗
              </a>

              <button
                type="button"
                onClick={downloadIcsFile}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: '#fff',
                  border: '1px solid rgba(23,24,29,0.15)',
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <Smartphone size={12} />
                Download Apple or Outlook .ics
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

