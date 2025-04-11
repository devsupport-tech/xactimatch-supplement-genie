
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';

const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            prompt: 'select_account'
          }
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Could not sign in with Google"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="w-full max-w-xs"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin mr-2" />
          ) : (
            <FcGoogle className="h-5 w-5 mr-2" />
          )}
          Google
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
