const CACHE_NAME = 'yadesh-pages-v4'
const PRECACHE_ASSETS = [
  '/',
  '/learn',
  '/explore',
  '/series',
  '/saved',
  '/books',
  '/people',
  '/about',
  '/guidelines',
  '/privacy',
  '/terms',
  '/yadesh-mark.png',
  '/yadesh-splash.png',
  '/manifest.json',
  '/manifest.webmanifest',
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {})
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)

  // Skip cross-origin or internal Next.js dev websocket requests
  if (requestUrl.origin !== self.location.origin) return
  if (requestUrl.pathname.startsWith('/api/')) return

  // Network-first navigations ensure a resumed PWA gets the latest HTML.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse.clone())))
          }
          return networkResponse
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME)
          return (await cache.match(event.request)) || (await cache.match('/learn'))
        })
    )
    return
  }

  // Stale-While-Revalidate for assets keeps repeat visits fast.
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request)

      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone())
          }
          return networkResponse
        })
        .catch(async () => {
          if (cachedResponse) return cachedResponse

          // If navigation fails completely offline, fallback to cached /learn
          if (event.request.mode === 'navigate') {
            const fallback = await cache.match('/learn')
            if (fallback) return fallback
          }
          return cachedResponse
        })

      return cachedResponse || networkFetch
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = event.notification?.data?.url || '/learn'

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/learn') && 'focus' in client) {
          return client.focus()
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl)
      }
    })
  )
})
