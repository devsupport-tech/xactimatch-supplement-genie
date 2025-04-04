
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Folder, Plus, UploadCloud, Users } from "lucide-react";
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface QuickActionsProps {
  onOpenTeamDialog?: () => void;
}

export const QuickActions = ({ onOpenTeamDialog }: QuickActionsProps) => {
  // Handler for generating reports
  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your report is being generated and will be ready shortly.",
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "Your report has been generated and is ready to download.",
        action: (
          <Button variant="outline" onClick={() => {
            // Mock download behavior
            const link = document.createElement('a');
            link.href = '#';
            link.setAttribute('download', 'project_report.pdf');
            link.click();
          }}>
            Download
          </Button>
        ),
      });
    }, 2000);
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="grid grid-cols-2 gap-3">
          <Button className="justify-start bg-primary h-auto py-3 px-4" asChild>
            <Link to="/projects">
              <Folder className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Projects</div>
                <div className="text-xs opacity-90">View all projects</div>
              </div>
            </Link>
          </Button>
          <Button className="justify-start bg-primary h-auto py-3 px-4">
            <Plus className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="text-sm font-medium">Create</div>
              <div className="text-xs opacity-90">New project</div>
            </div>
          </Button>
          <Button 
            className="justify-start h-auto py-3 px-4"
            variant="outline"
            onClick={handleGenerateReport}
          >
            <FileText className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="text-sm font-medium">Report</div>
              <div className="text-xs text-muted-foreground">Generate report</div>
            </div>
          </Button>
          <Button 
            className="justify-start h-auto py-3 px-4"
            variant="outline"
            onClick={onOpenTeamDialog}
          >
            <Users className="mr-2 h-4 w-4" />
            <div className="text-left">
              <div className="text-sm font-medium">Team</div>
              <div className="text-xs text-muted-foreground">Manage team</div>
            </div>
          </Button>
          <Button
            className="justify-start h-auto py-3 px-4"
            variant="outline"
            asChild
          >
            <Link to="/supplements">
              <UploadCloud className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Upload</div>
                <div className="text-xs text-muted-foreground">New PDF</div>
              </div>
            </Link>
          </Button>
          <Button 
            className="justify-start h-auto py-3 px-4"
            variant="outline"
            asChild
          >
            <Link to="/settings">
              <Calendar className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Calendar</div>
                <div className="text-xs text-muted-foreground">View schedule</div>
              </div>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
