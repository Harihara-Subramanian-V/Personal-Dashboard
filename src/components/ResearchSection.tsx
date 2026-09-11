import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, UserCheck } from 'lucide-react';
import { RESEARCH_PAPERS } from '../data/profileData';

export const ResearchSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAbstract = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="research" className="py-16 border-t border-zinc-800/80">
      <div className="w-full space-y-8">
        
        {/* Section Header */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider">
            Academic Research
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Active Research & Computational Papers
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Applying computer vision, machine learning heuristics, and mathematical deconvolution to chemical catalysis, spectroscopy, and bio-fuel operations.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {RESEARCH_PAPERS.map((paper) => {
            const isExpanded = expandedId === paper.id;

            return (
              <div
                key={paper.id}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Status & Domain */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {paper.domain}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-400 border border-amber-500/20 font-semibold">
                      {paper.status}
                    </span>
                  </div>

                  {/* Title & Role */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {paper.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                      <UserCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{paper.leadRole}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {paper.description}
                  </p>

                  {/* Abstract Toggle / Content */}
                  {paper.abstract && (
                    <div className="pt-1">
                      <button
                        onClick={() => toggleAbstract(paper.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isExpanded ? 'Hide Abstract' : 'Read Abstract'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans animate-fade-in">
                          <p className="text-zinc-400 font-mono text-[10px] uppercase font-bold mb-1">
                            Abstract Summary:
                          </p>
                          {paper.abstract}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Focus Area Tags */}
                <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap gap-1.5">
                  {paper.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-950/50 text-zinc-400 border border-zinc-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
