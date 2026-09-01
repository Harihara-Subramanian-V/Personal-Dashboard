import React, { useState } from 'react';
import { Layers, ExternalLink, Play, Cpu } from 'lucide-react';
import { GithubIcon } from './CyberIcons';
import type { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/profileData';
import { CyberModal } from './CyberModal';
import { ImageAugmentationSimulator } from './simulators/ImageAugmentationSimulator';
import { FlightReservationSimulator } from './simulators/FlightReservationSimulator';
import { CtfChallengeSimulator } from './simulators/CtfChallengeSimulator';
import { cyberAudio } from '../utils/audio';

interface ProjectsSectionProps {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedProjectId,
  onClearSelectedProject,
}) => {
  const [filter, setFilter] = useState<ProjectCategory>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  React.useEffect(() => {
    if (selectedProjectId) {
      const p = PROJECTS_DATA.find((item) => item.id === selectedProjectId);
      if (p) setActiveModalProject(p);
    }
  }, [selectedProjectId]);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  const handleOpenModal = (project: Project) => {
    cyberAudio.playClick();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    setActiveModalProject(null);
    if (onClearSelectedProject) onClearSelectedProject();
  };

  return (
    <section id="projects" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-4">
          <div>
            <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400 animate-pulse" /> [SECTION 02] // MISSION REPOSITORIES & LABS
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white mt-1">
              ENGINEERING PROJECTS
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 font-mono text-xs pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'ALL', label: 'ALL MISSIONS' },
              { id: 'AI_ML_CV', label: 'AI & VISION' },
              { id: 'ROBOTICS_IOT', label: 'ROBOTICS & IOT' },
              { id: 'CYBERSEC', label: 'CYBER DEFENSE' },
              { id: 'SYSTEMS_CLI', label: 'SYSTEM ARCH' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setFilter(cat.id as ProjectCategory);
                }}
                className={`px-3 py-1.5 rounded transition-all uppercase shrink-0 text-[11px] sm:text-xs ${
                  filter === cat.id
                    ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/30'
                    : 'bg-black/50 border border-orange-500/30 text-neutral-400 hover:text-white hover:border-emerald-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="cyber-card rounded-lg p-4 sm:p-5 flex flex-col justify-between group hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 transition-all space-y-3 sm:space-y-4"
            >
              <div className="space-y-2.5 sm:space-y-3">
                {/* Header Tag */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/40 text-orange-400 font-bold text-[10px] sm:text-[11px]">
                    {project.codename}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-orbitron font-bold text-base sm:text-lg text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-0.5">
                    // Category: <span className="text-orange-400 font-semibold">{project.categoryLabel}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-black/60 border border-neutral-800 group-hover:border-emerald-500/30 text-neutral-300 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-neutral-800/80">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="flex-1 py-2 px-3 rounded bg-emerald-500/15 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 text-emerald-400 font-orbitron font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-500/10"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>LAUNCH LAB</span>
                </button>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="py-2 px-2.5 rounded bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/50 text-emerald-400 font-orbitron font-bold text-[11px] transition-colors flex items-center gap-1"
                    title="Open Live Web Deployment"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>LIVE</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2 rounded bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 hover:border-orange-400 text-neutral-300 transition-colors"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Project Simulator Modal */}
      {activeModalProject && (
        <CyberModal
          isOpen={!!activeModalProject}
          onClose={handleCloseModal}
          title={activeModalProject.title}
          subtitle={`CODENAME: ${activeModalProject.codename} // ${activeModalProject.categoryLabel}`}
          clearance={activeModalProject.clearance}
        >
          <div className="space-y-6">
            {/* Lab Highlights Header Banner */}
            <div className="p-3 bg-black/70 rounded border border-emerald-500/30 flex items-center justify-between font-mono text-xs gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ACTIVE LABORATORY PROTOCOL
                </span>
                <div className="text-white font-bold">{activeModalProject.subtitle}</div>
              </div>
              <div className="flex items-center gap-2">
                {activeModalProject.liveDemoUrl && (
                  <a
                    href={activeModalProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-orbitron text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <span>LIVE APP</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="px-3 py-1.5 rounded bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron text-[11px] flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                >
                  <span>OPEN REPO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Interactive Lab Simulators */}
            {(activeModalProject.id === 'image-augmentation' || activeModalProject.id === 'data-augmentation') && (
              <ImageAugmentationSimulator />
            )}
            {activeModalProject.id === 'flight-reservation' && <FlightReservationSimulator />}
            {activeModalProject.id === 'white-hats-ctf' && <CtfChallengeSimulator />}

            {/* Microcontroller Firmware Telemetry Architecture Modal */}
            {activeModalProject.id === 'gyrobot-station' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-black/80 rounded border border-emerald-500/40 space-y-3">
                  <div className="text-emerald-400 font-bold text-sm flex items-center gap-2 border-b border-neutral-800 pb-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>ESP32 FIRMWARE & CLOSED-LOOP KINEMATICS ARCHITECTURE</span>
                  </div>

                  <p className="text-neutral-300 font-sans leading-relaxed text-xs">
                    {activeModalProject.longDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-neutral-950 rounded border border-neutral-800 space-y-1">
                      <div className="text-[10px] text-emerald-400 font-bold">SENSOR FUSION PIPELINE</div>
                      <div className="text-white text-xs">MPU6050 6-DOF I2C Bus @ 400kHz</div>
                      <div className="text-neutral-400 text-[11px]">
                        Complementary Filter: <span className="text-orange-400">θ = α(θ + ω·dt) + (1-α)θ_acc</span> (α = 0.98)
                      </div>
                    </div>

                    <div className="p-3 bg-neutral-950 rounded border border-neutral-800 space-y-1">
                      <div className="text-[10px] text-emerald-400 font-bold">PID CONTROL ACTUATION</div>
                      <div className="text-white text-xs">Discrete Dual-Channel PWM Drive</div>
                      <div className="text-neutral-400 text-[11px]">
                        Tuned Coefficients: <span className="text-emerald-400">Kp=18.5, Ki=0.8, Kd=3.2</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-neutral-950 rounded border border-orange-500/30 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">HARDWARE STATUS: FLASHED & BENCH-TESTED</span>
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-400 hover:text-white font-bold underline flex items-center gap-1"
                    >
                      <span>Inspect Microcontroller C++ Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Key Project Highlights */}
            <div className="space-y-2 font-mono text-xs">
              <div className="text-neutral-400 font-bold text-[11px] uppercase">
                ENGINEERING HIGHLIGHTS & ARCHITECTURE:
              </div>
              <ul className="space-y-1 text-neutral-300">
                {activeModalProject.keyHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CyberModal>
      )}
    </section>
  );
};
