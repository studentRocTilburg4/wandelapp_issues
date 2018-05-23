// This is the Service Worker. It helps the app function in an offline enviroment.
// Geert Soetens
importScripts('cache-polyfill.js');

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('wandelapp').then(function(cache) {
            return cache.addAll([
                '/',
                '../index.html',
                'app.js',
                'hikingapp.js',
                'map.js',
                'routes.js'
            ]);
        })
    );
});