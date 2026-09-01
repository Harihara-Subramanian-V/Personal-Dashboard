import React, { useState, useEffect } from 'react';
import { ArrowRight, Trophy, Bot, Cpu, Radio, Layers, ShieldCheck, Terminal, Award, Mail, BarChart2, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './CyberIcons';
import { CyberVCardFlip } from './CyberVCardFlip';
import { CapabilitiesRadarGraph } from './CapabilitiesRadarGraph';
import { PROFILE_INFO } from '../data/profileData';
import type { DashboardLayer } from './HudHeader';

interface HeroSectionProps {
  onNavigateLayer: (layer: DashboardLayer) => void;
  onOpenRfScanner?: () => void;
  onOpenComms?: () => void;
  onOpenResumeModal: () => void;
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
  onNavigateLayer,
  onOpenRfScanner,
  onOpenComms,
  onOpenResumeModal,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHomeGraph, setShowHomeGraph] = useState(false);

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
    <section id="overview" className="relative py-2 sm:py-4 overflow-hidden space-y-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Engineering Dossier & Bio */}
        <div className="lg:col-span-7 space-y-4 text-left">
          {/* 1. Multi-Discipline Tag Ribbon (Staggered Entrance 1) */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs animate-stagger-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/40 text-amber-300 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>IIT MADRAS DUAL BS (DATA SCIENCE)</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-400 inline-block" />
              <span>NPTEL ETHICAL HACKING</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/15 border border-orange-500/40 text-orange-400 font-bold">
              <Bot className="w-3.5 h-3.5 text-orange-400" />
              <span>ROBOTICS & SOCCER SEMIS</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black border border-neutral-800 text-neutral-400 text-[11px]">
              <Cpu className="w-3 h-3 text-orange-400" />
              <span>VIT VELLORE IT</span>
            </div>
          </div>

          {/* 2. 2-Line Hero Name (Drifts into position smoothly) */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-orange-400 font-bold tracking-widest uppercase animate-stagger-1">
              <span className="w-2 h-2 bg-emerald-400 inline-block shrink-0" />
              <span>OPERATOR CLEARANCE: ROOT / DEFCON 1</span>
            </div>

            <div className="transition-all duration-700 ease-out">
              <h1 className="font-orbitron font-black text-3xl xs:text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase select-none leading-none break-words">
                <span className="text-white block">HARIHARA</span>
                <span className="text-orange-400 block mt-1">SUBRAMANIAN V</span>
              </h1>
            </div>

            {/* 3. Rotating Subtitle Credential Pill (Staggered Entrance 2) */}
            <div className="min-h-[2.2rem] flex items-center pt-1 animate-stagger-2">
              <div className="bg-black px-3 py-1.5 border border-orange-500/40 flex items-center gap-2 font-mono text-[11px] sm:text-xs text-orange-300 max-w-full">
                <span className="text-emerald-400 font-bold shrink-0">▶</span>
                <span
                  className={`transition-all duration-300 font-semibold leading-snug ${
                    isAnimating ? 'opacity-0 scale-98' : 'opacity-100 scale-100 text-neutral-100'
                  }`}
                >
                  {ROTATING_CREDENTIALS[activeIdx]}
                </span>
              </div>
            </div>

            {/* 4. Interactive 3D Flip Operator vCard (Staggered Entrance 3) */}
            <div className="animate-stagger-3">
              <CyberVCardFlip />
            </div>
          </div>

          {/* 5. Profile Overview Description (Staggered Entrance 4) */}
          <p className="text-neutral-300 text-xs sm:text-sm font-sans leading-relaxed max-w-2xl border-l-2 border-orange-500/50 pl-3 animate-stagger-4">
            {PROFILE_INFO.bioSummary}
          </p>

          {/* 6. Tactical Stat Pills (Staggered Entrance 5) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 animate-stagger-5">
            <div className="bg-black p-2 border border-orange-500/30 text-center font-mono">
              <div className="text-[9px] text-neutral-400 uppercase">HARDWARE NODES</div>
              <div className="text-sm sm:text-base font-orbitron font-bold text-orange-400">ESP32 / AVR</div>
            </div>
            <div className="bg-black p-2 border border-orange-500/30 text-center font-mono">
              <div className="text-[9px] text-neutral-400 uppercase">RESEARCH PAPERS</div>
              <div className="text-sm sm:text-base font-orbitron font-bold text-orange-400">4 Active</div>
            </div>
            <div className="bg-black p-2 border border-orange-500/30 text-center font-mono">
              <div className="text-[9px] text-neutral-400 uppercase">REPOSITORIES</div>
              <div className="text-sm sm:text-base font-orbitron font-bold text-orange-400">11+ Repos</div>
            </div>
            <div className="bg-black p-2 border border-orange-500/30 text-center font-mono">
              <div className="text-[9px] text-neutral-400 uppercase">CORE STACK</div>
              <div className="text-sm sm:text-base font-orbitron font-bold text-emerald-400">Python • C++</div>
            </div>
          </div>

          {/* 7. Action CTAs (Staggered Entrance 6) */}
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2 pt-1 animate-stagger-6">
            <button
              onClick={() => onNavigateLayer('projects')}
              className="cyber-btn cyber-btn-solid text-xs py-2.5 px-5 font-bold justify-center"
            >
              <span>ENTER MISSIONS & LABS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setShowHomeGraph((prev) => !prev)}
              className={`cyber-btn text-xs py-2.5 px-4 justify-center border font-bold ${
                showHomeGraph
                  ? 'bg-orange-500 text-black border-orange-400'
                  : 'cyber-btn-outline'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{showHomeGraph ? '[-] HIDE GRAPH' : '[+] RENDER CAPABILITIES GRAPH'}</span>
              {showHomeGraph ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              onClick={() => onNavigateLayer('terminal')}
              className="cyber-btn cyber-btn-outline text-xs py-2.5 px-4 justify-center"
            >
              <span>ROOT CLI</span>
            </button>
          </div>

          {/* 8. Channels (Staggered Entrance 7) */}
          <div className="flex items-center gap-4 pt-1 text-neutral-400 font-mono text-xs animate-stagger-7">
            <span className="text-orange-400 font-bold">CHANNELS:</span>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-orange-400 transition-colors flex items-center gap-1"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <span className="text-neutral-600">|</span>
            <span className="text-[11px] text-neutral-300 select-all hover:text-white transition-colors">
              {PROFILE_INFO.email}
            </span>
          </div>
        </div>

        {/* Right Col: Tactical Layer Switcher Deck (Staggered Entrance 6) */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs animate-stagger-6">
          <div className="cyber-card p-4 border border-orange-500/40 space-y-3">
            <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 inline-block" />
                <span className="font-orbitron font-bold text-white text-xs">
                  LAYER CONTROL DECK
                </span>
              </div>
              <span className="text-[10px] text-neutral-400">SELECT TO SWITCH</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => onNavigateLayer('projects')}
                className="p-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-400 group-hover:text-emerald-400" />
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-orange-400">
                      [02] MISSIONS & LABS
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      SpeakSafe • GyroBot • Flight Booking • 9 Repos
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400" />
              </button>

              <button
                onClick={() => onNavigateLayer('capabilities')}
                className="p-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-400 group-hover:text-emerald-400" />
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-orange-400">
                      [03] CAPABILITIES GRAPH
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Interactive Radar Plot & Hardware Specs
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400" />
              </button>

              <button
                onClick={() => onNavigateLayer('achievements')}
                className="p-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400 group-hover:text-emerald-400" />
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-orange-400">
                      [04] HONORS & RESEARCH PAPERS
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      4 Research Preprints • Echo Prometheus • Robo Soccer
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400" />
              </button>

              <button
                onClick={() => onNavigateLayer('gallery')}
                className="p-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-orange-400 group-hover:text-emerald-400" />
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-orange-400">
                      [05] FIELD PHOTO GALLERY
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Robotics Labs, Hardware Bench & Event Frames
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400" />
              </button>

              <button
                onClick={() => onNavigateLayer('terminal')}
                className="p-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400 group-hover:text-emerald-400" />
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-orange-400">
                      [06] ROOT DEFENSE CLI
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Interactive Shell • Direct Repo Launcher
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400" />
              </button>

              <button
                onClick={() => {
                  if (onOpenComms) onOpenComms();
                  else onNavigateLayer('contact');
                }}
                className="p-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-400 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400 group-hover:text-emerald-400" />
                  <div>
                    <div className="font-orbitron font-bold text-white text-xs group-hover:text-orange-400">
                      [07] ENCRYPTED TRANSMISSION
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Quick Comms Link • Phone: +91 93423 46217
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-orange-400" />
              </button>
            </div>

            {/* Quick Actions Footer inside Deck */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={onOpenResumeModal}
                className="text-[11px] text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>[+] OPEN CV DOSSIER</span>
              </button>
              {onOpenRfScanner && (
                <button
                  onClick={onOpenRfScanner}
                  className="text-[11px] text-orange-400 font-bold hover:underline flex items-center gap-1"
                >
                  <Radio className="w-3 h-3" />
                  <span>RF SCANNER</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* On-Demand Capabilities Radar Graph (Renders when user clicks button on Home/Overview) */}
      {showHomeGraph && (
        <div className="max-w-7xl mx-auto pt-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-between bg-black px-4 py-2 border border-orange-500/50 mb-2 font-mono text-xs">
            <span className="text-orange-400 font-bold">[OVERVIEW PLOT // SYSTEM CAPABILITIES & HARDWARE MATRIX]</span>
            <button
              onClick={() => setShowHomeGraph(false)}
              className="text-neutral-400 hover:text-white font-bold"
            >
              [✕ CLOSE PLOT]
            </button>
          </div>
          <CapabilitiesRadarGraph />
        </div>
      )}
    </section>
  );
};
