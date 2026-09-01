import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Radio } from 'lucide-react';

export type DashboardLayer = 'overview' | 'projects' | 'capabilities' | 'achievements' | 'gallery' | 'terminal' | 'contact';

interface HudHeaderProps {
  activeLayer: DashboardLayer;
  onSelectLayer: (layer: DashboardLayer) => void;
  onOpenResumeModal: () => void;
  onOpenRfScanner?: () => void;
  onOpenComms?: () => void;
}

export const HudHeader: React.FC<HudHeaderProps> = ({
  activeLayer,
  onSelectLayer,
  onOpenResumeModal,
  onOpenRfScanner,
  onOpenComms,
}) => {
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

  const navLayers: Array<{ id: DashboardLayer; label: string }> = [
    { id: 'overview', label: '01_OVERVIEW' },
    { id: 'projects', label: '02_MISSIONS & LABS' },
    { id: 'capabilities', label: '03_CAPABILITIES' },
    { id: 'achievements', label: '04_HONORS & PAPERS' },
    { id: 'gallery', label: '05_GALLERY' },
    { id: 'terminal', label: '06_ROOT_CLI' },
    { id: 'contact', label: '07_TRANSMISSION' },
  ];

  const handleNavClick = (layerId: DashboardLayer) => {
    setMobileMenuOpen(false);
    if (layerId === 'contact') {
      if (onOpenComms) onOpenComms();
    } else {
      onSelectLayer(layerId);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070709]/95 backdrop-blur-md border-b border-orange-500/40 font-mono text-xs select-none animate-stagger-1">
      {/* Top Micro-Telemetry Status Ribbon */}
      <div className="hidden md:flex items-center justify-between px-4 py-1 bg-black border-b border-neutral-900 text-[10px] text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 bg-emerald-400 inline-block" />
            <span>NODES: VIT VELLORE & IIT MADRAS (DUAL BS)</span>
          </span>
          <span className="text-neutral-300">ROBOTICS & EMBEDDED IoT // NPTEL ETHICAL HACKING // AI-CV</span>
          <span className="text-amber-400 font-semibold">IIT MADRAS 1ST PLACE & ROBO SOCCER SEMIS</span>
          {gameHighScore > 0 && (
            <span className="text-amber-300 font-bold bg-amber-500/15 px-2 py-0.5 border border-amber-500/40 flex items-center gap-1">
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
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Brand Logo / Callsign */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 bg-black border border-orange-500 flex items-center justify-center font-orbitron font-black text-orange-400 group-hover:bg-orange-500 group-hover:text-black transition-colors">
            H
          </div>
          <div>
            <div className="font-orbitron font-black text-white text-sm tracking-wider flex items-center gap-1">
              HARIHARA <span className="text-orange-500">.V</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono">
              [TACTICAL MULTI-LAYER DASHBOARD]
            </div>
          </div>
        </button>

        {/* Desktop Layer Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 text-[11px] font-mono">
          {navLayers.map((layer) => {
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => handleNavClick(layer.id)}
                className={`px-2.5 py-1.5 transition-all text-[11px] font-bold border uppercase ${
                  isActive
                    ? 'bg-orange-500 text-black border-orange-400 shadow-sm'
                    : 'bg-black/60 text-neutral-400 hover:text-white border-neutral-800 hover:border-orange-500/50'
                }`}
              >
                {layer.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: RF Scanner & CV Dossier */}
        <div className="flex items-center gap-2">
          {onOpenRfScanner && (
            <button
              onClick={onOpenRfScanner}
              className="p-1.5 px-2.5 bg-emerald-500/10 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 transition-all flex items-center gap-1.5 text-[11px] font-bold"
              title="Launch Wireless RF & Bluetooth Device Scanner"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-orbitron">RF SCAN</span>
            </button>
          )}

          {/* CV Dossier Modal Trigger */}
          <button
            onClick={onOpenResumeModal}
            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron text-[11px] transition-all flex items-center gap-1.5 active:scale-95"
            title="View full CV / Resume Dossier"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>VIEW CV</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-1.5 border border-orange-500/40 text-orange-400 hover:bg-orange-500/10"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Layer Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-orange-500/40 px-4 py-3 space-y-1.5 font-mono text-xs">
          {navLayers.map((layer) => {
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => handleNavClick(layer.id)}
                className={`w-full text-left px-3 py-2 border transition-all text-xs font-bold uppercase ${
                  isActive
                    ? 'bg-orange-500 text-black border-orange-400'
                    : 'bg-neutral-950 text-neutral-300 border-neutral-800'
                }`}
              >
                {layer.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
