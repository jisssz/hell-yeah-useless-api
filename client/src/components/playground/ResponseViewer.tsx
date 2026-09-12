import React, { useState } from 'react';
import { Terminal, Clock, ShieldCheck, AlertCircle, Trash2, Layers, Check, Copy } from 'lucide-react';
import { ExecutionResult } from '../../services/apiClient';

interface ResponseViewerProps {
  result: ExecutionResult | null;
  error: string | null;
  isLoading: boolean;
  onClear: () => void;
}

export const ResponseViewer: React.FC<ResponseViewerProps> = ({
  result,
  error,
  isLoading,
  onClear,
}) => {
  const [copied, setCopied] = useState(false);

  if (isLoading) {
    return (
      <div className="h-full min-h-[380px] rounded-xl border border-slate-800 bg-[#080c14] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin mb-4" />
        <p className="text-sm font-mono text-slate-300 font-semibold">Executing Live HTTP Call...</p>
        <p className="text-xs font-mono text-slate-500 mt-1">Instrumenting telemetry and calculating uselessness</p>
      </div>
    );
  }

  if (error && !result) {
    return (
      <div className="h-full min-h-[380px] rounded-xl border border-rose-900/40 bg-rose-950/10 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 text-rose-400 font-mono text-sm font-bold mb-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Connection Failure</span>
          </div>
          <p className="text-xs font-mono text-rose-300/80 leading-relaxed">{error}</p>
          <p className="text-[11px] font-mono text-slate-500 mt-4">
            Ensure the backend is active on <code className="text-slate-400">http://localhost:3001</code>.
          </p>
        </div>
        <button
          onClick={onClear}
          className="self-end text-xs font-mono text-slate-400 hover:text-slate-200 mt-4"
        >
          Clear
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full min-h-[380px] rounded-xl border border-dashed border-slate-800 bg-slate-950/40 flex flex-col items-center justify-center p-8 text-center text-slate-500">
        <Terminal className="w-10 h-10 text-slate-700 mb-3" />
        <p className="text-sm font-mono text-slate-400 font-semibold">Ready to Execute</p>
        <p className="text-xs font-mono text-slate-600 max-w-xs mt-1">
          Configure parameters on the left and click "Send Request" to trigger a real HTTP call.
        </p>
      </div>
    );
  }

  const isSuccess = result.status >= 200 && result.status < 300;
  const isRateLimited = result.status === 429;
  const jsonString = typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore fallback
    }
  };

  const apiTier = result.headers['x-api-tier'] || 'guest-open-access';
  const rateLimitRemaining = result.headers['x-ratelimit-remaining'];
  const rateLimitTotal = result.headers['x-ratelimit-limit'];
  const retryAfter = result.headers['retry-after'];
  const requestId = result.headers['x-request-id'];

  return (
    <div className="rounded-xl border border-slate-800 bg-[#080c14] overflow-hidden flex flex-col">
      {/* Response Header Status Bar */}
      <div className="px-4 py-3 bg-slate-900/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider ${
              isSuccess
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : isRateLimited
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {result.status} {result.statusText || (isSuccess ? 'OK' : 'ERROR')}
          </span>

          <span className="flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
            <Clock className="w-3 h-3 text-cyan-400" />
            {result.durationMs}ms
          </span>

          <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            {apiTier}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            onClick={onClear}
            title="Clear response"
            className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 429 Rate Limit Warning Banner */}
      {isRateLimited && (
        <div className="px-4 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Rate limit exceeded (100 req/min). Please calm down.</span>
          </div>
          {retryAfter && <span className="font-bold">Retry in {retryAfter}s</span>}
        </div>
      )}

      {/* Response Metadata Badges */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
        {rateLimitRemaining && rateLimitTotal && (
          <div>
            Quota:{' '}
            <span className={Number(rateLimitRemaining) < 10 ? 'text-amber-400 font-bold' : 'text-slate-200'}>
              {rateLimitRemaining}/{rateLimitTotal}
            </span>
          </div>
        )}
        {requestId && (
          <div className="hidden md:block truncate max-w-[200px]">
            ID: <span className="text-slate-300">{requestId}</span>
          </div>
        )}
        <div className="ml-auto text-emerald-400/80 flex items-center gap-1">
          <Layers className="w-3 h-3" />
          <span>Real Backend Response</span>
        </div>
      </div>

      {/* JSON Payload View */}
      <div className="p-4 overflow-x-auto max-h-[480px] font-mono text-xs leading-relaxed text-slate-200">
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
};
