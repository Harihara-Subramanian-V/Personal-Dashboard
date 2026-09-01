import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Activity } from 'lucide-react';
import { SKILLS_DATA, HARDWARE_INVENTORY } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

export const SkillDefenseMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'ALL' | 'LANGUAGES' | 'AI_CV' | 'HARDWARE_IOT' | 'CYBERSEC_SYSTEMS'
  >('ALL');

  // Live fluctuating hardware telemetry registers
  const [telemetry, setTelemetry] = useState({
    cpuTemp: 41.8,
    i2cRate: 400,
    spiRate: 40,
    pwmDuty: 88.4,
    busVoltage: 3.32,
    chessEval: '+1.85',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry({
        cpuTemp: Number((41.5 + Math.random() * 1.8).toFixed(1)),
        i2cRate: Math.random() > 0.1 ? 400 : 398,
        spiRate: Math.random() > 0.1 ? 40 : 39.8,
        pwmDuty: Number((87.5 + Math.random() * 2.5).toFixed(1)),
        busVoltage: Number((3.30 + Math.random() * 0.04).toFixed(2)),
        chessEval: `+${(1.75 + Math.random() * 0.25).toFixed(2)}`,
      });
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'ALL', label: 'FULL MATRIX' },
    { id: 'LANGUAGES', label: 'LANGUAGES' },
    { id: 'AI_CV', label: 'AI & VISION' },
    { id: 'HARDWARE_IOT', label: 'HARDWARE & IOT' },
    { id: 'CYBERSEC_SYSTEMS', label: 'CYBERSEC & OPS' },
  ];

  const filteredSkills = SKILLS_DATA.filter((s) => {
    if (selectedCategory === 'ALL') return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="skills" className="py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-4">
          <div>
            <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> [SECTION 03] // DEFENSE & PROFICIENCY MATRIX
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white mt-1">
              SYSTEM CAPABILITIES & HARDWARE
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 font-mono text-xs pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setSelectedCategory(cat.id as typeof selectedCategory);
                }}
                className={`px-3 py-1.5 rounded transition-all uppercase shrink-0 text-[11px] sm:text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/30'
                    : 'bg-black/50 border border-orange-500/30 text-neutral-400 hover:text-white hover:border-emerald-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Skills Bars + Hardware Telemetry Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Dynamic Skill Gauges */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="cyber-card rounded-lg p-4 space-y-2 group hover:border-orange-500/60 transition-all"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-white group-hover:text-orange-400 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-orange-400 font-bold">{skill.level}%</span>
                  </div>

                  {/* Neon Progress Bar */}
                  <div className="w-full h-2 bg-black/80 rounded-full overflow-hidden border border-neutral-800 p-[1px]">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full shadow-sm shadow-orange-500 transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-0.5">
                    <span>{skill.levelLabel}</span>
                    <span className="text-neutral-500">{skill.experience}</span>
                  </div>

                  <p className="text-[11px] text-neutral-400 font-sans leading-tight line-clamp-2 pt-1 border-t border-neutral-800/60">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Embedded Hardware Telemetry & Tactical Strategy Board */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. SoC & Hardware Platforms Inventory */}
            <div className="cyber-card rounded-lg p-5 border border-orange-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-orange-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-orange-400" />
                  <span className="font-orbitron font-bold text-sm text-white">
                    SOC & EMBEDDED HARDWARE
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  ALL NODES ONLINE
                </span>
              </div>

              {/* Hardware Inventory Cards */}
              <div className="space-y-2.5 font-mono text-xs">
                {HARDWARE_INVENTORY.map((hw) => (
                  <div
                    key={hw.tag}
                    className="p-2.5 bg-black/60 rounded border border-neutral-800 hover:border-orange-500/40 transition-colors space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-400">{hw.name}</span>
                      <span className="text-[10px] text-neutral-500">[{hw.tag}]</span>
                    </div>

                    <div className="text-[11px] text-neutral-300">
                      Arch: <span className="text-neutral-400">{hw.architecture}</span> | Clock: <span className="text-emerald-400">{hw.clockSpeed}</span>
                    </div>

                    <div className="text-[10px] text-neutral-400">
                      Target: {hw.useCase}
                    </div>

                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {hw.protocols.map((proto) => (
                        <span
                          key={proto}
                          className="px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 text-[9px] border border-neutral-800"
                        >
                          {proto}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Real-Time Hardware Sensor Telemetry Registers */}
            <div className="cyber-card rounded-lg p-4 border border-orange-500/30 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-orange-400 font-bold border-b border-neutral-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>HARDWARE BUS & SENSOR REGISTERS</span>
                </span>
                <span className="text-emerald-400 text-[10px]">LIVE REFRESH (1.8s)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-black/60 rounded border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">I2C FAST MODE</div>
                  <div className="text-sm font-orbitron font-bold text-orange-400">{telemetry.i2cRate} kHz</div>
                </div>

                <div className="p-2 bg-black/60 rounded border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">SPI DMA BUS</div>
                  <div className="text-sm font-orbitron font-bold text-orange-400">{telemetry.spiRate} MHz</div>
                </div>

                <div className="p-2 bg-black/60 rounded border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">CPU TEMP</div>
                  <div className="text-sm font-orbitron font-bold text-emerald-400">{telemetry.cpuTemp} °C</div>
                </div>

                <div className="p-2 bg-black/60 rounded border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">PWM CARRIER</div>
                  <div className="text-sm font-orbitron font-bold text-orange-400">{telemetry.pwmDuty}%</div>
                </div>

                <div className="p-2 bg-black/60 rounded border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">VCC RAIL</div>
                  <div className="text-sm font-orbitron font-bold text-emerald-400">{telemetry.busVoltage} V</div>
                </div>

                <div className="p-2 bg-black/60 rounded border border-neutral-800">
                  <div className="text-[10px] text-neutral-500">PACKET LOSS</div>
                  <div className="text-sm font-orbitron font-bold text-emerald-400">0.00%</div>
                </div>
              </div>
            </div>

            {/* 3. Tactical Chess & Strategic Aces Matrix */}
            <div className="cyber-card rounded-lg p-4 border border-amber-500/40 space-y-3 font-mono">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-neutral-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">♟️</span>
                  <span>TACTICAL CHESS & ACES STRATEGY ENGINE</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30">
                  ♠ ACE OF SPADES
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-black/60 rounded border border-neutral-800 space-y-0.5">
                  <div className="text-[10px] text-neutral-400 flex items-center justify-between">
                    <span>POSITION EVAL</span>
                    <span className="text-emerald-400 font-bold">{telemetry.chessEval}</span>
                  </div>
                  <div className="text-white font-bold text-xs">Minimax Depth 12</div>
                  <div className="text-[10px] text-neutral-500">Alpha-Beta Pruned</div>
                </div>

                <div className="p-2.5 bg-black/60 rounded border border-neutral-800 space-y-0.5">
                  <div className="text-[10px] text-neutral-400 flex items-center justify-between">
                    <span>ACE PROBABILITY</span>
                    <span className="text-orange-400 font-bold">96.8%</span>
                  </div>
                  <div className="text-white font-bold text-xs">♠ ♥ ♦ ♣ Card Heuristics</div>
                  <div className="text-[10px] text-neutral-500">Calculated Risk Alpha</div>
                </div>
              </div>

              <p className="text-[11px] text-neutral-300 font-sans leading-tight">
                Applying grandmaster chess opening theory, dynamic pawn structure tactics, and Ace card probabilistic risk assessment to build resilient autonomous algorithms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
