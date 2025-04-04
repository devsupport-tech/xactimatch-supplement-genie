
import { FileText, PlusCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ProjectCardProps } from '@/components/ProjectCard';

interface ActivityTabProps {
  project: ProjectCardProps;
}

const ActivityTab = ({ project }: ActivityTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Activity Log</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Log
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4 p-4 border rounded-md">
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">Project Created</div>
            <div className="text-sm text-muted-foreground">Project was created by John Doe</div>
            <div className="text-xs text-muted-foreground mt-1">{new Date(project.dateCreated).toLocaleString()}</div>
          </div>
        </div>

        {project.supplements > 0 && (
          <div className="flex gap-4 p-4 border rounded-md">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Supplement Added</div>
              <div className="text-sm text-muted-foreground">Supplement #1 was created by Jane Smith</div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(project.lastUpdated).toLocaleDateString()}</div>
            </div>
          </div>
        )}

        {project.supplements > 1 && (
          <div className="flex gap-4 p-4 border rounded-md">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Supplement Added</div>
              <div className="text-sm text-muted-foreground">Supplement #2 was created by Jane Smith</div>
              <div className="text-xs text-muted-foreground mt-1">{new Date(project.lastUpdated).toLocaleDateString()}</div>
            </div>
          </div>
        )}

        <div className="flex gap-4 p-4 border rounded-md">
          <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium">Status Updated</div>
            <div className="text-sm text-muted-foreground">Project status was updated to {project.status.replace('-', ' ')}</div>
            <div className="text-xs text-muted-foreground mt-1">{new Date(project.lastUpdated).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
