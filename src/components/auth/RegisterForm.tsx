
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PasswordInput from './PasswordInput';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await register(registerForm.email, registerForm.password, registerForm.name);
      
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.error || "Could not create your account",
        });
        return;
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      navigate('/');
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={registerForm.name}
            onChange={handleRegisterChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={registerForm.email}
            onChange={handleRegisterChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reg-password">Password</Label>
          <PasswordInput
            id="reg-password"
            name="password"
            value={registerForm.password}
            onChange={handleRegisterChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <PasswordInput
            id="confirm-password"
            name="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleRegisterChange}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full group" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2" />
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
