
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for workspaces/contractors
export const workspaces = [
  { id: '1', name: 'Premier Restoration Co.', role: 'Admin' },
  { id: '2', name: 'City Builders LLC', role: 'Contractor' },
  { id: '3', name: 'Apex Reconstruction', role: 'Project Manager' },
];

interface WorkspacesSectionProps {
  currentWorkspace: string;
  setCurrentWorkspace: (value: string) => void;
  onWorkspaceChange: (value: string) => void;
}

const WorkspacesSection = ({ 
  currentWorkspace, 
  setCurrentWorkspace, 
  onWorkspaceChange 
}: WorkspacesSectionProps) => {
  const { toast } = useToast();
  
  const handleCreateWorkspace = () => {
    toast({
      title: "Create workspace",
      description: "Workspace creation form would open here."
    });
  };

  return (
    <Card id="workspaces">
      <CardHeader>
        <CardTitle>Workspaces</CardTitle>
        <CardDescription>
          Switch between different contractors or workspaces
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="workspace-select">Current workspace</Label>
            <Button variant="outline" size="sm" onClick={handleCreateWorkspace}>
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </div>
          
          <Select value={currentWorkspace} onValueChange={onWorkspaceChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map(workspace => (
                <SelectItem key={workspace.id} value={workspace.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{workspace.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">({workspace.role})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Current role</h4>
          <p className="text-sm text-muted-foreground">
            {workspaces.find(w => w.id === currentWorkspace)?.role || 'Admin'} 
            at {workspaces.find(w => w.id === currentWorkspace)?.name || 'Premier Restoration Co.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkspacesSection;
