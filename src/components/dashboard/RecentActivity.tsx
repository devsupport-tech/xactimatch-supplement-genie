
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Coffee, FileText, Users } from "lucide-react";

export const RecentActivity = () => {
  return (
    <Card className="border-border/60 shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">New project created</p>
              <p className="text-xs text-muted-foreground mt-1">Today, 10:30 AM</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Project #1023 approved</p>
              <p className="text-xs text-muted-foreground mt-1">Yesterday, 3:45 PM</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium">New team member added</p>
              <p className="text-xs text-muted-foreground mt-1">Aug 12, 9:15 AM</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <Coffee className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Client meeting scheduled</p>
              <p className="text-xs text-muted-foreground mt-1">Aug 14, 2:00 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
