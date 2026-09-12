import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Cpu, Activity, Key, Gauge, FileCode2, Clock } from 'lucide-react';
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
  "SLA: 99.8% Pointless. 0.2% pure accidental utility.",
];

// API card accent colors cycle
const POSTER_ACCENTS = [
  { border: 'border-yellow-400', num: 'text-yellow-400', shadow: 'shadow-comic-yellow', badge: 'bg-yellow-400 text-black' },
  { border: 'border-blue-400',   num: 'text-blue-400',   shadow: 'shadow-comic-blue',   badge: 'bg-blue-400 text-black' },
  { border: 'border-pink-500',   num: 'text-pink-400',   shadow: 'shadow-comic-pink',   badge: 'bg-pink-500 text-white' },
  { border: 'border-emerald-400',num: 'text-emerald-400',shadow: 'shadow-comic-green',  badge: 'bg-emerald-400 text-black' },
  { border: 'border-orange-400', num: 'text-orange-400', shadow: 'shadow-comic-yellow', badge: 'bg-orange-400 text-black' },
  { border: 'border-purple-400', num: 'text-purple-400', shadow: 'shadow-comic-blue',   badge: 'bg-purple-500 text-white' },
];

export const LandingPage: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % SUBTITLE_QUOTES.length);
        setQuoteVisible(true);
      }, 300);
    }, 4200);
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
      icon: <Gauge className="w-5 h-5 text-yellow-400" />,
    },
    {
      title: 'Simulated API Tiers',
      value: 'X-API-Tier',
      malayalamBadge: 'VIP / GUEST',
      desc: 'Key detection resolving production-tier, developer-sandbox, or open guest access.',
      icon: <Key className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Real Request Telemetry',
      value: '200 Ring Buffer',
      malayalamBadge: 'LIVE RECORDING',
      desc: 'Non-blocking middleware capturing status, IP, user-agent, and timestamps in memory.',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Sub-Millisecond Response',
      value: '< 1.5ms Latency',
      malayalamBadge: 'ENTHINA VEGAM?',
      desc: 'High-resolution hrtime measurement injected into every response via X-Response-Time.',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Naragam Control Room',
      value: '5s Live Polling',
      malayalamBadge: 'SCENE ILLA',
      desc: 'Live aggregation of status distribution, p95 latency, and satirical uselessness score.',
      icon: <Cpu className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Structured Error Contracts',
      value: 'Strict JSON Schema',
      malayalamBadge: 'SHERI CHETTA',
      desc: 'Rigid error envelopes (_meta, code, message) across all 6 useless microservices.',
      icon: <FileCode2 className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <div className="space-y-0 py-0">

      {/* ============================================================
          TOP TICKER
          ============================================================ */}
      <MemeTicker />

      {/* ============================================================
          KINETIC HERO SECTION — BLACK WORLD
          ============================================================ */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 pb-16 overflow-hidden bg-black">
        {/* Decorative ambient orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-yellow-400/8 blur-3xl blob-drift pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-600/8 blur-3xl blob-drift-2 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-500/5 blur-2xl blob-drift-3 pointer-events-none" />

        {/* Badge */}
        <div className="hero-narakam inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-black font-bungee text-xs tracking-wider shadow-comic mb-8 border-2 border-black sticker sticker-1">
          <Flame className="w-4 h-4 text-red-600" />
          <span>OFFICIAL MALAYALAM MEME INFRASTRUCTURE • v1.0 LIVE</span>
        </div>

        {/* KINETIC HEADLINE */}
        <div className="space-y-1 mb-6">
          {/* നരകം */}
          <h1 className="hero-narakam font-malayalam font-black text-6xl sm:text-8xl lg:text-9xl text-white leading-none tracking-tight drop-shadow-[0_6px_0_rgba(255,232,20,0.3)]">
            നരകം
          </h1>
          {/* EVIDEHHHH ? — slams in from left */}
          <div className="hero-evide font-bungee text-7xl sm:text-9xl lg:text-[10rem] text-yellow-400 leading-none tracking-[0.05em] drop-shadow-[0_8px_0_rgba(0,0,0,1)]">
            EVIDEHHHH ?
          </div>
        </div>

        {/* API badge sticker */}
        <div className="hero-api inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border-2 border-yellow-400/60 text-yellow-300 font-mono text-xs font-bold shadow-comic-yellow mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          6 USELESS MICROSERVICES • RENDER GATEWAY • ZERO PROBLEMS SOLVED
        </div>

        {/* Rotating subtitle */}
        <div className="hero-subtitle h-14 flex items-center justify-center mb-8 max-w-3xl mx-auto">
          <p
            className="text-base sm:text-lg text-slate-200 font-mono font-bold leading-relaxed bg-black/60 border border-yellow-400/20 py-2 px-5 rounded-xl"
            style={{
              opacity: quoteVisible ? 1 : 0,
              transform: quoteVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            "{SUBTITLE_QUOTES[quoteIndex]}"
          </p>
        </div>

        {/* CTA buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/playground"
            className="btn-meme w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bungee text-sm tracking-wider border-2 border-black shadow-comic"
          >
            <span>🔥 PANI THUDAKKAM (PLAYGROUND)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/apis"
            className="btn-meme w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0f1424] hover:bg-slate-800 text-white font-bungee text-sm tracking-wider border-2 border-slate-700 shadow-comic-blue"
          >
            <span>BROWSE 6 USELESS APIs</span>
          </Link>
        </div>

        {/* Hero curl code block */}
        <div className="hero-code max-w-2xl w-full mx-auto text-left rounded-2xl border-2 border-black bg-[#090b14] overflow-hidden shadow-comic-yellow">
          <div className="flex items-center justify-between px-4 py-3 bg-[#121626] border-b-2 border-black text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black inline-block" />
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

      {/* ============================================================
          MEME WALL — YELLOW WORLD
          ============================================================ */}
      <MemeWall />

      {/* ============================================================
          METRICS STRIP — DARK WORLD
          ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="reveal-init grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { val: '99.8%', label: 'Pointless SLA', sub: '0.2% accidental utility', color: 'text-yellow-400' },
            { val: '6',     label: 'Absurd Microservices', sub: '100% Express + TS Gateway', color: 'text-blue-400' },
            { val: '0',     label: 'Problems Solved', sub: 'Engineered to solve nothing', color: 'text-red-500' },
            { val: '<1ms',  label: 'Gateway Latency', sub: 'Enthina ithra vegam?', color: 'text-emerald-400' },
          ].map((m, i) => (
            <div
              key={m.label}
              className={`reveal-scale stagger-${i + 1} p-6 rounded-2xl bg-[#0f1424] border-2 border-black shadow-comic text-center space-y-1 hover:border-yellow-400/60 transition-colors`}
            >
              <div className={`text-3xl sm:text-4xl font-bungee ${m.color}`}>{m.val}</div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">{m.label}</div>
              <p className={`text-[10px] font-mono ${m.color}/70`}>{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          ALL 6 API POSTERS — BLUE WORLD
          ============================================================ */}
      <section className="relative py-16 bg-gradient-to-b from-[#030712] to-[#060d1f] overflow-hidden">
        {/* Background text decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-bungee text-[20vw] text-white/[0.02] animate-rotate-slow leading-none">PANI</span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header */}
          <div className="reveal-init flex flex-col md:flex-row md:items-end justify-between pb-4 border-b-2 border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-yellow-400 text-black font-bungee text-[10px] shadow-comic sticker sticker-2">
                  FULL FLEET
                </span>
                <span className="text-xs font-mono text-yellow-300 uppercase tracking-wider font-bold">
                  Production Endpoints
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bungee text-white mt-2">
                6 Intentional Non-Solutions
              </h2>
              <p className="text-sm text-slate-300 mt-1 font-mono">
                Backed by in-memory telemetry. Certified 99.8% useless by Kerala developers.
              </p>
            </div>
            <Link
              to="/apis"
              className="mt-4 md:mt-0 btn-meme inline-flex items-center gap-1.5 text-xs font-bungee text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <span>FULL CATALOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* API Poster Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {API_CATALOG.map((api, idx) => {
              const accent = POSTER_ACCENTS[idx % POSTER_ACCENTS.length];
              return (
                <div
                  key={api.slug}
                  className={`api-poster reveal-init stagger-${(idx % 3) + 1} flex flex-col justify-between h-full rounded-2xl border-2 ${accent.border} bg-[#0d101c] p-6 ${accent.shadow} group`}
                >
                  {/* API Number sticker */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`api-number font-bungee text-4xl ${accent.num} opacity-30`}>
                      0{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${accent.badge} border border-black shadow-comic-sm`}>
                      {idx % 2 === 0 ? 'DANGEROUSLY USELESS' : 'VERY USELESS'}
                    </span>
                  </div>

                  {/* Endpoint row */}
                  <div className="flex items-center gap-2 mb-3">
                    <EndpointBadge method={api.method} />
                    <span className={`api-endpoint font-mono text-xs text-slate-300 font-bold`}>{api.endpoint}</span>
                  </div>

                  <h3 className={`text-lg font-bold font-sans text-white group-hover:${accent.num.replace('text-', 'text-')} transition-colors`}>
                    {api.name}
                  </h3>
                  <p className={`text-xs font-mono ${accent.num} font-semibold mt-1`}>{api.tagline}</p>
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed font-mono">{api.description}</p>

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
                        className={`btn-meme inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${accent.badge} text-xs font-bungee tracking-wide border border-black shadow-comic-sm`}
                      >
                        <span>CHEYYAM</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          TECH CREDIBILITY — GREEN WORLD
          ============================================================ */}
      <section className="py-16 bg-gradient-to-b from-[#060d1f] to-[#030712]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="reveal-init text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs border border-blue-500/20 mb-3">
              <span>⚙️ THE UNDERLYING ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bungee text-white">Serious Infrastructure</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
              Every feature you'd expect from a high-availability cloud provider, dedicated purely to Malayali non-problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credibilityFeatures.map((feat, i) => (
              <div
                key={feat.title}
                className={`reveal-init stagger-${i + 1} p-5 rounded-2xl border-2 border-black bg-[#0d101c] hover:border-slate-600 transition-colors space-y-2.5 font-mono shadow-comic`}
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
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — YELLOW WORLD
          ============================================================ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="reveal-scale max-w-5xl mx-auto p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-400 text-center space-y-6 shadow-comic border-2 border-black relative overflow-hidden">
          {/* Decorative PANI text in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-bungee text-[18vw] text-black/5 leading-none">PANI</span>
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-yellow-400 text-xs font-bungee border border-yellow-400/30 shadow-comic mb-4">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>100% FREE • ZERO DATABASE • INFINITE PANI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bungee text-black tracking-tight leading-tight">
              Ready to waste compute cycles<br />like a true Malayali?
            </h2>
            <p className="text-sm sm:text-base text-black/70 max-w-2xl mx-auto font-mono leading-relaxed mt-4">
              Open the playground, configure your headers, verify that our Render gateway can mathematically defer your 3:00 AM life choices in under a millisecond.
            </p>
            <div className="mt-6">
              <Link
                to="/playground"
                className="btn-meme inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-black hover:bg-slate-900 text-yellow-400 font-bungee text-base tracking-wider border-2 border-black transition-all shadow-comic"
              >
                <Flame className="w-5 h-5 text-orange-400" />
                <span>LAUNCH PLAYGROUND</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
