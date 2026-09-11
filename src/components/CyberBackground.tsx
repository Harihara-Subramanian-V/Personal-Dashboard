import React from 'react';

export const CyberBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Top Ambient Radial Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Bottom Ambient Glow */}
      <div className="absolute -bottom-40 right-10 w-[500px] h-[400px] bg-gradient-to-t from-emerald-500/5 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
    </div>
  );
};
