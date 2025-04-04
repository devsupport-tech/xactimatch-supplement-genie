
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Check, Clock, TrendingUp } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { mockProjects } from '@/mock/projects';

export const RecentProjects = () => {
  const navigate = useNavigate();
  
  // Get latest 3 projects
  const recentProjects = [...mockProjects]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);

  return (
    <Card className="border-border/60 shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Projects</CardTitle>
            <CardDescription>Your latest project updates</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-xs h-8" onClick={() => navigate('/projects')}>
            View All
            <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {recentProjects.map((project) => {
            const statusConfig = {
              'pending': { color: 'bg-amber-50 text-amber-600 border-amber-200', icon: <Clock className="h-3 w-3 mr-1" /> },
              'in-progress': { color: 'bg-blue-50 text-blue-600 border-blue-200', icon: <TrendingUp className="h-3 w-3 mr-1" /> },
              'approved': { color: 'bg-green-50 text-green-600 border-green-200', icon: <Check className="h-3 w-3 mr-1" /> },
              'denied': { color: 'bg-red-50 text-red-600 border-red-200', icon: null }
            };
            
            const status = statusConfig[project.status];
            
            return (
              <div 
                key={project.id} 
                className="px-6 py-4 cursor-pointer hover:bg-accent/20 transition-colors"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge 
                        variant="outline" 
                        className={`font-normal border-0 text-xs pl-1.5 ${status.color}`}
                      >
                        {status.icon}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {project.clientName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm text-right mr-3">
                      <div className="font-medium">${project.totalAmount.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(project.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="border-t border-border/60 px-6 py-4">
        <Button variant="outline" className="w-full" asChild>
          <Link to="/projects">View All Projects</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
