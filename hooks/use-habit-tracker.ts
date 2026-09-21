'use client'

import { useEffect, useState } from 'react'

const HABIT_STORAGE_KEY = 'yadesh_habit_stats_v1'

export type HabitStats = {
  streak: number
  lastActiveDate: string | null // ISO date string: YYYY-MM-DD
  minutesLearned: number
  readingsCompleted: string[] // array of content keys
}

function getTodayString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getYesterdayString(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const DEFAULT_STATS: HabitStats = {
  streak: 0,
  lastActiveDate: null,
  minutesLearned: 0,
  readingsCompleted: [],
}

export function useHabitTracker() {
  const [stats, setStats] = useState<HabitStats>(DEFAULT_STATS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HABIT_STORAGE_KEY)
      if (raw) {
        const parsed: HabitStats = JSON.parse(raw)
        const today = getTodayString()
        const yesterday = getYesterdayString()

        // Check if streak was broken (last active was before yesterday)
        let activeStreak = parsed.streak
        if (parsed.lastActiveDate && parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
          activeStreak = 0
        }

        const normalized: HabitStats = {
          ...parsed,
          streak: activeStreak,
        }
        setStats(normalized)
      } else {
        setIsLoaded(true)
      }
    } catch {
      // Fallback gracefully on storage error
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Mark a card as completed, recalculating streak and minutes
  const logReadingCompleted = (contentKey: string, minutes: number = 3): { streakUpdated: boolean; newStreak: number } => {
    const today = getTodayString()
    const yesterday = getYesterdayString()

    const alreadyRead = stats.readingsCompleted.includes(contentKey)
    const isNewDayActivity = stats.lastActiveDate !== today

    let nextStreak = stats.streak
    if (isNewDayActivity) {
      if (stats.lastActiveDate === yesterday) {
        nextStreak += 1
      } else {
        // Started fresh or first day
        nextStreak = 1
      }
    }

    const nextReadings = alreadyRead
      ? stats.readingsCompleted
      : [...stats.readingsCompleted, contentKey]

    const nextMinutes = alreadyRead
      ? stats.minutesLearned
      : stats.minutesLearned + minutes

    const updatedStats: HabitStats = {
      streak: nextStreak,
      lastActiveDate: today,
      minutesLearned: nextMinutes,
      readingsCompleted: nextReadings,
    }

    try {
      localStorage.setItem(HABIT_STORAGE_KEY, JSON.stringify(updatedStats))
      setStats(updatedStats)
    } catch {
      // Storage error safeguard
    }

    return { streakUpdated: isNewDayActivity, newStreak: nextStreak }
  }

  // Toggle or check if specific card is marked as read
  const isCardRead = (contentKey: string): boolean => {
    return stats.readingsCompleted.includes(contentKey)
  }

  return {
    stats,
    isLoaded,
    logReadingCompleted,
    isCardRead,
  }
}

