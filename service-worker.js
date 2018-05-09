var cacheName = 'BVM-PWA-v11';

var filesToCache = [
  './',
  'index.html',
  'partite.html',
  'regole.html',
  'alloggio.html',
  'andata.html',
  'ritorno.html',
  'images/icons/icon-192x192.png',
  'images/icons/playstore-icon.png',  
  'css/bootstrap.min.css',
  'css/bootstrap.min.css.map',
  'css/bvmpwa.css',
  'js/jquery-3.3.1.slim.min.js',
  'js/bootstrap.bundle.min.js',
  'js/bootstrap.bundle.min.js.map',
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