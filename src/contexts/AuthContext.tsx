
import { createContext, useState, useContext, useEffect } from 'react';
import { User, createClient } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are available
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase credentials missing! Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are set."
  );
}

// Create client only if we have both URL and key
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Check if user is authenticated on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // If Supabase is not initialized, set loading to false
        if (!supabase) {
          console.error("Supabase client not initialized. Check your environment variables.");
          setLoading(false);
          return;
        }
        
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
          return;
        }
        
        // Set user and authentication status
        setUser(data.session?.user || null);
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Error in auth check:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    
    // Set up auth listener only if Supabase is initialized
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth state changed:", event);
        setUser(session?.user || null);
        setIsAuthenticated(!!session);
        setLoading(false);
      });
      
      return () => {
        // Clean up auth listener on unmount
        authListener?.subscription.unsubscribe();
      };
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      if (!supabase) {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Authentication service is not available at the moment.",
        });
        return { success: false, error: "Authentication service not available" };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    try {
      if (!supabase) {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Authentication service is not available at the moment.",
        });
        return { success: false, error: "Authentication service not available" };
      }
      
      // Register the user
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { 
            full_name: name 
          }
        }
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      // Update user metadata with name
      if (data.user) {
        // Note: signUp already includes user metadata from the options
        return { success: true };
      }
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };
  
  const logout = async () => {
    try {
      if (!supabase) {
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: "Authentication service is not available at the moment.",
        });
        return;
      }
      
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem logging out",
      });
    }
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
