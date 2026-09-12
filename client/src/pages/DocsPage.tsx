import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, AlertCircle, Play, CheckCircle2, Activity } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { MemeSticker } from '../components/MemeSticker';
import { BASE_URL } from '../services/apiClient';

export const DocsPage: React.FC = () => {
  const quickStartCurl = `# 1. Perform an operational health check
curl -i ${BASE_URL}/health

# 2. Query your developer vibe with simulated key
curl -i ${BASE_URL}/api/v1/vibe \\
  -H "X-API-Key: uk_live_production_key"`;

  const postExampleCurl = `# Send a decision dilemma over HTTP POST
curl -X POST "${BASE_URL}/api/v1/decision" \\
  -H "Content-Type: application/json" \\
  -d '{"question": "Should I order biriyani?"}'`;

  const successExample = `{
  "question": "Should I order biriyani?",
  "decision": "YES",
  "confidence": 0.99,
  "reason": "Biochemical entropy demands immediate indulgence. Resistance is mathematically futile.",
  "risk_level": "High (Potential Food Coma)",
  "uselessness_score": 98.6,
  "timestamp": "2026-09-12T07:25:58.380Z",
  "version": "v1.0.0"
}`;

  const errorExample = `{
  "error": {
    "code": "MISSING_REQUIRED_BODY",
    "message": "Field 'question' is required in JSON body. Example: { \\"question\\": \\"Should I order biriyani?\\" }"
  },
  "_meta": {
    "timestamp": "2026-09-12T07:25:58.393Z",
    "version": "v1.0.0"
  }
}`;

  const rateLimitError = `{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please calm down."
  }
}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      <PageHeader
        badge={<Badge variant="brand">🔥 Platform Manual &amp; Satyavangmoolam</Badge>}
        title="നരകം EVIDEHHHH ? Docs"
        description="Everything you need to integrate infrastructure that nobody asked you to build. Enterprise stability for Malayalam developer satire."
        actions={
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffe814] hover:bg-yellow-300 text-black border-2 border-black font-mono text-xs font-black transition-colors shadow-comic-sm cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Open Playground</span>
          </Link>
        }
      />

      {/* 1. Quick Start Flow */}
      <section className="space-y-4 relative">
        <div className="hidden sm:block absolute -top-8 right-0 pointer-events-none">
          <MemeSticker
            src="/assets/memes/innocent-serious.png"
            speech="VAAYICHITTU PANI!"
            speechPosition="top-left"
            rotation="rotate-[-6deg]"
            size="w-20"
            float
          />
        </div>
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
          <Zap className="w-5 h-5 text-amber-400" />
          1. Quick Start
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          Follow this 4-step workflow to integrate നരകം EVIDEHHHH ? API into your local terminal or frontend client:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-emerald-400 font-bold mb-1">Step 1: Choose an API</div>
            <p className="text-slate-400">Select one of our 6 endpoints from the API Catalog.</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-indigo-400 font-bold mb-1">Step 2: Copy the Endpoint</div>
            <p className="text-slate-400">Grab the path (e.g. <code className="text-slate-200">/api/v1/vibe</code>).</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-cyan-400 font-bold mb-1">Step 3: Send a Request</div>
            <p className="text-slate-400">Execute via cURL, fetch, or our interactive Playground.</p>
          </div>
          <div className="p-4 rounded-lg border border-slate-800 bg-slate-900/40">
            <div className="text-rose-400 font-bold mb-1">Step 4: Receive Pointless Output</div>
            <p className="text-slate-400">Receive an unnecessarily detailed, satirical JSON payload.</p>
          </div>
        </div>

        <CodeBlock code={quickStartCurl} language="bash" filename="Quickstart cURL" />
      </section>

      {/* 2. Base URL */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2">
          2. Base URL & Deployment
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          The API gateway runs on port 3001 in local development. For production deployments, set the environment variable <code className="text-slate-200">VITE_API_BASE_URL</code>.
        </p>
        <div className="p-3.5 rounded-lg border border-slate-800 bg-[#080c14] font-mono text-xs text-emerald-400 flex items-center justify-between">
          <span>{BASE_URL}</span>
          <span className="text-[11px] text-slate-500 font-sans">Active Target Base URL</span>
        </div>
      </section>

      {/* 3. Authentication & API Tiers */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          3. Authentication & Tiers
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          The API implements simulated developer tier authentication. While public access remains open, requests with recognizable key prefixes receive designated tier tags in response headers:
        </p>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div>
              <code className="text-emerald-400 font-bold">X-API-Key: uk_live_*</code>
              <div className="text-slate-500 text-[11px] mt-0.5">High-priority enterprise uselessness</div>
            </div>
            <Badge variant="brand">production-tier</Badge>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div>
              <code className="text-indigo-400 font-bold">Authorization: Bearer uk_dev_*</code>
              <div className="text-slate-500 text-[11px] mt-0.5">Sandbox experimentation key</div>
            </div>
            <Badge variant="purple">developer-sandbox</Badge>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div>
              <code className="text-slate-400">(No header provided)</code>
              <div className="text-slate-500 text-[11px] mt-0.5">Default open evaluation</div>
            </div>
            <Badge variant="neutral">guest-open-access</Badge>
          </div>
        </div>
      </section>

      {/* 4. GET APIs */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2">
          4. GET APIs (Query Parameters)
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          GET requests accept URL query parameters. Required parameters must be URL-encoded:
        </p>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/30 flex items-center justify-between">
            <div>
              <span className="text-emerald-400 font-bold">GET /api/v1/vibe</span>
              <p className="text-slate-500 text-[11px]">Zero inputs required.</p>
            </div>
            <Link to="/apis/vibe" className="text-emerald-400 hover:underline">Reference</Link>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/30 flex items-center justify-between">
            <div>
              <span className="text-emerald-400 font-bold">GET /api/v1/motivation</span>
              <p className="text-slate-500 text-[11px]">Zero inputs required.</p>
            </div>
            <Link to="/apis/motivation" className="text-emerald-400 hover:underline">Reference</Link>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/30 flex items-center justify-between">
            <div>
              <span className="text-emerald-400 font-bold">GET /api/v1/necessity?thing=...</span>
              <p className="text-slate-500 text-[11px]">Requires <code className="text-slate-300">thing</code> string query parameter.</p>
            </div>
            <Link to="/apis/necessity" className="text-emerald-400 hover:underline">Reference</Link>
          </div>
        </div>
      </section>

      {/* 5. POST APIs */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2">
          5. POST APIs (JSON Payloads)
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          POST endpoints require a valid <code className="text-slate-200">Content-Type: application/json</code> header and request body:
        </p>
        <CodeBlock code={postExampleCurl} language="bash" filename="POST Example" />
      </section>

      {/* 6. Response Format */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          6. Response Format
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          All endpoints return pretty-printed JSON adhering to semantic versioning:
        </p>
        <CodeBlock code={successExample} language="json" filename="200 OK Response" />
      </section>

      {/* 7. Error Handling */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          7. Error Handling
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          Errors return standard HTTP status codes with structured metadata:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono mb-4">
          <div className="p-2.5 rounded border border-slate-800 bg-slate-900/40 text-center">
            <span className="text-amber-400 font-bold block">400</span>
            <span className="text-slate-500 text-[10px]">Bad Request</span>
          </div>
          <div className="p-2.5 rounded border border-slate-800 bg-slate-900/40 text-center">
            <span className="text-indigo-400 font-bold block">401</span>
            <span className="text-slate-500 text-[10px]">Unauthorized</span>
          </div>
          <div className="p-2.5 rounded border border-slate-800 bg-slate-900/40 text-center">
            <span className="text-amber-400 font-bold block">429</span>
            <span className="text-slate-500 text-[10px]">Rate Limit</span>
          </div>
          <div className="p-2.5 rounded border border-slate-800 bg-slate-900/40 text-center">
            <span className="text-rose-400 font-bold block">500</span>
            <span className="text-slate-500 text-[10px]">Server Error</span>
          </div>
        </div>
        <CodeBlock code={errorExample} language="json" filename="400 Bad Request Payload" />
      </section>

      {/* 8. Rate Limiting */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white font-mono border-b border-slate-800 pb-2">
          8. Rate Limiting (100 req/min)
        </h2>
        <p className="text-xs text-slate-300 font-mono leading-relaxed">
          The API gateway enforces a strict in-memory limit of <strong>100 requests per minute per IP address</strong>. Exceeding this quota produces HTTP 429:
        </p>
        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <span className="text-slate-400">X-RateLimit-Limit</span>
            <span className="text-white font-bold">100</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <span className="text-slate-400">X-RateLimit-Remaining</span>
            <span className="text-emerald-400 font-bold">Count remaining in current 60s window</span>
          </div>
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <span className="text-slate-400">Retry-After</span>
            <span className="text-amber-400 font-bold">Seconds to wait before making new calls</span>
          </div>
        </div>
        <CodeBlock code={rateLimitError} language="json" filename="429 Rate Limit Payload" />
      </section>

      {/* 9. Platform Telemetry & Catalog Navigation */}
      <section className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-mono">Live Telemetry & Dashboard</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Inspect live request logs, average latency, and the calculated Global Uselessness score.
            </p>
          </div>
          <Link
            to="/analytics"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-xs font-bold border border-slate-700 transition-colors"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>View Analytics</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
