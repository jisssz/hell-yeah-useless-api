import React, { useState } from 'react';
import { Terminal, Clock, ShieldCheck, AlertCircle, Trash2, Layers, Check, Copy } from 'lucide-react';
import { ExecutionResult, BASE_URL } from '../../services/apiClient';

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
      <div className="h-full min-h-[380px] rounded-xl border-2 border-yellow-400/40 bg-[#080c14] flex flex-col items-center justify-center p-8 text-center shadow-comic-yellow">
        {/* Animated 4-step journey */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
          <div className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400/40 text-blue-300 font-mono text-xs font-bold animate-pulse">
            1. CLIENT REQUEST 📡
          </div>
          <span className="text-yellow-400 font-bold hidden sm:inline">→</span>
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold animate-pulse" style={{ animationDelay: '0.2s' }}>
            2. NARAKAM GATEWAY ⚡
          </div>
          <span className="text-yellow-400 font-bold hidden sm:inline">→</span>
          <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold animate-pulse" style={{ animationDelay: '0.4s' }}>
            3. USELESS ENGINE ⚙️
          </div>
          <span className="text-yellow-400 font-bold hidden sm:inline">→</span>
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold animate-pulse" style={{ animationDelay: '0.6s' }}>
            4. SCENE COMPLETE 🔥
          </div>
        </div>

        <div className="w-8 h-8 rounded-full border-2 border-yellow-400/20 border-t-yellow-400 animate-spin mb-3" />
        <p className="text-sm font-bungee text-white tracking-wide">EXECUTING LIVE HTTP CALL...</p>
        <p className="text-xs font-mono text-yellow-400/80 mt-1 font-semibold">
          Instrumenting telemetry and calculating 99.8% uselessness
        </p>
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
            Ensure the backend is active on <code className="text-slate-400">{BASE_URL}</code>.
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
      <div className="h-full min-h-[440px] rounded-2xl border-2 border-slate-700/60 bg-gradient-to-b from-[#080d1a] via-[#050811] to-[#04060d] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-2xl shadow-black/80">
        {/* Background Radar / Blueprint Grid */}
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

        {/* High-Tech Radar Target Reticle */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 flex items-center justify-center relative">
            <div className="w-16 h-16 rounded-full border border-cyan-400/40 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-300/50 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-cyan-300 animate-pulse" />
              </div>
            </div>
            {/* Animated sweeping radar arm */}
            <div className="absolute inset-0 rounded-full animate-radar pointer-events-none">
              <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-cyan-400 origin-right absolute top-1/2 right-1/2" />
            </div>
            {/* Crosshairs */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400/60" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-cyan-400/60" />
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-cyan-400/60" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-cyan-400/60" />
          </div>
          <span className="absolute -bottom-2 -right-3 text-[9px] font-mono font-black bg-emerald-500 text-black px-1.5 py-0.5 rounded border border-black shadow-sm">
            READY
          </span>
        </div>

        {/* Title & Status */}
        <div className="space-y-2 relative z-10 max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            NASA MISSION CONTROL // TELEMETRY ARMED
          </div>
          <h4 className="text-base sm:text-lg font-bungee text-white tracking-wide">
            Awaiting Useless Payload
          </h4>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            Configure parameters on the left and click <span className="text-yellow-300 font-bold">"CHEYYAM"</span> to trigger high-precision telemetry over real HTTP.
          </p>
        </div>

        {/* Step Guide */}
        <div className="mt-8 grid grid-cols-3 gap-2 text-left w-full max-w-sm relative z-10 font-mono text-[10px]">
          <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
            <span className="text-purple-400 font-bold block mb-0.5">STEP 1</span>
            <span className="text-slate-400">Pick API</span>
          </div>
          <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60">
            <span className="text-cyan-400 font-bold block mb-0.5">STEP 2</span>
            <span className="text-slate-400">Set Params</span>
          </div>
          <div className="p-2.5 rounded-lg border border-yellow-400/30 bg-yellow-400/5">
            <span className="text-yellow-400 font-bold block mb-0.5">STEP 3</span>
            <span className="text-slate-300">Fire Call 🔥</span>
          </div>
        </div>

        {/* Humorous Malayalam footer */}
        <div className="mt-6 text-[11px] font-mono text-slate-500 relative z-10">
          "ഒരു റിക്വസ്റ്റ് അടിച്ചാലേ എന്തേലും കാണിക്കൂ!" • 100% Real Express Backend
        </div>
      </div>
    );
  }

  const isSuccess = result.status >= 200 && result.status < 300;
  const isRateLimited = result.status === 429;
  const isBadRequest = result.status === 400;
  const jsonString = typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2);

  const getStatusDisplay = () => {
    if (isSuccess) return `${result.status} SCENE OK BRO (200 OK)`;
    if (isRateLimited) return `429 MATHI CHETTA (RATE LIMIT)`;
    if (isBadRequest) return `400 CHETTA INPUT ONNU SHERIYAKK`;
    return `${result.status} ${result.statusText || 'PANI PAALI (ERROR)'}`;
  };

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
    <div className="response-pop rounded-2xl border-2 border-black bg-[#060a14] overflow-hidden flex flex-col shadow-[4px_4px_0_#000,0_0_35px_-5px_rgba(56,239,125,0.25)]">
      {/* Response Header Status Bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-[#0d1424] to-slate-900 border-b-2 border-black flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`px-3 py-1 rounded text-xs font-mono font-black tracking-wider border-2 border-black ${
              isSuccess
                ? 'bg-[#38ef7d] text-black shadow-comic-sm'
                : isRateLimited
                ? 'bg-[#ffe814] text-black shadow-comic-sm'
                : 'bg-[#ff3366] text-white shadow-comic-sm'
            }`}
          >
            {getStatusDisplay()}
          </span>

          <span className="flex items-center gap-1.5 text-xs font-mono text-yellow-300 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/30 font-bold">
            <Clock className="w-3.5 h-3.5 text-yellow-400" />
            <span>{result.durationMs}ms</span>
          </span>

          <span className="hidden sm:flex items-center gap-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>{apiTier}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-200 hover:text-black bg-slate-800 hover:bg-[#ffe814] px-3 py-1.5 rounded-lg border border-slate-600 transition-colors font-bold cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON</span>
              </>
            )}
          </button>
          <button
            onClick={onClear}
            title="Clear response"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 429 Rate Limit Warning Banner */}
      {isRateLimited && (
        <div className="px-4 py-2.5 bg-[#ffe814] border-b-2 border-black text-black text-xs font-mono font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-black" />
            <span>മതീടെയ്... കുറച്ചു കഴിഞ്ഞ് വാ! Rate limit exceeded (100 req/min). Calm down!</span>
          </div>
          {retryAfter && <span className="bg-black text-[#ffe814] px-2 py-0.5 rounded text-[10px]">Retry in {retryAfter}s</span>}
        </div>
      )}

      {/* Response Metadata Badges */}
      <div className="px-4 py-2 bg-black/60 border-b border-slate-800/80 flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
        {rateLimitRemaining && rateLimitTotal && (
          <div>
            Quota:{' '}
            <span className={Number(rateLimitRemaining) < 10 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {rateLimitRemaining}/{rateLimitTotal} remaining
            </span>
          </div>
        )}
        {requestId && (
          <div className="hidden md:block truncate max-w-[200px]">
            ID: <span className="text-slate-300 font-mono">{requestId}</span>
          </div>
        )}
        <div className="ml-auto text-[#38ef7d] font-bold flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          <span>Verified Render Gateway Response</span>
        </div>
      </div>

      {/* JSON Payload View */}
      <div className="p-4 overflow-x-auto max-h-[480px] font-mono text-xs leading-relaxed text-slate-100 bg-[#03060f]">
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
};
