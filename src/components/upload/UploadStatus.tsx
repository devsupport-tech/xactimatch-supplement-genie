
import { AlertCircle, CheckCircle, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadStatusProps {
  files: File[];
  fileStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  onRemoveFile: (index: number) => void;
  onUploadAnother: () => void;
  onTryAgain: () => void;
  onCompareFiles?: () => void;
  showComparison?: boolean;
}

const UploadStatus = ({
  files,
  fileStatus,
  errorMessage,
  onRemoveFile,
  onUploadAnother,
  onTryAgain,
  onCompareFiles,
  showComparison
}: UploadStatusProps) => {
  if (fileStatus === 'loading') {
    return (
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 mb-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <h3 className="mb-1 text-lg font-medium">Processing file{files.length > 1 ? 's' : ''}...</h3>
        <p className="text-sm text-muted-foreground">This may take a moment</p>
      </div>
    );
  }

  if (fileStatus === 'success' || fileStatus === 'error') {
    return (
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
                  onClick={() => onRemoveFile(index)}
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
            onClick={fileStatus === 'success' ? onUploadAnother : onTryAgain}
            className="animated-button"
          >
            {fileStatus === 'success' ? 'Upload Another' : 'Try Again'}
          </Button>
          
          {fileStatus === 'success' && files.length >= 2 && showComparison && onCompareFiles && (
            <Button 
              variant="default" 
              size="sm"
              className="animated-button"
              onClick={onCompareFiles}
            >
              <span className="mr-2">Compare Files</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default UploadStatus;
