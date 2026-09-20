'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SharedNav } from '@/components/shared-nav'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AuthScreen({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register'
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const form = event.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    if (isRegister) {
      const name = (form.elements.namedItem('name') as HTMLInputElement).value

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          // email confirmation is disabled in Supabase dashboard
        },
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      router.push('/learn')
      router.refresh()
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      router.push('/learn')
      router.refresh()
    }
  }

  return (
    <main className="auth-page">
      <SharedNav />
      <section className="auth-card" aria-labelledby="auth-title">
        <p className="kicker">{isRegister ? 'Start learning intentionally' : 'Welcome back'}</p>
        <h1 id="auth-title">{isRegister ? 'Create your learning space.' : 'Keep learning.'}</h1>
        <p className="auth-intro">
          {isRegister
            ? 'Save the ideas, stories, and lessons worth returning to.'
            : 'Return to the Christian ideas and lessons you saved.'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Name
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                disabled={loading}
              />
            </label>
          )}
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              disabled={loading}
            />
          </label>
          <label>
            <span>
              Password
              {!isRegister && (
                <Link href="/forgot-password">Forgot password?</Link>
              )}
            </span>
            <span className="password-field">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder="Password"
                minLength={8}
                required
                disabled={loading}
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                disabled={loading}
              >
                {showPassword
                  ? <EyeOff aria-hidden="true" size={20} strokeWidth={2.25} />
                  : <Eye aria-hidden="true" size={20} strokeWidth={2.25} />}
              </button>
            </span>
          </label>

          {error && (
            <p className="auth-error" role="alert">{error}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? <><Loader2 aria-hidden="true" size={16} className="spin" /> {isRegister ? 'Creating account…' : 'Signing in…'}</>
              : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link href={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Log in' : 'Register'}
          </Link>
        </p>
      </section>
    </main>
  )
}
