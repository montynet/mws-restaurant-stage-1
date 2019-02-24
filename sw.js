// Version of cache
const cacheName = 'restaurant-reviews-v1';

// Files to cache:
const cacheAssets = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './css/responsive.css',
  './js/main.js',
  './data/restaurants.json',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(cacheAssets);
      }).catch(error => {
    })
  );
});

/**
 * Removing outdated caches
 */
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter(function (thisCacheName) {
            return cacheName.startsWith('restaurant-reviews-') &&
              thisCacheName !== cacheName;
          })
            .map(function (cacheName) {
              return caches.delete(cacheName);
            })
        );
      })
  );
});

/**
 * Respond to requests
 */
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        // Return cached version or fetch
        return response || fetch(e.request);
      })
  );
});
