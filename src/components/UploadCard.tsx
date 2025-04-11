
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useFileUpload } from './upload/useFileUpload';
import UploadIdle from './upload/UploadIdle';
import UploadStatus from './upload/UploadStatus';
import { useRef } from 'react';

interface UploadCardProps {
  onUploadComplete?: (files: File[]) => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
  className?: string;
  title?: string;
  description?: string;
  allowMultiple?: boolean;
  onCompareFiles?: (files: File[]) => void;
  showComparison?: boolean;
}

const UploadCard = ({
  onUploadComplete,
  allowedTypes = ['.pdf'],
  maxSize = 10, // 10MB default
  className,
  title = "Upload Xactimate PDF",
  description = "Drag and drop your Xactimate PDF file here, or click to browse",
  allowMultiple = false,
  onCompareFiles,
  showComparison = false
}: UploadCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    files,
    fileStatus,
    errorMessage,
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    handleRemoveFile,
    resetUpload
  } = useFileUpload({
    allowedTypes,
    maxSize,
    allowMultiple,
    onUploadComplete
  });

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
  
  const handleCompareFiles = () => {
    if (files.length >= 2 && onCompareFiles) {
      onCompareFiles(files);
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300", className)}>
      <CardContent className="p-0">
        <div
          className={cn(
            "relative flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-lg transition-all duration-300 min-h-[200px]",
            isDragging 
              ? "border-primary bg-primary/5" 
              : fileStatus === 'error' 
                ? "border-destructive/50 bg-destructive/5"
                : "border-input bg-secondary/50",
            fileStatus === 'success' && "bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-800"
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {fileStatus === 'idle' ? (
            <UploadIdle 
              title={title}
              description={description}
              allowedTypes={allowedTypes}
              maxSize={maxSize}
              allowMultiple={allowMultiple}
              onSelectFile={handleSelectFile}
            />
          ) : (
            <UploadStatus 
              files={files}
              fileStatus={fileStatus}
              errorMessage={errorMessage}
              onRemoveFile={handleRemoveFile}
              onUploadAnother={resetUpload}
              onTryAgain={resetUpload}
              onCompareFiles={handleCompareFiles}
              showComparison={showComparison}
            />
          )}
          
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            accept={allowedTypes.join(',')}
            onChange={handleFileChange}
            className="hidden"
            multiple={allowMultiple}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadCard;
