import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-black bg-[#0a0f1d] text-slate-400 text-sm mt-auto">
      {/* Top comic stripe */}
      <div className="bg-[#ffe814] text-black font-mono font-bold text-xs py-2 px-4 border-b-2 border-black flex items-center justify-between overflow-hidden">
        <span className="flex items-center gap-2">
          <span>🔥</span>
          <span className="font-malayalam font-black text-sm">നരകം</span>
          <span className="font-bungee">EVIDEHHHH ?</span>
          <span className="hidden sm:inline">— ഒരു നരകം പോലും ഇല്ലാത്ത ലക്ഷണമൊത്ത API</span>
        </span>
        <span className="hidden md:inline-block font-mono text-[11px] text-black/80">
          SLA: 99.8% USELESS • LATENCY: sub-1ms NONSENSE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-400 border-2 border-black flex items-center justify-center text-xl shadow-comic">
                😂
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-malayalam font-black text-lg text-white leading-none">നരകം</span>
                  <span className="font-bungee text-base text-yellow-400 tracking-wider">EVIDEHHHH ?</span>
                </div>
                <span className="block text-[11px] font-mono text-emerald-400 font-bold">Infrastructure for problems nobody asked you to solve</span>
              </div>
            </div>
            <p className="text-slate-300 text-xs font-mono max-w-sm leading-relaxed">
              6 ridiculous endpoints backed by in-memory ring-buffer telemetry, strict input validation, and genuine Malayalam cinema existentialism.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <span className="bg-[#1e293b] px-2 py-0.5 rounded border border-slate-700 text-amber-300 font-bold">Team നരകം EVIDEHHHH ?</span>
              <span>•</span>
              <span>TinkerHub Useless Projects 3.0</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5">
              <span>⚡</span>
              <span>6 USELESS APIS</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link to="/apis/vibe" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"><span>🔮</span> Vibe (വൈബ് ഒറാക്കിൾ)</Link></li>
              <li><Link to="/apis/motivation" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"><span>🔥</span> Motivation (എന്തിനാ മോട്ടിവേഷൻ?)</Link></li>
              <li><Link to="/apis/necessity" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"><span>🧐</span> Necessity (ഇത് വേണമായിരുന്നോ?)</Link></li>
              <li><Link to="/apis/decision" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"><span>⚖️</span> Decision (തീരുമാനം ആയോ?)</Link></li>
              <li><Link to="/apis/roast" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"><span>🌶️</span> Roast (റോസ്റ്റിംഗ് ചേട്ടൻ)</Link></li>
              <li><Link to="/apis/excuse" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5"><span>🤷</span> Excuse (ന്യായീകരണ ക്യാപ്സൂൾ)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono mb-3 flex items-center gap-1.5">
              <span>📡</span>
              <span>PLATFORM</span>
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><Link to="/apis" className="hover:text-emerald-400 transition-colors">API Catalog</Link></li>
              <li><Link to="/playground" className="hover:text-emerald-400 transition-colors">API Playground (പരീക്ഷണശാല)</Link></li>
              <li><Link to="/docs" className="hover:text-emerald-400 transition-colors">Documentation (സത്യവാങ്മൂലം)</Link></li>
              <li><Link to="/analytics" className="hover:text-emerald-400 transition-colors">Control Room (ലൈവ് ടെലിമെട്രി)</Link></li>
              <li>
                <a
                  href="https://github.com/jisssz/hell-yeah-useless-api"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub Repo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <p>© 2026 നരകം EVIDEHHHH ? All rights reserved to solve nothing.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with കട്ടൻചായ &amp; memes at</span>
            <span className="text-yellow-400 font-bold">TinkerHub Useless Projects 3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

