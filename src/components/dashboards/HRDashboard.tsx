import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

export const HRDashboard: React.FC = () => {
  const {
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

  // Overview 2 Graphs Data
  const deptFatigueData = [
    { label: 'ICU / Crit', value: 78, secondaryValue: 142 },
    { label: 'Emergency', value: 65, secondaryValue: 98 },
    { label: 'Surgery', value: 42, secondaryValue: 45 },
    { label: 'Pharmacy', value: 24, secondaryValue: 18 },
    { label: 'Facility/EHS', value: 31, secondaryValue: 28 }
  ];

  const coverageTrendData = [
    { label: 'Mon', value: 98, secondaryValue: 4 },
    { label: 'Tue', value: 96, secondaryValue: 6 },
    { label: 'Wed', value: 92, secondaryValue: 12 },
    { label: 'Thu', value: 89, secondaryValue: 18 },
    { label: 'Fri', value: 95, secondaryValue: 8 },
    { label: 'Sat', value: 91, secondaryValue: 14 },
    { label: 'Sun', value: 94, secondaryValue: 10 }
  ];

  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending');
  const pendingOvertimes = overtimeRequests.filter(o => o.status === 'pending');
  const openConcerns = incidents.filter(i => i.status !== 'resolved');

  // Sub-view: Detailed HR Analytics
  if (currentTab === 'analytics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Granular Workforce & Rest Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comprehensive fatigue risk modeling, circadian recovery gaps, and retention trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <BarChart
              data={[
                { label: 'Night 12h', value: 48, secondaryValue: 82 },
                { label: 'Day 12h', value: 32, secondaryValue: 45 },
                { label: 'Evening 8h', value: 18, secondaryValue: 24 },
                { label: 'Morning 8h', value: 12, secondaryValue: 15 },
                { label: 'On-Call', value: 54, secondaryValue: 68 }
              ]}
              title="Shift Fatigue Severity by Rotation Type"
              primaryLabel="Average Fatigue Index"
              secondaryLabel="Overtime Instances"
              height={230}
            />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <LineAreaChart
              data={[
                { label: 'May', value: 96.2, secondaryValue: 1.8 },
                { label: 'Jun', value: 95.8, secondaryValue: 2.1 },
                { label: 'Jul', value: 94.1, secondaryValue: 3.4 },
                { label: 'Aug', value: 93.5, secondaryValue: 4.1 },
                { label: 'Sep', value: 95.2, secondaryValue: 2.5 },
                { label: 'Oct', value: 96.8, secondaryValue: 1.9 }
              ]}
              title="Monthly Clinician Retention Rate vs Unplanned Absenteeism (%)"
              primaryLabel="Retention Rate (%)"
              secondaryLabel="Absenteeism (%)"
              valueSuffix="%"
              height={230}
            />
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Leave Approvals
  if (currentTab === 'leave') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Leave & Rest Recovery Approval Queue
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Human-centered scheduling with automatic fatigue buffer enforcement
          </p>
        </div>

        <div className="space-y-3">
          {leaveRequests.map(leave => (
            <div
              key={leave.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {leave.workerName}
                  </span>
                  <span className="text-xs text-slate-400">· {leave.department}</span>
                  <span className="text-[10px] font-mono uppercase bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded font-bold">
                    {leave.type}
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  {leave.startDate} to {leave.endDate} ({leave.daysCount} days)
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reason: &ldquo;{leave.reason}&rdquo;
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {leave.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => updateLeaveStatus(leave.id, 'rejected')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(leave.id, 'approved')}
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Rest</span>
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
                      leave.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
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

  // Sub-view: Fatigue & Overtime Registry
  if (currentTab === 'fatigue') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Fatigue & Overtime Approval Registry
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pre-emptive fatigue evaluations to prevent clinical errors and industrial injuries
          </p>
        </div>

        <div className="space-y-3">
          {overtimeRequests.map(ot => (
            <div
              key={ot.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {ot.workerName}
                  </span>
                  <span className="text-xs text-slate-400">· Date: {ot.shiftDate}</span>
                  <span
                    className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                      ot.fatigueImpact === 'high-risk'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : ot.fatigueImpact === 'warning'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    Impact: {ot.fatigueImpact}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {ot.hoursRequested} Hours Extra Requested
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Justification: &ldquo;{ot.reason}&rdquo;
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {ot.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => updateOvertimeStatus(ot.id, 'rejected')}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
                    >
                      Reject Overtime
                    </button>
                    <button
                      onClick={() => updateOvertimeStatus(ot.id, 'approved')}
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve with Mandatory 14h Buffer</span>
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {ot.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sub-view: Shift Coverage & Roster
  if (currentTab === 'coverage') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Shift Coverage & Roster Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Workforce deployment across all clinical, technical, and operational units
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Active Roster & Minimum Staffing Thresholds
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-3">Staff Member</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Date & Hours</th>
                  <th className="py-2.5 px-3">Shift Window</th>
                  <th className="py-2.5 px-3">Fatigue Risk</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {shifts.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{s.workerName}</td>
                    <td className="py-3 px-3 text-slate-500">{s.department}</td>
                    <td className="py-3 px-3 font-mono">{s.date} ({s.durationHours} hrs)</td>
                    <td className="py-3 px-3 font-mono">{s.startTime} - {s.endTime}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                        s.fatigueRisk === 'critical'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : s.fatigueRisk === 'elevated'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {s.fatigueRisk}
                      </span>
                    </td>
                    <td className="py-3 px-3 capitalize font-medium text-slate-600 dark:text-slate-300">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Sub-view: Worker Concerns & Unresolved Issues
  if (currentTab === 'concerns') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Worker Concerns & Well-being Interventions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Confidential and anonymous reports submitted for workforce ombudsman review
          </p>
        </div>

        <div className="space-y-3">
          {incidents.map(inc => (
            <div
              key={inc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                    {inc.trackingCode}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {inc.category}
                  </span>
                  <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                    inc.severity === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {inc.severity}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {inc.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                  {inc.description}
                </p>
                {inc.correctiveAction && (
                  <div className="text-xs text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 p-2 rounded mt-1">
                    <strong>Action:</strong> {inc.correctiveAction}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 self-start md:self-center">
                {inc.status !== 'resolved' ? (
                  <button
                    onClick={() => updateIncidentStatus(inc.id, 'resolved', 'HR well-being intervention confirmed and closed.')}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Resolve Issue</span>
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

  // DEFAULT: HR Overview (Max 2 graphs!)
  return (
    <div className="space-y-6">
      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Staff Headcount</span>
            <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {organization.workerCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            99.2% on contracted schedule
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Overtime Alerts</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {pendingOvertimes.length + 3}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            ICU & Stamping Bay rotations
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Pending Rest Requests</span>
            <Calendar className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {pendingLeaves.length}
          </div>
          <div className="text-[11px] text-teal-600 dark:text-teal-400 font-medium mt-1">
            Coverage automatically verified
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Retention Pulse Index</span>
            <TrendingDown className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            96.8%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            +3.4% since FairShift implementation
          </div>
        </div>
      </div>

      {/* Exactly TWO Overview Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={deptFatigueData}
            title="Department Fatigue Risk Score vs Overtime Hours"
            primaryLabel="Fatigue Index (0-100)"
            secondaryLabel="Overtime Hours (Weekly)"
            height={210}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={coverageTrendData}
            title="Weekly Shift Coverage Rate & Absenteeism"
            primaryLabel="Coverage %"
            secondaryLabel="Fatigue Gaps"
            valueSuffix="%"
            height={210}
          />
        </div>
      </div>

      {/* Actionable Human Workload Queue */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Unresolved Staff Fatigue Concerns & Coverage Requests
          </h3>
          <button
            onClick={() => setCurrentTab('leave')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center space-x-1"
          >
            <span>Review Full Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {pendingLeaves.slice(0, 3).map(l => (
            <div key={l.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">{l.workerName}</span>
                <span className="text-slate-400"> — {l.type.toUpperCase()} ({l.startDate})</span>
                <p className="text-slate-500 mt-0.5">&ldquo;{l.reason}&rdquo;</p>
              </div>
              <button
                onClick={() => updateLeaveStatus(l.id, 'approved')}
                className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
              >
                Approve Rest
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
