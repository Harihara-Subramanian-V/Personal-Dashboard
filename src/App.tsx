import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CyberBackground } from './components/CyberBackground';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResearchSection } from './components/ResearchSection';
import { HardwareSkillsSection } from './components/HardwareSkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { ResumeDossierModal } from './components/ResumeDossierModal';
import { CommandPalette } from './components/CommandPalette';
import { ImageAugmentationModal } from './components/ImageAugmentationModal';
import { DesktopSideRails } from './components/DesktopSideRails';
import { GithubIcon, LinkedinIcon } from './components/SocialIcons';
import { PROFILE_INFO } from './data/profileData';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAugmentationModalOpen, setIsAugmentationModalOpen] = useState(false);

  // Global hotkey: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // RFC-6350 Compliant vCard Generator
  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:V;Harihara Subramanian;;;
FN:Harihara Subramanian V
ORG:VIT Vellore & IIT Madras
TITLE:Autonomous Robotics & Embedded Systems Engineer
TEL;TYPE=CELL,VOICE:${PROFILE_INFO.phone}
EMAIL;TYPE=PREF,INTERNET:${PROFILE_INFO.email}
URL:${PROFILE_INFO.github}
URL;TYPE=LinkedIn:${PROFILE_INFO.linkedin}
ADR;TYPE=WORK:;;VIT Vellore / Chennai;Tamil Nadu;;India
NOTE:Autonomous Robotics, Embedded IoT (ESP32-S3, STM32, AVR), Computer Vision Pipelines, and AI/ML.
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Harihara_Subramanian_V.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] relative font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Ambient Grid & Architectural Guidelines Background */}
      <CyberBackground />

      {/* Fixed Sticky Glass Navbar */}
      <Navbar
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Desktop Floating Side Rails (Active on wide laptop & desktop screens) */}
      <DesktopSideRails onDownloadVCard={handleDownloadVCard} />

      {/* Main Single-Page Content Container */}
      <main className="relative z-10 max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
        
        {/* About & Hero Section */}
        <HeroSection
          onOpenResumeModal={() => setIsResumeOpen(true)}
          onDownloadVCard={handleDownloadVCard}
        />

        {/* Projects Section */}
        <ProjectsSection
          onOpenAugmentationModal={() => setIsAugmentationModalOpen(true)}
        />

        {/* Research & Publications Section */}
        <ResearchSection />

        {/* Hardware Architecture & Technical Skills Section */}
        <HardwareSkillsSection />

        {/* Achievements & Recognition Section */}
        <AchievementsSection />

        {/* Contact & vCard Section */}
        <ContactSection
          onDownloadVCard={handleDownloadVCard}
        />

      </main>

      {/* Clean Footer */}
      <footer className="relative z-10 border-t border-zinc-800/80 mt-20 py-8 text-xs text-zinc-500 font-sans">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Harihara Subramanian V</span>
            <span>•</span>
            <span>VIT Vellore & IIT Madras</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <ResumeDossierModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
        onOpenProjectModal={() => {
          const el = document.getElementById('projects');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onDownloadVCard={handleDownloadVCard}
      />

      <ImageAugmentationModal
        isOpen={isAugmentationModalOpen}
        onClose={() => setIsAugmentationModalOpen(false)}
      />

    </div>
  );
}
