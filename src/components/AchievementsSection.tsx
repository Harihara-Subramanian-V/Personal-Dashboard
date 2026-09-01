import React, { useState } from 'react';
import { Award, Calendar, BookOpen, Trophy } from 'lucide-react';
import { ACHIEVEMENTS_DATA, RESEARCH_PAPERS } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

export const AchievementsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'HACKATHONS' | 'RESEARCH' | 'CLUBS'>('ALL');

  const filteredAchievements = ACHIEVEMENTS_DATA.filter((item) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'HACKATHONS') return item.category === 'HACKATHON';
    if (activeTab === 'CLUBS') return item.category === 'ROBOTICS' || item.category === 'CYBERSEC' || item.category === 'ACADEMIC';
    return true;
  });

  return (
    <section id="achievements" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-orange-500/30 pb-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400 animate-pulse" /> [SECTION 04] // OPERATIONS & ACHIEVEMENTS LOG
            </div>
            <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white mt-1">
              HONORS, HACKATHONS & RESEARCH
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 font-mono text-xs pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'ALL', label: 'ALL OPERATIONS' },
              { id: 'HACKATHONS', label: '🏆 HACKATHON WINS' },
              { id: 'RESEARCH', label: '🔬 RESEARCH PAPERS (4)' },
              { id: 'CLUBS', label: '🛡️ CLUBS & VIT' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  cyberAudio.playClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-3 py-1.5 rounded transition-all uppercase shrink-0 text-[11px] sm:text-xs ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-black font-bold shadow-md shadow-orange-500/30'
                    : 'bg-black/50 border border-orange-500/30 text-neutral-400 hover:text-white hover:border-emerald-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Research Papers Dedicated Grid (shown when ALL or RESEARCH selected) */}
        {(activeTab === 'ALL' || activeTab === 'RESEARCH') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>ACTIVE RESEARCH PAPERS & COMPUTATIONAL PREPRINTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESEARCH_PAPERS.map((paper, idx) => (
                <div
                  key={paper.id}
                  className="cyber-card rounded-lg p-4 space-y-2.5 border-l-4 border-l-emerald-500 group hover:border-emerald-500/70 transition-all"
                >
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      PAPER #{idx + 1} // {paper.status}
                    </span>
                    <span className="text-neutral-400 text-[10px] uppercase font-semibold">
                      {paper.domain}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-orbitron font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                      {paper.title}
                    </h4>
                    <div className="text-[11px] font-mono text-orange-400 mt-0.5">
                      Role: {paper.leadRole}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                    {paper.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-800">
                    {paper.focusAreas.map((f) => (
                      <span
                        key={f}
                        className="px-2 py-0.5 rounded bg-black/60 border border-neutral-800 group-hover:border-emerald-500/30 text-[10px] font-mono text-neutral-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Hackathons, Club Milestones & Honors */}
        {(activeTab === 'ALL' || activeTab !== 'RESEARCH') && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-orange-400 font-bold uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>COMPETITIVE HACKATHONS & CLUB LEADERSHIP</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAchievements.map((ach) => (
                <div
                  key={ach.id}
                  className="cyber-card rounded-lg p-5 flex flex-col justify-between space-y-3 group hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span
                        className={`px-2.5 py-0.5 rounded font-bold text-[10px] uppercase border ${
                          ach.badgeType === 'gold'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                            : ach.badgeType === 'silver'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                        }`}
                      >
                        {ach.badge}
                      </span>

                      <span className="text-neutral-400 flex items-center gap-1 text-[10px]">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        <span>{ach.date}</span>
                      </span>
                    </div>

                    <h3 className="font-orbitron font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                      {ach.title}
                    </h3>

                    <div className="text-xs text-orange-400 font-mono font-semibold">
                      {ach.organization}
                    </div>

                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/80">
                    {ach.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-black/60 border border-neutral-800 text-[10px] font-mono text-neutral-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
