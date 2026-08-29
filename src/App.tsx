import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { SeasonId, SeasonInfo } from './types';
import { seasonsData } from './data/seasons';
import { SpringGame, SummerGame, AutumnGame, WinterGame } from './components/MiniGames';
import { EasterEggPainter, CampfireLighter, CandleLighter, GiftUnwrapper } from './components/TraditionInteractions';
import { DressUpGame } from './components/DressUpGame';
import { playPop, playChime } from './utils/audio';
import { WeatherOverlay } from './components/WeatherOverlay';

// Dynamic Icon Component
const IconRenderer = ({ name, className = '', size = 32 }: { name: string; className?: string; size?: number }) => {
  const IconComponent = (Lucide as any)[name];
  if (!IconComponent) return <Lucide.HelpCircle className={className} size={size} />;
  return <IconComponent className={className} size={size} />;
};

const SEASON_IMAGES: Record<SeasonId, string> = {
  jaro: '/src/assets/images/tree_spring_1787988902492.jpg',
  leto: '/src/assets/images/tree_summer_1787988917792.jpg',
  podzim: '/src/assets/images/tree_autumn_1787988930755.jpg',
  zima: '/src/assets/images/tree_winter_1787988944430.jpg'
};

const CHILDREN_PROFILES = [
  {
    id: 'evelinka',
    name: 'Evelínka',
    vocative: 'Evelínko',
    avatar: '👩‍🔬',
    color: 'border-indigo-400 bg-indigo-50/80 text-indigo-950 ring-indigo-300',
    badgeColor: 'bg-indigo-600 text-white',
    description: 'BÁJEČNÁ SLEČNA A EXPLOZIVNÍ BADATELKA! ODHAL TAJEMSTVÍ PŘÍRODY A ZVLÁDNI VŠECHNY MINI-HRY.',
    voiceRate: 1.05,
    canRead: true,
    challenge: 'DOKÁŽEŠ ODHALIT TAJEMSTVÍ VŠECH ČTYŘ SEZÓN A VYHRÁT VŠECHNY LETNÍ OVOCNÉ BODY?'
  },
  {
    id: 'olik',
    name: 'Olík',
    vocative: 'Olíku',
    avatar: '👦',
    color: 'border-amber-400 bg-amber-50/80 text-amber-950 ring-amber-300',
    badgeColor: 'bg-amber-500 text-white',
    description: 'SKVĚLÝ DOBRODRUH A VELITEL ZÁBAVY! CHYTEJ LETNÍ OVOCE, POSTAV SNĚHULÁKA NEBO ROZFOUKEJ VÍTR!',
    voiceRate: 1.0,
    canRead: true,
    challenge: 'ZVLÁDNEŠ ROZTOČIT PODZIMNÍHO DRAKA DO SUPER VICHŘICE NEBO NASBÍRAT 8 CHUTNÝCH PLODŮ?'
  },
  {
    id: 'marionka',
    name: 'Marionka',
    vocative: 'Marionko',
    avatar: '👧',
    color: 'border-rose-400 bg-rose-50/80 text-rose-950 ring-rose-300',
    badgeColor: 'bg-rose-500 text-white',
    description: 'ŠIKOVNÁ PŘEDŠKOLAČKA. PROZKOUMEJ PŘÍRODU, MALUJ VELIKONOČNÍ VAJÍČKA NEBO SE POSTAREJ O SEMÍNKO!',
    voiceRate: 0.85,
    canRead: false,
    challenge: 'ZKUS ZASADIT JARNÍ SEMÍNKO, ZALIJ HO A SLEDUJ, JAK VYROSTE KRÁSNÁ RŮŽOVÁ KVĚTINKA!'
  },
  {
    id: 'rubik',
    name: 'Rubík',
    vocative: 'Rubíku',
    avatar: '👶',
    color: 'border-sky-400 bg-sky-50/80 text-sky-950 ring-sky-300',
    badgeColor: 'bg-sky-500 text-white',
    description: 'NÁŠ NEJMENŠÍ KOUZELNÝ BADATEL. OBLÉKEJ MEDVÍDKA MÍŠU A POSLOUCHEJ KRÁSNÉ ZVUKY PŘÍRODY!',
    voiceRate: 0.75,
    canRead: false,
    challenge: 'ZKUS OBLÉKNOUT MEDVÍDKA MÍŠU DO TEPLÉHO KABÁTKU NA ZIMU, AŤ MU VENKU NENÍ ZIMA!'
  }
];

