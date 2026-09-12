import React from 'react';
import { ApiMetadata } from '../../types/api';
import { EndpointBadge } from '../EndpointBadge';

interface ApiSelectorProps {
  apis: ApiMetadata[];
  selectedApi: ApiMetadata;
  onSelect: (api: ApiMetadata) => void;
}

const API_THEMES: Record<string, {
  selectedBorder: string;
  selectedBg: string;
  selectedGlow: string;
  accentText: string;
  dotColor: string;
}> = {
  vibe: {
    selectedBorder: 'border-purple-400',
    selectedBg: 'bg-purple-950/40',
    selectedGlow: 'shadow-[0_0_25px_-5px_rgba(168,85,247,0.4),3px_3px_0_#000]',
    accentText: 'text-purple-300',
    dotColor: 'bg-purple-400',
  },
  motivation: {
    selectedBorder: 'border-yellow-400',
    selectedBg: 'bg-amber-950/40',
    selectedGlow: 'shadow-[0_0_25px_-5px_rgba(250,204,21,0.4),3px_3px_0_#000]',
    accentText: 'text-yellow-300',
    dotColor: 'bg-yellow-400',
  },
  necessity: {
    selectedBorder: 'border-lime-400',
    selectedBg: 'bg-emerald-950/40',
    selectedGlow: 'shadow-[0_0_25px_-5px_rgba(163,230,53,0.4),3px_3px_0_#000]',
    accentText: 'text-lime-300',
    dotColor: 'bg-lime-400',
  },
  decision: {
    selectedBorder: 'border-blue-400',
    selectedBg: 'bg-blue-950/40',
    selectedGlow: 'shadow-[0_0_25px_-5px_rgba(59,130,246,0.4),3px_3px_0_#000]',
    accentText: 'text-blue-300',
    dotColor: 'bg-blue-400',
  },
  roast: {
    selectedBorder: 'border-pink-500',
    selectedBg: 'bg-rose-950/40',
    selectedGlow: 'shadow-[0_0_25px_-5px_rgba(244,63,94,0.4),3px_3px_0_#000]',
    accentText: 'text-pink-300',
    dotColor: 'bg-pink-400',
  },
  excuse: {
    selectedBorder: 'border-amber-400',
    selectedBg: 'bg-orange-950/40',
    selectedGlow: 'shadow-[0_0_25px_-5px_rgba(249,115,22,0.4),3px_3px_0_#000]',
    accentText: 'text-amber-300',
    dotColor: 'bg-amber-400',
  },
};

export const ApiSelector: React.FC<ApiSelectorProps> = ({
  apis,
  selectedApi,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span>Select Target Microservice (ആരെ വേണം?)</span>
        </label>
        <span className="text-[11px] font-mono font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/30">
          6 Live Real Endpoints
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {apis.map((api) => {
          const isSelected = api.slug === selectedApi.slug;
          const theme = API_THEMES[api.slug] || {
            selectedBorder: 'border-emerald-400',
            selectedBg: 'bg-slate-900',
            selectedGlow: 'shadow-comic',
            accentText: 'text-white',
            dotColor: 'bg-emerald-400',
          };

          return (
            <button
              key={api.slug}
              type="button"
              onClick={() => onSelect(api)}
              className={`text-left p-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between relative cursor-pointer group ${
                isSelected
                  ? `${theme.selectedBorder} ${theme.selectedBg} ${theme.selectedGlow} scale-[1.02] z-10 ring-1 ring-white/20`
                  : 'border-slate-800/90 bg-[#0a0f1d]/80 hover:bg-slate-900/90 hover:border-slate-700 hover:scale-[1.01]'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.dotColor} opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-4 w-4 ${theme.dotColor} border border-black text-[9px] font-black items-center justify-center text-black`}>
                    ✓
                  </span>
                </span>
              )}

              <div className="flex items-center justify-between gap-1.5 mb-2.5">
                <EndpointBadge method={api.method} />
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-black/60 text-yellow-300 border border-yellow-400/40' : 'bg-slate-800/80 text-slate-400'
                }`}>
                  {api.uselessnessScore}%
                </span>
              </div>
              <div>
                <div className={`font-mono text-xs font-black truncate transition-colors ${
                  isSelected ? `${theme.accentText}` : 'text-slate-200 group-hover:text-white'
                }`}>
                  {api.name}
                </div>
                <div className="font-mono text-[11px] text-slate-400/90 truncate mt-0.5">
                  {api.endpoint}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
