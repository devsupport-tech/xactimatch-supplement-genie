
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText } from 'lucide-react';
import SupplementAnalysisResults from '@/components/supplements/analysis/SupplementAnalysisResults';
import SupplementUploadTab from '@/components/supplements/analysis/SupplementUploadTab';

const SupplementAnalysis = () => {
  const [supplementFile, setSupplementFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<'upload' | 'loading' | 'results'>('upload');
  const [activeTab, setActiveTab] = useState('upload');
  
  const handleUploadComplete = (file: File) => {
    setSupplementFile(file);
    setAnalysisState('loading');
    
    // Simulate processing time
    setTimeout(() => {
      setAnalysisState('results');
      setActiveTab('results');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Supplement Analysis</h1>
            <p className="text-muted-foreground mt-1">
              Upload and analyze supplement PDF files for insights and optimization opportunities
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="results" disabled={analysisState !== 'results'}>
                <FileText className="mr-2 h-4 w-4" />
                Results
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <SupplementUploadTab 
                onUploadComplete={handleUploadComplete}
                analysisState={analysisState}
                supplementFile={supplementFile}
              />
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              {supplementFile && analysisState === 'results' && (
                <SupplementAnalysisResults fileName={supplementFile.name} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SupplementAnalysis;
