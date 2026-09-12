import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Cpu, Activity, Key, Gauge, FileCode2, Clock } from 'lucide-react';
import { API_CATALOG } from '../data/apiCatalog';
import { EndpointBadge } from '../components/EndpointBadge';
import { CodeBlock } from '../components/CodeBlock';
import { MemeTicker } from '../components/MemeTicker';
import { MemeWall } from '../components/MemeWall';
import { MemeSticker } from '../components/MemeSticker';
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
  { border: 'border-amber-400',  num: 'text-amber-400',  shadow: 'shadow-comic-yellow', badge: 'bg-amber-400 text-black' },
  { border: 'border-purple-400', num: 'text-purple-400', shadow: 'shadow-comic-blue',   badge: 'bg-purple-500 text-white' },
];

// Malayalam actors reacting to each specific useless microservice
const API_REACTION_STICKERS: Record<string, { src: string; speech: string; rotation: string; speechColor?: string }> = {
  vibe: { src: '/assets/memes/jagathy-shocked.png', speech: 'CHAOS 99%?!', rotation: 'rotate-[-8deg]', speechColor: 'bg-rose-500 text-white' },
  motivation: { src: '/assets/memes/lal-laughing.png', speech: 'ENTHINA?!', rotation: 'rotate-[6deg]', speechColor: 'bg-yellow-400 text-black' },
  necessity: { src: '/assets/memes/innocent-serious.png', speech: 'VENO?!', rotation: 'rotate-[-6deg]', speechColor: 'bg-amber-400 text-black' },
  decision: { src: '/assets/memes/salimkumar-pointing.png', speech: 'YES OR NO?!', rotation: 'rotate-[8deg]', speechColor: 'bg-blue-400 text-black' },
  roast: { src: '/assets/memes/mammootty-crying.png', speech: 'DAMAGE!', rotation: 'rotate-[-10deg]', speechColor: 'bg-red-600 text-white' },
  excuse: { src: '/assets/memes/salimkumar-class.png', speech: 'STAGING POYI!', rotation: 'rotate-[7deg]', speechColor: 'bg-purple-500 text-white' },
};

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
      title: 'നരകം Control Room',
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
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 pb-16 overflow-hidden bg-black">
        {/* Terminal grid overlay */}
        <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />

        {/* Rich atmospheric radial halos behind headline */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-yellow-400/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[450px] h-[300px] bg-purple-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-cyan-500/12 rounded-full blur-[110px] pointer-events-none" />

        {/* Decorative ambient orbs */}
        <div className="absolute top-10 left-[-5%] w-72 h-72 rounded-full blur-3xl blob-drift pointer-events-none" style={{ background: 'rgba(255,228,20,0.15)' }} />
        <div className="absolute bottom-10 right-[-5%] w-96 h-96 rounded-full blur-3xl blob-drift-2 pointer-events-none" style={{ background: 'rgba(0,102,255,0.15)' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-2xl blob-drift-3 pointer-events-none" style={{ background: 'rgba(236,72,153,0.08)' }} />

        {/* Big spinning ring decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <div
            className="animate-rotate-slow opacity-[0.04]"
            style={{
              width: '90vmin',
              height: '90vmin',
              borderRadius: '50%',
              border: '3px dashed #ffe814',
            }}
          />
        </div>

        {/* Background PANI watermark text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-bungee text-white leading-none"
            style={{ fontSize: 'clamp(8rem, 30vw, 28rem)', opacity: 0.025 }}
          >
            PANI
          </span>
        </div>

        {/* Badge — no sticker wobble on hero, just entrance */}
        <div className="hero-narakam inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-black font-bungee text-xs tracking-wider shadow-comic mb-6 border-2 border-black">
          <Flame className="w-4 h-4 text-red-600" />
          <span>OFFICIAL MALAYALAM MEME INFRASTRUCTURE • v1.0 LIVE</span>
        </div>

        {/* Hero Meme Avatar Mascot Sticker */}
        <div className="hero-narakam mb-5 relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-yellow-400 border-4 border-black p-1 shadow-comic rotate-[-4deg] hover:rotate-[2deg] hover:scale-105 transition-all duration-300 overflow-hidden mx-auto">
            <img
              src="/assets/narakam-logo.png"
              alt="നരകം EVIDEHHHH ? Mascot"
              className="w-full h-full object-cover object-top rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bungee text-[10px] border-2 border-black shadow-comic-sm">
            EVIDEHH?!
          </div>
        </div>

        {/* KINETIC HEADLINE WITH FLOATING MEME STICKERS */}
        <div className="relative space-y-0 mb-6 w-full max-w-4xl mx-auto">
          {/* Jagathy Shocked Face peeking on left (desktop/tablet) */}
          <div className="hidden md:block absolute -left-12 top-4 z-20">
            <MemeSticker
              src="/assets/memes/jagathy-shocked.png"
              speech="AYYO?!"
              speechColor="bg-rose-500 text-white"
              speechPosition="top-left"
              rotation="rotate-[-12deg]"
              size="w-20 lg:w-24"
              float={true}
            />
          </div>

          {/* Salim Kumar Pointing Finger on right, aiming at CTA */}
          <div className="hidden md:block absolute -right-10 top-8 z-20">
            <MemeSticker
              src="/assets/memes/salimkumar-pointing.png"
              speech="CHEYYEDA!"
              speechColor="bg-yellow-400 text-black"
              speechPosition="top-right"
              rotation="rotate-[10deg]"
              size="w-24 lg:w-28"
              pulse={true}
            />
          </div>

          {/* നരകം */}
          <h1
            className="hero-narakam font-malayalam font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 9rem)', textShadow: '0 6px 0 rgba(255,228,20,0.25)' }}
          >
            നരകം
          </h1>
          {/* EVIDEHHHH ? — slams in from left, responsive size */}
          <div
            className="hero-evide font-bungee text-yellow-400 leading-[0.9] tracking-[0.03em]"
            style={{
              fontSize: 'clamp(3rem, 14vw, 10rem)',
              textShadow: '0 8px 0 rgba(0,0,0,1), 0 0 40px rgba(255,228,20,0.4)',
            }}
          >
            EVIDEHHHH ?
          </div>
        </div>

        {/* Decorative horizontal accent line */}
        <div className="hero-api w-full max-w-lg mx-auto h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent mb-5" />

        {/* API badge sticker */}
        <div className="hero-api inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black border-2 border-yellow-400/60 text-yellow-300 font-mono text-xs font-bold shadow-comic-yellow mb-6">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          6 USELESS MICROSERVICES • RENDER GATEWAY • ZERO PROBLEMS SOLVED
        </div>

        {/* Rotating subtitle */}
        <div className="hero-subtitle h-14 flex items-center justify-center mb-8 max-w-3xl mx-auto w-full px-2">
          <p
            className="text-sm sm:text-base text-slate-200 font-mono font-bold leading-relaxed bg-black/70 border border-yellow-400/20 py-2 px-4 sm:px-5 rounded-xl w-full sm:w-auto"
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
        <div className="hero-ctas relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-lg mx-auto">
          <Link
            to="/playground"
            className="btn-meme w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-bungee text-sm tracking-wider border-2 border-black shadow-comic transition-all hover:scale-105 active:scale-95"
          >
            <span>🔥 PANI THUDAKKAM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/apis"
            className="btn-meme w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#0f1424] hover:bg-slate-800 text-white font-bungee text-sm tracking-wider border-2 border-blue-500/40 shadow-comic-blue transition-all hover:scale-105 active:scale-95"
          >
            <span>BROWSE 6 USELESS APIs</span>
          </Link>
        </div>

        {/* Hero curl code block with Suraj laughing hanging off the corner */}
        <div className="hero-code card-glow-yellow relative max-w-2xl w-full mx-auto text-left rounded-2xl border-2 border-yellow-400/50 bg-[#060913]/95 overflow-visible shadow-comic-yellow">
          {/* Suraj laughing sticker attached to code block */}
          <div className="hidden sm:block absolute -top-8 -right-6 z-30 pointer-events-none">
            <MemeSticker
              src="/assets/memes/suraj-laughing.png"
              speech="CURL ADIKKU!"
              speechColor="bg-yellow-400 text-black"
              rotation="rotate-[6deg]"
              size="w-20"
            />
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-[#0c1020] border-b border-yellow-400/20 text-xs font-mono text-slate-300 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black inline-block" />
              <span className="ml-2 font-bold font-bungee text-[11px] text-yellow-300">curl — നരകം Gateway</span>
            </div>
            <span className="text-[11px] font-mono font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
              HTTP/2 200 SCENE OK
            </span>
          </div>
          <div className="p-4">
            <CodeBlock code={heroCurl} language="bash" filename="Executable Command" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-ctas absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-yellow-400/50 animate-float-y pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-yellow-400/50 to-transparent" />
        </div>
      </section>
      {/* ============================================================
          KINETIC DIVIDER STRIP
          ============================================================ */}
      <div className="relative h-10 overflow-hidden bg-yellow-400 border-y-2 border-black">
        <div className="animate-slide-x whitespace-nowrap flex items-center h-full gap-6 select-none font-bungee text-black text-xs tracking-widest">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 shrink-0">
              <span>🔥 PANI DETECTED</span>
              <span>•</span>
              <span>😂 നരകം EVIDEHHHH ?</span>
              <span>•</span>
              <span>⚡ HTTP 200 SCENE OK</span>
              <span>•</span>
              <span>💀 ZERO PROBLEMS SOLVED</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================
          MEME WALL — DEEP DARK WITH YELLOW WARMTH
          ============================================================ */}
      <div className="bg-gradient-to-b from-[#0e0d00] via-[#0d0d00] to-[#030712]">
        <MemeWall />
      </div>


      {/* ============================================================
          METRICS STRIP — DARK WORLD
          ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="reveal-init grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { val: '99.8%', label: 'Pointless SLA', sub: '0.2% accidental utility', color: 'text-yellow-400', glow: 'card-glow-yellow' },
            { val: '6',     label: 'Absurd Microservices', sub: '100% Express + TS Gateway', color: 'text-cyan-400', glow: 'card-glow-cyan' },
            { val: '0',     label: 'Problems Solved', sub: 'Engineered to solve nothing', color: 'text-rose-400', glow: 'card-glow-pink' },
            { val: '<1ms',  label: 'Gateway Latency', sub: 'Enthina ithra vegam?', color: 'text-emerald-400', glow: 'card-glow-emerald' },
          ].map((m, i) => (
            <div
              key={m.label}
              className={`reveal-scale stagger-${i + 1} ${m.glow} p-6 rounded-2xl bg-[#080d1a] border-2 border-black relative overflow-hidden text-center space-y-1 hover:scale-105 transition-all duration-300 shadow-comic-sm`}
            >
              <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent absolute top-0 left-0" />
              <div className={`text-3xl sm:text-4xl font-bungee ${m.color} drop-shadow-[0_0_12px_currentColor]`}>{m.val}</div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">{m.label}</div>
              <p className={`text-[10px] font-mono ${m.color}/80 font-semibold`}>{m.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          ALL 6 API POSTERS — ELECTRIC BLUE WORLD
          ============================================================ */}
      <section className="relative py-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #03071a 0%, #030d26 50%, #030712 100%)' }}>
        {/* Blueprint grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,102,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        {/* Glow edge top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

        {/* Background API watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-bungee text-blue-400 leading-none" style={{ fontSize: 'clamp(6rem, 22vw, 20rem)', opacity: 0.025 }}>
            API
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header */}
          <div className="reveal-init flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-blue-500/30">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-bold">
                  Production Endpoints — Render Gateway Online
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bungee text-white">
                6 Intentional <span className="text-blue-400">Non-Solutions</span>
              </h2>
              <p className="text-sm text-slate-400 mt-1 font-mono">
                Backed by in-memory telemetry. Certified 99.8% useless by Kerala developers.
              </p>
            </div>
            <Link
              to="/apis"
              className="mt-4 md:mt-0 btn-meme inline-flex items-center gap-1.5 text-xs font-bungee text-blue-400 hover:text-blue-300 border border-blue-500/40 px-3 py-2 rounded-lg bg-blue-500/10 transition-colors"
            >
              <span>FULL CATALOG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* API Poster Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {API_CATALOG.map((api, idx) => {
              const accent = POSTER_ACCENTS[idx % POSTER_ACCENTS.length];
              const reaction = API_REACTION_STICKERS[api.slug];
              return (
                <div
                  key={api.slug}
                  className={`api-poster reveal-init stagger-${(idx % 3) + 1} flex flex-col justify-between h-full rounded-2xl border-2 ${accent.border} bg-[#080c1a] p-6 ${accent.shadow} group relative overflow-visible`}
                >
                  {/* Subtle corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 rounded-tr-2xl`} style={{ background: `radial-gradient(circle at top right, currentColor, transparent)` }} />

                  {/* Reaction Sticker reacting to this API */}
                  {reaction && (
                    <div className="absolute -top-7 -right-3 pointer-events-none z-30 group-hover:scale-110 group-hover:rotate-0 transition-transform">
                      <MemeSticker
                        src={reaction.src}
                        speech={reaction.speech}
                        speechColor={reaction.speechColor}
                        rotation={reaction.rotation}
                        size="w-16 sm:w-20"
                      />
                    </div>
                  )}

                  {/* API Number sticker */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`api-number font-bungee text-5xl ${accent.num} opacity-20 leading-none`}>
                      0{idx + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${accent.badge} border border-black shadow-comic-sm`}>
                      {idx % 2 === 0 ? 'DANGEROUSLY USELESS' : 'VERY USELESS'}
                    </span>
                  </div>

                  {/* Endpoint row */}
                  <div className="flex items-center gap-2 mb-3">
                    <EndpointBadge method={api.method} />
                    <span className="api-endpoint font-mono text-xs text-slate-300 font-bold">{api.endpoint}</span>
                  </div>

                  <h3 className="text-lg font-bold font-sans text-white group-hover:text-yellow-300 transition-colors">
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
        {/* Glow edge bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
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
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl font-bungee text-white">Serious Infrastructure</h2>
              <div className="hidden sm:block absolute -top-8 -right-16 z-20 pointer-events-none">
                <MemeSticker
                  src="/assets/memes/innocent-serious.png"
                  speech="SUB-1MS VEGAM?!"
                  speechColor="bg-yellow-400 text-black"
                  rotation="rotate-[8deg]"
                  size="w-16 sm:w-20"
                  float={true}
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-mono">
              Every feature you'd expect from a high-availability cloud provider, dedicated purely to Malayali non-problems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credibilityFeatures.map((feat, i) => (
              <div
                key={feat.title}
                className={`reveal-init stagger-${i + 1} glass-panel-interactive p-5 rounded-2xl relative overflow-hidden space-y-3 font-mono transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="h-0.5 w-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-transparent absolute top-0 left-0" />
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 shadow-inner">
                    {feat.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-yellow-400 block drop-shadow-[0_0_8px_rgba(255,232,20,0.3)]">{feat.value}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{feat.malayalamBadge}</span>
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
          FINAL CTA — YELLOW WORLD & MEME STICKER BOMB
          ============================================================ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="reveal-scale max-w-5xl mx-auto p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-400 text-center space-y-6 shadow-comic border-2 border-black relative overflow-visible">
          {/* 4 Corner Reaction Stickers */}
          <div className="hidden sm:block absolute -top-8 -left-6 z-20 pointer-events-none">
            <MemeSticker
              src="/assets/memes/salimkumar-pointing.png"
              speech="AVANMARU IPPO VARUM!"
              speechColor="bg-black text-yellow-400"
              rotation="rotate-[-12deg]"
              size="w-24"
              float={true}
            />
          </div>
          <div className="hidden sm:block absolute -top-8 -right-6 z-20 pointer-events-none">
            <MemeSticker
              src="/assets/memes/suraj-laughing.png"
              speech="PANI SURE!"
              speechColor="bg-red-600 text-white"
              rotation="rotate-[12deg]"
              size="w-24"
              float={true}
            />
          </div>
          <div className="hidden md:block absolute -bottom-6 -left-6 z-20 pointer-events-none">
            <MemeSticker
              src="/assets/memes/mammootty-crying.png"
              speech="DEPLOY AAYI!"
              speechColor="bg-black text-white"
              rotation="rotate-[8deg]"
              size="w-20"
            />
          </div>
          <div className="hidden md:block absolute -bottom-6 -right-6 z-20 pointer-events-none">
            <MemeSticker
              src="/assets/memes/mukesh-laugh.png"
              speech="SCENE ILLA!"
              speechColor="bg-emerald-400 text-black"
              rotation="rotate-[-8deg]"
              size="w-20"
            />
          </div>

          {/* Decorative PANI text in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden rounded-3xl">
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
