import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { PwaUpdater } from '@/components/pwa-updater'
import { MobilePwaPrompt } from '@/components/mobile-pwa-prompt'

export const metadata: Metadata = {
  title: 'Yadesh | Short Christian readings',
  description: 'Short readings from Christian books, people, teachings, testimonies, and history.',
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
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
        {/* Pre-hydration splash for standalone PWA mode: painted instantly by the browser before React boots */}
        <div id="pwa-initial-splash" aria-hidden="true">
          <img src="/yadesh-splash.png" alt="" width="260" height="80" />
        </div>
        <PwaUpdater />
        <MobilePwaPrompt />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
