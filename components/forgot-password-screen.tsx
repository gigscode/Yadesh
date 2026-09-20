'use client'

import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import { Loader2, ArrowLeft, MailCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function ForgotPasswordScreen() {
  const supabase = useMemo(() => createClient(), [])
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <main className="auth-page">
      <SharedNav />
      <section className="auth-card" aria-labelledby="forgot-title">
        {sent ? (
          <>
            <span className="auth-success-icon" aria-hidden="true">
              <MailCheck size={32} strokeWidth={2} />
            </span>
            <p className="kicker">Check your inbox</p>
            <h1 id="forgot-title">Reset link sent.</h1>
            <p className="auth-intro">
              We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the link to set a new password.
            </p>
            <p className="auth-intro" style={{ marginTop: '0.5rem', fontSize: '0.82rem' }}>
              Didn&apos;t get it? Check your spam folder or{' '}
              <button
                className="auth-resend"
                type="button"
                onClick={() => setSent(false)}
              >
                try again
              </button>
              .
            </p>
            <p className="auth-switch" style={{ marginTop: '1.5rem' }}>
              <Link href="/login">
                <ArrowLeft aria-hidden="true" size={14} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }} />
                Back to login
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="kicker">Account recovery</p>
            <h1 id="forgot-title">Forgot your password?</h1>
            <p className="auth-intro">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </label>

              {error && (
                <p className="auth-error" role="alert">{error}</p>
              )}

              <button type="submit" disabled={loading}>
                {loading
                  ? <><Loader2 aria-hidden="true" size={16} className="spin" /> Sending link…</>
                  : 'Send reset link'}
              </button>
            </form>

            <p className="auth-switch">
              <Link href="/login">
                <ArrowLeft aria-hidden="true" size={14} style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }} />
                Back to login
              </Link>
            </p>
          </>
        )}
      </section>
    </main>
  )
}
