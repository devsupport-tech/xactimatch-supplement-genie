
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LineItemsSummaryProps {
  setActiveTab: (tab: string) => void;
}

const LineItemsSummary = ({ setActiveTab }: LineItemsSummaryProps) => {
  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab('lineitems');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Line Items Summary</CardTitle>
          <CardDescription>Top categories and item breakdown</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Top Categories</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                <span>Roofing</span>
                <span className="font-medium">$8,750.00</span>
              </div>
              <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                <span>Cabinetry</span>
                <span className="font-medium">$2,526.00</span>
              </div>
              <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                <span>Flooring</span>
                <span className="font-medium">$2,320.00</span>
              </div>
              <div className="flex justify-between p-3 bg-muted/50 rounded-md">
                <span>Windows</span>
                <span className="font-medium">$1,954.50</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Line Item Statistics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Total Items</div>
                <div className="text-2xl font-medium">10</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Categories</div>
                <div className="text-2xl font-medium">8</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-xs text-muted-foreground mb-1">Avg. Price</div>
                <div className="text-2xl font-medium">$1,965</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineItemsSummary;
