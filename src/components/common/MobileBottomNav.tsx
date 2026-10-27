import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  Menu,
  X,
  FileCheck,
  ShieldAlert,
  Award,
  DollarSign,
  HeartHandshake,
  TrendingUp,
  BarChart3,
  Building,
  Lock,
  History,
  SlidersHorizontal
} from 'lucide-react';

interface MobileBottomNavProps {
  onOpenAccessibilityDrawer: () => void;
  onOpenAccommodationModal: () => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenAccessibilityDrawer,
  onOpenAccommodationModal
}) => {
  const { role, currentTab, setCurrentTab, pulseInsights } = useApp();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const getTabsForRole = (r: Role): TabItem[] => {
    switch (r) {
      case 'worker':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'shifts', label: 'Shifts & Roster', icon: Calendar },
          { id: 'payslip', label: 'Payslip', icon: DollarSign },
          { id: 'safety', label: 'Anonymous Safety', icon: ShieldAlert },
          { id: 'skills', label: 'Skills Passport', icon: Award },
          { id: 'accommodations', label: 'Accommodations', icon: HeartHandshake },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      case 'manager':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'roster', label: 'Team Roster', icon: Calendar },
          { id: 'swaps', label: 'Shift Swaps', icon: FileCheck },
          { id: 'hazards', label: 'Hazards Triage', icon: ShieldAlert },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      case 'hr':
        return [
          { id: 'overview', label: 'HR Overview', icon: LayoutDashboard },
          { id: 'coverage', label: 'Shift Coverage', icon: Calendar },
          { id: 'fatigue', label: 'Fatigue & Overtime', icon: Calendar },
          { id: 'leave', label: 'Leave Approvals', icon: FileCheck },
          { id: 'concerns', label: 'Worker Concerns', icon: ShieldAlert },
          { id: 'analytics', label: 'HR Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      case 'finance':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'budget', label: 'Living Wage & Labor', icon: DollarSign },
          { id: 'analytics', label: 'Margin Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      case 'sales':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'pipeline', label: 'Pipeline & Deals', icon: TrendingUp },
          { id: 'analytics', label: 'Quota Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      case 'safety':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'incidents', label: 'Hazard Registry', icon: ShieldAlert },
          { id: 'corrective', label: 'Corrective Actions', icon: FileCheck },
          { id: 'analytics', label: 'EHS Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      case 'superadmin':
        return [
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'departments', label: 'Departments', icon: Building },
          { id: 'matrix', label: 'Permissions', icon: Lock },
          { id: 'audit', label: 'Audit Log', icon: History },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];
      default:
        return [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }];
    }
  };

  const tabs = getTabsForRole(role);
  const primaryActionTab = tabs[1] || tabs[0];
  const unmitigatedAlerts = pulseInsights.filter(p => p.actionStatus !== 'mitigated').length;

  return (
    <>
      {/* Mobile Bottom Fixed Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 md:hidden safe-area-bottom select-none"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-4 h-14">
          {/* 1. Overview */}
          <button
            onClick={() => {
              setCurrentTab('overview');
              setIsMoreMenuOpen(false);
            }}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold transition ${
              currentTab === 'overview' && !isMoreMenuOpen
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Dashboard</span>
          </button>

          {/* 2. Primary Tool for Role */}
          <button
            onClick={() => {
              setCurrentTab(primaryActionTab.id);
              setIsMoreMenuOpen(false);
            }}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold transition ${
              currentTab === primaryActionTab.id && !isMoreMenuOpen
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <primaryActionTab.icon className="w-5 h-5 mb-0.5" />
            <span className="truncate max-w-[68px]">{primaryActionTab.label.split(' ')[0]}</span>
          </button>

          {/* 3. Pulse AI */}
          <button
            onClick={() => {
              setCurrentTab('pulse');
              setIsMoreMenuOpen(false);
            }}
            className={`relative flex flex-col items-center justify-center text-[10px] font-semibold transition ${
              currentTab === 'pulse' && !isMoreMenuOpen
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-5 h-5 mb-0.5 text-teal-500" />
            <span>Pulse AI</span>
            {unmitigatedAlerts > 0 && (
              <span className="absolute top-2 right-6 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {/* 4. More Menu */}
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`flex flex-col items-center justify-center text-[10px] font-semibold transition ${
              isMoreMenuOpen
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isMoreMenuOpen ? <X className="w-5 h-5 mb-0.5" /> : <Menu className="w-5 h-5 mb-0.5" />}
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {/* Slide-Up Mobile Menu Drawer */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMoreMenuOpen(false)}
          />

          <div className="relative bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl p-5 pb-20 max-h-[75vh] overflow-y-auto">
            <div className="w-12 h-1 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                All Navigation Views
              </span>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setCurrentTab(tab.id);
                      setIsMoreMenuOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center space-x-2 transition ${
                      isActive
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenAccessibilityDrawer();
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-2 transition"
              >
                <SlidersHorizontal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Accessibility & Contrast Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenAccommodationModal();
                }}
                className="w-full p-2.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center justify-center space-x-2 transition"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Request Non-Medical Accommodation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
