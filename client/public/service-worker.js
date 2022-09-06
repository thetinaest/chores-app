// Overall formatting comes from University of Wisconsin Extended Campus Coding Bootcamp module lesson 19, "Food Festival".

const APP_PREFIX = "Jessie'sList-";     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  "/",
  "index.html",
  "manifest.json",
  "favicon.ico",
  "jl-icon.png"
];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES_TO_CACHE))
    )
    self.skipWaiting()
})

self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key)
            }
          })
        )
      })
    )
    self.clients.claim()
})

self.addEventListener('fetch', event => {
    // Network-first, fallback to cache
    if (event.request.method === 'GET') {
      event.respondWith(
        // open caches
        caches.open(CACHE_NAME)
          .then(cache => {
            // try network with a fetch request
            return fetch(event.request)
              .then(response => {
                // if success
                if (response.status === 200) {
                  // save response in cache
                  cache.put(event.request.url, response.clone())
                }
                return response
              })
              // if fails pull last saved data from cache
              .catch(() => caches.match(event.request))
          })
          .catch(err => console.log(err))
      )
      return
    }
  
    // Cache-first, fallback to Network
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    )
})