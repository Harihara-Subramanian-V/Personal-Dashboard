import React, { useState, useMemo } from 'react';
import { ExternalLink, CheckCircle2, Play } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { PROJECTS_DATA } from '../data/profileData';
import type { ProjectCategory, Project } from '../types';

interface ProjectsSectionProps {
  onOpenAugmentationModal?: () => void;
  onOpenProjectModal?: (projectId: string) => void;
}

const CATEGORY_TABS: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'ALL' },
  { label: 'Computer Vision & AI', value: 'AI_ML_CV' },
  { label: 'Robotics & Embedded', value: 'ROBOTICS_IOT' },
  { label: 'Cyber Security', value: 'CYBERSEC' },
  { label: 'Systems & Software', value: 'SYSTEMS_CLI' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenAugmentationModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return PROJECTS_DATA;
    return PROJECTS_DATA.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-16 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
              Featured Work
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
              Projects & Engineering Repositories
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Robotics kinematics firmware, computer vision transformation pipelines, sensor fusion algorithms, and security tooling.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === tab.value
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 hover:bg-zinc-900/80 flex flex-col justify-between space-y-5"
            >
              {/* Card Top */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                    {project.categoryLabel}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{project.year}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Highlights */}
                {project.keyHighlights && (
                  <div className="space-y-1.5 pt-1">
                    {project.keyHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/80 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Bottom: Tech Stack & Actions */}
              <div className="space-y-4 pt-4 border-t border-zinc-800/60">
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950/60 text-zinc-400 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 ml-0.5" />
                  </a>

                  {project.simulatorType === 'augmentation' && onOpenAugmentationModal && (
                    <button
                      onClick={onOpenAugmentationModal}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-amber-300" />
                      <span>Live Canvas Demo</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
