
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  FileText, 
  Calendar, 
  Clock, 
  DollarSign,
  MoreVertical 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  id: string;
  title: string;
  clientName: string;
  claimNumber: string;
  status: 'pending' | 'in-progress' | 'approved' | 'denied';
  dateCreated: string;
  lastUpdated: string;
  totalAmount: number;
  supplements: number;
  className?: string;
}

const ProjectCard = ({
  id,
  title,
  clientName,
  claimNumber,
  status,
  dateCreated,
  lastUpdated,
  totalAmount,
  supplements,
  className
}: ProjectCardProps) => {
  const statusStyles = {
    'pending': { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Pending' },
    'in-progress': { color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', label: 'In Progress' },
    'approved': { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
    'denied': { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Denied' }
  };

  return (
    <Link to={`/projects/${id}`} className="block">
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/80 cursor-pointer animate-fade-in hover:translate-y-[-4px]",
        className
      )}>
        <CardHeader className="p-6 pb-4 flex flex-row items-start justify-between space-y-0">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <Badge 
                variant="outline" 
                className={cn(
                  "font-normal border-0",
                  statusStyles[status].bg, 
                  statusStyles[status].color
                )}
              >
                {statusStyles[status].label}
              </Badge>
              {supplements > 0 && (
                <Badge variant="secondary" className="font-normal">
                  {supplements} Supplement{supplements > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl font-medium">{title}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {clientName} • Claim #{claimNumber}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem asChild>
                <Link to={`/projects/${id}`} className="transition-colors duration-200 hover:text-primary">View details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:text-primary">Create supplement</DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:text-primary">Export data</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive transition-colors duration-200 hover:bg-destructive/10">Delete project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent className="p-6 pt-0 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Created
            </div>
            <div className="text-sm font-medium">
              {new Date(dateCreated).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last Updated
            </div>
            <div className="text-sm font-medium">
              {new Date(lastUpdated).toLocaleDateString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              Total Amount
            </div>
            <div className="text-sm font-medium">
              ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-2 flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-1" />
            <span>{supplements > 0 ? `${supplements} supplemental request${supplements > 1 ? 's' : ''}` : 'No supplements yet'}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
