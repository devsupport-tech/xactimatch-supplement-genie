
/**
 * Optimized API service for fetching data
 */

// This would be replaced with your actual API endpoint
const API_BASE_URL = 'https://api.example.com';

// Enhanced cache implementation with TTL and LRU functionality
class EnhancedCache {
  private cache: Map<string, { data: any; timestamp: number }>;
  private maxSize: number;
  private defaultTTL: number;

  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.defaultTTL = defaultTTL; // Default TTL is 5 minutes
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // Check if the item has expired
    if (Date.now() - item.timestamp > this.defaultTTL) {
      this.delete(key);
      return null;
    }
    
    // Move this item to the "newest" position by removing and re-adding
    this.cache.delete(key);
    this.cache.set(key, item);
    
    return item.data;
  }

  set(key: string, data: any, ttl?: number): void {
    // If cache is at capacity, remove the oldest item (first item in the Map)
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
  
  // Get cache stats for monitoring
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Create an enhanced cache instance
const apiCache = new EnhancedCache(100, 5 * 60 * 1000); // Cache up to 100 items for 5 minutes

/**
 * Make a cached API request
 */
async function cachedRequest<T>(
  endpoint: string, 
  options?: RequestInit,
  forceRefresh = false,
  cacheTTL?: number
): Promise<T> {
  const cacheKey = `${options?.method || 'GET'}_${endpoint}_${JSON.stringify(options?.body || '')}`;
  
  // Check cache first (unless force refresh is true)
  if (!forceRefresh) {
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      return cachedData as T;
    }
  }
  
  try {
    // In a real implementation, this would be:
    // const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    // if (!response.ok) throw new Error(`API error: ${response.status}`);
    // const data = await response.json();
    
    // For demonstration purposes, we'll simulate an API call with our mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let data: any;
    
    // Determine which mock data to return based on the endpoint
    if (endpoint.includes('/projects')) {
      if (endpoint.includes('/projects/') && !endpoint.endsWith('/projects/')) {
        // Extract project ID from endpoint
        const projectId = endpoint.split('/projects/')[1];
        const project = mockProjects.find(p => p.id === projectId);
        
        if (!project) {
          throw new Error('Project not found');
        }
        
        data = { data: project };
      } else {
        data = { data: mockProjects };
      }
    } else {
      // Default fallback
      data = { data: [] };
    }
    
    // Cache the result with custom TTL if provided
    apiCache.set(cacheKey, data, cacheTTL);
    
    return data as T;
  } catch (error) {
    console.error(`API error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Fetch projects from the API with caching
 */
export const fetchProjects = async () => {
  return cachedRequest<{ data: any }>('/projects');
};

/**
 * Fetch a single project by ID with caching
 */
export const fetchProjectById = async (id: string) => {
  return cachedRequest<{ data: any }>(`/projects/${id}`);
};

/**
 * Clear cache for specific key or all cache if no key provided
 */
export const clearApiCache = (key?: string) => {
  if (key) {
    apiCache.delete(key);
  } else {
    apiCache.clear();
  }
};

/**
 * Prefetch data that might be needed soon
 */
export const prefetchRelatedData = async (projectId: string) => {
  try {
    // Prefetch project details in background
    cachedRequest(`/projects/${projectId}`, undefined, false, 10 * 60 * 1000);
    
    // You could prefetch other related data here
    // For example, supplements, line items, etc.
  } catch (error) {
    // Silently handle prefetch errors since this is just an optimization
    console.warn('Error prefetching data:', error);
  }
};

// Import mock data to simulate API responses
// In a real app, this would be removed
import { mockProjects } from '@/mock/projects';
