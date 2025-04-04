
import { Download, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LineItemTable from '@/components/LineItemTable';
import { LineItem } from '@/components/LineItemTable';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface LineItemsTabProps {
  items: LineItem[];
}

const LineItemsTab = ({ items }: LineItemsTabProps) => {
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export complete",
        description: "Line items have been exported to CSV successfully.",
      });
    }, 1500);
  };
  
  const handleAddLineItem = () => {
    toast({
      title: "Add Line Item",
      description: "Line item creation modal would open here.",
    });
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Line Items</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
          <Button onClick={handleAddLineItem}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Line Item
          </Button>
        </div>
      </div>
      <LineItemTable items={items} />
    </div>
  );
};

export default LineItemsTab;
