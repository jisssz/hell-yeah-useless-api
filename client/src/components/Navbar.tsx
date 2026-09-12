import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Activity, BookOpen, Layers, Menu, X, Sparkles, ArrowRight, Play } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'APIs', path: '/apis', icon: <Layers className="w-4 h-4" /> },
    { name: 'Playground', path: '/playground', icon: <Play className="w-4 h-4" /> },
    { name: 'Docs', path: '/docs', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Analytics', path: '/analytics', icon: <Activity className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/apis') {
      return location.pathname === '/apis' || location.pathname.startsWith('/apis/');
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                USELESS API
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                v1.0
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-mono">
              Infrastructure for problems nobody has
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700/80'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right action / status */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>99.8% Useless SLA</span>
          </div>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-semibold transition-colors shadow-sm"
          >
            <span>Try an API</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-300 hover:bg-slate-800/50'
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Try an API
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
