import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { API_CATALOG, getApiBySlug } from '../data/apiCatalog';
import { ApiMetadata } from '../types/api';
import { executeApiCall, ExecutionResult, BASE_URL } from '../services/apiClient';
import { PageHeader } from '../components/PageHeader';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative">
      {/* Background ambient halos for Playground */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-[30rem] h-[30rem] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none" />

      <PageHeader
        badge={
          <div className="inline-flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-black border-2 border-black bg-[#ffe814] text-black shadow-comic-sm">
              ⚡ LIVE HTTP RUNTIME
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
              ● RENDER GATEWAY ACTIVE
            </span>
          </div>
        }
        title="API Playground (പരീക്ഷണശാല)"
        description="NASA mission control for completely useless APIs. Test latency, inspected headers, simulated rate limits, and real live responses with 100% genuine backend telemetry."
      />

      {/* Main Two-Column Playground Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Column: API Selector, Request Builder & cURL (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. API Selector */}
          <ApiSelector
            apis={API_CATALOG}
            selectedApi={selectedApi}
            onSelect={handleSelectApi}
          />

          {/* 2. Request Builder Panel */}
          <div className="relative p-6 rounded-2xl border-2 border-slate-700/80 bg-gradient-to-b from-[#0e1424] via-[#090d18] to-[#070a12] shadow-[0_0_35px_-5px_rgba(168,85,247,0.2),4px_4px_0_#000]">
            {/* Mission Control Top Label */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-purple-300 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>MISSION SPEC // REQUEST BUILDER</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30 font-bold">
                {selectedApi.method} DISPATCH
              </span>
            </div>

            {/* Salim Kumar pointing sticker */}
            <div className="hidden sm:block absolute -top-9 -right-4 z-20 pointer-events-none">
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

        {/* Right Column: Live Response & History (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6 relative">
          {/* Jagathy watching response */}
          <div className="hidden sm:block absolute -top-11 right-4 z-20 pointer-events-none">
            <MemeSticker
              src="/assets/memes/jagathy-shocked.png"
              speech="LIVE JSON?!"
              speechColor="bg-emerald-400 text-black"
              rotation="rotate-[-6deg]"
              size="w-16 sm:w-20"
              float={true}
            />
          </div>

          <div className="flex items-center justify-between pb-1">
            <label className="text-xs font-mono font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>LIVE TELEMETRY // RESPONSE CONSOLE</span>
            </label>
            <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
              Live Gateway Output
            </span>
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
