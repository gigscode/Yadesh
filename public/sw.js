const CACHE_NAME = 'yadesh-pages-v3'
const CACHEABLE_PATHS = new Set([
  '/',
  '/about',
  '/books',
  '/explore',
  '/guidelines',
  '/learn',
  '/people',
  '/privacy',
  '/terms',
])

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ),
    ).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)
  if (
    requestUrl.origin !== self.location.origin ||
    requestUrl.pathname.startsWith('/_next/') ||
    !CACHEABLE_PATHS.has(requestUrl.pathname)
  ) {
    return
  }

  // Stale-While-Revalidate: Return cached response immediately if present,
  // while fetching fresh copy in the background to update the cache.
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request)

      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            cache.put(event.request, networkResponse.clone())
          }
          return networkResponse
        })
        .catch(() => cachedResponse)

      return cachedResponse || networkFetch
    }),
  )
})
