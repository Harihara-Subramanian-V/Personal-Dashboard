import { useState, useEffect } from 'react';
import { HudHeader, type DashboardLayer } from './components/HudHeader';
import { CyberBackground } from './components/CyberBackground';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillDefenseMatrix } from './components/SkillDefenseMatrix';
import { AchievementsSection } from './components/AchievementsSection';
import { CyberTerminal } from './components/CyberTerminal';
import { SlideOverCommsDrawer } from './components/SlideOverCommsDrawer';
import { ResumeDossierModal } from './components/ResumeDossierModal';
import { WirelessDeviceScanner } from './components/WirelessDeviceScanner';
import { CyberStarShooter } from './components/CyberStarShooter';
import { CustomCursor } from './components/CustomCursor';
import { Terminal, Mail } from 'lucide-react';

export function App() {
  const [activeLayer, setActiveLayer] = useState<DashboardLayer>('overview');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isRfScannerOpen, setIsRfScannerOpen] = useState<boolean>(false);
  const [isStarShooterOpen, setIsStarShooterOpen] = useState<boolean>(false);
  const [isCommsOpen, setIsCommsOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Secret global hotkey: Shift + S or ` (backtick) triggers hidden Star Shooter game
  useEffect(() => {
    const handleSecretKey = (e: KeyboardEvent) => {
      if ((e.shiftKey && (e.key === 'S' || e.key === 's')) || e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsStarShooterOpen(true);
      }
    };

    window.addEventListener('keydown', handleSecretKey);
    return () => window.removeEventListener('keydown', handleSecretKey);
  }, []);

  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveLayer('projects');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f0f2f5] relative font-rajdhani selection:bg-orange-500 selection:text-black">
      {/* Custom Cyber Reticle Cursor */}
      <CustomCursor />

      {/* Static High-Performance Tactical Grid Background */}
      <CyberBackground />

      {/* Main Content Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top HUD Telemetry & Multi-Layer Navigation */}
        <HudHeader
          activeLayer={activeLayer}
          onSelectLayer={(layer) => setActiveLayer(layer)}
          onOpenResumeModal={() => setIsResumeOpen(true)}
          onOpenRfScanner={() => setIsRfScannerOpen(true)}
          onOpenComms={() => setIsCommsOpen(true)}
        />

        {/* Tactical Layer Body Viewports (Only active layer is rendered) */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-4 w-full">
          {/* LAYER 01: OVERVIEW & BIOGRAPHY */}
          {activeLayer === 'overview' && (
            <div className="animate-in fade-in duration-200">
              <HeroSection
                onNavigateLayer={(layer) => setActiveLayer(layer)}
                onOpenRfScanner={() => setIsRfScannerOpen(true)}
                onOpenComms={() => setIsCommsOpen(true)}
                onOpenResumeModal={() => setIsResumeOpen(true)}
              />
            </div>
          )}

          {/* LAYER 02: MISSIONS & LABS */}
          {activeLayer === 'projects' && (
            <div className="animate-in fade-in duration-200">
              <ProjectsSection
                selectedProjectId={selectedProjectId}
                onClearSelectedProject={() => setSelectedProjectId(null)}
              />
            </div>
          )}

          {/* LAYER 03: CAPABILITIES & HARDWARE MATRIX */}
          {activeLayer === 'capabilities' && (
            <div className="animate-in fade-in duration-200">
              <SkillDefenseMatrix />
            </div>
          )}

          {/* LAYER 04: HONORS & RESEARCH PAPERS */}
          {activeLayer === 'achievements' && (
            <div className="animate-in fade-in duration-200">
              <AchievementsSection />
            </div>
          )}

          {/* LAYER 05: ROOT DEFENSE CLI TERMINAL */}
          {activeLayer === 'terminal' && (
            <div className="animate-in fade-in duration-200 max-w-5xl mx-auto space-y-4">
              <div className="border-b border-orange-500/30 pb-2 flex items-center justify-between font-mono">
                <div>
                  <div className="text-xs text-orange-400 font-bold uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> [SECTION 05] // ROOT COMMAND LINE ACCESS
                  </div>
                  <h2 className="font-orbitron font-black text-xl sm:text-2xl text-white mt-0.5">
                    INTERACTIVE DEFENSE CONSOLE
                  </h2>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30">
                  SSH PORT: 22 // AES-256
                </span>
              </div>

              <CyberTerminal
                onToggleMatrix={() => {}}
                onOpenProject={handleOpenProjectModal}
                onTriggerJumpscare={() => {}}
                onOpenRfScanner={() => setIsRfScannerOpen(true)}
                onOpenStarShooter={() => setIsStarShooterOpen(true)}
                onOpenComms={() => setIsCommsOpen(true)}
              />
            </div>
          )}

          {/* LAYER 06: ENCRYPTED COMMS & TRANSMISSION */}
          {activeLayer === 'contact' && (
            <div className="animate-in fade-in duration-200 max-w-3xl mx-auto space-y-4 font-mono text-xs">
              <div className="border-b border-orange-500/30 pb-2 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-400 font-bold uppercase flex items-center gap-2">
                    <Mail className="w-4 h-4" /> [SECTION 06] // ENCRYPTED COMMS BEACON
                  </div>
                  <h2 className="font-orbitron font-black text-xl text-white mt-0.5">
                    ESTABLISH DIRECT TRANSMISSION
                  </h2>
                </div>
                <button
                  onClick={() => setIsCommsOpen(true)}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron text-xs"
                >
                  OPEN DRAWER
                </button>
              </div>

              <div className="cyber-card p-5 border border-orange-500/40 space-y-3">
                <div className="text-white font-bold font-orbitron text-sm">DIRECT OPERATOR CHANNELS:</div>
                <div className="p-3 bg-black border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 text-[10px]">EMAIL (PRIMARY INBOX):</div>
                  <div className="text-orange-400 font-bold text-sm select-all">harishv2911@gmail.com</div>
                </div>
                <div className="p-3 bg-black border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 text-[10px]">DIRECT TELEPHONE LINE:</div>
                  <div className="text-emerald-400 font-bold text-sm select-all">+91 93423 46217</div>
                </div>
                <div className="p-3 bg-black border border-neutral-800 space-y-1">
                  <div className="text-neutral-400 text-[10px]">CURRENT NODE LOCATION:</div>
                  <div className="text-white font-bold">Vellore Institute of Technology (VIT), Tamil Nadu, India</div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Cyberpunk Sharp Telemetry Footer */}
        <footer className="mt-8 border-t border-orange-500/30 bg-black py-4 px-4 font-mono text-xs text-neutral-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 inline-block" />
              <div>
                <div className="font-orbitron font-bold text-white text-xs">
                  HARIHARA SUBRAMANIAN V
                </div>
                <div className="text-[10px] text-orange-400">
                  VIT Vellore (B.Tech IT) & IIT Madras (BS Data Science)
                </div>
              </div>
            </div>

            {/* Quick Layer Switcher Pills in Footer */}
            <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
              <button
                onClick={() => setActiveLayer('overview')}
                className={`px-2 py-0.5 border ${activeLayer === 'overview' ? 'bg-orange-500 text-black border-orange-400 font-bold' : 'border-neutral-800 text-neutral-400 hover:text-white'}`}
              >
                01_OVERVIEW
              </button>
              <button
                onClick={() => setActiveLayer('projects')}
                className={`px-2 py-0.5 border ${activeLayer === 'projects' ? 'bg-orange-500 text-black border-orange-400 font-bold' : 'border-neutral-800 text-neutral-400 hover:text-white'}`}
              >
                02_MISSIONS
              </button>
              <button
                onClick={() => setActiveLayer('capabilities')}
                className={`px-2 py-0.5 border ${activeLayer === 'capabilities' ? 'bg-orange-500 text-black border-orange-400 font-bold' : 'border-neutral-800 text-neutral-400 hover:text-white'}`}
              >
                03_CAPABILITIES
              </button>
              <button
                onClick={() => setActiveLayer('achievements')}
                className={`px-2 py-0.5 border ${activeLayer === 'achievements' ? 'bg-orange-500 text-black border-orange-400 font-bold' : 'border-neutral-800 text-neutral-400 hover:text-white'}`}
              >
                04_HONORS
              </button>
              <button
                onClick={() => setActiveLayer('terminal')}
                className={`px-2 py-0.5 border ${activeLayer === 'terminal' ? 'bg-orange-500 text-black border-orange-400 font-bold' : 'border-neutral-800 text-neutral-400 hover:text-white'}`}
              >
                05_CLI
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCommsOpen(true)}
                className="px-2.5 py-1 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-400 text-[11px] font-bold font-orbitron"
              >
                COMMS
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Persistent Side Comms Link Drawer */}
      <SlideOverCommsDrawer
        isOpen={isCommsOpen}
        onClose={() => setIsCommsOpen(false)}
        onOpen={() => setIsCommsOpen(true)}
      />

      {/* CV Dossier Modal (View freely, PIN on download) */}
      <ResumeDossierModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Wireless WiFi & Bluetooth Device Scanner Modal */}
      <WirelessDeviceScanner
        isOpen={isRfScannerOpen}
        onClose={() => setIsRfScannerOpen(false)}
      />

      {/* Cyber Star Shooter Arcade Game */}
      <CyberStarShooter
        isOpen={isStarShooterOpen}
        onClose={() => setIsStarShooterOpen(false)}
      />
    </div>
  );
}

export default App;
