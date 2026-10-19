import { notFound } from 'next/navigation'
import { ResearchDetail } from '@/components/research/detail'
import { createDemoSession } from '@/lib/research/demo'

export default async function ResearchPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; if (!id.startsWith('research-')) notFound(); return <ResearchDetail session={createDemoSession('How is generative AI changing knowledge work?', 'standard')} /> }
