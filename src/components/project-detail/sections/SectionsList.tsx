
import { ProjectSection } from '@/utils/project-utils';
import SectionItem from './SectionItem';

interface SectionsListProps {
  sections: ProjectSection[];
  projectId: string;
  onSectionUpdate: (updatedSection: ProjectSection) => void;
}

const SectionsList = ({ sections, projectId, onSectionUpdate }: SectionsListProps) => {
  if (sections.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">No sections defined for this project</div>
    );
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <SectionItem 
          key={section.id} 
          section={section} 
          projectId={projectId}
          onSectionUpdate={onSectionUpdate}
        />
      ))}
    </div>
  );
};

export default SectionsList;
