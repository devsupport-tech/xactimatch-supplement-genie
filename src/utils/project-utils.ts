import { ProjectCardProps } from '@/components/ProjectCard';
import { mockProjects } from '@/mock/projects';

// Project section types
export type ProjectSectionType = 'content-manipulation' | 'demo-mit' | 'rebuild';

export interface ProjectSection {
  id: string;
  type: ProjectSectionType;
  amount: number;
  description?: string;
}

/**
 * Update a project value in the mock data
 * In a real application, this would make an API call to update the database
 */
export const updateProject = async (
  projectId: string, 
  field: string, 
  value: string | number
): Promise<ProjectCardProps> => {
  // Find the project in the mock data
  const projectIndex = mockProjects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    throw new Error('Project not found');
  }
  
  // Update the project data
  const updatedProject = {
    ...mockProjects[projectIndex],
    [field]: value,
    lastUpdated: new Date().toISOString().split('T')[0] // Update the lastUpdated date
  };
  
  // In a real app, we would make an API call here
  // For this demo, we're updating the mock data in memory
  mockProjects[projectIndex] = updatedProject;
  
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(updatedProject);
    }, 500);
  });
};

/**
 * Get a project from the mock data
 */
export const getProject = async (projectId: string): Promise<ProjectCardProps | undefined> => {
  return mockProjects.find(p => p.id === projectId);
};

/**
 * Get project sections from mock data
 * In a real app, this would come from the database
 */
export const getProjectSections = async (projectId: string): Promise<ProjectSection[]> => {
  // This is mock data - in a real app, you'd fetch this from an API
  const mockSections: Record<string, ProjectSection[]> = {
    '1': [
      { id: '1', type: 'content-manipulation', amount: 4200.00, description: 'Water damage to contents' },
      { id: '2', type: 'demo-mit', amount: 3250.75, description: 'Drywall removal and mitigation' },
      { id: '3', type: 'rebuild', amount: 5000.00, description: 'Kitchen rebuild' }
    ],
    '2': [
      { id: '4', type: 'demo-mit', amount: 8750.50, description: 'Water extraction and drying' },
      { id: '5', type: 'rebuild', amount: 20000.00, description: 'Office reconstruction' }
    ],
    '3': [
      { id: '6', type: 'content-manipulation', amount: 15980.00, description: 'Store inventory salvage' },
      { id: '7', type: 'demo-mit', amount: 10000.00, description: 'Roof and ceiling removal' },
      { id: '8', type: 'rebuild', amount: 20000.00, description: 'Structural rebuild' }
    ]
  };
  
  return mockSections[projectId] || [];
};

/**
 * Update a project section
 */
export const updateProjectSection = async (
  projectId: string,
  sectionId: string,
  updates: Partial<ProjectSection>
): Promise<ProjectSection> => {
  // In a real app, this would update the database
  // For now, we'll just return a mock updated section
  return {
    id: sectionId,
    type: updates.type || 'content-manipulation',
    amount: updates.amount || 0,
    description: updates.description || ''
  };
};

/**
 * Create a new project section
 */
export const createProjectSection = async (
  projectId: string,
  sectionData: Omit<ProjectSection, 'id'>
): Promise<ProjectSection> => {
  // In a real app, this would create a section in the database
  // For mock purposes, we'll return a new section with a generated ID
  const newSection: ProjectSection = {
    id: `section-${Date.now()}`,
    ...sectionData
  };
  
  // Return the new section after a simulated delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(newSection);
    }, 500);
  });
};
