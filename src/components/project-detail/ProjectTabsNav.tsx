
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCardProps } from '@/components/ProjectCard';

interface ProjectTabsNavProps {
  project: ProjectCardProps;
  setActiveTab: (value: string) => void;
}

const ProjectTabsNav = ({ project, setActiveTab }: ProjectTabsNavProps) => {
  return (
    <div className="border-b">
      <TabsList className="bg-transparent p-0">
        <TabsTrigger 
          value="overview" 
          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="lineitems" 
          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Line Items
        </TabsTrigger>
        <TabsTrigger 
          value="supplements" 
          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Supplements ({project.supplements})
        </TabsTrigger>
        <TabsTrigger 
          value="documents" 
          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Documents
        </TabsTrigger>
        <TabsTrigger 
          value="activity" 
          className="data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 -mb-px data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
        >
          Activity
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default ProjectTabsNav;
