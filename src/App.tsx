
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Supplements from './pages/Supplements';
import SupplementAnalysis from './pages/SupplementAnalysis';
import Settings from './pages/Settings';
import Accounting from './pages/Accounting';
import ContractorPortal from './pages/ContractorPortal';
import NewSupplementRequest from './pages/NewSupplementRequest';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './hooks/use-theme';
import AppSidebar from './components/AppSidebar';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';
import Navbar from './components/Navbar';
import './App.css';
import { lazy, Suspense } from 'react';

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset className="flex flex-col">
                <Navbar />
                <div className="flex-1 overflow-y-auto">
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
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </SidebarInset>
            </div>
            <Toaster />
          </SidebarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
