import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, FileText, Menu, X, Radio } from 'lucide-react';
import { AudioWaveVisualizer } from './AudioWaveVisualizer';
import { cyberAudio } from '../utils/audio';

interface HudHeaderProps {
  showMatrixRain: boolean;
  onToggleMatrix: () => void;
  onOpenResumeModal: () => void;
  onOpenRfScanner?: () => void;
  onOpenComms?: () => void;
}

export const HudHeader: React.FC<HudHeaderProps> = ({
  showMatrixRain,
  onToggleMatrix,
  onOpenResumeModal,
  onOpenRfScanner,
  onOpenComms,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(cyberAudio.getMuted());
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [gameHighScore, setGameHighScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem('cyber_star_shooter_highscore');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHighUpdate = (e: Event) => {
      const custom = e as CustomEvent<number>;
      setGameHighScore(custom.detail);
    };
    window.addEventListener('star_shooter_highscore_updated', handleHighUpdate);
    return () => window.removeEventListener('star_shooter_highscore_updated', handleHighUpdate);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = cyberAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { href: '#overview', label: '01_OVERVIEW', isComms: false },
    { href: '#projects', label: '02_MISSIONS & LABS', isComms: false },
    { href: '#skills', label: '03_TECH & HARDWARE', isComms: false },
    { href: '#achievements', label: '04_HONORS & PAPERS', isComms: false },
    { href: '#terminal', label: '05_ROOT_CLI', isComms: false },
    { href: '#comms', label: '06_TRANSMISSION', isComms: true },
  ];

  const handleLinkClick = (e: React.MouseEvent, isComms: boolean) => {
    cyberAudio.playClick();
    setMobileMenuOpen(false);
    if (isComms) {
      e.preventDefault();
      if (onOpenComms) onOpenComms();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-orange-500/30 font-mono text-xs selection:bg-orange-500 selection:text-black">
      {/* Top Micro-Telemetry Status Ribbon */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 bg-black/95 border-b border-neutral-900 text-[10px] text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>NODES: VIT VELLORE & IIT MADRAS (DUAL BS)</span>
          </span>
          <span className="text-neutral-300">ROBOTICS & EMBEDDED IoT // NPTEL ETHICAL HACKING // AI-CV</span>
          <span className="text-amber-400 font-semibold">IIT MADRAS 1ST PLACE & ROBO SOCCER SEMIS</span>
          {gameHighScore > 0 && (
            <span className="text-amber-300 font-bold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/40 flex items-center gap-1">
              🏆 HIGH SCORE: {gameHighScore}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            SYS_CLOCK: <strong className="text-orange-400">{currentTime}</strong>
          </span>
          <span className="text-neutral-500">OPERATOR: HARIHARA SUBRAMANIAN V</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Logo / Callsign */}
        <a
          href="#overview"
          onClick={() => cyberAudio.playClick()}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-emerald-500 p-[1px] shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-neutral-950 rounded flex items-center justify-center font-orbitron font-black text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors">
              H
            </div>
          </div>
          <div>
            <div className="font-orbitron font-black text-white text-sm tracking-wider flex items-center gap-1.5">
              HARIHARA <span className="text-orange-500">.V</span>
            </div>
            <div className="text-[10px] text-emerald-400/90 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span>ROBOTICS & CYBER COMMAND HUD</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] text-neutral-300 tracking-wider font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.isComms)}
              className="hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(0,255,102,0.5)] transition-all relative py-1 group cursor-pointer"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-emerald-400 to-orange-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Actions & Utilities: Audio, Matrix, RF Scanner, Resume PIN Modal */}
        <div className="flex items-center gap-2">
          {/* Mini Audio Visualizer Spectrum */}
          <div className="hidden sm:block">
            <AudioWaveVisualizer />
          </div>

          {/* RF Spectrum Scanner Trigger */}
          {onOpenRfScanner && (
            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenRfScanner();
              }}
              className="p-1.5 px-2.5 rounded bg-emerald-500/10 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 transition-all flex items-center gap-1.5 text-[11px] font-bold shadow-sm shadow-emerald-500/20"
              title="Launch Wireless RF & Bluetooth Device Scanner"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden sm:inline font-orbitron">RF SCAN</span>
            </button>
          )}

          {/* Matrix Rain Toggle */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onToggleMatrix();
            }}
            className={`p-1.5 rounded border transition-all text-xs opacity-40 hover:opacity-100 ${
              showMatrixRain
                ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-700 bg-neutral-900/50'
            }`}
            title="Toggle Matrix Digital Rain"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Audio Engine Mute / Unmute Button */}
          <button
            onClick={handleAudioToggle}
            className={`p-1.5 rounded border transition-all text-xs ${
              !isMuted
                ? 'border-orange-500/40 text-orange-400 bg-orange-500/10 shadow-sm shadow-orange-500/20'
                : 'border-neutral-800 text-neutral-500 bg-neutral-900/50'
            }`}
            title={isMuted ? 'Unmute Cyber Audio' : 'Mute Cyber Audio'}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* PIN-Protected Resume Modal Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenResumeModal();
            }}
            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron rounded text-[11px] transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/30 active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PIN DOSSIER</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="lg:hidden p-1.5 rounded border border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-orange-500/30 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.isComms)}
              className="block py-2 text-neutral-300 hover:text-emerald-400 hover:bg-emerald-500/10 px-2 rounded transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
