import React from 'react';

export const MemeTicker: React.FC = () => {
  const tickerItems = [
    '🚨 ALERT: PRODUCTION-IL PANI KITTITTO?',
    '⚡️ 99.8% POINTLESS SLA GUARANTEED',
    '👴🏽 INNOCENT: "ITHU VENAMAYIRUNNO?"',
    '🕶️ MANAVALAN: "ELLATHINUM ATHINTE THAYA SAMAYAM UND DA"',
    '💥 BREAKING: 0 BUGS FIXED (NONE EXISTED)',
    '☕️ CHAYA KUDICHITTU DEBUG CHEYYAM',
    '🔥 NARAGAM EVIDE? IVANMARU CODE CHEYYUNNA STHALATHU!',
    '👓 THILAKAN: "ATHENTHAADO THAAN ORTHU VECHU SAMSARIKKUNNE?"',
    '🚀 SERVER LATENCY: 0.42ms (ENTHINA ITHRA VEGAM?)',
    '✅ STATUS 200: SCENE ILLA BRO',
  ];

  return (
    <div className="w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 text-black py-2 overflow-hidden border-y-2 border-black font-mono font-black text-xs uppercase tracking-wider select-none shadow-md">
      <div className="flex w-max animate-marquee space-x-8">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <span>{item}</span>
            <span className="text-black/40 font-bold">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
