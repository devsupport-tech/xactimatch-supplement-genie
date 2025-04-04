
import { Button } from "@/components/ui/button";

interface AnalyticsToggleProps {
  showAnalytics: boolean;
  setShowAnalytics: (show: boolean) => void;
}

export const AnalyticsToggle = ({ showAnalytics, setShowAnalytics }: AnalyticsToggleProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Performance Overview</h2>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setShowAnalytics(!showAnalytics)}
      >
        {showAnalytics ? 'Hide Analytics' : 'Show Detailed Analytics'}
      </Button>
    </div>
  );
};
