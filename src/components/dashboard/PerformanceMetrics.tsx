
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

export const PerformanceMetrics = () => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Monthly Performance</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Projects Completed</p>
              <span className="text-green-500 text-xs font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                12%
              </span>
            </div>
            <Progress value={65} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Revenue Growth</p>
              <span className="text-green-500 text-xs font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                8%
              </span>
            </div>
            <Progress value={48} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Client Satisfaction</p>
              <span className="text-green-500 text-xs font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" />
                5%
              </span>
            </div>
            <Progress value={92} className="h-1.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
