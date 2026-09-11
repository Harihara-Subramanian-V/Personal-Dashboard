import React from 'react';
import { ArrowRight, FileText, Mail, Download, GraduationCap, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_INFO } from '../data/profileData';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onDownloadVCard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResumeModal,
  onDownloadVCard,
}) => {
  return (
    <section id="about" className="pt-24 pb-16 sm:pt-32 sm:pb-20 relative">
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        
        {/* Availability / Focus Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Embedded Systems • Robotics Kinematics • Computer Vision</span>
        </div>

        {/* Main Heading & Identity */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
            {PROFILE_INFO.name}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed max-w-3xl">
            {PROFILE_INFO.title}
          </p>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{PROFILE_INFO.location}</span>
          </div>
        </div>

        {/* Verified Dual-Degree Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {PROFILE_INFO.degrees.map((deg, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-1.5"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>{deg.degree}</span>
              </div>
              <div className="text-sm font-medium text-zinc-200">{deg.institution}</div>
              <div className="text-xs text-zinc-400">{deg.metric}</div>
            </div>
          ))}
        </div>

        {/* Bio Summary */}
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-3xl whitespace-pre-line">
          {PROFILE_INFO.about}
        </p>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-zinc-800/80">
          {PROFILE_INFO.stats.map((stat, i) => (
            <div key={i} className="p-3 text-center sm:text-left space-y-0.5">
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">{stat.value}</div>
              <div className="text-xs text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Primary CTAs & Social Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all shadow-sm hover:shadow cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResumeModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-medium text-sm transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Curriculum Vitae</span>
          </button>

          <button
            onClick={onDownloadVCard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-medium text-sm transition-colors cursor-pointer"
            title="Download contact vCard (.vcf)"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Save Contact (.vcf)</span>
          </button>

          <div className="flex items-center gap-1.5 pl-2">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition-colors"
              title="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
