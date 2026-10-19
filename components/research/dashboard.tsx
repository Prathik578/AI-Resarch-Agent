// @ts-nocheck
'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Heading, Text, Stack, Label, TextInput, FormControl, Select, CounterLabel } from '@primer/react'
import { BeakerIcon, SearchIcon, ArrowRightIcon, ClockIcon, CheckCircleIcon, PlusIcon, TrashIcon, PencilIcon } from '@primer/octicons-react'
import { createDemoSession } from '@/lib/research/demo'
import type { ResearchSession } from '@/lib/research/types'

const initialSessions: ResearchSession[] = [createDemoSession('How is generative AI changing knowledge work?', 'standard'), createDemoSession('What makes an AI product trustworthy?', 'quick')]

export function Dashboard() {
  const router = useRouter()
  const [sessions, setSessions] = useState(initialSessions)
  const [question, setQuestion] = useState('')
  const [depth, setDepth] = useState<ResearchSession['depth']>('standard')
  const [query, setQuery] = useState('')
  const [renaming, setRenaming] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const filtered = useMemo(() => sessions.filter((s) => s.question.toLowerCase().includes(query.toLowerCase())), [sessions, query])
  function startResearch() { if (!question.trim()) return; const next = createDemoSession(question.trim(), depth); setSessions((current) => [next, ...current]); setQuestion(''); router.push(`/research/${next.id}`) }
  function saveRename(id: string) { if (!renameValue.trim()) return; setSessions((current) => current.map((s) => s.id === id ? { ...s, question: renameValue.trim() } : s)); setRenaming(null) }
  return <div className="research-shell">
    <aside className="research-sidebar">
      <Stack gap="spacious">
        <Stack direction="horizontal" gap="condensed" align="center"><Stack sx={{ bg: 'accent.emphasis', color: 'fg.onEmphasis', p: 2, borderRadius: 2 }}><BeakerIcon size={18} /></Stack><Stack gap="none"><Text sx={{ fontWeight: 'bold' }}>Research Agent</Text><Text sx={{ color: 'fg.muted', fontSize: 0 }}>Evidence workspace</Text></Stack></Stack>
        <Button variant="primary" leadingVisual={PlusIcon} onClick={() => document.getElementById('research-question')?.focus()}>New research</Button>
        <Stack gap="condensed"><Text sx={{ color: 'fg.muted', fontSize: 0, fontWeight: 'bold', textTransform: 'uppercase' }}>Workspace</Text><Button className="sidebar-link sidebar-link-active" variant="invisible" leadingVisual={BeakerIcon}>Research <CounterLabel>{sessions.length}</CounterLabel></Button><Button className="sidebar-link" variant="invisible" leadingVisual={SearchIcon} onClick={() => document.getElementById('session-search')?.focus()}>Search sessions</Button></Stack>
      </Stack>
      <Stack gap="condensed" sx={{ mt: 'auto' }}><Label variant="accent">DEMO MODE</Label><Text sx={{ color: 'fg.muted', fontSize: 0 }}>Fixed source corpus · no external calls</Text></Stack>
    </aside>
    <main className="research-main"><Stack gap="spacious">
      <Stack gap="condensed"><Text sx={{ color: 'fg.muted', fontSize: 1 }}>Workspace / Research</Text><Heading as="h1" variant="large">Research</Heading><Text sx={{ color: 'fg.muted', maxWidth: 620 }}>Turn an open question into a concise, evidence-linked research brief.</Text></Stack>
      <Stack className="composer" gap="normal"><Stack direction="horizontal" justify="space-between" align="start"><Stack gap="none"><Heading as="h2" variant="medium">Start a research run</Heading><Text sx={{ color: 'fg.muted' }}>Ask a focused question. You can inspect the plan, evidence, and claims after completion.</Text></Stack><Label variant="accent">DEMO MODE</Label></Stack><FormControl><FormControl.Label>Research question</FormControl.Label><TextInput id="research-question" block value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="e.g. How should teams evaluate AI coding assistants?" onKeyDown={(e) => { if (e.nativeEvent.isComposing || e.keyCode === 229) return; if (e.key === 'Enter') startResearch() }} /></FormControl><Stack direction="horizontal" gap="normal" align="end" className="composer-controls"><FormControl><FormControl.Label>Research depth</FormControl.Label><Select value={depth} onChange={(e) => setDepth(e.target.value as ResearchSession['depth'])}><Select.Option value="quick">Quick · 3 sources</Select.Option><Select.Option value="standard">Standard · 5 sources</Select.Option><Select.Option value="deep">Deep · 10 sources</Select.Option></Select></FormControl><Button variant="primary" leadingVisual={PlusIcon} onClick={startResearch} disabled={!question.trim()}>Start research <ArrowRightIcon size={16} /></Button></Stack></Stack>
      <Stack gap="normal"><Stack direction="horizontal" justify="space-between" align="end"><Stack gap="none"><Heading as="h2" variant="medium">Recent research</Heading><Text sx={{ color: 'fg.muted', fontSize: 1 }}>{filtered.length} of {sessions.length} sessions</Text></Stack><TextInput id="session-search" leadingVisual={SearchIcon} placeholder="Search sessions" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search sessions" /></Stack>
        {filtered.length ? <Stack className="session-list" gap="none">{filtered.map((session) => <Stack key={session.id} className="session-row" direction="horizontal" justify="space-between" align="center"><Stack gap="condensed" sx={{ minWidth: 0 }}><Stack direction="horizontal" gap="condensed" align="center"><CheckCircleIcon fill="var(--fgColor-open)" size={16} /><Label variant="success">Complete</Label><Label variant="secondary">{session.depth}</Label></Stack>{renaming === session.id ? <Stack direction="horizontal" gap="condensed"><TextInput value={renameValue} onChange={(e) => setRenameValue(e.target.value)} aria-label="Rename session" /><Button size="small" onClick={() => saveRename(session.id)}>Save</Button></Stack> : <a className="session-title" href={`/research/${session.id}`}>{session.question}</a>}<Stack direction="horizontal" gap="condensed" align="center"><ClockIcon size={14} /><Text sx={{ color: 'fg.muted', fontSize: 1 }}>Just now · {session.sources.length} sources · {session.claims.length} claims</Text></Stack></Stack><Stack direction="horizontal" gap="condensed"><Button size="small" variant="invisible" aria-label={`Rename ${session.question}`} leadingVisual={PencilIcon} onClick={() => { setRenaming(session.id); setRenameValue(session.question) }} /><Button size="small" variant="invisible" aria-label={`Delete ${session.question}`} leadingVisual={TrashIcon} onClick={() => setSessions((current) => current.filter((s) => s.id !== session.id))} /><Button size="small" onClick={() => router.push(`/research/${session.id}`)}>Open <ArrowRightIcon size={14} /></Button></Stack></Stack>)}</Stack> : <Stack className="empty-state" align="center" gap="condensed"><SearchIcon size={24} /><Heading as="h3" variant="small">No matching research</Heading><Text sx={{ color: 'fg.muted' }}>Try a different search term or start a new run.</Text></Stack>}
      </Stack>
    </Stack></main>
  </div>
}
