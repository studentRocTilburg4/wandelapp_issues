const urlsToCache = [
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
        caches.open('sw-wandelapp-cache')
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});
addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;     // if valid response is found in cache return it
          } else {
            return fetch(event.request)     //fetch from internet
              .then(function(res) {
                return caches.open('sw-wandelapp-cache')
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());    //save the response for future
                    return res;   // return the fetched data
                  })
              })
              .catch(function(err) {       // fallback mechanism
                return caches.open('sw-wandelapp-cache')
                  
                console.log("Fallback mechanism activated... Error : ", err);
              });
          }
        })
    );
  }); 