
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

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
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
              <SidebarMenuButton>
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
