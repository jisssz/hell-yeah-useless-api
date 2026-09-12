import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Activity, Clock, ShieldCheck, Cpu, Flame, Database, Terminal, Play, Zap } from 'lucide-react';
import { fetchAnalyticsOverview, BASE_URL } from '../services/apiClient';
import { AnalyticsOverview } from '../types/api';
import { PageHeader } from '../components/PageHeader';

import { Button } from '../components/Button';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EndpointBadge } from '../components/EndpointBadge';

// Distinct color mapping for endpoints in distribution charts
const ENDPOINT_COLORS: Record<string, { bar: string; text: string }> = {
  '/api/v1/vibe': { bar: 'bg-emerald-500', text: 'text-emerald-400' },
  '/api/v1/motivation': { bar: 'bg-indigo-500', text: 'text-indigo-400' },
  '/api/v1/necessity': { bar: 'bg-cyan-500', text: 'text-cyan-400' },
  '/api/v1/decision': { bar: 'bg-purple-500', text: 'text-purple-400' },
  '/api/v1/roast': { bar: 'bg-rose-500', text: 'text-rose-400' },
  '/api/v1/excuse': { bar: 'bg-amber-500', text: 'text-amber-400' },
};

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const isFetchingRef = useRef<boolean>(false);

  const loadAnalytics = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const overview = await fetchAnalyticsOverview();
      setData(overview);
      setLastRefreshed(new Date());
      setIsLive(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gateway connection failed');
      setIsLive(false);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadAnalytics, 5000);
    return () => clearInterval(interval);
  }, [loadAnalytics]);

  // Compute fastest and slowest latency from actual recent logs if available
  const { fastestLatency, slowestLatency } = React.useMemo(() => {
    if (!data || data.recentLogs.length === 0) {
      return { fastestLatency: null, slowestLatency: null };
    }
    const durations = data.recentLogs.map((log) => log.durationMs);
    return {
      fastestLatency: Math.min(...durations),
      slowestLatency: Math.max(...durations),
    };
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <PageHeader
        badge={
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border-2 border-black ${isLive ? 'bg-[#38ef7d] text-black shadow-comic-sm' : 'bg-[#ff3366] text-white shadow-comic-sm'}`}>
              {isLive ? '● LIVE CONTROL ROOM' : '○ OFFLINE'}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {isLive ? 'Connected to Render Gateway' : `Connecting to ${BASE_URL}`}
            </span>
          </div>
        }
        title="നരകം EVIDEHHHH ? CONTROL ROOM"
        description="Monitoring absolutely critical nonsense. Real-time in-memory telemetry, SLA tracking, and live requests captured straight from the Render backend."
        actions={
          <div className="flex items-center gap-3">
            {lastRefreshed && (
              <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                Auto-refreshing (updated {lastRefreshed.toLocaleTimeString()})
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={loadAnalytics}
              disabled={loading}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
              className="text-xs font-mono"
            >
              Refresh
            </Button>
            <Link
              to="/playground"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ffe814] hover:bg-yellow-300 text-black border-2 border-black font-mono text-xs font-black transition-colors shadow-comic-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test APIs</span>
            </Link>
          </div>
        }
      />

      {loading && !data && <LoadingState message="Connecting to telemetry ring buffer..." />}

      {error && !data && (
        <ErrorState
          title="Telemetry Gateway Offline"
          message={error}
          onRetry={loadAnalytics}
        />
      )}

      {data && data.totalRequests === 0 && (
        <div className="text-center py-20 px-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20 max-w-lg mx-auto space-y-4 font-mono">
          <Terminal className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">ഇതുവരെ ഒരു പണിയും കിട്ടിയിട്ടില്ല.</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              നാരങ്ങാവെള്ളം ഓർഡർ ചെയ്യാൻ ആരുമില്ല... The infrastructure is ready. Humanity simply hasn't needed it yet.
            </p>
          </div>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffe814] text-black border-2 border-black text-xs font-black font-mono shadow-comic hover:bg-yellow-300 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Open Playground</span>
          </Link>
        </div>
      )}

      {data && data.totalRequests > 0 && (
        <div className="space-y-10">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Total Requests */}
            <div className="p-4 rounded-xl border-2 border-black bg-slate-900/90 shadow-comic-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">TOTAL PANI</span>
                <Activity className="w-4 h-4 text-[#38ef7d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {data.totalRequests.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">ആകെ അടിച്ച റിക്വസ്റ്റ്</span>
            </div>

            {/* Requests Today */}
            <div className="p-4 rounded-xl border-2 border-black bg-slate-900/90 shadow-comic-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">TODAY'S PANI</span>
                <Clock className="w-4 h-4 text-[#ffe814]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ffe814] font-mono">
                {data.requestsToday.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">ഇന്നത്തെ പണി</span>
            </div>

            {/* Average Latency */}
            <div className="p-4 rounded-xl border-2 border-black bg-slate-900/90 shadow-comic-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">VEGAM (LATENCY)</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                {data.averageLatencyMs} <span className="text-xs font-normal">ms</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">p95: {data.p95LatencyMs}ms</span>
            </div>

            {/* Fastest / Slowest */}
            <div className="p-4 rounded-xl border-2 border-black bg-slate-900/90 shadow-comic-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">VEGAM RANGE</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-sm font-extrabold text-white font-mono mt-1">
                Min: <span className="text-emerald-400">{fastestLatency ?? '—'}ms</span>
              </div>
              <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                Max: <span className="text-rose-400">{slowestLatency ?? '—'}ms</span>
              </div>
            </div>

            {/* Error Rate */}
            <div className="p-4 rounded-xl border-2 border-black bg-slate-900/90 shadow-comic-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">PANI PAALI</span>
                <ShieldCheck className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
                {data.errorRatePercent}%
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">4xx &amp; 5xx calls</span>
            </div>

            {/* Global Score */}
            <div className="p-4 rounded-xl border-2 border-black bg-slate-900/90 shadow-comic-sm">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">PANI INDEX</span>
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">
                {data.globalUselessness}
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1 block">തട്ടിപ്പ് സ്കോർ</span>
            </div>
          </div>

          {/* Breakdown Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Requests by Endpoint */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Requests by Endpoint</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(data.requestsByEndpoint).map(([endpoint, count]) => {
                  const percentage = Math.round((count / data.totalRequests) * 100);
                  const colorConfig = ENDPOINT_COLORS[endpoint] || { bar: 'bg-slate-600', text: 'text-slate-300' };

                  return (
                    <div key={endpoint} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span className={`truncate max-w-[260px] font-bold ${colorConfig.text}`}>{endpoint}</span>
                        <span className="text-slate-400 font-bold">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${colorConfig.bar} h-full rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(4, percentage)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. HTTP Status Breakdown */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center justify-between">
                <span>HTTP Status Code Distribution</span>
                <Activity className="w-4 h-4 text-indigo-400" />
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(data.statusBreakdown).map(([status, count]) => {
                  const percentage = Math.round((count / data.totalRequests) * 100);
                  const isSuccess = status.startsWith('2');
                  const isRateLimit = status === '429';
                  const isClientError = status.startsWith('4') && !isRateLimit;
                  const color = isSuccess
                    ? 'bg-emerald-500'
                    : isRateLimit
                    ? 'bg-amber-500'
                    : isClientError
                    ? 'bg-orange-500'
                    : 'bg-rose-500';
                  const textColor = isSuccess
                    ? 'text-emerald-400'
                    : isRateLimit
                    ? 'text-amber-400'
                    : isClientError
                    ? 'text-orange-400'
                    : 'text-rose-400';

                  const label =
                    status === '200'
                      ? '200 OK'
                      : status === '400'
                      ? '400 Bad Request'
                      : status === '404'
                      ? '404 Not Found'
                      : status === '429'
                      ? '429 Rate Limit'
                      : `HTTP ${status}`;

                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span className={`font-bold ${textColor}`}>{label}</span>
                        <span className="text-slate-400 font-bold">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${color} h-full rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(4, percentage)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Live Request Stream Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Live Request Stream
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Real HTTP calls captured by the in-memory telemetry middleware
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Latest {data.recentLogs.length} events
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Method</th>
                    <th className="p-3.5">Endpoint</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Latency</th>
                    <th className="p-3.5">API Tier</th>
                    <th className="p-3.5">Client IP</th>
                    <th className="p-3.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {data.recentLogs.map((log) => {
                    const isSuccess = log.statusCode >= 200 && log.statusCode < 300;
                    const isRateLimited = log.statusCode === 429;
                    return (
                      <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5">
                          <EndpointBadge method={log.method as 'GET' | 'POST'} />
                        </td>
                        <td className="p-3.5 font-bold text-emerald-400">{log.path}</td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                              isSuccess
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : isRateLimited
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {log.statusCode}
                          </span>
                        </td>
                        <td className="p-3.5 text-cyan-400">{log.durationMs}ms</td>
                        <td className="p-3.5 text-slate-400">{log.apiKeyTier || 'guest'}</td>
                        <td className="p-3.5 text-slate-500">{log.ip}</td>
                        <td className="p-3.5 text-slate-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
