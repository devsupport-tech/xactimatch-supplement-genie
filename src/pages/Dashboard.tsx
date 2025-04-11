
import { useState } from 'react';
import ProjectAnalytics from '@/components/dashboard/ProjectAnalytics';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCards } from '@/components/dashboard/StatCards';
import { AnalyticsToggle } from '@/components/dashboard/AnalyticsToggle';
import { ProjectStatusSection } from '@/components/dashboard/ProjectStatusSection';
import { RecentProjects } from '@/components/dashboard/RecentProjects';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { TeamManagementDialog } from '@/components/dashboard/TeamManagementDialog';

const Dashboard = () => {
  const [openTeamDialog, setOpenTeamDialog] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 container py-6 max-w-7xl">
        {/* Dashboard Header */}
        <DashboardHeader />
        
        {/* Stats Cards */}
        <StatCards />
        
        {/* Analytics Toggle */}
        <AnalyticsToggle 
          showAnalytics={showAnalytics} 
          setShowAnalytics={setShowAnalytics} 
        />
        
        {/* Detailed Analytics Section */}
        {showAnalytics && (
          <div className="mb-8">
            <ProjectAnalytics />
          </div>
        )}
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ProjectStatusSection />
            <RecentProjects />
          </div>
          
          <div className="space-y-6">
            <QuickActions onOpenTeamDialog={() => setOpenTeamDialog(true)} />
            <PerformanceMetrics />
            <RecentActivity />
          </div>
        </div>
      </main>
      
      {/* Team Management Dialog */}
      <TeamManagementDialog 
        open={openTeamDialog} 
        onOpenChange={setOpenTeamDialog} 
      />
    </div>
  );
};

export default Dashboard;
