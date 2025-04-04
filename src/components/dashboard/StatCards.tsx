
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2, DollarSign, Folder, PieChart, TrendingUp } from "lucide-react";
import { mockProjects } from "@/mock/projects";
import { mockSupplements } from "@/mock/supplements";
import { useNavigate } from 'react-router-dom';

export const StatCards = () => {
  const navigate = useNavigate();
  
  // Get stats from mock data
  const totalProjects = mockProjects.length;
  const pendingProjects = mockProjects.filter(p => p.status === 'pending').length;
  const inProgressProjects = mockProjects.filter(p => p.status === 'in-progress').length;
  const approvedProjects = mockProjects.filter(p => p.status === 'approved').length;
  
  // Calculate total supplemental value
  const totalSupplementValue = mockSupplements.reduce((sum, supplement) => sum + supplement.amount, 0);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <Card 
        className="cursor-pointer transition-all hover:shadow-md border-border/60" 
        onClick={() => navigate('/projects')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Folder className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-0 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{Math.floor(Math.random() * 5) + 1}
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="cursor-pointer transition-all hover:shadow-md border-border/60" 
        onClick={() => navigate('/projects')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
            <BarChart2 className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressProjects}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {inProgressProjects} in progress, {pendingProjects} pending
          </p>
        </CardContent>
      </Card>
      
      <Card 
        className="cursor-pointer transition-all hover:shadow-md border-border/60" 
        onClick={() => navigate('/supplements')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <PieChart className="h-4 w-4 text-indigo-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round((approvedProjects / totalProjects) * 100)}%</div>
          <div className="mt-2">
            <Progress 
              value={(approvedProjects / totalProjects) * 100} 
              className="h-1.5" 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="cursor-pointer transition-all hover:shadow-md border-border/60" 
        onClick={() => navigate('/supplements')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
          <CardTitle className="text-sm font-medium">Supplement Value</CardTitle>
          <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${totalSupplementValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            From {mockSupplements.length} supplements
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
