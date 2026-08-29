import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { SeasonId, ClothingItem } from '../types';
import { clothingItems } from '../data/seasons';
import { playPop, playChime, playSuccess, playSigh } from '../utils/audio';

interface DressUpGameProps {
  seasonId: SeasonId;
  seasonName: string;
  activeChildId?: string | null;
}

const IconRenderer = ({ name, className = '', size = 24 }: { name: string; className?: string; size?: number }) => {
  const IconComponent = (Lucide as any)[name];
  if (!IconComponent) return <Lucide.HelpCircle className={className} size={size} />;
  return <IconComponent className={className} size={size} />;
};

const getChildName = (id?: string | null) => {
  if (id === 'evelinka') return 'Evelínko';
  if (id === 'olik') return 'Olíku';
  if (id === 'marionka') return 'Marionko';
  if (id === 'rubik') return 'Rubíku';
  return '';
};

export const DressUpGame: React.FC<DressUpGameProps> = ({ seasonId, seasonName, activeChildId }) => {
  // Currently equipped items by category
  const [equipped, setEquipped] = useState<Record<string, ClothingItem | null>>({
    head: null,
    body: null,
    legs: null,
    shoes: null,
    accessory: null,
  });

  const childName = getChildName(activeChildId);
  const [message, setMessage] = useState<string>('Obleč Míšu ven podle počasí!');
  const [messageType, setMessageType] = useState<'info' | 'success' | 'warn'>('info');
  const [isWon, setIsWon] = useState(false);

  // Reset when season changes or child changes
  useEffect(() => {
    setEquipped({
      head: null,
      body: null,
      legs: null,
      shoes: null,
      accessory: null,
    });
    
    if (activeChildId === 'rubik') {
      setMessage('Oblékni medvídka Míšu na ven!');
    } else if (childName) {
      setMessage(`Obleč Míšu na ven, ${childName}!`);
    } else {
      setMessage(`Obleč Míšu ven na ${seasonName.toLowerCase()}!`);
    }
    setMessageType('info');
    setIsWon(false);
  }, [seasonId, seasonName, activeChildId]);

  const handleEquip = (item: ClothingItem) => {
    playPop();
    const isCorrect = item.seasons.includes(seasonId);

    if (isCorrect) {
      setEquipped((prev) => {
        const next = { ...prev, [item.category]: item };
        
        // Check if won
        // To win, we need correct items in critical categories: Head, Body, Legs, Shoes
        const hasHead = next.head && next.head.seasons.includes(seasonId);
        const hasBody = next.body && next.body.seasons.includes(seasonId);
        const hasLegs = next.legs && next.legs.seasons.includes(seasonId);
        const hasShoes = next.shoes && next.shoes.seasons.includes(seasonId);

        if (hasHead && hasBody && hasLegs && hasShoes) {
          setIsWon(true);
          if (activeChildId === 'rubik') {
            setMessage('Jupí, Rubíku! Medvídek Míša má teplé botičky a bříško a může jít na procházku! 🐻🎉');
          } else if (activeChildId === 'marionka') {
            setMessage('Hurá, Marionko! Míša je parádně oblečený a má z tebe radost! 💖');
          } else if (activeChildId === 'olik') {
            setMessage('Super výkon, Olíku! Míša je skvěle vybavený na venkovní dobrodružství! 🚀');
          } else if (activeChildId === 'evelinka') {
            setMessage('Úžasné, Evelínko! Oblečení pro Míšu jsi vybrala naprosto dokonale a stylově! 🌟');
          } else {
            setMessage(`Hurá! Míša je perfektně oblečený na ${seasonName.toLowerCase()}! 🎉`);
          }
          setMessageType('success');
          setTimeout(() => {
            playSuccess();
          }, 100);
        } else {
          playChime();
          if (childName) {
            setMessage(`Bezva, ${childName}! ${item.name} se skvěle hodí!`);
          } else {
            setMessage(`Bezva! ${item.name} se skvěle hodí.`);
          }
          setMessageType('info');
        }

        return next;
      });
    } else {
      playSigh();
      setMessageType('warn');
      if (seasonId === 'zima') {
        setMessage(childName 
          ? `Pozor, ${childName}! ${item.name} se na zimu nehodí, Míšovi by byla zima! ❄️`
          : `Pozor! ${item.name} se na zimu nehodí, Míšovi by byla hrozná zima! ❄️`
        );
      } else if (seasonId === 'leto') {
        setMessage(childName
          ? `Jejda, ${childName}! ${item.name} je v létě moc teplý, Míšovi by bylo horko! ☀️`
          : `Jejda! ${item.name} je v létě moc teplý, Míšovi by bylo veliké horko! ☀️`
        );
      } else if (seasonId === 'jaro') {
        setMessage(`To se nehodí! ${item.name} není správná volba pro jarní dny. 🌱`);
      } else {
        setMessage(`Ajaj! ${item.name} se na podzim nehodí. 🍁`);
      }
    }
  };

  const categories: { key: string; name: string }[] = [
    { key: 'head', name: 'Čepice a hlava' },
    { key: 'body', name: 'Kabát a tělo' },
    { key: 'legs', name: 'Kalhoty a nohy' },
    { key: 'shoes', name: 'Botičky' },
    { key: 'accessory', name: 'Doplňky' },
  ];

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-200 mt-6 shadow-sm" id="dress-up-game">
      <div className="flex items-center gap-2 mb-2">
        <Lucide.Accessibility className="text-indigo-600" size={24} />
        <h4 className="text-slate-800 font-bold text-lg">👕 Šatník: Obleč kamaráda Míšu!</h4>
      </div>
      <p className="text-slate-600 text-xs mb-4">
        Vyber z poliček správné oblečení pro <b>{seasonName}</b>. Aby mohl jít ven, musí mít čepici, bundu, kalhoty i botičky!
      </p>

      {/* Main Board */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left column: Míša Character representation */}
        <div className="md:col-span-5 bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center relative min-h-[300px]">
          {/* Status Message Bubble */}
          <div className={`w-full text-center p-2.5 rounded-lg text-xs font-bold mb-4 border transition-all ${
            messageType === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 animate-bounce' :
            messageType === 'warn' ? 'bg-rose-50 text-rose-800 border-rose-200 animate-shake' :
            'bg-indigo-50 text-indigo-800 border-indigo-100'
          }`}>
            {message}
          </div>

          {/* Míša Avatar Box */}
          <div className="relative w-40 h-64 bg-slate-100 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-3 overflow-hidden">
            
            {/* Cute Bear Face representing Míša */}
            <div className="relative flex flex-col items-center -mt-6">
              {/* Ears */}
              <div className="flex justify-between w-14 absolute -top-1">
                <div className="w-5 h-5 bg-amber-700 rounded-full"></div>
                <div className="w-5 h-5 bg-amber-700 rounded-full"></div>
              </div>
              {/* Head */}
              <div className="w-12 h-11 bg-amber-800 rounded-full border border-amber-950 flex flex-col items-center justify-center relative z-10">
                {/* Eyes */}
                <div className="flex space-x-2.5 mb-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                </div>
                {/* Snout */}
                <div className="w-5 h-3.5 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1 bg-black rounded-full -mt-1"></span>
                </div>
              </div>
            </div>

            {/* Neck / Body Placeholder */}
            <div className="w-14 h-24 bg-amber-800 rounded-3xl -mt-2 border border-amber-950 flex flex-col items-center relative">
              {/* Show equipped clothes over the avatar */}
              {equipped.body && (
                <div className="absolute inset-x-0 top-0 h-20 bg-indigo-500 rounded-t-xl rounded-b-md border border-indigo-700 flex items-center justify-center text-[9px] text-white font-bold animate-pulse">
                  {equipped.body.name}
                </div>
              )}
            </div>

            {/* Legs Placeholder */}
            <div className="flex space-x-3 w-12 justify-center -mt-3 relative">
              <div className="w-3.5 h-12 bg-amber-800 rounded-b-md border-r border-amber-950"></div>
              <div className="w-3.5 h-12 bg-amber-800 rounded-b-md border-l border-amber-950"></div>

              {equipped.legs && (
                <div className="absolute inset-x-0 top-0 h-10 bg-blue-500 rounded-md border border-blue-700 flex items-center justify-center text-[9px] text-white font-bold animate-pulse">
                  {equipped.legs.name}
                </div>
              )}
            </div>

            {/* Head equipment Overlay */}
            {equipped.head && (
              <div className="absolute top-10 w-16 p-1 bg-teal-500 text-white rounded-md text-[8px] font-bold text-center border border-teal-700 z-30 shadow-md animate-bounce">
                🎓 {equipped.head.name}
              </div>
            )}

            {/* Shoes Overlay */}
            {equipped.shoes && (
              <div className="absolute bottom-2 w-20 p-1 bg-amber-600 text-white rounded-md text-[8px] font-bold text-center border border-amber-800 z-30 shadow-md">
                👟 {equipped.shoes.name}
              </div>
            )}

            {/* Accessory Overlay */}
            {equipped.accessory && (
              <div className="absolute right-1 top-24 w-12 p-1 bg-purple-500 text-white rounded-md text-[8px] font-bold text-center border border-purple-700 z-30 shadow-md">
                ⭐ {equipped.accessory.name}
              </div>
            )}
          </div>

          {/* Reset button inside avatar box */}
          {(equipped.head || equipped.body || equipped.legs || equipped.shoes || equipped.accessory) && (
            <button
              onClick={() => {
                playPop();
                setEquipped({ head: null, body: null, legs: null, shoes: null, accessory: null });
                setIsWon(false);
                setMessage(`Obleč Míšu ven na ${seasonName.toLowerCase()}!`);
                setMessageType('info');
              }}
              className="mt-3 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded-full flex items-center gap-1 transition-all"
              id="btn-reset-dress"
            >
              <Lucide.RefreshCw size={12} /> Svléknout vše
            </button>
          )}
        </div>

        {/* Right column: Interactive shelves of clothes */}
        <div className="md:col-span-7 flex flex-col space-y-4">
          {categories.map((cat) => {
            // Get available clothes for this category
            const options = clothingItems.filter((i) => i.category === cat.key);
            const activeEquipped = equipped[cat.key];

            return (
              <div key={cat.key} className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-2 uppercase tracking-wide">
                  {cat.name} {activeEquipped ? '✅' : '❌'}
                </span>

                <div className="grid grid-cols-3 gap-2">
                  {options.map((item) => {
                    const isEquipped = activeEquipped?.id === item.id;
                    const isSuitedForThisSeason = item.seasons.includes(seasonId);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleEquip(item)}
                        className={`p-2 rounded-lg border text-center transition-all flex flex-col items-center justify-between min-h-[90px] ${
                          isEquipped
                            ? 'bg-indigo-600 border-indigo-700 text-white'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                        }`}
                        id={`btn-equip-${item.id}`}
                      >
                        <div className={`p-1.5 rounded-full mb-1 ${isEquipped ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                          <IconRenderer name={item.icon} className={isEquipped ? 'text-white' : 'text-slate-600'} size={20} />
                        </div>
                        <span className="text-[10px] leading-tight font-bold font-medium block">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
