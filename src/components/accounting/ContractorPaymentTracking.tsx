
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DollarSign, UserCheck, FileText } from 'lucide-react';
import { PaymentTracker } from './PaymentTracker';
import { mockInvoices } from '@/mock/invoices';
import { cn } from '@/lib/utils';

interface ContractorPayment {
  contractorId: string;
  contractorName: string;
  totalInvoiced: number;
  totalPaid: number;
  invoiceIds: string[];
}

export const ContractorPaymentTracking = () => {
  // In a real app, this would come from the API or state management
  // For now, we'll aggregate mock data
  const [contractorPayments, setContractorPayments] = useState<ContractorPayment[]>(() => {
    // Group invoices by client name (contractor)
    const grouped = mockInvoices.reduce((acc, invoice) => {
      if (!acc[invoice.clientName]) {
        acc[invoice.clientName] = {
          contractorId: invoice.clientName.toLowerCase().replace(/\s/g, '-'),
          contractorName: invoice.clientName,
          totalInvoiced: 0,
          totalPaid: 0,
          invoiceIds: [],
        };
      }
      
      acc[invoice.clientName].totalInvoiced += invoice.amount;
      if (invoice.status === 'paid') {
        acc[invoice.clientName].totalPaid += invoice.amount;
      }
      acc[invoice.clientName].invoiceIds.push(invoice.id);
      
      return acc;
    }, {} as Record<string, ContractorPayment>);
    
    return Object.values(grouped);
  });
  
  const [selectedContractor, setSelectedContractor] = useState<ContractorPayment | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const handlePaymentApplied = (contractorId: string, paymentAmount: number) => {
    setContractorPayments(prev => 
      prev.map(contractor => 
        contractor.contractorId === contractorId 
          ? { ...contractor, totalPaid: contractor.totalPaid + paymentAmount }
          : contractor
      )
    );
  };

  const getContractorInvoices = (contractorName: string) => {
    return mockInvoices.filter(invoice => invoice.clientName === contractorName);
  };

  const getPaymentStatus = (paid: number, total: number) => {
    const ratio = paid / total;
    if (ratio >= 1) return { label: 'Paid', color: 'bg-green-50 text-green-600 dark:bg-green-900/20' };
    if (ratio >= 0.5) return { label: 'Partial', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' };
    return { label: 'Outstanding', color: 'bg-red-50 text-red-600 dark:bg-red-900/20' };
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contractor Payment Tracking</CardTitle>
          <CardDescription>
            Track payments and outstanding balances for each contractor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contractor</TableHead>
                <TableHead>Invoiced Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractorPayments.map((contractor) => {
                const status = getPaymentStatus(contractor.totalPaid, contractor.totalInvoiced);
                return (
                  <TableRow key={contractor.contractorId}>
                    <TableCell className="font-medium">{contractor.contractorName}</TableCell>
                    <TableCell>{formatCurrency(contractor.totalInvoiced)}</TableCell>
                    <TableCell>{formatCurrency(contractor.totalPaid)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={cn("border-0", status.color)}
                      >
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedContractor(contractor)}
                          >
                            <DollarSign className="mr-2 h-4 w-4" />
                            Manage Payments
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md">
                          <SheetHeader>
                            <SheetTitle>Payment Details: {contractor?.contractorName}</SheetTitle>
                            <SheetDescription>
                              View and manage payments for this contractor
                            </SheetDescription>
                          </SheetHeader>
                          
                          {selectedContractor && (
                            <div className="mt-6 space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm text-muted-foreground">Total Invoiced</div>
                                  <div className="text-xl font-bold">
                                    {formatCurrency(selectedContractor.totalInvoiced)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Total Paid</div>
                                  <div className="text-xl font-bold">
                                    {formatCurrency(selectedContractor.totalPaid)}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="text-sm font-medium">Invoices</div>
                                <div className="space-y-2">
                                  {getContractorInvoices(selectedContractor.contractorName).map(invoice => (
                                    <div 
                                      key={invoice.id}
                                      className={cn(
                                        "p-3 rounded-md border cursor-pointer hover:bg-muted/50",
                                        selectedInvoiceId === invoice.id && "bg-muted/50"
                                      )}
                                      onClick={() => setSelectedInvoiceId(invoice.id)}
                                    >
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <div className="font-medium">{invoice.invoiceNumber}</div>
                                          <div className="text-sm text-muted-foreground">
                                            Project: {invoice.projectName}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div>{formatCurrency(invoice.amount)}</div>
                                          <Badge 
                                            variant="outline" 
                                            className={cn(
                                              "border-0",
                                              invoice.status === 'paid' 
                                                ? 'bg-green-50 text-green-600 dark:bg-green-900/20'
                                                : invoice.status === 'pending'
                                                ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'
                                                : 'bg-red-50 text-red-600 dark:bg-red-900/20'
                                            )}
                                          >
                                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {selectedInvoiceId && (
                                <div className="pt-4">
                                  <PaymentTracker 
                                    invoice={mockInvoices.find(i => i.id === selectedInvoiceId)!}
                                    onPaymentApplied={(amount) => handlePaymentApplied(selectedContractor.contractorId, amount)}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
