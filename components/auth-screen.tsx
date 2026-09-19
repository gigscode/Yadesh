'use client'

import Link from 'next/link'
import { SharedNav } from '@/components/shared-nav'
import { useState } from 'react'

export function AuthScreen({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register'
  const [submitted, setSubmitted] = useState(false)

  return <main className="auth-page">
    <SharedNav />
    <section className="auth-card" aria-labelledby="auth-title">
      <p className="kicker">{isRegister ? 'Join the archive' : 'Welcome back'}</p>
      <h1 id="auth-title">{isRegister ? 'Create your account.' : 'Keep the signal.'}</h1>
      <p className="auth-intro">{isRegister ? 'Save the records worth returning to.' : 'Return to your saved records and ideas.'}</p>
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
        {isRegister && <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>}
        <label>Email<input name="email" type="email" autoComplete="email" placeholder="Email or username" required /></label>
        <label><span>Password <Link href="#forgot">{isRegister ? '' : 'Forgot password?'}</Link></span><input name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder="Password" minLength={8} required /></label>
        <button type="submit">{isRegister ? 'Create account' : 'Sign in'}</button>
      </form>
      {submitted && <p className="auth-note" role="status">Authentication is being connected to the project database. Your form is ready for the secure email/password flow.</p>}
      <p className="auth-switch">{isRegister ? 'Already have an account?' : "Don't have an account?"} <Link href={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Register'}</Link></p>
    </section>
  </main>
}
