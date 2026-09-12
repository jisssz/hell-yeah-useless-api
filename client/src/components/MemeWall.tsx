import React from 'react';
import { MemeCard } from './MemeCard';
import { MemeSticker } from './MemeSticker';

export const MemeWall: React.FC = () => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="reveal-init relative text-center max-w-3xl mx-auto mb-14 space-y-3">
        {/* Innocent peeking sticker on header */}
        <div className="hidden sm:block absolute -top-8 -left-8 pointer-events-none z-20">
          <MemeSticker
            src="/assets/memes/innocent-serious.png"
            speech="ITHU VENAMAYIRUNNO?"
            speechColor="bg-yellow-400 text-black"
            rotation="rotate-[-10deg]"
            size="w-16 sm:w-20"
            float={true}
          />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-black font-bungee text-xs tracking-wider shadow-comic sticker sticker-3">
          <span>🔥 MALAYALAM DEV MEME ARCHIVE</span>
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bungee text-white tracking-tight">
          The Hall of <span className="text-yellow-400">Absolute Pani</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-mono">
          "Malayali developers already have enough problems. We decided to manufacture six more over HTTP."
        </p>
      </div>

      {/* Animated Meme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <MemeCard
          character="innocent"
          tag="ARCHITECTURE REVIEW"
          tagColor="bg-yellow-400 text-black"
          malayalamQuote="ഇത് വേണമായിരുന്നോ?"
          englishTranslation="Ithu venamayirunno? (Was this strictly necessary?)"
          subtext="When someone proposes microservices, Kubernetes, and an event-bus for an internal canteen coupon website."
          rotation="-rotate-1"
          badge="DECISION API"
          animClass="card-anim-left meme-stagger-1"
        />

        <MemeCard
          character="salimkumar"
          tag="SPRINT ESTIMATION"
          tagColor="bg-rose-500 text-white"
          malayalamQuote="എല്ലാത്തിനും അതിന്റേതായ സമയമുണ്ട് ദാസപ്പൻ..."
          englishTranslation="Pani Paali. (Everything has its own cosmic time...)"
          subtext="Story points were 3. It has been 4 months. The sprint is dead. The team has accepted spiritual defeat."
          rotation="rotate-1"
          badge="MOTIVATION API"
          animClass="card-anim-top meme-stagger-2"
        />

        <MemeCard
          character="kunjappan"
          tag="TECH STACK REALITY"
          tagColor="bg-amber-300 text-black"
          malayalamQuote="പണി ആയോ? അതോ ഇനി ആവാൻ പോവാണോ?"
          englishTranslation="Pani aayo? (Did it break yet, or is it scheduled to break?)"
          subtext="Aesthetic Kunjappan evaluated your React rewrite in Rust. Diagnostic: 100% emotional damage."
          rotation="-rotate-2"
          badge="ROAST API"
          animClass="card-anim-right meme-stagger-3"
        />

        <MemeCard
          character="jagathy"
          tag="STANDUP EXCUSES"
          tagColor="bg-indigo-500 text-white"
          malayalamQuote="അണ്ണാ... അവൻ അത് അറിഞ്ഞോ?"
          englishTranslation="Annah... avan athu arinjo? (Boss... does anyone know staging is down?)"
          subtext="Generates 4-syllable distributed systems jargon to explain why staging has been returning HTTP 500 since Thursday."
          rotation="rotate-2"
          badge="EXCUSE API"
          animClass="card-anim-scale meme-stagger-4"
        />

        <MemeCard
          character="thilakan"
          tag="MEETING VALIDATION"
          tagColor="bg-red-500 text-white"
          malayalamQuote="അതെന്താടോ താൻ ഓർത്തു വെച്ച് സംസാരിക്കുന്നേ?"
          englishTranslation="AthentHaado thaan orthu vechu samsarikkunne?!"
          subtext="The oracle mathematically proved your 45-minute sync could have been resolved with a single thumbs-up emoji."
          rotation="-rotate-1"
          badge="NECESSITY API"
          animClass="card-anim-left-2 meme-stagger-5"
        />

        <MemeCard
          character="mohanlal"
          tag="VIBE CHECK HARMONIC"
          tagColor="bg-emerald-400 text-black"
          malayalamQuote="കാവിലെ പാട്ട് മത്സരം കഴിഞ്ഞു... ഇനി ശാന്തത."
          englishTranslation="Kaavile paattu malsaram kazhinju... ini shanthatha."
          subtext="Git rebase conflict resolved after 14 hours. Your laptop fan is humming at 13.37 Hz. Absolute peace."
          rotation="rotate-1"
          badge="VIBE API"
          animClass="card-anim-right-2 meme-stagger-6"
        />
      </div>

      {/* Bottom Status Banner with Mukesh Sticker */}
      <div className="reveal-init relative mt-12 p-6 rounded-2xl bg-[#0e1222] border-2 border-yellow-400/40 flex flex-wrap items-center justify-between gap-4 shadow-comic-yellow overflow-visible">
        {/* Mukesh laughing sticker */}
        <div className="hidden sm:block absolute -top-8 right-8 pointer-events-none z-20">
          <MemeSticker
            src="/assets/memes/mukesh-laugh.png"
            speech="SCENE ILLA BRO!"
            speechColor="bg-yellow-400 text-black"
            rotation="rotate-[6deg]"
            size="w-16 sm:w-20"
            float={true}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-float-y">🔥</span>
          <div>
            <h4 className="font-bungee text-white text-sm tracking-wide">
              CERTIFIED 100% MALAYALI ENTERPRISE NONSENSE
            </h4>
            <p className="font-mono text-xs text-yellow-300/80">
              "Deploy cheythu... ippo pedikkam!" (Deployed to production... now we panic!)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded bg-black border border-slate-700 text-emerald-400 font-bold shadow-comic">
            STATUS: 200 OK
          </span>
          <span className="px-3 py-1 rounded bg-yellow-400 text-black font-black shadow-comic">
            PROBLEM: NONE
          </span>
          <span className="px-3 py-1 rounded bg-rose-500 text-white font-bold shadow-comic">
            API: STILL RUNNING
          </span>
        </div>
      </div>
    </section>
  );
};

