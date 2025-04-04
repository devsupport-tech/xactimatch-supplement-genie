
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Building, User, Moon, Sun, Bell, Settings as SettingsIcon, Users, DollarSign, Briefcase } from 'lucide-react';
import { workspaces } from './WorkspacesSection';
import { useWorkspace } from '@/hooks/use-workspace';
import { Badge } from '@/components/ui/badge';

interface SettingsSidebarProps {
  theme: string;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsSidebar = ({ theme, activeSection, onSectionChange }: SettingsSidebarProps) => {
  const { currentWorkspace } = useWorkspace();
  const workspace = workspaces.find(w => w.id === currentWorkspace);
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        {workspace && (
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Briefcase className="mr-1 h-3 w-3" />
              {workspace.name}
            </Badge>
          </div>
        )}
        
        <Separator className="my-4" />
        <nav className="flex flex-col space-y-1">
          <Button 
            variant={activeSection === 'profile' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('profile')}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button 
            variant={activeSection === 'workspaces' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('workspaces')}
          >
            <Building className="mr-2 h-4 w-4" />
            Workspaces
          </Button>
          <Button 
            variant={activeSection === 'users' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Users & Permissions
          </Button>
          <Button 
            variant={activeSection === 'fees' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('fees')}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Fee Settings
          </Button>
          <Button 
            variant={activeSection === 'appearance' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('appearance')}
          >
            {theme === 'dark' ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            Appearance
          </Button>
          <Button 
            variant={activeSection === 'notifications' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('notifications')}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button 
            variant={activeSection === 'advanced' ? 'default' : 'ghost'} 
            className="justify-start" 
            onClick={() => onSectionChange('advanced')}
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            Advanced
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
};

export default SettingsSidebar;
