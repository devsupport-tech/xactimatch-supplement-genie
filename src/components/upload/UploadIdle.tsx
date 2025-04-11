
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadIdleProps {
  title: string;
  description: string;
  allowedTypes: string[];
  maxSize: number;
  allowMultiple: boolean;
  onSelectFile: () => void;
}

const UploadIdle = ({
  title,
  description,
  allowedTypes,
  maxSize,
  allowMultiple,
  onSelectFile
}: UploadIdleProps) => {
  return (
    <>
      <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
      <h3 className="mb-1 text-lg font-medium">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-sm">{description}</p>
      
      <Button 
        variant="secondary" 
        onClick={onSelectFile}
        className="animated-button"
      >
        Choose File{allowMultiple ? 's' : ''}
      </Button>
      
      <p className="mt-3 text-xs text-muted-foreground">
        Supported files: {allowedTypes.join(', ')} (Max size: {maxSize}MB)
      </p>
    </>
  );
};

export default UploadIdle;
