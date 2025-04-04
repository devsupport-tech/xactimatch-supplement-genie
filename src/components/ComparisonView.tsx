
import { useState, useMemo } from 'react';
import { Search, ArrowDown, ArrowUp, Minus, PlusCircle, AlertTriangle, Clock, Filter, CheckSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LineItem {
  id: string;
  code: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  changeType?: 'added' | 'removed' | 'modified';
  previousQuantity?: number;
  previousUnitPrice?: number;
  previousTotalPrice?: number;
}

interface ComparisonViewProps {
  originalItems: LineItem[];
  newItems: LineItem[];
  onSelectItems?: (selectedItems: LineItem[]) => void;
  className?: string;
}

const ComparisonView = ({
  originalItems = [],
  newItems = [],
  onSelectItems,
  className
}: ComparisonViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedChangeType, setSelectedChangeType] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Generate comparison data
  const comparisonData = useMemo(() => {
    const originalItemMap = new Map<string, LineItem>();
    originalItems.forEach(item => originalItemMap.set(item.id, item));
    
    const newItemMap = new Map<string, LineItem>();
    newItems.forEach(item => newItemMap.set(item.id, item));
    
    const results: LineItem[] = [];
    
    // Find added and modified items
    newItems.forEach(newItem => {
      const originalItem = originalItemMap.get(newItem.id);
      
      if (!originalItem) {
        // Added item
        results.push({
          ...newItem,
          changeType: 'added',
        });
      } else if (
        newItem.quantity !== originalItem.quantity ||
        newItem.unitPrice !== originalItem.unitPrice
      ) {
        // Modified item
        results.push({
          ...newItem,
          changeType: 'modified',
          previousQuantity: originalItem.quantity,
          previousUnitPrice: originalItem.unitPrice,
          previousTotalPrice: originalItem.totalPrice,
        });
      }
    });
    
    // Find removed items
    originalItems.forEach(originalItem => {
      if (!newItemMap.has(originalItem.id)) {
        results.push({
          ...originalItem,
          changeType: 'removed',
        });
      }
    });
    
    return results;
  }, [originalItems, newItems]);

  // Filter comparison data
  const filteredItems = useMemo(() => {
    return comparisonData.filter(item => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Change type filter
      const matchesChangeType = selectedChangeType === 'all' || item.changeType === selectedChangeType;
      
      return matchesSearch && matchesCategory && matchesChangeType;
    });
  }, [comparisonData, searchQuery, selectedCategory, selectedChangeType]);

  // Summary calculations
  const summary = useMemo(() => {
    const added = comparisonData.filter(item => item.changeType === 'added');
    const removed = comparisonData.filter(item => item.changeType === 'removed');
    const modified = comparisonData.filter(item => item.changeType === 'modified');
    
    const addedTotal = added.reduce((sum, item) => sum + item.totalPrice, 0);
    const removedTotal = removed.reduce((sum, item) => sum + item.totalPrice, 0);
    const modifiedPreviousTotal = modified.reduce((sum, item) => sum + (item.previousTotalPrice || 0), 0);
    const modifiedNewTotal = modified.reduce((sum, item) => sum + item.totalPrice, 0);
    const modifiedDifferenceTotal = modifiedNewTotal - modifiedPreviousTotal;
    
    const netChangeTotal = addedTotal - removedTotal + modifiedDifferenceTotal;
    
    // Get unique categories
    const categories = Array.from(new Set(comparisonData.map(item => item.category)));
    
    return {
      added: {
        count: added.length,
        total: addedTotal
      },
      removed: {
        count: removed.length,
        total: removedTotal
      },
      modified: {
        count: modified.length,
        previousTotal: modifiedPreviousTotal,
        newTotal: modifiedNewTotal,
        differenceTotal: modifiedDifferenceTotal
      },
      netChange: netChangeTotal,
      categories
    };
  }, [comparisonData]);

  // Toggle item selection
  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        const newSelected = prev.filter(id => id !== itemId);
        if (onSelectItems) {
          onSelectItems(comparisonData.filter(item => newSelected.includes(item.id)));
        }
        return newSelected;
      } else {
        const newSelected = [...prev, itemId];
        if (onSelectItems) {
          onSelectItems(comparisonData.filter(item => newSelected.includes(item.id)));
        }
        return newSelected;
      }
    });
  };

  // Toggle selection for all items of a specific change type
  const toggleAllOfType = (changeType: 'added' | 'removed' | 'modified') => {
    const itemsOfType = filteredItems.filter(item => item.changeType === changeType);
    const itemIdsOfType = itemsOfType.map(item => item.id);
    
    // Check if all items of this type are already selected
    const allSelected = itemIdsOfType.every(id => selectedItems.includes(id));
    
    if (allSelected) {
      // Deselect all items of this type
      const newSelected = selectedItems.filter(id => !itemIdsOfType.includes(id));
      setSelectedItems(newSelected);
      if (onSelectItems) {
        onSelectItems(comparisonData.filter(item => newSelected.includes(item.id)));
      }
    } else {
      // Select all items of this type
      const newSelected = [...new Set([...selectedItems, ...itemIdsOfType])];
      setSelectedItems(newSelected);
      if (onSelectItems) {
        onSelectItems(comparisonData.filter(item => newSelected.includes(item.id)));
      }
    }
  };

  // Select all visible items
  const selectAllVisible = () => {
    const visibleIds = filteredItems.map(item => item.id);
    setSelectedItems(visibleIds);
    if (onSelectItems) {
      onSelectItems(filteredItems);
    }
  };

  // Deselect all items
  const deselectAll = () => {
    setSelectedItems([]);
    if (onSelectItems) {
      onSelectItems([]);
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

  // Format price change with color and arrow
  const PriceChange = ({ previous, current }: { previous: number, current: number }) => {
    const difference = current - previous;
    const percentChange = (difference / previous) * 100;
    
    if (difference === 0) return <span className="text-muted-foreground">No change</span>;
    
    return (
      <div className={cn(
        "flex items-center font-medium",
        difference > 0 ? "text-green-600" : "text-red-600"
      )}>
        {difference > 0 ? (
          <ArrowUp className="w-3 h-3 mr-1" />
        ) : (
          <ArrowDown className="w-3 h-3 mr-1" />
        )}
        {formatCurrency(Math.abs(difference))}
        <span className="text-xs ml-1">
          ({percentChange.toFixed(1)}%)
        </span>
      </div>
    );
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-medium flex items-center justify-between">
          <span>Changes Detected</span>
          <div className="flex items-center space-x-1 text-sm font-normal">
            <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 border-0">
              {summary.added.count} Added
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-600 dark:bg-red-900/20 border-0">
              {summary.removed.count} Removed
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 border-0">
              {summary.modified.count} Modified
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="changes">
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="changes">All Changes</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="changes" className="m-0">
          <div className="p-6 pb-3 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by code or description..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {summary.categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedChangeType} onValueChange={setSelectedChangeType}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Change Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Changes</SelectItem>
                  <SelectItem value="added">Added</SelectItem>
                  <SelectItem value="removed">Removed</SelectItem>
                  <SelectItem value="modified">Modified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="px-6 pb-3 flex justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredItems.length} items found • {selectedItems.length} selected
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={selectAllVisible} 
                disabled={filteredItems.length === 0}
              >
                <CheckSquare className="mr-1 h-4 w-4" />
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={deselectAll}
                disabled={selectedItems.length === 0}
              >
                Clear
              </Button>
            </div>
          </div>
          
          <div className="px-6 pb-3">
            <div className="flex justify-start gap-3">
              {['added', 'removed', 'modified'].map((type) => {
                const itemsOfType = filteredItems.filter(item => item.changeType === type);
                const countOfType = itemsOfType.length;
                if (countOfType === 0) return null;
                
                const selectedOfType = itemsOfType.filter(item => selectedItems.includes(item.id)).length;
                const allSelected = selectedOfType === countOfType && countOfType > 0;
                const partiallySelected = selectedOfType > 0 && selectedOfType < countOfType;
                
                let badgeClass = "";
                if (type === 'added') badgeClass = "bg-green-50 text-green-600 dark:bg-green-900/20";
                if (type === 'removed') badgeClass = "bg-red-50 text-red-600 dark:bg-red-900/20";
                if (type === 'modified') badgeClass = "bg-blue-50 text-blue-600 dark:bg-blue-900/20";
                
                return (
                  <div 
                    key={type}
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleAllOfType(type as 'added' | 'removed' | 'modified')}
                  >
                    <Checkbox 
                      id={`select-all-${type}`}
                      checked={allSelected}
                      className="mr-2"
                      data-state={allSelected ? "checked" : partiallySelected ? "indeterminate" : "unchecked"}
                    />
                    <Badge variant="outline" className={cn("font-normal border-0", badgeClass)}>
                      {`Select all ${type} (${countOfType})`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
          
          <ScrollArea className="h-[400px] px-6 pb-6">
            {filteredItems.length > 0 ? (
              <div className="space-y-3">
                {filteredItems.map(item => {
                  let statusColor = 'bg-green-50 text-green-600 dark:bg-green-900/20';
                  let statusIcon = <PlusCircle className="h-3.5 w-3.5 mr-1" />;
                  let statusText = 'Added';
                  
                  if (item.changeType === 'removed') {
                    statusColor = 'bg-red-50 text-red-600 dark:bg-red-900/20';
                    statusIcon = <Minus className="h-3.5 w-3.5 mr-1" />;
                    statusText = 'Removed';
                  } else if (item.changeType === 'modified') {
                    statusColor = 'bg-blue-50 text-blue-600 dark:bg-blue-900/20';
                    statusIcon = <AlertTriangle className="h-3.5 w-3.5 mr-1" />;
                    statusText = 'Modified';
                  }
                  
                  return (
                    <div 
                      key={item.id}
                      className={cn(
                        "p-3 rounded-md border border-border/80 hover:border-border transition-all",
                        selectedItems.includes(item.id) ? "bg-secondary/80" : "bg-card"
                      )}
                    >
                      <div className="flex items-start">
                        <Checkbox
                          id={`item-${item.id}`}
                          className="mt-1 mr-3"
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Badge 
                                variant="outline" 
                                className={cn("font-normal text-xs border-0", statusColor)}
                              >
                                <span className="flex items-center">
                                  {statusIcon}
                                  {statusText}
                                </span>
                              </Badge>
                              <span className="ml-2 text-sm font-medium truncate">{item.code}</span>
                            </div>
                            <Badge variant="outline" className="text-xs font-normal">
                              {item.category}
                            </Badge>
                          </div>
                          
                          <div className="mt-1 text-sm">{item.description}</div>
                          
                          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                            <div className="flex space-x-2">
                              <span className="text-muted-foreground">Quantity:</span>
                              <span className="font-medium">
                                {item.changeType === 'modified' && item.previousQuantity !== undefined ? (
                                  <>
                                    <span className="line-through text-muted-foreground mr-1">{item.previousQuantity}</span>
                                    {item.quantity}
                                  </>
                                ) : (
                                  item.quantity
                                )}
                                {' '}{item.unit}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <span className="text-muted-foreground">Unit Price:</span>
                              <span className="font-medium">
                                {item.changeType === 'modified' && item.previousUnitPrice !== undefined ? (
                                  <>
                                    <span className="line-through text-muted-foreground mr-1">
                                      {formatCurrency(item.previousUnitPrice)}
                                    </span>
                                    {formatCurrency(item.unitPrice)}
                                  </>
                                ) : (
                                  formatCurrency(item.unitPrice)
                                )}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <span className="text-muted-foreground">Total:</span>
                              {item.changeType === 'modified' && item.previousTotalPrice !== undefined ? (
                                <PriceChange previous={item.previousTotalPrice} current={item.totalPrice} />
                              ) : (
                                <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-3 opacity-20" />
                <h3 className="text-lg font-medium">No matching items found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="summary" className="m-0">
          <CardContent className="px-6 py-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">Selected Changes Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    {selectedItems.length > 0 ? (
                      <>
                        <div className="text-2xl font-semibold">
                          {formatCurrency(comparisonData
                            .filter(item => selectedItems.includes(item.id))
                            .reduce((total, item) => {
                              if (item.changeType === 'added') {
                                return total + item.totalPrice;
                              } else if (item.changeType === 'removed') {
                                return total - item.totalPrice;
                              } else if (item.changeType === 'modified') {
                                const previousTotal = item.previousTotalPrice || 0;
                                return total + (item.totalPrice - previousTotal);
                              }
                              return total;
                            }, 0)
                          )}
                        </div>
                        <div className="mt-3">
                          <div className="text-sm font-medium flex items-center justify-between">
                            <span>Selected items:</span>
                            <span>{selectedItems.length}</span>
                          </div>
                          <div className="text-sm flex items-center justify-between mt-1">
                            <span>Added:</span>
                            <span>{comparisonData.filter(item => 
                              selectedItems.includes(item.id) && item.changeType === 'added'
                            ).length}</span>
                          </div>
                          <div className="text-sm flex items-center justify-between mt-1">
                            <span>Removed:</span>
                            <span>{comparisonData.filter(item => 
                              selectedItems.includes(item.id) && item.changeType === 'removed'
                            ).length}</span>
                          </div>
                          <div className="text-sm flex items-center justify-between mt-1">
                            <span>Modified:</span>
                            <span>{comparisonData.filter(item => 
                              selectedItems.includes(item.id) && item.changeType === 'modified'
                            ).length}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground">No items selected</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Select items from the "All Changes" tab to see summary
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">Net Change</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className={cn(
                      "text-2xl font-semibold",
                      summary.netChange > 0 ? "text-green-600" : summary.netChange < 0 ? "text-red-600" : ""
                    )}>
                      {formatCurrency(summary.netChange)}
                    </div>
                    <div className="flex gap-4 mt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Added</span>
                        <span className="text-sm font-medium text-green-600">
                          +{formatCurrency(summary.added.total)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Removed</span>
                        <span className="text-sm font-medium text-red-600">
                          -{formatCurrency(summary.removed.total)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Modified</span>
                        <span className="text-sm font-medium text-blue-600">
                          {summary.modified.differenceTotal >= 0 ? '+' : ''}
                          {formatCurrency(summary.modified.differenceTotal)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base font-medium">Categories Affected</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {summary.categories.map(category => {
                      const categoryItems = comparisonData.filter(item => item.category === category);
                      const added = categoryItems.filter(item => item.changeType === 'added');
                      const removed = categoryItems.filter(item => item.changeType === 'removed');
                      const modified = categoryItems.filter(item => item.changeType === 'modified');
                      
                      const addedTotal = added.reduce((sum, item) => sum + item.totalPrice, 0);
                      const removedTotal = removed.reduce((sum, item) => sum + item.totalPrice, 0);
                      const modifiedPreviousTotal = modified.reduce((sum, item) => sum + (item.previousTotalPrice || 0), 0);
                      const modifiedNewTotal = modified.reduce((sum, item) => sum + item.totalPrice, 0);
                      const netChange = addedTotal - removedTotal + (modifiedNewTotal - modifiedPreviousTotal);
                      
                      return (
                        <Card key={category}>
                          <CardContent className="p-3">
                            <div className="font-medium text-sm mb-2 truncate" title={category}>
                              {category}
                            </div>
                            <div className={cn(
                              "text-base font-medium",
                              netChange > 0 ? "text-green-600" : netChange < 0 ? "text-red-600" : ""
                            )}>
                              {netChange >= 0 ? '+' : ''}
                              {formatCurrency(netChange)}
                            </div>
                            <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                              <span>{categoryItems.length} items</span>
                              {added.length > 0 && <span>+{added.length}</span>}
                              {removed.length > 0 && <span>-{removed.length}</span>}
                              {modified.length > 0 && <span>~{modified.length}</span>}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ComparisonView;
