import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Sparkles, Cpu, Activity, Key, Gauge, FileCode2, Clock, CheckCircle2 } from 'lucide-react';
import { API_CATALOG } from '../data/apiCatalog';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { EndpointBadge } from '../components/EndpointBadge';
import { CodeBlock } from '../components/CodeBlock';
import { BASE_URL } from '../services/apiClient';

export const LandingPage: React.FC = () => {
  const heroCurl = `curl -X GET "${BASE_URL}/api/v1/vibe" \\
  -H "X-API-Key: uk_live_enterprise_useless"`;

  const credibilityFeatures = [
    {
      title: 'In-Memory Rate Limiting',
      value: '100 req/min',
      desc: 'RFC-compliant headers (X-RateLimit-*) and active 429 quota enforcement.',
      icon: <Gauge className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Simulated API Tiers',
      value: 'X-API-Tier',
      desc: 'Key detection resolving production-tier, developer-sandbox, or guest access.',
      icon: <Key className="w-5 h-5 text-indigo-400" />
    },
    {
      title: 'Real Request Telemetry',
      value: '200 Ring Buffer',
      desc: 'Non-blocking middleware capturing status, IP, user-agent, and timestamps.',
      icon: <Activity className="w-5 h-5 text-cyan-400" />
    },
    {
      title: 'Nanosecond Latency',
      value: '< 1.5ms Latency',
      desc: 'High-resolution timing injected into every response via X-Response-Time.',
      icon: <Clock className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Live Usage Dashboard',
      value: 'Zero Polling Delay',
      desc: 'Live aggregation of status distribution, p95 latency, and wasted cycle metrics.',
      icon: <Cpu className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Structured Contracts',
      value: 'Strict JSON Schema',
      desc: 'Rigid error envelopes (_meta, code, message) across all 6 microservices.',
      icon: <FileCode2 className="w-5 h-5 text-purple-400" />
    },
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8">
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
          We built enterprise-style infrastructure for APIs that solve absolutely nothing. Real HTTP endpoints, high-resolution telemetry, and zero productive utility.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/playground"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20"
          >
            Try an API
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/apis"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-base border border-slate-700/80 transition-all"
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            Explore APIs
          </Link>
        </div>

        {/* Hero Code Snippet */}
        <div className="max-w-2xl mx-auto text-left shadow-2xl shadow-emerald-500/5 rounded-xl border border-slate-800 bg-[#080c14] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2">terminal — cURL</span>
            </div>
            <span className="text-[11px] text-emerald-400">HTTP/1.1 200 OK</span>
          </div>
          <div className="p-4">
            <CodeBlock code={heroCurl} language="bash" filename="Request Preview" />
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
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">&lt; 1.5ms</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-2">Average Latency</div>
          </div>
        </div>
      </section>

      {/* All 6 APIs Showcase Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Production Suite</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">All Six Microservices</h2>
            <p className="text-sm text-slate-400 mt-1 font-mono">
              Explore our complete suite of endpoints engineered with uncompromised futility.
            </p>
          </div>
          <Link
            to="/apis"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {API_CATALOG.map((api) => (
            <Card key={api.slug} hoverEffect className="flex flex-col justify-between h-full group border-slate-800/80">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <EndpointBadge method={api.method} />
                    <span className="font-mono text-xs text-slate-400 font-semibold">{api.endpoint}</span>
                  </div>
                  <Badge variant="brand">{api.uselessnessScore}%</Badge>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {api.name}
                </h3>
                <p className="text-xs font-mono text-emerald-500/80 mt-1">{api.tagline}</p>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed font-mono">
                  {api.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">{api.category}</span>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/apis/${api.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    <span>Docs</span>
                  </Link>
                  <Link
                    to={`/playground?api=${api.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Try</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Credibility Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Enterprise Architecture</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Production Infrastructure</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
            Every feature you expect from a serious cloud provider, dedicated entirely to uselessness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credibilityFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-colors space-y-2.5 font-mono"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {feat.icon}
                </div>
                <span className="text-xs font-bold text-emerald-400">{feat.value}</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Free • No Credit Card • Zero Useful Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to waste compute cycles?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto font-mono leading-relaxed">
            Jump directly into the interactive API playground and test all 6 satirical endpoints in your browser or cURL.
          </p>
          <div>
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm font-mono transition-all shadow-xl shadow-emerald-500/20"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Playground</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
