import React from 'react';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#070709] flex flex-col items-center justify-center select-none cursor-pointer p-4">
      {/* Background Subtle Grid & Crosshairs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-[#070709] to-[#070709] pointer-events-none" />

      <button
        onClick={onEnter}
        className="relative z-10 text-center space-y-4 group transition-all duration-300 focus:outline-none"
        title="Click to enter tactical command dashboard"
      >
        <div className="text-[11px] sm:text-xs font-mono text-orange-400 font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 inline-block" />
          <span>ROOT DEFENSE // OPERATOR ID</span>
        </div>

        {/* 2-Line Hero Name */}
        <h1 className="font-orbitron font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none text-white transition-transform duration-300 group-hover:scale-102">
          <span className="block text-white">
            HARIHARA
          </span>
          <span className="block text-orange-400 group-hover:text-amber-300 transition-colors">
            SUBRAMANIAN V
          </span>
        </h1>

        {/* Click to enter tactical prompt */}
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black border border-orange-500/50 group-hover:border-orange-400 group-hover:bg-orange-500/10 font-mono text-xs text-orange-300 transition-all">
            <span className="text-emerald-400 font-bold">▶</span>
            <span className="font-orbitron font-bold tracking-widest uppercase">
              CLICK NAME TO ENTER COMMAND DECK
            </span>
            <span className="text-emerald-400 font-bold">◀</span>
          </div>
        </div>
      </button>

      {/* Bottom Corner HUD Reticles */}
      <div className="absolute bottom-6 left-6 text-[10px] font-mono text-neutral-600 hidden sm:block">
        SYS_INITIALIZE // DUAL DEGREE VIT & IITM
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-neutral-600 hidden sm:block">
        AES-256 ENCRYPTED // NODE_01
      </div>
    </div>
  );
};
