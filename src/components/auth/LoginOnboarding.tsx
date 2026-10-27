import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Role, Industry, Organization } from '../../types';
import { ThreeHeroScene } from '../common/ThreeHeroScene';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  Clock,
  Award,
  Scale,
  Briefcase,
  AlertTriangle,
  Plus,
  Check,
  Info,
  CheckCircle2,
  GraduationCap,
  Building,
  Activity,
  HardHat,
  ShoppingBag,
  Users,
  Layers
} from 'lucide-react';
import { getIndustryUser } from '../../utils/industryData';

type OnboardingStep = 'landing' | 'industry' | 'organization' | 'role' | 'confirm';

export const LoginOnboarding: React.FC = () => {
  const {
    loginAsRole,
    organizations,
    createOrganization,
    accessibility,
    switchUserAccount,
    switchMembership
  } = useApp();

  const [step, setStep] = useState<OnboardingStep>('landing');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('healthcare');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('org-health');
  const [selectedRole, setSelectedRole] = useState<Role>('worker');

  // Custom organisation creation form
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);
  const [customOrgName, setCustomOrgName] = useState('');
  const [customLocation, setCustomLocation] = useState('Metropolitan District');
  const [customStaffCount, setCustomStaffCount] = useState(1250);
  const [customKeyConcern, setCustomKeyConcern] = useState('Shift Fatigue & Rest Interval Protection');

  // Current selected org
  const selectedOrg = organizations.find(o => o.id === selectedOrgId) || organizations[0];
  const demoUser = getIndustryUser(selectedRole, selectedOrg);

  const industries: {
    key: Industry;
    title: string;
    description: string;
    icon: React.ElementType;
    colors: string;
    accent: string;
    previewHexes: string[];
    focus: string;
  }[] = [
    {
      key: 'healthcare',
      title: 'Healthcare: Hospitals & Clinics',
      description: 'Critical care, emergency trauma, and inpatient clinics requiring circadian rest recovery.',
      icon: Activity,
      colors: 'from-teal-600 to-emerald-500',
      accent: 'border-teal-500 text-teal-400',
      previewHexes: ['#0d9488', '#10b981', '#2dd4bf'],
      focus: 'ICU Shift Lengths & 14h Minimum Rest Deficits'
    },
    {
      key: 'manufacturing',
      title: 'Manufacturing & Construction',
      description: 'Heavy structural stamping, fabrication, and automated assembly with machinery lockout controls.',
      icon: HardHat,
      colors: 'from-slate-700 to-amber-600',
      accent: 'border-amber-500 text-amber-400',
      previewHexes: ['#334155', '#d97706', '#f59e0b'],
      focus: 'Press Lockout Procedures & Ergonomic Vibration'
    },
    {
      key: 'education',
      title: 'Education: Schools & Colleges',
      description: 'K-12 campuses, colleges, and university faculties balancing teaching loads and prep equity.',
      icon: GraduationCap,
      colors: 'from-indigo-600 to-blue-500',
      accent: 'border-indigo-500 text-indigo-400',
      previewHexes: ['#4338ca', '#2563eb', '#f59e0b'],
      focus: 'Grading Burnout & Faculty Prep Time Equity'
    },
    {
      key: 'corporate',
      title: 'Corporate: Business & Office Teams',
      description: 'Distributed technology, global operations, and advisory firms addressing digital screen strain.',
      icon: Building,
      colors: 'from-blue-700 to-cyan-500',
      accent: 'border-cyan-500 text-cyan-400',
      previewHexes: ['#1e3a8a', '#0891b2', '#38bdf8'],
      focus: 'Cross-Timezone Call Sprawl & Ergonomic Grants'
    },
    {
      key: 'retail',
      title: 'Retail & Sales',
      description: 'Storefront sales floors, receiving docks, and multi-hub omni-channel distribution centers.',
      icon: ShoppingBag,
      colors: 'from-purple-600 to-emerald-500',
      accent: 'border-purple-500 text-purple-400',
      previewHexes: ['#7c3aed', '#2563eb', '#10b981'],
      focus: 'Predictable Scheduling & Standing Strain'
    }
  ];

  const rolesList: {
    key: Role;
    title: string;
    boundary: string;
    desc: string;
    icon: React.ElementType;
  }[] = [
    {
      key: 'worker',
      title: 'Employee / Worker',
      boundary: 'Private data strictly restricted to own shifts, personal payslip, and anonymous reports.',
      desc: 'Punch clock, protected rest recovery, verifiable skills passport, and anonymous issue desk.',
      icon: Clock
    },
    {
      key: 'manager',
      title: 'Department Manager',
      boundary: 'Full control over department shift rosters & relief swaps. Peer medical data restricted.',
      desc: 'Operational shift coverage, safe staffing thresholds, shift swap approvals, and hazard triage.',
      icon: Users
    },
    {
      key: 'hr',
      title: 'HR / Workforce Lead',
      boundary: 'Workforce-wide headcount, fatigue metrics, and leave approvals. Zero access to anonymous identities.',
      desc: 'Circadian recovery deficits, shift coverage roster, leave queue, and retention monitoring.',
      icon: UserCheck
    },
    {
      key: 'finance',
      title: 'Finance Manager',
      boundary: 'Aggregated operating costs and labor spend. Strictly barred from worker individual records.',
      desc: 'Revenue, expenses, net margins, budget variances, and MIT Living Wage parity audit.',
      icon: Scale
    },
    {
      key: 'sales',
      title: 'Sales Director',
      boundary: 'Commercial client revenue and deals. Strictly isolated from employee internal records.',
      desc: 'Deal cycle velocity, sales target progress, and enterprise partner contract health.',
      icon: Briefcase
    },
    {
      key: 'safety',
      title: 'Safety / Operations Manager (EHS)',
      boundary: 'Hazard registry and corrective plans. Cryptographic identity protection for whistleblowers.',
      desc: 'OSHA / SDG 8.8 zero-harm tracking, equipment lockout, and resolution cycle times.',
      icon: ShieldCheck
    },
    {
      key: 'superadmin',
      title: 'Organisation Owner / Super Admin',
      boundary: 'Cross-industry governance, RBAC permissions, and immutable activity audit trail.',
      desc: 'Comprehensive multi-department radar, policy compliance, and executive stewardship.',
      icon: Award
    }
  ];

  const handleSelectIndustry = (ind: Industry) => {
    setSelectedIndustry(ind);
    // Find first org matching industry
    const match = organizations.find(o => o.industry === ind);
    if (match) {
      setSelectedOrgId(match.id);
    }
    setStep('organization');
  };

  const handleCreateCustomOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOrgName.trim()) return;

    const newOrg = createOrganization({
      name: customOrgName.trim(),
      industry: selectedIndustry,
      tagline: `Dedicated to Sustainable Workforce Practices in ${selectedIndustry.toUpperCase()}`,
      theme: selectedIndustry,
      location: customLocation.trim(),
      workerCount: customStaffCount,
      avgFatigueScore: 32,
      livingWageCompliance: 100,
      description: `Custom registered ${selectedIndustry} organisation operating under FairShift SDG 8 standards.`,
      keyConcerns: [customKeyConcern.trim()]
    });

    setSelectedOrgId(newOrg.id);
    setIsCreatingOrg(false);
    setStep('role');
  };

  const handleLaunch = () => {
    loginAsRole(selectedRole, selectedOrgId);
  };

  const handleQuickDemo = () => {
    loginAsRole('worker', 'org-health');
  };

  const handleMultiProfileDemo = () => {
    switchUserAccount('acc-elena');
    switchMembership('mem-elena-edu');
    loginAsRole('worker', 'org-edu');
  };

  // STEP 0: LANDING SCREEN
  if (step === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-slate-950">
        {/* Navigation Bar */}
        <header className="px-6 py-4 border-b border-slate-800/80 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-extrabold text-base shadow-lg shadow-teal-500/20">
              FS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white">FairShift</span>
                <span className="text-[10px] font-mono uppercase bg-teal-950 text-teal-300 border border-teal-800 px-1.5 py-0.5 rounded">
                  UN SDG 8
                </span>
              </div>
              <div className="text-[11px] text-slate-400">Decent Work Intelligence Platform</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleMultiProfileDemo}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-950/80 hover:bg-teal-900 text-teal-300 border border-teal-700/60 transition flex items-center space-x-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Profile Demo</span>
            </button>
            <button
              onClick={handleQuickDemo}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              Healthcare Demo
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto w-full px-6 py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>United Nations Sustainable Development Goal 8</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Decent Work & Shift Intelligence for Sustainable Enterprises
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              FairShift bridges physiological rest protection, pay transparency, anonymous hazard reporting, and explainable human-in-the-loop AI across healthcare, heavy industry, education, corporate, and retail teams.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <button
                onClick={() => setStep('industry')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 hover:from-teal-400 hover:to-emerald-300 shadow-xl shadow-teal-500/25 flex items-center justify-center space-x-2 transition transform active:scale-95"
              >
                <span>Get Started — Set Up Organisation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleMultiProfileDemo}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-teal-300 border border-teal-500/30 transition flex items-center justify-center space-x-2"
                title="Experience a single person with student and part-time employee profiles across education, retail, and healthcare"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Multi-Profile Demo (Student & Worker)</span>
              </button>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-teal-400 uppercase font-bold block">Target 8.8</span>
                <div className="font-semibold text-white">Circadian Rest</div>
                <p className="text-[11px] text-slate-400">Protected recovery intervals between rotations.</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block">Target 8.5</span>
                <div className="font-semibold text-white">Living Wage</div>
                <p className="text-[11px] text-slate-400">100% inflation-adjusted wage parity verified.</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-amber-400 uppercase font-bold block">Zero Harm</span>
                <div className="font-semibold text-white">Whistleblower Trust</div>
                <p className="text-[11px] text-slate-400">Cryptographically isolated anonymous reports.</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-[10px] text-cyan-400 uppercase font-bold block">Universal</span>
                <div className="font-semibold text-white">BarrierBridge</div>
                <p className="text-[11px] text-slate-400">No medical diagnosis required for accommodations.</p>
              </div>
            </div>
          </div>

          {/* Right 3D Visual Object */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-80 sm:h-96 rounded-3xl bg-slate-900/60 border border-slate-800 relative overflow-hidden backdrop-blur-sm shadow-2xl flex items-center justify-center">
              <ThreeHeroScene
                theme="healthcare"
                isDark={true}
                reducedMotion={accessibility.reducedMotion}
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="font-mono text-teal-400 font-semibold">FairShift Equilibrium</span>
                <span>Reactive 3D Balanced Workforce</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="px-6 py-4 border-t border-slate-900 text-center text-xs text-slate-500">
          FairShift Platform · Grounded in UN Sustainable Development Goal 8 · Simulated demonstration environment
        </footer>
      </div>
    );
  }

  // STEP 1: INDUSTRY SELECTION
  if (step === 'industry') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('landing')}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-xs font-mono text-teal-400">Step 1 of 4: Choose Industry</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Select Your Workplace Industry
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              FairShift adapts shift rules, fatigue risk thresholds, safety hazard taxonomies, and visual theme colors to your operating domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map(ind => {
              const Icon = ind.icon;
              const isSelected = selectedIndustry === ind.key;
              return (
                <button
                  key={ind.key}
                  onClick={() => handleSelectIndustry(ind.key)}
                  className={`p-5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? `bg-slate-900/90 ${ind.accent} ring-2 ring-teal-400 shadow-xl`
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${ind.colors} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {ind.previewHexes.map((hex, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-black/40"
                            style={{ backgroundColor: hex }}
                            title={`Palette tone ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">{ind.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ind.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-teal-300">
                    <span className="font-semibold text-slate-400">Focus: </span>
                    {ind.focus}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep('organization')}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center space-x-2 transition"
            >
              <span>Continue with {selectedIndustry.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: SELECT OR CREATE DEMO ORGANISATION
  if (step === 'organization') {
    const matchingOrgs = organizations.filter(o => o.industry === selectedIndustry);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('industry')}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Industry Selection</span>
            </button>
            <span className="text-xs font-mono text-teal-400">Step 2 of 4: Organisation Setup</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Choose or Register a Demo Organisation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a pre-configured {selectedIndustry} workplace scenario or register your own custom facility.
            </p>
          </div>

          {/* Existing Matching Organisations */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Preset {selectedIndustry.toUpperCase()} Environments
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchingOrgs.map(org => {
                const isSelected = selectedOrgId === org.id;
                return (
                  <button
                    key={org.id}
                    onClick={() => {
                      setSelectedOrgId(org.id);
                      setIsCreatingOrg(false);
                    }}
                    className={`p-4 rounded-xl border text-left transition ${
                      isSelected && !isCreatingOrg
                        ? 'bg-teal-950/70 border-teal-400 ring-2 ring-teal-400 shadow-md'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{org.name}</span>
                      <span className="text-[10px] font-mono text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                        {org.workerCount.toLocaleString()} Staff
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{org.tagline}</p>
                    <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{org.location}</span>
                      <span className="text-emerald-400 font-semibold">{org.livingWageCompliance}% Living Wage</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle Create Custom Org */}
          <div className="pt-2">
            {!isCreatingOrg ? (
              <button
                onClick={() => setIsCreatingOrg(true)}
                className="w-full py-3 rounded-xl border border-dashed border-slate-700 hover:border-teal-400 text-slate-400 hover:text-teal-300 text-xs font-semibold flex items-center justify-center space-x-2 transition bg-slate-900/40"
              >
                <Plus className="w-4 h-4" />
                <span>+ Register Custom Demo Organisation</span>
              </button>
            ) : (
              <form onSubmit={handleCreateCustomOrg} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-teal-400" />
                    <span>Register Custom {selectedIndustry.toUpperCase()} Facility</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCreatingOrg(false)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Organisation Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customOrgName}
                      onChange={(e) => setCustomOrgName(e.target.value)}
                      placeholder="e.g. Metro General Hospital, Vanguard Pressworks"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Location / Campus
                    </label>
                    <input
                      type="text"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Active Workforce Count
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={50000}
                      value={customStaffCount}
                      onChange={(e) => setCustomStaffCount(parseInt(e.target.value) || 100)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Primary Workforce Focus
                    </label>
                    <input
                      type="text"
                      value={customKeyConcern}
                      onChange={(e) => setCustomKeyConcern(e.target.value)}
                      placeholder="e.g. Night shift rotation fatigue, ergonomic hoists"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 transition"
                  >
                    Save & Select Custom Organisation
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className="text-xs text-slate-400">
              Selected: <strong className="text-white">{selectedOrg.name}</strong>
            </span>
            <button
              onClick={() => setStep('role')}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center space-x-2 transition"
            >
              <span>Continue to Role Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: ROLE PERSONA SELECTION
  if (step === 'role') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep('organization')}
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Organisation</span>
            </button>
            <span className="text-xs font-mono text-teal-400">Step 3 of 4: Role Persona</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Choose a Demo Role Persona
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Test role-based access boundaries, specialized dashboard tools, and permissions.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-start space-x-2.5 text-xs text-teal-200">
            <Layers className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Multi-Profile Context Support:</strong> A single person (e.g. Elena Rostova) can hold multiple memberships across education (student TA), retail (evening associate), and healthcare (clinical aide). You can switch between active memberships anytime using the top-right account menu without cross-facility data leakage.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {rolesList.map(r => {
              const isSelected = selectedRole === r.key;
              const Icon = r.icon;
              return (
                <button
                  key={r.key}
                  onClick={() => setSelectedRole(r.key)}
                  className={`p-4 rounded-xl border text-left transition flex items-start space-x-3.5 ${
                    isSelected
                      ? 'bg-teal-950/70 border-teal-400 ring-2 ring-teal-400 shadow-lg'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-teal-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{r.title}</span>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold bg-teal-400 text-slate-950 px-1.5 py-0.2 rounded">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                    <div className="text-[11px] text-teal-300/90 pt-1">
                      <strong className="text-slate-400">Access Boundary: </strong>
                      {r.boundary}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4">
            <span className="text-xs text-slate-400">
              Entering as: <strong className="text-white">{demoUser.name}</strong> ({demoUser.roleLabel})
            </span>
            <button
              onClick={() => setStep('confirm')}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center space-x-2 transition"
            >
              <span>Review & Enter Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 4: REVIEW & CONFIRM WITH DEMO MODE NOTICE
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('role')}
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Role Selection</span>
          </button>
          <span className="text-xs font-mono text-teal-400">Step 4 of 4: Confirmation</span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Launch Workspace
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review your configured workplace context and role persona.
          </p>
        </div>

        {/* Configuration Summary Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-4 pb-4 border-b border-slate-800">
            <img
              src={demoUser.avatar}
              alt={demoUser.name}
              className="w-14 h-14 rounded-xl object-cover ring-2 ring-teal-400"
            />
            <div>
              <div className="text-base font-bold text-white">{demoUser.name}</div>
              <div className="text-xs text-teal-400">{demoUser.roleLabel}</div>
              <div className="text-xs text-slate-400">{selectedOrg.name} · {selectedOrg.location}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">Industry Sector:</span>
              <strong className="text-white capitalize">{selectedOrg.industry}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Workplace Headcount:</span>
              <strong className="text-white">{selectedOrg.workerCount.toLocaleString()} Staff</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Assigned Department:</span>
              <strong className="text-white">{demoUser.department}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Living Wage Parity:</span>
              <strong className="text-emerald-400">{selectedOrg.livingWageCompliance}% Compliant</strong>
            </div>
          </div>
        </div>

        {/* Prominent Demo Mode Notice (Requirement 6) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-300 font-bold block">
              Simulated Demonstration Notice:
            </strong>
            <p className="leading-relaxed text-[11px] text-amber-200/90">
              FairShift is operating in an interactive demo mode. Switching roles simulates internal RBAC permissions and data boundary isolation. No real passwords or sensitive health records are stored on remote servers. All test logs and shift clocks are stored in local browser state.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setStep('landing')}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            Restart Flow
          </button>

          <button
            onClick={handleLaunch}
            className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 hover:from-teal-400 hover:to-emerald-300 shadow-xl shadow-teal-500/25 flex items-center space-x-2 transition transform active:scale-95"
          >
            <span>Launch FairShift Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
