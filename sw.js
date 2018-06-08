var CACHE_NAME = 'wandelapp-offline-cache';
var urlsToCache = [
    '/',
    'css/wandelapp.css',
    'src/app.js',
    'src/cache-polyfill.js',
    'src/hikingapp.js',
    'src/map.js',
    'src/routes.js',
    'js/app_es5.js',
    'sw.js',
    'https://nodejs-mongo-persistent-wandelappbackend-v4.a3c1.starter-us-west-1.openshiftapps.com/routes?cuid=test',
];
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('Found response in cache:', response);

                return response;
            }
            console.log('No response found in cache. About to fetch from network...');

            return fetch(event.request).then(function(response) {
                console.log('Response from network is:', response);

                return response
            }).catch(function(error) {
                console.error('Fetching failed:', error)
            });
        })
    );
});