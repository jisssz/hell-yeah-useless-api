export type HttpMethod = 'GET' | 'POST';

export interface ParamDefinition {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface ApiMetadata {
  slug: string;
  name: string;
  method: HttpMethod;
  endpoint: string;
  description: string;
  tagline: string;
  category: string;
  explanation: string;
  requiredInput: string;
  uselessnessScore: number;
  queryParams?: ParamDefinition[];
  requestBodyFields?: ParamDefinition[];
  exampleRequest: {
    curl: string;
    body?: Record<string, unknown>;
  };
  exampleResponse: Record<string, unknown>;
}

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
