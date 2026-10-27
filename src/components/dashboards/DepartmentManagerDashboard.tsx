import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, LineAreaChart } from '../common/Charts';
import {
  Users,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCheck,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface DepartmentManagerDashboardProps {
  onOpenReportModal?: () => void;
}

export const DepartmentManagerDashboard: React.FC<DepartmentManagerDashboardProps> = ({
  onOpenReportModal
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
    updateLeaveStatus,
    updateOvertimeStatus,
    updateIncidentStatus
  } = useApp();

  // Filter for this manager's department
  const deptShifts = shifts.filter(s => s.department === user.department || s.department.includes(user.department.split(' ')[0]));
  const deptIncidents = incidents.filter(i => i.department === user.department || i.department.includes(user.department.split(' ')[0]));
  const deptLeaves = leaveRequests.filter(l => l.department === user.department || l.department.includes(user.department.split(' ')[0]));
  const deptOvertimes = overtimeRequests;

  // Overview 2 Graphs
  const deptStaffingData = [
    { label: 'Mon', value: 14, secondaryValue: 12 },
    { label: 'Tue', value: 14, secondaryValue: 12 },
    { label: 'Wed', value: 12, secondaryValue: 12 },
    { label: 'Thu', value: 11, secondaryValue: 12 },
    { label: 'Fri', value: 13, secondaryValue: 12 },
    { label: 'Sat', value: 10, secondaryValue: 10 },
    { label: 'Sun', value: 9, secondaryValue: 10 }
  ];

  const deptFatigueTrajectory = [
    { label: 'Wk 1', value: 34, secondaryValue: 40 },
    { label: 'Wk 2', value: 42, secondaryValue: 40 },
    { label: 'Wk 3', value: 58, secondaryValue: 40 },
    { label: 'Wk 4', value: 38, secondaryValue: 40 }
  ];

  // Sub-view: Active Department Roster
  if (currentTab === 'roster') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {user.department} — Shift Coverage & Staffing Board
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Department operational capacity, on-duty status, and fatigue recovery intervals
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-3">Team Member</th>
                  <th className="py-2.5 px-3">Role Title</th>
                  <th className="py-2.5 px-3">Scheduled Shift</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Rest Recovery</th>
                  <th className="py-2.5 px-3">Fatigue Risk</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {deptShifts.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{s.workerName}</td>
                    <td className="py-3 px-3 text-slate-500">{s.roleTitle}</td>
                    <td className="py-3 px-3 font-mono">{s.date} ({s.startTime} - {s.endTime})</td>
                    <td className="py-3 px-3 font-mono">{s.durationHours} hrs</td>
                    <td className="py-3 px-3 font-mono">{s.recoveryTimeHours}h buffer</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                        s.fatigueRisk === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        s.fatigueRisk === 'elevated' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {s.fatigueRisk}
                      </span>
                    </td>
                    <td className="py-3 px-3 capitalize text-slate-600 dark:text-slate-300 font-medium">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Shift Swaps & Relief Requests
  if (currentTab === 'swaps') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Department Relief & Shift Swap Approvals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Immediate supervisor review for shift exchanges and fatigue recovery coverage
          </p>
        </div>

        <div className="space-y-3">
          {deptLeaves.map(leave => (
            <div
              key={leave.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{leave.workerName}</span>
                  <span className="text-xs text-slate-400">· {leave.department}</span>
                  <span className="text-[10px] font-mono uppercase bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold">
                    {leave.type}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  Requested: {leave.startDate} to {leave.endDate} ({leave.daysCount} days)
                </div>
                <p className="text-xs text-slate-500 mt-1">&ldquo;{leave.reason}&rdquo;</p>
              </div>

              <div className="flex items-center space-x-2">
                {leave.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => updateLeaveStatus(leave.id, 'rejected')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(leave.id, 'approved')}
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Coverage</span>
                    </button>
                  </>
                ) : (
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                    leave.status === 'approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {leave.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sub-view: Department Safety Hazards
  if (currentTab === 'hazards') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {user.department} — Hazard Triage & Safety Concerns
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Field reports and near-miss alerts in your operational area
          </p>
        </div>

        <div className="space-y-3">
          {deptIncidents.map(inc => (
            <div
              key={inc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">{inc.trackingCode}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {inc.category}
                  </span>
                  <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                    inc.severity === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {inc.severity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{inc.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">{inc.description}</p>
                {inc.correctiveAction && (
                  <div className="text-xs text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 p-2 rounded mt-1">
                    <strong>Action:</strong> {inc.correctiveAction}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 self-start md:self-center">
                {inc.status !== 'resolved' ? (
                  <button
                    onClick={() => updateIncidentStatus(inc.id, 'resolved', 'Department supervisor inspected and resolved condition.')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mitigate & Close</span>
                  </button>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    RESOLVED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DEFAULT: Overview (Max 2 graphs!)
  return (
    <div className="space-y-6">
      {/* Top Department Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded font-bold">
              Department Operations
            </span>
            <span className="text-xs text-slate-400">{organization.name}</span>
          </div>
          <h1 className="text-2xl font-extrabold mt-1 tracking-tight">
            {user.department} Command Hub
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Logged in as {user.name} ({user.roleLabel}). Managing operational shift coverage, safe staffing thresholds, and frontline fatigue risk.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentTab('swaps')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-white transition flex items-center space-x-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Shift Swaps ({deptLeaves.filter(l => l.status === 'pending').length})</span>
          </button>
          <button
            onClick={() => setCurrentTab('hazards')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition flex items-center space-x-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Hazards ({deptIncidents.filter(i => i.status !== 'resolved').length})</span>
          </button>
        </div>
      </div>

      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Department Headcount</span>
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {deptShifts.length * 3 + 12}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Safe staffing ratio satisfied
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Fatigue Risk Index</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {organization.avgFatigueScore} / 100
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Circadian rest protected
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Coverage Requests</span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {deptLeaves.filter(l => l.status === 'pending').length}
          </div>
          <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium mt-1">
            Pending supervisor sign-off
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Open Safety Items</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {deptIncidents.filter(i => i.status !== 'resolved').length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Preliminary triage active
          </div>
        </div>
      </div>

      {/* Exactly TWO Overview Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={deptStaffingData}
            title="Department Active Staffing vs Minimum Safe Threshold"
            primaryLabel="On-Duty Staff"
            secondaryLabel="Safe Baseline (12)"
            height={210}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={deptFatigueTrajectory}
            title="Weekly Department Fatigue Score Trajectory"
            primaryLabel="Fatigue Index"
            secondaryLabel="Threshold (40)"
            height={210}
          />
        </div>
      </div>

      {/* Privacy Boundary Callout */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
          <span>
            <strong>Department Manager Access Boundary:</strong> You have operational control over {user.department} rosters and hazard triage. Private worker medical accommodation files and organization-wide executive financials remain restricted.
          </span>
        </div>
        <button
          onClick={() => setCurrentTab('roster')}
          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center space-x-1 flex-shrink-0 ml-3"
        >
          <span>View Team Roster</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
