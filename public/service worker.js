const currentCache = "0.0.24";

this.addEventListener('install', (event)=>{
    const cacheEssentails = async()=>{
        const installCache = await caches.open(currentCache);
        return installCache.add('.')
    }
    event.waitUntil(cacheEssentails());
}
);

self.addEventListener('fetch', (event)=>{
    const fetchAndCacheResponse = async(request)=>{
        const [response,cache] = await Promise.all([fetch(request), caches.open(currentCache)]);
        if(response.ok) {cache.put(request, response.clone())};
        return response;
    }
    const cacheFirstResponse = async()=>{
        const cached = await caches.match(event.request);
        return cached || await fetchAndCacheResponse(event.request);
    }
    event.respondWith(cacheFirstResponse(event.request))
}
);

self.addEventListener('activate', (event)=>{
    const deleteOldCaches = async()=>{
        const keys = await caches.keys();
        const old = keys.filter((key)=>key !== currentCache);
        return Promise.all(old.map((key)=>caches.delete(key)))
    }
    event.waitUntil(deleteOldCaches())
}
);
