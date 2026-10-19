'use server'
import { desc, eq, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { researchSession } from '@/lib/db/schema'
import { createDemoSession } from '@/lib/research/demo'
import type { ResearchDepth } from '@/lib/research/types'
import { headers } from 'next/headers'

async function userId() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) throw new Error('Unauthorized'); return session.user.id }
export async function listResearchSessions() { const id = await userId(); return db.select().from(researchSession).where(eq(researchSession.userId, id)).orderBy(desc(researchSession.createdAt)) }
export async function createResearchSession(question: string, depth: ResearchDepth) { const id = await userId(); if (!question.trim() || question.length > 5000) throw new Error('Invalid question'); const session = createDemoSession(question.trim(), depth); await db.insert(researchSession).values({ id: session.id, userId: id, question: session.question, depth: session.depth, mode: session.mode, status: session.status, payload: session }); revalidatePath('/'); return session }
export async function deleteResearchSession(sessionId: string) { const id = await userId(); await db.delete(researchSession).where(and(eq(researchSession.id, sessionId), eq(researchSession.userId, id))); revalidatePath('/') }
