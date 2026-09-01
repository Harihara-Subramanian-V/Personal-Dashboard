import React from 'react';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  return (
    <div
      onClick={onEnter}
      className="fixed inset-0 z-50 bg-[#070709] flex flex-col items-center justify-center select-none cursor-pointer p-4 overflow-hidden"
    >
      <div className="text-center group transition-transform duration-500 ease-out hover:scale-102">
        {/* Clean, Majestic 2-Line Hero Name */}
        <h1 className="font-orbitron font-black text-4xl xs:text-6xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-none">
          <span className="block text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            HARIHARA
          </span>
          <span className="block text-orange-400 mt-2 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_25px_rgba(255,107,0,0.3)]">
            SUBRAMANIAN V
          </span>
        </h1>
      </div>
    </div>
  );
};
