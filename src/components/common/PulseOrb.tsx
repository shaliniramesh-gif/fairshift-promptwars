import React from 'react';

interface PulseOrbProps {
  status?: 'idle' | 'analyzing' | 'alert' | 'mitigated';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const PulseOrb: React.FC<PulseOrbProps> = ({
  status = 'idle',
  size = 'md',
  className = '',
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-36 h-36'
  };

  const getGlowColors = () => {
    switch (status) {
      case 'alert':
        return 'from-amber-500 via-rose-500 to-red-600 shadow-rose-500/50';
      case 'analyzing':
        return 'from-cyan-400 via-teal-500 to-emerald-500 shadow-cyan-400/50';
      case 'mitigated':
        return 'from-emerald-400 via-teal-500 to-blue-500 shadow-emerald-400/40';
      default:
        return 'from-teal-400 via-cyan-500 to-indigo-600 shadow-teal-500/40';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      role="img"
      aria-label={`FairShift Pulse AI Orb - Status: ${status}`}
    >
      {/* Outer ambient wave ring 1 */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${getGlowColors()} opacity-25 blur-xl animate-pulse`}
        style={{ animationDuration: status === 'alert' ? '1.4s' : '3s' }}
      />

      {/* Ripple ring 2 */}
      <div
        className={`absolute -inset-2 rounded-full border border-teal-500/30 dark:border-teal-400/20 animate-ping opacity-20`}
        style={{ animationDuration: '4s' }}
      />

      {/* Core orb container */}
      <div
        className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br ${getGlowColors()} shadow-2xl p-[2px] overflow-hidden`}
      >
        {/* Swirling fluid mesh */}
        <div className="w-full h-full rounded-full bg-slate-950/40 backdrop-blur-sm relative overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-[-50%] bg-gradient-to-tr from-white/30 via-transparent to-white/10 rounded-full animate-[spin_6s_linear_infinite]"
          />
          {/* Inner core nucleus */}
          <div className="w-1/2 h-1/2 rounded-full bg-white/80 dark:bg-white/90 blur-[1px] shadow-inner animate-pulse" />
        </div>
      </div>
    </div>
  );
};
