
/**
 * API service for fetching data
 */

// This would be replaced with your actual API endpoint
const API_BASE_URL = 'https://api.example.com';

/**
 * Fetch projects from the API
 * In a real app, this would fetch from your backend
 */
export const fetchProjects = async () => {
  try {
    // In a real implementation, this would be:
    // const response = await fetch(`${API_BASE_URL}/projects`);
    // if (!response.ok) throw new Error('Failed to fetch projects');
    // return await response.json();
    
    // For demo purposes, we'll simulate an API call
    // with a small delay to mimic network latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data (in production, this would come from the API)
    return { data: mockProjects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

/**
 * Fetch a single project by ID
 */
export const fetchProjectById = async (id: string) => {
  try {
    // In a real implementation:
    // const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    // if (!response.ok) throw new Error('Failed to fetch project');
    // return await response.json();
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock data
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return { data: project };
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    throw error;
  }
};

// Import mock data to simulate API responses
// In a real app, this would be removed
import { mockProjects } from '@/mock/projects';
