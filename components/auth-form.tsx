'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, FormControl, Heading, Link, Stack, Text, TextInput } from '@primer/react'
import { signIn, signUp } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter(); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [name, setName] = useState(''); const [error, setError] = useState(''); const [pending, setPending] = useState(false)
  async function submit(event: React.FormEvent) { event.preventDefault(); setPending(true); setError(''); const result = mode === 'sign-in' ? await signIn.email({ email, password }) : await signUp.email({ email, password, name }); setPending(false); if (result.error) { setError('Unable to authenticate with those details.'); return } router.push('/'); router.refresh() }
  return <Stack as="main" sx={{ maxWidth: 420, mx: 'auto', px: 3, py: 5 }} gap="normal"><Stack gap="condensed"><Heading>{mode === 'sign-in' ? 'Sign in to Research' : 'Create your Research account'}</Heading><Text>{mode === 'sign-in' ? 'Continue your private research workspace.' : 'Save research sessions securely in Neon.'}</Text></Stack><form onSubmit={submit}><Stack gap="normal">{mode === 'sign-up' && <FormControl><FormControl.Label>Name</FormControl.Label><TextInput required value={name} onChange={e => setName(e.target.value)} /></FormControl>}<FormControl><FormControl.Label>Email</FormControl.Label><TextInput type="email" required value={email} onChange={e => setEmail(e.target.value)} /></FormControl><FormControl><FormControl.Label>Password</FormControl.Label><TextInput type="password" minLength={8} required value={password} onChange={e => setPassword(e.target.value)} /></FormControl>{error && <Text>{error}</Text>}<Button variant="primary" type="submit" disabled={pending}>{pending ? 'Working…' : mode === 'sign-in' ? 'Sign in' : 'Create account'}</Button></Stack></form><Link href={mode === 'sign-in' ? '/sign-up' : '/sign-in'}>{mode === 'sign-in' ? 'Create an account' : 'Already have an account? Sign in'}</Link></Stack>
}
