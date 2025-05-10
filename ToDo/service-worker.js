const CACHE_NAME = 'fasttask-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/style.css',
  '/src/main.js',
  '/src/img/logo.png',
  '/src/img/icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});