export default function App() {
  const [activeSeason, setActiveSeason] = useState<SeasonId | null>(null);
  const [activeTab, setActiveTab] = useState<'priroda' | 'hry' | 'tradice' | 'obleceni'>('priroda');
  const [speaking, setSpeaking] = useState(false);
  const [selectedFact, setSelectedFact] = useState<string | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [activeChildId, setActiveChildId] = useState<string | null>(() => {
    return localStorage.getItem('activeChildId') || null;
  });
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const activeChild = CHILDREN_PROFILES.find(c => c.id === activeChildId);

  // Handle Child Profile Selection
  const selectChildProfile = (childId: string) => {
    playChime();
    setActiveChildId(childId);
    localStorage.setItem('activeChildId', childId);
    
    const profile = CHILDREN_PROFILES.find(c => c.id === childId);
    if (profile) {
      // Trigger a personalized voice welcome with correct vocative
      setTimeout(() => {
        let greeting = `Ahoj ${profile.vocative}! `;
        if (profile.id === 'rubik') greeting += "Pojďme si hrát s medvídkem Míšou!";
        else if (profile.id === 'marionka') greeting += "Pojďme spolu prozkoumat kytičky a barvičky!";
        else if (profile.id === 'olik') greeting += "Jsi připraven na skvělé dobrodružství?";
        else greeting += "Máme tu pro tebe spoustu zajímavých faktů a her!";
        
        // Speak using their speed
        handleSpeakWithRate(greeting, profile.voiceRate);
      }, 300);

      setShowNotification(`PROFIL NASTAVEN: VÍTÁ TĚ ${profile.name.toUpperCase()}! 🌟`);
      setTimeout(() => setShowNotification(null), 4000);
    }
  };

  // Handle Speech Synthesis Voices Loading
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        setVoicesLoaded(true);
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      // Trigger manually if already loaded
      if (window.speechSynthesis.getVoices().length > 0) {
        setVoicesLoaded(true);
      }
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  // Stop speaking when moving away, and trigger automatic voiceover for children who cannot read yet!
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    setSelectedFact(null);

    if (!activeSeason || !currentSeasonInfo || !activeChild) return;

    if (!activeChild.canRead) {
      const timer = setTimeout(() => {
        let textToSay = "";
        if (activeTab === 'priroda') {
          textToSay = `${currentSeasonInfo.name}. ${currentSeasonInfo.nature.title}. ${currentSeasonInfo.nature.description}`;
        } else if (activeTab === 'hry') {
          textToSay = `${currentSeasonInfo.activities.title}. ${currentSeasonInfo.activities.description}`;
        } else if (activeTab === 'tradice') {
          textToSay = `${currentSeasonInfo.traditions.title}. ${currentSeasonInfo.traditions.description}`;
        } else if (activeTab === 'obleceni') {
          textToSay = `${currentSeasonInfo.clothing.title}. ${currentSeasonInfo.clothing.description}. KLIKÁNÍM OBLÉKNI MÍŠU SPRÁVNĚ NA PROCHÁZKU!`;
        }

        if (textToSay) {
          handleSpeakWithRate(textToSay, activeChild.voiceRate);
        }
      }, 600); // delay so transition sound completes
      return () => clearTimeout(timer);
    }
  }, [activeSeason, activeTab, activeChildId]);

  const currentSeasonInfo = seasonsData.find((s) => s.id === activeSeason);

  const handleSelectSeason = (id: SeasonId) => {
    playPop();
    setActiveSeason(id);
    setActiveTab('priroda');
  };

  const handleBackToOverview = () => {
    playPop();
    setActiveSeason(null);
  };

  // Internal voice synthesis that supports custom child speech speed
  const handleSpeakWithRate = (text: string, rate: number) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'cs-CZ';
    
    const voices = window.speechSynthesis.getVoices();
    const czechVoice = voices.find((v) => v.lang.includes('cs') || v.lang.includes('CZ'));
    if (czechVoice) {
      utterance.voice = czechVoice;
    }
    
    utterance.rate = rate;
    
    utterance.onend = () => {
      setSpeaking(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
    };

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeak = (text: string) => {
    const rate = activeChild ? activeChild.voiceRate : 0.95;
    handleSpeakWithRate(text, rate);
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-slate-800 font-sans pb-12 flex flex-col items-center relative overflow-hidden">
      
      {activeSeason && <WeatherOverlay season={activeSeason} />}

      {/* Decorative Cloud/Sun Elements */}
      <div className="absolute top-4 left-6 text-sky-200/40 pointer-events-none select-none">
        <Lucide.Cloud size={54} className="animate-pulse" />
      </div>
      <div className="absolute top-8 right-12 text-amber-300/30 pointer-events-none select-none">
        <Lucide.Sun size={72} className="animate-spin-slow" />
      </div>

      {/* Notification Toast for profile switches */}
      {showNotification && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl border-4 border-white animate-bounce uppercase tracking-wider flex items-center gap-2">
          🎉 {showNotification}
        </div>
      )}

      {/* Main Header */}
      <header className="w-full max-w-5xl px-4 pt-8 pb-4 text-center" id="main-header">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-indigo-950 drop-shadow-sm flex items-center justify-center gap-3 uppercase">
          🌍 ROČNÍ OBDOBÍ U NÁS 🌸
        </h1>

        {/* PROFILE PICKER AREA */}
        <div className="mt-6 mb-6 p-5 bg-white/60 backdrop-blur-md rounded-3xl border-4 border-indigo-200 shadow-lg max-w-3xl mx-auto">
          <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest mb-4 flex items-center justify-center gap-1.5">
            🎒 KDO S NÁMI DNES OBJEVUJE? ZVOL PROFIL:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CHILDREN_PROFILES.map((profile) => {
              const isSelected = activeChildId === profile.id;
              return (
                <button
                  key={profile.id}
                  onClick={() => selectChildProfile(profile.id)}
                  className={`relative flex flex-col items-center p-4 rounded-2xl border-4 cursor-pointer transition-all duration-300 transform active:scale-95 hover:scale-105 ${
                    isSelected
                      ? `${profile.color} shadow-md scale-105 ring-4`
                      : 'border-slate-200 bg-white/80 hover:bg-white text-slate-700'
                  }`}
                  id={`profile-btn-${profile.id}`}
                >
                  <span className="text-4xl sm:text-5xl mb-1 filter drop-shadow-sm group-hover:animate-bounce">
                    {profile.avatar}
                  </span>
                  <span className="font-black text-base uppercase tracking-wide">
                    {profile.name}
                  </span>
                  <span className={`mt-1.5 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    !profile.canRead ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {!profile.canRead ? '🔊 POSLOUCHÁM' : '📖 ČTU SÁM'}
                  </span>
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                      <Lucide.Check size={12} className="stroke-[4]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* ACTIVE CHILD WELCOME & CHALLENGE BANNER */}
          {activeChild ? (
            <div className={`mt-5 p-4 rounded-2xl border-2 text-left shadow-xs transition-all duration-300 ${activeChild.color}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-indigo-200/50 pb-2 mb-2">
                <span className="text-sm font-black uppercase tracking-wider flex items-center gap-1.5">
                  ⭐ DĚTSKÝ PROFIL: {activeChild.name.toUpperCase()}
                </span>
                {!activeChild.canRead ? (
                  <span className="text-[10px] font-black uppercase tracking-widest bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full border border-rose-200 animate-pulse flex items-center gap-1">
                    🔊 AUTOMATICKÉ PŘEDČÍTÁNÍ ZAPNUTO
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-100 text-indigo-900 px-2.5 py-1 rounded-full border border-indigo-200">
                    HLAS PŘIZPŮSOBEN NA {activeChild.voiceRate}x RYCHLOST 🔊
                  </span>
                )}
              </div>
              <p className="text-xs font-black text-indigo-900 uppercase tracking-wide leading-relaxed">
                {activeChild.description}
              </p>
              <div className="mt-3 p-3 bg-white/70 border border-white rounded-xl">
                <span className="text-[10px] font-black text-rose-600 block mb-1 uppercase tracking-wider">
                  🎯 TVOJE SPECIÁLNÍ BADATELSKÁ VÝZVA:
                </span>
                <p className="text-xs font-black text-indigo-950 uppercase tracking-wide">
                  {activeChild.challenge}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-indigo-100/50 rounded-2xl text-xs font-extrabold text-indigo-900 uppercase tracking-wide flex items-center justify-center gap-2">
              💡 TIP: KLIKNI NA SVOJE JMÉNO NAHOŘE PRO OSOBNÍ VÝZVY A AUTOMATICKÉ HLASOVÉ PŘEDČÍTÁNÍ!
            </div>
          )}
        </div>

        {activeChild ? (
          <p className="text-sm sm:text-base text-indigo-900 font-extrabold max-w-xl mx-auto uppercase tracking-wide bg-indigo-100/40 backdrop-blur-xs py-2.5 px-6 rounded-full border border-indigo-200/50">
            🌳 AHOJ {activeChild.vocative.toUpperCase()}! VYBER ROČNÍ OBDOBÍ A JDEME OBJEVOVAT!
          </p>
        ) : (
          <p className="text-sm sm:text-base text-indigo-800 font-extrabold max-w-xl mx-auto uppercase tracking-wide bg-white/40 backdrop-blur-xs py-2.5 px-6 rounded-full border border-indigo-200/50">
            AHOJ KAMARÁDE! VYBER ROČNÍ OBDOBÍ A OBJEVUJ KOUZELNOU PŘÍRODU!
          </p>
        )}
      </header>

      {/* Grid Overview or Detail View container */}
      <main className="w-full max-w-5xl px-4 flex-1">
        
        {!activeSeason ? (
          /* ==========================================================================
             2x2 MATRIX MAIN OVERVIEW
             ========================================================================== */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-2" id="grid-overview">
            
            {/* Jaro Card */}
            <button
              onClick={() => handleSelectSeason('jaro')}
              className="relative overflow-hidden group p-4 rounded-3xl border-4 border-emerald-400 bg-emerald-50 hover:bg-emerald-100/70 hover:scale-103 transition-all duration-300 shadow-md text-left flex flex-col justify-between min-h-[300px] focus:ring-4 focus:ring-emerald-200"
              id="card-jaro"
            >
              <WeatherOverlay season="jaro" ambientOnly />
              
              {/* Seasonal Tree Image */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-200/50">
                <img
                  src={SEASON_IMAGES.jaro}
                  alt="JARNÍ STROM"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  BŘEZEN - KVĚTEN
                </div>
              </div>

              <div className="relative z-10 mt-4 w-full flex items-center justify-between">
                <h2 className="text-3xl font-black text-emerald-950 flex items-center gap-2 uppercase tracking-wide">
                  JARO 🌱
                </h2>
                <div className="flex items-center gap-1.5 text-emerald-800 font-black text-sm uppercase group-hover:translate-x-1.5 transition-transform">
                  OBJEVOVAT <Lucide.ArrowRight size={18} className="stroke-[3]" />
                </div>
              </div>
            </button>

            {/* Léto Card */}
            <button
              onClick={() => handleSelectSeason('leto')}
              className="relative overflow-hidden group p-4 rounded-3xl border-4 border-amber-400 bg-amber-50 hover:bg-amber-100/70 hover:scale-103 transition-all duration-300 shadow-md text-left flex flex-col justify-between min-h-[300px] focus:ring-4 focus:ring-amber-200"
              id="card-leto"
            >
              <WeatherOverlay season="leto" ambientOnly />
              
              {/* Seasonal Tree Image */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden shadow-md border-2 border-amber-200/50">
                <img
                  src={SEASON_IMAGES.leto}
                  alt="LETNÍ STROM"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  ČERVEN - SRPEN
                </div>
              </div>

              <div className="relative z-10 mt-4 w-full flex items-center justify-between">
                <h2 className="text-3xl font-black text-amber-950 flex items-center gap-2 uppercase tracking-wide">
                  LÉTO ☀️
                </h2>
                <div className="flex items-center gap-1.5 text-amber-800 font-black text-sm uppercase group-hover:translate-x-1.5 transition-transform">
                  OBJEVOVAT <Lucide.ArrowRight size={18} className="stroke-[3]" />
                </div>
              </div>
            </button>

            {/* Podzim Card */}
            <button
              onClick={() => handleSelectSeason('podzim')}
              className="relative overflow-hidden group p-4 rounded-3xl border-4 border-orange-400 bg-orange-50 hover:bg-orange-100/70 hover:scale-103 transition-all duration-300 shadow-md text-left flex flex-col justify-between min-h-[300px] focus:ring-4 focus:ring-orange-200"
              id="card-podzim"
            >
              <WeatherOverlay season="podzim" ambientOnly />
              
              {/* Seasonal Tree Image */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden shadow-md border-2 border-orange-200/50">
                <img
                  src={SEASON_IMAGES.podzim}
                  alt="PODZIMNÍ STROM"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-orange-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  ZÁŘÍ - LISTOPAD
                </div>
              </div>

              <div className="relative z-10 mt-4 w-full flex items-center justify-between">
                <h2 className="text-3xl font-black text-orange-950 flex items-center gap-2 uppercase tracking-wide">
                  PODZIM 🍁
                </h2>
                <div className="flex items-center gap-1.5 text-orange-800 font-black text-sm uppercase group-hover:translate-x-1.5 transition-transform">
                  OBJEVOVAT <Lucide.ArrowRight size={18} className="stroke-[3]" />
                </div>
              </div>
            </button>

            {/* Zima Card */}
            <button
              onClick={() => handleSelectSeason('zima')}
              className="relative overflow-hidden group p-4 rounded-3xl border-4 border-sky-400 bg-sky-50 hover:bg-sky-100/70 hover:scale-103 transition-all duration-300 shadow-md text-left flex flex-col justify-between min-h-[300px] focus:ring-4 focus:ring-sky-200"
              id="card-zima"
            >
              <WeatherOverlay season="zima" ambientOnly />
              
              {/* Seasonal Tree Image */}
              <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden shadow-md border-2 border-sky-200/50">
                <img
                  src={SEASON_IMAGES.zima}
                  alt="ZIMNÍ STROM"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-sky-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  PROSINEC - ÚNOR
                </div>
              </div>

              <div className="relative z-10 mt-4 w-full flex items-center justify-between">
                <h2 className="text-3xl font-black text-sky-950 flex items-center gap-2 uppercase tracking-wide">
                  ZIMA ☃️
                </h2>
                <div className="flex items-center gap-1.5 text-sky-800 font-black text-sm uppercase group-hover:translate-x-1.5 transition-transform">
                  OBJEVOVAT <Lucide.ArrowRight size={18} className="stroke-[3]" />
                </div>
              </div>
            </button>


          </div>
        ) : (
          /* ==========================================================================
             SEASONAL DETAIL TABBED PANEL (MODAL / OVERLAY VIEW)
             ========================================================================== */
          <div className="bg-white rounded-3xl border-4 border-slate-200 shadow-xl overflow-hidden animate-fade-in" id="season-detail-container">
            
            {/* Header / Banner of the Active Season */}
            <div className={`p-6 sm:p-8 ${currentSeasonInfo?.bgClass} border-b-4 border-slate-200 relative`}>
              
              {/* Back Button */}
              <button
                onClick={handleBackToOverview}
                className="mb-4 bg-white hover:bg-slate-100 text-slate-900 font-black py-3 px-6 rounded-full shadow-md text-xs border-2 border-slate-400 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 uppercase tracking-wider"
                id="btn-back-overview"
              >
                <Lucide.ArrowLeft size={18} className="stroke-[3]" /> ZPĚT NA PŘEHLED
              </button>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-white shadow-md border-2 ${currentSeasonInfo?.borderColor}`}>
                    {currentSeasonInfo && (
                      <IconRenderer
                        name={currentSeasonInfo.icon}
                        className={currentSeasonInfo.id === 'jaro' ? 'text-emerald-500' :
                                   currentSeasonInfo.id === 'leto' ? 'text-amber-500' :
                                   currentSeasonInfo.id === 'podzim' ? 'text-orange-500' : 'text-sky-500'}
                        size={48}
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-wider uppercase">
                      {currentSeasonInfo?.name}
                    </h2>
                    <p className="text-xs text-indigo-900 font-extrabold uppercase tracking-widest mt-1">
                      PROZKOUMEJ TAJEMSTVÍ OBDOBÍ: {currentSeasonInfo?.name}
                    </p>
                  </div>
                </div>

                {/* Speech voice reading out loud */}
                {currentSeasonInfo && (
                  <button
                    onClick={() => handleSpeak(currentSeasonInfo.description)}
                    className={`py-3 px-5 rounded-full font-black text-xs shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95 uppercase tracking-wider ${
                      speaking
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-white text-slate-900 border-2 border-slate-300'
                    }`}
                    id="btn-speak-description"
                  >
                    {speaking ? (
                      <>
                        <Lucide.VolumeX size={18} className="stroke-[3]" /> ZASTAVIT ČTENÍ
                      </>
                    ) : (
                      <>
                        <Lucide.Volume2 size={18} className="stroke-[3]" /> 🔊 PŘEČÍST NAHLAS
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Main Friendly Narrative */}
              <div className="mt-5 p-5 bg-white/80 rounded-2xl border-2 border-slate-200 shadow-sm">
                <p className="text-sm md:text-base text-slate-900 leading-relaxed font-black uppercase tracking-wider">
                  "{currentSeasonInfo?.description}"
                </p>
              </div>
            </div>

            {/* TAB SELECTORS (The 4 Parts using Icons) */}
            <div className="bg-slate-100 p-2 sm:p-3 border-b-4 border-slate-200 flex flex-wrap gap-2 justify-center" id="tab-selectors">
              
              {/* Tab 1: Priroda a plodiny */}
              <button
                onClick={() => { playPop(); setActiveTab('priroda'); }}
                className={`py-3 px-5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all uppercase tracking-wider border-2 ${
                  activeTab === 'priroda'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105'
                    : 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
                id="tab-btn-priroda"
              >
                <Lucide.Leaf size={18} className="stroke-[3]" /> PŘÍRODA A STROMY
              </button>

              {/* Tab 2: Typicke cinnosti a hry */}
              <button
                onClick={() => { playPop(); setActiveTab('hry'); }}
                className={`py-3 px-5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all uppercase tracking-wider border-2 ${
                  activeTab === 'hry'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105'
                    : 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
                id="tab-btn-hry"
              >
                <Lucide.Gamepad2 size={18} className="stroke-[3]" /> HRY A DÍLNIČKA
              </button>

              {/* Tab 3: Tradice a svatky */}
              <button
                onClick={() => { playPop(); setActiveTab('tradice'); }}
                className={`py-3 px-5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all uppercase tracking-wider border-2 ${
                  activeTab === 'tradice'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105'
                    : 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
                id="tab-btn-tradice"
              >
                <Lucide.Award size={18} className="stroke-[3]" /> TRADICE A SVÁTKY
              </button>

              {/* Tab 4: Co si vzit na sebe */}
              <button
                onClick={() => { playPop(); setActiveTab('obleceni'); }}
                className={`py-3 px-5 rounded-2xl font-black text-xs flex items-center gap-2 transition-all uppercase tracking-wider border-2 ${
                  activeTab === 'obleceni'
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-105'
                    : 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
                id="tab-btn-obleceni"
              >
                <Lucide.Shirt size={18} className="stroke-[3]" /> CO SI OBLÉKNOUT
              </button>

            </div>

            {/* TAB CONTENT PORTAL */}
            <div className="p-6">
              
              {/* ==========================================================================
                 PART 1: PŘÍRODA A PLODINY
                 ========================================================================== */}
              {activeTab === 'priroda' && currentSeasonInfo && (
                <div className="space-y-6" id="panel-priroda">
                  
                  {/* GIANT SEASONAL TREE HERO SHOWCASE */}
                  <div className="relative w-full rounded-3xl overflow-hidden shadow-lg border-4 border-slate-200 bg-slate-100 flex flex-col md:flex-row items-stretch">
                    <div className="relative w-full md:w-1/2 h-64 md:h-80 overflow-hidden">
                      <img
                        src={SEASON_IMAGES[activeSeason!]}
                        alt="KOUZELNÝ STROM"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                        <span className="text-white text-lg font-black tracking-widest uppercase bg-indigo-600/80 backdrop-blur-xs px-3 py-1.5 rounded-xl">
                          🌳 KOUZELNÝ STROM
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 md:w-1/2 flex flex-col justify-between bg-slate-50 border-t-4 md:border-t-0 md:border-l-4 border-slate-200">
                      <div>
                        <h4 className="text-2xl font-black text-indigo-950 uppercase tracking-wider mb-2">
                          STROM V OBDOBÍ: {currentSeasonInfo.name}
                        </h4>
                        <p className="text-sm font-extrabold text-slate-700 uppercase tracking-wide leading-relaxed">
                          PODÍVEJ SE, JAK SE NÁŠ STROM PROMĚNIL! KAŽDÉ ROČNÍ OBDOBÍ MU DÁVÁ JINÉ BARVY, KVĚTY NEBO SNĚHOVÝ KABÁT.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          playChime();
                          handleSpeak(`Takhle vypadá náš kouzelný strom v ročním období ${currentSeasonInfo.name}. ${currentSeasonInfo.nature.description}`);
                        }}
                        className="mt-4 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider"
                      >
                        <Lucide.Volume2 size={24} className="stroke-[3] animate-bounce" /> 🔊 POSLECHNOUT SI O STROMU
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 pt-2">
                    <Lucide.Leaf className="text-emerald-500 stroke-[3]" size={28} />
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
                      🌾 {currentSeasonInfo.nature.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentSeasonInfo.nature.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 transition-all shadow-sm flex flex-col justify-between relative"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                              <IconRenderer name={item.icon} size={26} />
                            </div>
                            <h4 className="font-black text-slate-900 text-sm uppercase tracking-wide">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-800 leading-relaxed font-extrabold uppercase tracking-wide">
                            {item.description}
                          </p>
                        </div>

                        {/* Interactive Fact Revealer */}
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          {selectedFact === `${activeSeason}-fact-${idx}` ? (
                            <div className="bg-amber-100 border-2 border-amber-300 p-3 rounded-xl text-xs text-amber-950 animate-pulse font-black leading-relaxed relative uppercase tracking-wider">
                              💡 {item.fact}
                              <button
                                onClick={() => setSelectedFact(null)}
                                className="absolute top-1 right-2 text-amber-800 font-black text-sm"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                playChime();
                                setSelectedFact(`${activeSeason}-fact-${idx}`);
                              }}
                              className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 uppercase tracking-wider"
                              id={`btn-reveal-fact-${idx}`}
                            >
                              💡 TAJEMSTVÍ <Lucide.Sparkles size={14} className="stroke-[3]" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==========================================================================
                 PART 2: TYPICKÉ ČINNOSTI A HRY (Dílnička / Mini-hry)
                 ========================================================================== */}
              {activeTab === 'hry' && currentSeasonInfo && (
                <div className="space-y-6" id="panel-hry">
                  <div className="flex items-center gap-2 mb-2">
                    <Lucide.Gamepad2 className="text-amber-500 stroke-[3]" size={28} />
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
                      🎲 {currentSeasonInfo.activities.title}
                    </h3>
                  </div>
                  <p className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                    {currentSeasonInfo.activities.description} ZAHRAJ SI INTERAKTIVNÍ MINI-HRU NÍŽE!
                  </p>

                  {/* Specific Game Selector based on Active Season */}
                  <div className="max-w-xl mx-auto my-6">
                    {activeSeason === 'jaro' && <SpringGame />}
                    {activeSeason === 'leto' && <SummerGame />}
                    {activeSeason === 'podzim' && <AutumnGame />}
                    {activeSeason === 'zima' && <WinterGame />}
                  </div>

                  {/* Informational item bullets below */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {currentSeasonInfo.activities.items.map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                          <IconRenderer name={item.icon} size={20} />
                        </div>
                        <div>
                          <h5 className="font-black text-slate-950 text-xs uppercase tracking-wide">{item.name}</h5>
                          <p className="text-[10px] text-slate-800 font-extrabold uppercase tracking-wide mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==========================================================================
                 PART 3: TRADICE A SVÁTKY V ČR
                 ========================================================================== */}
              {activeTab === 'tradice' && currentSeasonInfo && (
                <div className="space-y-6" id="panel-tradice">
                  <div className="flex items-center gap-2 mb-2">
                    <Lucide.Award className="text-orange-500 stroke-[3]" size={28} />
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
                      👑 {currentSeasonInfo.traditions.title}
                    </h3>
                  </div>
                  <p className="text-sm font-extrabold text-slate-700 uppercase tracking-wide">
                    {currentSeasonInfo.traditions.description} PROŽIJ SI ČESKÉ ZVYKY V NAŠÍ INTERAKTIVNÍ TRADICI!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Left: General traditions overview list */}
                    <div className="space-y-4">
                      {currentSeasonInfo.traditions.items.map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 shadow-sm flex gap-3">
                          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0 h-fit border border-indigo-100">
                            <IconRenderer name={item.icon} size={24} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-black text-slate-950 text-sm uppercase tracking-wide">
                                {item.name}
                              </h4>
                              {item.date && (
                                <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                                  {item.date}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-800 font-extrabold uppercase tracking-wide leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right: Custom mini tradition interactive game */}
                    <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 shadow-sm flex flex-col justify-center">
                      <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest text-center mb-3">
                        Vyzkoušej si tradici!
                      </h4>
                      {activeSeason === 'jaro' && <EasterEggPainter />}
                      {activeSeason === 'leto' && <CampfireLighter />}
                      {activeSeason === 'podzim' && <CandleLighter />}
                      {activeSeason === 'zima' && <GiftUnwrapper />}
                    </div>
                  </div>
                </div>
              )}

              {/* ==========================================================================
                 PART 4: CO SI VZÍT NA SEBE (DressUpGame)
                 ========================================================================== */}
              {activeTab === 'obleceni' && currentSeasonInfo && (
                <div className="space-y-6" id="panel-obleceni">
                  <div className="flex items-center gap-2 mb-2">
                    <Lucide.Shirt className="text-indigo-600 stroke-[3]" size={28} />
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
                      🧣 {currentSeasonInfo.clothing.title}
                    </h3>
                  </div>
                  <p className="text-sm font-extrabold text-slate-700 uppercase tracking-wide mb-4">
                    {currentSeasonInfo.clothing.description} KLIKÁNÍM OBLÉKNI MÍŠU SPRÁVNĚ NA PROCHÁZKU!
                  </p>

                  <DressUpGame seasonId={activeSeason} seasonName={currentSeasonInfo.name} activeChildId={activeChildId} />
                </div>
              )}

            </div>

            {/* Bottom Footer block inside the detail container */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
              <span>Hravé učení pro zvídavé děti 🧒👧</span>
              <button
                onClick={handleBackToOverview}
                className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                id="btn-footer-back"
              >
                Zpět na roční období
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Persistent global footer */}
      <footer className="w-full max-w-5xl px-4 mt-12 text-center text-xs text-slate-400">
        <p>© 2026 Čtyři roční období • Vyrobeno s láskou pro české dětičky 💖</p>
      </footer>

    </div>
  );
}
