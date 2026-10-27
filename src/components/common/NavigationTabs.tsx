import React from 'react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  ShieldAlert,
  Award,
  HeartHandshake,
  Sparkles,
  Users,
  Clock,
  TrendingUp,
  FileCheck,
  Building,
  BarChart3,
  Lock,
  History,
  Activity,
  Sliders
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

export const NavigationTabs: React.FC = () => {
  const { role, currentTab, setCurrentTab } = useApp();

  const getTabsForRole = (r: Role): TabItem[] => {
    switch (r) {
      case 'worker':
        return [
          { id: 'overview', label: 'My Dashboard', icon: LayoutDashboard },
          { id: 'shifts', label: 'Shifts & Schedule', icon: Calendar },
          { id: 'payslip', label: 'Pay Transparency', icon: DollarSign },
          { id: 'safety', label: 'Safety & Anonymous', icon: ShieldAlert },
          { id: 'skills', label: 'Skills Passport', icon: Award },
          { id: 'accommodations', label: 'Accommodations', icon: HeartHandshake },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      case 'manager':
        return [
          { id: 'overview', label: 'Department Overview', icon: LayoutDashboard },
          { id: 'roster', label: 'Team Roster', icon: Calendar },
          { id: 'swaps', label: 'Shift Swaps', icon: FileCheck },
          { id: 'hazards', label: 'Safety Hazards', icon: ShieldAlert },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      case 'hr':
        return [
          { id: 'overview', label: 'HR Overview', icon: LayoutDashboard },
          { id: 'coverage', label: 'Shift Coverage', icon: Calendar },
          { id: 'fatigue', label: 'Fatigue & Overtime', icon: Clock },
          { id: 'leave', label: 'Leave Approvals', icon: FileCheck },
          { id: 'concerns', label: 'Worker Concerns', icon: ShieldAlert },
          { id: 'analytics', label: 'HR Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      case 'finance':
        return [
          { id: 'overview', label: 'Finance Overview', icon: LayoutDashboard },
          { id: 'budget', label: 'Labor & Living Wage', icon: DollarSign },
          { id: 'analytics', label: 'Margin Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      case 'sales':
        return [
          { id: 'overview', label: 'Sales Overview', icon: LayoutDashboard },
          { id: 'pipeline', label: 'Pipeline & Deals', icon: TrendingUp },
          { id: 'analytics', label: 'Quota Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      case 'safety':
        return [
          { id: 'overview', label: 'Safety Overview', icon: LayoutDashboard },
          { id: 'incidents', label: 'Hazard Registry', icon: ShieldAlert },
          { id: 'corrective', label: 'Corrective Actions', icon: FileCheck },
          { id: 'analytics', label: 'EHS Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      case 'superadmin':
        return [
          { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
          { id: 'departments', label: 'Department Audit', icon: Building },
          { id: 'matrix', label: 'Role Permissions', icon: Lock },
          { id: 'audit', label: 'Activity Audit Log', icon: History },
          { id: 'analytics', label: 'Org Analytics', icon: BarChart3 },
          { id: 'pulse', label: 'Pulse AI', icon: Sparkles }
        ];

      default:
        return [{ id: 'overview', label: 'Overview', icon: LayoutDashboard }];
    }
  };

  const tabs = getTabsForRole(role);

  return (
    <nav
      className="hidden md:block bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 select-none"
      aria-label="Dashboard role-specific navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
