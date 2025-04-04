
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Invoice } from '@/types/invoice';
import { cn } from '@/lib/utils';

interface InvoiceTableProps {
  invoices: Invoice[];
  selectedInvoice: Invoice | null;
  onSelectInvoice: (invoice: Invoice) => void;
}

export const InvoiceTable = ({ invoices, selectedInvoice, onSelectInvoice }: InvoiceTableProps) => {
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

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <TableRow 
                key={invoice.id}
                className={cn(
                  "cursor-pointer",
                  selectedInvoice?.id === invoice.id && "bg-muted/50"
                )}
                onClick={() => onSelectInvoice(invoice)}
              >
                <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.projectName}</TableCell>
                <TableCell>{invoice.clientName}</TableCell>
                <TableCell>{new Date(invoice.dateCreated).toLocaleDateString()}</TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={cn("border-0", getStatusStyles(invoice.status))}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No invoices found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
