import { Request, Response, NextFunction } from 'express';

export interface RequestLog {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
  durationMs: number;
  ip: string;
  userAgent: string;
  apiKeyTier?: string;
}

export interface AnalyticsOverview {
  totalRequests: number;
  requestsToday: number;
  averageLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  errorRatePercent: number;
  globalUselessness: number;
  requestsPerHour: number;
  requestsByEndpoint: Record<string, number>;
  requestsByMethod: Record<string, number>;
  statusBreakdown: Record<string, number>;
  recentLogs: RequestLog[];
  serverUptimeSeconds: number;
}

class TelemetryStore {
  private static instance: TelemetryStore;
  private logs: RequestLog[] = [];
  private readonly maxLogs = 200;
  private startTime: number = Date.now();

  private constructor() {}

  public static getInstance(): TelemetryStore {
    if (!TelemetryStore.instance) {
      TelemetryStore.instance = new TelemetryStore();
    }
    return TelemetryStore.instance;
  }

  public addLog(log: RequestLog) {
    this.logs.unshift(log);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }
  }

  public getRecentLogs(limit = 50): RequestLog[] {
    return this.logs.slice(0, limit);
  }

  public clearLogs() {
    this.logs = [];
    this.startTime = Date.now();
  }

  public getOverview(): AnalyticsOverview {
    const total = this.logs.length;
    const uptimeSec = Math.max(1, Math.floor((Date.now() - this.startTime) / 1000));

    if (total === 0) {
      return {
        totalRequests: 0,
        requestsToday: 0,
        averageLatencyMs: 0,
        p50LatencyMs: 0,
        p95LatencyMs: 0,
        errorRatePercent: 0,
        globalUselessness: 100,
        requestsPerHour: 0,
        requestsByEndpoint: {},
        requestsByMethod: {},
        statusBreakdown: {},
        recentLogs: [],
        serverUptimeSeconds: uptimeSec
      };
    }

    let totalDuration = 0;
    let errorCount = 0;
    const durations: number[] = [];
    const requestsByEndpoint: Record<string, number> = {};
    const requestsByMethod: Record<string, number> = {};
    const statusBreakdown: Record<string, number> = {};

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startOfDayMs = startOfDay.getTime();
    let requestsToday = 0;

    for (const log of this.logs) {
      totalDuration += log.durationMs;
      durations.push(log.durationMs);

      if (new Date(log.timestamp).getTime() >= startOfDayMs) {
        requestsToday++;
      }

      if (log.statusCode >= 400) {
        errorCount++;
      }

      requestsByMethod[log.method] = (requestsByMethod[log.method] || 0) + 1;
      requestsByEndpoint[log.path] = (requestsByEndpoint[log.path] || 0) + 1;
      statusBreakdown[log.statusCode.toString()] = (statusBreakdown[log.statusCode.toString()] || 0) + 1;
    }

    durations.sort((a, b) => a - b);
    const p50Index = Math.floor(durations.length * 0.5);
    const p95Index = Math.min(Math.floor(durations.length * 0.95), durations.length - 1);

    const averageLatencyMs = Number((totalDuration / total).toFixed(2));
    const p50LatencyMs = Number((durations[p50Index] || 0).toFixed(2));
    const p95LatencyMs = Number((durations[p95Index] || 0).toFixed(2));
    const errorRatePercent = Number(((errorCount / total) * 100).toFixed(2));
    const requestsPerHour = Number(((total / uptimeSec) * 3600).toFixed(1));

    // Global uselessness index: scales with volume, absurdity & wasted cpu cycles
    const globalUselessness = Math.min(9999, 100 + total * 13 + Math.floor(totalDuration * 1.5));

    return {
      totalRequests: total,
      requestsToday,
      averageLatencyMs,
      p50LatencyMs,
      p95LatencyMs,
      errorRatePercent,
      globalUselessness,
      requestsPerHour,
      requestsByEndpoint,
      requestsByMethod,
      statusBreakdown,
      recentLogs: this.logs.slice(0, 20),
      serverUptimeSeconds: uptimeSec
    };
  }
}

export const telemetryStore = TelemetryStore.getInstance();

export const telemetryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  const requestId = 'req_' + Math.random().toString(36).substring(2, 9);
  const rawIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'unknown-developer-client';

  res.setHeader('X-Request-Id', requestId);

  // Hook into response finish to capture final latency and status code
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationMs = Number((diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2));

    // Record X-Response-Time header logic (for client logs)
    const cleanPath = req.originalUrl.split('?')[0];

    // Telemetry tracks /api/ routes but ignores internal analytics polling to avoid recursive pollution
    if (req.originalUrl.startsWith('/api') && !req.originalUrl.startsWith('/api/v1/analytics')) {
      const tier = (res.getHeader('X-API-Tier') as string) || 'guest-open-access';

      telemetryStore.addLog({
        id: requestId,
        timestamp: new Date().toISOString(),
        method: req.method,
        path: cleanPath,
        statusCode: res.statusCode,
        durationMs,
        ip: rawIp,
        userAgent,
        apiKeyTier: tier
      });
    }
  });

  // Also calculate header for outgoing response
  const originalEnd = res.end;
  (res as any).end = function (...args: unknown[]) {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    if (!res.headersSent) {
      res.setHeader('X-Response-Time', `${durationMs}ms`);
    }
    return originalEnd.apply(this, args as never);
  };

  next();
};
