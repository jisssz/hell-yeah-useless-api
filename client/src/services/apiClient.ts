import { AnalyticsOverview } from '../types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export class ApiError extends Error {
  public statusCode: number;
  public data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

export async function fetchHealth(): Promise<{ status: string; service: string; version: string }> {
  const res = await fetch(`${BASE_URL}/health`);
  if (!res.ok) {
    throw new ApiError(`Health check failed with status ${res.status}`, res.status);
  }
  return res.json();
}

export async function fetchAnalyticsOverview(): Promise<AnalyticsOverview> {
  const res = await fetch(`${BASE_URL}/api/v1/analytics/overview`);
  if (!res.ok) {
    throw new ApiError(`Failed to fetch analytics: ${res.statusText}`, res.status);
  }
  return res.json();
}

export async function resetAnalytics(): Promise<{ status: string; message: string }> {
  const res = await fetch(`${BASE_URL}/api/analytics/reset`, { method: 'POST' });
  if (!res.ok) {
    throw new ApiError(`Failed to reset analytics: ${res.statusText}`, res.status);
  }
  return res.json();
}

export interface ExecutionResult {
  status: number;
  statusText: string;
  durationMs: number;
  headers: Record<string, string>;
  data: unknown;
}

export async function executeApiCall(
  endpoint: string,
  method: 'GET' | 'POST',
  body?: unknown,
  customHeaders: Record<string, string> = {}
): Promise<ExecutionResult> {
  const start = performance.now();
  const url = `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (method === 'POST' && body) {
    headers['Content-Type'] = 'application/json';
    options.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);
    const durationMs = Math.round(performance.now() - start);

    const resHeaders: Record<string, string> = {};
    res.headers.forEach((val, key) => {
      resHeaders[key] = val;
    });

    let data: unknown;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    return {
      status: res.status,
      statusText: res.statusText,
      durationMs,
      headers: resHeaders,
      data,
    };
  } catch (err: unknown) {
    const durationMs = Math.round(performance.now() - start);
    throw new ApiError(
      err instanceof Error ? err.message : 'Network request failed',
      0,
      { durationMs }
    );
  }
}
