
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ProjectCardProps } from '@/components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SupplementsCardProps {
  project: ProjectCardProps;
}

const SupplementsCard = ({ project }: SupplementsCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleViewSupplement = (supplementId: string) => {
    // Navigate to the supplements page with the specific supplement selected
    navigate('/supplements', { state: { selectedSupplementId: supplementId } });
  };
  
  const handleCreateSupplement = () => {
    toast({
      title: "Creating new supplement",
      description: "Redirecting to supplement creation page",
    });
    
    // Navigate to supplements page with create mode
    navigate('/supplements', { state: { createMode: true, projectId: project.id } });
  };
  
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader>
        <CardTitle>Supplements</CardTitle>
      </CardHeader>
      <CardContent>
        {project.supplements > 0 ? (
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center p-3 bg-muted/50 rounded-md cursor-pointer transition-all duration-200 hover:bg-accent/50 animate-fade-in"
              onClick={() => handleViewSupplement('1')}
            >
              <div>
                <div className="font-medium">Supplement #1</div>
                <div className="text-xs text-muted-foreground">Added on {new Date(project.lastUpdated).toLocaleDateString()}</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="transition-transform duration-200 hover:translate-x-1"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  handleViewSupplement('1');
                }}
              >
                View
              </Button>
            </div>
            {project.supplements > 1 && (
              <div 
                className="flex justify-between items-center p-3 bg-muted/50 rounded-md cursor-pointer transition-all duration-200 hover:bg-accent/50 animate-fade-in delay-100"
                onClick={() => handleViewSupplement('2')}
              >
                <div>
                  <div className="font-medium">Supplement #2</div>
                  <div className="text-xs text-muted-foreground">Added on {new Date(project.lastUpdated).toLocaleDateString()}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="transition-transform duration-200 hover:translate-x-1"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent onClick
                    handleViewSupplement('2');
                  }}
                >
                  View
                </Button>
              </div>
            )}
            <Button 
              className="w-full transition-all duration-200 hover:scale-[1.02] mt-2" 
              variant="outline" 
              onClick={handleCreateSupplement}
            >
              <PlusCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Create New Supplement
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 animate-fade-in">
            <div className="text-sm text-muted-foreground mb-4">No supplements have been created yet</div>
            <Button 
              className="w-full transition-all duration-200 hover:scale-[1.02]" 
              variant="outline" 
              onClick={handleCreateSupplement}
            >
              <PlusCircle className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
              Create New Supplement
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplementsCard;
