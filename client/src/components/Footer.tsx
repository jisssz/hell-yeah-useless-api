import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#02050e] text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-bold text-white tracking-tight">USELESS API</span>
            </div>
            <p className="text-slate-400 text-xs font-mono max-w-sm leading-relaxed">
              "Infrastructure for problems nobody has." Enterprise-grade developer telemetry and high-availability endpoints engineered strictly for satire.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>Built by Team HELL YEAH</span>
              <span>•</span>
              <span>TinkerHub Useless Projects 3.0</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-3">Endpoints</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/apis/vibe" className="hover:text-emerald-400 transition-colors">Vibe API</Link></li>
              <li><Link to="/apis/motivation" className="hover:text-emerald-400 transition-colors">Motivation API</Link></li>
              <li><Link to="/apis/necessity" className="hover:text-emerald-400 transition-colors">Necessity API</Link></li>
              <li><Link to="/apis/decision" className="hover:text-emerald-400 transition-colors">Decision API</Link></li>
              <li><Link to="/apis/roast" className="hover:text-emerald-400 transition-colors">Roast API</Link></li>
              <li><Link to="/apis/excuse" className="hover:text-emerald-400 transition-colors">Excuse API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/apis" className="hover:text-emerald-400 transition-colors">API Catalog</Link></li>
              <li><Link to="/docs" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
              <li><Link to="/analytics" className="hover:text-emerald-400 transition-colors">Live Telemetry</Link></li>
              <li>
                <a
                  href="https://github.com/jisssz/hell-yeah-useless-api"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <p>© 2026 USELESS API. All rights reserved to solve nothing.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>at TinkerHub Useless Projects 3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
