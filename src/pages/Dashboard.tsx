
import { useNavigate } from 'react-router-dom';
import { BarChart2, PieChart, TrendingUp, Folder, FileText, DollarSign, Plus, Users, UploadCloud, Check, ArrowUpRight, Coffee, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { mockProjects } from '@/mock/projects';
import { mockSupplements } from '@/mock/supplements';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import ProjectAnalytics from '@/components/dashboard/ProjectAnalytics';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openTeamDialog, setOpenTeamDialog] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Get some stats from mock data
  const totalProjects = mockProjects.length;
  const pendingProjects = mockProjects.filter(p => p.status === 'pending').length;
  const inProgressProjects = mockProjects.filter(p => p.status === 'in-progress').length;
  const approvedProjects = mockProjects.filter(p => p.status === 'approved').length;
  
  // Get latest 3 projects
  const recentProjects = [...mockProjects]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);
  
  // Calculate total supplemental value (differences added to projects)
  const totalSupplementValue = mockSupplements.reduce((sum, supplement) => sum + supplement.amount, 0);
  
  // Handler for generating reports
  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your report is being generated and will be ready shortly.",
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your report has been generated and is ready to download.",
        action: (
          <Button variant="outline" onClick={() => {
            // Mock download behavior
            const link = document.createElement('a');
            link.href = '#';
            link.setAttribute('download', 'project_report.pdf');
            link.click();
          }}>
            Download
          </Button>
        ),
      });
    }, 2000);
  };

  // Handler to navigate to supplements page with status filter
  const handleStatusClick = (status: string) => {
    navigate(`/supplements?status=${status}`);
  };
  
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-6 mt-16 max-w-7xl">
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
        
        {/* Stats Cards - clickable with updated design */}
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
        
        {/* Analytics Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Performance Overview</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? 'Hide Analytics' : 'Show Detailed Analytics'}
          </Button>
        </div>
        
        {/* Detailed Analytics Section */}
        {showAnalytics && (
          <div className="mb-8">
            <ProjectAnalytics />
          </div>
        )}
        
        {/* Main Content with updated design */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                      <p className="text-sm font-medium">
                        {mockProjects.filter(p => p.status === 'denied').length} projects
                      </p>
                    </div>
                    <Progress 
                      value={(mockProjects.filter(p => p.status === 'denied').length / totalProjects) * 100} 
                      className="h-2 bg-red-100 dark:bg-red-900/20" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
          </div>
          
          <div className="space-y-6">
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <Button className="justify-start bg-primary h-auto py-3 px-4" asChild>
                    <Link to="/projects">
                      <Folder className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Projects</div>
                        <div className="text-xs opacity-90">View all projects</div>
                      </div>
                    </Link>
                  </Button>
                  <Button className="justify-start bg-primary h-auto py-3 px-4">
                    <Plus className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">Create</div>
                      <div className="text-xs opacity-90">New project</div>
                    </div>
                  </Button>
                  <Button 
                    className="justify-start h-auto py-3 px-4"
                    variant="outline"
                    onClick={handleGenerateReport}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">Report</div>
                      <div className="text-xs text-muted-foreground">Generate report</div>
                    </div>
                  </Button>
                  <Button 
                    className="justify-start h-auto py-3 px-4"
                    variant="outline"
                    onClick={() => setOpenTeamDialog(true)}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <div className="text-left">
                      <div className="text-sm font-medium">Team</div>
                      <div className="text-xs text-muted-foreground">Manage team</div>
                    </div>
                  </Button>
                  <Button
                    className="justify-start h-auto py-3 px-4"
                    variant="outline"
                    asChild
                  >
                    <Link to="/supplements">
                      <UploadCloud className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Upload</div>
                        <div className="text-xs text-muted-foreground">New PDF</div>
                      </div>
                    </Link>
                  </Button>
                  <Button 
                    className="justify-start h-auto py-3 px-4"
                    variant="outline"
                    asChild
                  >
                    <Link to="/settings">
                      <Calendar className="mr-2 h-4 w-4" />
                      <div className="text-left">
                        <div className="text-sm font-medium">Calendar</div>
                        <div className="text-xs text-muted-foreground">View schedule</div>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Monthly Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Projects Completed</p>
                      <span className="text-green-500 text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        12%
                      </span>
                    </div>
                    <Progress value={65} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Revenue Growth</p>
                      <span className="text-green-500 text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        8%
                      </span>
                    </div>
                    <Progress value={48} className="h-1.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Client Satisfaction</p>
                      <span className="text-green-500 text-xs font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        5%
                      </span>
                    </div>
                    <Progress value={92} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-border/60 shadow-sm overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New project created</p>
                      <p className="text-xs text-muted-foreground mt-1">Today, 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Project #1023 approved</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday, 3:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New team member added</p>
                      <p className="text-xs text-muted-foreground mt-1">Aug 12, 9:15 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <Coffee className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Client meeting scheduled</p>
                      <p className="text-xs text-muted-foreground mt-1">Aug 14, 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Team Management Dialog */}
      <Dialog open={openTeamDialog} onOpenChange={setOpenTeamDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Team</DialogTitle>
            <DialogDescription>
              Add or remove team members and manage their permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              {[
                { name: "John Doe", role: "Admin", avatar: "JD" },
                { name: "Jane Smith", role: "Editor", avatar: "JS" },
                { name: "Robert Johnson", role: "Viewer", avatar: "RJ" }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between border border-border/60 p-3 rounded-md">
                  <div className="flex gap-3 items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              ))}
            </div>
            
            <Separator className="my-1" />
            
            <div className="grid gap-2">
              <Label htmlFor="email">Add team member</Label>
              <div className="flex gap-2">
                <Input id="email" placeholder="Email address" className="flex-1" />
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenTeamDialog(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
