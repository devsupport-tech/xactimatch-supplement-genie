
import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditableAmountProps {
  label: string;
  amount: number;
  field: string;
  onSave: (field: string, value: number) => Promise<void>;
}

const EditableAmount = ({ label, amount, field, onSave }: EditableAmountProps) => {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState<string>(amount.toString());
  const formattedAmount = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleEdit = () => {
    setEditing(true);
    setEditValue(amount.toString());
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    const value = parseFloat(editValue);
    if (isNaN(value)) {
      return;
    }
    
    await onSave(field, value);
    setEditing(false);
  };

  return (
    <div className="flex justify-between py-2 items-center">
      <span className="text-muted-foreground">{label}</span>
      {editing ? (
        <div className="flex items-center gap-2">
          <span className="font-medium">$</span>
          <Input 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
            className="h-8 py-1 w-24"
            type="number"
            step="0.01"
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={handleSave}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center group">
          <span className="font-medium">${formattedAmount}</span>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleEdit}
          >
            <Edit2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditableAmount;
