self.addEventListener('install', event => {
    event.waitUntil(async () => {
        const cache = await caches.open('0.0.1');
        return cache.addAll([
            '/', '/Spork in tall grass.svg'
        ])
    });
})

self.addEventListener('fetch', event => {
    event.respondWith(async () => {
        const response = await caches.match(event.request);
        return response ? response : fetch(event.request);
    })
})