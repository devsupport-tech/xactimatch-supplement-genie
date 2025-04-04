
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { mockProjects } from '@/mock/projects';

export const ProjectStatusSection = () => {
  const navigate = useNavigate();
  
  // Get stats from mock data
  const totalProjects = mockProjects.length;
  const pendingProjects = mockProjects.filter(p => p.status === 'pending').length;
  const inProgressProjects = mockProjects.filter(p => p.status === 'in-progress').length;
  const approvedProjects = mockProjects.filter(p => p.status === 'approved').length;
  const deniedProjects = mockProjects.filter(p => p.status === 'denied').length;
  
  // Handler to navigate to supplements page with status filter
  const handleStatusClick = (status: string) => {
    navigate(`/supplements?status=${status}`);
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Project Status</CardTitle>
            <CardDescription>Distribution of projects by current status</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate('/projects')}>
            View All
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-5 mt-2">
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleStatusClick('pending')}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                <p className="text-sm font-medium">Pending</p>
              </div>
              <p className="text-sm font-medium">{pendingProjects} projects</p>
            </div>
            <Progress 
              value={(pendingProjects / totalProjects) * 100} 
              className="h-2 bg-amber-100 dark:bg-amber-900/20" 
            />
          </div>
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleStatusClick('in-progress')}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <p className="text-sm font-medium">In Progress</p>
              </div>
              <p className="text-sm font-medium">{inProgressProjects} projects</p>
            </div>
            <Progress 
              value={(inProgressProjects / totalProjects) * 100} 
              className="h-2 bg-blue-100 dark:bg-blue-900/20" 
            />
          </div>
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleStatusClick('approved')}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <p className="text-sm font-medium">Approved</p>
              </div>
              <p className="text-sm font-medium">{approvedProjects} projects</p>
            </div>
            <Progress 
              value={(approvedProjects / totalProjects) * 100} 
              className="h-2 bg-green-100 dark:bg-green-900/20" 
            />
          </div>
          <div 
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleStatusClick('denied')}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <p className="text-sm font-medium">Denied</p>
              </div>
              <p className="text-sm font-medium">{deniedProjects} projects</p>
            </div>
            <Progress 
              value={(deniedProjects / totalProjects) * 100} 
              className="h-2 bg-red-100 dark:bg-red-900/20" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
