import React, { useEffect, useState } from 'react';
import { RefreshCw, Activity, Clock, ShieldCheck, Cpu, Flame, Database } from 'lucide-react';
import { fetchAnalyticsOverview } from '../services/apiClient';
import { AnalyticsOverview } from '../types/api';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const overview = await fetchAnalyticsOverview();
      setData(overview);
      setLastRefreshed(new Date());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to reach API gateway');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    // Auto-refresh telemetry every 5 seconds
    const interval = setInterval(loadAnalytics, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <PageHeader
        badge={<Badge variant="brand">Live Gateway Telemetry</Badge>}
        title="Analytics & Telemetry"
        description="Real-time system health, in-memory telemetry, and calculated global uselessness based on live HTTP traffic."
        actions={
          <div className="flex items-center gap-3">
            {lastRefreshed && (
              <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                Updated {lastRefreshed.toLocaleTimeString()}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={loadAnalytics}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
            >
              Refresh
            </Button>
          </div>
        }
      />

      {loading && !data && <LoadingState message="Fetching live telemetry from backend..." />}

      {error && !data && (
        <ErrorState
          title="Telemetry Feed Offline"
          message={error}
          onRetry={loadAnalytics}
        />
      )}

      {data && (
        <div className="space-y-8">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Total Requests</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {data.totalRequests}
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-1 block">In-memory buffer</span>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Requests Today</span>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">
                {data.requestsToday}
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-1 block">Since 00:00 UTC</span>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Avg Latency</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                {data.averageLatencyMs} <span className="text-xs font-normal">ms</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-1 block">
                p95: {data.p95LatencyMs}ms
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Error Rate</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                {data.errorRatePercent}%
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-1 block">4xx & 5xx responses</span>
            </div>

            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Global Score</span>
                <Flame className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-mono">
                {data.globalUselessness}
              </div>
              <span className="text-[11px] font-mono text-slate-500 mt-1 block">Wasted cycles metric</span>
            </div>
          </div>

          {/* Breakdowns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requests by Endpoint */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center justify-between">
                <span>Requests by Endpoint</span>
                <Database className="w-4 h-4 text-emerald-400" />
              </h3>

              {Object.keys(data.requestsByEndpoint).length === 0 ? (
                <p className="text-xs font-mono text-slate-500 py-6 text-center">No endpoint traffic logged yet.</p>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(data.requestsByEndpoint).map(([endpoint, count]) => {
                    const percentage = Math.round((count / data.totalRequests) * 100);
                    return (
                      <div key={endpoint} className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span className="truncate max-w-[240px] text-emerald-400">{endpoint}</span>
                          <span className="text-slate-400 font-bold">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Status Code Breakdown */}
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center justify-between">
                <span>HTTP Status Breakdown</span>
                <Activity className="w-4 h-4 text-indigo-400" />
              </h3>

              {Object.keys(data.statusBreakdown).length === 0 ? (
                <p className="text-xs font-mono text-slate-500 py-6 text-center">No status codes recorded yet.</p>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {Object.entries(data.statusBreakdown).map(([status, count]) => {
                    const percentage = Math.round((count / data.totalRequests) * 100);
                    const isSuccess = status.startsWith('2');
                    const isClientError = status.startsWith('4');
                    const color = isSuccess ? 'bg-emerald-500' : isClientError ? 'bg-amber-500' : 'bg-rose-500';
                    const textColor = isSuccess ? 'text-emerald-400' : isClientError ? 'text-amber-400' : 'text-rose-400';

                    return (
                      <div key={status} className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span className={`font-bold ${textColor}`}>HTTP {status}</span>
                          <span className="text-slate-400 font-bold">{count} ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`${color} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Requests Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Live Request Stream
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Latest requests captured in the ring buffer
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Displaying latest {data.recentLogs.length} logs
              </span>
            </div>

            {data.recentLogs.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-slate-500">
                No recent requests. Make a query to populate telemetry.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Path</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Latency</th>
                      <th className="p-3.5">Tier</th>
                      <th className="p-3.5">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {data.recentLogs.map((log) => {
                      const isSuccess = log.statusCode < 400;
                      return (
                        <tr key={log.id} className="hover:bg-slate-800/20">
                          <td className="p-3.5 font-bold text-slate-100">{log.method}</td>
                          <td className="p-3.5 text-emerald-400">{log.path}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded font-bold ${
                                isSuccess
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {log.statusCode}
                            </span>
                          </td>
                          <td className="p-3.5 text-cyan-400">{log.durationMs}ms</td>
                          <td className="p-3.5 text-slate-400">{log.apiKeyTier || 'guest'}</td>
                          <td className="p-3.5 text-slate-500">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
