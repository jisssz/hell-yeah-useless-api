import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Sparkles, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { API_CATALOG } from '../data/apiCatalog';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { EndpointBadge } from '../components/EndpointBadge';
import { CodeBlock } from '../components/CodeBlock';

export const LandingPage: React.FC = () => {
  // Show first 3 APIs on landing page
  const featuredApis = API_CATALOG.slice(0, 3);

  const heroCurl = `curl -X GET "http://localhost:3001/api/v1/vibe" \\
  -H "X-API-Key: uk_live_enterprise_useless"`;

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>v1.0 Production Release — Certified 99.8% Pointless</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          Infrastructure for problems{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            nobody has.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          A high-availability developer platform delivering enterprise-grade telemetry, low-latency microservices, and rigorously tested endpoints solving challenges no human ever requested.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/apis"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20"
          >
            Explore APIs
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/apis/vibe"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-base border border-slate-700/80 transition-all"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Open Playground
          </Link>
        </div>

        {/* Hero Code Snippet */}
        <div className="max-w-2xl mx-auto text-left shadow-2xl shadow-emerald-500/5 rounded-xl border border-slate-800 bg-[#080c14] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2">terminal — curl</span>
            </div>
            <span className="text-[11px] text-slate-500">HTTP/1.1 200 OK</span>
          </div>
          <div className="p-4">
            <CodeBlock code={heroCurl} language="bash" filename="Request Example" />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">99.8%</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">Uselessness SLA</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">6</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">Core Endpoints</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-mono">0</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">Problems Solved</div>
          </div>
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">&lt; 1ms</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">Average Latency</div>
          </div>
        </div>
      </section>

      {/* Featured APIs Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Production Suite</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured Endpoints</h2>
            <p className="text-sm text-slate-400 mt-1">Explore our flagship microservices engineered with uncompromised futility.</p>
          </div>
          <Link
            to="/apis"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>View All 6 APIs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredApis.map((api) => (
            <Card key={api.slug} hoverEffect className="flex flex-col justify-between h-full group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <EndpointBadge method={api.method} />
                    <span className="font-mono text-xs text-slate-400">{api.endpoint}</span>
                  </div>
                  <Badge variant="brand">{api.uselessnessScore}%</Badge>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {api.name}
                </h3>
                <p className="text-xs font-mono text-emerald-500/90 mt-1">{api.tagline}</p>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  {api.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">{api.category}</span>
                <Link
                  to={`/apis/${api.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <span>View API</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Value Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-white">Why Choose USELESS API?</h2>
            <p className="text-sm text-slate-400 mt-2 font-mono">
              Because other platforms burden you with utility, productivity, and ROI.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Sub-Millisecond Inefficacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Engineered in-memory ring buffers record every wasted CPU cycle with nanosecond resolution.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Strict Pointless SLA</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Guaranteed 99.8% uselessness score across all response payloads or your money back ($0.00).
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Zero Cloud Lock-in</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono">
                Runs entirely locally, in-memory, or in the cloud without Kafka, Kubernetes, or existential dread.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
