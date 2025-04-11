
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SupplementAnalysisSummary = () => {
  return (
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
  );
};

export default SupplementAnalysisSummary;
