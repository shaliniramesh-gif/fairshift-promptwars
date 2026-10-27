import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageKey, TRANSLATIONS } from '../../utils/translations';
import {
  X,
  Eye,
  Type,
  Sun,
  Moon,
  Sparkles,
  HeartHandshake,
  Languages,
  BookOpen,
  Check,
  ShieldCheck,
  SlidersHorizontal
} from 'lucide-react';

interface AccessibilityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAccommodationModal: () => void;
}

export const AccessibilityDrawer: React.FC<AccessibilityDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAccommodationModal
}) => {
  const {
    accessibility,
    updateAccessibility,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  const currentTranslation = TRANSLATIONS[accessibility.language] || TRANSLATIONS.en;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fontSizes: { key: 'normal' | 'medium' | 'large' | 'xlarge'; label: string; desc: string }[] = [
    { key: 'normal', label: '100%', desc: 'Standard default size' },
    { key: 'medium', label: '115%', desc: 'Comfortable reading' },
    { key: 'large', label: '125%', desc: 'Enhanced visibility' },
    { key: 'xlarge', label: '140%', desc: 'Maximum legibility' }
  ];

  const languages: { code: LanguageKey; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'es', label: 'Spanish', native: 'Español' },
    { code: 'fr', label: 'French', native: 'Français' },
    { code: 'de', label: 'German', native: 'Deutsch' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'tl', label: 'Tagalog', native: 'Tagalog' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-labelledby="accessibility-drawer-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <div>
                <h2 id="accessibility-drawer-title" className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <span>BarrierBridge Settings</span>
                  <span className="text-[10px] font-mono uppercase bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 px-1.5 py-0.5 rounded border border-teal-300 dark:border-teal-700">
                    WCAG AAA
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Universal accessibility preferences & workplace accommodations
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close accessibility panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 flex-1">
            {/* 1. Text Sizing */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Type className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Text Scaling</span>
                </span>
                <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                  {accessibility.fontSize.toUpperCase()}
                </span>
              </label>

              <div className="grid grid-cols-4 gap-2">
                {fontSizes.map(f => {
                  const isSelected = accessibility.fontSize === f.key;
                  return (
                    <button
                      key={f.key}
                      onClick={() => updateAccessibility({ fontSize: f.key })}
                      className={`py-2 px-1 text-center rounded-xl border text-xs transition ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="font-mono font-semibold">{f.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Visual & Sensory Controls */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Sensory & Contrast Controls
              </div>

              {/* High Contrast Toggle */}
              <button
                onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition ${
                  accessibility.highContrast
                    ? 'bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-pressed={accessibility.highContrast}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${accessibility.highContrast ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <Eye className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      High-Contrast AAA Mode
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      7:1 contrast ratio for enhanced readability
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${accessibility.highContrast ? 'bg-amber-500 border-amber-600 text-slate-950 font-bold' : 'border-slate-400'}`}>
                  {accessibility.highContrast && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Reduced Motion Toggle */}
              <button
                onClick={() => updateAccessibility({ reducedMotion: !accessibility.reducedMotion })}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition ${
                  accessibility.reducedMotion
                    ? 'bg-teal-500/10 border-teal-500 text-teal-900 dark:text-teal-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-pressed={accessibility.reducedMotion}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${accessibility.reducedMotion ? 'bg-teal-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Reduced Motion (Vestibular Safe)
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Disables 3D spins and rapid screen transitions
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${accessibility.reducedMotion ? 'bg-teal-500 border-teal-600 text-slate-950 font-bold' : 'border-slate-400'}`}>
                  {accessibility.reducedMotion && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Plain Language Mode */}
              <button
                onClick={() => updateAccessibility({ simpleLanguage: !accessibility.simpleLanguage })}
                className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition ${
                  accessibility.simpleLanguage
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                aria-pressed={accessibility.simpleLanguage}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${accessibility.simpleLanguage ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Plain Language Mode
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Simplified wording and reduced cognitive jargon
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${accessibility.simpleLanguage ? 'bg-emerald-500 border-emerald-600 text-slate-950 font-bold' : 'border-slate-400'}`}>
                  {accessibility.simpleLanguage && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Dark / Light Appearance Toggle */}
              <button
                onClick={toggleDarkMode}
                className="w-full p-3 rounded-xl border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Appearance Theme
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Currently using {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
                  Switch to {isDarkMode ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>

            {/* 3. Language Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Languages className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Preferred Interface Language</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {languages.map(lang => {
                  const isSelected = accessibility.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => updateAccessibility({ language: lang.code })}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        isSelected
                          ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 ring-1 ring-teal-500'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <div className="font-bold text-xs">{lang.native}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{lang.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Separate Workplace Accommodation Action */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-2.5">
              <div className="flex items-start space-x-3">
                <HeartHandshake className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Non-Medical Workplace Accommodation
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    BarrierBridge allows requesting shift micro-breaks, ergonomic hoists, and lighting adjustments without requiring medical disclosure.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenAccommodationModal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center justify-center space-x-2 transition"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Open Accommodation Request</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>UN SDG 8.8 Universal Inclusion</span>
            </span>
            <button
              onClick={onClose}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
