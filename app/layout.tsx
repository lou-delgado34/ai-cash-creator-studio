import './globals.css'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isLoggedIn = !!session

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}