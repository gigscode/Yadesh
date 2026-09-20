const CACHE_NAME = 'yadesh-pages-v2'
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
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
    )).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)
  if (
    requestUrl.origin !== self.location.origin ||
    requestUrl.pathname.startsWith('/_next/') ||
    !CACHEABLE_PATHS.has(requestUrl.pathname)
  ) return

  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone()
        event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)))
      }
      return response
    }).catch(() => caches.match(event.request)),
  )
})
