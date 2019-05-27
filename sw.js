var cacheList = [
    "index.html",
    "style/main.css",
    "js/keyboard_input_manager.js",
    "js/html_actuator.js",
    "js/grid.js",
    "js/tile.js",
    "js/local_storage_manager.js",
    "js/game_manager.js",
    "js/application.js"
];

/*  Service Worker Event Handlers */

self.addEventListener("install", function (event) 
{
    console.log("Installing the service worker!");

    self.skipWaiting();

    caches.open('static')
        .then(function(cache)
        {
            cache.addAll(cacheList);
        });
});

self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys().then(cacheNames => {
          cacheNames.forEach(value => {
            caches.delete(value);
    
          });
    
          console.log("service worker activated");
    
          return;
    
        })
    
      );

});

self.addEventListener("fetch", event => 
{
    console.log('fetching..');
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req)
{
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

/* self.addEventListener("fetch", function (event) {
    console.log('fetching..');
    event.respondWith(

        caches.match(event.request)
        .then(function (response) {

            if (response) {
                return response;
            }

            return fetch(event.request);
        })
    );

}); */

