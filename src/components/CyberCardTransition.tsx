import React, { useState, useEffect } from 'react';

interface SectionCardMap {
  id: string;
  name: string;
  cardSymbol: string;
  suit: 'spade' | 'heart' | 'diamond' | 'club' | 'chess';
  tacticalCallsign: string;
}

const SECTION_CARDS: SectionCardMap[] = [
  { id: 'overview', name: '01_OVERVIEW', cardSymbol: '♠ A', suit: 'spade', tacticalCallsign: 'ACE OF SPADES // ROOT COMMAND' },
  { id: 'projects', name: '02_MISSIONS', cardSymbol: '♦ A', suit: 'diamond', tacticalCallsign: 'ACE OF DIAMONDS // LAB ENGINE' },
  { id: 'skills', name: '03_HARDWARE', cardSymbol: '♞ A', suit: 'chess', tacticalCallsign: 'KNIGHTS GAMBIT // SYSTEM MATRIX' },
  { id: 'achievements', name: '04_HONORS', cardSymbol: '♥ A', suit: 'heart', tacticalCallsign: 'ACE OF HEARTS // CHAMPIONSHIP' },
  { id: 'terminal', name: '05_ROOT_CLI', cardSymbol: '♣ A', suit: 'club', tacticalCallsign: 'ACE OF CLUBS // CYBER SHELL' },
  { id: 'contact', name: '06_TRANSMIT', cardSymbol: '♚ K', suit: 'chess', tacticalCallsign: 'KINGS BEACON // ENCRYPTED COMMS' },
];

export const CyberCardTransition: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionCardMap>(SECTION_CARDS[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionElements = SECTION_CARDS.map((sc) => ({
        sc,
        el: document.getElementById(sc.id),
      })).filter((item) => item.el !== null);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { sc, el } = sectionElements[i];
        if (el && el.offsetTop - 200 <= scrollY) {
          if (activeSection.id !== sc.id) {
            setActiveSection(sc);
            setIsTransitioning(true);
            const timer = setTimeout(() => setIsTransitioning(false), 2400);
            return () => clearTimeout(timer);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection.id]);

  const suitColor =
    activeSection.suit === 'heart' || activeSection.suit === 'diamond'
      ? 'text-red-500 border-red-500/40 bg-red-950/40'
      : activeSection.suit === 'chess'
      ? 'text-amber-400 border-amber-500/40 bg-amber-950/40'
      : 'text-orange-400 border-orange-500/40 bg-orange-950/40';

  return (
    <div className="fixed bottom-5 right-5 z-30 pointer-events-none select-none font-mono">
      <div
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all duration-500 shadow-lg ${suitColor} ${
          isTransitioning
            ? 'opacity-100 translate-y-0 scale-105 shadow-orange-500/20'
            : 'opacity-40 hover:opacity-100 translate-y-0 scale-95'
        }`}
      >
        {/* Holographic Miniature Card Icon */}
        <div className="w-6 h-8 rounded border border-current flex flex-col items-center justify-center font-bold text-xs bg-black/80 shadow-sm leading-none">
          <span>{activeSection.cardSymbol.split(' ')[0]}</span>
          <span className="text-[9px] mt-0.5">{activeSection.cardSymbol.split(' ')[1]}</span>
        </div>

        {/* Tactical Transition Callout */}
        <div className="text-[11px] leading-tight">
          <div className="font-orbitron font-bold text-white tracking-wider flex items-center gap-1.5">
            <span>{activeSection.tacticalCallsign}</span>
          </div>
          <div className="text-[9px] text-neutral-400 font-mono">
            TACTICAL STRATEGY // GAMBIT SYNC
          </div>
        </div>
      </div>
    </div>
  );
};
