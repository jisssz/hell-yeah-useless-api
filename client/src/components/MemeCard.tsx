import React from 'react';

export interface MemeCardProps {
  character: 'innocent' | 'salimkumar' | 'jagathy' | 'thilakan' | 'mohanlal' | 'mammootty' | 'kunjappan' | 'chemban';
  tag: string;
  tagColor?: string;
  malayalamQuote: string;
  englishTranslation: string;
  subtext?: string;
  rotation?: string;
  badge?: string;
  className?: string;
  animClass?: string;
}

// Custom curated vector avatars capturing the exaggerated comic energy of legendary Malayalam cinema reaction faces
const CHARACTER_ART: Record<string, { bg: string; title: string; emoji: string; accent: string }> = {
  innocent: {
    bg: 'from-amber-400/20 to-yellow-500/20 border-yellow-400/40',
    title: 'INNOCENT REACTION',
    emoji: '👴🏽',
    accent: 'text-amber-400',
  },
  salimkumar: {
    bg: 'from-rose-500/20 to-orange-500/20 border-rose-400/40',
    title: 'SALIM KUMAR / MANAVALAN',
    emoji: '🕶️',
    accent: 'text-rose-400',
  },
  jagathy: {
    bg: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/40',
    title: 'JAGATHY SREEKUMAR',
    emoji: '🤪',
    accent: 'text-indigo-400',
  },
  thilakan: {
    bg: 'from-red-600/20 to-amber-600/20 border-red-500/40',
    title: 'THILAKAN / KATTA KALIPP',
    emoji: '👓',
    accent: 'text-red-400',
  },
  mohanlal: {
    bg: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/40',
    title: 'MOHANLAL / SUNNY',
    emoji: '🧔🏽',
    accent: 'text-emerald-400',
  },
  mammootty: {
    bg: 'from-blue-500/20 to-cyan-500/20 border-blue-400/40',
    title: 'MAMMOOTTY / SWAG',
    emoji: '🔥',
    accent: 'text-cyan-400',
  },
  kunjappan: {
    bg: 'from-yellow-400/30 to-amber-500/30 border-yellow-400',
    title: 'AESTHETIC KUNJAPPAN',
    emoji: '🥸',
    accent: 'text-yellow-400',
  },
  chemban: {
    bg: 'from-emerald-600/20 to-green-600/20 border-emerald-500/40',
    title: 'ROMANCHAM / AAVESHAM',
    emoji: '👻',
    accent: 'text-lime-400',
  },
};

export const MemeCard: React.FC<MemeCardProps> = ({
  character,
  tag,
  tagColor = 'bg-yellow-400 text-black',
  malayalamQuote,
  englishTranslation,
  subtext,
  rotation = 'rotate-0',
  badge,
  className = '',
  animClass = '',
}) => {
  const meta = CHARACTER_ART[character] || CHARACTER_ART.innocent;

  return (
    <div
      className={`group relative rounded-2xl border-2 border-slate-800 bg-gradient-to-b ${meta.bg} p-5 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-400/10 ${rotation} ${animClass} ${className}`}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-black tracking-wider uppercase shadow-sm ${tagColor}`}>
          {tag}
        </span>
        {badge && (
          <span className="px-2 py-0.5 rounded bg-black/60 border border-slate-700 text-yellow-300 font-mono text-[10px]">
            {badge}
          </span>
        )}
      </div>

      {/* Comic Avatar Section */}
      <div className="flex items-center gap-3.5 my-3 pb-3 border-b border-slate-800/80">
        <div className="w-12 h-12 rounded-xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-2xl shadow-inner group-hover:rotate-6 transition-transform">
          <span>{meta.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold truncate">
            {meta.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">100% PANI VIBE</span>
          </div>
        </div>
      </div>

      {/* Malayalam Quote (High Impact Typography) */}
      <div className="space-y-1.5">
        <h4 className="font-malayalam text-xl sm:text-2xl font-black text-white leading-tight tracking-wide drop-shadow-sm group-hover:text-yellow-300 transition-colors">
          "{malayalamQuote}"
        </h4>
        <p className="font-mono text-xs text-yellow-200/90 font-medium">
          {englishTranslation}
        </p>
      </div>

      {subtext && (
        <p className="text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/60 leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
};
