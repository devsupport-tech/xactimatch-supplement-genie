
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export interface LineItem {
  id: string;
  code: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

interface LineItemTableProps {
  items: LineItem[];
  onSelectionChange?: (selectedItems: LineItem[]) => void;
  className?: string;
}

type SortField = 'code' | 'description' | 'category' | 'quantity' | 'unitPrice' | 'totalPrice';
type SortDirection = 'asc' | 'desc';

const LineItemTable = ({
  items,
  onSelectionChange,
  className,
}: LineItemTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('code');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    // Filter items based on search term
    const filtered = items.filter(item => 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Sort items based on sort field and direction
    return [...filtered].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, searchTerm, sortField, sortDirection]);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Handle row selection
  const handleRowSelect = (id: string) => {
    setSelectedRows(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id];
      
      if (onSelectionChange) {
        const selectedItems = items.filter(item => newSelection.includes(item.id));
        onSelectionChange(selectedItems);
      }
      
      return newSelection;
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === filteredAndSortedItems.length) {
      // Deselect all
      setSelectedRows([]);
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    } else {
      // Select all filtered items
      const allIds = filteredAndSortedItems.map(item => item.id);
      setSelectedRows(allIds);
      if (onSelectionChange) {
        onSelectionChange(filteredAndSortedItems);
      }
    }
  };

  return (
    <div className={cn("rounded-md border", className)}>
      <div className="px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search line items..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
          <div>
            {filteredAndSortedItems.length} items
            {selectedRows.length > 0 && ` (${selectedRows.length} selected)`}
          </div>
          <div>
            Total: {formatCurrency(filteredAndSortedItems.reduce((sum, item) => sum + item.totalPrice, 0))}
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-[40px] text-center">
                <Checkbox 
                  checked={
                    filteredAndSortedItems.length > 0 && 
                    selectedRows.length === filteredAndSortedItems.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead className="w-[100px]">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('code')}
                  className="px-0 font-medium"
                >
                  Code
                  {sortField === 'code' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="min-w-[200px]">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('description')}
                  className="px-0 font-medium"
                >
                  Description
                  {sortField === 'description' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('category')}
                  className="px-0 font-medium"
                >
                  Category
                  {sortField === 'category' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('quantity')}
                  className="px-0 font-medium"
                >
                  Quantity
                  {sortField === 'quantity' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('unitPrice')}
                  className="px-0 font-medium"
                >
                  Unit Price
                  {sortField === 'unitPrice' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button 
                  variant="ghost" 
                  onClick={() => handleSort('totalPrice')}
                  className="px-0 font-medium"
                >
                  Total
                  {sortField === 'totalPrice' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedItems.length > 0 ? (
              filteredAndSortedItems.map((item) => (
                <TableRow 
                  key={item.id}
                  className={cn(
                    selectedRows.includes(item.id) ? "bg-secondary/50" : "",
                    "transition-colors hover:bg-secondary/30"
                  )}
                >
                  <TableCell className="text-center p-2">
                    <Checkbox 
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={() => handleRowSelect(item.id)}
                      aria-label={`Select ${item.code}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.quantity} {item.unit}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.totalPrice)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No line items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default LineItemTable;
