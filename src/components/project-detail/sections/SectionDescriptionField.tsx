
import { Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EditableField } from './hooks/useFieldEditor';

interface SectionDescriptionFieldProps {
  description: string | undefined;
  isEditing: boolean;
  editValue: string;
  onEdit: (field: EditableField, value: string) => void;
  onSave: (field: EditableField) => void;
  onCancel: () => void;
  onValueChange: (value: string) => void;
}

const SectionDescriptionField = ({
  description,
  isEditing,
  editValue,
  onEdit,
  onSave,
  onCancel,
  onValueChange
}: SectionDescriptionFieldProps) => {
  if (isEditing) {
    return (
      <div className="flex items-start gap-2 mt-2">
        <Input
          value={editValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="py-1"
        />
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onSave('description')}
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
      </div>
    );
  }

  return (
    <div className="flex items-center group text-sm text-muted-foreground">
      <span>{description}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEdit('description', description || '')}
      >
        <Edit2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default SectionDescriptionField;
