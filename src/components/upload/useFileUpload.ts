
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface UseFileUploadOptions {
  allowedTypes: string[];
  maxSize: number;
  allowMultiple: boolean;
  onUploadComplete?: (files: File[]) => void;
}

export function useFileUpload({
  allowedTypes,
  maxSize,
  allowMultiple,
  onUploadComplete
}: UseFileUploadOptions) {
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

  const resetUpload = () => {
    setFiles([]);
    setFileStatus('idle');
    setErrorMessage(null);
  };

  return {
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
  };
}
