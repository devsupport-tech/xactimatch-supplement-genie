
import { ProjectCardProps } from '@/components/ProjectCard';
import ProjectDetailsCard from './ProjectDetailsCard';
import FinancialSummary from './FinancialSummary';
import SupplementsCard from './SupplementsCard';
import ProjectSectionsCard from './ProjectSectionsCard';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectOverviewProps {
  project: ProjectCardProps;
  setActiveTab: (tab: string) => void;
}

const ProjectOverview = ({ project, setActiveTab }: ProjectOverviewProps) => {
  const navigate = useNavigate();
  
  const handleViewAccountingClick = () => {
    navigate('/accounting');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <ProjectDetailsCard project={project} />
        <ProjectSectionsCard project={project} />
      </div>

      <div className="space-y-6">
        <FinancialSummary project={project} />
        <SupplementsCard project={project} />
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewAccountingClick}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            View Contractor Payments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
