const CACHE_NAME = 'app-cache-v' + Date.now(); // Forces a new cache name on every deploy
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  'logo.png',
  'dial.mp3'  
];

// 1. Install: Force the new service worker to take over immediately
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate: Clean up old caches so you don't run out of storage
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: NETWORK FIRST Strategy
// This ensures you always get the latest update if online.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If the network works, update the cache with the new version
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // If offline, fall back to the cache
        return caches.match(event.request);
      })
  );
});
