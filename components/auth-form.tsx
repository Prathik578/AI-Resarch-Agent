// @ts-nocheck
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, FormControl, Heading, Link, Stack, Text, TextInput } from '@primer/react'
import { signIn, signUp } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const isSignIn = mode === 'sign-in'

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setPending(true)
    setError('')
    const result = isSignIn ? await signIn.email({ email, password }) : await signUp.email({ email, password, name })
    setPending(false)
    if (result.error) {
      setError('We couldn’t authenticate those details. Check your information and try again.')
      return
    }
    router.push('/')
    router.refresh()
  }

  return (
    <main className="auth-shell">
      <section className="auth-panel" aria-labelledby="auth-title">
        <div className="auth-brand"><span className="auth-mark">R</span><span>Research</span></div>
        <Stack gap="spacious">
          <div>
            <p className="auth-eyebrow">PRIVATE WORKSPACE</p>
            <Heading as="h1" id="auth-title">{isSignIn ? 'Welcome back.' : 'Create your workspace.'}</Heading>
            <Text>{isSignIn ? 'Continue your evidence-first research.' : 'Save structured research, sources, and claims securely.'}</Text>
          </div>
          <form onSubmit={submit}>
            <Stack gap="normal">
              {!isSignIn && <FormControl><FormControl.Label>Name</FormControl.Label><TextInput autoComplete="name" required value={name} onChange={e => setName(e.target.value)} /></FormControl>}
              <FormControl><FormControl.Label>Email address</FormControl.Label><TextInput autoComplete="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} /></FormControl>
              <FormControl><FormControl.Label>Password</FormControl.Label><TextInput autoComplete={isSignIn ? 'current-password' : 'new-password'} type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></FormControl>
              {error && <div className="auth-error" role="alert">{error}</div>}
              <Button variant="primary" size="large" type="submit" disabled={pending}>{pending ? 'Checking…' : isSignIn ? 'Sign in' : 'Create account'}</Button>
            </Stack>
          </form>
          <p className="auth-switch">{isSignIn ? 'New to Research?' : 'Already have an account?'} <Link href={isSignIn ? '/sign-up' : '/sign-in'}>{isSignIn ? 'Create an account' : 'Sign in'}</Link></p>
        </Stack>
        <p className="auth-footer">Your research stays private and scoped to your account.</p>
      </section>
      <aside className="auth-visual" aria-label="Research workspace preview">
        <div className="visual-grid" />
        <div className="visual-copy"><p className="auth-eyebrow">EVIDENCE-FIRST RESEARCH</p><h2>Turn complex questions into clear, traceable answers.</h2><p>Plan investigations, inspect sources, and keep every claim connected to its evidence.</p></div>
        <div className="visual-card"><span className="status-dot" /> Live research session <strong>12 sources · 8 claims</strong></div>
      </aside>
    </main>
  )
}
