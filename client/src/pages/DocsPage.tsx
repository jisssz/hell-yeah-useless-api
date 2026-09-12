import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Shield, Zap, AlertCircle, ArrowRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { API_CATALOG } from '../data/apiCatalog';
import { EndpointBadge } from '../components/EndpointBadge';

export const DocsPage: React.FC = () => {
  const quickStartCurl = `# 1. Perform a health check
curl -i http://localhost:3001/health

# 2. Query your developer vibe with simulated key
curl -i http://localhost:3001/api/v1/vibe \\
  -H "X-API-Key: uk_live_myproductionkey"`;

  const errorExample = `{
  "error": {
    "code": "MISSING_REQUIRED_PARAMETER",
    "message": "Query parameter 'thing' is required. Example: /api/v1/necessity?thing=another%20todo%20app"
  },
  "_meta": {
    "timestamp": "2026-09-12T07:25:55.803Z",
    "version": "v1.0.0"
  }
}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <PageHeader
        badge={<Badge variant="brand">Developer Documentation</Badge>}
        title="Developer Platform Guide"
        description="Complete reference for integrating and authenticating against USELESS API microservices."
      />

      {/* What is USELESS API */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-400" />
          What is USELESS API?
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed font-mono">
          USELESS API provides mission-critical developer infrastructure for problems nobody has. 
          While existing API platforms solve trivial tasks like payment processing or email dispatch, 
          USELESS API tackles existential quandaries: evaluating codebase vibes, producing developer demotivation, 
          and generating mathematically unassailable excuses for catastrophic deadline slippage.
        </p>
      </section>

      {/* Base URL */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Base URL</h2>
        <p className="text-sm text-slate-300 font-mono">
          All endpoints are served over HTTP/HTTPS with versioned prefixes:
        </p>
        <div className="p-3.5 rounded-lg border border-slate-800 bg-[#080c14] font-mono text-sm text-emerald-400 flex items-center justify-between">
          <span>http://localhost:3001</span>
          <span className="text-xs text-slate-500 font-sans">Development Gateway</span>
        </div>
      </section>

      {/* Quick Start */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          Quick Start
        </h2>
        <p className="text-sm text-slate-300 font-mono">
          You can test the API immediately using cURL or any standard HTTP client:
        </p>
        <CodeBlock code={quickStartCurl} language="bash" filename="Terminal Quickstart" />
      </section>

      {/* Authentication */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          Simulated Authentication
        </h2>
        <p className="text-sm text-slate-300 font-mono">
          Authentication is simulated to replicate production developer-tier environments without gating access.
          Pass keys via either header:
        </p>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <code className="text-emerald-400">X-API-Key: uk_live_your_key_here</code>
            <Badge variant="brand">production-tier</Badge>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <code className="text-indigo-400">Authorization: Bearer uk_dev_sandbox_key</code>
            <Badge variant="purple">developer-sandbox</Badge>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <code className="text-slate-400">(No Key Provided)</code>
            <Badge variant="neutral">guest-open-access</Badge>
          </div>
        </div>
        <p className="text-xs text-slate-500 font-mono">
          Every response echoes your active tier in the <code className="text-slate-400">X-API-Tier</code> header.
        </p>
      </section>

      {/* Rate Limiting */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Rate Limiting & Telemetry</h2>
        <p className="text-sm text-slate-300 font-mono">
          The API enforeces an in-memory rate limit of <strong>100 requests per minute</strong> per client IP address. 
          Standard RFC rate-limit headers are included with every response:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-slate-500">X-RateLimit-Limit</div>
            <div className="text-white font-bold text-sm mt-1">100</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-slate-500">X-RateLimit-Remaining</div>
            <div className="text-emerald-400 font-bold text-sm mt-1">0 - 100</div>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-slate-500">X-Response-Time</div>
            <div className="text-cyan-400 font-bold text-sm mt-1">&lt; 2.5ms</div>
          </div>
        </div>
      </section>

      {/* Error Format */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          Error Handling
        </h2>
        <p className="text-sm text-slate-300 font-mono">
          Validation failures, missing parameters, and rate-limit violations return standard HTTP status codes with structured JSON:
        </p>
        <CodeBlock code={errorExample} language="json" filename="400 Bad Request Payload" />
      </section>

      {/* Catalog Directory in Docs */}
      <section className="space-y-4 pt-4 border-t border-slate-800">
        <h2 className="text-xl font-bold text-white">Available Endpoints Summary</h2>
        <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
          {API_CATALOG.map((api) => (
            <div key={api.slug} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/20">
              <div className="flex items-center gap-3">
                <EndpointBadge method={api.method} />
                <div>
                  <span className="font-mono text-sm text-white font-bold">{api.endpoint}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{api.description}</p>
                </div>
              </div>
              <Link
                to={`/apis/${api.slug}`}
                className="shrink-0 inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
              >
                <span>Docs</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
