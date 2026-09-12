import React from 'react';
import { ApiMetadata } from '../../types/api';
import { EndpointBadge } from '../EndpointBadge';
import { Badge } from '../Badge';

interface ApiSelectorProps {
  apis: ApiMetadata[];
  selectedApi: ApiMetadata;
  onSelect: (api: ApiMetadata) => void;
}

export const ApiSelector: React.FC<ApiSelectorProps> = ({
  apis,
  selectedApi,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          Target Endpoint
        </label>
        <span className="text-xs font-mono text-slate-500">{apis.length} available</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {apis.map((api) => {
          const isSelected = api.slug === selectedApi.slug;
          return (
            <button
              key={api.slug}
              type="button"
              onClick={() => onSelect(api)}
              className={`text-left p-3 rounded-xl border transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500/60 bg-slate-900 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5 mb-2">
                <EndpointBadge method={api.method} />
                <Badge variant={isSelected ? 'brand' : 'neutral'} size="sm">
                  {api.uselessnessScore}%
                </Badge>
              </div>
              <div>
                <div className={`font-mono text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {api.name}
                </div>
                <div className="font-mono text-[11px] text-slate-500 truncate mt-0.5">
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
