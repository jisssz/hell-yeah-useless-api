import React from 'react';
import { History, ArrowUpRight, Trash2 } from 'lucide-react';
import { EndpointBadge } from '../EndpointBadge';

export interface HistoryItem {
  id: string;
  apiSlug: string;
  method: 'GET' | 'POST';
  endpoint: string;
  queryParams: Record<string, string>;
  bodyFields: Record<string, string>;
  apiKey: string;
  status: number;
  durationMs: number;
  timestamp: string;
}

interface RequestHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export const RequestHistory: React.FC<RequestHistoryProps> = ({
  history,
  onSelect,
  onClear,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 pt-6 border-t border-slate-800/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
          <History className="w-3.5 h-3.5 text-emerald-400" />
          <span>Local Request History</span>
          <span className="text-[10px] text-slate-500">({history.length}/10)</span>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] font-mono text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>

      <div className="space-y-1.5 font-mono text-xs max-h-56 overflow-y-auto pr-1">
        {history.map((item) => {
          const isSuccess = item.status >= 200 && item.status < 300;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              type="button"
              className="w-full p-2.5 rounded-lg border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-700 flex items-center justify-between gap-3 text-left transition-colors group"
            >
              <div className="flex items-center gap-2 truncate">
                <EndpointBadge method={item.method} />
                <span className="text-slate-200 truncate">{item.endpoint}</span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 text-[11px] text-slate-400">
                <span
                  className={`px-1.5 py-0.5 rounded font-bold ${
                    isSuccess
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-rose-400 bg-rose-500/10'
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-cyan-400">{item.durationMs}ms</span>
                <span className="text-slate-500 hidden sm:inline-block">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
