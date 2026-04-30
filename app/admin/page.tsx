import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const ADMIN_EMAIL = "lou.delgado.pfs@gmail.com"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function AdminPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  if (session.user.email !== ADMIN_EMAIL) {
    redirect('/dashboard')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Panel</h1>
      <p>You have full access.</p>
    </div>
  )
}