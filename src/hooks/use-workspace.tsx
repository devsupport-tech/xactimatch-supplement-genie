
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { workspaces } from '@/components/settings/WorkspacesSection';

export function useWorkspace() {
  const { toast } = useToast();
  const [currentWorkspace, setCurrentWorkspace] = useState('1');
  
  const handleWorkspaceChange = (value: string) => {
    setCurrentWorkspace(value);
    
    // Find the selected workspace
    const workspace = workspaces.find(w => w.id === value);
    
    // Show notification
    if (workspace) {
      toast({
        title: "Workspace changed",
        description: `You've switched to ${workspace.name}`
      });
    }
  };

  const getCurrentWorkspace = () => {
    return workspaces.find(w => w.id === currentWorkspace);
  };
  
  return {
    currentWorkspace,
    setCurrentWorkspace,
    handleWorkspaceChange,
    getCurrentWorkspace
  };
}
