import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  ClipboardList, 
  FileStack, 
  BarChartBig, 
  DollarSign,
  HardHat,
  LogOut,
  Settings,
  Building
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import WorkspaceSwitcher from './workspace/WorkspaceSwitcher';
import { Separator } from './ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const displayName = user?.user_metadata?.full_name || user?.email || 'User';
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects', label: 'Projects', icon: ClipboardList },
    { path: '/supplements', label: 'Supplements', icon: FileStack },
    { path: '/supplement-analysis', label: 'Supplement Analysis', icon: BarChartBig },
    { path: '/accounting', label: 'Accounting', icon: DollarSign },
    { path: '/contractors', label: 'Contractor Portal', icon: HardHat },
  ];
  
  const isCurrentPath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <Sidebar>
      <SidebarHeader className="py-5">
        <div className="flex items-center gap-2 px-4">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl tracking-tight">ClaimTrak</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Workspace Switcher */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>Current Workspace</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <WorkspaceSwitcher />
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Separator className="my-2 mx-2" />
        
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  isActive={isCurrentPath(item.path)} 
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="pb-6">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{displayName}</span>
              <span className="text-xs text-muted-foreground">{user?.user_metadata?.role || 'User'}</span>
            </div>
          </div>
          
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => navigate('/settings')}>
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
