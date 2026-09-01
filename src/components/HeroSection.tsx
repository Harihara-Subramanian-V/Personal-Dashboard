import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Bot, Cpu, Radio } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './CyberIcons';
import { ThreeWorldGeoMap } from './ThreeWorldGeoMap';
import { AudioWaveVisualizer } from './AudioWaveVisualizer';
import { CyberVCardFlip } from './CyberVCardFlip';
import { PROFILE_INFO } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onExploreProjects: () => void;
  onOpenRfScanner?: () => void;
}

const ROTATING_CREDENTIALS = [
  '🎓 Dual Degree: BS in Data Science & Applications @ IIT Madras',
  '🛡️ Certified Ethical Hacking Practitioner (NPTEL / SWAYAM)',
  '⚽ Semi-Finalist in Robo Soccer Championship @ IIT Madras',
  '🏆 1st Place Echo Prometheus Champion @ IIT Madras',
  'Autonomous Robotics & Microcontroller Kinematics',
  'Embedded IoT Hardware (ESP32-S3 / STM32 / Arduino)',
  '⚡ Finalist Honors in Vortex 2.0 @ IEEE SSN Chennai',
  '🔬 Authoring 4 Active Computational Research Papers',
  'Tactical Chess Strategy & Minimax Game Theory',
  'Cyber Security & CTF Defender @ White Hats Club',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  onExploreProjects,
  onOpenRfScanner,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Smooth, silky subtitle transition without jittery letter-by-letter backspacing
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIdx((prev) => (prev + 1) % ROTATING_CREDENTIALS.length);
        setIsAnimating(false);
      }, 350);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview" className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Engineering Dossier & Bio */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Multi-Discipline Tag Ribbon */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/40 rounded-full text-amber-300 font-bold shadow-sm shadow-amber-500/20">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>IIT MADRAS DUAL BS (DATA SCIENCE)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/40 rounded-full text-emerald-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>NPTEL ETHICAL HACKING</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/15 border border-orange-500/40 rounded-full text-orange-400 font-bold">
              <Bot className="w-3.5 h-3.5 text-orange-400" />
              <span>ROBOTICS & SOCCER KINEMATICS</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-neutral-800 rounded-full text-neutral-400 text-[11px]">
              <Cpu className="w-3 h-3 text-orange-400" />
              <span>VIT VELLORE IT</span>
            </div>
          </div>

          {/* Clean, Stable, Rock-Solid Hero Title with Silky Sheen Sweep (Zero Jitter) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>OPERATOR CLEARANCE: ROOT / DEFCON 1</span>
            </div>

            <div
              className="light-sheen-sweep inline-block rounded-lg"
              onMouseEnter={() => cyberAudio.playHover()}
            >
              <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase select-none transition-all hero-glow-title leading-tight">
                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
                  HARIHARA{' '}
                </span>
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  SUBRAMANIAN V
                </span>
              </h1>
            </div>

            {/* Silky-Smooth Fade & Slide Subtitle Badge (No layout jumping) */}
            <div className="h-10 flex items-center">
              <div className="bg-black/75 px-3.5 py-1.5 rounded-md border border-orange-500/30 flex items-center gap-2 font-mono text-xs sm:text-sm text-orange-300 shadow-md shadow-orange-500/10">
                <span className="text-emerald-400 font-bold">▶</span>
                <span
                  className={`transition-all duration-300 transform font-semibold ${
                    isAnimating
                      ? 'opacity-0 translate-y-1.5 scale-98'
                      : 'opacity-100 translate-y-0 scale-100 text-neutral-100'
                  }`}
                >
                  {ROTATING_CREDENTIALS[activeIdx]}
                </span>
              </div>
            </div>

            {/* Interactive 3D Flip Operator vCard */}
            <CyberVCardFlip />
          </div>

          {/* Profile Overview Description */}
          <p className="text-neutral-300 text-sm sm:text-base font-sans leading-relaxed max-w-2xl border-l-2 border-orange-500/40 pl-3.5">
            {PROFILE_INFO.bioSummary}
          </p>

          {/* Tactical Engineering Stat Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-black/70 p-2.5 rounded border border-orange-500/30 text-center font-mono hover:border-orange-500/60 transition-colors shadow-sm shadow-orange-500/10">
              <div className="text-[10px] text-neutral-400 uppercase">HARDWARE NODES</div>
              <div className="text-base sm:text-lg font-orbitron font-bold text-orange-400">ESP32 / AVR</div>
            </div>
            <div className="bg-black/70 p-2.5 rounded border border-orange-500/30 text-center font-mono hover:border-orange-500/60 transition-colors shadow-sm shadow-orange-500/10">
              <div className="text-[10px] text-neutral-400 uppercase">RESEARCH PAPERS</div>
              <div className="text-base sm:text-lg font-orbitron font-bold text-orange-400">4 Active</div>
            </div>
            <div className="bg-black/70 p-2.5 rounded border border-orange-500/30 text-center font-mono hover:border-orange-500/60 transition-colors shadow-sm shadow-orange-500/10">
              <div className="text-[10px] text-neutral-400 uppercase">REPOSITORIES</div>
              <div className="text-base sm:text-lg font-orbitron font-bold text-orange-400">9+ Repos</div>
            </div>
            <div className="bg-black/70 p-2.5 rounded border border-orange-500/30 text-center font-mono hover:border-orange-500/60 transition-colors shadow-sm shadow-orange-500/10">
              <div className="text-[10px] text-neutral-400 uppercase">CORE STACK</div>
              <div className="text-base sm:text-lg font-orbitron font-bold text-emerald-400">Python • C++</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreProjects}
              className="cyber-btn cyber-btn-solid text-xs sm:text-sm py-3 px-6 font-bold shadow-lg shadow-orange-500/30"
            >
              <span>EXPLORE MISSIONS & LABS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenRfScanner && (
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenRfScanner();
                }}
                className="px-4 py-3 bg-black/80 hover:bg-orange-500/20 border border-orange-500/40 hover:border-orange-400 text-orange-400 font-orbitron font-bold rounded text-xs transition-all flex items-center gap-2"
                title="Open WiFi & Bluetooth BLE Discovery Scanner"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>RF / WiFi Scanner</span>
              </button>
            )}

            <button
              onClick={onOpenTerminal}
              className="cyber-btn cyber-btn-outline text-xs sm:text-sm py-3 px-5"
            >
              <span>LAUNCH ROOT CLI</span>
            </button>
          </div>

          {/* Social Links & Comms */}
          <div className="flex items-center gap-4 pt-2 text-neutral-400 font-mono text-xs">
            <span className="text-orange-400 font-bold">COMMS:</span>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => cyberAudio.playClick()}
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <span className="text-neutral-500">|</span>
            <span className="text-[11px] text-neutral-400 select-all hover:text-white transition-colors">
              {PROFILE_INFO.email}
            </span>
          </div>
        </div>

        {/* Right Col: 3D Holographic World Globe & Audio Visualizer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative space-y-4">
          <ThreeWorldGeoMap />
          <AudioWaveVisualizer />
        </div>
      </div>
    </section>
  );
};
