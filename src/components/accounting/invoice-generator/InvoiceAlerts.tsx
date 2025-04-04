
import { Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface InvoiceAlertsProps {
  originalEstimate: number;
  supplementAmount: number;
  difference: number;
  formatCurrency: (amount: number) => string;
}

export const InvoiceAlerts = ({ originalEstimate, supplementAmount, difference, formatCurrency }: InvoiceAlertsProps) => {
  if (difference > 0) {
    return (
      <Alert className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription>
          This supplement is {formatCurrency(difference)} higher than the original estimate of {formatCurrency(originalEstimate)}.
        </AlertDescription>
      </Alert>
    );
  } else if (difference < 0) {
    return (
      <Alert className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription>
          This supplement is {formatCurrency(Math.abs(difference))} lower than the original estimate of {formatCurrency(originalEstimate)}.
        </AlertDescription>
      </Alert>
    );
  } else {
    return (
      <Alert className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription>
          This supplement matches the original estimate of {formatCurrency(originalEstimate)}.
        </AlertDescription>
      </Alert>
    );
  }
};
