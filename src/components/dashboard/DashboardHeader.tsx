
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Folder, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DashboardHeader = () => {
  const navigate = useNavigate();

  // Get current user greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get current date in formatted string
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-lg text-muted-foreground">{getGreeting()}, <span className="font-medium text-foreground">John</span></span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{getCurrentDate()}</h1>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => navigate('/projects')} className="shadow-sm h-9 px-4">
          <Folder className="mr-2 h-4 w-4" />
          Projects
        </Button>
        <Button className="shadow-sm h-9 px-4 bg-primary">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
    </div>
  );
};
