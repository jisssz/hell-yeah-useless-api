import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { getApiBySlug } from '../data/apiCatalog';
import { EndpointBadge } from '../components/EndpointBadge';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { ErrorState } from '../components/ErrorState';

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb / Back button */}
      <div className="mb-6">
        <Link
          to="/apis"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Header section */}
      <div className="border-b border-slate-800 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <EndpointBadge method={api.method} />
          <span className="font-mono text-sm text-slate-400 font-semibold">{api.endpoint}</span>
          <Badge variant="brand">{api.uselessnessScore}% Uselessness SLA</Badge>
          <Badge variant="purple">{api.category}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{api.name}</h1>
        <p className="text-sm font-mono text-emerald-400/90 mt-2">{api.tagline}</p>
        <p className="text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">{api.description}</p>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-10">
        {/* Architectural Explanation */}
        <section className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Specification & Rationale
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-mono">
            {api.explanation}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500">Input Requirement:</span>
            <span className="text-slate-300 font-semibold">{api.requiredInput}</span>
          </div>
        </section>

        {/* Parameters / Request Body Specification */}
        {api.queryParams && api.queryParams.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-white mb-4">Query Parameters</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Parameter</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Required</th>
                    <th className="p-3.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {api.queryParams.map((param) => (
                    <tr key={param.name} className="hover:bg-slate-800/30">
                      <td className="p-3.5 text-emerald-400 font-bold">{param.name}</td>
                      <td className="p-3.5 text-indigo-400">{param.type}</td>
                      <td className="p-3.5">
                        {param.required ? (
                          <span className="text-rose-400 font-semibold">Yes</span>
                        ) : (
                          <span className="text-slate-500">No</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-400">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {api.requestBodyFields && api.requestBodyFields.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-white mb-4">Request Body (JSON)</h2>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Field</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Required</th>
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
                          <span className="text-rose-400 font-semibold">Yes</span>
                        ) : (
                          <span className="text-slate-500">No</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-400">{field.description}</td>
                      <td className="p-3.5 text-amber-300">{field.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Code Examples: Request and Response */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Example Request (cURL)
            </h3>
            <CodeBlock code={api.exampleRequest.curl} language="bash" filename="cURL" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Example Response (200 OK)
            </h3>
            <CodeBlock code={responseJsonString} language="json" filename="JSON Response" />
          </div>
        </section>

        {/* Playground Teaser / CTA */}
        <section className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Interactive Playground Ready</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Execute live requests directly against the local gateway at <code className="text-emerald-400">http://localhost:3001</code>.
              </p>
            </div>
          </div>
          <a
            href={`http://localhost:3001${api.endpoint}${api.slug === 'necessity' ? '?thing=another%20todo%20app' : ''}`}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono transition-colors"
          >
            Direct HTTP Test
          </a>
        </section>
      </div>
    </div>
  );
};
