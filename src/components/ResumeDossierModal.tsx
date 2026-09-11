import React, { useState } from 'react';
import { Download, GraduationCap, Award, BookOpen, Code, X, Check } from 'lucide-react';
import { PROFILE_INFO, PROJECTS_DATA, RESEARCH_PAPERS, ACHIEVEMENTS_DATA, SKILL_CATEGORIES } from '../data/profileData';

interface ResumeDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDossierModal: React.FC<ResumeDossierModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTextResume = () => {
    const textResume = `================================================================================
CURRICULUM VITAE — HARIHARA SUBRAMANIAN V
Autonomous Robotics & Embedded Systems Engineer • AI/ML & Computer Vision
================================================================================

CONTACT INFORMATION:
- Name: ${PROFILE_INFO.name}
- Email: ${PROFILE_INFO.email}
- Phone: ${PROFILE_INFO.phone}
- Location: ${PROFILE_INFO.location}
- GitHub: ${PROFILE_INFO.github}
- LinkedIn: ${PROFILE_INFO.linkedin}

EDUCATION & CREDENTIALS:
1. Vellore Institute of Technology (VIT Vellore)
   - Degree: B.Tech in Information Technology (2022 – 2026)
   - Academic CGPA: 9.04 / 10.0

2. Indian Institute of Technology (IIT) Madras
   - Degree: BS in Data Science & Applications (Dual Degree)
   - Specialization: Machine Learning & Computational Statistics

HONORS & ACHIEVEMENTS:
- 1st Place Winner – Echo Prometheus (IIT Madras, 2024)
- Semi-Finalist – Robo Soccer Championship (IIT Madras, 2024)
- Finalist – Vortex 2.0 Hackathon (IEEE SSN Chennai, 2024)
- Ethical Hacking Certification (NPTEL / SWAYAM, IIT Kharagpur)
- Robotics Contributor – roboVITics Club (VIT Vellore)
- Cybersecurity Defender – White Hats Club (VIT Vellore)

RESEARCH PAPERS (4 ACTIVE PAPERS):
${RESEARCH_PAPERS.map((r, i) => `[${i + 1}] ${r.title}
    Domain: ${r.domain}
    Status: ${r.status} | Role: ${r.leadRole}
    Focus: ${r.focusAreas.join(', ')}`).join('\n\n')}

FEATURED PROJECTS:
${PROJECTS_DATA.map((p, i) => `[${i + 1}] ${p.title}
    Category: ${p.categoryLabel}
    Tech Stack: ${p.techStack.join(', ')}
    GitHub: ${p.githubUrl}
    Summary: ${p.description}`).join('\n\n')}

SKILLS & TECHNICAL PROFICIENCIES:
${SKILL_CATEGORIES.map((c) => `- ${c.title}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}

================================================================================
Generated from Harihara Subramanian V's Engineering Portfolio
================================================================================`;

    const blob = new Blob([textResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Harihara_Subramanian_V_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-[#121216] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              CV
            </span>
            <div>
              <h2 className="text-base font-bold text-white">
                Curriculum Vitae
              </h2>
              <p className="text-xs text-zinc-400">
                {PROFILE_INFO.name} • Dual Degree (VIT Vellore & IIT Madras)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTextResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-medium transition-colors cursor-pointer"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Downloaded' : 'Download CV'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Clean ATS Resume Preview */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-sans bg-[#0c0c0f]">
          
          {/* Header Info */}
          <div className="border-b border-zinc-800 pb-5 space-y-2">
            <h1 className="text-2xl font-bold text-white font-display tracking-tight">
              {PROFILE_INFO.name}
            </h1>
            <p className="text-zinc-300 font-medium text-xs sm:text-sm">
              {PROFILE_INFO.title}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400 font-mono pt-1">
              <span>{PROFILE_INFO.email}</span>
              <span>•</span>
              <span>{PROFILE_INFO.phone}</span>
              <span>•</span>
              <span>{PROFILE_INFO.location}</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="space-y-2.5">
              {PROFILE_INFO.degrees.map((deg, i) => (
                <div key={i} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-0.5">
                  <div className="flex items-center justify-between text-zinc-200 font-semibold text-xs sm:text-sm">
                    <span>{deg.degree}</span>
                    <span className="text-zinc-400 font-mono text-xs">{deg.year}</span>
                  </div>
                  <div className="text-zinc-400 text-xs">{deg.institution}</div>
                  <div className="text-amber-400/90 font-mono text-xs pt-0.5">{deg.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Hackathons */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Honors & Key Achievements</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACHIEVEMENTS_DATA.map((ach) => (
                <div key={ach.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="font-semibold text-zinc-200 text-xs">{ach.title}</div>
                  <div className="text-zinc-400 text-[11px]">{ach.organization} ({ach.date})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Publications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Active Research Papers</span>
            </h2>
            <div className="space-y-2">
              {RESEARCH_PAPERS.map((paper) => (
                <div key={paper.id} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-zinc-200 text-xs">{paper.title}</span>
                    <span className="text-[10px] font-mono text-amber-400 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                      {paper.status}
                    </span>
                  </div>
                  <div className="text-zinc-400 text-xs">{paper.domain} • {paper.leadRole}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Featured Engineering Projects</span>
            </h2>
            <div className="space-y-2.5">
              {PROJECTS_DATA.map((project) => (
                <div key={project.id} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-100 text-xs sm:text-sm">{project.title}</span>
                    <span className="text-zinc-400 text-xs font-mono">{project.year}</span>
                  </div>
                  <p className="text-xs text-zinc-300">{project.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Technical Skills</span>
            </h2>
            <div className="space-y-2">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="text-xs text-zinc-300">
                  <span className="font-semibold text-zinc-100">{cat.title}:</span>{' '}
                  <span className="text-zinc-400">{cat.skills.map((s) => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <span>Harihara Subramanian V • Portfolio</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
