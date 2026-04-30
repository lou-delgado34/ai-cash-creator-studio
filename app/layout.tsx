import './globals.css'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/ai-models', label: 'AI Models' },
  { href: '/content', label: 'Content' },
  { href: '/image-studio', label: 'Images' },
  { href: '/voice-studio', label: 'Voice' },
  { href: '/video-generator', label: 'Video' },
  { href: '/history', label: 'History' },
  { href: '/admin', label: 'Admin' },
  { href: '/login', label: 'Login' },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body style={{ background: '#0b0b0b', color: 'white' }}>
        
        {/* NAVBAR */}
        <nav style={{
          display: 'flex',
          gap: 10,
          padding: 15,
          borderBottom: '1px solid #222'
        }}>
          {mainLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: '#111',
                cursor: 'pointer'
              }}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* PAGE CONTENT */}
        <div>
          {children}
        </div>

      </body>
    </html>
  )
}