import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageKey, TRANSLATIONS } from '../../utils/translations';
import {
  Eye,
  Type,
  Sun,
  Moon,
  Sparkles,
  HeartHandshake,
  Languages,
  BookOpen
} from 'lucide-react';

interface BarrierBridgeBarProps {
  onOpenAccommodationModal: () => void;
}

export const BarrierBridgeBar: React.FC<BarrierBridgeBarProps> = ({
  onOpenAccommodationModal
}) => {
  const {
    accessibility,
    updateAccessibility,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  const currentTranslation = TRANSLATIONS[accessibility.language] || TRANSLATIONS.en;

  const fontSizes: { key: 'normal' | 'medium' | 'large' | 'xlarge'; label: string }[] = [
    { key: 'normal', label: '100%' },
    { key: 'medium', label: '115%' },
    { key: 'large', label: '125%' },
    { key: 'xlarge', label: '140%' }
  ];

  const languages: { code: LanguageKey; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'tl', label: 'Tagalog' }
  ];

  return (
    <div
      className="bg-slate-900 text-slate-100 border-b border-slate-800 text-xs py-1.5 px-3 md:px-6 transition-all select-none"
      role="region"
      aria-label="BarrierBridge Accessibility and Universal Design Bar"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: BarrierBridge Badge & Mission */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 bg-teal-950/80 text-teal-300 px-2 py-0.5 rounded border border-teal-700/50">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
            <span className="font-semibold tracking-wide">BarrierBridge</span>
            <span className="text-[10px] text-teal-400/80 hidden sm:inline">| Universal Accessibility</span>
          </div>

          <button
            onClick={onOpenAccommodationModal}
            className="flex items-center space-x-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded border border-slate-700 transition"
            aria-label="Request Workplace Accommodation - No diagnosis required"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="font-medium">{currentTranslation.requestAccommodation || 'Request Accommodation'}</span>
            <span className="hidden md:inline text-[10px] text-slate-400">(Non-medical)</span>
          </button>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center space-x-3">
          {/* Text Sizing */}
          <div className="flex items-center space-x-1 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">
            <Type className="w-3 h-3 text-slate-400" aria-hidden="true" />
            <span className="sr-only">Adjust Text Size:</span>
            {fontSizes.map(f => (
              <button
                key={f.key}
                onClick={() => updateAccessibility({ fontSize: f.key })}
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition ${
                  accessibility.fontSize === f.key
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-pressed={accessibility.fontSize === f.key}
                title={`Set text size to ${f.label}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border transition ${
              accessibility.highContrast
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
            aria-pressed={accessibility.highContrast}
            title="Toggle High-Contrast AAA Mode"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">AAA Contrast</span>
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => updateAccessibility({ reducedMotion: !accessibility.reducedMotion })}
            className={`px-2 py-0.5 rounded border transition ${
              accessibility.reducedMotion
                ? 'bg-teal-400 text-slate-950 font-bold border-teal-300'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
            aria-pressed={accessibility.reducedMotion}
            title="Toggle Reduced Motion"
          >
            <span className="hidden sm:inline">Reduced Motion: </span>
            <span>{accessibility.reducedMotion ? 'ON' : 'OFF'}</span>
          </button>

          {/* Plain Language mode */}
          <button
            onClick={() => updateAccessibility({ simpleLanguage: !accessibility.simpleLanguage })}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded border transition ${
              accessibility.simpleLanguage
                ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-300'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
            aria-pressed={accessibility.simpleLanguage}
            title="Toggle Plain / Simplified Language"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden md:inline">Plain Words</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={accessibility.language}
              onChange={(e) => updateAccessibility({ language: e.target.value as LanguageKey })}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs rounded px-2 py-0.5 pr-6 appearance-none cursor-pointer focus:outline-teal-400"
              aria-label="Select Interface Language"
            >
              {languages.map(l => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <Languages className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-teal-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};
