
import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { mockProjects } from '@/mock/projects';
import { mockSupplements } from '@/mock/supplements';
import { Supplement } from '@/types/supplement';

export function useSupplements() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Enhance supplements with project names
  const enhancedSupplements = mockSupplements.map(supplement => {
    const project = mockProjects.find(p => p.id === supplement.projectId);
    return {
      ...supplement,
      projectName: project?.title
    };
  });

  useEffect(() => {
    const statusFromUrl = searchParams.get('status');
    if (statusFromUrl) {
      setStatusFilter(statusFromUrl);
      
      const matchingSupplements = enhancedSupplements.filter(s => s.status === statusFromUrl);
      if (matchingSupplements.length > 0 && !selectedSupplement) {
        setSelectedSupplement(matchingSupplements[0]);
      }
    }

    if (location.state) {
      if (location.state.createMode) {
        setIsCreating(true);
        if (location.state.projectId) {
          setSelectedProjectId(location.state.projectId);
        }
      }
      
      if (location.state.selectedSupplementId) {
        const supplement = enhancedSupplements.find(s => s.id === location.state.selectedSupplementId);
        if (supplement) {
          setSelectedSupplement(supplement);
        }
      }
    }
  }, [location.state, searchParams, selectedSupplement]);

  const handleCreateSupplement = () => {
    setIsCreating(true);
    setSelectedSupplement(null);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleSupplementSubmit = (formData: any) => {
    toast({
      title: "Supplement Created",
      description: "Your supplement has been successfully created.",
    });
    
    setIsCreating(false);
  };

  return {
    enhancedSupplements,
    selectedSupplement,
    setSelectedSupplement,
    isCreating,
    selectedProjectId,
    statusFilter,
    setStatusFilter,
    handleCreateSupplement,
    handleCancelCreate,
    handleSupplementSubmit
  };
}
