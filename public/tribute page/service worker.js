const cache = "v1";

this.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(cache).then(function(cache) {
        return cache.addAll([
          '.', './Spork in tall grass.svg', './manifest.json', "./Spork's face.svg"
        ]);
      })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
});