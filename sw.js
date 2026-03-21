/* ============================================================
   SERVICE WORKER — Cache-first for app shell, network-first
   for videos.json. Enables full offline support.
   ============================================================ */

const CACHE_NAME = 'golf-practice-v9';
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/theme.css',
  './css/components.css',
  './css/pages.css',
  './js/app.js',
  './js/data.js',
  './js/storage.js',
  './js/firebase.js',
  './js/components/timer.js',
  './js/components/session-builder.js',
  './js/pages/course.js',
  './js/pages/practice.js',
  './js/pages/library.js',
  './js/pages/progress.js',
  './js/pages/gear.js',
  './videos.json'
];

/* ── Install: pre-cache shell ────────────────────────────── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activate: clean old caches ──────────────────────────── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first for shell, network-first for data ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for videos.json (so updates are picked up)
  if (url.pathname.endsWith('videos.json')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Skip caching for Firebase / Google APIs
  if (url.hostname.includes('googleapis.com') ||
      url.hostname.includes('gstatic.com') ||
      url.hostname.includes('firebaseapp.com') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('google.com')) {
    return; // Let the browser handle these normally
  }

  // Network-first for app shell — always try fresh, fall back to cache
  event.respondWith(
    fetch(event.request).then(res => {
      if (res.ok && event.request.method === 'GET' && url.origin === self.location.origin) {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, res.clone()));
      }
      return res;
    }).catch(() => caches.match(event.request))
  );
});
