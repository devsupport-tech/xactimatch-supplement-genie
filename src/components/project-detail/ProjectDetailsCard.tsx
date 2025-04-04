
import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProjectCardProps } from '@/components/ProjectCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateProject } from '@/utils/project-utils';
import { toast } from '@/components/ui/use-toast';

interface ProjectDetailsCardProps {
  project: ProjectCardProps;
}

const ProjectDetailsCard = ({ project }: ProjectDetailsCardProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [clientNumber, setClientNumber] = useState('CN-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'));

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleSave = async (field: string) => {
    try {
      const value = field === 'totalAmount' ? parseFloat(editValue) : 
                    field === 'clientNumber' ? clientNumber : editValue;
      
      // Update project
      await updateProject(project.id, field, value);
      
      if (field === 'clientNumber') {
        setClientNumber(editValue);
      }
      
      // Show success notification
      toast({
        title: "Updated successfully",
        description: `The ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} has been updated.`,
      });
      
      setEditingField(null);
    } catch (error) {
      toast({
        title: "Error updating project",
        description: "There was an error updating the project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderEditableField = (label: string, value: string | number, field: string) => {
    const isEditing = editingField === field;
    const displayValue = typeof value === 'number' 
      ? field === 'totalAmount' 
        ? value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : value.toString()
      : value;

    return (
      <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-border transition-colors duration-200">
        <h4 className="text-sm font-medium text-muted-foreground mb-1">{label}</h4>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input 
              value={editValue} 
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 py-1"
              type={field === 'totalAmount' ? 'number' : 'text'}
              step={field === 'totalAmount' ? '0.01' : undefined}
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={() => handleSave(field)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center group">
            <p className="text-base mr-2">
              {field === 'totalAmount' ? '$' : ''}{displayValue}
            </p>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleEdit(field, value.toString())}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>Basic information about this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-border transition-colors duration-200">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Client Name</h4>
            <p className="text-base">{project.clientName}</p>
          </div>
          
          {renderEditableField('Client Number', clientNumber, 'clientNumber')}
          
          <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-border transition-colors duration-200">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Claim Number</h4>
            <p className="text-base">{project.claimNumber}</p>
          </div>
          
          <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-border transition-colors duration-200">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Created Date</h4>
            <p className="text-base">{new Date(project.dateCreated).toLocaleDateString()}</p>
          </div>
          
          <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-border transition-colors duration-200">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
            <p className="text-base">{new Date(project.lastUpdated).toLocaleDateString()}</p>
          </div>
          
          <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-border transition-colors duration-200">
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
            <p className="text-base capitalize">{project.status.replace('-', ' ')}</p>
          </div>
          
          {renderEditableField('Total Amount', project.totalAmount, 'totalAmount')}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsCard;
