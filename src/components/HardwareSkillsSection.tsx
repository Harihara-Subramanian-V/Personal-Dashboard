import React, { useState } from 'react';
import { HARDWARE_INVENTORY, SKILL_CATEGORIES } from '../data/profileData';

export const HardwareSkillsSection: React.FC = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState(0);

  return (
    <section id="hardware-skills" className="py-16 border-t border-zinc-800/80">
      <div className="w-full space-y-12">
        
        {/* Hardware Inventory Section */}
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
              Embedded Platforms
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Hardware Architecture & Microcontroller Inventory
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Microcontrollers, edge compute nodes, and bus protocol stacks engineered across autonomous robotics platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HARDWARE_INVENTORY.map((hw) => (
              <div
                key={hw.tag}
                className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {hw.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{hw.status}</span>
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-base font-bold text-white font-sans">{hw.name}</h3>
                    <p className="text-xs text-zinc-400 font-mono">{hw.architecture}</p>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {hw.useCase}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-zinc-400 font-semibold">
                    Communication Protocols
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hw.protocols.map((proto) => (
                      <span
                        key={proto}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800/80"
                      >
                        {proto}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Categorized */}
        <div className="space-y-6 pt-6">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              Technical Competencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Skills, Languages & Tooling
            </h2>
          </div>

          {/* Skill Category Selector */}
          <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-3">
            {SKILL_CATEGORIES.map((category, idx) => (
              <button
                key={category.title}
                onClick={() => setActiveSkillCategory(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeSkillCategory === idx
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Skills Grid (Up to 4 columns on large screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 animate-fade-in">
            {SKILL_CATEGORIES[activeSkillCategory].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/70 hover:border-zinc-700/80 transition-all space-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                        skill.level === 'Core'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          : skill.level === 'Advanced'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
                <div className="pt-2 text-[10px] font-mono text-zinc-500 border-t border-zinc-800/50">
                  Experience: {skill.experience}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
