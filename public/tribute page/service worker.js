const currentCache = "boop";

this.addEventListener('install', (event) => {
    const cacheAll = async () => {
        const installCache = await caches.open(currentCache);
        return installCache.addAll([
          '.', 
          './manifest.json',
          './Spork in tall grass.svg', 
          "./Spork's face.svg",
          './android splash icon.png',
          './apple-touch-icon.png'
        ])
    }
    event.waitUntil(cacheAll());
});

self.addEventListener('fetch', (event) => {
    const cacheOnly = async () => {
        return caches.match(event.request);
    }
    event.respondWith(cacheOnly())
});

self.addEventListener('activate', (event) => {
  const deleteOldCaches = async () => {
      const keys = await caches.keys();
      const old = keys.filter((key) => key !== currentCache);
      return Promise.all(old.map((key) => caches.delete(key)))
  }
  event.waitUntil(deleteOldCaches())
});