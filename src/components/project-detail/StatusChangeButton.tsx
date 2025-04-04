
import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface StatusChangeButtonProps {
  currentStatus: 'pending' | 'in-progress' | 'approved' | 'denied';
  onStatusChange: (newStatus: 'pending' | 'in-progress' | 'approved' | 'denied') => void;
}

const statusStyles = {
  'pending': { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Pending' },
  'in-progress': { color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', label: 'In Progress' },
  'approved': { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
  'denied': { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Denied' }
};

export function StatusChangeButton({ currentStatus, onStatusChange }: StatusChangeButtonProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'approved' | 'denied') => {
    setStatus(newStatus);
    onStatusChange(newStatus);
    
    toast({
      title: "Status updated",
      description: `Project status changed to ${statusStyles[newStatus].label}`,
      variant: "default",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 min-w-32">
          <Badge 
            variant="outline" 
            className={cn(
              "font-normal border-0 mr-1",
              statusStyles[status].bg, 
              statusStyles[status].color
            )}
          >
            {statusStyles[status].label}
          </Badge>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(statusStyles).map(([statusKey, statusData]) => (
          <DropdownMenuItem
            key={statusKey}
            onClick={() => handleStatusChange(statusKey as 'pending' | 'in-progress' | 'approved' | 'denied')}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              status === statusKey && "font-medium"
            )}
          >
            <span className={cn(statusData.color)}>
              {statusData.label}
            </span>
            {status === statusKey && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
