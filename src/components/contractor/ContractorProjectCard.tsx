
import { Building2, FileEdit, CalendarDays, CreditCard } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectCardProps } from '@/components/ProjectCard';

interface ContractorProjectCardProps {
  project: ProjectCardProps;
  onView: () => void;
}

const statusStyles = {
  'pending': { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Pending' },
  'in-progress': { color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', label: 'In Progress' },
  'approved': { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
  'denied': { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Denied' }
};

const ContractorProjectCard = ({ project, onView }: ContractorProjectCardProps) => {
  const statusStyle = statusStyles[project.status as keyof typeof statusStyles];
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${statusStyle.bg} ${statusStyle.color} border-0`}>
            {statusStyle.label}
          </Badge>
          <span className="text-sm text-muted-foreground">#{project.claimNumber}</span>
        </div>
        <CardTitle className="line-clamp-1 text-lg">{project.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{project.clientName}</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Created {new Date(project.dateCreated).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(project.totalAmount)}</span>
          </div>
          {project.supplements > 0 && (
            <div className="flex items-center text-sm">
              <FileEdit className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{project.supplements} supplement{project.supplements > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full" onClick={onView}>
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContractorProjectCard;
