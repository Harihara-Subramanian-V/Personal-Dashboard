import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  RotateCw,
  Contact,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { PROFILE_INFO } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

export const CyberVCardFlip: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    cyberAudio.playClick();
    setIsFlipped((prev) => !prev);
  };

  const handleDownloadVCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playAccessGranted();

    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:V;Harihara;Subramanian;;',
      'FN:Harihara Subramanian V',
      'ORG:VIT Vellore & IIT Madras (Dual Degree)',
      'TITLE:Autonomous Robotics & Embedded IoT Engineer • AI/ML & Data Science',
      `TEL;TYPE=CELL,VOICE,PREF:${PROFILE_INFO.phone || '+91' + PROFILE_INFO.email}`,
      `EMAIL;TYPE=INTERNET,PREF:${PROFILE_INFO.email}`,
      `URL:${PROFILE_INFO.github}`,
      `URL;TYPE=LinkedIn:${PROFILE_INFO.linkedin}`,
      'ADR;TYPE=WORK:;;Vellore Institute of Technology;Vellore;Tamil Nadu;;India',
      'NOTE:Dual Degree: B.Tech IT (VIT Vellore) & BS Data Science (IIT Madras) | 1st Place Echo Prometheus (IIT Madras) | Semi-Finalist Robo Soccer (IIT Madras) | NPTEL Ethical Hacking',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Harihara_Subramanian_V_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyPayload = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberAudio.playClick();

    const textPayload = `OPERATOR IDENTITY DOSSIER:
Name: ${PROFILE_INFO.name}
Phone: ${PROFILE_INFO.phone || 'Available on request'}
Email: ${PROFILE_INFO.email}
Education: B.Tech IT (VIT Vellore) • BS Data Science (IIT Madras)
GitHub: ${PROFILE_INFO.github}
LinkedIn: ${PROFILE_INFO.linkedin}
Specializations: Autonomous Robotics, Embedded IoT (ESP32), Computer Vision & Ethical Hacking`;

    navigator.clipboard.writeText(textPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-2xl [perspective:1200px] select-none my-1">
      <div
        onClick={() => handleFlip()}
        className={`relative w-full h-[155px] sm:h-[140px] transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer rounded-lg ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ================= FRONT FACE: HOLOGRAPHIC OPERATOR ID BADGE ================= */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-r from-neutral-950 via-neutral-900 to-black border border-orange-500/40 rounded-lg p-3.5 sm:p-4 flex flex-col justify-between shadow-xl shadow-orange-500/10 hover:border-orange-400 hover:shadow-orange-500/20 transition-colors">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="font-orbitron font-black text-xs sm:text-sm text-white tracking-wider">
                  HARIHARA <span className="text-orange-400">SUBRAMANIAN V</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] font-bold">
                  VERIFIED vCARD
                </span>
              </div>
              <div className="text-[11px] font-mono text-neutral-300">
                VIT Vellore (B.Tech IT) • <span className="text-amber-400 font-semibold">IIT Madras (BS Data Science)</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-mono bg-black/60 px-2 py-1 rounded border border-neutral-800">
              <Contact className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">DIGITAL IDENTITY</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between border-t border-neutral-800/80 pt-2 font-mono text-[11px] gap-2">
            <div className="flex flex-wrap items-center gap-3 text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-neutral-200 font-semibold">{PROFILE_INFO.email}</span>
              </div>
              {PROFILE_INFO.phone && (
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{PROFILE_INFO.phone}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[10px] sm:text-[11px]">
              <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
              <span>CLICK TO FLIP CARD</span>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE: 1-CLICK VCARD EXPORT & COPY ================= */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-r from-black via-neutral-900 to-neutral-950 border border-emerald-500/50 rounded-lg p-3.5 sm:p-4 flex flex-col justify-between shadow-xl shadow-emerald-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-orbitron font-bold text-xs sm:text-sm text-white">
                CONTACT vCARD EXPORT ENGINE
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              RFC 6350 COMPLIANT
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Download .vcf Button */}
            <button
              onClick={handleDownloadVCard}
              className="flex-1 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-orbitron font-bold rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95"
              title="Download RFC vCard contact file (.vcf) for iPhone / Android / Outlook"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD .VCF</span>
            </button>

            {/* Copy Full Payload */}
            <button
              onClick={handleCopyPayload}
              className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-orange-400 hover:text-white border border-orange-500/40 rounded text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95"
              title="Copy complete contact text payload to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'COPY INFO'}</span>
            </button>

            {/* Flip Back Button */}
            <button
              onClick={(e) => handleFlip(e)}
              className="py-2 px-2.5 bg-black/60 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white rounded text-xs font-mono transition-colors"
              title="Flip back to front"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-1.5">
            <span>Direct Sync: iPhone Contacts • Google Contacts • Outlook</span>
            <span className="text-emerald-400 font-bold">CLICK TO FLIP BACK ↺</span>
          </div>
        </div>
      </div>
    </div>
  );
};
