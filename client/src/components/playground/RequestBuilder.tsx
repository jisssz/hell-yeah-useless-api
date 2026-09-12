import React from 'react';
import { Play, RotateCcw, Key, HelpCircle } from 'lucide-react';
import { ApiMetadata } from '../../types/api';


interface RequestBuilderProps {
  api: ApiMetadata;
  queryParams: Record<string, string>;
  onQueryParamChange: (key: string, value: string) => void;
  bodyFields: Record<string, string>;
  onBodyFieldChange: (key: string, value: string) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  onExecute: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const RequestBuilder: React.FC<RequestBuilderProps> = ({
  api,
  queryParams,
  onQueryParamChange,
  bodyFields,
  onBodyFieldChange,
  apiKey,
  onApiKeyChange,
  onExecute,
  onReset,
  isLoading,
}) => {
  const hasQueryParams = api.queryParams && api.queryParams.length > 0;
  const hasBodyFields = api.requestBodyFields && api.requestBodyFields.length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!isLoading) {
          onExecute();
        }
      }}
      className="space-y-6"
    >
      {/* Endpoint Description Header with Gradient Border */}
      <div className="p-4 rounded-xl border border-white/10 bg-gradient-to-r from-slate-900/90 to-[#0c1222] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 via-yellow-400 to-emerald-400" />
        <div className="flex items-center justify-between gap-2 mb-1.5 pt-1">
          <span className="font-mono text-sm font-black text-white">{api.name}</span>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {api.endpoint}
          </span>
        </div>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">{api.description}</p>
      </div>

      {/* Query Parameters Section (GET) */}
      {hasQueryParams && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Query Parameters</span>
            </label>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              URL Encoded
            </span>
          </div>

          <div className="space-y-3">
            {api.queryParams!.map((param) => (
              <div key={param.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 font-bold flex items-center gap-1">
                    {param.name}
                    {param.required && <span className="text-rose-400 font-black">*</span>}
                  </span>
                  <span className="text-slate-500 text-[11px]">{param.type}</span>
                </div>
                <input
                  type="text"
                  value={queryParams[param.name] ?? ''}
                  onChange={(e) => onQueryParamChange(param.name, e.target.value)}
                  placeholder={param.example ? `e.g. ${param.example}` : `Enter ${param.name}...`}
                  required={param.required}
                  className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all shadow-inner"
                />
                <p className="text-[11px] font-mono text-slate-400">{param.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Body Fields Section (POST) */}
      {hasBodyFields && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>Request Body (JSON)</span>
            </label>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
              application/json
            </span>
          </div>

          <div className="space-y-3">
            {api.requestBodyFields!.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-200 font-bold flex items-center gap-1">
                    {field.name}
                    {field.required && <span className="text-rose-400 font-black">*</span>}
                  </span>
                  <span className="text-slate-500 text-[11px]">{field.type}</span>
                </div>
                <input
                  type="text"
                  value={bodyFields[field.name] ?? ''}
                  onChange={(e) => onBodyFieldChange(field.name, e.target.value)}
                  placeholder={field.example ? `e.g. ${field.example}` : `Enter ${field.name}...`}
                  required={field.required}
                  className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all shadow-inner"
                />
                <p className="text-[11px] font-mono text-slate-400">{field.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No params info for /vibe and /motivation */}
      {!hasQueryParams && !hasBodyFields && (
        <div className="p-4 rounded-xl border border-amber-400/40 bg-amber-950/20 text-xs font-mono text-amber-200 flex items-start gap-3 shadow-sm">
          <HelpCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-yellow-300">പച്ചവെള്ളം പോലെ സിമ്പിൾ — ZERO INPUT REQUIRED</div>
            <p className="text-[11px] text-amber-200/80 leading-relaxed">
              This microservice generates deterministic existential chaos out of thin air. No parameters needed.
            </p>
          </div>
        </div>
      )}

      {/* Simulated API Key Input */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-200 font-bold flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-yellow-400" />
            <span>Simulated API Key (കള്ളത്താക്കോൽ)</span>
          </span>
          <span className="text-[10px] font-mono text-slate-500 uppercase">Optional</span>
        </div>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="Try 'uk_live_key' (Production) or 'uk_dev_key' (Sandbox)"
          className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
        />
        <p className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span>Tiers:</span>
          <code className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">uk_live_*</code>
          <code className="text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">uk_dev_*</code>
          <code className="text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">guest-access</code>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-3">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 font-mono text-xs font-black py-3.5 px-5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 text-black border-2 border-black shadow-[4px_4px_0_#000,0_0_25px_rgba(250,204,21,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Play className={`w-4 h-4 ${isLoading ? 'animate-spin text-black' : 'fill-current'}`} />
          <span className="tracking-wide">
            {isLoading ? 'പണി നടക്കുന്നു... (EXECUTING)' : 'CHEYYAM (SEND REAL REQUEST) 🔥'}
          </span>
        </button>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 text-xs font-mono font-bold py-3.5 px-4 rounded-xl bg-slate-800 text-slate-300 border-2 border-slate-600 hover:bg-slate-700 hover:text-white active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET</span>
        </button>
      </div>
    </form>
  );
};
