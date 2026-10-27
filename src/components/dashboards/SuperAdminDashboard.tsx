import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, LineAreaChart } from '../common/Charts';
import {
  Building2,
  ShieldAlert,
  Lock,
  History,
  CheckCircle2,
  Scale,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import { AUDIT_LOGS, ORGANIZATIONS } from '../../data/mockData';

export const SuperAdminDashboard: React.FC = () => {
  const {
    organization,
    organizations,
    currentTab,
    setCurrentTab
  } = useApp();

  // Overview 2 Graphs
  const decentWorkIndexData = [
    { label: 'Healthcare', value: 92, secondaryValue: 88 },
    { label: 'Manufacturing', value: 89, secondaryValue: 84 },
    { label: 'Education', value: 95, secondaryValue: 91 },
    { label: 'Corporate', value: 94, secondaryValue: 90 },
    { label: 'Retail', value: 88, secondaryValue: 82 }
  ];

  const fiscalLaborTrendData = [
    { label: 'May', value: 16.2, secondaryValue: 54 },
    { label: 'Jun', value: 17.4, secondaryValue: 53 },
    { label: 'Jul', value: 15.2, secondaryValue: 56 },
    { label: 'Aug', value: 14.3, secondaryValue: 57 },
    { label: 'Sep', value: 13.5, secondaryValue: 58 },
    { label: 'Oct', value: 12.9, secondaryValue: 59 }
  ];

  // Sub-view: Role & Permission Matrix
  if (currentTab === 'matrix') {
    const roles = ['Worker / Staff', 'HR Manager', 'Finance Manager', 'Sales Director', 'Safety / EHS', 'Super Admin'];
    const permissions = [
      { name: 'Punch Clock & Personal Shift Log', access: [true, true, false, false, true, true] },
      { name: 'View Personal Payslip & Living Wage Ratio', access: [true, false, false, false, false, true] },
      { name: 'Submit Anonymous Safety & Whistleblower Report', access: [true, true, true, true, true, true] },
      { name: 'Inspect Anonymous Case Real Identity', access: [false, false, false, false, false, false], note: 'NEVER PERMITTED (Zero Retaliation Guarantee)' },
      { name: 'Approve Leave & Fatigue Recovery Hours', access: [false, true, false, false, false, true] },
      { name: 'View Corporate Revenue, Expenses & P&L', access: [false, false, true, false, false, true] },
      { name: 'Inspect Commercial Accounts & Quotas', access: [false, false, false, true, false, true] },
      { name: 'Lockout Dangerous Machinery & Close Hazard', access: [false, false, false, false, true, true] },
      { name: 'Configure Org Themes & Multi-Tenant Policies', access: [false, false, false, false, false, true] }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Role & Permission Access Control Matrix (RBAC)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cryptographic least-privilege enforcement aligned with UN SDG 8 worker privacy rights
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-3">System Capability / Resource</th>
                {roles.map((r, i) => (
                  <th key={i} className="py-3 px-2 text-center">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900 dark:text-white">{p.name}</div>
                    {p.note && <div className="text-[10px] text-rose-500 font-mono font-bold mt-0.5">{p.note}</div>}
                  </td>
                  {p.access.map((allowed, j) => (
                    <td key={j} className="py-3 px-2 text-center">
                      {allowed ? (
                        <span className="inline-block w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold leading-4">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-block w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold leading-4">
                          –
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Sub-view: Activity Audit History
  if (currentTab === 'audit') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Governance & Activity Audit Trail
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Immutable log of supervisor approvals, hazard resolutions, and AI signal interventions
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {AUDIT_LOGS.map(log => (
              <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-white">{log.actor}</span>
                    <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{log.action}</p>
                </div>
                <span className="font-mono text-[11px] text-slate-400 flex-shrink-0">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Cross-Department & Industry Comparison
  if (currentTab === 'departments') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Cross-Department & Industry Health Audits
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-facility compliance benchmarks aligned with UN SDG 8 Decent Work standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizations.map(org => (
            <div
              key={org.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold">
                    {org.industry}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {org.workerCount.toLocaleString()} Staff
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {org.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {org.tagline}
                </p>
                <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Living Wage Compliance:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{org.livingWageCompliance}%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg Fatigue Index:</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-mono">{org.avgFatigueScore} / 100</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Key Focus Areas:</span>
                <div className="flex flex-wrap gap-1">
                  {org.keyConcerns.map((c, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sub-view: Detailed Organizational Analytics
  if (currentTab === 'analytics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Enterprise Decent Work & Governance Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-year trend modeling for wage parity, shift fatigue mitigation, and zero-harm records
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <BarChart
              data={decentWorkIndexData}
              title="UN SDG 8 Decent Work Compliance Index by Industry"
              primaryLabel="Current Score"
              secondaryLabel="Baseline Target"
              valueSuffix=" / 100"
              height={230}
            />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <LineAreaChart
              data={fiscalLaborTrendData}
              title="Operating Margin (%) vs Labor Spend Ratio (%)"
              primaryLabel="Operating Margin (%)"
              secondaryLabel="Labor Spend Ratio (%)"
              valueSuffix="%"
              height={230}
            />
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: Overview (Max 2 graphs!)
  return (
    <div className="space-y-6">
      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Enterprise Workforce</span>
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            8,110
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Across 5 registered industries
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">SDG 8 Decent Work Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            92.4 / 100
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Top tier global compliance
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Living Wage Coverage</span>
            <Scale className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            99.6%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Universal standard certified
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Zero-Harm Safety Index</span>
            <ShieldAlert className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">
            94.8%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Zero fatal incidents
          </div>
        </div>
      </div>

      {/* Exactly TWO Overview Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={decentWorkIndexData}
            title="UN SDG 8 Decent Work Compliance Index by Industry"
            primaryLabel="2026 Score"
            secondaryLabel="2025 Baseline"
            valueSuffix=" / 100"
            height={210}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={fiscalLaborTrendData}
            title="Operating Margin (%) vs Labor Spend Ratio (%)"
            primaryLabel="Operating Margin (%)"
            secondaryLabel="Labor Spend Ratio (%)"
            valueSuffix="%"
            height={210}
          />
        </div>
      </div>

      {/* Cross-Industry Health Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Industry Demonstrations & Health Radar
          </h3>
          <button
            onClick={() => setCurrentTab('matrix')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center space-x-1"
          >
            <span>Audit Role Permissions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {ORGANIZATIONS.slice(0, 3).map(org => (
            <div
              key={org.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5"
            >
              <div className="font-bold text-slate-900 dark:text-white">{org.name}</div>
              <div className="text-[11px] text-slate-500 capitalize">{org.industry} · {org.workerCount} workers</div>
              <div className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                Living Wage: {org.livingWageCompliance}% · Fatigue Risk: {org.avgFatigueScore}/100
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
