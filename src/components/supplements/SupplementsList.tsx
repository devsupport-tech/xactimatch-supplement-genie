
import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Supplement } from '@/types/supplement';

interface SupplementsListProps {
  supplements: Supplement[];
  selectedSupplement: Supplement | null;
  onSelectSupplement: (supplement: Supplement) => void;
  initialStatusFilter?: string;
}

const SupplementsList = ({ 
  supplements, 
  selectedSupplement, 
  onSelectSupplement,
  initialStatusFilter = 'all'
}: SupplementsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter);

  useEffect(() => {
    if (initialStatusFilter) {
      setStatusFilter(initialStatusFilter);
    }
  }, [initialStatusFilter]);

  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = 
      supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || supplement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusStyles = {
    'pending': { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Pending' },
    'approved': { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
    'denied': { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Denied' }
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Supplements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="denied">Denied</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredSupplements.length} of {supplements.length} supplements
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Supplement Requests</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[400px]">
          <CardContent className="px-4 py-0">
            <div className="space-y-3">
              {filteredSupplements.length > 0 ? (
                filteredSupplements.map((supplement) => (
                  <div 
                    key={supplement.id}
                    className={cn(
                      "p-3 rounded-md border hover:bg-accent/50 cursor-pointer transition-colors hover:translate-y-[-2px]",
                      selectedSupplement?.id === supplement.id ? "bg-accent" : ""
                    )}
                    onClick={() => onSelectSupplement(supplement)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{supplement.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {supplement.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "ml-2 font-normal",
                          statusStyles[supplement.status].bg, 
                          statusStyles[supplement.status].color
                        )}
                      >
                        {statusStyles[supplement.status].label}
                      </Badge>
                    </div>
                    {supplement.projectName && (
                      <div className="mt-2 flex items-center text-xs text-muted-foreground">
                        <span className="font-medium">Project:</span>
                        <span className="ml-1">{supplement.projectName}</span>
                      </div>
                    )}
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(supplement.dateCreated).toLocaleDateString()}
                      </div>
                      <div className="font-medium">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 2
                        }).format(supplement.amount)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No supplements match your filters
                </div>
              )}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default SupplementsList;
