
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';
import { useState } from 'react';

const SocialLoginButtons = () => {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({
    google: false,
    microsoft: false
  });

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(prev => ({ ...prev, google: true }));
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
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
      setIsLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading(prev => ({ ...prev, microsoft: true }));
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Could not sign in with Microsoft"
      });
    } finally {
      setIsLoading(prev => ({ ...prev, microsoft: false }));
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
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading.google}
        >
          {isLoading.google ? (
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin mr-2" />
          ) : (
            <FcGoogle className="h-5 w-5 mr-2" />
          )}
          Google
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleMicrosoftLogin}
          disabled={isLoading.microsoft}
        >
          {isLoading.microsoft ? (
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-current animate-spin mr-2" />
          ) : (
            <BsMicrosoft className="h-4 w-4 mr-2 text-blue-500" />
          )}
          Microsoft
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
