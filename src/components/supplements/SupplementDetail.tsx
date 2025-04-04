
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Supplement } from '@/types/supplement';
import { useNavigate } from 'react-router-dom';
import { InvoiceGenerator } from '@/components/accounting/InvoiceGenerator';
import { toast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

interface SupplementDetailProps {
  supplement: Supplement;
}

const SupplementDetail = ({ supplement }: SupplementDetailProps) => {
  const navigate = useNavigate();
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  
  const statusStyles = {
    'pending': { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'Pending' },
    'approved': { color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
    'denied': { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Denied' }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleNavigateToProject = () => {
    navigate(`/projects/${supplement.projectId}`);
  };

  const handleNavigateToInvoice = () => {
    navigate('/accounting');
    toast({
      title: "Invoice Loaded",
      description: "Navigated to the accounting section to view the invoice.",
    });
  };

  const handleInvoiceGenerated = () => {
    setInvoiceGenerated(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              variant="outline" 
              className={cn(
                "mb-2 font-normal",
                statusStyles[supplement.status].bg, 
                statusStyles[supplement.status].color
              )}
            >
              {statusStyles[supplement.status].label}
            </Badge>
            <CardTitle>{supplement.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Created on {new Date(supplement.dateCreated).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Amount</div>
            <div className="text-xl font-semibold">{formatCurrency(supplement.amount)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="accounting" disabled={supplement.status !== 'approved'}>
              <DollarSign className="h-4 w-4 mr-2" />
              Accounting
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm">{supplement.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Details</h3>
                <div className="bg-muted/50 rounded-md p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">ID</div>
                      <div className="text-sm font-medium">{supplement.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Created</div>
                      <div className="text-sm font-medium">
                        {new Date(supplement.dateCreated).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accounting">
            {supplement.status === 'approved' ? (
              invoiceGenerated ? (
                <div className="text-center py-6 space-y-4">
                  <div className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 p-4 rounded-md">
                    <h3 className="font-medium">Invoice has been generated successfully!</h3>
                    <p className="text-sm mt-1">You can view and manage it in the Accounting section.</p>
                  </div>
                  <Button onClick={handleNavigateToInvoice}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    View Invoice in Accounting
                  </Button>
                </div>
              ) : (
                <InvoiceGenerator 
                  supplement={supplement} 
                  onInvoiceGenerated={handleInvoiceGenerated}
                />
              )
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>Accounting information is only available for approved supplements.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4 mt-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleNavigateToProject}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Project Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupplementDetail;
