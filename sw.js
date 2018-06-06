var CACHE_NAME = 'my-site-cache-v2';
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
self.addEventListener('install',    function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function(error) {
                console.log("Failed to open cache. Returned with : " + error);
            })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).then(
                        function(response) {
                            if(!response || response.status !== 200 || response.type !== "basic") {
                                    return response;
                            }

                            let responseToCache = response.clone();
                            
                            caches.open(CACHE_NAME)
                                .then(function(cache) {
                                    cache.put(event.request, responseToCache);
                                });
                            return response;
                        }
                    )
                }
            )
            .catch(function(error) {
                console.log("Failed to retrieve response." + error);
            })
    );
});