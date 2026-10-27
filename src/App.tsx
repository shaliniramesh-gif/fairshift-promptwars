import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { NavigationTabs } from './components/common/NavigationTabs';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { AccessibilityDrawer } from './components/common/AccessibilityDrawer';
import { WorkerDashboard } from './components/dashboards/WorkerDashboard';
import { HRDashboard } from './components/dashboards/HRDashboard';
import { FinanceDashboard } from './components/dashboards/FinanceDashboard';
import { SalesDashboard } from './components/dashboards/SalesDashboard';
import { SafetyDashboard } from './components/dashboards/SafetyDashboard';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { FairShiftPulseView } from './components/pulse/FairShiftPulseView';
import { LoginOnboarding } from './components/auth/LoginOnboarding';
import { DepartmentManagerDashboard } from './components/dashboards/DepartmentManagerDashboard';
import { IncidentReportModal } from './components/common/IncidentReportModal';
import { AccommodationModal } from './components/common/AccommodationModal';
import { LeaveRequestModal } from './components/common/LeaveRequestModal';
import { OvertimeRequestModal } from './components/common/OvertimeRequestModal';
import { LogOut, Layers } from 'lucide-react';

const MainShell: React.FC = () => {
  const {
    isLoggedIn,
    role,
    currentTab,
    organization,
    user,
    userAccount,
    activeMembership,
    logout
  } = useApp();

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isOvertimeModalOpen, setIsOvertimeModalOpen] = useState(false);
  const [isAccessibilityDrawerOpen, setIsAccessibilityDrawerOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginOnboarding />;
  }

  // Render role dashboard or Pulse AI
  const renderDashboardContent = () => {
    if (currentTab === 'pulse') {
      return <FairShiftPulseView />;
    }

    switch (role) {
      case 'worker':
        return (
          <WorkerDashboard
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onOpenAccommodationModal={() => setIsAccommodationModalOpen(true)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onOpenOvertimeModal={() => setIsOvertimeModalOpen(true)}
          />
        );
      case 'manager':
        return (
          <DepartmentManagerDashboard
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        );
      case 'hr':
        return <HRDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      case 'sales':
        return <SalesDashboard />;
      case 'safety':
        return <SafetyDashboard />;
      case 'superadmin':
        return <SuperAdminDashboard />;
      default:
        return (
          <WorkerDashboard
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onOpenAccommodationModal={() => setIsAccommodationModalOpen(true)}
            onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
            onOpenOvertimeModal={() => setIsOvertimeModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-main)] transition-colors">
      
      {/* Compact Header with integrated active facility and accessibility trigger */}
      <Header
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenAccommodationModal={() => setIsAccommodationModalOpen(true)}
        onOpenAccessibilityDrawer={() => setIsAccessibilityDrawerOpen(true)}
      />

      {/* Role Navigation Bar (Desktop) */}
      <NavigationTabs />

      {/* Multi-Profile Active Context Banner (Requirements 3, 5 & 6) */}
      <aside
        className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2 text-xs transition-colors"
        aria-label="Active Context and Multi-Profile Indicator"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <span className="font-mono text-[10px] font-bold uppercase bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-700 px-2 py-0.5 rounded">
              Active Context
            </span>
            <span className="text-[11px] leading-tight flex items-center space-x-1">
              <span>{user.name}</span>
              <span className="text-slate-400">({user.roleLabel})</span>
              <span className="text-slate-400">·</span>
              <strong className="text-slate-900 dark:text-white">{organization.name}</strong>
              {activeMembership && (
                <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.2 rounded ml-1">
                  <Layers className="w-2.5 h-2.5 text-teal-500" />
                  <span>{activeMembership.badge}</span>
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={logout}
              className="text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center space-x-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Switch Organisation / Profile</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8">
        {renderDashboardContent()}
      </main>

      {/* Mobile Bottom Navigation (Visible on mobile screens) */}
      <MobileBottomNav
        onOpenAccessibilityDrawer={() => setIsAccessibilityDrawerOpen(true)}
        onOpenAccommodationModal={() => setIsAccommodationModalOpen(true)}
      />

      {/* Accessible BarrierBridge Drawer */}
      <AccessibilityDrawer
        isOpen={isAccessibilityDrawerOpen}
        onClose={() => setIsAccessibilityDrawerOpen(false)}
        onOpenAccommodationModal={() => setIsAccommodationModalOpen(true)}
      />

      {/* Modals */}
      <IncidentReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <AccommodationModal
        isOpen={isAccommodationModalOpen}
        onClose={() => setIsAccommodationModalOpen(false)}
      />

      <LeaveRequestModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />

      <OvertimeRequestModal
        isOpen={isOvertimeModalOpen}
        onClose={() => setIsOvertimeModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">FairShift</span>
            <span>· Decent Work Intelligence Platform</span>
            <span className="hidden md:inline">| Aligned with UN Sustainable Development Goal 8</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] font-mono">
            <span>Theme: {organization.theme.toUpperCase()}</span>
            <span>·</span>
            <span>All Demo Data Local</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}
