var cacheName = 'BVM-PWA-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/partite.html',
  '/regole',
  '/alloggio.html',
  '/andata.html',
  '/ritorno.html',
  '/images/icons/icon-192x192.png',
  'css/bootstrap.min.css',
  'css/bvmpwa.css',
  'js/jquery-3.3.1.slim.min.js',
  'js/bootstrap.min.js',
];

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