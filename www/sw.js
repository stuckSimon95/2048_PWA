const cacheName = 'v1';
const cacheAssets = 
[
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

self.addEventListener('install', e => {
    console.log("Installing the service worker!");

    e.waitUntil(
      caches
      .open(cacheName)
      .then(cache => {
        console.log('SW caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e =>
{
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {

          if(cache !== cacheName) {
            console.log('SW clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );

});

self.addEventListener('fetch', e => 
{
    console.log('SW fetching');
    e.respondWith(
      fetch(e.request)
      .catch(() => caches.match(e.request)));
});

self.addEventListener('push', event =>
{
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    try {
        //        var episode = JSON.parse(event.data.text());
        const title = event.data.text();
        const options = {
            body: 'Yay it works.',
            icon: 'meta/2048-logo-144x144.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            actions: [{
                    action: "ok",
                    title: "Press OK",
                    icon: 'meta/2048-logo-144x144.png'
                }
            ]
        };

        event.waitUntil(self.registration.showNotification(title, options));

    } 
    catch (e) 
    {
        console('invalid json - notification supressed');
    }
  
});

self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received. "${event}"');

  if (event.action === "ok") {

      notificationOk(event.notification);

  }
  event.notification.close();
});

function notificationOk(notification) {

  console.log("notificationOk ");

  clients.openWindow('/');

}
