
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SupplementRecommendations = () => {
  return (
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
  );
};

export default SupplementRecommendations;
