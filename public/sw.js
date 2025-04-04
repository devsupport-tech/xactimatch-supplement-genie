// Service Worker script
const SW_VERSION = '1.0.0';
const CACHE_NAME = `claimtrak-cache-${SW_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/og-image.png',
  '/placeholder.svg'
];

// Install event handler - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event handler - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => {
          return name.startsWith('claimtrak-cache-') && name !== CACHE_NAME;
        }).map((name) => {
          return caches.delete(name);
        })
      );
    })
  );
});

// Helper to determine if we should cache a response
const shouldCacheResponse = (response) => {
  // Only cache successful responses
  if (!response.ok) return false;
  
  // Only cache GET requests
  if (response.type !== 'basic') return false;
  
  // Don't cache if the response already indicates it shouldn't be
  const cacheControl = response.headers.get('Cache-Control');
  if (cacheControl && (cacheControl.includes('no-store') || cacheControl.includes('no-cache'))) {
    return false;
  }
  
  return true;
};

// Fetch event handler - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Handle API requests differently
  if (event.request.url.includes('/api/')) {
    event.respondWith(handleApiRequest(event.request));
    return;
  }
  
  // For HTML navigation requests (not API calls)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/');
      })
    );
    return;
  }
  
  // For all other requests, try the cache first, then fallback to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(event.request).then((networkResponse) => {
        // Don't cache non-successful responses or non-GET requests
        if (!shouldCacheResponse(networkResponse)) {
          return networkResponse;
        }
        
        // Clone the response before we use it 
        const responseToCache = networkResponse.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return networkResponse;
      });
    }).catch(() => {
      // If both cache and network fail, try to serve the offline page
      if (event.request.mode === 'navigate') {
        return caches.match('/');
      }
      return null;
    })
  );
});

// Handle API requests with stale-while-revalidate strategy
async function handleApiRequest(request) {
  const cacheKey = request.url;
  
  try {
    // Try to get from cache first
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse) {
      // Check if the cached response is still fresh
      const cachedDate = new Date(cachedResponse.headers.get('date') || 0);
      const now = new Date();
      
      // If cache is less than 5 minutes old, use it
      if (now.getTime() - cachedDate.getTime() < 5 * 60 * 1000) {
        // Still fetch in background to update cache
        fetch(request)
          .then(networkResponse => {
            if (shouldCacheResponse(networkResponse)) {
              const clonedResponse = networkResponse.clone();
              cache.put(cacheKey, clonedResponse);
            }
          })
          .catch(() => {/* Ignore background fetch errors */});
          
        return cachedResponse;
      }
    }
    
    // Otherwise fetch from network
    const networkResponse = await fetch(request);
    
    // If the response is valid, cache it
    if (shouldCacheResponse(networkResponse)) {
      const clonedResponse = networkResponse.clone();
      cache.put(cacheKey, clonedResponse);
    }
    
    return networkResponse;
  } catch (error) {
    // If network request fails, try to return cached data as fallback
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(cacheKey);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache exists, throw the error
    throw error;
  }
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
