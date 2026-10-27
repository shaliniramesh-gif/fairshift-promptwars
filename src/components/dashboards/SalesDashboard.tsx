import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, LineAreaChart } from '../common/Charts';
import {
  TrendingUp,
  Target,
  Briefcase,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';
import { SALES_METRICS, TEAM_SALES_PERFORMANCE } from '../../data/mockData';

export const SalesDashboard: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();

  const salesTrendData = SALES_METRICS.map(s => ({
    label: s.period.split(' ')[0],
    value: Number((s.actualRevenue / 1000000).toFixed(2)),
    secondaryValue: Number((s.targetRevenue / 1000000).toFixed(2))
  }));

  const teamQuotaData = TEAM_SALES_PERFORMANCE.map(t => ({
    label: t.repName.split(' ')[0],
    value: Number((t.closed / 100000).toFixed(1)),
    secondaryValue: Number((t.target / 100000).toFixed(1))
  }));

  // Sub-view: Detailed Pipeline & Contracts
  if (currentTab === 'pipeline') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Enterprise Client Pipeline & Contracts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Commercial agreements, partner retention velocity, and sustainable service levels
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Active Accounts & Regional Coverage
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-3">Lead Account Rep</th>
                  <th className="py-2.5 px-3">Territory</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Closed Revenue</th>
                  <th className="py-2.5 px-3">Active Pipeline</th>
                  <th className="py-2.5 px-3">SDG 8 Fair Labor Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {TEAM_SALES_PERFORMANCE.map((team, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{team.repName}</td>
                    <td className="py-3 px-3 text-slate-500">{team.territory}</td>
                    <td className="py-3 px-3 font-mono">${(team.target / 1000).toLocaleString()}k</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      ${(team.closed / 1000).toLocaleString()}k
                    </td>
                    <td className="py-3 px-3 font-mono">${(team.pipeline / 1000).toLocaleString()}k</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                        VERIFIED ETHICAL
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Detailed Sales Analytics
  if (currentTab === 'analytics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Commercial Pipeline & Quota Velocity Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-month revenue attainment, deal cycle progress, and client retention trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <LineAreaChart
              data={salesTrendData}
              title="Monthly Sales Actuals vs Target Quotas ($M)"
              primaryLabel="Actual Closed ($M)"
              secondaryLabel="Target Quota ($M)"
              valuePrefix="$"
              valueSuffix="M"
              height={230}
            />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <BarChart
              data={teamQuotaData}
              title="Account Executive Quota Attainment ($100K)"
              primaryLabel="Closed Revenue"
              secondaryLabel="Assigned Target"
              valuePrefix="$"
              valueSuffix="00k"
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
            <span className="text-xs font-medium">Monthly Closed Sales</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            $4.92M
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            102.5% of monthly quota target
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Deal Cycle Velocity</span>
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            36 Days
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            -8 days from previous quarter
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Enterprise Contracts</span>
            <Briefcase className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            91 Accounts
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            99.1% client retention rate
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Ethical Quota Health</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            Zero Burnout
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Capped realistic sales expectations
          </div>
        </div>
      </div>

      {/* Exactly TWO Overview Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={salesTrendData}
            title="Monthly Sales Actuals vs Target Quotas ($M)"
            primaryLabel="Actual Closed ($M)"
            secondaryLabel="Target Quota ($M)"
            valuePrefix="$"
            valueSuffix="M"
            height={210}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={teamQuotaData}
            title="Account Executive Quota Attainment ($100K)"
            primaryLabel="Closed Revenue"
            secondaryLabel="Assigned Target"
            valuePrefix="$"
            valueSuffix="00k"
            height={210}
          />
        </div>
      </div>

      {/* Access Boundary Assurance Notice */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>
            <strong>Strict Privacy Boundary Enforced:</strong> Sales accounts only access commercial pipeline metrics. Zero access to employee internal attendance, personal pay history, or medical accommodation data.
          </span>
        </div>
        <button
          onClick={() => setCurrentTab('pipeline')}
          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center space-x-1 flex-shrink-0 ml-3"
        >
          <span>View Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
