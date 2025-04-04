
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ComparisonView from '@/components/ComparisonView';
import { toast } from '@/components/ui/use-toast';

interface PDFComparisonViewProps {
  originalFile?: File;
  newFile?: File;
  onRecompare?: () => void;
  className?: string;
}

// This would be replaced with actual data from the backend
interface LineItem {
  id: string;
  code: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

const PDFComparisonView = ({
  originalFile,
  newFile,
  onRecompare,
  className
}: PDFComparisonViewProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [summary, setSummary] = useState<string | null>(null);
  
  // Mock data for demonstration purposes
  const mockOriginalItems: LineItem[] = [
    { id: '1', code: 'DRY-100', description: 'Drywall repair', category: 'Drywall', quantity: 5, unit: 'SQFT', unitPrice: 45, totalPrice: 225 },
    { id: '2', code: 'PNT-100', description: 'Interior painting', category: 'Painting', quantity: 10, unit: 'SQFT', unitPrice: 35, totalPrice: 350 },
    { id: '3', code: 'FLR-200', description: 'Laminate flooring', category: 'Flooring', quantity: 8, unit: 'SQFT', unitPrice: 65, totalPrice: 520 },
  ];
  
  const mockNewItems: LineItem[] = [
    { id: '1', code: 'DRY-100', description: 'Drywall repair', category: 'Drywall', quantity: 8, unit: 'SQFT', unitPrice: 45, totalPrice: 360 },
    { id: '2', code: 'PNT-100', description: 'Interior painting', category: 'Painting', quantity: 10, unit: 'SQFT', unitPrice: 40, totalPrice: 400 },
    { id: '4', code: 'PLM-100', description: 'Plumbing repair', category: 'Plumbing', quantity: 2, unit: 'HOUR', unitPrice: 85, totalPrice: 170 },
  ];

  const analyzePDFs = async () => {
    if (!originalFile || !newFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Both original and new files are required for comparison.",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStatus('pending');

    try {
      // Simulate API call to process PDFs
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // This would be replaced with real data from the backend
      setSummary("The new estimate includes increases in drywall repair quantities (5 SQFT to 8 SQFT), an increase in painting unit price ($35 to $40), and adds a new plumbing repair item (2 hours at $85/hour). The removed laminate flooring item ($520) results in a net change of $165.");
      
      setAnalysisStatus('success');
      toast({
        title: "Analysis complete",
        description: "PDF comparison has been processed successfully.",
      });
    } catch (error) {
      setAnalysisStatus('error');
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "There was an error processing the PDF comparison.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // If files are not provided, show an empty state
  if (!originalFile || !newFile) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Files Required</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Please upload both the original and new PDF files to perform a comparison.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-medium">PDF Comparison</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Comparing <span className="font-medium">{originalFile.name}</span> with <span className="font-medium">{newFile.name}</span>
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={analyzePDFs}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                {analysisStatus === 'pending' ? 'Analyze PDFs' : 'Reanalyze'}
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <Tabs defaultValue="comparison">
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="comparison" className="p-0">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    <h3 className="font-medium">Original Estimate</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{originalFile.name}</p>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 border-0">
                    {(originalFile.size / 1024).toFixed(0)} KB
                  </Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 mr-2 text-green-500" />
                    <h3 className="font-medium">New Estimate</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{newFile.name}</p>
                  <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 border-0">
                    {(newFile.size / 1024).toFixed(0)} KB
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {analysisStatus === 'pending' && !isAnalyzing ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Click the "Analyze PDFs" button to start the comparison process.
                </p>
                <Button onClick={analyzePDFs}>
                  Analyze PDFs
                </Button>
              </div>
            ) : isAnalyzing ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <div className="w-10 h-10 mb-4 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <h3 className="text-lg font-medium mb-2">Analyzing PDFs</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This may take a moment as we process and compare the PDF content.
                </p>
              </div>
            ) : analysisStatus === 'error' ? (
              <div className="text-center py-12 border rounded-lg bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Analysis Failed</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  There was an error analyzing the PDFs. Please try again or upload different files.
                </p>
                <Button onClick={analyzePDFs} variant="default">
                  Retry Analysis
                </Button>
              </div>
            ) : (
              <ComparisonView 
                originalItems={mockOriginalItems}
                newItems={mockNewItems}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="m-0">
          <div className="p-6">
            {analysisStatus === 'pending' && !isAnalyzing ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Summary Available</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Click the "Analyze PDFs" button to generate an AI summary of the differences.
                </p>
                <Button onClick={analyzePDFs}>
                  Analyze PDFs
                </Button>
              </div>
            ) : isAnalyzing ? (
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <div className="w-10 h-10 mb-4 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <h3 className="text-lg font-medium mb-2">Generating Summary</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Our AI is analyzing the differences and creating a summary for you.
                </p>
              </div>
            ) : analysisStatus === 'error' ? (
              <div className="text-center py-12 border rounded-lg bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">Summary Generation Failed</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  There was an error generating the AI summary. Please try again.
                </p>
                <Button onClick={analyzePDFs} variant="default">
                  Retry Analysis
                </Button>
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg mb-2">AI Summary</h3>
                      <p className="text-sm leading-relaxed">{summary}</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md mt-6">
                    <h4 className="font-medium mb-2 text-sm">Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on the analysis, this supplement appears to be justified. The additional
                      drywall work and increased painting costs are reasonable given the scope change,
                      and the plumbing work is a necessary addition to complete the project.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default PDFComparisonView;
