
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import UploadCard from '@/components/UploadCard';

interface SupplementUploadTabProps {
  onUploadComplete: (file: File) => void;
  analysisState: 'upload' | 'loading' | 'results';
  supplementFile: File | null;
}

const SupplementUploadTab = ({ 
  onUploadComplete, 
  analysisState, 
  supplementFile 
}: SupplementUploadTabProps) => {
  
  const handleUploadComplete = (files: File[]) => {
    if (files.length > 0) {
      onUploadComplete(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <UploadCard 
        onUploadComplete={handleUploadComplete}
        allowedTypes={['.pdf']}
        title="Upload Supplement PDF"
        description="Drag and drop your supplement PDF file here, or click to browse"
      />
      
      {supplementFile && analysisState === 'loading' && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <h3 className="text-lg font-semibold mb-1">Analyzing Supplement File</h3>
            <p className="text-muted-foreground text-sm">
              Processing {supplementFile.name}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupplementUploadTab;
