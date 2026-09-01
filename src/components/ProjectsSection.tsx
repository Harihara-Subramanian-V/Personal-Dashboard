import React, { useState } from 'react';
import { Layers, ExternalLink, Play } from 'lucide-react';
import { GithubIcon } from './CyberIcons';
import type { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/profileData';
import { CyberModal } from './CyberModal';
import { ImageAugmentationSimulator } from './simulators/ImageAugmentationSimulator';
import { FlightReservationSimulator } from './simulators/FlightReservationSimulator';
import { CtfChallengeSimulator } from './simulators/CtfChallengeSimulator';

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
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    setActiveModalProject(null);
    if (onClearSelectedProject) onClearSelectedProject();
  };

  return (
    <section id="projects" className="py-4 sm:py-6 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-3">
          <div>
            <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> [SECTION 02] // MISSION REPOSITORIES & LABS
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-3xl text-white mt-0.5">
              ENGINEERING PROJECTS
            </h2>
          </div>

          {/* Category Filter Chips (Sharp Brutalist) */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 font-mono text-xs pb-1 sm:pb-0">
            {[
              { id: 'ALL', label: 'ALL MISSIONS' },
              { id: 'AI_ML_CV', label: 'AI & VISION' },
              { id: 'ROBOTICS_IOT', label: 'ROBOTICS & IOT' },
              { id: 'CYBERSEC', label: 'CYBER DEFENSE' },
              { id: 'SYSTEMS_CLI', label: 'SYSTEM ARCH' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as ProjectCategory)}
                className={`px-3 py-1.5 transition-all uppercase shrink-0 text-[11px] sm:text-xs font-bold border ${
                  filter === cat.id
                    ? 'bg-orange-500 text-black border-orange-400'
                    : 'bg-black border-neutral-800 text-neutral-400 hover:text-white hover:border-orange-500/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid (Sharp Brutalist with 1.0s gap between consecutive tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              style={{ animation: `slowFlowFadeUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${idx * 1.0 + 0.6}s both` }}
              className="cyber-card p-4 flex flex-col justify-between group hover:border-orange-500/80 transition-all space-y-3"
            >
              <div className="space-y-2">
                {/* Header Tag */}
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 bg-orange-500/15 border border-orange-500/40 text-orange-400 font-bold text-[10px]">
                    {project.codename}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-orbitron font-bold text-base text-white group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
                    // Category: <span className="text-orange-400 font-semibold">{project.categoryLabel}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1 pt-1 font-mono text-[10px]">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 bg-black border border-neutral-800 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-neutral-900 flex items-center justify-between gap-2 font-mono text-xs">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 font-bold"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>

                {/* Live Demo or Simulator Trigger */}
                <div className="flex items-center gap-1.5">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-orbitron text-[11px] transition-all flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>LIVE</span>
                    </a>
                  )}

                  {project.simulatorType && (
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron text-[11px] transition-all flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>DEMO</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulator Modal */}
      {activeModalProject && (
        <CyberModal
          isOpen={!!activeModalProject}
          onClose={handleCloseModal}
          title={activeModalProject.title}
          subtitle={`SIMULATOR // ${activeModalProject.codename}`}
          clearance="TACTICAL LAB"
        >
          <div className="space-y-4">
            {activeModalProject.simulatorType === 'augmentation' && <ImageAugmentationSimulator />}
            {activeModalProject.simulatorType === 'flight-cli' && <FlightReservationSimulator />}
            {activeModalProject.simulatorType === 'ctf-lab' && <CtfChallengeSimulator />}

            <div className="p-3 bg-black border border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">{activeModalProject.githubUrl}</span>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 bg-orange-500 text-black font-bold font-orbitron text-xs flex items-center gap-1"
              >
                <span>OPEN REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </CyberModal>
      )}
    </section>
  );
};
