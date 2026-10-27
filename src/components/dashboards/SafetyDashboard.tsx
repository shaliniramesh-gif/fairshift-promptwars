import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart, LineAreaChart } from '../common/Charts';
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Wrench,
  FileText
} from 'lucide-react';
import { IncidentReport } from '../../types';

export const SafetyDashboard: React.FC = () => {
  const {
    incidents,
    updateIncidentStatus,
    currentTab,
    setCurrentTab
  } = useApp();

  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);
  const [actionNotes, setActionNotes] = useState('');

  // Overview 2 Graphs
  const hazardSeverityData = [
    { label: 'Ergonomic', value: 4, secondaryValue: 2 },
    { label: 'Hydraulic/Oil', value: 3, secondaryValue: 3 },
    { label: 'Fatigue Strain', value: 5, secondaryValue: 4 },
    { label: 'Ventilation', value: 2, secondaryValue: 1 },
    { label: 'PPE/Machinery', value: 1, secondaryValue: 1 }
  ];

  const resolutionDaysData = [
    { label: 'May', value: 4.8 },
    { label: 'Jun', value: 3.9 },
    { label: 'Jul', value: 3.2 },
    { label: 'Aug', value: 2.8 },
    { label: 'Sep', value: 2.1 },
    { label: 'Oct', value: 1.6 }
  ];

  const openHazards = incidents.filter(i => i.status !== 'resolved');
  const criticalHazards = incidents.filter(i => i.severity === 'critical' && i.status !== 'resolved');

  const handleUpdateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIncident || !actionNotes.trim()) return;
    updateIncidentStatus(selectedIncident.id, 'action-assigned', actionNotes.trim());
    setSelectedIncident(null);
    setActionNotes('');
  };

  const handleMarkResolved = (id: string) => {
    updateIncidentStatus(id, 'resolved', 'Resolution verified by EHS inspection team.');
  };

  // Sub-view: Hazard Registry & Incidents
  if (currentTab === 'incidents' || currentTab === 'corrective') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Hazard Incident Registry & Corrective Actions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            OSHA / UN SDG 8.8 Zero-Harm compliance and closed-loop escalation tracker
          </p>
        </div>

        {/* Action modal / inline drawer if editing */}
        {selectedIncident && (
          <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Assign Corrective Action for {selectedIncident.trackingCode}
              </h3>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Incident:</strong> {selectedIncident.title} — {selectedIncident.description}
            </p>
            <form onSubmit={handleUpdateAction} className="flex gap-2">
              <input
                type="text"
                required
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Specify engineering fix, maintenance order, or PPE replacement..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white"
              >
                Save Action Plan
              </button>
            </form>
          </div>
        )}

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
                  <span
                    className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                      inc.severity === 'critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : inc.severity === 'high'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    Severity: {inc.severity}
                  </span>
                  {inc.isAnonymous && (
                    <span className="text-[10px] font-mono text-slate-400">
                      [Anonymous Whistleblower Protected]
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {inc.title}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                  {inc.description}
                </p>
                {inc.correctiveAction && (
                  <div className="text-xs text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 p-2.5 rounded-lg border border-teal-200 dark:border-teal-800/60 mt-2">
                    <strong>Action Taken:</strong> {inc.correctiveAction}
                    {inc.assignedOfficer && (
                      <span className="text-slate-400 ml-2">· Assigned: {inc.assignedOfficer}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 self-start md:self-center">
                {inc.status !== 'resolved' ? (
                  <>
                    <button
                      onClick={() => setSelectedIncident(inc)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Assign Action</span>
                    </button>
                    <button
                      onClick={() => handleMarkResolved(inc.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Close Hazard</span>
                    </button>
                  </>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>RESOLVED</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sub-view: Detailed EHS Analytics
  if (currentTab === 'analytics') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            EHS Hazard & Prevention Analytics
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Granular incident categorization, preventative maintenance audits, and root-cause trends
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <BarChart
              data={hazardSeverityData}
              title="Reported Workplace Hazards by Category"
              primaryLabel="Open Active"
              secondaryLabel="Mitigated This Month"
              height={230}
            />
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <LineAreaChart
              data={resolutionDaysData}
              title="Average Hazard Resolution Cycle (Days to Closure)"
              primaryLabel="Days to Mitigate"
              valueSuffix=" days"
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
            <span className="text-xs font-medium">Unresolved Incidents</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            {openHazards.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {criticalHazards.length} critical priority
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Avg Response Time</span>
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            1.6 Days
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            -66% vs industry average
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Resolution Success</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            94.2%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Verified corrective audits
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">OSHA / SDG 8 Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            Zero-Harm
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Protected whistleblower trust
          </div>
        </div>
      </div>

      {/* Exactly TWO Overview Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <BarChart
            data={hazardSeverityData}
            title="Reported Workplace Hazards by Category"
            primaryLabel="Open Active"
            secondaryLabel="Mitigated This Month"
            height={210}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <LineAreaChart
            data={resolutionDaysData}
            title="Average Hazard Resolution Cycle (Days to Closure)"
            primaryLabel="Days to Mitigate"
            valueSuffix=" days"
            height={210}
          />
        </div>
      </div>

      {/* Immediate Attention Hazard Callout */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            High Priority Active Hazards Requiring Action Plan
          </h3>
          <button
            onClick={() => setCurrentTab('incidents')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center space-x-1"
          >
            <span>Full Hazard Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {openHazards.slice(0, 2).map(h => (
            <div key={h.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{h.trackingCode}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{h.title}</span>
                </div>
                <p className="text-slate-500 mt-1">{h.description}</p>
              </div>
              <button
                onClick={() => setSelectedIncident(h)}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold flex-shrink-0"
              >
                Assign Action Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
