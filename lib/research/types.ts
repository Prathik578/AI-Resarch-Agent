export type ResearchStatus = 'CREATED' | 'PLANNING' | 'SEARCHING' | 'EXTRACTING' | 'SYNTHESIZING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
export type ResearchDepth = 'quick' | 'standard' | 'deep'
export type ResearchMode = 'demo' | 'live'

export type Source = { id: string; title: string; publisher: string; url: string; retrievedAt: string; excerpt: string; status: 'verified' | 'pending' }
export type Claim = { id: string; text: string; type: 'FACT' | 'HYPOTHESIS' | 'GAP' | 'CONFLICT'; confidence: number; sourceIds: string[] }
export type ResearchPlan = { objective: string; subquestions: string[] }
export type ResearchSession = {
  id: string; question: string; depth: ResearchDepth; mode: ResearchMode; status: ResearchStatus; createdAt: string; updatedAt: string; plan: ResearchPlan; sources: Source[]; claims: Claim[]; report: { summary: string; sections: { heading: string; body: string }[]; markdown: string; complete: boolean } | null
}
