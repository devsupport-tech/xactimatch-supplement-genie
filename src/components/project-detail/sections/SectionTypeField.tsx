
import { Edit2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectSectionType } from '@/utils/project-utils';
import { EditableField } from './hooks/useFieldEditor';

interface SectionTypeFieldProps {
  type: ProjectSectionType;
  isEditing: boolean;
  editValue: string;
  onEdit: (field: EditableField, value: string) => void;
  onSave: (field: EditableField) => void;
  onCancel: () => void;
  onValueChange: (value: string) => void;
}

export const getSectionTypeLabel = (type: ProjectSectionType): string => {
  switch (type) {
    case 'content-manipulation':
      return 'Content Manipulation';
    case 'demo-mit':
      return 'Demo/Mit';
    case 'rebuild':
      return 'Rebuild';
    default:
      return type;
  }
};

const SectionTypeField = ({
  type,
  isEditing,
  editValue,
  onEdit,
  onSave,
  onCancel,
  onValueChange
}: SectionTypeFieldProps) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Select
          value={editValue}
          onValueChange={onValueChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="content-manipulation">Content Manipulation</SelectItem>
            <SelectItem value="demo-mit">Demo/Mit</SelectItem>
            <SelectItem value="rebuild">Rebuild</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onSave('type')}
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
      <h3 className="font-medium">{getSectionTypeLabel(type)}</h3>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onEdit('type', type)}
      >
        <Edit2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default SectionTypeField;
