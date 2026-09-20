'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, Pencil, Check, X, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  bio: string | null
  avatar_url: string | null
  created_at: string
}

export function ProfileScreen({
  profile,
  savesCount,
  savesUnavailable = false,
}: {
  profile: Profile
  savesCount: number
  savesUnavailable?: boolean
}) {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: profile.full_name ?? '',
    bio: profile.bio ?? '',
  })

  const initials = (profile.full_name ?? profile.email ?? 'Y')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const joinYear = new Date(profile.created_at).getFullYear()

  async function saveProfile() {
    setError(null)
    setSaving(true)

    const { data: { user }, error: sessionError } = await supabase.auth.getUser()

    if (sessionError || !user) {
      setError(sessionError?.message ?? 'Your session has expired. Please sign in again.')
      setSaving(false)
      return
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.full_name.trim() || null,
        bio: form.bio.trim() || null,
      })
      .eq('id', user.id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    setSaving(false)
    setEditing(false)
    router.refresh()
  }

  function cancelEdit() {
    setForm({
      full_name: profile.full_name ?? '',
      bio: profile.bio ?? '',
    })
    setError(null)
    setEditing(false)
  }

  async function signOut() {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) {
      setError(signOutError.message)
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <>
      {/* Profile hero */}
      <section className="profile-hero" aria-labelledby="profile-name">
        <div className="profile-avatar" aria-hidden="true">{initials}</div>
        <div className="profile-hero-info">
          <p className="eyebrow">YOUR PROFILE</p>
          <h2 id="profile-name">{profile.full_name ?? 'Learner'}</h2>
          <p className="profile-email">{profile.email}</p>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          <p className="profile-since">Member since {joinYear}</p>
        </div>
        {!editing && (
          <button
            className="profile-edit"
            onClick={() => setEditing(true)}
            aria-label="Edit profile"
          >
            <Pencil size={14} aria-hidden="true" />
            Edit
          </button>
        )}
      </section>

      {/* Inline edit form */}
      {editing && (
        <section className="profile-edit-card" aria-label="Edit your profile">
          <div className="profile-edit-head">
            <p className="eyebrow">EDIT PROFILE</p>
            <button
              className="profile-edit-close"
              type="button"
              onClick={cancelEdit}
              aria-label="Cancel editing"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <label className="profile-field-label">
            Name
            <input
              className="profile-field-input"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              placeholder="Your name"
              disabled={saving}
              maxLength={80}
            />
          </label>

          <label className="profile-field-label">
            Bio
            <textarea
              className="profile-field-input profile-field-textarea"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="A short line about yourself (optional)"
              disabled={saving}
              maxLength={160}
              rows={3}
            />
            <span className="profile-field-count">{form.bio.length} / 160</span>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button
            className="profile-save-btn"
            onClick={saveProfile}
            disabled={saving}
          >
            {saving
              ? <><Loader2 size={14} className="spin" aria-hidden="true" /> Saving…</>
              : <><Check size={14} aria-hidden="true" /> Save changes</>}
          </button>
        </section>
      )}

      {/* Stats */}
      <section className="you-summary" aria-labelledby="summary-title">
        <div className="you-section-heading">
          <div>
            <p className="eyebrow">YOUR PROGRESS</p>
            <h2 id="summary-title">A little learning adds up.</h2>
          </div>
        </div>
        <div className="you-progress-grid">
          <Link href="/saved">
            <strong>{savesCount}</strong>
            <span>Saved readings</span>
            <small>{savesCount === 0 ? 'Save something to return to' : 'View your library'} →</small>
          </Link>
          <Link href="/learn">
            <strong>0</strong>
            <span>Minutes learned</span>
            <small>Start your first session →</small>
          </Link>
          <Link href="/explore">
            <strong>0</strong>
            <span>Sources explored</span>
            <small>Find a source to follow →</small>
          </Link>
        </div>
        {savesUnavailable && (
          <p className="auth-error" role="status">Saved readings are temporarily unavailable. Please try again later.</p>
        )}
      </section>

      {/* Next step */}
      <section className="you-next-step" aria-labelledby="next-step-title">
        <div>
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h2 id="next-step-title">Start with five minutes.</h2>
          <p>One short reading is enough to begin a quieter learning habit today.</p>
        </div>
        <Link className="you-primary-action" href="/learn">
          Start today&apos;s reading <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Sign out */}
      <div className="profile-signout-row">
        <button className="profile-signout" onClick={signOut} type="button">
          <LogOut size={14} aria-hidden="true" />
          Sign out
        </button>
      </div>
    </>
  )
}
