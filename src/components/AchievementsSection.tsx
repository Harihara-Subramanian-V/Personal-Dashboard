import React from 'react';
import { Building2 } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/profileData';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-16 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
            Recognition & Leadership
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Honors, Competitions & Affiliations
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            Competitive hackathon championships, collegiate robotics tournaments, certifications, and technical clubs.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md font-semibold ${
                      ach.badgeType === 'gold'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : ach.badgeType === 'silver'
                        ? 'bg-slate-300/15 text-slate-200 border border-slate-300/30'
                        : ach.badgeType === 'emerald'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                    }`}
                  >
                    {ach.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{ach.date}</span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white leading-snug">
                    {ach.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{ach.organization}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Tags */}
              <div className="pt-2 border-t border-zinc-800/60 flex flex-wrap gap-1.5">
                {ach.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/60 text-zinc-400 border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
