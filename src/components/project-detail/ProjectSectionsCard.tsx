
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProjectCardProps } from '@/components/ProjectCard';
import { ProjectSection, ProjectSectionType, getProjectSections, createProjectSection } from '@/utils/project-utils';
import { toast } from '@/components/ui/use-toast';
import SectionsList from './sections/SectionsList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ProjectSectionsCardProps {
  project: ProjectCardProps;
}

const ProjectSectionsCard = ({ project }: ProjectSectionsCardProps) => {
  const [sections, setSections] = useState<ProjectSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSectionType, setNewSectionType] = useState<ProjectSectionType>('content-manipulation');
  const [newSectionAmount, setNewSectionAmount] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadSections = async () => {
      try {
        const projectSections = await getProjectSections(project.id);
        setSections(projectSections);
      } catch (error) {
        console.error('Failed to load project sections:', error);
        toast({
          title: "Error loading sections",
          description: "Could not load project sections. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, [project.id]);

  const handleSectionUpdate = (updatedSection: ProjectSection) => {
    setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
  };

  const handleAddSection = () => {
    // Open the dialog to add a new section
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // Reset form values
    setNewSectionType('content-manipulation');
    setNewSectionAmount('');
    setNewSectionDescription('');
  };

  const handleCreateSection = async () => {
    // Validate input
    if (!newSectionAmount || isNaN(parseFloat(newSectionAmount)) || parseFloat(newSectionAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    try {
      const newSection = await createProjectSection(project.id, {
        type: newSectionType,
        amount: parseFloat(newSectionAmount),
        description: newSectionDescription
      });

      // Add the new section to the list
      setSections(prev => [...prev, newSection]);
      
      handleDialogClose();
      
      toast({
        title: "Section created",
        description: "New section has been added successfully.",
      });
    } catch (error) {
      console.error('Failed to create section:', error);
      toast({
        title: "Error creating section",
        description: "Failed to create new section. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Sections</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddSection}
          className="h-8"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-4 text-center text-muted-foreground">Loading sections...</div>
        ) : (
          <SectionsList 
            sections={sections} 
            projectId={project.id} 
            onSectionUpdate={handleSectionUpdate} 
          />
        )}
      </CardContent>

      {/* Add Section Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="section-type">Section Type</Label>
              <Select value={newSectionType} onValueChange={(value: ProjectSectionType) => setNewSectionType(value)}>
                <SelectTrigger id="section-type">
                  <SelectValue placeholder="Select section type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content-manipulation">Content Manipulation</SelectItem>
                  <SelectItem value="demo-mit">Demo/Mit</SelectItem>
                  <SelectItem value="rebuild">Rebuild</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section-amount">Amount ($)</Label>
              <Input
                id="section-amount"
                type="number"
                step="0.01"
                min="0"
                value={newSectionAmount}
                onChange={(e) => setNewSectionAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="section-description">Description</Label>
              <Input
                id="section-description"
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
                placeholder="Enter section description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleCreateSection} disabled={isCreating}>
              {isCreating ? (
                <>
                  <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Creating...
                </>
              ) : 'Create Section'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProjectSectionsCard;
