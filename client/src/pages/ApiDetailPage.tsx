import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Sparkles, CheckCircle2, Shield, Play, ArrowRight, Layers } from 'lucide-react';
import { getApiBySlug, API_CATALOG } from '../data/apiCatalog';
import { EndpointBadge } from '../components/EndpointBadge';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { ErrorState } from '../components/ErrorState';
import { Card } from '../components/Card';

export const ApiDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const api = slug ? getApiBySlug(slug) : undefined;

  if (!api) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ErrorState
          title="Endpoint Not Found"
          message={`The endpoint "/apis/${slug}" does not exist in the USELESS API Catalog. Even by our standards, this endpoint has no purpose.`}
        />
        <div className="mt-6">
          <Link
            to="/apis"
            className="inline-flex items-center gap-2 text-sm font-mono text-emerald-400 hover:text-emerald-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to API Catalog
          </Link>
        </div>
      </div>
    );
  }

  const responseJsonString = JSON.stringify(api.exampleResponse, null, 2);

  // Compute 2-3 related APIs deterministically (excluding current)
  const relatedApis = API_CATALOG
    .filter((item) => item.slug !== api.slug)
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <div>
        <Link
          to="/apis"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to API Catalog</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <EndpointBadge method={api.method} />
            <span className="font-mono text-sm text-slate-400 font-semibold">{api.endpoint}</span>
            <Badge variant="brand">{api.uselessnessScore}% Uselessness Rating</Badge>
            <Badge variant="purple">{api.category}</Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{api.name}</h1>
          <p className="text-sm font-mono text-emerald-400/90 mt-2">{api.tagline}</p>
          <p className="text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">{api.description}</p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            to={`/playground?api=${api.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono transition-colors shadow-lg shadow-emerald-500/10"
          >
            <Play className="w-4 h-4" />
            <span>Try in Playground</span>
          </Link>
        </div>
      </div>

      {/* Architectural Overview */}
      <section className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
        <h2 className="text-xs font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Technical Explanation & SLA
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed font-mono">
          {api.explanation}
        </p>
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="text-slate-400">
            <span className="text-slate-500">Input Specification: </span>
            <span className="text-slate-200 font-bold">{api.requiredInput}</span>
          </div>
          <div className="text-slate-400">
            <span className="text-slate-500">Latency Expectation: </span>
            <span className="text-cyan-400 font-bold">&lt; 2.0ms (In-Memory)</span>
          </div>
        </div>
      </section>

      {/* Authentication Info Section */}
      <section className="p-5 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          <span>Authentication & Access Tiers</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          This endpoint allows open public access for demonstration purposes. To simulate developer tiers, pass an optional API key via the <code className="text-slate-200">X-API-Key</code> or <code className="text-slate-200">Authorization: Bearer</code> header.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
          <span className="text-slate-500">Supported Tiers:</span>
          <code className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">uk_live_* (Production)</code>
          <code className="text-indigo-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">uk_dev_* (Sandbox)</code>
          <code className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">None (Guest)</code>
        </div>
      </section>

      {/* SECTION: REQUEST SPECIFICATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Terminal className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Request Specification
          </h2>
        </div>

        {/* Query Parameters Table */}
        {api.queryParams && api.queryParams.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 font-mono">Query Parameters</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Parameter</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Requirement</th>
                    <th className="p-3.5">Description</th>
                    <th className="p-3.5">Example Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {api.queryParams.map((param) => (
                    <tr key={param.name} className="hover:bg-slate-800/30">
                      <td className="p-3.5 text-emerald-400 font-bold">{param.name}</td>
                      <td className="p-3.5 text-indigo-400">{param.type}</td>
                      <td className="p-3.5">
                        {param.required ? (
                          <span className="text-rose-400 font-semibold">Required</span>
                        ) : (
                          <span className="text-slate-500">Optional</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-400">{param.description}</td>
                      <td className="p-3.5 text-amber-300">{param.example || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Request Body Fields Table */}
        {api.requestBodyFields && api.requestBodyFields.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-300 font-mono">Request Body Schema (JSON)</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Field</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Requirement</th>
                    <th className="p-3.5">Description</th>
                    <th className="p-3.5">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {api.requestBodyFields.map((field) => (
                    <tr key={field.name} className="hover:bg-slate-800/30">
                      <td className="p-3.5 text-emerald-400 font-bold">{field.name}</td>
                      <td className="p-3.5 text-indigo-400">{field.type}</td>
                      <td className="p-3.5">
                        {field.required ? (
                          <span className="text-rose-400 font-semibold">Required</span>
                        ) : (
                          <span className="text-slate-500">Optional</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-400">{field.description}</td>
                      <td className="p-3.5 text-amber-300">{field.example || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Example cURL Request */}
        <div>
          <h3 className="text-sm font-bold text-slate-300 font-mono mb-2">Example cURL Invocation</h3>
          <CodeBlock code={api.exampleRequest.curl} language="bash" filename="cURL" />
        </div>
      </section>

      {/* SECTION: RESPONSE SPECIFICATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Response Specification (200 OK)
          </h2>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-300 font-mono mb-2">Example Response Payload</h3>
          <CodeBlock code={responseJsonString} language="json" filename="application/json" />
        </div>
      </section>

      {/* Playground Banner */}
      <section className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono">Test this endpoint live</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Execute real requests, modify payloads, and view round-trip latency in the Playground.
            </p>
          </div>
        </div>
        <Link
          to={`/playground?api=${api.slug}`}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono transition-colors shadow-sm"
        >
          <Play className="w-4 h-4" />
          <span>Open in Playground</span>
        </Link>
      </section>

      {/* SECTION: RELATED APIS */}
      <section className="space-y-4 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Related Microservices
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedApis.map((related) => (
            <Card key={related.slug} hoverEffect className="p-4 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <EndpointBadge method={related.method} />
                  <span className="font-mono text-[11px] text-slate-500">{related.uselessnessScore}%</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {related.name}
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-1 line-clamp-2">
                  {related.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span className="text-[11px] text-slate-500">{related.category}</span>
                <Link
                  to={`/apis/${related.slug}`}
                  className="inline-flex items-center gap-1 hover:text-emerald-300"
                >
                  <span>View</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
