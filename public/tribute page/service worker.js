this.addEventListener('install', (event) => {
    const cacheEssentials = async () => {
        const cache = await caches.open("essentials");
        return cache.addAll([
          '.', 
          './Spork in tall grass.svg', 
          './manifest.json', 
          "./Spork's face.svg"
        ])
    }
    event.waitUntil(cacheEssentials());
});

self.addEventListener('fetch', (event) => {
    const cacheFirstFetch = async () => {
        const response = await caches.match(event.request);
        return response ? response : fetch(event.request);
    }
    event.respondWith(cacheFirstFetch())
});

self.addEventListener('activate', (event) => {
  const deleteNonEssentialCaches = async () => {
      const keys = await caches.keys();
      const nonEssentials = keys.filter((key) => key !== "essentials")
      return Promise.all(nonEssentials.map(caches.delete))
  }
  event.waitUntil(deleteNonEssentialCaches())
});