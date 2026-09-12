import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { API_CATALOG, getApiBySlug } from '../data/apiCatalog';
import { ApiMetadata } from '../types/api';
import { executeApiCall, ExecutionResult, BASE_URL } from '../services/apiClient';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { ApiSelector } from '../components/playground/ApiSelector';
import { RequestBuilder } from '../components/playground/RequestBuilder';
import { ResponseViewer } from '../components/playground/ResponseViewer';
import { CurlBlock } from '../components/playground/CurlBlock';
import { RequestHistory, HistoryItem } from '../components/playground/RequestHistory';
import { MemeSticker } from '../components/MemeSticker';

const STORAGE_KEY = 'useless_api_request_history';

export const PlaygroundPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const apiParam = searchParams.get('api');

  // Initialize selected API from URL parameter or default to 'vibe'
  const initialApi = (apiParam && getApiBySlug(apiParam)) || API_CATALOG[0];
  const [selectedApi, setSelectedApi] = useState<ApiMetadata>(initialApi);

  const [queryParams, setQueryParams] = useState<Record<string, string>>({});
  const [bodyFields, setBodyFields] = useState<Record<string, string>>({});
  const [apiKey, setApiKey] = useState<string>('');

  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Local request history
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Helper to initialize defaults for an API
  const initDefaultsForApi = useCallback((api: ApiMetadata) => {
    const qDefaults: Record<string, string> = {};
    if (api.queryParams) {
      api.queryParams.forEach((q) => {
        if (q.example) qDefaults[q.name] = q.example;
      });
    }
    setQueryParams(qDefaults);

    const bDefaults: Record<string, string> = {};
    if (api.requestBodyFields) {
      api.requestBodyFields.forEach((b) => {
        if (b.example) bDefaults[b.name] = b.example;
      });
    }
    setBodyFields(bDefaults);
  }, []);

  // Update when URL parameter changes
  useEffect(() => {
    if (apiParam) {
      const matched = getApiBySlug(apiParam);
      if (matched && matched.slug !== selectedApi.slug) {
        setSelectedApi(matched);
        initDefaultsForApi(matched);
        setResult(null);
        setError(null);
      }
    }
  }, [apiParam, selectedApi.slug, initDefaultsForApi]);

  // Initial load defaults
  useEffect(() => {
    initDefaultsForApi(selectedApi);
  }, [selectedApi, initDefaultsForApi]);

  // Handle switching API
  const handleSelectApi = (api: ApiMetadata) => {
    setSelectedApi(api);
    setSearchParams({ api: api.slug });
    initDefaultsForApi(api);
    setResult(null);
    setError(null);
  };

  const handleQueryParamChange = (key: string, value: string) => {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleBodyFieldChange = (key: string, value: string) => {
    setBodyFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    initDefaultsForApi(selectedApi);
    setResult(null);
    setError(null);
  };

  // Execute real API request
  const handleExecute = async () => {
    setIsLoading(true);
    setError(null);

    // Build query string if any
    let endpoint = selectedApi.endpoint;
    const qEntries = Object.entries(queryParams).filter(([_, v]) => v.trim() !== '');
    if (qEntries.length > 0) {
      const search = new URLSearchParams();
      qEntries.forEach(([k, v]) => search.append(k, v));
      endpoint += `?${search.toString()}`;
    }

    // Build body if POST
    const body = selectedApi.method === 'POST' ? bodyFields : undefined;

    // Headers
    const headers: Record<string, string> = {};
    if (apiKey.trim() !== '') {
      headers['X-API-Key'] = apiKey.trim();
    }

    try {
      const res = await executeApiCall(endpoint, selectedApi.method, body, headers);
      setResult(res);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: 'hist_' + Math.random().toString(36).substring(2, 9),
        apiSlug: selectedApi.slug,
        method: selectedApi.method,
        endpoint: selectedApi.endpoint,
        queryParams,
        bodyFields,
        apiKey,
        status: res.status,
        durationMs: res.durationMs,
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => {
        const updated = [newHistoryItem, ...prev.slice(0, 9)];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // Ignore localStorage quota
        }
        return updated;
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown network failure';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Restore request from history
  const handleRestoreFromHistory = (item: HistoryItem) => {
    const matched = getApiBySlug(item.apiSlug);
    if (matched) {
      setSelectedApi(matched);
      setSearchParams({ api: matched.slug });
      setQueryParams(item.queryParams || {});
      setBodyFields(item.bodyFields || {});
      setApiKey(item.apiKey || '');
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <PageHeader
        badge={<Badge variant="brand">⚡ Real Live HTTP Engine • പച്ചയായ സത്യം</Badge>}
        title="API Playground (പരീക്ഷണശാല)"
        description="Send real requests to APIs that solve problems nobody asked you to solve. Test latency, inspected headers, rate limits, and live responses with 100% genuine backend telemetry."
      />

      {/* Main Two-Column Playground Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: API Selector, Request Builder & cURL (5 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. API Selector */}
          <ApiSelector
            apis={API_CATALOG}
            selectedApi={selectedApi}
            onSelect={handleSelectApi}
          />

          {/* 2. Request Builder */}
          <div className="relative p-5 rounded-xl border border-slate-800 bg-slate-900/30">
            {/* Salim Kumar pointing sticker */}
            <div className="hidden sm:block absolute -top-8 -right-4 z-20 pointer-events-none">
              <MemeSticker
                src="/assets/memes/salimkumar-pointing.png"
                speech="REQUEST AYYIKO!"
                speechColor="bg-yellow-400 text-black"
                rotation="rotate-[6deg]"
                size="w-16 sm:w-20"
              />
            </div>
            <RequestBuilder
              api={selectedApi}
              queryParams={queryParams}
              onQueryParamChange={handleQueryParamChange}
              bodyFields={bodyFields}
              onBodyFieldChange={handleBodyFieldChange}
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
              onExecute={handleExecute}
              onReset={handleReset}
              isLoading={isLoading}
            />
          </div>

          {/* 3. Generated cURL */}
          <CurlBlock
            baseUrl={BASE_URL}
            endpoint={selectedApi.endpoint}
            method={selectedApi.method}
            queryParams={queryParams}
            bodyPayload={selectedApi.method === 'POST' ? bodyFields : undefined}
            apiKey={apiKey}
          />
        </div>

        {/* Right Column: Live Response & History (7 cols on lg) */}
        <div className="lg:col-span-6 space-y-6 relative">
          {/* Jagathy watching response */}
          <div className="hidden sm:block absolute -top-10 right-2 z-20 pointer-events-none">
            <MemeSticker
              src="/assets/memes/jagathy-shocked.png"
              speech="LIVE JSON?!"
              speechColor="bg-emerald-400 text-black"
              rotation="rotate-[-6deg]"
              size="w-16 sm:w-20"
              float={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Response Payload
            </label>
            <span className="text-[11px] font-mono text-slate-500">Live JSON output</span>
          </div>

          {/* Live Response Panel */}
          <ResponseViewer
            result={result}
            error={error}
            isLoading={isLoading}
            onClear={() => {
              setResult(null);
              setError(null);
            }}
          />

          {/* Request History */}
          <RequestHistory
            history={history}
            onSelect={handleRestoreFromHistory}
            onClear={handleClearHistory}
          />
        </div>
      </div>
    </div>
  );
};
