import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yadesh, Christian Micro-Learning',
  description: 'Five minutes can change what you know. Discover Christian books, people, teachings, testimonies, and history one meaningful piece at a time.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/yadesh-mark.png', type: 'image/png' }],
    apple: [{ url: '/yadesh-mark.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6b64f6' },
    { media: '(prefers-color-scheme: dark)', color: '#6b64f6' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
