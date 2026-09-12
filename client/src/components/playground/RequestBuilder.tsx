import React from 'react';
import { Play, RotateCcw, Key, HelpCircle } from 'lucide-react';
import { ApiMetadata } from '../../types/api';
import { Button } from '../Button';

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
      {/* Endpoint Description Header */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-mono text-sm font-bold text-white">{api.name}</span>
          <span className="text-[11px] font-mono text-emerald-400">{api.endpoint}</span>
        </div>
        <p className="text-xs text-slate-400 font-mono leading-relaxed">{api.description}</p>
      </div>

      {/* Query Parameters Section (GET) */}
      {hasQueryParams && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Query Parameters
            </label>
            <span className="text-[11px] font-mono text-slate-500">URL Encoded</span>
          </div>

          <div className="space-y-3">
            {api.queryParams!.map((param) => (
              <div key={param.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold flex items-center gap-1">
                    {param.name}
                    {param.required && <span className="text-rose-400">*</span>}
                  </span>
                  <span className="text-slate-500">{param.type}</span>
                </div>
                <input
                  type="text"
                  value={queryParams[param.name] ?? ''}
                  onChange={(e) => onQueryParamChange(param.name, e.target.value)}
                  placeholder={param.example ? `e.g. ${param.example}` : `Enter ${param.name}...`}
                  required={param.required}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <p className="text-[11px] font-mono text-slate-500">{param.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Body Fields Section (POST) */}
      {hasBodyFields && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Request Body (JSON)
            </label>
            <span className="text-[11px] font-mono text-slate-500">application/json</span>
          </div>

          <div className="space-y-3">
            {api.requestBodyFields!.map((field) => (
              <div key={field.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold flex items-center gap-1">
                    {field.name}
                    {field.required && <span className="text-rose-400">*</span>}
                  </span>
                  <span className="text-slate-500">{field.type}</span>
                </div>
                <input
                  type="text"
                  value={bodyFields[field.name] ?? ''}
                  onChange={(e) => onBodyFieldChange(field.name, e.target.value)}
                  placeholder={field.example ? `e.g. ${field.example}` : `Enter ${field.name}...`}
                  required={field.required}
                  className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
                <p className="text-[11px] font-mono text-slate-500">{field.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No params info for /vibe and /motivation */}
      {!hasQueryParams && !hasBodyFields && (
        <div className="p-3.5 rounded-lg border border-slate-800/80 bg-slate-950/40 text-xs font-mono text-slate-400 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>This endpoint requires zero inputs. Pointless computation is generated deterministically.</span>
        </div>
      )}

      {/* Simulated API Key Input */}
      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-indigo-400" />
            API Key
          </span>
          <span className="text-slate-500">Optional</span>
        </div>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="Enter API key (e.g. uk_live_mykey or uk_dev_sandbox)"
          className="w-full bg-slate-900/90 border border-slate-800 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        <p className="text-[11px] font-mono text-slate-500">
          Backend recognizes keys with <code className="text-slate-400">uk_live_*</code> (Production) or <code className="text-slate-400">uk_dev_*</code> (Sandbox).
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          icon={<Play className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
          className="flex-1 font-mono text-xs font-bold"
        >
          {isLoading ? 'Executing Request...' : 'Send Request'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onReset}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          className="shrink-0 text-xs font-mono"
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
