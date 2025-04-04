
import React, { useState } from 'react';
import { 
  Building, 
  ChevronDown, 
  Check, 
  PlusCircle 
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useWorkspace } from '@/hooks/use-workspace';
import { useToast } from '@/hooks/use-toast';
import { workspaces } from '@/components/settings/WorkspacesSection';

const WorkspaceSwitcher = () => {
  const [open, setOpen] = useState(false);
  const { currentWorkspace, handleWorkspaceChange } = useWorkspace();
  const { toast } = useToast();
  
  const current = workspaces.find(workspace => workspace.id === currentWorkspace);
  
  const handleCreateWorkspace = () => {
    toast({
      title: "Create workspace",
      description: "Workspace creation form would open here."
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open} 
          aria-label="Select a workspace"
          className="w-full justify-between text-left font-normal"
        >
          <div className="flex items-center gap-2 truncate">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="bg-primary/10 text-xs">
                {current?.name.substring(0, 2) || 'PR'}
              </AvatarFallback>
            </Avatar>
            <span className="truncate">{current?.name || 'Premier Restoration Co.'}</span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search workspace..." className="h-9" />
          <CommandEmpty>No workspace found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Workspaces">
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  onSelect={() => {
                    handleWorkspaceChange(workspace.id);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarFallback className="bg-primary/10 text-xs">
                      {workspace.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{workspace.name}</span>
                  {workspace.id === currentWorkspace && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={handleCreateWorkspace}
                className="cursor-pointer text-sm"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Create Workspace</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default WorkspaceSwitcher;
