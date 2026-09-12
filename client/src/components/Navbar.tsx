import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, BookOpen, Layers, Menu, X, ArrowRight, Play, Flame } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'USELESS APIs', path: '/apis', icon: <Layers className="w-4 h-4" /> },
    { name: 'PLAYGROUND', path: '/playground', icon: <Play className="w-4 h-4" /> },
    { name: 'CONTROL ROOM', path: '/analytics', icon: <Activity className="w-4 h-4 text-yellow-400" /> },
    { name: 'DOCS', path: '/docs', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/apis') {
      return location.pathname === '/apis' || location.pathname.startsWith('/apis/');
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#060810]/85 backdrop-blur-xl shadow-xl shadow-black/60">
      {/* Top Electric Sub-Bar */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 text-white text-[11px] font-mono font-bold py-1 px-4 flex items-center justify-between border-b border-purple-400/30 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="animate-bounce">🔥</span>
          <span className="tracking-wide">TINKERHUB USELESS PROJECTS 3.0 • നരകം EVIDEHHHH ? OFFICIAL DEVELOPER SUFFERING PORTAL</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[10px]">
          <span className="bg-black/40 px-2 py-0.5 rounded text-yellow-300 border border-yellow-400/30">SLA: 99.8% POINTLESS</span>
          <span className="text-emerald-300 flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SCENE ILLA BRO
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 border-2 border-black overflow-hidden flex items-center justify-center shadow-comic group-hover:rotate-6 group-hover:scale-110 transition-transform duration-200 shrink-0 ring-2 ring-yellow-400/30">
            <img
              src="/assets/narakam-logo.png"
              alt="നരകം EVIDEHHHH ? Logo"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-malayalam font-black text-base sm:text-lg text-white group-hover:text-yellow-400 transition-colors leading-none">
                നരകം
              </span>
              <span className="font-bungee text-sm sm:text-base tracking-wider text-yellow-400 group-hover:text-white transition-colors drop-shadow-[0_0_12px_rgba(250,204,21,0.3)]">
                EVIDEHHHH ?
              </span>
              <span className="hidden sm:inline-block text-[9px] font-bungee px-2 py-0.5 rounded bg-yellow-400 text-black border border-black shadow-comic">
                v1.0 API
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-yellow-300/80 font-mono font-medium">
              Infrastructure for problems nobody asked you to solve
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 font-mono text-xs font-bold">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                  active
                    ? 'bg-yellow-400 text-black border-2 border-black shadow-comic font-black scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-300 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>GATEWAY ONLINE</span>
          </div>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 text-black font-bungee text-xs tracking-wider border-2 border-black transition-all shadow-comic hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            <span>TRY PANI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-yellow-400 hover:text-white hover:bg-slate-800 focus:outline-none border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b-2 border-black bg-[#060810] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold ${
                isActive(link.path)
                  ? 'bg-yellow-400 text-black border-2 border-black'
                  : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800">
            <Link
              to="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-400 text-black font-bungee text-xs tracking-wider border-2 border-black shadow-comic"
            >
              <Flame className="w-4 h-4" />
              TRY PANI IN PLAYGROUND
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
