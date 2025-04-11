
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If children are provided, render them; otherwise, render the Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
