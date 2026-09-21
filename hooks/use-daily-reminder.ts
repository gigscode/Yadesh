'use client'

import { useEffect, useState, useCallback } from 'react'

export type ReminderPreset = 'morning' | 'commute' | 'midday' | 'evening' | 'custom'

export interface ReminderSettings {
  enabled: boolean
  time: string
  preset: ReminderPreset
}

const STORAGE_KEY = 'yadesh_reminder_settings_v1'
const LAST_NOTIFIED_KEY = 'yadesh_last_notified_date'

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: false,
  time: '08:00',
  preset: 'morning',
}

export function useDailyReminder() {
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS)
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default')
  const [isLoaded, setIsLoaded] = useState(false)
  const [testSent, setTestSent] = useState(false)

  // Initialize from client storage and check notification support
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!('Notification' in window)) {
      setPermission('unsupported')
    } else {
      setPermission(Notification.permission)
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      }
    } catch {
      // Fallback to defaults if parsing fails
    }

    setIsLoaded(true)
  }, [])

  // Persist settings changes
  const updateSettings = useCallback((newSettings: Partial<ReminderSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {
        // Safe fallback
      }
      return updated
    })
  }, [])

  // Request browser notification permission
  const requestPermission = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setPermission('unsupported')
      return 'unsupported'
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      if (result === 'granted') {
        updateSettings({ enabled: true })
      }
      return result
    } catch {
      return 'denied' as NotificationPermission
    }
  }, [updateSettings])

  // Send a test notification
  const sendTestNotification = useCallback(async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) return false

    if (Notification.permission !== 'granted') {
      const result = await requestPermission()
      if (result !== 'granted') return false
    }

    const title = 'Yadesh: Daily Reading'
    const options: NotificationOptions = {
      body: 'Trade scrolling. Feed your faith. Your 3-minute lesson is ready.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-192x192.png',
      tag: 'yadesh-test-notification',
      data: { url: '/learn' },
    }

    try {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready
        if (reg && 'showNotification' in reg) {
          await reg.showNotification(title, options)
          setTestSent(true)
          setTimeout(() => setTestSent(false), 3000)
          return true
        }
      }
      new Notification(title, options)
      setTestSent(true)
      setTimeout(() => setTestSent(false), 3000)
      return true
    } catch {
      return false
    }
  }, [requestPermission])

  // Check scheduled reminder when app is active
  useEffect(() => {
    if (!settings.enabled || permission !== 'granted' || typeof window === 'undefined') return

    const checkReminder = () => {
      const now = new Date()
      const currentHours = String(now.getHours()).padStart(2, '0')
      const currentMinutes = String(now.getMinutes()).padStart(2, '0')
      const currentTime = `${currentHours}:${currentMinutes}`
      const todayDate = now.toISOString().slice(0, 10)

      const lastNotified = localStorage.getItem(LAST_NOTIFIED_KEY)
      if (lastNotified === todayDate) return

      if (currentTime >= settings.time) {
        // Trigger notification
        if ('Notification' in window && Notification.permission === 'granted') {
          const title = 'Yadesh: Today is ready'
          const options: NotificationOptions = {
            body: 'Five minutes of quiet wisdom from Christian history and thought.',
            icon: '/icons/icon-192x192.png',
            tag: 'yadesh-daily-reading',
            data: { url: '/learn' },
          }

          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then((reg) => {
              reg.showNotification(title, options)
            })
          } else {
            new Notification(title, options)
          }

          localStorage.setItem(LAST_NOTIFIED_KEY, todayDate)
        }
      }
    }

    checkReminder()
    const interval = setInterval(checkReminder, 60000)
    return () => clearInterval(interval)
  }, [settings.enabled, settings.time, permission])

  // Calendar fallback: Generate a Google Calendar recurring link
  const getGoogleCalendarUrl = useCallback(() => {
    const [hours, minutes] = settings.time.split(':').map(Number)
    const now = new Date()
    now.setHours(hours, minutes, 0, 0)

    const formatGCal = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '')

    const start = formatGCal(now)
    const end = formatGCal(new Date(now.getTime() + 10 * 60000))

    const title = encodeURIComponent('Yadesh: Daily Reading Habit')
    const details = encodeURIComponent(
      'Trade scrolling. Feed your faith. Open your 3-minute reading at: https://yadesh.app/learn'
    )
    const recur = encodeURIComponent('RRULE:FREQ=DAILY')

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${start}/${end}&recur=${recur}`
  }, [settings.time])

  // Calendar fallback: Download .ics file for Apple Calendar / Outlook
  const downloadIcsFile = useCallback(() => {
    if (typeof window === 'undefined') return

    const [hours, minutes] = settings.time.split(':').map(Number)
    const now = new Date()
    now.setHours(hours, minutes, 0, 0)

    const pad = (n: number) => String(n).padStart(2, '0')
    const startStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(hours)}${pad(minutes)}00`

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Yadesh//Daily Reading Habit//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:Yadesh: Daily Reading Habit`,
      `DESCRIPTION:Trade scrolling. Feed your faith. Five minutes of quiet wisdom: https://yadesh.app/learn`,
      `DTSTART:${startStr}`,
      `RRULE:FREQ=DAILY`,
      'DURATION:PT10M',
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      'DESCRIPTION:Time for your Yadesh daily reading',
      'TRIGGER:-PT0M',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'yadesh-daily-reading.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [settings.time])

  return {
    settings,
    permission,
    isLoaded,
    testSent,
    updateSettings,
    requestPermission,
    sendTestNotification,
    getGoogleCalendarUrl,
    downloadIcsFile,
  }
}

