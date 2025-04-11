
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useWorkspace } from '@/hooks/use-workspace';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import WorkspacesSection from '@/components/settings/WorkspacesSection';
import ProfileSection from '@/components/settings/ProfileSection';
import AppearanceSection from '@/components/settings/AppearanceSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import AdvancedSection from '@/components/settings/AdvancedSection';
import UsersSection from '@/components/settings/UsersSection';
import FeesSection from '@/components/settings/FeesSection';
import { Separator } from '@/components/ui/separator';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Moon, Sun, Bell, Settings as SettingsIcon, Users, DollarSign } from 'lucide-react';

const Settings = () => {
  const { theme } = useTheme();
  const { currentWorkspace, setCurrentWorkspace, handleWorkspaceChange, getCurrentWorkspace } = useWorkspace();
  const { section } = useParams();
  const navigate = useNavigate();
  
  // Default to profile section if none is specified
  const activeSection = section || 'profile';
  
  // Handle tab change
  const handleTabChange = (value: string) => {
    navigate(`/settings/${value}`);
  };
  
  // Profile form initial data
  const initialProfileData = {
    firstName: 'Jane',
    lastName: 'Contractor',
    email: 'jane.contractor@example.com',
    company: getCurrentWorkspace()?.name || 'Premier Restoration Co.',
  };

  // Render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'workspaces':
        return (
          <WorkspacesSection 
            currentWorkspace={currentWorkspace}
            setCurrentWorkspace={setCurrentWorkspace}
            onWorkspaceChange={handleWorkspaceChange}
          />
        );
      case 'profile':
        return <ProfileSection initialData={initialProfileData} />;
      case 'appearance':
        return <AppearanceSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'advanced':
        return <AdvancedSection />;
      case 'users':
        return <UsersSection />;
      case 'fees':
        return <FeesSection />;
      default:
        return <ProfileSection initialData={initialProfileData} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-10 px-4 md:px-6 max-w-5xl">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <Separator className="mb-6" />
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile tabs for navigation */}
          <div className="md:hidden w-full mb-6">
            <Tabs value={activeSection} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid grid-cols-3 mb-2 w-full">
                <TabsTrigger value="profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="workspaces">
                  <Building className="mr-2 h-4 w-4" />
                  Workspaces
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-3 mb-2 w-full">
                <TabsTrigger value="appearance">
                  {theme === 'dark' ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  Theme
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="fees">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Fees
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-1 w-full">
                <TabsTrigger value="advanced">
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Desktop sidebar */}
          <aside className="hidden md:block md:w-1/4">
            <SettingsSidebar theme={theme} activeSection={activeSection} onSectionChange={handleTabChange} />
          </aside>
          
          {/* Content area */}
          <div className="flex-1 space-y-6">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
