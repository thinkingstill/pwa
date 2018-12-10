var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/pwa/',
  '/pwa/index.html',
  '/pwa/scripts/app.js',
  '/pwa/styles/inline.css',
  '/pwa/images/clear.png',
  '/pwa/images/cloudy-scattered-showers.png',
  '/pwa/images/cloudy.png',
  '/pwa/images/fog.png',
  '/pwa/images/ic_add_white_24px.svg',
  '/pwa/images/ic_refresh_white_24px.svg',
  '/pwa/images/partly-cloudy.png',
  '/pwa/images/rain.png',
  '/pwa/images/scattered-showers.png',
  '/pwa/images/sleet.png',
  '/pwa/images/snow.png',
  '/pwa/images/thunderstorm.png',
  '/pwa/images/wind.png'
];;

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});