import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { ApiDetailPage } from './pages/ApiDetailPage';
import { DocsPage } from './pages/DocsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';

// Loading intro — only shown once per session
const LoadingScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1350);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-yellow-400/5 blob-drift pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-600/5 blob-drift-2 pointer-events-none" />

      <div className="relative text-center select-none">
        {/* Mascot Avatar */}
        <div className="loader-word-1 mb-4 flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-yellow-400 border-4 border-black p-1 shadow-comic rotate-[-4deg] overflow-hidden">
            <img
              src="/assets/narakam-logo.png"
              alt="നരകം EVIDEHHHH ?"
              className="w-full h-full object-cover object-top rounded-xl"
            />
          </div>
        </div>

        {/* നരകം */}
        <div className="loader-word-1 font-malayalam font-black text-5xl sm:text-7xl text-white tracking-tight leading-none">
          നരകം
        </div>
        {/* EVIDEHHHH ? */}
        <div className="loader-word-2 font-bungee text-6xl sm:text-8xl text-yellow-400 tracking-wider leading-none mt-1">
          EVIDEHHHH ?
        </div>
        {/* Status */}
        <div className="loader-status mt-6 font-mono text-xs text-slate-400 tracking-widest uppercase">
          <span className="loader-blink">▌</span>
          {' '}PANI SYSTEM INITIALIZING...
        </div>
      </div>
    </div>
  );
};

// Global scroll-reveal via IntersectionObserver
function useScrollReveal() {
  const observed = useRef(false);
  useEffect(() => {
    if (observed.current) return;
    observed.current = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    const observe = () => {
      document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate')
        .forEach((el) => io.observe(el));
    };
    observe();
    // Re-observe after route changes via MutationObserver
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);
}

const AppInner: React.FC = () => {
  useScrollReveal();
  return (
    <div className="relative flex flex-col min-h-screen bg-[#030712] text-slate-100 selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      {/* Global atmospheric background blobs & tech grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-600/10 blur-[120px] blob-drift" />
        <div className="absolute top-[35%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-blue-600/10 blur-[130px] blob-drift-2" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/8 blur-[140px] blob-drift-3" />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/apis" element={<CatalogPage />} />
            <Route path="/apis/:slug" element={<ApiDetailPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const alreadySeen = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('intro_done');
  const [showLoader, setShowLoader] = useState(!alreadySeen);

  const handleDone = () => {
    sessionStorage.setItem('intro_done', '1');
    setShowLoader(false);
  };

  return (
    <BrowserRouter>
      {showLoader && <LoadingScreen onDone={handleDone} />}
      <AppInner />
    </BrowserRouter>
  );
};

export default App;
