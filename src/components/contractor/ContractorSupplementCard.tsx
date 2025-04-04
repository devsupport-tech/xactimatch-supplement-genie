
import { CalendarDays, FileText, Building, CreditCard } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Supplement } from '@/types/supplement';

interface ContractorSupplementCardProps {
  supplement: Supplement & { projectName: string, clientName?: string };
  onView: () => void;
}

const statusStyles = {
  'pending': { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Pending' },
  'approved': { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
  'denied': { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Denied' }
};

const ContractorSupplementCard = ({ supplement, onView }: ContractorSupplementCardProps) => {
  const statusStyle = statusStyles[supplement.status as keyof typeof statusStyles];
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] animate-fade-in cursor-pointer"
      onClick={onView}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${statusStyle.bg} ${statusStyle.color} border-0`}>
            {statusStyle.label}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(supplement.dateCreated).toLocaleDateString()}
          </span>
        </div>
        <CardTitle className="line-clamp-1 text-lg">{supplement.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Building className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="truncate">{supplement.projectName}</span>
          </div>
          {supplement.clientName && (
            <div className="flex items-center text-sm">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{supplement.clientName}</span>
            </div>
          )}
          <div className="flex items-center text-sm">
            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(supplement.amount)}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Created {new Date(supplement.dateCreated).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          className="w-full transition-all duration-200 hover:translate-y-[-2px]" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent onClick
            onView();
          }}
        >
          View Supplement
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContractorSupplementCard;
