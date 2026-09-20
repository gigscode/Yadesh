'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function ResetPasswordScreen() {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [hasSession, setHasSession] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setHasSession(Boolean(data.session))
      setReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setHasSession(true)
      }
      setReady(true)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.push('/login?reset=success')
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="reset-title">
        {!ready ? (
          <p className="auth-intro">Checking your reset link...</p>
        ) : !hasSession ? (
          <>
            <p className="kicker">Account recovery</p>
            <h1 id="reset-title">This reset link is no longer valid.</h1>
            <p className="auth-intro">Request a new password reset link and try again.</p>
            <p className="auth-switch"><Link href="/forgot-password">Request a new link</Link></p>
          </>
        ) : (
          <>
            <p className="kicker">Account recovery</p>
            <h1 id="reset-title">Choose a new password.</h1>
            <p className="auth-intro">Use at least eight characters, then sign in again.</p>
            <form onSubmit={handleSubmit}>
              <label>
                New password
                <span className="password-field">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={loading}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
                  </button>
                </span>
              </label>
              <label>
                Confirm password
                <span className="password-field">
                  <input
                    type={showConfirmation ? 'text' : 'password'}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    disabled={loading}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowConfirmation((visible) => !visible)}
                    aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'}
                    aria-pressed={showConfirmation}
                    disabled={loading}
                  >
                    {showConfirmation ? <EyeOff aria-hidden="true" size={20} /> : <Eye aria-hidden="true" size={20} />}
                  </button>
                </span>
              </label>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button type="submit" disabled={loading}>
                {loading ? <><Loader2 aria-hidden="true" size={16} className="spin" /> Updating password...</> : 'Update password'}
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  )
}
