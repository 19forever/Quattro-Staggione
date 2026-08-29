import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { playPop, playChime, playSuccess, playWater, playWind } from '../utils/audio';

// Dynamic Icon Renderer
const IconRenderer = ({ name, className = '', size = 24 }: { name: string; className?: string; size?: number }) => {
  const IconComponent = (Lucide as any)[name];
  if (!IconComponent) return <Lucide.HelpCircle className={className} size={size} />;
  return <IconComponent className={className} size={size} />;
};

/* ==========================================================================
   1. SPRING GAME: Sázení semínka (Planting a seed)
   ========================================================================== */
export const SpringGame: React.FC = () => {
  const [stage, setStage] = useState<'soil' | 'seed' | 'watering' | 'sprout' | 'flower'>('soil');
  const [waterCount, setWaterCount] = useState(0);

  const handleNext = () => {
    playPop();
    if (stage === 'soil') {
      setStage('seed');
    }
  };

  const handleWater = () => {
    playWater();
    const nextCount = waterCount + 1;
    setWaterCount(nextCount);
    if (nextCount === 1) {
      setStage('watering');
      setTimeout(() => {
        setStage('sprout');
        playChime();
      }, 1200);
    } else if (nextCount >= 3) {
      setStage('flower');
      playSuccess();
    }
  };

  const resetGame = () => {
    playPop();
    setStage('soil');
    setWaterCount(0);
  };

  return (
    <div className="bg-emerald-50/70 p-5 rounded-2xl border-2 border-emerald-200 text-center relative overflow-hidden" id="spring-game">
      <h4 className="text-emerald-900 font-black text-lg mb-2 uppercase tracking-wide">🌱 JARNÍ DÍLNIČKA: ZASAĎ SI KVĚTINKU!</h4>
      <p className="text-emerald-800 text-xs font-extrabold mb-4 uppercase tracking-wider">POMOZ SEMÍNKU VYRŮST V KRÁSNOU JARNÍ KVĚTINU.</p>

      <div className="h-44 flex items-end justify-center mb-6 relative">
        {/* Background garden sun */}
        <div className="absolute top-2 right-12 w-10 h-10 bg-amber-200 rounded-full animate-pulse opacity-40"></div>
        
        {/* Pot */}
        <div className="relative w-28 h-20 bg-amber-600 rounded-b-xl border-t-8 border-amber-700 flex items-center justify-center shadow-md z-10">
          <span className="text-xs text-amber-100 font-black tracking-wider uppercase">HLÍNA</span>
          
          {/* Soil Content & Plant */}
          <div className="absolute -top-6 left-0 right-0 flex justify-center">
            {stage === 'soil' && (
              <span className="text-xs px-2.5 py-1 bg-amber-800 text-amber-100 rounded-full text-[10px] animate-bounce font-black uppercase tracking-wider">
                SEMÍNKO SEM!
              </span>
            )}

            {stage === 'seed' && (
              <div className="w-4 h-4 bg-amber-950 rounded-full border border-amber-700 animate-pulse"></div>
            )}

            {stage === 'watering' && (
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 bg-amber-950 rounded-full"></div>
                {/* Water drops */}
                <div className="absolute -top-12 flex space-x-1 animate-bounce text-sky-400">
                  <Lucide.Droplets className="animate-pulse" size={24} />
                </div>
              </div>
            )}

            {stage === 'sprout' && (
              <div className="flex flex-col items-center animate-bounce">
                <Lucide.Sprout className="text-emerald-500 w-12 h-12" />
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-black uppercase">ZALIJ JEŠTĚ!</span>
              </div>
            )}

            {stage === 'flower' && (
              <div className="flex flex-col items-center animate-bounce">
                <Lucide.Flower className="text-rose-500 w-16 h-16 filter drop-shadow-md" />
                <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-black uppercase">KRÁSNÁ KVĚTINA!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-3">
        {stage === 'soil' && (
          <button
            onClick={handleNext}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all flex items-center gap-1.5 uppercase tracking-wider border-b-4 border-emerald-700"
            id="btn-plant-seed"
          >
            <Lucide.Sprout size={18} className="stroke-[3]" /> ZASADIT SEMÍNKO
          </button>
        )}

        {(stage === 'seed' || stage === 'sprout') && (
          <button
            onClick={handleWater}
            disabled={stage === 'watering'}
            className="bg-sky-500 hover:bg-sky-600 active:scale-95 disabled:opacity-50 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all flex items-center gap-1.5 uppercase tracking-wider border-b-4 border-sky-700"
            id="btn-water-plant"
          >
            <Lucide.Droplets size={18} className="stroke-[3]" /> ZALÍT VODOU ({waterCount}/3)
          </button>
        )}

        {stage === 'flower' && (
          <button
            onClick={resetGame}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all flex items-center gap-1.5 uppercase tracking-wider border-b-4 border-emerald-800"
            id="btn-plant-again"
          >
            <Lucide.RefreshCw size={16} className="stroke-[3]" /> ZKUSIT ZNOVU
          </button>
        )}
      </div>
    </div>
  );
};


/* ==========================================================================
   2. SUMMER GAME: Sběr třešní a jahod (Cherry/Strawberry Catcher)
   ========================================================================== */
interface Fruit {
  id: number;
  x: number; // percentage width
  type: 'cherry' | 'strawberry' | 'sun';
  collected: boolean;
}

export const SummerGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [gameActive, setGameActive] = useState(false);

  // Start spawning fruits
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setFruits((prev) => {
        // Keep active list under 6
        if (prev.filter(f => !f.collected).length > 5) return prev;
        
        const newFruit: Fruit = {
          id: Date.now() + Math.random(),
          x: 10 + Math.random() * 80,
          type: Math.random() > 0.4 ? (Math.random() > 0.5 ? 'cherry' : 'strawberry') : 'sun',
          collected: false
        };
        return [...prev, newFruit];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleCollect = (id: number) => {
    setFruits((prev) =>
      prev.map((f) => {
        if (f.id === id && !f.collected) {
          playPop();
          const newScore = score + 1;
          setScore(newScore);
          
          if (newScore >= 8) {
            setGameActive(false);
            playSuccess();
          } else {
            playChime();
          }
          return { ...f, collected: true };
        }
        return f;
      })
    );
  };

  const startGame = () => {
    playPop();
    setScore(0);
    setFruits([]);
    setGameActive(true);
  };

  return (
    <div className="bg-amber-50/70 p-5 rounded-2xl border-2 border-amber-200 text-center relative overflow-hidden" id="summer-game">
      <h4 className="text-amber-900 font-black text-lg mb-2 uppercase tracking-wide">🍒 LETNÍ SBĚR: NASBÍREJ SLADKÉ PLODY!</h4>
      
      {!gameActive && score < 8 ? (
        <div className="py-10 flex flex-col items-center">
          <div className="flex space-x-3 mb-4">
            <Lucide.Cherry className="text-rose-500 w-12 h-12 animate-bounce" />
            <Lucide.Sun className="text-amber-400 w-12 h-12 animate-pulse" />
          </div>
          <p className="text-amber-800 text-xs font-extrabold mb-4 uppercase tracking-wider">KLIKNI NEBO KLEPNI NA PADAJÍCÍ TŘEŠNĚ, JAHODY A SLUNÍČKA DŘÍV, NEŽ ZMIZÍ!</p>
          <button
            onClick={startGame}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black py-3.5 px-6 rounded-full shadow-lg text-sm transition-all uppercase tracking-widest border-b-4 border-amber-700"
            id="btn-start-summer"
          >
            ☀️ SPUSTIT HRU
          </button>
        </div>
      ) : score >= 8 ? (
        <div className="py-8 flex flex-col items-center animate-fade-in">
          <Lucide.Sparkles className="text-amber-500 w-16 h-16 animate-spin mb-3" />
          <p className="text-amber-950 font-black text-xl mb-1 uppercase tracking-wide">SKVĚLÁ PRÁCE! 🎉</p>
          <p className="text-amber-800 text-xs font-extrabold mb-4 uppercase tracking-wider">MÁŠ PLNÝ KOŠÍK NEJSLADŠÍHO OVOCE NA PRÁZDNINY!</p>
          <button
            onClick={startGame}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all uppercase tracking-wider border-b-4 border-amber-700"
            id="btn-summer-again"
          >
            HRÁT ZNOVU 🍎
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-amber-900 font-black text-xs uppercase tracking-wide">NASBÍRÁNO: {score} / 8</span>
            <span className="text-xs px-2.5 py-0.5 bg-amber-200 text-amber-800 rounded-full font-black uppercase tracking-wider animate-pulse">CHYTEJ!</span>
          </div>

          {/* Fall stage */}
          <div className="relative h-44 bg-sky-100/50 rounded-xl border border-sky-200 overflow-hidden">
            {fruits.map((f) => {
              if (f.collected) return null;
              return (
                <button
                  key={f.id}
                  onClick={() => handleCollect(f.id)}
                  className="absolute animate-bounce focus:outline-none hover:scale-115 transition-transform"
                  style={{
                    left: `${f.x}%`,
                    top: '20%',
                    animation: 'none' // we use absolute floating
                  }}
                >
                  <div className="p-2 bg-white rounded-full shadow-md cursor-pointer border border-amber-100 flex items-center justify-center animate-bounce">
                    {f.type === 'cherry' && <Lucide.Cherry className="text-rose-500" size={24} />}
                    {f.type === 'strawberry' && <Lucide.Heart className="text-red-500 fill-red-500" size={24} />}
                    {f.type === 'sun' && <Lucide.Sun className="text-amber-400" size={24} />}
                  </div>
                </button>
              );
            })}

            {fruits.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-amber-800 font-black text-xs uppercase tracking-wider">
                ČEKEJ NA OVOCE...
              </div>
            )}
          </div>

          <button
            onClick={() => {
              playPop();
              setGameActive(false);
            }}
            className="mt-3 text-xs text-amber-800 font-black hover:underline uppercase tracking-wider"
            id="btn-stop-summer"
          >
            UKONČIT HRU
          </button>
        </div>
      )}
    </div>
  );
};


/* ==========================================================================
   3. AUTUMN GAME: Pouštění draka ve větru (Autumn Kite & Wind)
   ========================================================================== */
export const AutumnGame: React.FC = () => {
  const [windLevel, setWindLevel] = useState(2); // 1 to 5
  const [kiteHeight, setKiteHeight] = useState(40); // height percentage

  const makeWindBlow = () => {
    playWind();
    const nextWind = windLevel === 5 ? 1 : windLevel + 1;
    setWindLevel(nextWind);
    setKiteHeight(20 + nextWind * 15);
    
    if (nextWind === 5) {
      playSuccess();
    } else {
      playChime();
    }
  };

  return (
    <div className="bg-orange-50/70 p-5 rounded-2xl border-2 border-orange-200 text-center relative overflow-hidden" id="autumn-game">
      <h4 className="text-orange-900 font-black text-lg mb-2 uppercase tracking-wide">🪁 PODZIMNÍ VÍTR: PUSŤ PAPÍROVÉHO DRAKA!</h4>
      <p className="text-orange-800 text-xs font-extrabold mb-4 uppercase tracking-wider">KLEPNUTÍM NA TLAČÍTKO ROZFOUKEJ PODZIMNÍ VÍTR A POŠLI DRAKA K OBLAKŮM!</p>

      <div className="relative h-44 bg-orange-100/40 rounded-xl border border-orange-200 overflow-hidden mb-4">
        {/* Animated clouds and wind lines */}
        <div className="absolute top-4 left-4 text-orange-800/20">
          <Lucide.Cloud size={32} className="animate-pulse" />
        </div>
        
        {/* Wind lines */}
        <div className="absolute inset-0 flex flex-col justify-around pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-0.5 bg-orange-300/30 rounded-full w-2/3"
              style={{
                marginLeft: `${i * 15}%`,
                transform: `translateX(${(windLevel * 10)}px)`,
                transition: 'transform 0.4s ease-out'
              }}
            ></div>
          ))}
        </div>

        {/* Kite */}
        <div
          className="absolute right-12 transition-all duration-500 ease-out flex flex-col items-center"
          style={{
            bottom: `${kiteHeight}%`,
            transform: `rotate(${(windLevel - 3) * 8}deg)`,
          }}
        >
          {/* Main diamond body */}
          <div className="w-10 h-14 bg-red-500 border-2 border-amber-300 relative rounded-sm shadow-md flex items-center justify-center transform rotate-45">
            <div className="w-full h-full border-t border-l border-amber-200/50 absolute"></div>
            {/* Smile face on kite */}
            <div className="transform -rotate-45 text-amber-100 font-bold text-lg">☺</div>
          </div>
          {/* Ribbons / Tail */}
          <div className="flex flex-col items-center space-y-1 mt-3">
            <div className="w-1.5 h-10 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-sm"></span>
              <span className="w-2 h-2 bg-rose-400 rounded-sm"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-sm"></span>
            </div>
          </div>
        </div>

        {/* Character on ground holding the string */}
        <div className="absolute bottom-1 left-8 flex flex-col items-center">
          <Lucide.User className="text-orange-800" size={32} />
          <span className="text-[9px] font-black bg-orange-200 text-orange-900 px-2 py-0.5 rounded-full uppercase">TY</span>
        </div>

        {/* String representation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="44"
            y1="150"
            x2="285"
            y2={`${176 - (kiteHeight / 100) * 176}`}
            stroke="#fb923c"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs font-black text-orange-950 mb-3 uppercase tracking-wider">
          SILOMĚR VĚTRU: {['VÁNEK 🍃', 'SLABÝ FUKAR 🌬️', 'DOBRÉ FOUKÁNÍ 🪁', 'POŘÁDNÝ VICHR! 🌪️', 'SUPER VICHŘICE! 🚀'][windLevel - 1]}
        </span>
        <button
          onClick={makeWindBlow}
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all flex items-center gap-1.5 uppercase tracking-wider border-b-4 border-orange-700"
          id="btn-blow-wind"
        >
          <Lucide.Wind size={18} className="stroke-[3]" /> ROZFOUKAT VÍTR!
        </button>
      </div>
    </div>
  );
};


/* ==========================================================================
   4. WINTER GAME: Stavění sněhuláka (Build a Snowman)
   ========================================================================== */
export const WinterGame: React.FC = () => {
  const [parts, setParts] = useState<string[]>([]);
  const allSteps = ['bottom', 'middle', 'head', 'carrot', 'hat', 'scarf'];

  const addPart = () => {
    const currentLength = parts.length;
    if (currentLength < allSteps.length) {
      playPop();
      const nextStep = allSteps[currentLength];
      setParts([...parts, nextStep]);
      
      if (currentLength === allSteps.length - 1) {
        playSuccess();
      } else {
        playChime();
      }
    }
  };

  const resetGame = () => {
    playPop();
    setParts([]);
  };

  return (
    <div className="bg-sky-50/70 p-5 rounded-2xl border-2 border-sky-200 text-center relative overflow-hidden" id="winter-game">
      <h4 className="text-sky-900 font-black text-lg mb-2 uppercase tracking-wide">☃️ ZIMNÍ TVOŘENÍ: POSTAV SI SNĚHULÁKA!</h4>
      <p className="text-sky-800 text-xs font-extrabold mb-4 uppercase tracking-wider">KLIKEJ NA TLAČÍTKO A POSTUPNĚ POSTAV CELÉHO SNĚHULÁKA ZE SNĚHU.</p>

      <div className="h-44 bg-sky-100/30 rounded-xl border border-sky-200 relative flex flex-col items-center justify-end p-2 overflow-hidden mb-4">
        {/* Soft falling snow background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-2 left-6 text-sky-300 animate-bounce"><Lucide.Snowflake size={12} /></div>
          <div className="absolute top-6 right-8 text-sky-400 animate-pulse"><Lucide.Snowflake size={14} /></div>
          <div className="absolute top-12 left-1/2 text-sky-300 animate-bounce"><Lucide.Snowflake size={10} /></div>
        </div>

        {/* Snowman composition */}
        <div className="relative flex flex-col items-center justify-end w-32 h-full">
          
          {/* Hat (Step 5) */}
          {parts.includes('hat') && (
            <div className="w-12 h-8 bg-neutral-800 rounded-t-md relative border-b-4 border-neutral-900 z-30 animate-bounce">
              <div className="absolute -bottom-1 -left-2 w-16 h-1.5 bg-neutral-900 rounded-full"></div>
              {/* Cute red strip */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-red-500"></div>
            </div>
          )}

          {/* Head (Step 3) */}
          {parts.includes('head') && (
            <div className="w-12 h-12 bg-white rounded-full border-2 border-sky-200 relative z-20 flex items-center justify-center -mt-1 shadow-sm">
              {/* Eyes */}
              <div className="absolute top-3.5 left-2.5 w-1.5 h-1.5 bg-neutral-800 rounded-full"></div>
              <div className="absolute top-3.5 right-2.5 w-1.5 h-1.5 bg-neutral-800 rounded-full"></div>
              
              {/* Carrot (Step 4) */}
              {parts.includes('carrot') && (
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-orange-500 rounded-r-full origin-left transform -rotate-6"></div>
              )}

              {/* Smile */}
              <div className="absolute bottom-2.5 w-4 h-2 border-b-2 border-neutral-700 rounded-b-full"></div>
            </div>
          )}

          {/* Scarf (Step 6) */}
          {parts.includes('scarf') && (
            <div className="w-14 h-3 bg-red-500 rounded-full relative z-25 -mt-2 animate-pulse shadow-sm">
              <div className="absolute top-1 right-2 w-3 h-6 bg-red-600 rounded-b-md transform rotate-12"></div>
            </div>
          )}

          {/* Middle Ball (Step 2) */}
          {parts.includes('middle') && (
            <div className="w-16 h-16 bg-white rounded-full border-2 border-sky-200 relative z-10 flex flex-col justify-center items-center -mt-1.5 shadow-sm">
              {/* Buttons */}
              <div className="w-2 h-2 bg-neutral-800 rounded-full my-0.5"></div>
              <div className="w-2 h-2 bg-neutral-800 rounded-full my-0.5"></div>
            </div>
          )}

          {/* Bottom Ball (Step 1) */}
          {parts.includes('bottom') && (
            <div className="w-20 h-20 bg-white rounded-full border-2 border-sky-200 relative z-5 flex justify-center items-center -mt-1.5 shadow-sm">
              <div className="w-2.5 h-2.5 bg-neutral-800 rounded-full"></div>
            </div>
          )}

          {parts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-sky-800/40 text-xs text-center px-4 font-black uppercase tracking-wider">
              SNĚHULÁK TU JEŠTĚ NESTOJÍ! STAVĚJ KLIKÁNÍM!
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center space-x-3">
        {parts.length < allSteps.length ? (
          <button
            onClick={addPart}
            className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all flex items-center gap-1.5 uppercase tracking-wider border-b-4 border-sky-700"
            id="btn-build-snowman"
          >
            ⛄ STAVĚT SNĚHULÁKA ({parts.length}/{allSteps.length})
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-black py-3 px-6 rounded-full shadow-md text-sm transition-all flex items-center gap-1.5 uppercase tracking-wider border-b-4 border-sky-850"
            id="btn-snowman-again"
          >
            <Lucide.RefreshCw size={16} className="stroke-[3]" /> ROZPUSTIT A POSTAVIT ZNOVA!
          </button>
        )}
      </div>
    </div>
  );
};
