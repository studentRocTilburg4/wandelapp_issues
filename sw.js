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
    'https://nodejs-mongo-persistent-wandelappbackend-v4.a3c1.starter-us-west-1.openshiftapps.com/routes?cuid=test',
];
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('[SW] Opened cache');
                cache.addAll(urlsToCache);
                return;
            })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request)
        .catch(function(error) {
            console.log(
            "[SW] Network request failed. Serving content from cache: " + error
            );
            return caches
                .open(CACHE_NAME)
                .then(function(cache) {
                    return cache.match(event.request).then(function(matching) {
                        var report =
                            !matching || matching.status == 404
                            ? Promise.reject("no-match")
                            : matching;
                        return report;
                    });
                });
        })
    );
});