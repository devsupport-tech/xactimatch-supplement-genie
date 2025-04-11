
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface SupplementHeaderProps {
  statusFilter: string;
  onCreateSupplement: () => void;
}

const SupplementHeader = ({ statusFilter, onCreateSupplement }: SupplementHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold">
          {statusFilter !== 'all' ? 
            `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Supplements` : 
            'Supplemental Requests'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {statusFilter !== 'all' ? 
            `Viewing all ${statusFilter} supplemental requests` : 
            'Manage and review all supplemental requests across projects'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button onClick={onCreateSupplement}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Supplement
        </Button>
      </div>
    </div>
  );
};

export default SupplementHeader;
