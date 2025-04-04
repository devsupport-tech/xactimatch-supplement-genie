
import { FileText, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectCardProps } from '@/components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SupplementsTabProps {
  project: ProjectCardProps;
}

const SupplementsTab = ({ project }: SupplementsTabProps) => {
  const navigate = useNavigate();
  
  const handleViewSupplement = (supplementId: string) => {
    // Navigate to the supplements page with the specific supplement selected
    navigate('/supplements', { state: { selectedSupplementId: supplementId } });
  };
  
  const handleCreateSupplement = () => {
    toast({
      title: "Creating new supplement",
      description: "Redirecting to supplement creation page",
    });
    
    // Navigate to supplements page with create mode and project ID
    navigate('/supplements', { state: { createMode: true, projectId: project.id } });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Supplements</h2>
        <Button 
          onClick={handleCreateSupplement}
          className="transition-all duration-200 hover:scale-[1.02]"
        >
          <PlusCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
          Create New Supplement
        </Button>
      </div>
      
      {project.supplements > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="transition-all duration-300 hover:shadow-lg cursor-pointer animate-fade-in"
            onClick={() => handleViewSupplement('1')}
          >
            <CardHeader>
              <CardTitle>Supplement #1</CardTitle>
              <CardDescription>Added on {new Date(project.lastUpdated).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-0 dark:bg-green-900/20">Approved</Badge>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">$3,245.00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Line Items</span>
                  <span className="font-medium">8</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full transition-all duration-200 hover:translate-y-[-2px]"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    handleViewSupplement('1');
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {project.supplements > 1 && (
            <Card 
              className="transition-all duration-300 hover:shadow-lg cursor-pointer animate-fade-in delay-100"
              onClick={() => handleViewSupplement('2')}
            >
              <CardHeader>
                <CardTitle>Supplement #2</CardTitle>
                <CardDescription>Added on {new Date(project.lastUpdated).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-0 dark:bg-amber-900/20">Pending</Badge>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-medium">$1,850.75</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Line Items</span>
                    <span className="font-medium">5</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full transition-all duration-200 hover:translate-y-[-2px]"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onClick
                      handleViewSupplement('2');
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20 animate-fade-in">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Supplements Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            There are no supplemental requests created for this project yet.
          </p>
          <Button 
            onClick={handleCreateSupplement}
            className="transition-all duration-200 hover:scale-[1.02]"
          >
            <PlusCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            Create New Supplement
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupplementsTab;
