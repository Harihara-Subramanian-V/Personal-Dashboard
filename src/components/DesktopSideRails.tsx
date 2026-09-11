import React, { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { Mail, Download, ArrowUp, Clock, MapPin } from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';

interface DesktopSideRailsProps {
  onDownloadVCard: () => void;
}

export const DesktopSideRails: React.FC<DesktopSideRailsProps> = ({ onDownloadVCard }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'research', 'hardware-skills', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About & Overview', num: '01' },
    { id: 'projects', label: 'Projects & Repos', num: '02' },
    { id: 'research', label: 'Research Papers', num: '03' },
    { id: 'hardware-skills', label: 'Hardware & Skills', num: '04' },
    { id: 'achievements', label: 'Honors & Timeline', num: '05' },
    { id: 'contact', label: 'Get in Touch', num: '06' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Left Desktop Side Rail (Visible only on 2xl / wide laptop screens > 1400px) */}
      <aside className="hidden 2xl:flex fixed left-6 3xl:left-10 top-32 bottom-12 w-48 flex-col justify-between z-30 pointer-events-auto select-none font-mono text-xs">
        {/* Section Spy Indicator */}
        <div className="space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-800/80 pb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Table of Contents</span>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group flex items-center gap-2 py-1 transition-all ${
                    isActive
                      ? 'text-amber-300 font-semibold translate-x-1'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded transition-colors ${
                      isActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                    }`}
                  >
                    {item.num}
                  </span>
                  <span className="text-xs truncate tracking-tight">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Live Local Telemetry */}
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>IST (UTC+5:30)</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-sm font-bold text-white font-mono tracking-wider">
            {timeStr || '12:00:00'}
          </div>
          <div className="text-[10px] text-zinc-400 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Vellore / Chennai</span>
          </div>
        </div>
      </aside>

      {/* Right Desktop Side Rail (Visible only on 2xl / wide laptop screens > 1400px) */}
      <aside className="hidden 2xl:flex fixed right-6 3xl:right-10 top-32 bottom-12 w-44 flex-col justify-between items-end z-30 pointer-events-auto select-none font-mono text-xs">
        {/* Quick Identity Badge */}
        <div className="w-full p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2 text-left">
          <div className="text-[10px] uppercase font-bold text-zinc-400 border-b border-zinc-800/80 pb-1.5">
            Dual Degree
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="text-zinc-200 font-semibold">VIT Vellore</div>
            <div className="text-amber-400/90 text-[10px]">CGPA: 9.04 / 10.0</div>
            <div className="text-zinc-200 font-semibold pt-1">IIT Madras</div>
            <div className="text-zinc-400 text-[10px]">BS Data Science</div>
          </div>
        </div>

        {/* Action Buttons & Socials */}
        <div className="w-full space-y-2.5 text-right">
          <button
            onClick={onDownloadVCard}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-zinc-800 hover:border-emerald-500/40 text-xs font-medium transition-colors cursor-pointer"
            title="Download vCard contact file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save vCard</span>
          </button>

          <div className="flex items-center justify-center gap-2 p-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-zinc-500 hover:text-zinc-300 text-[11px] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </aside>
    </>
  );
};
