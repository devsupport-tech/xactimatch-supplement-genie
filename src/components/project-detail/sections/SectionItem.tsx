
import { ProjectSection } from '@/utils/project-utils';
import { useFieldEditor } from './hooks/useFieldEditor';
import SectionTypeField from './SectionTypeField';
import SectionAmountField from './SectionAmountField';
import SectionDescriptionField from './SectionDescriptionField';

interface SectionItemProps {
  section: ProjectSection;
  projectId: string;
  onSectionUpdate: (updatedSection: ProjectSection) => void;
}

const SectionItem = ({ section, projectId, onSectionUpdate }: SectionItemProps) => {
  const {
    editingField,
    editValue,
    setEditValue,
    handleEdit,
    handleCancel,
    handleSave
  } = useFieldEditor(section, projectId, onSectionUpdate);

  return (
    <div className="rounded-md border p-4">
      <div className="mb-2 flex justify-between items-center">
        <SectionTypeField
          type={section.type}
          isEditing={editingField === 'type'}
          editValue={editValue}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onValueChange={setEditValue}
        />
        
        <SectionAmountField
          amount={section.amount}
          isEditing={editingField === 'amount'}
          editValue={editValue}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onValueChange={setEditValue}
        />
      </div>
      
      <SectionDescriptionField
        description={section.description}
        isEditing={editingField === 'description'}
        editValue={editValue}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onValueChange={setEditValue}
      />
    </div>
  );
};

export default SectionItem;
