// @ts-nocheck
'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Heading, Text, Stack, Label, TextInput, FormControl, Select, CounterLabel } from '@primer/react'
import { BeakerIcon, SearchIcon, ArrowRightIcon, ClockIcon, CheckCircleIcon, PlusIcon } from '@primer/octicons-react'
import { createDemoSession } from '@/lib/research/demo'
import type { ResearchSession } from '@/lib/research/types'

const initialSessions: ResearchSession[] = [createDemoSession('How is generative AI changing knowledge work?', 'standard'), createDemoSession('What makes an AI product trustworthy?', 'quick')]

export function Dashboard() {
  const router = useRouter(); const [sessions, setSessions] = useState(initialSessions); const [question, setQuestion] = useState(''); const [depth, setDepth] = useState<ResearchSession['depth']>('standard'); const [query, setQuery] = useState('')
  const filtered = useMemo(() => sessions.filter(s => s.question.toLowerCase().includes(query.toLowerCase())), [sessions, query])
  function startResearch() { if (!question.trim()) return; const next = createDemoSession(question.trim(), depth); setSessions([next, ...sessions]); setQuestion(''); router.push(`/research/${next.id}`) }
  return <main style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 28px 80px' }}><Stack gap="spacious">
    <Stack direction="horizontal" justify="space-between" align="start"><Stack direction="horizontal" gap="condensed" align="center"><Stack sx={{ bg: 'accent.emphasis', color: 'fg.onEmphasis', p: 2, borderRadius: 2 }}><BeakerIcon size={24}/></Stack><Stack gap="none"><Heading as="h1" variant="large">Research workspace</Heading><Text sx={{ color: 'fg.muted' }}>Evidence-first research, with every conclusion traceable.</Text></Stack></Stack><Label variant="accent">DEMO MODE</Label></Stack>
    <Stack sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 4, bg: 'canvas.subtle' }}><Stack gap="normal"><Stack direction="horizontal" justify="space-between" align="center"><Stack gap="none"><Heading as="h2" variant="medium">Start new research</Heading><Text sx={{ color: 'fg.muted' }}>A bounded, inspectable run using a fixed source corpus.</Text></Stack><CounterLabel>{sessions.length} sessions</CounterLabel></Stack><FormControl><FormControl.Label>Research question</FormControl.Label><TextInput block value={question} onChange={e => setQuestion(e.target.value)} placeholder="What do you want to understand?" onKeyDown={e => { if (e.key === 'Enter') startResearch() }}/></FormControl><Stack direction="horizontal" gap="normal" align="end"><FormControl><FormControl.Label>Depth</FormControl.Label><Select value={depth} onChange={e => setDepth(e.target.value as ResearchSession['depth'])}><Select.Option value="quick">Quick · 3 sources</Select.Option><Select.Option value="standard">Standard · 5 sources</Select.Option><Select.Option value="deep">Deep · 10 sources</Select.Option></Select></FormControl><Button variant="primary" leadingVisual={PlusIcon} onClick={startResearch} disabled={!question.trim()}>Run research <ArrowRightIcon size={16} /></Button></Stack></Stack></Stack>
    <Stack direction="horizontal" justify="space-between" align="center"><Heading as="h2" variant="medium">Your research</Heading><TextInput leadingVisual={SearchIcon} placeholder="Filter sessions" value={query} onChange={e => setQuery(e.target.value)} aria-label="Filter sessions"/></Stack>
    <Stack gap="condensed">{filtered.map(session => <Stack key={session.id} sx={{ border: '1px solid', borderColor: 'border.default', borderRadius: 2, p: 3, bg: 'canvas.default' }}><Stack direction="horizontal" justify="space-between" align="center"><Stack gap="condensed"><Stack direction="horizontal" gap="condensed" align="center"><CheckCircleIcon fill="var(--fgColor-open)"/><Label variant="success">Complete</Label><Label variant="secondary">{session.mode}</Label></Stack><Heading as="h3" variant="medium"><a href={`/research/${session.id}`} style={{ color: 'var(--fgColor-default)', textDecoration: 'none' }}>{session.question}</a></Heading><Stack direction="horizontal" gap="condensed" align="center"><ClockIcon size={16}/><Text sx={{ color: 'fg.muted', fontSize: 1 }}>Just now · {session.sources.length} sources · {session.claims.length} claims</Text></Stack></Stack><Button onClick={() => router.push(`/research/${session.id}`)}>Open <ArrowRightIcon size={16} /></Button></Stack></Stack>)}</Stack>
  </Stack></main>
}
