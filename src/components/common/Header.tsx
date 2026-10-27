import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Role, Industry } from '../../types';
import {
  Shield,
  Clock,
  Sparkles,
  ChevronDown,
  Building2,
  UserCheck,
  LogOut,
  AlertTriangle,
  Play,
  Square,
  RefreshCw,
  SlidersHorizontal,
  GraduationCap,
  ShoppingBag,
  Activity,
  HardHat,
  Building,
  Check,
  User,
  Users,
  Briefcase,
  Scale,
  Award,
  Layers
} from 'lucide-react';

interface HeaderProps {
  onOpenReportModal: () => void;
  onOpenAccommodationModal: () => void;
  onOpenAccessibilityDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReportModal,
  onOpenAccommodationModal,
  onOpenAccessibilityDrawer
}) => {
  const {
    user,
    role,
    organization,
    organizations,
    switchRole,
    switchOrganization,
    userAccount,
    activeMembership,
    demoAccounts,
    switchMembership,
    switchUserAccount,
    isClockedIn,
    toggleClock,
    shiftElapsedSeconds,
    logout,
    resetDemoData,
    currentTab,
    setCurrentTab,
    pulseInsights,
    accessibility
  } = useApp();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false);

  const accountMenuRef = useRef<HTMLDivElement>(null);
  const orgMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
      if (orgMenuRef.current && !orgMenuRef.current.contains(e.target as Node)) {
        setIsOrgMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format seconds into HH:MM:SS
  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getIndustryIcon = (ind: Industry) => {
    switch (ind) {
      case 'healthcare':
        return Activity;
      case 'manufacturing':
        return HardHat;
      case 'education':
        return GraduationCap;
      case 'corporate':
        return Building;
      case 'retail':
        return ShoppingBag;
      default:
        return Building2;
    }
  };

  const rolesList: { key: Role; label: string; desc: string; icon: React.ElementType }[] = [
    { key: 'worker', label: 'Employee / Worker', desc: 'Shift clock, personal payslip, anonymous reports', icon: Clock },
    { key: 'manager', label: 'Department Manager', desc: 'Shift swaps, roster coverage, local hazard triage', icon: Users },
    { key: 'hr', label: 'HR / Workforce Lead', desc: 'Fatigue metrics, rest recovery, leave approvals', icon: UserCheck },
    { key: 'finance', label: 'Finance Manager', desc: 'Labor costs, living wage parity, margin trends', icon: Scale },
    { key: 'sales', label: 'Sales Director', desc: 'Commercial pipeline, deals, zero worker data leak', icon: Briefcase },
    { key: 'safety', label: 'Safety / Operations', desc: 'Hazard registry, corrective actions, zero-harm', icon: Shield },
    { key: 'superadmin', label: 'Executive Super Admin', desc: 'Cross-industry governance, audit trail, RBAC', icon: Award }
  ];

  const unmitigatedAlertsCount = pulseInsights.filter(p => p.actionStatus !== 'mitigated').length;
  const isCustomA11y = accessibility.fontSize !== 'normal' || accessibility.highContrast || accessibility.reducedMotion || accessibility.simpleLanguage || accessibility.language !== 'en';

  const OrgIcon = getIndustryIcon(organization.industry);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Left: Brand + Active Organisation Selector */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setCurrentTab('overview')}
              className="flex items-center space-x-2 text-left group focus:outline-none"
              aria-label="FairShift Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition">
                <span className="font-extrabold text-xs sm:text-sm tracking-tighter">FS</span>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                    FairShift
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-1.5 py-0.2 rounded border border-teal-200 dark:border-teal-800">
                    SDG 8
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
                  Decent Work Intelligence
                </div>
              </div>
            </button>

            {/* Compact Active Organisation Dropdown */}
            <div className="relative" ref={orgMenuRef}>
              <button
                onClick={() => {
                  setIsOrgMenuOpen(!isOrgMenuOpen);
                  setIsAccountMenuOpen(false);
                }}
                className="flex items-center space-x-1.5 text-xs font-semibold px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition border border-slate-200/70 dark:border-slate-700 max-w-[150px] sm:max-w-[240px]"
                aria-expanded={isOrgMenuOpen}
                aria-haspopup="true"
                title="Switch Demonstration Facility"
              >
                <OrgIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">{organization.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
              </button>

              {isOrgMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <span>Select Operating Workplace</span>
                    <span className="text-[9px] text-teal-600 dark:text-teal-400 font-bold">5 Industries</span>
                  </div>
                  {organizations.map(org => {
                    const ItemIcon = getIndustryIcon(org.industry);
                    const isSelected = org.id === organization.id;
                    return (
                      <button
                        key={org.id}
                        onClick={() => {
                          switchOrganization(org.id);
                          setIsOrgMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition ${
                          isSelected
                            ? 'font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/20'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                          <div>
                            <div>{org.name}</div>
                            <div className="text-[10px] text-slate-400 capitalize">{org.industry} · {org.workerCount.toLocaleString()} staff</div>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 font-mono">
                            ACTIVE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick Tools + Compact Account/Context Menu */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5">
            
            {/* Clock-In Active Shift Pill (Available for all roles, essential for Workers) */}
            <button
              onClick={toggleClock}
              className={`flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition border ${
                isClockedIn
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700'
              }`}
              title={isClockedIn ? 'Clock Out of Active Shift' : 'Clock In to Start Shift'}
            >
              {isClockedIn ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              <span className="hidden md:inline">{isClockedIn ? 'Clock Out' : 'Clock In'}</span>
              {isClockedIn && (
                <span className="font-mono bg-black/20 px-1 py-0.2 rounded text-[10px]">
                  {formatTime(shiftElapsedSeconds)}
                </span>
              )}
            </button>

            {/* FairShift Pulse AI Shortcut */}
            <button
              onClick={() => setCurrentTab('pulse')}
              className={`relative flex items-center space-x-1 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
                currentTab === 'pulse'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 border-teal-200 dark:border-teal-800'
              }`}
              title="FairShift Pulse Explainable AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span className="hidden sm:inline">Pulse AI</span>
              {unmitigatedAlertsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Compact Accessibility Settings Button (Replaces oversized permanent top bar) */}
            <button
              onClick={onOpenAccessibilityDrawer}
              className="relative p-1.5 sm:px-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition flex items-center space-x-1"
              aria-label="Open BarrierBridge Accessibility Settings"
              title="BarrierBridge Accessibility (Text Size, Contrast, Plain Words, Accommodations)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span className="hidden lg:inline text-[11px]">Accessibility</span>
              {isCustomA11y && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {/* Unified Account / Context Menu (Desktop & Mobile) */}
            <div className="relative" ref={accountMenuRef}>
              <button
                onClick={() => {
                  setIsAccountMenuOpen(!isAccountMenuOpen);
                  setIsOrgMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="true"
                title="Account, Memberships & Role Context Menu"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-300 dark:ring-slate-600"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-none">
                    {user.name.split(',')[0]}
                  </div>
                  <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium leading-tight capitalize">
                    {role}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Rich Context Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-3 z-50 animate-in fade-in slide-in-from-top-2 max-h-[85vh] overflow-y-auto">
                  
                  {/* Active Account Identity Card */}
                  <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-teal-500/40"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium truncate">
                          {user.roleLabel}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {organization.name} · {user.department}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Multiple Memberships for One Person (Requirement 3) */}
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center space-x-1">
                        <Layers className="w-3 h-3 text-teal-500" />
                        <span>My Memberships & Profiles</span>
                      </span>
                      <span className="text-[9px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                        {userAccount.memberships.length} active
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {userAccount.memberships.map(mem => {
                        const isCurrentActive = activeMembership?.id === mem.id && organization.id === mem.organizationId;
                        const MemIcon = getIndustryIcon(mem.industry);
                        return (
                          <button
                            key={mem.id}
                            onClick={() => {
                              switchMembership(mem.id);
                              setIsAccountMenuOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-start justify-between ${
                              isCurrentActive
                                ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-100 ring-1 ring-teal-500'
                                : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-start space-x-2 min-w-0">
                              <div className={`p-1.5 rounded-lg mt-0.5 ${isCurrentActive ? 'bg-teal-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                                <MemIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold truncate text-slate-900 dark:text-white">
                                  {mem.organizationName}
                                </div>
                                <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium truncate">
                                  {mem.roleLabel}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {mem.badge} · {mem.department}
                                </div>
                              </div>
                            </div>
                            {isCurrentActive && (
                              <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1 stroke-[3]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Switch Demo Identity Persona */}
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 mb-2 flex items-center justify-between">
                      <span>Switch Demo Person</span>
                      <span className="text-[9px] text-slate-400">Multi-Profile Demos</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {demoAccounts.map(acc => {
                        const isSelected = userAccount.id === acc.id;
                        return (
                          <button
                            key={acc.id}
                            onClick={() => {
                              switchUserAccount(acc.id);
                              setIsAccountMenuOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition ${
                              isSelected
                                ? 'bg-slate-100 dark:bg-slate-700 font-bold text-slate-900 dark:text-white'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center space-x-2 truncate">
                              <img src={acc.avatar} alt={acc.name} className="w-6 h-6 rounded-md object-cover" />
                              <div className="truncate">
                                <div className="text-xs truncate">{acc.name}</div>
                                <div className="text-[10px] text-slate-400 truncate font-normal">{acc.headline}</div>
                              </div>
                            </div>
                            {isSelected && <span className="text-[10px] font-mono text-teal-500 font-bold">ACTIVE</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Switch Role within Current Facility */}
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                    <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400 mb-2">
                      Switch Role in {organization.name}
                    </div>

                    <div className="grid grid-cols-2 gap-1">
                      {rolesList.map(r => {
                        const Icon = r.icon;
                        const isCurrentRole = role === r.key;
                        return (
                          <button
                            key={r.key}
                            onClick={() => {
                              switchRole(r.key);
                              setIsAccountMenuOpen(false);
                            }}
                            className={`p-2 rounded-lg text-left text-xs transition flex items-center space-x-1.5 ${
                              isCurrentRole
                                ? 'bg-teal-50 dark:bg-teal-950/60 font-bold text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate text-[11px]">{r.label.split('/')[0]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Actions */}
                  <div className="px-4 pt-2.5 pb-1 space-y-1">
                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left p-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center space-x-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5 text-slate-500" />
                      <span>Return to Onboarding & Industry Setup</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        resetDemoData();
                      }}
                      className="w-full text-left p-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center space-x-2 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Demo Data to Initial Defaults</span>
                    </button>
                  </div>

                  {/* Demo Notice */}
                  <div className="mx-4 mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-800 dark:text-amber-200 leading-tight">
                    <strong>Simulated Demo Environment:</strong> Roles and multiple memberships enforce strict RBAC boundaries in client logic. No remote sensitive data stored.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
