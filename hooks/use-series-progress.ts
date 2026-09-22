'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'yadesh_series_progress_v1'

type SeriesProgressMap = Record<string, number[]> // slug -> completed day numbers

export function useSeriesProgress(slug: string) {
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const map: SeriesProgressMap = raw ? JSON.parse(raw) : {}
      setCompletedDays(map[slug] ?? [])
    } catch {
      setCompletedDays([])
    } finally {
      setIsLoaded(true)
    }
  }, [slug])

  const markDayComplete = useCallback((day: number) => {
    setCompletedDays((prev) => {
      if (prev.includes(day)) return prev
      const next = [...prev, day].sort((a, b) => a - b)
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const map: SeriesProgressMap = raw ? JSON.parse(raw) : {}
        map[slug] = next
        localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
      } catch {}
      return next
    })
  }, [slug])

  const isDayComplete = useCallback((day: number) => completedDays.includes(day), [completedDays])

  // Next unlocked day: first incomplete day (days are sequential)
  const nextDay = completedDays.length + 1

  const progressPercent = Math.round((completedDays.length / 21) * 100)

  return { completedDays, isLoaded, markDayComplete, isDayComplete, nextDay, progressPercent }
}
