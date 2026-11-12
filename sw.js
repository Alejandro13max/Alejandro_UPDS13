// ==============================================================================
// PWA SERVICE WORKER: ESTRATEGIA OFFLINE-FIRST (CACHE-FIRST)
// Permite que la aplicación funcione 100% sin conexión a internet
// ==============================================================================
const CACHE_NAME = 'portafolio-offline-first-v2';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './diagnostico.html',
    './img/foto1.jpg',
    './img/foto2.jpg',
    './img/foto3.jpg'
];

// 1. INSTALACIÓN: Precarga de recursos estáticos esenciales en Cache Storage
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[SW Offline-First] Precargando recursos estáticos en caché');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// 2. ACTIVACIÓN: Limpieza de versiones antiguas de caché y control de clientes
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW Offline-First] Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. FETCH: Estrategia OFFLINE-FIRST (Cache-First con guardado dinámico)
self.addEventListener('fetch', event => {
    // Excluir esquemas no compatibles (chrome-extension, etc.)
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Si está en caché, servirlo de inmediato (Offline-First)
            if (cachedResponse) {
                return cachedResponse;
            }

            // Si no está en caché, solicitar por red y almacenar copia en caché dinámico
            return fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Si no hay internet y es navegación, devolver index.html de respaldo
                    if (event.request.mode === 'navigate') {
                        return caches.match('./index.html');
                    }
                });
        })
    );
});