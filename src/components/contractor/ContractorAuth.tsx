
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { ShieldCheck, Mail, Lock, ArrowRight, User } from 'lucide-react';

interface ContractorAuthProps {
  onLogin: () => void;
}

const ContractorAuth = ({ onLogin }: ContractorAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form using react-hook-form
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  // Register form using react-hook-form
  const registerForm = useForm({
    defaultValues: {
      name: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });
  
  const handleLogin = (data: any) => {
    setIsLoading(true);
    console.log('Login attempt with:', data);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, any login succeeds
      toast({
        title: "Login successful",
        description: "Welcome back to the contractor portal",
      });
      
      onLogin();
    }, 1500);
  };
  
  const handleRegister = (data: any) => {
    setIsLoading(true);
    console.log('Registration attempt with:', data);
    
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo, any registration succeeds
      toast({
        title: "Registration successful",
        description: "Your contractor account has been created",
      });
      
      onLogin();
    }, 1500);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in transition-all">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <ShieldCheck className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl">Contractor Portal</CardTitle>
        <CardDescription>
          Log in or create an account to access your projects and supplements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      {...loginForm.register('email', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...loginForm.register('password', { required: true })}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full group" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-1" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={registerForm.handleSubmit(handleRegister)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      {...registerForm.register('name', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="Your Construction Company"
                      className="pl-10"
                      {...registerForm.register('company', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      {...registerForm.register('email', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...registerForm.register('password', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      {...registerForm.register('confirmPassword', { required: true })}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full group" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-1" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContractorAuth;
