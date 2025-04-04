
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCardProps } from '@/components/ProjectCard';
import { mockProjects } from '@/mock/projects';
import { Button } from '@/components/ui/button';

interface ProjectNavigationProps {
  project: ProjectCardProps;
}

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  return (
    <div className="flex justify-between items-center bg-muted/30 rounded-lg p-3">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground mr-2">Project Navigation</span>
      </div>
      <div className="flex gap-2">
        {parseInt(project.id) > 1 ? (
          <Button variant="outline" size="sm" asChild className="h-8">
            <Link to={`/projects/${parseInt(project.id) - 1}`} className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous Project
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="h-8">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous Project
          </Button>
        )}
        {parseInt(project.id) < mockProjects.length ? (
          <Button variant="outline" size="sm" asChild className="h-8">
            <Link to={`/projects/${parseInt(project.id) + 1}`} className="flex items-center">
              Next Project
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="h-8">
            Next Project
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;
