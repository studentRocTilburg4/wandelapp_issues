var CACHE_NAME = 'wandelapp-offline-cache';

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll([
                    '/',
                    'js/app_es5.js',
                    'css/wandelapp.css',
                    'https://nodejs-mongo-persistent-wandelappbackend-v4.a3c1.starter-us-west-1.openshiftapps.com/routes?cuid=test'
                ]).then(function() {
                    console.log('Items cached.');
                })
            }.catch(function(error) {
                console.error('Items failed to cache:', error)
            })
        )
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
                console.log('Fetching failed:', error)
            });
        })
    );
});