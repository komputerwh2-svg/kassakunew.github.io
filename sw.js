const CACHE_NAME = 'kas-saku-v1.17.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Tahap Install: Menyimpan aset penting ke cache lokal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Tahap Aktivasi
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Tahap Fetch: Mengambil data dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
