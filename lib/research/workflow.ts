import type { ResearchSession, ResearchStatus } from './types'

const transitions: Record<ResearchStatus, ResearchStatus[]> = {
  CREATED: ['PLANNING', 'CANCELLED'], PLANNING: ['SEARCHING', 'FAILED', 'CANCELLED'], SEARCHING: ['EXTRACTING', 'FAILED', 'CANCELLED'], EXTRACTING: ['SYNTHESIZING', 'FAILED', 'CANCELLED'], SYNTHESIZING: ['COMPLETED', 'FAILED', 'CANCELLED'], COMPLETED: [], FAILED: [], CANCELLED: [],
}
export function transition(session: ResearchSession, next: ResearchStatus): ResearchSession {
  if (!transitions[session.status].includes(next)) throw new Error(`Invalid transition: ${session.status} → ${next}`)
  return { ...session, status: next, updatedAt: new Date().toISOString() }
}
export function canTransition(status: ResearchStatus, next: ResearchStatus) { return transitions[status].includes(next) }
