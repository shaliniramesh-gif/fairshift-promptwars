import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PulseOrb } from '../common/PulseOrb';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Check,
  RefreshCw,
  Scale,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { PulseInsight } from '../../types';

export const FairShiftPulseView: React.FC = () => {
  const {
    pulseInsights,
    updatePulseAction,
    user,
    organization
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'fatigue-risk' | 'safety-cluster' | 'margin-pressure'>('all');
  const [isScanning, setIsScanning] = useState(false);
  const [orbStatus, setOrbStatus] = useState<'idle' | 'analyzing' | 'alert' | 'mitigated'>('idle');

  const filteredInsights = pulseInsights.filter(p => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });

  const handleRunScan = () => {
    setIsScanning(true);
    setOrbStatus('analyzing');
    setTimeout(() => {
      setIsScanning(false);
      setOrbStatus('alert');
      setTimeout(() => setOrbStatus('idle'), 3000);
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Hero Header with Subtle Animated Pulse Orb */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-mono uppercase tracking-wider font-bold">
              FairShift Pulse AI
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Explainable Decent Work Intelligence
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold mt-2 tracking-tight">
            Transparent Signals, Human-in-the-Loop Interventions
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            FairShift Pulse continuously evaluates permissible shift intervals, rest deficits, and environmental hazard logs to protect human well-being. Every alert displays verifiable signal evidence, uncertainty bounds, and human-approved remedy tracking.
          </p>

          <div className="mt-4 flex items-center space-x-3">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center space-x-2 shadow-lg shadow-teal-500/25 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Synthesizing Shift Signals...' : 'Run Live Heuristic Scan'}</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Evaluates {organization.name} telemetry
            </span>
          </div>
        </div>

        {/* Animated AI Pulse Orb */}
        <div className="flex flex-col items-center justify-center relative z-10 md:pr-4">
          <PulseOrb status={orbStatus} size="lg" onClick={handleRunScan} />
          <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest mt-3">
            {isScanning ? 'Signals Analyzing' : orbStatus === 'alert' ? 'High Fatigue Detected' : 'Equilibrium Stable'}
          </span>
        </div>
      </div>

      {/* Ethical AI Guardrails Banner (Requirement 6) */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start space-x-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white">
            Ethical AI & UN SDG 8 Guardrail Guarantees:
          </div>
          <div className="text-slate-600 dark:text-slate-400 leading-relaxed grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
            <div>
              <strong className="text-slate-800 dark:text-slate-200">1. Zero Automated Punishment:</strong> System never dismisses, penalizes, or ranks workers as inferior.
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200">2. Privacy Isolation:</strong> Disability & accommodation requests are quarantined and never used as performance signals.
            </div>
            <div>
              <strong className="text-slate-800 dark:text-slate-200">3. Whistleblower Anonymity:</strong> Anonymous reporter identities are cryptographically inaccessible.
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-semibold text-slate-500">Filter Signals:</span>
          {(['all', 'fatigue-risk', 'safety-cluster', 'margin-pressure'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition capitalize ${
                activeFilter === tab
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Showing {filteredInsights.length} explainable signals
        </div>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-5">
        {filteredInsights.map(insight => (
          <div
            key={insight.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <span
                  className={`text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded ${
                    insight.severity === 'critical'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : insight.severity === 'high'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                  }`}
                >
                  {insight.severity} Severity
                </span>
                <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
                  {insight.sdgTarget}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {insight.isPredefinedDemo ? 'Predefined Scenario' : 'Live Heuristic'}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-400">Confidence:</span>
                <strong className="text-slate-800 dark:text-slate-100 font-mono">
                  {insight.confidenceScore}%
                </strong>
                <span className="text-slate-400">· Date: {insight.generatedDate}</span>
              </div>
            </div>

            {/* Title & Summary */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {insight.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {insight.summary}
              </p>
            </div>

            {/* Evidence & Signals Inspector */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <div className="text-[11px] uppercase font-mono font-bold text-slate-400 mb-2 flex items-center space-x-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-teal-500" />
                <span>Evidence Signals & Telemetry Telemetry</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {insight.evidenceSignals.map((sig, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      sig.alert
                        ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="text-[11px] text-slate-500 truncate">{sig.label}</div>
                    <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5 flex items-center justify-between">
                      <span>{sig.value}</span>
                      {sig.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-rose-500" />}
                      {sig.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-teal-500" />}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      Baseline: {sig.baseline}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Uncertainty & Causation Disclaimer */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-2.5 text-xs text-amber-900 dark:text-amber-200">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold uppercase tracking-wider text-[10px] block">
                  Explainable Uncertainty & Correlation Note
                </span>
                {insight.correlationNote}
              </div>
            </div>

            {/* Human-in-the-Loop Actionable Remedy & Owner Assignment */}
            <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Human-Reviewed Recommendation
                </span>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {insight.recommendedAction}
                </p>
                <div className="text-[11px] text-slate-500 flex items-center space-x-3 pt-1">
                  <span>Assigned Owner: <strong className="text-teal-600 dark:text-teal-400">{insight.assignedOwner}</strong></span>
                  <span>· {insight.beforeMetric}</span>
                  {insight.afterMetric && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">· {insight.afterMetric}</span>}
                </div>
              </div>

              {/* Status & Intervention Actions */}
              <div className="flex items-center space-x-2 self-start md:self-center">
                {insight.actionStatus === 'pending' && (
                  <button
                    onClick={() => updatePulseAction(insight.id, 'in-progress', user.name)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition"
                  >
                    Take Action (Assign to Me)
                  </button>
                )}

                {insight.actionStatus === 'in-progress' && (
                  <button
                    onClick={() => updatePulseAction(insight.id, 'mitigated')}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify & Mark Mitigated</span>
                  </button>
                )}

                {insight.actionStatus === 'mitigated' && (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>HAZARD MITIGATED</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
