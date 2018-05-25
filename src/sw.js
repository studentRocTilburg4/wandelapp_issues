// Geert Soetens
// This Service Worker makes sure the website can run offline.
importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('wandelapp').then(function(cache) {
            return cache.addAll([
                'app.js',
                'hikingapp.js',
                'map.js',
                'routes.js',
                '../index.html',
                '../css/',
                '../img/marker.svg',
                '../js/'
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