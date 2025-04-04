
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { mockLineItems } from '@/mock/lineItems';
import { useProject } from '@/hooks/use-projects';

// Import refactored components
import ProjectHeader from '@/components/project-detail/ProjectHeader';
import ProjectNavigation from '@/components/project-detail/ProjectNavigation';
import ProjectTabsNav from '@/components/project-detail/ProjectTabsNav';
import ProjectOverview from '@/components/project-detail/ProjectOverview';
import LineItemsTab from '@/components/project-detail/LineItemsTab';
import SupplementsTab from '@/components/project-detail/SupplementsTab';
import DocumentsTab from '@/components/project-detail/DocumentsTab';
import ActivityTab from '@/components/project-detail/ActivityTab';

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: project, isLoading, error } = useProject(id || '');
  
  if (isLoading) {
    return (
      <div className="p-6">
        <Link to="/projects" className="inline-flex items-center text-sm mb-8 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6">
        <Link to="/projects" className="inline-flex items-center text-sm mb-8 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link to="/projects" className="inline-flex items-center text-sm mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>
      
      {/* Move ProjectNavigation to the top */}
      <div className="mb-6">
        <ProjectNavigation project={project} />
      </div>
      
      <ProjectHeader project={project} />

      <Tabs defaultValue="overview" className="mt-8" onValueChange={setActiveTab}>
        <ProjectTabsNav project={project} setActiveTab={setActiveTab} />

        <TabsContent value="overview" className="mt-6">
          <ProjectOverview project={project} setActiveTab={setActiveTab} />
        </TabsContent>

        <TabsContent value="lineitems" className="mt-6">
          <LineItemsTab items={mockLineItems} />
        </TabsContent>

        <TabsContent value="supplements" className="mt-6">
          <SupplementsTab project={project} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ActivityTab project={project} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
