import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = { title: 'Research workspace', description: 'Evidence-first research with traceable sources and claims.' }

export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" data-color-mode="dark" data-light-theme="light" data-dark-theme="dark" suppressHydrationWarning><body suppressHydrationWarning><Providers>{children}</Providers></body></html> }
