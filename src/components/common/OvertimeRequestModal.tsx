import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { OvertimeRequest } from '../../types';

interface OvertimeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OvertimeRequestModal: React.FC<OvertimeRequestModalProps> = ({ isOpen, onClose }) => {
  const { addOvertimeRequest } = useApp();
  const [shiftDate, setShiftDate] = useState('2026-10-30');
  const [hoursRequested, setHoursRequested] = useState(2);
  const [reason, setReason] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const fatigueImpact: OvertimeRequest['fatigueImpact'] =
    hoursRequested > 4 ? 'high-risk' : hoursRequested >= 3 ? 'warning' : 'acceptable';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    addOvertimeRequest({
      shiftDate,
      hoursRequested,
      reason: reason.trim(),
      fatigueImpact
    });

    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      setReason('');
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ot-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-teal-50 dark:bg-teal-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 id="ot-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Apply for Extra Hours / Overtime
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                With Pre-emptive Fatigue Risk Assessment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Overtime Application Submitted</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your request was routed to your shift lead with projected fatigue impact: {fatigueImpact.toUpperCase()}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Target Shift Date
                </label>
                <input
                  type="date"
                  value={shiftDate}
                  onChange={(e) => setShiftDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Extra Hours
                </label>
                <input
                  type="number"
                  min={1}
                  max={8}
                  step={0.5}
                  value={hoursRequested}
                  onChange={(e) => setHoursRequested(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  required
                />
              </div>
            </div>

            {/* Fatigue Impact Card */}
            <div
              className={`p-3 rounded-xl border flex items-start space-x-2.5 text-xs ${
                fatigueImpact === 'high-risk'
                  ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200'
                  : fatigueImpact === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200'
              }`}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold uppercase tracking-wider text-[10px] block">
                  Projected Fatigue Impact: {fatigueImpact}
                </span>
                {fatigueImpact === 'high-risk' &&
                  'Request exceeds 4 extra hours. Mandatory minimum 16-hour recovery buffer will be automatically reserved afterwards.'}
                {fatigueImpact === 'warning' &&
                  'Request is between 3 to 4 hours. Requires mandatory 14-hour off-shift recovery rest.'}
                {fatigueImpact === 'acceptable' &&
                  'Standard extra coverage within safe cognitive and physiological fatigue bounds.'}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Reason / Department Need
              </label>
              <textarea
                required
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Surge coverage assistance for incoming emergency trauma intake..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
