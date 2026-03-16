const CACHE_NAME = 'radiorage-v1'; // Use a version string instead of Date.now() for better caching
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json', // Added to ensure PWA installability offline
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

// 2. Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: NETWORK FIRST Strategy with Offline Message
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
        // If network fails, try the cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If NOT in cache and it's a page request, show the offline message
          if (event.request.mode === 'navigate') {
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
      })
  );
});
