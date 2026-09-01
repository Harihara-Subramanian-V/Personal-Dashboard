import { useState, useRef, useEffect } from 'react';
import { HudHeader } from './components/HudHeader';
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
import { CyberCardTransition } from './components/CyberCardTransition';
import { CustomCursor } from './components/CustomCursor';
import { CyberGhostJumpscare } from './components/CyberGhostJumpscare';
import { ChevronUp, Terminal } from 'lucide-react';
import { cyberAudio } from './utils/audio';

export function App() {
  const [showMatrixRain, setShowMatrixRain] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isRfScannerOpen, setIsRfScannerOpen] = useState<boolean>(false);
  const [isStarShooterOpen, setIsStarShooterOpen] = useState<boolean>(false);
  const [isCommsOpen, setIsCommsOpen] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [jumpscareCount, setJumpscareCount] = useState<number>(0);

  const terminalRef = useRef<HTMLDivElement | null>(null);

  // Focus on hero header at top when page opens & play Windows XP startup sound
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    cyberAudio.playWindowsXpStartup();

    // Secret global hotkey: Shift + S or ` (backtick) triggers hidden Star Shooter game
    const handleSecretKey = (e: KeyboardEvent) => {
      if ((e.shiftKey && (e.key === 'S' || e.key === 's')) || e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsStarShooterOpen(true);
        cyberAudio.playAccessGranted();
      }
    };

    window.addEventListener('keydown', handleSecretKey);
    return () => window.removeEventListener('keydown', handleSecretKey);
  }, []);

  const scrollToTerminal = () => {
    cyberAudio.playClick();
    terminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    cyberAudio.playClick();
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenProjectModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    scrollToProjects();
  };

  const handleTriggerJumpscare = () => {
    setJumpscareCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f0f2f5] relative font-rajdhani selection:bg-orange-500 selection:text-black">
      {/* Custom Cyber Reticle Cursor */}
      <CustomCursor />

      {/* Subtle Holographic Ace Cards & Chess Transition Micro-HUD */}
      <CyberCardTransition />

      {/* Cyber Ghost Jumpscare System */}
      <CyberGhostJumpscare manualTriggerCount={jumpscareCount} />

      {/* Dynamic Animated Canvas Background with Matrix Rain by default */}
      <CyberBackground showMatrixRain={showMatrixRain} />

      {/* Main Content Layout Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top HUD Telemetry & Navigation */}
        <HudHeader
          showMatrixRain={showMatrixRain}
          onToggleMatrix={() => setShowMatrixRain((prev) => !prev)}
          onOpenResumeModal={() => setIsResumeOpen(true)}
          onOpenRfScanner={() => setIsRfScannerOpen(true)}
          onOpenComms={() => setIsCommsOpen(true)}
        />

        {/* Main Body Viewports */}
        <main className="flex-1 space-y-12 sm:space-y-16">
          {/* Section 1: Hero Hologram Command */}
          <HeroSection
            onOpenTerminal={scrollToTerminal}
            onExploreProjects={scrollToProjects}
            onOpenRfScanner={() => setIsRfScannerOpen(true)}
          />

          {/* Section 2: Projects & Architecture Labs */}
          <ProjectsSection
            selectedProjectId={selectedProjectId}
            onClearSelectedProject={() => setSelectedProjectId(null)}
          />

          {/* Section 3: Skill & Hardware Defense Matrix */}
          <SkillDefenseMatrix />

          {/* Section 4: Achievements, Research Papers & Honors */}
          <AchievementsSection />

          {/* Section 5: Interactive Root Hacker CLI Terminal */}
          <section id="terminal" ref={terminalRef} className="py-12 sm:py-16">
            <div className="max-w-5xl mx-auto px-4 space-y-4">
              <div className="border-b border-orange-500/30 pb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> [SECTION 05] // ROOT COMMAND LINE ACCESS
                  </div>
                  <h2 className="font-orbitron font-black text-xl sm:text-3xl text-white mt-0.5">
                    INTERACTIVE DEFENSE CONSOLE
                  </h2>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30 hidden sm:inline">
                  SSH PORT: 22 // AES-256
                </span>
              </div>

              <CyberTerminal
                onToggleMatrix={() => setShowMatrixRain((prev) => !prev)}
                onOpenProject={handleOpenProjectModal}
                onTriggerJumpscare={handleTriggerJumpscare}
                onOpenRfScanner={() => setIsRfScannerOpen(true)}
                onOpenStarShooter={() => setIsStarShooterOpen(true)}
                onOpenComms={() => setIsCommsOpen(true)}
              />
            </div>
          </section>
        </main>

        {/* Cyberpunk Telemetry Footer */}
        <footer className="mt-16 border-t border-orange-500/30 bg-black/90 py-8 px-4 font-mono text-xs text-neutral-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <div>
                <div className="font-orbitron font-bold text-white text-sm">
                  HARIHARA SUBRAMANIAN V
                </div>
                <div className="text-[10px] text-orange-400">
                  IT Undergrad @ VIT Vellore • Autonomous Robotics, Embedded IoT & AI/ML
                </div>
              </div>
            </div>

            <div className="text-center sm:text-right text-[11px] text-neutral-500 space-y-1">
              <div>DEFENSE_CORE v3.7 // ALL SYSTEMS OPERATIONAL</div>
              <div>
                © {new Date().getFullYear()} Harihara Subramanian V. All rights reserved.{' '}
                {/* Secret Easter Egg Click Pixel for Star Shooter */}
                <button
                  onClick={() => {
                    setIsStarShooterOpen(true);
                    cyberAudio.playAccessGranted();
                  }}
                  className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500/30 hover:bg-orange-400 hover:shadow-[0_0_8px_#ff8800] transition-all cursor-crosshair ml-1"
                  title="•••"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  cyberAudio.playScanSweep();
                  setIsCommsOpen(true);
                }}
                className="p-2.5 rounded bg-orange-500/10 hover:bg-orange-500 hover:text-black border border-orange-500/40 text-orange-400 transition-all font-orbitron font-bold text-[11px]"
                title="Open Comms Link"
              >
                TRANSMISSION
              </button>

              <button
                onClick={() => {
                  cyberAudio.playClick();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2.5 rounded bg-neutral-900 hover:bg-orange-500 hover:text-black border border-orange-500/30 text-orange-400 transition-all flex items-center gap-1 text-[11px]"
                title="Return to top HUD"
              >
                <ChevronUp className="w-4 h-4" /> TOP
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Persistent Right-Edge Side-Pull Comms Link Drawer */}
      <SlideOverCommsDrawer
        isOpen={isCommsOpen}
        onClose={() => setIsCommsOpen(false)}
        onOpen={() => setIsCommsOpen(true)}
      />

      {/* Curriculum Vitae / Dossier Modal */}
      <ResumeDossierModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Wireless WiFi & Bluetooth Device Scanner Modal */}
      <WirelessDeviceScanner
        isOpen={isRfScannerOpen}
        onClose={() => setIsRfScannerOpen(false)}
      />

      {/* Secret Star Shooter Arcade Game */}
      <CyberStarShooter
        isOpen={isStarShooterOpen}
        onClose={() => setIsStarShooterOpen(false)}
      />
    </div>
  );
}

export default App;
