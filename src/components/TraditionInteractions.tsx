import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import { playPop, playChime, playSuccess } from '../utils/audio';

/* ==========================================================================
   1. EASTER EGG PAINTER (Jaro)
   ========================================================================== */
export const EasterEggPainter: React.FC = () => {
  const [color, setColor] = useState<'white' | 'red' | 'yellow' | 'blue' | 'green'>('white');
  const [pattern, setPattern] = useState<'none' | 'dots' | 'stripes' | 'stars'>('none');

  const handleColorChange = (newColor: typeof color) => {
    playPop();
    setColor(newColor);
    if (pattern !== 'none') {
      playChime();
    }
  };

  const handlePatternChange = (newPattern: typeof pattern) => {
    playPop();
    setPattern(newPattern);
    playSuccess();
  };

  const colors = [
    { id: 'white', bg: 'bg-slate-100', text: 'Bílá' },
    { id: 'red', bg: 'bg-rose-500', text: 'Červená' },
    { id: 'yellow', bg: 'bg-amber-400', text: 'Žlutá' },
    { id: 'blue', bg: 'bg-sky-400', text: 'Modrá' },
    { id: 'green', bg: 'bg-emerald-500', text: 'Zelená' }
  ];

  const patterns = [
    { id: 'none', label: 'Čisté' },
    { id: 'dots', label: 'Puntíky ⚪' },
    { id: 'stripes', label: 'Proužky ➖' },
    { id: 'stars', label: 'Hvězdičky ⭐' }
  ];

  return (
    <div className="bg-white p-4 rounded-xl border border-emerald-100 mt-3 text-center" id="easter-egg-painter">
      <span className="text-xs font-bold text-emerald-800 block mb-2 uppercase">🎨 Vybarvi si velikonoční kraslici</span>
      
      {/* Egg Canvas */}
      <div className="flex justify-center mb-4">
        <div className={`w-24 h-32 rounded-b-[45%] rounded-t-[55%] border-4 border-amber-800 shadow-lg relative transition-all duration-300 flex items-center justify-center ${
          color === 'white' ? 'bg-amber-50' :
          color === 'red' ? 'bg-rose-500' :
          color === 'yellow' ? 'bg-amber-400' :
          color === 'blue' ? 'bg-sky-400' :
          'bg-emerald-500'
        }`}>
          {/* Patterns overlay */}
          {pattern === 'dots' && (
            <div className="absolute inset-0 flex flex-wrap justify-around p-4 opacity-70 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 bg-white rounded-full"></span>
              ))}
            </div>
          )}

          {pattern === 'stripes' && (
            <div className="absolute inset-x-0 h-full flex flex-col justify-around py-4 opacity-70 pointer-events-none">
              <div className="h-2 bg-white w-full"></div>
              <div className="h-2 bg-yellow-100 w-full"></div>
              <div className="h-2 bg-white w-full"></div>
            </div>
          )}

          {pattern === 'stars' && (
            <div className="absolute inset-0 flex flex-wrap justify-around p-4 opacity-80 pointer-events-none text-white font-bold text-lg">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          )}

          <span className="text-amber-900/50 font-bold text-[10px] select-none absolute bottom-4">Kraslice</span>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Colors selector */}
        <div>
          <span className="text-[10px] text-slate-500 block mb-1">Zvol barvu:</span>
          <div className="flex justify-center space-x-2">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => handleColorChange(c.id as any)}
                className={`w-6 h-6 rounded-full ${c.bg} border border-slate-300 transition-transform hover:scale-110 ${
                  color === c.id ? 'ring-2 ring-emerald-500 scale-110' : ''
                }`}
                title={c.text}
                id={`btn-color-${c.id}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Patterns selector */}
        <div>
          <span className="text-[10px] text-slate-500 block mb-1">Zvol vzor:</span>
          <div className="flex justify-center space-x-1">
            {patterns.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePatternChange(p.id as any)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full border transition-all ${
                  pattern === p.id
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                id={`btn-pattern-${p.id}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ==========================================================================
   2. CAMPFIRE LIGHTER (Léto)
   ========================================================================== */
export const CampfireLighter: React.FC = () => {
  const [logs, setLogs] = useState(0); // 0 to 3
  const [lit, setLit] = useState(false);

  const addLog = () => {
    if (logs < 3) {
      playPop();
      setLogs(logs + 1);
    }
  };

  const lightFire = () => {
    if (logs === 3) {
      playSuccess();
      setLit(true);
    }
  };

  const resetFire = () => {
    playPop();
    setLogs(0);
    setLit(false);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-amber-100 mt-3 text-center" id="campfire-lighter">
      <span className="text-xs font-bold text-amber-800 block mb-2 uppercase">🔥 Rozdělej letní táborák!</span>

      <div className="h-32 bg-slate-900 rounded-lg relative flex flex-col justify-end items-center p-2 mb-3 overflow-hidden">
        {/* Fire glow */}
        {lit && (
          <div className="absolute inset-0 bg-orange-600/20 animate-pulse z-0"></div>
        )}

        {/* Fire illustration */}
        <div className="relative z-10 flex flex-col items-center">
          {lit && (
            <div className="flex space-x-1 -mb-1 animate-bounce">
              <Lucide.Flame className="text-orange-500 fill-orange-500 w-12 h-12" />
              <Lucide.Flame className="text-red-500 fill-red-500 w-10 h-10 -mt-2" />
              <Lucide.Flame className="text-yellow-400 fill-yellow-400 w-8 h-8" />
            </div>
          )}

          {/* Logs */}
          <div className="relative w-20 h-8 flex items-center justify-center">
            {logs >= 1 && (
              <div className="absolute w-16 h-3 bg-amber-800 rounded-full border border-amber-950 transform rotate-12"></div>
            )}
            {logs >= 2 && (
              <div className="absolute w-16 h-3 bg-amber-800 rounded-full border border-amber-950 transform -rotate-12"></div>
            )}
            {logs >= 3 && (
              <div className="absolute w-16 h-3.5 bg-amber-700 rounded-full border border-amber-900"></div>
            )}
            {logs === 0 && (
              <span className="text-[10px] text-slate-400">Přidej dřevo</span>
            )}
          </div>
        </div>

        {/* Stars */}
        <div className="absolute top-2 left-4 text-amber-200/40 text-[9px]">★</div>
        <div className="absolute top-4 right-6 text-amber-200/50 text-xs animate-pulse">★</div>
      </div>

      <div className="flex justify-center space-x-2">
        {logs < 3 && (
          <button
            onClick={addLog}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px] py-1.5 px-3 rounded-full shadow-sm"
            id="btn-add-log"
          >
            🪓 Přidat polínko ({logs}/3)
          </button>
        )}

        {logs === 3 && !lit && (
          <button
            onClick={lightFire}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] py-1.5 px-4 rounded-full shadow-sm animate-pulse"
            id="btn-light-fire"
          >
            🔥 Zapálit oheň!
          </button>
        )}

        {lit && (
          <button
            onClick={resetFire}
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-[10px] py-1.5 px-3 rounded-full"
            id="btn-reset-fire"
          >
            Uhasit oheň
          </button>
        )}
      </div>
    </div>
  );
};


