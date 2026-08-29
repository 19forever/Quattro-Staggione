import React, { useMemo } from 'react';
import { SeasonId } from '../types';

interface WeatherOverlayProps {
  season: SeasonId;
  ambientOnly?: boolean; // If true, constrains to relative container. If false, fixed full screen.
}

interface Particle {
  id: number;
  char: string;
  left: number; // percentage
  size: number; // pixels
  delay: number; // seconds
  duration: number; // seconds
  swayType: number; // 1, 2, or 3
}

const SEASON_EMOJIS: Record<SeasonId, string[]> = {
  jaro: ['🌸', '💮', '🌱', '🌷', '🍃'],
  leto: ['✨', '☀️', '🦋', '🐝', '🎈'],
  podzim: ['🍂', '🍁', '🍎', '🪁', '🍄'],
  zima: ['❄️', '☃️', '⚪', '🌨️', '💎']
};

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ season, ambientOnly = false }) => {
  const particleCount = ambientOnly ? 8 : 28;

  const particles = useMemo(() => {
    const emojis = SEASON_EMOJIS[season] || ['✨'];
    const list: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const char = emojis[Math.floor(Math.random() * emojis.length)];
      list.push({
        id: i,
        char,
        left: Math.random() * 100,
        size: ambientOnly ? 14 + Math.random() * 14 : 16 + Math.random() * 20,
        delay: Math.random() * -15, // Negative delay so particles start in different phases immediately
        duration: ambientOnly ? 4 + Math.random() * 5 : 8 + Math.random() * 10,
        swayType: Math.floor(Math.random() * 3) + 1,
      });
    }
    return list;
  }, [season, ambientOnly, particleCount]);

  return (
    <div
      className={`${
        ambientOnly
          ? 'absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0'
          : 'fixed inset-0 overflow-hidden pointer-events-none z-10'
      }`}
      style={{ mixBlendMode: 'multiply' }}
    >
      {particles.map((p) => {
        let swayClass = 'animate-sway-1';
        if (p.swayType === 2) swayClass = 'animate-sway-2';
        if (p.swayType === 3) swayClass = 'animate-sway-3';

        return (
          <div
            key={p.id}
            className={`absolute select-none pointer-events-none text-center ${swayClass}`}
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              top: '-40px',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))',
              opacity: ambientOnly ? 0.35 : 0.6,
            }}
          >
            {p.char}
          </div>
        );
      })}
    </div>
  );
};
