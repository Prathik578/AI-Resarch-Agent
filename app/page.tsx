import { redirect } from 'next/navigation'
import { Dashboard } from '@/components/research/dashboard'
import { getCurrentUser } from '@/lib/auth'

export default async function Page() {
  if (!(await getCurrentUser())) redirect('/sign-in')
  return <Dashboard />
}
