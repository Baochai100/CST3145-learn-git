var cacheName = "afterschool-v1";
var cacheFiles = [
  "index.html",
  //"products.js",
  "chinese.png",
  "english.png",
  "icon-192.png",
  "icon-512.png",
  "math.png",
  "music.png",
  "piano.png",
  "afterschool.webmanifest",
];

self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log("[Service Worker] Caching files");
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    // check if the cache has the file
    caches.match(e.request).then(function (cachedFile) {
      if (cachedFile) {
        console.log(
          "[Service Worker] Resource fetched from the cache for: " +
            e.request.url
        );
        return cachedFile;
      } else {
        return fetch(e.request).then(function (response) {
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, response.clone());
            console.log(
              "[Service Worker] Resource fetched and saved in the cache for: " +
                e.request.url
            );
            return response;
          });
        });
      }
    })
  );
});

caches.keys().then(function (cacheNames) {
  console.log("[Service Worker] Cached Files:");
  cacheNames.forEach(function (cacheName) {
    caches.open(cacheName).then(function (cache) {
      cache.keys().then(function (cachedRequests) {
        cachedRequests.forEach(function (cachedRequest) {
          console.log(cachedRequest.url);
        });
      });
    });
  });
});
