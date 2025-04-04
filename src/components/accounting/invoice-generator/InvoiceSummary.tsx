
interface InvoiceFees {
  originalEstimate: number;
  supplementAmount: number;
  difference: number;
  baseRate: number;
  percentageFee: number;
  subtotal: number;
  tax: number;
  total: number;
}

interface InvoiceSummaryProps {
  fees: InvoiceFees;
  percentageFeeValue: number;
  formatCurrency: (amount: number) => string;
}

export const InvoiceSummary = ({ fees, percentageFeeValue, formatCurrency }: InvoiceSummaryProps) => {
  return (
    <div className="bg-muted/50 rounded-md p-4 mt-4">
      <div className="text-sm font-semibold mb-2">Invoice Summary</div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Original Estimate:</span>
          <span>{formatCurrency(fees.originalEstimate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Supplement Amount:</span>
          <span>{formatCurrency(fees.supplementAmount)}</span>
        </div>
        {fees.difference !== 0 && (
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Difference:</span>
            <span className={fees.difference > 0 ? "text-green-600" : "text-amber-600"}>
              {fees.difference > 0 ? "+" : ""}{formatCurrency(fees.difference)}
            </span>
          </div>
        )}
        <div className="border-t my-2 pt-2"></div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Base Rate:</span>
          <span>{formatCurrency(fees.baseRate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Percentage Fee ({percentageFeeValue}% of {fees.difference > 0 ? "difference" : "supplement"}):
          </span>
          <span>{formatCurrency(fees.percentageFee)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2">
          <span className="font-medium">Total:</span>
          <span className="font-bold">{formatCurrency(fees.total)}</span>
        </div>
      </div>
    </div>
  );
};
