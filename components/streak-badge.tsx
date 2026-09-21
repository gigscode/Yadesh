'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import { useHabitTracker } from '@/hooks/use-habit-tracker'

export function StreakBadge() {
  const { stats, isLoaded } = useHabitTracker()

  if (!isLoaded || stats.streak === 0) return null

  return (
    <Link
      href="/you"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.8rem',
        borderRadius: '999px',
        background: '#e9c7f5',
        color: '#17181d',
        fontSize: '0.78rem',
        fontWeight: '900',
        textDecoration: 'none',
        marginBottom: '1rem',
      }}
      title="View your reading habit"
    >
      <Flame size={15} color="#7168ed" aria-hidden="true" />
      <span>{stats.streak} day habit streak</span>
    </Link>
  )
}

