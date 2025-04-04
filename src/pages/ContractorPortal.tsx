
import { useState } from 'react';
import { Building, Filter, Package, Search, BriefcaseBusiness, FileSpreadsheet, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { mockSupplements } from '@/mock/supplements';
import { mockProjects } from '@/mock/projects';
import { useNavigate } from 'react-router-dom';
import ContractorProjectCard from '@/components/contractor/ContractorProjectCard';
import ContractorSupplementCard from '@/components/contractor/ContractorSupplementCard';

// Combine project and supplement data
const enhancedSupplements = mockSupplements.map(supplement => {
  const project = mockProjects.find(p => p.id === supplement.projectId);
  return {
    ...supplement,
    projectName: project?.title || 'Unknown Project',
    clientName: project?.clientName || 'Unknown Client'
  };
});

const ContractorPortal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Filter projects and supplements based on search
  const filteredProjects = mockProjects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.claimNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredSupplements = enhancedSupplements.filter(supplement =>
    supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplement.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };
  
  const handleViewSupplement = (supplementId: string) => {
    navigate('/supplements', { state: { selectedSupplementId: supplementId } });
  };

  const handleCreateRequest = () => {
    navigate('/supplements/new-request');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8 mt-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Contractor Portal</h1>
            <p className="text-muted-foreground mt-1">Manage your projects and supplements</p>
          </div>
          
          <div className="flex w-full md:w-auto space-x-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects or supplements..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5 text-primary" />
                Your Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockProjects.length}</div>
              <p className="text-muted-foreground text-sm">Current projects assigned to you</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="mr-2 h-5 w-5 text-primary" />
                Pending Supplements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockSupplements.filter(s => s.status === 'pending').length}
              </div>
              <p className="text-muted-foreground text-sm">Supplements awaiting approval</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <BriefcaseBusiness className="mr-2 h-5 w-5 text-primary" />
                Available Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-muted-foreground text-sm">New opportunities available</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="projects" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="supplements">Supplements</TabsTrigger>
            </TabsList>
            
            <Button onClick={handleCreateRequest} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Supplement Request
            </Button>
          </div>
          
          <TabsContent value="projects" className="space-y-6 mt-6">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ContractorProjectCard 
                    key={project.id} 
                    project={project} 
                    onView={() => handleViewProject(project.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <Building className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchTerm ? 
                    `No projects match your search for "${searchTerm}"` : 
                    "There are no projects available at the moment."}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="supplements" className="space-y-6 mt-6">
            {filteredSupplements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSupplements.map(supplement => (
                  <ContractorSupplementCard
                    key={supplement.id} 
                    supplement={supplement}
                    onView={() => handleViewSupplement(supplement.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <FileSpreadsheet className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Supplements Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {searchTerm ? 
                    `No supplements match your search for "${searchTerm}"` : 
                    "There are no supplements available at the moment."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ContractorPortal;
