import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Flame, Cpu, Activity, Key, Gauge, FileCode2, Clock, Laugh } from 'lucide-react';
import { API_CATALOG } from '../data/apiCatalog';
import { EndpointBadge } from '../components/EndpointBadge';
import { CodeBlock } from '../components/CodeBlock';
import { MemeTicker } from '../components/MemeTicker';
import { MemeWall } from '../components/MemeWall';
import { BASE_URL } from '../services/apiClient';

const SUBTITLE_QUOTES = [
  "Malayali developers already have enough problems. We decided to manufacture six more.",
  "Enterprise-grade pani illayma, served fresh over HTTP.",
  "Built with TypeScript because JavaScript wasn't suffering enough.",
  "Powered by unnecessary confidence and dead sprint goals.",
  "Deploy cheythu... ippo pedikkam!",
  "SLA: 99.8% Pointless. 0.2% pure accidental utility."
];

export const LandingPage: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % SUBTITLE_QUOTES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const heroCurl = `curl -X GET "${BASE_URL}/api/v1/vibe" \\
  -H "X-API-Key: uk_live_kerala_dev_sample"`;

  const credibilityFeatures = [
    {
      title: 'In-Memory Rate Limiting',
      value: '100 req/min',
      malayalamBadge: 'MATHI CHETTA',
      desc: 'RFC-compliant headers (X-RateLimit-*) preventing aggressive Malayali script kiddies.',
      icon: <Gauge className="w-5 h-5 text-yellow-400" />
    },
    {
      title: 'Simulated API Tiers',
      value: 'X-API-Tier',
      malayalamBadge: 'VIP / GUEST',
      desc: 'Key detection resolving production-tier, developer-sandbox, or open guest access.',
      icon: <Key className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Real Request Telemetry',
      value: '200 Ring Buffer',
      malayalamBadge: 'LIVE RECORDING',
      desc: 'Non-blocking middleware capturing status, IP, user-agent, and timestamps in memory.',
      icon: <Activity className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Sub-Millisecond Response',
      value: '< 1.5ms Latency',
      malayalamBadge: 'ENTHINA VEGAM?',
      desc: 'High-resolution hrtime measurement injected into every response via X-Response-Time.',
      icon: <Clock className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Naragam Control Room',
      value: '5s Live Polling',
      malayalamBadge: 'SCENE ILLA',
      desc: 'Live aggregation of status distribution, p95 latency, and satirical uselessness score.',
      icon: <Cpu className="w-5 h-5 text-rose-400" />
    },
    {
      title: 'Structured Error Contracts',
      value: 'Strict JSON Schema',
      malayalamBadge: 'SHERI CHETTA',
      desc: 'Rigid error envelopes (_meta, code, message) across all 6 useless microservices.',
      icon: <FileCode2 className="w-5 h-5 text-purple-400" />
    },
  ];

  return (
    <div className="space-y-20 py-4">
      {/* Top Malayalam Meme Ticker */}
      <MemeTicker />

      {/* Hero Section — Malayalam Meme Chaos × Enterprise Dev */}
      <section className="relative text-center max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* Floating Comic Stickers */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-black font-bungee text-xs tracking-wider shadow-comic mb-6 border-2 border-black animate-pulse">
          <Flame className="w-4 h-4 text-red-600" />
          <span>OFFICIAL MALAYALAM MEME INFRASTRUCTURE • v1.0 LIVE</span>
        </div>

        {/* Main Dramatic Brand Headline */}
        <div className="space-y-2 mb-6">
          <h1 className="font-bungee text-6xl sm:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-[0_8px_0_rgba(0,0,0,1)]">
            NARAGAM <span className="text-yellow-400 underline decoration-wavy decoration-yellow-400">EVide?</span>
          </h1>
          <p className="font-malayalam text-2xl sm:text-3xl font-black text-yellow-300 tracking-wide">
            നരകം എവിടെ? ഇവിടെ ഉണ്ട് API ആയിട്ട്!
          </p>
        </div>

        {/* Dynamic Rotating Subtitle */}
        <div className="h-16 flex items-center justify-center mb-8">
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto font-mono font-bold leading-relaxed bg-black/40 border-2 border-yellow-400/30 py-2 px-6 rounded-xl shadow-inner">
            "{SUBTITLE_QUOTES[quoteIndex]}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/playground"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bungee text-sm tracking-wider border-2 border-black transition-all shadow-comic hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <span>🔥 PANI THUDAKKAM (PLAYGROUND)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/apis"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0f1424] hover:bg-slate-800 text-white font-bungee text-sm tracking-wider border-2 border-slate-700 transition-all shadow-comic-blue"
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>BROWSE 6 USELESS APIs</span>
          </Link>
        </div>

        {/* Hero Code Snippet Box (Neo-brutalist Developer Style) */}
        <div className="max-w-2xl mx-auto text-left rounded-2xl border-2 border-black bg-[#090b14] overflow-hidden shadow-comic-yellow">
          <div className="flex items-center justify-between px-4 py-3 bg-[#121626] border-b-2 border-black text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black inline-block"></span>
              <span className="ml-2 font-bold font-bungee text-[11px] text-yellow-300">curl — Naragam Gateway</span>
            </div>
            <span className="text-[11px] font-mono font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
              HTTP/2 200 SCENE OK
            </span>
          </div>
          <div className="p-4">
            <CodeBlock code={heroCurl} language="bash" filename="Executable Command" />
          </div>
        </div>
      </section>

      {/* THE PROMINENT MALAYALAM MEME WALL SECTION */}
      <MemeWall />

      {/* Metrics Section (Meme Counters with Serious Measurements) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-[#0f1424] border-2 border-black shadow-comic text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-bungee text-yellow-400">99.8%</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Pointless SLA</div>
            <p className="text-[10px] font-mono text-yellow-300/70">0.2% pure accidental utility</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f1424] border-2 border-black shadow-comic text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-bungee text-blue-400">6</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Absurd Microservices</div>
            <p className="text-[10px] font-mono text-blue-300/70">100% Express + TS Gateway</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f1424] border-2 border-black shadow-comic text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-bungee text-red-500">0</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Problems Solved</div>
            <p className="text-[10px] font-mono text-red-300/70">Engineered to solve nothing</p>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f1424] border-2 border-black shadow-comic text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-bungee text-emerald-400">&lt; 1.0ms</div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Gateway Latency</div>
            <p className="text-[10px] font-mono text-emerald-300/70">Enthina ithra vegam?</p>
          </div>
        </div>
      </section>

      {/* All 6 APIs Showcase Section (Rebranded with Absurd Malayali Humor) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b-2 border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-yellow-400 text-black font-bungee text-[10px] shadow-sm">
                FULL FLEET
              </span>
              <span className="text-xs font-mono text-yellow-300 uppercase tracking-wider font-bold">
                Production Endpoints
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bungee text-white mt-1">
              All 6 Intentional Non-Solutions
            </h2>
            <p className="text-sm text-slate-300 mt-1 font-mono">
              Tested on Render, backed by in-memory telemetry, certified 99.8% useless by Kerala developers.
            </p>
          </div>
          <Link
            to="/apis"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bungee text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span>FULL CATALOG</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {API_CATALOG.map((api, idx) => (
            <div
              key={api.slug}
              className="flex flex-col justify-between h-full rounded-2xl border-2 border-black bg-[#0d101c] p-6 hover:border-yellow-400 hover:shadow-comic-yellow transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <EndpointBadge method={api.method} />
                    <span className="font-mono text-xs text-slate-300 font-bold">{api.endpoint}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                    {idx % 2 === 0 ? 'DANGEROUSLY USELESS' : 'VERY USELESS'}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-sans text-white group-hover:text-yellow-300 transition-colors">
                  {api.name}
                </h3>
                <p className="text-xs font-mono text-yellow-400/90 font-semibold mt-1">{api.tagline}</p>
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
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bungee tracking-wide border border-black shadow-comic hover:shadow-none transition-all"
                  >
                    <span>CHEYYAM</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Credibility Grid (The Under-the-Hood Serious Engineering) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs border border-blue-500/20 mb-2">
            <span>⚙️ THE UNDERLYING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bungee text-white">Serious Infrastructure</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
            Every feature you expect from a high-availability cloud provider, dedicated purely to Malayali non-problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {credibilityFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-2xl border-2 border-black bg-[#0d101c] hover:border-slate-600 transition-colors space-y-2.5 font-mono shadow-comic"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-black border border-slate-700">
                  {feat.icon}
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-yellow-400 block">{feat.value}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">{feat.malayalamBadge}</span>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action (Hilarious Malayali Closer) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#101428] to-[#080a14] border-2 border-yellow-400 text-center space-y-6 shadow-comic-yellow">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-black text-xs font-bungee border border-black shadow-comic">
            <Laugh className="w-4 h-4" />
            <span>100% FREE • ZERO DATABASE • INFINITE PANI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bungee text-white tracking-tight leading-tight">
            Ready to waste compute cycles like a true Malayali?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-mono leading-relaxed">
            Open the API playground, configure your headers, and verify that our Render gateway can mathematically defer your 3:00 AM life choices in under a millisecond.
          </p>
          <div>
            <Link
              to="/playground"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bungee text-base tracking-wider border-2 border-black transition-all shadow-comic hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              <Flame className="w-5 h-5 text-red-600" />
              <span>LAUNCH PLAYGROUND</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
