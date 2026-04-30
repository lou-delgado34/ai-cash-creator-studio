import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function DashboardPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>You are logged in.</p>
    </div>
  )
}