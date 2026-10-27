import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, ShieldCheck, X, CheckCircle2, Info } from 'lucide-react';
import { AccommodationRequest } from '../../types';

interface AccommodationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccommodationModal: React.FC<AccommodationModalProps> = ({ isOpen, onClose }) => {
  const { addAccommodation, user } = useApp();
  const [category, setCategory] = useState<AccommodationRequest['category']>('ergonomic-equipment');
  const [description, setDescription] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    addAccommodation({
      category,
      description: description.trim()
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setDescription('');
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-teal-50/50 dark:bg-teal-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/10 dark:bg-teal-400/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 id="acc-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                BarrierBridge Accommodation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dignity-first workplace adjustment request
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dignity Guarantee Callout */}
        <div className="mx-6 mt-5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <span className="font-semibold">UN SDG 8 Human Dignity Guarantee:</span> You are NOT required to provide medical diagnoses, clinical certificates, or invasive health disclosures to receive practical workplace support.
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Accommodation Logged</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Your request has been privately routed to the People & Inclusion Coordinator with restricted visibility.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Support / Accommodation Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AccommodationRequest['category'])}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="ergonomic-equipment">Ergonomic Equipment (Anti-fatigue mat, sit/stand hoist, support chair)</option>
                <option value="flexible-scheduling">Flexible Rest Intervals & Shift Spacing</option>
                <option value="sensory-lighting">Sensory & Lighting (Glare reduction, sound-dampening)</option>
                <option value="micro-breaks">Scheduled Neurodiversity / Fatigue Micro-Breaks</option>
                <option value="screen-contrast">Assistive Technology & High-Contrast Displays</option>
                <option value="mobility-assist">Physical Mobility & Level Access</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Description of Needed Adjustment
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                placeholder="Example: Need a 15-minute quiet recovery break between 6-hour high-volume rotations to maintain focus, or an anti-fatigue gel mat at Station 3."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Visible only to authorized Inclusion Ombudsperson; hidden from peer workers and public shift boards.</span>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-lg shadow-sm transition"
              >
                Submit Accommodation Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
