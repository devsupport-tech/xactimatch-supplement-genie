
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Clipboard, FileText, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { toast } from '@/components/ui/use-toast';
import UploadCard from '@/components/UploadCard';
import ComparisonView from '@/components/ComparisonView';

const mockOriginalItems = [
  {
    id: "1",
    code: "DRY-01",
    description: "Drywall repair - small patch",
    category: "Drywall",
    quantity: 2,
    unit: "EA",
    unitPrice: 75.50,
    totalPrice: 151.00
  },
  {
    id: "2",
    code: "PNT-02",
    description: "Paint - interior walls",
    category: "Paint",
    quantity: 3,
    unit: "GAL",
    unitPrice: 45.75,
    totalPrice: 137.25
  }
];

const mockNewItems = [
  {
    id: "1",
    code: "DRY-01",
    description: "Drywall repair - small patch",
    category: "Drywall",
    quantity: 3,
    unit: "EA",
    unitPrice: 75.50,
    totalPrice: 226.50
  },
  {
    id: "2",
    code: "PNT-02",
    description: "Paint - interior walls",
    category: "Paint",
    quantity: 4,
    unit: "GAL",
    unitPrice: 48.25,
    totalPrice: 193.00
  },
  {
    id: "3",
    code: "PLM-01",
    description: "Plumbing fixture install",
    category: "Plumbing",
    quantity: 1,
    unit: "EA",
    unitPrice: 125.00,
    totalPrice: 125.00
  }
];

const SupplementAnalysis = () => {
  const [supplementFile, setSupplementFile] = useState<File | null>(null);
  const [analysisState, setAnalysisState] = useState<'upload' | 'loading' | 'results'>('upload');
  const [activeTab, setActiveTab] = useState('upload');
  
  const handleUploadComplete = (files: File[]) => {
    if (files.length > 0) {
      setSupplementFile(files[0]);
      setAnalysisState('loading');
      
      setTimeout(() => {
        setAnalysisState('results');
        setActiveTab('results');
      }, 2000);
    }
  };
  
  const handleCopyToClipboard = () => {
    toast({
      title: "Copied to clipboard",
      description: "The analysis results have been copied to your clipboard.",
    });
  };
  
  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF",
      description: "Your analysis is being exported to PDF format.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8 mt-14">
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
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              {supplementFile && analysisState === 'results' && (
                <>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Analysis Results: {supplementFile.name}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCopyToClipboard}>
                        <Clipboard className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button variant="outline" onClick={handleExportPDF}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Summary</CardTitle>
                        <CardDescription>Key findings from the analysis</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                            <span>Total line items: <strong>124</strong></span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                            <span>Potential underpayments: <strong>$5,842.50</strong></span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 mr-2"></span>
                            <span>Missing overhead: <strong>$1,240.75</strong></span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 mr-2"></span>
                            <span>Pricing discrepancies: <strong>17 items</strong></span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Line Item Analysis</CardTitle>
                        <CardDescription>Detailed breakdown by category</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ComparisonView 
                          originalItems={mockOriginalItems}
                          newItems={mockNewItems}
                        />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                      <CardDescription>Actions to optimize your claim</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border rounded-md bg-muted/40">
                        <h4 className="font-semibold flex items-center">
                          <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                          Supplement Opportunity: Roofing
                        </h4>
                        <p className="mt-1 text-sm">
                          The current estimate is missing proper roof flashing and ice/water shield requirements per local code.
                          A supplement could add approximately $2,340 to the claim value.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-muted/40">
                        <h4 className="font-semibold flex items-center">
                          <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                          Supplement Opportunity: Drywall
                        </h4>
                        <p className="mt-1 text-sm">
                          The estimate uses a lower grade drywall than what was originally installed.
                          Proper documentation could add approximately $1,150 to the claim value.
                        </p>
                      </div>
                      
                      <div className="p-4 border rounded-md bg-muted/40">
                        <h4 className="font-semibold flex items-center">
                          <ArrowRight className="mr-2 h-4 w-4 text-green-500" />
                          Pricing Discrepancy: Paint
                        </h4>
                        <p className="mt-1 text-sm">
                          The estimate uses a national average for paint that is below your regional market rate.
                          Correction could add approximately $875 to the claim value.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SupplementAnalysis;
