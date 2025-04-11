
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './hooks/use-theme';
import AppSidebar from './components/AppSidebar';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';
import Navbar from './components/Navbar';
import './App.css';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

// Lazy load components to reduce initial bundle size
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Supplements = lazy(() => import('./pages/Supplements'));
const SupplementAnalysis = lazy(() => import('./pages/SupplementAnalysis'));
const Settings = lazy(() => import('./pages/Settings'));
const Accounting = lazy(() => import('./pages/Accounting'));
const ContractorPortal = lazy(() => import('./pages/ContractorPortal'));
const NewSupplementRequest = lazy(() => import('./pages/NewSupplementRequest'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Index = lazy(() => import('./pages/Index'));

// Create a client with optimized configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 1,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Loading fallback component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center w-full h-[80vh]">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/welcome" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Index />
                </Suspense>
              } />
              
              {/* Protected routes */}
              <Route element={<ProtectedRouteLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/supplements" element={<Supplements />} />
                <Route path="/supplements/:id" element={<Supplements />} />
                <Route path="/supplements/status/:status" element={<Supplements />} />
                <Route path="/supplements/new-request" element={<NewSupplementRequest />} />
                <Route path="/supplement-analysis" element={<SupplementAnalysis />} />
                <Route path="/accounting" element={<Accounting />} />
                <Route path="/accounting/new-invoice" element={<Accounting />} />
                <Route path="/accounting/:invoiceId" element={<Accounting />} />
                <Route path="/contractors" element={<ContractorPortal />} />
                <Route path="/contractor-portal" element={<ContractorPortal />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/:section" element={<Settings />} />
              </Route>
              
              {/* Not Found */}
              <Route path="*" element={
                <Suspense fallback={<LoadingFallback />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Component to wrap protected routes with sidebar and navigation
function ProtectedRouteLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/supplements" element={<Supplements />} />
                  <Route path="/supplements/:id" element={<Supplements />} />
                  <Route path="/supplements/status/:status" element={<Supplements />} />
                  <Route path="/supplements/new-request" element={<NewSupplementRequest />} />
                  <Route path="/supplement-analysis" element={<SupplementAnalysis />} />
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/accounting/new-invoice" element={<Accounting />} />
                  <Route path="/accounting/:invoiceId" element={<Accounting />} />
                  <Route path="/contractors" element={<ContractorPortal />} />
                  <Route path="/contractor-portal" element={<ContractorPortal />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/settings/:section" element={<Settings />} />
                </Routes>
              </Suspense>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}

export default App;
