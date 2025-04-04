
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Supplement } from '@/types/supplement';
import { Plus } from 'lucide-react';
import { mockProjects } from '@/mock/projects';
import { InvoiceAlerts } from './InvoiceAlerts';
import { InvoiceFeeForm } from './InvoiceFeeForm';
import { InvoiceSummary } from './InvoiceSummary';
import { formatCurrency, calculateFees } from './utils';

interface InvoiceGeneratorProps {
  supplement: Supplement;
  onInvoiceGenerated?: () => void;
}

export const InvoiceGenerator = ({ supplement, onInvoiceGenerated }: InvoiceGeneratorProps) => {
  const [loading, setLoading] = useState(false);
  const [originalEstimate, setOriginalEstimate] = useState(0);
  const [invoiceData, setInvoiceData] = useState({
    baseRate: 350,
    percentageFee: 10,
    notes: '',
    paymentTerms: '30days',
    accountingIntegration: 'none'
  });

  useEffect(() => {
    const project = mockProjects.find(p => p.id === supplement.projectId);
    if (project) {
      setOriginalEstimate(project.totalAmount);
    }
  }, [supplement.projectId]);

  const handleInputChange = (field: string, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fees = calculateFees(
    originalEstimate,
    supplement.amount,
    invoiceData.baseRate,
    invoiceData.percentageFee
  );

  const handleGenerateInvoice = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Invoice Generated Successfully",
        description: "The invoice has been created and is ready to send.",
      });
      
      if (onInvoiceGenerated) {
        onInvoiceGenerated();
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Invoice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InvoiceAlerts 
          originalEstimate={originalEstimate}
          supplementAmount={supplement.amount}
          difference={fees.difference}
          formatCurrency={formatCurrency}
        />
        
        <InvoiceFeeForm
          baseRate={invoiceData.baseRate}
          percentageFee={invoiceData.percentageFee}
          paymentTerms={invoiceData.paymentTerms}
          notes={invoiceData.notes}
          accountingIntegration={invoiceData.accountingIntegration}
          difference={fees.difference}
          onInputChange={handleInputChange}
        />
        
        <InvoiceSummary
          fees={fees}
          percentageFeeValue={invoiceData.percentageFee}
          formatCurrency={formatCurrency}
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleGenerateInvoice}
          disabled={loading}
        >
          {loading ? (
            <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          Generate Invoice
        </Button>
      </CardFooter>
    </Card>
  );
};
