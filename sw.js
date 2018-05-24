// Geert Soetens
// This Service Worker makes sure the website can run offline.
importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('wandelapp').then(function(cache) {
            return cache.addAll([
                'index.html',
                '../src/',
                '../css/',
                '../img/marker.svg',
                '../js/',
                'sw.js',
                'cache-polyfill.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {

    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});