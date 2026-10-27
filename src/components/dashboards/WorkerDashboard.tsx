import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, LineAreaChart } from '../common/Charts';
import {
  Clock,
  Play,
  Square,
  AlertTriangle,
  HeartHandshake,
  Award,
  DollarSign,
  Calendar,
  CheckCircle2,
  Shield,
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';
import { INITIAL_PAYSLIPS } from '../../data/mockData';

interface WorkerDashboardProps {
  onOpenReportModal: () => void;
  onOpenAccommodationModal: () => void;
  onOpenLeaveModal: () => void;
  onOpenOvertimeModal: () => void;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({
  onOpenReportModal,
  onOpenAccommodationModal,
  onOpenLeaveModal,
  onOpenOvertimeModal
}) => {
  const {
    user,
    organization,
    currentTab,
    setCurrentTab,
    shifts,
    leaveRequests,
    overtimeRequests,
    incidents,
    skills,
    accommodations,
    isClockedIn,
    toggleClock,
    shiftElapsedSeconds,
    addSkill
  } = useApp();

  const [searchTrackingCode, setSearchTrackingCode] = useState('');
  const [trackedIncident, setTrackedIncident] = useState<any | null>(null);
  const [newSkillTitle, setNewSkillTitle] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'clinical' | 'machinery' | 'safety-protocol' | 'leadership' | 'digital' | 'operations'>('safety-protocol');

  // Overview 2 Graphs Data
  const weeklyShiftData = [
    { label: 'Mon', value: 12.0, secondaryValue: 28 },
    { label: 'Tue', value: 12.5, secondaryValue: 42 },
    { label: 'Wed', value: 0, secondaryValue: 15 },
    { label: 'Thu', value: 12.5, secondaryValue: 65 },
    { label: 'Fri', value: 8.0, secondaryValue: 35 },
    { label: 'Sat', value: 0, secondaryValue: 18 },
    { label: 'Sun', value: 0, secondaryValue: 12 }
  ];

  const payTrendData = [
    { label: 'Jul', value: 4300, secondaryValue: 2400 },
    { label: 'Aug', value: 4420, secondaryValue: 2400 },
    { label: 'Sep', value: 4518, secondaryValue: 2400 },
    { label: 'Oct', value: 4837, secondaryValue: 2400 }
  ];

  // Filter shifts for this worker
  const myShifts = shifts.filter(s => s.workerId === user.id || s.workerName.includes(user.name.split(' ')[0]));
  const upcomingShifts = myShifts.filter(s => s.status === 'scheduled');
  const completedShifts = myShifts.filter(s => s.status === 'completed');

  const myAccommodations = accommodations.filter(a => a.workerId === user.id);
  const myLeaves = leaveRequests.filter(l => l.workerId === user.id);
  const myOvertimes = overtimeRequests.filter(o => o.workerId === user.id);
  const mySkills = skills.filter(s => s.workerId === user.id);

  const handleTrackCodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTrackingCode.trim()) return;
    const found = incidents.find(
      i => i.trackingCode.toLowerCase() === searchTrackingCode.trim().toLowerCase()
    );
    setTrackedIncident(found || 'not-found');
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillTitle.trim()) return;
    addSkill(newSkillTitle.trim(), newSkillCategory, 'Practitioner');
    setNewSkillTitle('');
  };

  // Sub-view: Schedule & Shifts
  if (currentTab === 'shifts') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              My Shifts & Rest Recovery Roster
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contracted hours, protected rest intervals, and overtime tracking
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenLeaveModal}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 border border-teal-200 dark:border-teal-800 transition"
            >
              Request Leave / Rest
            </button>
            <button
              onClick={onOpenOvertimeModal}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition"
            >
              Apply for Overtime
            </button>
          </div>
        </div>

        {/* Upcoming Shift list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingShifts.map(shift => (
            <div
              key={shift.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-teal-600 dark:text-teal-400 font-bold">
                    {shift.date}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                      shift.fatigueRisk === 'critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        : shift.fatigueRisk === 'elevated'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}
                  >
                    Fatigue Risk: {shift.fatigueRisk}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {shift.startTime} – {shift.endTime} ({shift.durationHours} hrs)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {shift.department} · Base Rate: ${shift.baseRate}/hr
                </p>
                {shift.hazardNotes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg mt-3 border border-slate-100 dark:border-slate-700/60">
                    <span className="font-semibold">Shift Notes:</span> {shift.hazardNotes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Protected Rest Interval: <strong className="text-slate-700 dark:text-slate-200">{shift.recoveryTimeHours}h</strong>
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-medium">FairShift Protected</span>
              </div>
            </div>
          ))}
        </div>

        {/* History Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Recent Completed Shifts
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Hours</th>
                  <th className="py-2 px-3">Department</th>
                  <th className="py-2 px-3">Fatigue Score</th>
                  <th className="py-2 px-3">Recovery Logged</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {completedShifts.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-mono">{s.date}</td>
                    <td className="py-2.5 px-3 font-semibold">{s.durationHours} hrs</td>
                    <td className="py-2.5 px-3">{s.department}</td>
                    <td className="py-2.5 px-3 capitalize">{s.fatigueRisk}</td>
                    <td className="py-2.5 px-3">{s.recoveryTimeHours} hours rest</td>
                    <td className="py-2.5 px-3">
                      <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                        COMPLETED
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

  // Sub-view: Pay Transparency
  if (currentTab === 'payslip') {
    const slip = INITIAL_PAYSLIPS[0];
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Pay Transparency & Living Wage Parity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Open itemization aligned with UN SDG 8.5 (Equal pay for work of equal value)
          </p>
        </div>

        {/* SDG 8 Living Wage Benchmark Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-600/10 via-emerald-600/10 to-transparent border border-teal-200 dark:border-teal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-teal-700 dark:text-teal-300 font-bold">
              Living Wage Benchmark Assessment
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {slip.livingWageRatio}x Regional Living Wage
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md">
              Your base hourly rate ($46.50/hr) exceeds the local living wage benchmark of $23.80/hr by 95%, ensuring dignified financial resilience.
            </p>
          </div>
          <div className="flex sm:flex-col items-start sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
            <span className="text-[11px] text-slate-500">Pay Transparency Score</span>
            <span className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
              100% Verified
            </span>
          </div>
        </div>

        {/* Detailed Payslip Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs text-slate-400 font-mono">PERIOD: {slip.period}</div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.roleLabel} · {organization.name}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Payment Disbursed</div>
              <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">{slip.payDate}</div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                SETTLED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Earnings */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-teal-600 dark:text-teal-400">
                Gross Earnings Breakdown
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">Base Hours (80.0 hrs @ $46.50/hr)</span>
                  <span className="font-mono font-semibold">${slip.basePay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">Overtime Hours (10.0 hrs @ 1.5x)</span>
                  <span className="font-mono font-semibold">${slip.overtimePay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">FairShift Night/Fatigue Differential</span>
                    <span className="block text-[10px] text-teal-600 dark:text-teal-400">SDG 8 circadian rest protection premium</span>
                  </div>
                  <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
                    +${slip.fairShiftPremium.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-slate-900 dark:text-white">
                  <span>Total Gross Earnings</span>
                  <span className="font-mono">${slip.grossPay.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Deductions & Net */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono tracking-wider font-bold text-slate-500">
                Statutory Deductions & Net Payout
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">Health, Dental & Disability Fund</span>
                  <span className="font-mono font-semibold">-$214.20</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">Statutory Pension / Retirement 401(k)</span>
                  <span className="font-mono font-semibold">-$280.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">Federal & State Tax Withholdings</span>
                  <span className="font-mono font-semibold">-$418.20</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  <span>Net Take-Home Pay</span>
                  <span className="font-mono text-base">${slip.netPay.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Safety & Anonymous Tracking
  if (currentTab === 'safety') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Worker Safety & Anonymous Incident Desk
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zero-harm workplace reporting with cryptographic identity protection
            </p>
          </div>
          <button
            onClick={onOpenReportModal}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>New Safety / Fatigue Report</span>
          </button>
        </div>

        {/* Tracking Code Lookup Tool */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Anonymous Case Tracking Lookup
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Enter your private case code (e.g. <span className="font-mono">FS-ANON-8492</span>) to review investigation and corrective action updates without ever revealing who you are.
          </p>

          <form onSubmit={handleTrackCodeSearch} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={searchTrackingCode}
              onChange={(e) => setSearchTrackingCode(e.target.value)}
              placeholder="e.g. FS-ANON-8492"
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              Verify Status
            </button>
          </form>

          {trackedIncident && trackedIncident !== 'not-found' && (
            <div className="mt-4 p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-teal-700 dark:text-teal-300">
                  {trackedIncident.trackingCode}
                </span>
                <span className="px-2 py-0.5 rounded font-mono uppercase font-bold text-[10px] bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200">
                  Status: {trackedIncident.status}
                </span>
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{trackedIncident.title}</div>
              <div className="text-slate-600 dark:text-slate-300">{trackedIncident.description}</div>
              {trackedIncident.correctiveAction && (
                <div className="p-2.5 rounded bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-700/60 mt-2">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Corrective Action Taken: </span>
                  {trackedIncident.correctiveAction}
                </div>
              )}
            </div>
          )}

          {trackedIncident === 'not-found' && (
            <div className="mt-3 text-xs text-rose-500 font-medium">
              No incident found matching that code. Please check the code or try again.
            </div>
          )}
        </div>

        {/* Incidents Board */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Active Department Safety Logs (Public Transparency)
          </h3>
          <div className="space-y-3">
            {incidents.map(inc => (
              <div
                key={inc.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 transition text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[11px] font-bold text-slate-500">
                      {inc.trackingCode}
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                      {inc.category}
                    </span>
                  </div>
                  <span
                    className={`font-mono uppercase text-[10px] px-2 py-0.5 rounded font-bold ${
                      inc.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : inc.status === 'action-assigned'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {inc.status}
                  </span>
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{inc.title}</div>
                <div className="text-slate-600 dark:text-slate-400">{inc.description}</div>
                {inc.correctiveAction && (
                  <div className="mt-2 text-[11px] text-teal-700 dark:text-teal-300 bg-teal-50/60 dark:bg-teal-950/20 p-2 rounded">
                    <strong>Action:</strong> {inc.correctiveAction}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Skills Passport
  if (currentTab === 'skills') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Skills & Work History Passport
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Portable, verified worker micro-credentials and lifelong competency portfolio (SDG 8.6)
            </p>
          </div>
        </div>

        {/* Add Skill Form */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Register New Competency / Certificate
          </h3>
          <form onSubmit={handleCreateSkill} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              required
              value={newSkillTitle}
              onChange={(e) => setNewSkillTitle(e.target.value)}
              placeholder="e.g. Hazardous Materials Handling, PALS, Lean Six Sigma"
              className="sm:col-span-2 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value="safety-protocol">Safety Protocol</option>
              <option value="clinical">Clinical</option>
              <option value="machinery">Machinery</option>
              <option value="leadership">Leadership</option>
              <option value="digital">Digital</option>
              <option value="operations">Operations</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Passport</span>
            </button>
          </form>
        </div>

        {/* Verified Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mySkills.map(s => (
            <div
              key={s.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold">
                    {s.level}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    ID: {s.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Issued by: {s.issuingBody}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified: {s.verifiedDate}</span>
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-medium">Portable Badge</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sub-view: BarrierBridge Accommodations
  if (currentTab === 'accommodations') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              BarrierBridge Workplace Accommodations
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Universal design and dignity-first workplace adjustments without medical disclosure barriers
            </p>
          </div>
          <button
            onClick={onOpenAccommodationModal}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Request Accommodation</span>
          </button>
        </div>

        {/* Human Dignity Card */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start space-x-3 text-xs text-emerald-900 dark:text-emerald-200">
          <HeartHandshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">FairShift BarrierBridge Policy:</span> Accommodations are confidential and handled independently of performance reviews. No medical certifications or clinical diagnoses are required to obtain ergonomic chairs, schedule rest spacing, or sensory modifications.
          </div>
        </div>

        <div className="space-y-3">
          {myAccommodations.map(acc => (
            <div
              key={acc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded">
                    {acc.category}
                  </span>
                  <span className="text-[11px] text-slate-400">Requested: {acc.dateRequested}</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {acc.description}
                </div>
                <div className="text-xs text-slate-500">
                  Reviewed by: {acc.reviewedBy || 'People & Inclusion Support Lead'}
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 self-start sm:self-center">
                {acc.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT: Overview Tab (Max 2 graphs!)
  return (
    <div className="space-y-6">
      {/* Worker Greeting & Quick Punch Clock */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-mono uppercase tracking-wider">
              {user.department}
            </span>
            <span className="text-xs text-teal-200">SDG 8 FairShift Protected</span>
          </div>
          <h1 className="text-2xl font-extrabold mt-1 tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-teal-100/80 mt-1 max-w-xl">
            Your shift is protected by circadian recovery buffers. Next scheduled shift starts tomorrow at 07:00.
          </p>
        </div>

        {/* Live Attendance Clock Widget */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center space-x-4">
          <div className="text-left">
            <div className="text-[10px] uppercase font-mono text-teal-200">Current Status</div>
            <div className="text-sm font-bold flex items-center space-x-1.5">
              <span className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>{isClockedIn ? 'On Duty (Active)' : 'Off Duty (Resting)'}</span>
            </div>
            {isClockedIn && (
              <div className="text-xs font-mono text-white/90 mt-0.5">
                Elapsed: {Math.floor(shiftElapsedSeconds / 3600)}h {Math.floor((shiftElapsedSeconds % 3600) / 60)}m
              </div>
            )}
          </div>

          <button
            onClick={toggleClock}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-md transition ${
              isClockedIn
                ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                : 'bg-emerald-400 hover:bg-emerald-500 text-slate-950'
            }`}
          >
            {isClockedIn ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isClockedIn ? 'Clock Out' : 'Clock In'}</span>
          </button>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onOpenReportModal}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm text-left transition group"
        >
          <AlertTriangle className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Report Issue</div>
          <div className="text-[10px] text-slate-500">100% Anonymous & Protected</div>
        </button>

        <button
          onClick={onOpenAccommodationModal}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm text-left transition group"
        >
          <HeartHandshake className="w-5 h-5 text-teal-500 mb-2 group-hover:scale-110 transition" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Accommodations</div>
          <div className="text-[10px] text-slate-500">Non-medical dignity access</div>
        </button>

        <button
          onClick={onOpenLeaveModal}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm text-left transition group"
        >
          <Calendar className="w-5 h-5 text-indigo-500 mb-2 group-hover:scale-110 transition" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Request Rest / Leave</div>
          <div className="text-[10px] text-slate-500">Fatigue recovery reset</div>
        </button>

        <button
          onClick={() => setCurrentTab('payslip')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm text-left transition group"
        >
          <DollarSign className="w-5 h-5 text-emerald-500 mb-2 group-hover:scale-110 transition" />
          <div className="text-xs font-bold text-slate-900 dark:text-white">Pay Transparency</div>
          <div className="text-[10px] text-slate-500">Living wage benchmark</div>
        </button>
      </div>

      {/* Exactly TWO Overview Graphs (Requirement 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Shift Duration vs Fatigue Index */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={weeklyShiftData}
            title="Weekly Shift Hours & Fatigue Risk Score"
            primaryLabel="Hours Worked"
            secondaryLabel="Fatigue Index (0-100)"
            valueSuffix=" hrs"
            height={210}
          />
        </div>

        {/* Graph 2: Net Pay vs Regional Living Wage Benchmark */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={payTrendData}
            title="Take-Home Pay vs Regional Living Wage Target ($/mo)"
            primaryLabel="My Net Pay"
            secondaryLabel="Living Wage Baseline ($2,400)"
            valuePrefix="$"
            height={210}
          />
        </div>
      </div>

      {/* Upcoming Shifts Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Next Scheduled Shift
          </h3>
          <button
            onClick={() => setCurrentTab('shifts')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center space-x-1"
          >
            <span>View Full Roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {upcomingShifts[0] && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                {upcomingShifts[0].date} · {upcomingShifts[0].startTime} to {upcomingShifts[0].endTime} ({upcomingShifts[0].durationHours} hrs)
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {upcomingShifts[0].roleTitle} — {upcomingShifts[0].department}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Protected post-shift recovery interval: {upcomingShifts[0].recoveryTimeHours} hours mandatory rest.
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenOvertimeModal}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-50"
              >
                Apply Overtime
              </button>
              <button
                onClick={onOpenLeaveModal}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
              >
                Request Swap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
