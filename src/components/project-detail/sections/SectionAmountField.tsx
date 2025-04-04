
import { Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditableField } from './hooks/useFieldEditor';

interface SectionAmountFieldProps {
  amount: number;
  isEditing: boolean;
  editValue: string;
  onEdit: (field: EditableField, value: string) => void;
  onSave: (field: EditableField) => void;
  onCancel: () => void;
  onValueChange: (value: string) => void;
}

const SectionAmountField = ({
  amount,
  isEditing,
  editValue,
  onEdit,
  onSave,
  onCancel,
  onValueChange
}: SectionAmountFieldProps) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-medium">$</span>
        <Input
          value={editValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-8 py-1 w-24"
          type="number"
          step="0.01"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onSave('amount')}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onCancel}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center group">
      <span className="font-medium">${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEdit('amount', amount.toString())}
      >
        <Edit2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default SectionAmountField;
