import React, { useState } from 'react';
import { Cpu, ShieldCheck, Activity, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { SKILLS_DATA, HARDWARE_INVENTORY } from '../data/profileData';

export const SkillDefenseMatrix: React.FC = () => {
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    'ALL' | 'LANGUAGES' | 'AI_CV' | 'HARDWARE_IOT' | 'CYBERSEC_SYSTEMS'
  >('ALL');

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

  // Radar Axes for the single unified capabilities graph
  const radarAxes = [
    { label: 'Python & C++ Systems', value: 95, color: '#ff6b00' },
    { label: 'Robotics & Kinematics', value: 92, color: '#ffa726' },
    { label: 'AI & Computer Vision', value: 90, color: '#00ff66' },
    { label: 'Embedded IoT & ESP32', value: 90, color: '#00e5ff' },
    { label: 'Ethical Hacking & Sec', value: 88, color: '#ff0055' },
    { label: 'Data Science (IIT Madras)', value: 88, color: '#ffcc00' },
  ];

  // Calculate polygon points for radar chart (Center = 160, 160; Radius = 110)
  const centerX = 160;
  const centerY = 150;
  const maxRadius = 100;
  const totalAxes = radarAxes.length;

  const getCoordinates = (angleIndex: number, percentage: number) => {
    const angle = (Math.PI * 2 / totalAxes) * angleIndex - Math.PI / 2;
    const r = (percentage / 100) * maxRadius;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = radarAxes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.value);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <section id="skills" className="py-4 sm:py-6 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-3">
          <div>
            <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> [SECTION 03] // DEFENSE & PROFICIENCY MATRIX
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-3xl text-white mt-0.5">
              SYSTEM CAPABILITIES & HARDWARE
            </h2>
          </div>

          {/* Prominent Action: Plot Graph On Click */}
          <button
            onClick={() => setShowGraph((prev) => !prev)}
            className={`px-4 py-2 text-xs font-orbitron font-bold border transition-all flex items-center gap-2 uppercase ${
              showGraph
                ? 'bg-orange-500 text-black border-orange-400'
                : 'bg-black text-orange-400 border-orange-500/60 hover:bg-orange-500/10'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>{showGraph ? '[-] HIDE CAPABILITIES GRAPH' : '[+] RENDER CAPABILITIES GRAPH'}</span>
            {showGraph ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* 1. SINGLE UNIFIED CAPABILITIES & HARDWARE RADAR GRAPH (Renders ONLY when clicked) */}
        {showGraph && (
          <div className="cyber-card p-5 border-2 border-orange-500/60 bg-black animate-in fade-in duration-300 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-orange-500/30 pb-2.5 gap-2">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UNIFIED RADAR PROFICIENCY & HARDWARE ALLOCATION PLOT</span>
                </div>
                <h3 className="font-orbitron font-bold text-white text-sm">
                  CROSS-DISCIPLINARY DEFENSE ARCHITECTURE GRAPH
                </h3>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 px-2 py-1 border border-neutral-800">
                SCALED [0-100%]
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Radar Chart SVG Visualizer */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-2 bg-neutral-950 border border-neutral-800">
                <svg viewBox="0 0 320 300" className="w-full max-w-[340px] h-auto overflow-visible select-none">
                  {/* Concentric Grid Rings */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, idx) => {
                    const points = radarAxes
                      .map((_, i) => {
                        const { x, y } = getCoordinates(i, level * 100);
                        return `${x},${y}`;
                      })
                      .join(' ');
                    return (
                      <polygon
                        key={idx}
                        points={points}
                        fill="none"
                        stroke="rgba(255, 107, 0, 0.2)"
                        strokeWidth="1"
                        strokeDasharray={level === 1.0 ? 'none' : '2 2'}
                      />
                    );
                  })}

                  {/* Axis lines from center */}
                  {radarAxes.map((_, i) => {
                    const { x, y } = getCoordinates(i, 100);
                    return (
                      <line
                        key={i}
                        x1={centerX}
                        y1={centerY}
                        x2={x}
                        y2={y}
                        stroke="rgba(255, 107, 0, 0.3)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Filled Proficiency Radar Polygon */}
                  <polygon
                    points={polygonPoints}
                    fill="rgba(255, 107, 0, 0.25)"
                    stroke="#ff6b00"
                    strokeWidth="2"
                  />

                  {/* Radar Data Vertex Nodes & Labels */}
                  {radarAxes.map((axis, i) => {
                    const { x, y } = getCoordinates(i, axis.value);
                    const labelPos = getCoordinates(i, 126);
                    return (
                      <g key={i}>
                        {/* Node Vertex */}
                        <circle cx={x} cy={y} r="4" fill="#ffa726" stroke="#000" strokeWidth="1.5" />

                        {/* Node Label Text */}
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#ffffff"
                          fontSize="9"
                          fontFamily="JetBrains Mono, monospace"
                          fontWeight="bold"
                        >
                          {axis.label} ({axis.value}%)
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Hardware Telemetry & Allocation Registers */}
              <div className="lg:col-span-5 space-y-3 font-mono text-xs">
                <div className="text-[10px] text-orange-400 font-bold uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-orange-400" />
                  <span>HARDWARE CHIPSET ALLOCATIONS</span>
                </div>

                <div className="space-y-2">
                  {HARDWARE_INVENTORY.map((hw) => (
                    <div key={hw.name} className="bg-neutral-950 p-2.5 border border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{hw.name}</span>
                        <span className="text-orange-400 text-[10px]">{hw.tag}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Arch: <strong className="text-neutral-200">{hw.architecture} @ {hw.clockSpeed}</strong>
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        Status: {hw.status} • Bus: {hw.protocols.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Category Filter Tabs */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 font-mono text-xs pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
              className={`px-3 py-1.5 transition-all uppercase shrink-0 text-[11px] sm:text-xs font-bold border ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-black border-orange-400'
                  : 'bg-black border-neutral-800 text-neutral-400 hover:text-white hover:border-orange-500/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. Main Grid: Sharp Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="cyber-card p-3.5 space-y-2 border border-neutral-800 hover:border-orange-500/60 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white">
                  {skill.name}
                </span>
                <span className="text-orange-400 font-bold">{skill.level}%</span>
              </div>

              {/* Progress Bar (Sharp Brutalist) */}
              <div className="w-full h-1.5 bg-black border border-neutral-800">
                <div
                  className="h-full bg-orange-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-0.5">
                <span>{skill.levelLabel}</span>
                <span className="text-neutral-500">{skill.experience}</span>
              </div>

              <p className="text-[11px] text-neutral-300 font-sans leading-tight pt-1 border-t border-neutral-900">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
