const CACHE_NAME = "version-1";

const urlsToCache = ["index.html", "offline.html"];

const self = this;

//Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for Requests
  self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

//Active the Service Worker
self.addEventListener("activate", (event) => {
  const cacheWitheList = [];
  cacheWitheList.push(CACHE_NAME);

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cachaName) => {
            if(!cacheWitheList.includes(cachaName)){
                return caches.delete(cachaName);
            }
        })
      ))
  );
});
