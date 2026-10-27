import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, LineAreaChart } from '../common/Charts';
import {
  DollarSign,
  TrendingUp,
  Percent,
  ShieldCheck,
  Scale,
  Building,
  Info,
  ArrowRight
} from 'lucide-react';
import { FINANCIAL_METRICS, DEPARTMENT_SPENDS } from '../../data/mockData';

export const FinanceDashboard: React.FC = () => {
  const { currentTab, setCurrentTab, organization } = useApp();

  // Overview 2 Graphs
  const revenueTrendData = FINANCIAL_METRICS.map(m => ({
    label: m.period.split(' ')[0],
    value: Number((m.revenue / 1000000).toFixed(2)),
    secondaryValue: Number((m.operatingCosts / 1000000).toFixed(2))
  }));

  const deptBudgetBarData = DEPARTMENT_SPENDS.map(d => ({
    label: d.department.split(' ')[0],
    value: Number((d.actualSpend / 100000).toFixed(1)),
    secondaryValue: Number((d.allocatedBudget / 100000).toFixed(1))
  }));

  // Sub-view: Detailed Margin & Cost Analytics
  if (currentTab === 'analytics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Detailed Financial & Margin Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-quarter cost curves, overtime inflation impact, and margin sensitivity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <LineAreaChart
              data={FINANCIAL_METRICS.map(m => ({
                label: m.period.split(' ')[0],
                value: m.netMargin,
                secondaryValue: 15.0
              }))}
              title="Operating Margin Trajectory vs Target (%)"
              primaryLabel="Net Margin %"
              secondaryLabel="Target Baseline (15.0%)"
              valueSuffix="%"
              height={230}
            />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <BarChart
              data={DEPARTMENT_SPENDS.map(d => ({
                label: d.department.split(' ')[0],
                value: d.overtimeCost / 1000,
                color: 'fill-rose-500'
              }))}
              title="Unbudgeted Overtime Spend by Department ($K)"
              primaryLabel="Overtime Cost ($K)"
              valuePrefix="$"
              valueSuffix="K"
              height={230}
            />
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Budget & Living Wage Parity
  if (currentTab === 'budget') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Labor Economics & Living Wage Benchmark Parity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            SDG 8.5 Verification: Ensuring 100% of workforce earns dignified, inflation-adjusted living wages
          </p>
        </div>

        {/* Living wage guarantee card */}
        <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-start space-x-3 text-xs">
          <Scale className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-teal-900 dark:text-teal-100">
              UN SDG 8.5 Living Wage Parity Audit:
            </span>{' '}
            <span className="text-teal-800 dark:text-teal-200">
              100% of contracted employees across all facilities are paid at or above the local MIT Living Wage Index baseline ($23.80/hr). Average base rate is 1.84x regional living cost, supporting economic growth and household stability.
            </span>
          </div>
        </div>

        {/* Department Budget Breakdown Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Department Labor Allocation vs Actual Spend
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Allocated Budget</th>
                  <th className="py-2.5 px-3">Actual Spend</th>
                  <th className="py-2.5 px-3">Overtime Cost</th>
                  <th className="py-2.5 px-3">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {DEPARTMENT_SPENDS.map((dept, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{dept.department}</td>
                    <td className="py-3 px-3 font-mono">${(dept.allocatedBudget / 1000).toLocaleString()}k</td>
                    <td className="py-3 px-3 font-mono font-semibold">${(dept.actualSpend / 1000).toLocaleString()}k</td>
                    <td className="py-3 px-3 font-mono text-amber-600 dark:text-amber-400">${(dept.overtimeCost / 1000).toLocaleString()}k</td>
                    <td className="py-3 px-3 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dept.variancePercentage > 5
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : dept.variancePercentage > 0
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {dept.variancePercentage > 0 ? `+${dept.variancePercentage}%` : `${dept.variancePercentage}%`}
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

  // DEFAULT: Overview (Max 2 graphs!)
  return (
    <div className="space-y-6">
      {/* Demo Banner */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Simulated Enterprise Financial Data:</strong> Aggregated fiscal indicators for demo review. Individual worker payroll and medical data are strictly restricted and anonymized.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold bg-amber-200 dark:bg-amber-900/60 px-2 py-0.5 rounded text-amber-900 dark:text-amber-200">
          DEMO DATA
        </span>
      </div>

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Monthly Operating Revenue</span>
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            $16.20M
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            +6.4% YoY Growth
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Labor & Fatigue Spend</span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            $9.55M
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            58.9% of total operating cost
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Net Operating Margin</span>
            <Percent className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            12.9%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Target benchmark: &gt;12.0%
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Living Wage Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            100%
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Certified Decent Work Parity
          </div>
        </div>
      </div>

      {/* Exactly TWO Overview Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={revenueTrendData}
            title="Monthly Revenue vs Operating Expenses ($M)"
            primaryLabel="Revenue ($M)"
            secondaryLabel="Operating Costs ($M)"
            valuePrefix="$"
            valueSuffix="M"
            height={210}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={deptBudgetBarData}
            title="Department Labor Spend vs Allocated Budget ($100K)"
            primaryLabel="Actual Spend"
            secondaryLabel="Allocated Budget"
            valuePrefix="$"
            valueSuffix="00k"
            height={210}
          />
        </div>
      </div>

      {/* Access Boundary Assurance Card */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>
            <strong>Data Boundary Protection Active:</strong> Finance accounts do not have access to individual employee confidential records, medical accommodations, or anonymous whistleblower cases.
          </span>
        </div>
        <button
          onClick={() => setCurrentTab('analytics')}
          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center space-x-1 flex-shrink-0 ml-3"
        >
          <span>Detailed Margin Analytics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
