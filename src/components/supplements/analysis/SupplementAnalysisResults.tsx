
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ComparisonView from '@/components/ComparisonView';
import SupplementAnalysisSummary from './SupplementAnalysisSummary';
import SupplementRecommendations from './SupplementRecommendations';
import SupplementResultsHeader from './SupplementResultsHeader';
import { mockOriginalItems, mockNewItems } from './mock-data';

interface SupplementAnalysisResultsProps {
  fileName: string;
}

const SupplementAnalysisResults = ({ fileName }: SupplementAnalysisResultsProps) => {
  return (
    <>
      <SupplementResultsHeader fileName={fileName} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SupplementAnalysisSummary />
        
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
      
      <SupplementRecommendations />
    </>
  );
};

export default SupplementAnalysisResults;
