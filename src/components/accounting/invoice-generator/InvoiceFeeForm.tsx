
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceFeeFormProps {
  baseRate: number;
  percentageFee: number;
  paymentTerms: string;
  notes: string;
  accountingIntegration: string;
  difference: number;
  onInputChange: (field: string, value: string | number) => void;
}

export const InvoiceFeeForm = ({ 
  baseRate, 
  percentageFee, 
  paymentTerms, 
  notes, 
  accountingIntegration, 
  difference,
  onInputChange 
}: InvoiceFeeFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="baseRate">Base Rate</Label>
        <Input
          id="baseRate"
          type="number"
          value={baseRate}
          onChange={(e) => onInputChange('baseRate', parseFloat(e.target.value))}
        />
        <p className="text-xs text-muted-foreground">
          Standard fee for processing the estimate
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="percentageFee">Percentage Fee</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="percentageFee"
            type="number"
            value={percentageFee}
            onChange={(e) => onInputChange('percentageFee', parseFloat(e.target.value))}
          />
          <span>%</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {difference > 0 
            ? "Percentage of the difference between supplement and original estimate" 
            : "Percentage of the total supplement amount"}
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="paymentTerms">Payment Terms</Label>
        <Select 
          value={paymentTerms}
          onValueChange={(value) => onInputChange('paymentTerms', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment terms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="due-receipt">Due on Receipt</SelectItem>
            <SelectItem value="15days">Net 15 Days</SelectItem>
            <SelectItem value="30days">Net 30 Days</SelectItem>
            <SelectItem value="60days">Net 60 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          placeholder="Enter any additional notes for this invoice"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountingIntegration">Accounting Integration</Label>
        <Select 
          value={accountingIntegration}
          onValueChange={(value) => onInputChange('accountingIntegration', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select integration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="quickbooks">QuickBooks</SelectItem>
            <SelectItem value="xero">Xero</SelectItem>
            <SelectItem value="freshbooks">FreshBooks</SelectItem>
            <SelectItem value="wave">Wave</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
