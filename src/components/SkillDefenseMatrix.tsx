import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CapabilitiesRadarGraph } from './CapabilitiesRadarGraph';

export const SkillDefenseMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-4 sm:py-6 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-3">
          <div>
            <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> [SECTION 03] // DEFENSE & PROFICIENCY GRAPH
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-3xl text-white mt-0.5">
              SYSTEM CAPABILITIES & HARDWARE
            </h2>
          </div>
        </div>

        {/* Single Unified Capabilities Radar & Hardware Resource Allocation Graph */}
        <CapabilitiesRadarGraph />
      </div>
    </section>
  );
};
