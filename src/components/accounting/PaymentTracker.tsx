
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { Check, DollarSign, AlertCircle } from 'lucide-react';
import { Invoice } from '@/types/invoice';

interface PaymentTrackerProps {
  invoice: Invoice;
  onPaymentApplied: (paymentAmount: number) => void;
}

export const PaymentTracker = ({ invoice, onPaymentApplied }: PaymentTrackerProps) => {
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [remainingBalance, setRemainingBalance] = useState<number>(invoice.amount);
  const [paymentHistory, setPaymentHistory] = useState<{date: string; amount: number}[]>([]);
  
  useEffect(() => {
    setRemainingBalance(invoice.amount - paymentHistory.reduce((sum, payment) => sum + payment.amount, 0));
  }, [invoice, paymentHistory]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleApplyPayment = () => {
    if (paymentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Payment amount must be greater than zero.",
        variant: "destructive"
      });
      return;
    }

    if (paymentAmount > remainingBalance) {
      toast({
        title: "Payment Exceeds Balance",
        description: "Payment amount cannot exceed the remaining balance.",
        variant: "destructive"
      });
      return;
    }

    // Record the payment
    const newPayment = {
      date: new Date().toISOString(),
      amount: paymentAmount
    };

    setPaymentHistory([...paymentHistory, newPayment]);
    
    // Reset payment amount
    setPaymentAmount(0);
    
    // Call the callback function
    onPaymentApplied(paymentAmount);

    toast({
      title: "Payment Applied Successfully",
      description: `Payment of ${formatCurrency(paymentAmount)} has been recorded.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Original Invoice Amount:</span>
          <span>{formatCurrency(invoice.amount)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Amount Paid:</span>
          <span>{formatCurrency(invoice.amount - remainingBalance)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Remaining Balance:</span>
          <span className="font-bold">{formatCurrency(remainingBalance)}</span>
        </div>
        
        {remainingBalance > 0 ? (
          <div className="space-y-4 mt-4 pt-4 border-t">
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Apply Payment</Label>
              <div className="flex space-x-2">
                <Input
                  id="paymentAmount"
                  type="number"
                  placeholder="Enter payment amount"
                  value={paymentAmount || ''}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                />
                <Button 
                  onClick={handleApplyPayment}
                  disabled={paymentAmount <= 0 || paymentAmount > remainingBalance}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Apply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400">
              Invoice has been fully paid.
            </AlertDescription>
          </Alert>
        )}
        
        {paymentHistory.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Payment History</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {paymentHistory.map((payment, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-2 bg-muted/50 rounded-md"
                >
                  <span className="text-sm">
                    {new Date(payment.date).toLocaleDateString()} at {new Date(payment.date).toLocaleTimeString()}
                  </span>
                  <span className="font-medium">{formatCurrency(payment.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
