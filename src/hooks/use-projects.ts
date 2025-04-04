
import { useQuery } from '@tanstack/react-query';
import { fetchProjects, fetchProjectById } from '@/services/api';
import { ProjectCardProps } from '@/components/ProjectCard';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetchProjects();
      return response.data;
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const response = await fetchProjectById(id);
      return response.data;
    },
    enabled: !!id, // Only run the query if we have an ID
  });
}

export function useFilteredProjects(searchTerm: string, statusFilter: string) {
  const projectsQuery = useProjects();
  
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
