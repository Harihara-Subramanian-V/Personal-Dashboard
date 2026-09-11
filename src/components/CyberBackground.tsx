import React from 'react';

export const CyberBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle Dot Grid Across Entire Screen */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Full-Bleed Architectural Drafting Guidelines */}
      <div className="hidden 2xl:block absolute inset-y-0 left-56 border-r border-zinc-800/30" />
      <div className="hidden 2xl:block absolute inset-y-0 right-56 border-l border-zinc-800/30" />

      {/* Top Ambient Radial Glow */}
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Bottom Ambient Radial Glow */}
      <div className="absolute -bottom-48 right-1/4 w-[700px] h-[500px] bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
    </div>
  );
};
