
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileEdit, Printer, Download, Share2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCardProps } from '@/components/ProjectCard';
import { StatusChangeButton } from './StatusChangeButton';
import { useToast } from '@/components/ui/use-toast';
import { updateProject } from '@/utils/project-utils';

interface ProjectHeaderProps {
  project: ProjectCardProps;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const [currentProject, setCurrentProject] = useState(project);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(project.title);
  const { toast } = useToast();

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'approved' | 'denied') => {
    setCurrentProject({
      ...currentProject,
      status: newStatus
    });
  };

  const handlePrint = () => {
    toast({
      title: "Printing project",
      description: `Preparing to print project #${currentProject.claimNumber}`,
    });
    window.print();
  };

  const handleExport = () => {
    toast({
      title: "Exporting project",
      description: `Project #${currentProject.claimNumber} is being exported`,
    });
    // In a real app, this would trigger a file download
  };

  const handleShare = () => {
    // Generate a shareable link for the current project
    const shareableLink = `${window.location.origin}/projects/${currentProject.id}`;
    
    // In a real app, this might open a share dialog or copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this project with others",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy link",
        description: "Please try again or copy the URL manually",
        variant: "destructive",
      });
    });
  };

  const handleToggleEdit = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setTitle(currentProject.title);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateProject(currentProject.id, 'title', title);
      setCurrentProject({
        ...currentProject,
        title
      });
      setEditMode(false);
      toast({
        title: "Project updated",
        description: "The project title has been updated",
      });
    } catch (error) {
      toast({
        title: "Error updating project",
        description: "There was an error updating the project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
      <div className="flex-1">
        {editMode ? (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold h-auto py-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSaveEdit}
                className="h-8 w-8"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleEdit}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-muted-foreground">Claim #{currentProject.claimNumber}</span>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold">{currentProject.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-muted-foreground">Claim #{currentProject.claimNumber}</span>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <StatusChangeButton 
          currentStatus={currentProject.status} 
          onStatusChange={handleStatusChange} 
        />
        
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button onClick={handleToggleEdit}>
          <FileEdit className="mr-2 h-4 w-4" />
          {editMode ? "Cancel Edit" : "Edit Project"}
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;
