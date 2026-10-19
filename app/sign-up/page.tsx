import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/auth-form'
import { getCurrentUser } from '@/lib/auth'
export default async function SignUpPage() { if (await getCurrentUser()) redirect('/'); return <AuthForm mode="sign-up" /> }
