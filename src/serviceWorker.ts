// Service worker registration and management
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

// Register the service worker
export const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('ServiceWorker registration successful with scope:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            }
          });
        }
      });
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  }
};

// Helper to determine if we should cache a response
export const shouldCacheResponse = (response: Response) => {
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

// Function to be used in the service worker to handle API requests with caching
export const handleApiRequest = async (request: Request) => {
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
};
