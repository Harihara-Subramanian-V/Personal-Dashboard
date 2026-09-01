import React from 'react';
import { Cpu, Activity } from 'lucide-react';
import { HARDWARE_INVENTORY } from '../data/profileData';

export const CapabilitiesRadarGraph: React.FC = () => {
  // Radar Axes for the single unified capabilities graph
  const radarAxes = [
    { label: 'Python & C++ Systems', value: 95 },
    { label: 'Robotics & Kinematics', value: 92 },
    { label: 'AI & Computer Vision', value: 90 },
    { label: 'Embedded IoT & ESP32', value: 90 },
    { label: 'Ethical Hacking & Sec', value: 88 },
    { label: 'Data Science (IIT Madras)', value: 88 },
  ];

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
    <div className="cyber-card p-5 border-2 border-orange-500/60 bg-black animate-in fade-in duration-300 space-y-4 font-mono text-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-orange-500/30 pb-2.5 gap-2">
        <div className="space-y-0.5">
          <div className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>UNIFIED RADAR PROFICIENCY & HARDWARE ALLOCATION PLOT</span>
          </div>
          <h3 className="font-orbitron font-bold text-white text-sm">
            CROSS-DISCIPLINARY DEFENSE ARCHITECTURE GRAPH
          </h3>
        </div>
        <span className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-1 border border-neutral-800">
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
                  <circle cx={x} cy={y} r="4" fill="#ffa726" stroke="#000" strokeWidth="1.5" />
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
        <div className="lg:col-span-5 space-y-2.5 font-mono text-xs">
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
  );
};
