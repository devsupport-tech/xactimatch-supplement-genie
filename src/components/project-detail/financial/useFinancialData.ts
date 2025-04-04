
import { useState, useEffect } from 'react';
import { ProjectCardProps } from '@/components/ProjectCard';
import { updateProject } from '@/utils/project-utils';
import { toast } from '@/hooks/use-toast';
import { mockSupplements } from '@/mock/supplements';

export const useFinancialData = (project: ProjectCardProps) => {
  const [totalSupplementAmount, setTotalSupplementAmount] = useState<number>(0);
  
  // Calculate the total supplement amount for this project
  useEffect(() => {
    const projectSupplements = mockSupplements.filter(
      supplement => supplement.projectId === project.id
    );
    
    const total = projectSupplements.reduce(
      (sum, supplement) => sum + supplement.amount, 
      0
    );
    
    setTotalSupplementAmount(total);
  }, [project.id]);
  
  const handleSave = async (field: string, value: number) => {
    try {
      // For supplemental, we'd need to update a different field in a real app
      // Here we're just showing the UI interaction
      if (field === 'supplemental') {
        toast({
          title: "Updated supplemental amount",
          description: `Supplemental amount updated to $${value.toFixed(2)}`,
        });
        return;
      }
      
      // Update project total amount
      await updateProject(project.id, 'totalAmount', value);
      
      toast({
        title: "Updated successfully",
        description: `The ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error updating project",
        description: "There was an error updating the project. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Calculate the total with supplements
  const totalWithSupplements = project.totalAmount + totalSupplementAmount;

  return {
    totalSupplementAmount,
    totalWithSupplements,
    handleSave
  };
};
