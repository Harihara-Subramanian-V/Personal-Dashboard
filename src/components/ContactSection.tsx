import React, { useState } from 'react';
import { Mail, Phone, Download, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROFILE_INFO } from '../data/profileData';

interface ContactSectionProps {
  onDownloadVCard: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onDownloadVCard }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
      subject || 'Engineering Inquiry / Collaboration'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-16 border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            Communication
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display">
            Get In Touch
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            Available for robotics engineering roles, computer vision projects, research collaborations, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <div className="text-xs font-mono text-zinc-400 uppercase">Email Address</div>
              <div className="text-sm font-medium text-white truncate">{PROFILE_INFO.email}</div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={`mailto:${PROFILE_INFO.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
              <div className="text-xs font-mono text-zinc-400 uppercase">Phone & WhatsApp</div>
              <div className="text-sm font-medium text-white font-mono">{PROFILE_INFO.phone}</div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyPhone}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors cursor-pointer"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={`tel:${PROFILE_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            {/* vCard 1-Click Sync Card */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase font-semibold">1-Click Contact Card</div>
              <p className="text-xs text-zinc-300">
                Download RFC-6350 compliant `.vcf` file to instantly save contact details on iOS, Android, or Outlook.
              </p>
              <button
                onClick={onDownloadVCard}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download vCard (.vcf)</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-medium transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Clean Quick Message Form */}
          <div className="md:col-span-7 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4">
            <h3 className="text-base font-bold text-white font-sans">
              Send a Direct Message
            </h3>
            <p className="text-xs text-zinc-400">
              Fill out this quick form to generate a formatted email directly to <span className="text-zinc-200 font-mono">{PROFILE_INFO.email}</span>.
            </p>

            <form onSubmit={handleSendEmail} className="space-y-3.5 pt-1">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Robotics Collaboration / Research Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Harihara, I came across your portfolio and wanted to discuss..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open Mail Client</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
