const CACHE_NAME = 'freeforallhub-v1';
const ASSETS_TO_CACHE = [
  './',
    './index.html'
    ];

    // Evento Installazione: salva i file in cache
    self.addEventListener('install', (event) => {
      event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
                    })
                      );
                        self.skipWaiting();
                        });

                        // Evento Attivazione: pulisce le vecchie cache se aggiorni la versione
                        self.addEventListener('activate', (event) => {
                          event.waitUntil(
                              caches.keys().then((keys) => {
                                    return Promise.all(
                                            keys.map((key) => {
                                                      if (key !== CACHE_NAME) {
                                                                  return caches.delete(key);
                                                                            }
                                                                                    })
                                                                                          );
                                                                                              })
                                                                                                );
                                                                                                  self.clients.claim();
                                                                                                  });

                                                                                                  // Evento Fetch: risponde prima dalla cache, poi dalla rete
                                                                                                  self.addEventListener('fetch', (event) => {
                                                                                                    event.respondWith(
                                                                                                        caches.match(event.request).then((cachedResponse) => {
                                                                                                              return cachedResponse || fetch(event.request);
                                                                                                                  })
                                                                                                                    );
                                                                                                                    });