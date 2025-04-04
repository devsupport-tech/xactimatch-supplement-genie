
import { useState } from 'react';
import { Check, Download, Mail, Printer, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Invoice } from '@/types/invoice';

interface InvoiceDetailProps {
  invoice: Invoice;
}

export const InvoiceDetail = ({ invoice }: InvoiceDetailProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState(invoice.clientEmail || '');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20';
      case 'pending':
        return 'bg-amber-50 text-amber-600 dark:bg-amber-900/20';
      case 'overdue':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20';
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20';
    }
  };

  const handlePrintInvoice = () => {
    toast({
      title: "Print initiated",
      description: "The invoice is being prepared for printing.",
    });
  };

  const handleDownloadInvoice = () => {
    setLoading(true);
    
    // Simulate download process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Invoice Downloaded",
        description: "The invoice has been downloaded as a PDF.",
      });
    }, 1500);
  };

  const handleSendEmail = () => {
    setLoading(true);
    
    // Validate email
    if (!emailAddress.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }
    
    // Simulate email sending
    setTimeout(() => {
      setLoading(false);
      setEmailDialogOpen(false);
      toast({
        title: "Email Sent Successfully",
        description: `Invoice has been emailed to ${emailAddress}`,
      });
    }, 2000);
  };

  const handleNavigateToProject = () => {
    navigate(`/projects/${invoice.projectId}`);
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              variant="outline" 
              className={cn("mb-2 font-normal", getStatusStyles(invoice.status))}
            >
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
            <CardTitle>Invoice #{invoice.invoiceNumber}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Amount</div>
            <div className="text-xl font-semibold">{formatCurrency(invoice.amount)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Project</div>
            <div className="font-medium">{invoice.projectName}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Client</div>
            <div className="font-medium">{invoice.clientName}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Invoice Date</div>
            <div className="font-medium">{new Date(invoice.dateCreated).toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Due Date</div>
            <div className="font-medium">{new Date(invoice.dueDate).toLocaleDateString()}</div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <div className="text-sm font-medium mb-2">Line Items</div>
          <div className="space-y-2">
            {invoice.lineItems.map((item, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex-1">
                  <div className="font-medium">{item.description}</div>
                  <div className="text-sm text-muted-foreground">{item.details}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(item.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-md p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
          </div>
          {invoice.tax > 0 && (
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Tax ({invoice.taxRate}%)</span>
              <span className="font-medium">{formatCurrency(invoice.tax)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 mt-2 border-t border-border">
            <span className="font-medium">Total</span>
            <span className="font-bold">{formatCurrency(invoice.amount)}</span>
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-md p-4">
          <div className="text-sm font-medium mb-1">Notes</div>
          <p className="text-sm text-muted-foreground">
            {invoice.notes || "No additional notes for this invoice."}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <Button variant="outline" onClick={handleNavigateToProject}>
          <ExternalLink className="mr-2 h-4 w-4" />
          View Project
        </Button>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handlePrintInvoice}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleDownloadInvoice}
            disabled={loading}
          >
            {loading ? (
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Download PDF
          </Button>
          
          <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Email Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Email Invoice</DialogTitle>
                <DialogDescription>
                  Send this invoice via email to the client.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Recipient Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleSendEmail}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Send Email
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
};
