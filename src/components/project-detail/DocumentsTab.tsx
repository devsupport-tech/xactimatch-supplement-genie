
import { useState } from 'react';
import { FileText, FileSpreadsheet, PlusCircle, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import UploadCard from '@/components/UploadCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import PDFComparisonView from '@/components/PDFComparisonView';

const DocumentsTab = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<{name: string, type: string, size: number, file?: File}[]>([]);
  const [activeTab, setActiveTab] = useState('documents');
  const [compareMode, setCompareMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const handleUpload = () => {
    // Create a file input element dynamically
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.esx';
    
    // Trigger click on the file input
    fileInput.click();
    
    // Handle file selection
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      
      if (files && files.length > 0) {
        setIsUploading(true);
        
        // Simulate upload process
        setTimeout(() => {
          setIsUploading(false);
          
          // Add the file to documents
          const newDoc = {
            name: files[0].name,
            type: files[0].type || getFileTypeFromExtension(files[0].name),
            size: files[0].size,
            file: files[0]
          };
          
          setDocuments(prev => [...prev, newDoc]);
          
          toast({
            title: "Document uploaded",
            description: `${files[0].name} has been uploaded successfully.`,
          });
        }, 1500);
      }
    };
  };
  
  const getFileTypeFromExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    
    if (ext === 'esx') return 'application/esx';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    if (['pdf'].includes(ext)) return 'application/pdf';
    if (['doc', 'docx'].includes(ext)) return 'application/msword';
    if (['xls', 'xlsx'].includes(ext)) return 'application/excel';
    
    return 'application/octet-stream';
  };
  
  const getFileIcon = (type: string) => {
    if (type.includes('image')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('esx')) return '📊';
    if (type.includes('word')) return '📝';
    return '📎';
  };
  
  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Document removed",
      description: "The document has been removed successfully."
    });
  };
  
  const handleUploadComplete = (files: File[]) => {
    files.forEach(file => {
      const newDoc = {
        name: file.name,
        type: file.type || getFileTypeFromExtension(file.name),
        size: file.size,
        file: file
      };
      
      setDocuments(prev => [...prev, newDoc]);
    });
  };
  
  const handleCompareFiles = (files: File[]) => {
    if (files.length >= 2) {
      setSelectedFiles(files);
      setCompareMode(true);
      setActiveTab('comparison');
      
      toast({
        title: "Comparison mode activated",
        description: "Select the 'Compare' tab to view the file comparison.",
      });
    }
  };
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="documents">All Documents</TabsTrigger>
          <TabsTrigger value="esx">ESX Files</TabsTrigger>
          <TabsTrigger value="comparison" disabled={!compareMode}>
            Compare PDFs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="documents">
          {documents.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Project Documents</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const pdfFiles = documents
                        .filter(doc => doc.type.includes('pdf') && doc.file)
                        .map(doc => doc.file as File);
                      
                      if (pdfFiles.length >= 2) {
                        setSelectedFiles([pdfFiles[0], pdfFiles[1]]);
                        setCompareMode(true);
                        setActiveTab('comparison');
                      } else {
                        toast({
                          variant: "destructive",
                          title: "Comparison error",
                          description: "You need at least 2 PDF files to compare.",
                        });
                      }
                    }}
                    disabled={documents.filter(doc => doc.type.includes('pdf')).length < 2}
                  >
                    Compare PDFs
                  </Button>
                  <Button onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Upload Document
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 text-2xl">
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round(doc.size / 1024)} KB
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeDocument(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Documents Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                There are no documents uploaded for this project yet.
              </p>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="esx">
          <div className="space-y-6">
            <UploadCard 
              onUploadComplete={handleUploadComplete} 
              allowedTypes={['.esx', '.ESX']}
              title="Upload ESX File"
              description="Drag and drop your ESX file here, or click to browse. ESX files contain the estimate data from Xactimate."
            />
            
            {documents.filter(d => d.type.includes('esx')).length > 0 ? (
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Uploaded ESX Files</h3>
                <div className="grid grid-cols-1 gap-3">
                  {documents
                    .filter(d => d.type.includes('esx') || d.name.toLowerCase().endsWith('.esx'))
                    .map((doc, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileSpreadsheet className="mr-3 h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {Math.round(doc.size / 1024)} KB
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Preview</Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeDocument(documents.indexOf(doc))}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 border rounded-lg bg-muted/20 mt-6">
                <FileSpreadsheet className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No ESX files uploaded yet</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="space-y-6">
            {!compareMode ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">PDF Comparison</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Upload at least two PDF files to compare their contents.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('documents')}
                  >
                    View Documents
                  </Button>
                  <Button 
                    onClick={() => {
                      setActiveTab('documents');
                      handleUpload();
                    }}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload PDFs
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCompareMode(false);
                      setSelectedFiles([]);
                      setActiveTab('documents');
                    }}
                  >
                    Return to Documents
                  </Button>
                </div>
                <PDFComparisonView 
                  originalFile={selectedFiles[0]} 
                  newFile={selectedFiles[1]} 
                  onRecompare={() => {
                    // Logic to recompare files
                  }}
                />
              </>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Upload PDFs for Comparison</h3>
              <UploadCard 
                onUploadComplete={handleUploadComplete}
                allowedTypes={['.pdf']}
                allowMultiple={true}
                title="Upload PDF Files"
                description="Upload two or more PDF files to compare their contents and analyze differences."
                showComparison={true}
                onCompareFiles={handleCompareFiles}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsTab;
