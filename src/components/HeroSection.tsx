import React from 'react';
import { ArrowRight, FileText, Mail, Download, GraduationCap, MapPin, Cpu, Award, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_INFO, HARDWARE_INVENTORY } from '../data/profileData';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
  onDownloadVCard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResumeModal,
  onDownloadVCard,
}) => {
  const primaryHw = HARDWARE_INVENTORY[0]; // ESP32-S3

  return (
    <section id="about" className="pt-24 pb-12 sm:pt-32 sm:pb-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* Left Column (7 cols): Main Identity, Bio, Degrees, CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Availability Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Robotics Kinematics • Embedded IoT • Computer Vision</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white font-display">
              {PROFILE_INFO.name}
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-medium leading-relaxed">
              {PROFILE_INFO.title}
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{PROFILE_INFO.location}</span>
            </div>
          </div>

          {/* Bio Narrative */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {PROFILE_INFO.about}
          </p>

          {/* Dual Degree Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {PROFILE_INFO.degrees.map((deg, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-1"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span className="truncate">{deg.degree}</span>
                </div>
                <div className="text-xs font-medium text-zinc-200">{deg.institution}</div>
                <div className="text-[11px] text-zinc-400 font-mono">{deg.metric}</div>
              </div>
            ))}
          </div>

          {/* Primary Action Buttons */}
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

            <div className="flex items-center gap-1.5 pl-1">
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
                title="Send Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Bento Dossier & Active Telemetry Dashboard */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Bento Card 1: Key Metrics & Benchmark Strip */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                <Award className="w-4 h-4" />
                <span>Academic & Competition Metrics</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">VERIFIED</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-0.5">
                <div className="text-2xl font-bold text-white font-mono">9.04</div>
                <div className="text-xs text-zinc-400 font-medium">B.Tech CGPA (VIT Vellore)</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-0.5">
                <div className="text-2xl font-bold text-amber-400 font-mono">1st Place</div>
                <div className="text-xs text-zinc-400 font-medium">Echo Prometheus (IIT-M)</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-0.5">
                <div className="text-2xl font-bold text-emerald-400 font-mono">Semi-Final</div>
                <div className="text-xs text-zinc-400 font-medium">Robo Soccer (IIT-M)</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-0.5">
                <div className="text-2xl font-bold text-purple-400 font-mono">4 Papers</div>
                <div className="text-xs text-zinc-400 font-medium">Active Research Works</div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Embedded Platform & Active Kinematics Snapshot */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <Cpu className="w-4 h-4" />
                <span>Primary Architecture Platform</span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white font-sans flex items-center justify-between">
                <span>{primaryHw.name}</span>
                <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700">
                  {primaryHw.clockSpeed}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                {primaryHw.architecture}
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Closed-loop PID velocity tuning & station-point holding</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>MPU6050 complementary filter orientation tracking</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Low-latency ESP-NOW wireless telemetry</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
              {primaryHw.protocols.map((p) => (
                <span
                  key={p}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
