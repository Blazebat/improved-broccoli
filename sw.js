const CACHE_NAME = 'radiorage-v1.1'; // BUMP THIS VERSION WHENEVER YOU CHANGE ASSETS
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'logo.png',
  'dial.mp3'
];

// 1. Install: Populate cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// 2. Activate: Clean up old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Update cache with fresh version from network
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails and no cache, show offline page for navigations
          if (event.request.mode === 'navigate' && !cachedResponse) {
            return new Response(
              `<html>
                <body style="background:#000; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; text-align:center; padding:20px;">
                  <img src="logo.png" style="width:100px; margin-bottom:20px;">
                  <h1>Connection Required</h1>
                  <p>Please connect to the internet to access RadioRage Online.</p>
                  <button onclick="window.location.reload()" style="background:#514E4E; color:white; border:none; padding:10px 20px; border-radius:5px; margin-top:20px;">Retry</button>
                </body>
              </html>`,
              { headers: { 'Content-Type': 'text/html' } }
            );
          }
        });

      // Return cached version immediately, or wait for network if not in cache
      return cachedResponse || fetchPromise;
    })
  );
});
