
/**
 * Optimized API service for fetching data
 */

// This would be replaced with your actual API endpoint
const API_BASE_URL = 'https://api.example.com';

// Cache for API responses to reduce redundant network requests
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch projects from the API with caching
 */
export const fetchProjects = async () => {
  try {
    const cacheKey = 'all_projects';
    const cachedData = apiCache.get(cacheKey);
    
    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
      return cachedData.data;
    }
    
    // In a real implementation, this would be:
    // const response = await fetch(`${API_BASE_URL}/projects`);
    // if (!response.ok) throw new Error('Failed to fetch projects');
    // const data = await response.json();
    
    // For demo purposes, we'll simulate an API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const data = { data: mockProjects };
    
    // Cache the result
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetch a single project by ID with caching
 */
export const fetchProjectById = async (id: string) => {
  try {
    const cacheKey = `project_${id}`;
    const cachedData = apiCache.get(cacheKey);
    
    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
      return cachedData.data;
    }
    
    // In a real implementation:
    // const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    // if (!response.ok) throw new Error('Failed to fetch project');
    // const data = await response.json();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock data
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    
    const data = { data: project };
    
    // Cache the result
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    throw error;
  }
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

// Import mock data to simulate API responses
// In a real app, this would be removed
import { mockProjects } from '@/mock/projects';
