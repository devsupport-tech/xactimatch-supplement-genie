
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Upload, File, X, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

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
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileStatus, setFileStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!allowedTypes.includes(fileExtension)) {
      setErrorMessage(`Invalid file type. Please upload: ${allowedTypes.join(', ')}`);
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setErrorMessage(`File is too large. Maximum size is ${maxSize}MB.`);
      return false;
    }

    return true;
  };

  const processFile = async (newFiles: File[]) => {
    if (!allowMultiple) {
      setFiles([newFiles[0]]);
    } else {
      setFiles(prev => [...prev, ...newFiles]);
    }
    
    setFileStatus('loading');
    setErrorMessage(null);

    const allValid = newFiles.every(validateFile);
    if (!allValid) {
      setFileStatus('error');
      return;
    }

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFileStatus('success');
      if (onUploadComplete) {
        onUploadComplete(allowMultiple ? [...files, ...newFiles] : [newFiles[0]]);
      }
      
      toast({
        title: allowMultiple 
          ? `${newFiles.length} file${newFiles.length > 1 ? 's' : ''} uploaded successfully`
          : "File uploaded successfully",
        description: allowMultiple 
          ? `${newFiles.map(f => f.name).join(', ')} have been processed`
          : `${newFiles[0].name} has been processed`,
      });
    } catch (error) {
      setFileStatus('error');
      setErrorMessage('An error occurred while processing the file(s).');
      
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error processing your file(s).",
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      processFile(allowMultiple ? newFiles : [newFiles[0]]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      processFile(allowMultiple ? newFiles : [newFiles[0]]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      
      if (newFiles.length === 0) {
        setFileStatus('idle');
      }
      
      return newFiles;
    });
  };

  const handleCompareFiles = () => {
    if (files.length >= 2 && onCompareFiles) {
      onCompareFiles(files);
    } else {
      toast({
        variant: "destructive",
        title: "Comparison failed",
        description: "You need at least 2 files to perform a comparison.",
      });
    }
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300",
      className
    )}>
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
            <>
              <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
              <h3 className="mb-1 text-lg font-medium">{title}</h3>
              <p className="mb-4 text-sm text-muted-foreground max-w-sm">{description}</p>
              
              <Button 
                variant="secondary" 
                onClick={() => document.getElementById('fileInput')?.click()}
                className="animated-button"
              >
                Choose File{allowMultiple ? 's' : ''}
              </Button>
              
              <input
                id="fileInput"
                type="file"
                accept={allowedTypes.join(',')}
                onChange={handleFileChange}
                className="hidden"
                multiple={allowMultiple}
              />
              
              <p className="mt-3 text-xs text-muted-foreground">
                Supported files: {allowedTypes.join(', ')} (Max size: {maxSize}MB)
              </p>
            </>
          ) : fileStatus === 'loading' ? (
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 mb-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <h3 className="mb-1 text-lg font-medium">Processing file{files.length > 1 ? 's' : ''}...</h3>
              <p className="text-sm text-muted-foreground">This may take a moment</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              {fileStatus === 'success' ? (
                <CheckCircle className="w-10 h-10 mb-3 text-green-500" />
              ) : (
                <AlertCircle className="w-10 h-10 mb-3 text-destructive" />
              )}
              
              <h3 className="mb-2 text-lg font-medium">
                {fileStatus === 'success' 
                  ? `File${files.length > 1 ? 's' : ''} Uploaded Successfully` 
                  : 'Upload Failed'}
              </h3>
              
              {errorMessage && (
                <p className="mb-3 text-sm text-destructive">{errorMessage}</p>
              )}
              
              {files.length > 0 && (
                <div className="w-full max-w-md mt-1 mb-3">
                  {files.map((file, index) => (
                    <div 
                      key={`${file.name}-${index}`} 
                      className="flex items-center p-2 mt-2 rounded-md bg-background"
                    >
                      <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-6 h-6 ml-auto"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant={fileStatus === 'success' ? "outline" : "default"} 
                  size="sm" 
                  onClick={() => {
                    setFiles([]);
                    setFileStatus('idle');
                    setErrorMessage(null);
                  }}
                  className="animated-button"
                >
                  {fileStatus === 'success' ? 'Upload Another' : 'Try Again'}
                </Button>
                
                {fileStatus === 'success' && files.length >= 2 && showComparison && (
                  <Button 
                    variant="default" 
                    size="sm"
                    className="animated-button"
                    onClick={handleCompareFiles}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Compare Files
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadCard;
