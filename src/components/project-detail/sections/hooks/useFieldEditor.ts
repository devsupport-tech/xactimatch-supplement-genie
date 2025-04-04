
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { ProjectSection, ProjectSectionType, updateProjectSection } from '@/utils/project-utils';

export type EditableField = 'type' | 'amount' | 'description';

export function useFieldEditor(
  section: ProjectSection, 
  projectId: string, 
  onSectionUpdate: (updatedSection: ProjectSection) => void
) {
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  
  const handleEdit = (field: EditableField, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleSave = async (field: EditableField) => {
    try {
      let updates: Partial<ProjectSection> = {};

      if (field === 'amount') {
        const amount = parseFloat(editValue);
        if (isNaN(amount)) {
          toast({
            title: "Invalid amount",
            description: "Please enter a valid number.",
            variant: "destructive",
          });
          return;
        }
        updates = { amount };
      } else if (field === 'type') {
        updates = { type: editValue as ProjectSectionType };
      } else if (field === 'description') {
        updates = { description: editValue };
      }

      await updateProjectSection(projectId, section.id, updates);
      
      // Update the section with new values
      const updatedSection = { ...section, ...updates };
      onSectionUpdate(updatedSection);
      
      toast({
        title: "Updated successfully",
        description: `The section ${field} has been updated.`,
      });
      
      setEditingField(null);
    } catch (error) {
      toast({
        title: "Error updating section",
        description: "There was an error updating the section. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    editingField,
    editValue,
    setEditValue,
    handleEdit,
    handleCancel,
    handleSave
  };
}
