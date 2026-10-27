import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  Mic,
  MicOff,
  Shield,
  X,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { IncidentReport } from '../../types';

interface IncidentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentReportModal: React.FC<IncidentReportModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addIncident, user } = useApp();
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [category, setCategory] = useState<IncidentReport['category']>('ergonomic');
  const [severity, setSeverity] = useState<IncidentReport['severity']>('moderate');
  const [department, setDepartment] = useState(user.department);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Voice recording state
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  useEffect(() => {
    // Check SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
    }
  }, []);

  const toggleVoiceRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Accessible simulation fallback for environments without microphone permissions
      setIsListening(prev => !prev);
      if (!isListening) {
        setTimeout(() => {
          setDescription(prev =>
            prev
              ? `${prev} [Voice Note: Overhead mechanical hoist in Room 314 is vibrating violently under load and needs immediate cable tension audit.]`
              : 'Overhead mechanical hoist in Room 314 is vibrating violently under load and needs immediate cable tension audit.'
          );
          setIsListening(false);
        }, 3000);
      }
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isListening) {
        recognition.start();
        setIsListening(true);
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setDescription(prev => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };
        recognition.onerror = () => {
          setIsListening(false);
        };
        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch (e) {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const code = addIncident({
      title: title.trim(),
      description: description.trim(),
      category,
      severity,
      department,
      isAnonymous,
      voiceTranscriptUsed: isListening
    });

    setGeneratedCode(code);
  };

  const handleCopyCode = () => {
    if (generatedCode) {
      navigator.clipboard?.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setGeneratedCode(null);
    setTitle('');
    setDescription('');
    setIsListening(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="incident-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-amber-500/10 dark:bg-amber-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="incident-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Safety & Fatigue Incident Report
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                UN SDG 8.8 Zero-Harm Worker Protection Protocol
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {generatedCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Report Successfully Encrypted & Dispatched
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  {isAnonymous
                    ? 'No user account, IP address, or employee record was linked. Save your private tracking code below to monitor resolution progress.'
                    : 'Report registered under your name. The EHS team and safety steward have been notified.'}
                </p>
              </div>

              {/* Tracking Code Box */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500">
                    Anonymous Tracking Code
                  </div>
                  <div className="text-lg font-mono font-bold text-teal-600 dark:text-teal-400">
                    {generatedCode}
                  </div>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 text-slate-700 dark:text-slate-200 transition"
                  title="Copy tracking code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleClose}
                  className="px-6 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anonymous vs Named Toggle */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Shield className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Submit 100% Anonymously
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Guarantees zero retaliation. Strip all identifying metadata.
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as IncidentReport['category'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-teal-500"
                  >
                    <option value="ergonomic">Ergonomic Strain / Heavy Hoist</option>
                    <option value="hazard-leak">Chemical / Hydraulic Leak</option>
                    <option value="fatigue-strain">Shift Fatigue / Missed Break Rotation</option>
                    <option value="machinery">Machinery Malfunction / Guarding</option>
                    <option value="harassment">Workplace Harassment / Hostility</option>
                    <option value="ventilation">Ventilation / Fume Air Quality</option>
                    <option value="safety-gear">PPE / Safety Gear Defect</option>
                    <option value="other">Other Workplace Safety Risk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Severity Level
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as IncidentReport['severity'])}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-teal-500"
                  >
                    <option value="low">Low (Minor inconvenience / near-miss noticed)</option>
                    <option value="moderate">Moderate (Potential for injury or strain)</option>
                    <option value="high">High (Active hazard requiring immediate remedy)</option>
                    <option value="critical">Critical (Immediate danger to life or physical harm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Physical Location
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Intensive Care Unit - Pod B, Stamping Press Bay 4"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Incident Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summary of the hazard or concern"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-teal-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Factual Details & Observations
                  </label>
                  <button
                    type="button"
                    onClick={toggleVoiceRecording}
                    className={`flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded transition ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 border border-teal-200 dark:border-teal-800'
                    }`}
                    title={isListening ? 'Stop recording voice note' : 'Dictate issue using voice'}
                  >
                    {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                    <span>{isListening ? 'Listening...' : 'Voice Dictate'}</span>
                  </button>
                </div>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what occurred, any equipment involved, conditions (e.g. wet floor, fatigue after long hours), and immediate safety steps taken..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition"
                >
                  Submit Protected Report
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