/* ==========================================================================
   3. CANDLE LIGHTER (Podzim / Dušičky)
   ========================================================================== */
export const CandleLighter: React.FC = () => {
  const [lit, setLit] = useState(false);

  const toggleCandle = () => {
    playPop();
    setLit(!lit);
    if (!lit) {
      playSuccess();
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-orange-100 mt-3 text-center" id="candle-lighter">
      <span className="text-xs font-bold text-orange-800 block mb-2 uppercase">🕯️ Rozsviť svíčku na Dušičky</span>

      <div className="h-32 bg-slate-900 rounded-lg relative flex flex-col justify-end items-center p-3 mb-3 overflow-hidden">
        {lit && (
          <div className="absolute inset-0 bg-amber-500/10 animate-pulse z-0"></div>
        )}

        {/* Candle */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Flame */}
          {lit && (
            <div className="w-4 h-6 bg-amber-400 rounded-full animate-bounce -mb-1 shadow-md border border-amber-300"></div>
          )}

          {/* Wick */}
          <div className="w-0.5 h-2 bg-slate-500"></div>

          {/* Body */}
          <div className="w-10 h-14 bg-red-600 rounded-t-sm border-t-2 border-red-500 relative shadow-inner">
            <div className="absolute top-2 left-1.5 right-1.5 h-10 bg-red-700/50 rounded-sm"></div>
            {/* Wax drip */}
            <div className="absolute -top-1 left-3 w-1.5 h-6 bg-red-500 rounded-b-full"></div>
          </div>
        </div>

        {/* Stars */}
        <div className="absolute top-3 left-4 text-amber-200/30 text-xs">★</div>
        <div className="absolute top-5 right-12 text-amber-200/40 text-[9px]">★</div>
      </div>

      <button
        onClick={toggleCandle}
        className={`font-bold text-[10px] py-1.5 px-4 rounded-full shadow-sm transition-all ${
          lit
            ? 'bg-slate-600 hover:bg-slate-700 text-white'
            : 'bg-amber-500 hover:bg-amber-600 text-white animate-bounce'
        }`}
        id="btn-toggle-candle"
      >
        {lit ? 'Zhasnout svíčku' : '🕯️ Rozsvítit svíčku'}
      </button>
    </div>
  );
};


/* ==========================================================================
   4. CHRISTMAS GIFT UNWRAPPER (Zima)
   ========================================================================== */
export const GiftUnwrapper: React.FC = () => {
  const [clicks, setClicks] = useState(0); // 0 to 3
  const [toy, setToy] = useState<string>('');

  const toys = [
    '🐾 Roztomilé koťátko',
    '🐶 Malé štěňátko',
    '🧸 Plyšového medvídka',
    '🚂 Dřevěný vláček',
    '🦄 Duhového jednorožce'
  ];

  const handleUnwrap = () => {
    const nextClicks = clicks + 1;
    if (clicks < 3) {
      playPop();
      setClicks(nextClicks);
      
      if (nextClicks === 3) {
        playSuccess();
        // Select random toy
        const randomToy = toys[Math.floor(Math.random() * toys.length)];
        setToy(randomToy);
      } else {
        playChime();
      }
    }
  };

  const resetGift = () => {
    playPop();
    setClicks(0);
    setToy('');
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-sky-100 mt-3 text-center" id="gift-unwrapper">
      <span className="text-xs font-bold text-sky-800 block mb-2 uppercase">🎁 Rozbal si vánoční dárek!</span>

      <div className="h-32 bg-sky-50 rounded-lg relative flex flex-col justify-center items-center p-3 mb-3 border border-sky-200 overflow-hidden">
        {clicks < 3 ? (
          <div className="relative flex flex-col items-center">
            {/* Wrapping box */}
            <div className={`w-14 h-14 bg-red-500 border border-red-600 relative rounded-sm shadow-md transition-transform ${
              clicks === 1 ? 'scale-105 rotate-3' :
              clicks === 2 ? 'scale-110 -rotate-3 animate-shake' :
              ''
            }`}>
              {/* Ribbon */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-yellow-400"></div>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-yellow-400"></div>
              {/* Bow */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-3 bg-yellow-500 rounded-full flex justify-between">
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
                <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span>
              </div>
            </div>
            
            <span className="text-[9px] font-bold text-sky-700 mt-2">Poklepej na dárek ({3 - clicks}x zbývá)</span>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-4xl mb-1">🎁✨</span>
            <span className="text-xs font-bold text-sky-900 block">Rozbaleno! Najdeš tu:</span>
            <span className="text-sm font-extrabold text-rose-600 block mt-1">{toy}</span>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-2">
        {clicks < 3 ? (
          <button
            onClick={handleUnwrap}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] py-1.5 px-4 rounded-full shadow-sm"
            id="btn-unwrap-gift"
          >
            🎁 Klepnout na dárek
          </button>
        ) : (
          <button
            onClick={resetGift}
            className="bg-slate-700 hover:bg-slate-800 text-white font-bold text-[10px] py-1.5 px-4 rounded-full"
            id="btn-reset-gift"
          >
            Zabalit jiný dárek
          </button>
        )}
      </div>
    </div>
  );
};
