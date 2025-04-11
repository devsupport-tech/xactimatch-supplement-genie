
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SocialLoginButtons = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => toast({
            description: "Social login will be implemented soon"
          })}
        >
          Google
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => toast({
            description: "Social login will be implemented soon"
          })}
        >
          Microsoft
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
