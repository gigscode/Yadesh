import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { PwaUpdater } from '@/components/pwa-updater'

export const metadata: Metadata = {
  title: 'Yadesh, Christian Micro-Learning',
  description: 'Five minutes can change what you know. Discover Christian books, people, teachings, testimonies, and history one meaningful piece at a time.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/icon-dark-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#6b64f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ background: '#fbfbf8' }}>
      <body className="antialiased" style={{ background: '#fbfbf8' }}>
        <PwaUpdater />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
