
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectById, prefetchRelatedData } from '@/services/api';
import { ProjectCardProps } from '@/components/ProjectCard';
import { useOptimizedQuery } from './use-optimized-query';
import { useEffect } from 'react';

/**
 * Hook to fetch all projects with optimized caching
 */
export function useProjects() {
  return useOptimizedQuery<ProjectCardProps[]>(
    ['projects'],
    async () => {
      const response = await fetchProjects();
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000,   // 30 minutes
    }
  );
}

/**
 * Hook to fetch a single project with optimized caching and prefetching
 */
export function useProject(id: string) {
  // Main query for the requested project
  const query = useOptimizedQuery<ProjectCardProps>(
    ['project', id],
    async () => {
      const response = await fetchProjectById(id);
      return response.data;
    },
    {
      enabled: !!id, // Only run the query if we have an ID
    }
  );
  
  // Prefetch related data when project data is available
  useEffect(() => {
    if (query.isSuccess && query.data) {
      prefetchRelatedData(id);
    }
  }, [query.isSuccess, id, query.data]);
  
  return query;
}

/**
 * Hook to filter projects with memoization and optimized queries
 */
export function useFilteredProjects(searchTerm: string, statusFilter: string) {
  const projectsQuery = useProjects();
  
  // Apply filters client-side to avoid unnecessary API calls
  const filteredProjects = projectsQuery.data?.filter((project: ProjectCardProps) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.claimNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  }) || [];

  return {
    ...projectsQuery,
    data: filteredProjects
  };
}
