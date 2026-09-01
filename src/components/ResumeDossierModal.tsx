import React, { useState } from 'react';
import { Lock, Download, Award, GraduationCap, Code, ShieldCheck, AlertTriangle, Printer, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CyberModal } from './CyberModal';
import { PROFILE_INFO, PROJECTS_DATA, RESEARCH_PAPERS, ACHIEVEMENTS_DATA } from '../data/profileData';

interface ResumeDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDossierModal: React.FC<ResumeDossierModalProps> = ({ isOpen, onClose }) => {
  const [showPinGate, setShowPinGate] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [shakeError, setShakeError] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Accepted PINs: 6217 (phone suffix) or 2911
  const isPinValid = (code: string) => code === '6217' || code === '2911';

  const handleDigitPress = (digit: string) => {
    if (pinInput.length >= 4) return;
    const nextPin = pinInput + digit;
    setPinInput(nextPin);
    setErrorMsg('');

    if (nextPin.length === 4) {
      validatePin(nextPin);
    }
  };

  const handleDelete = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    setPinInput('');
    setErrorMsg('');
  };

  const validatePin = (code: string) => {
    if (isPinValid(code)) {
      setShowPinGate(false);
      setPinInput('');
      setErrorMsg('');
      triggerDownload();
    } else {
      setErrorMsg('[ACCESS DENIED] Invalid 4-Digit Security PIN');
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      setPinInput('');
    }
  };

  const triggerDownload = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#ff6b00', '#ffa726', '#ffffff'],
      });
    } catch {}

    const textResume = `================================================================================
CURRICULUM VITAE // HARIHARA SUBRAMANIAN V
Autonomous Robotics, Embedded IoT Hardware & Computer Vision Engineer
================================================================================

CONTACT INFORMATION:
- Full Name: ${PROFILE_INFO.name}
- Email: ${PROFILE_INFO.email}
- Phone: ${PROFILE_INFO.phone || '+91 93423 46217'}
- GitHub: ${PROFILE_INFO.github}
- LinkedIn: ${PROFILE_INFO.linkedin}
- Location: Vellore, Tamil Nadu, India

ACADEMIC CREDENTIALS (DUAL DEGREE):
1. Vellore Institute of Technology (VIT Vellore)
   - B.Tech in Information Technology (2022 - 2026)
2. Indian Institute of Technology (IIT Madras)
   - BS in Data Science & Applications (Dual Degree)

PROFESSIONAL CERTIFICATIONS:
- Ethical Hacking (NPTEL / SWAYAM - MHRD & IIT Kharagpur)

KEY COMPETITIVE HONORS:
- 1st Place Winner – Echo Prometheus (IIT Madras)
- Semi-Finalist – Robo Soccer Championship (IIT Madras)
- Finalist Honors – Vortex 2.0 (IEEE SSN Chennai)

ACTIVE COMPUTATIONAL RESEARCH PAPERS (4):
${RESEARCH_PAPERS.map((r, i) => `[${i + 1}] ${r.title}\n    Domain: ${r.domain} | Status: ${r.status} | Role: ${r.leadRole}`).join('\n')}

VERIFIED ENGINEERING REPOSITORIES:
${PROJECTS_DATA.map((p, i) => `[${i + 1}] ${p.title} (${p.codename})\n    Category: ${p.categoryLabel} | Tech: ${p.techStack.join(', ')}\n    URL: ${p.githubUrl}`).join('\n')}

================================================================================
Generated via Harihara Subramanian V Cyber Command Dashboard
RFC Compliant Security Dossier
================================================================================`;

    const blob = new Blob([textResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Harihara_Subramanian_V_Resume_Dossier.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleRequestDownload = () => {
    setShowPinGate(true);
    setPinInput('');
    setErrorMsg('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <CyberModal
      isOpen={isOpen}
      onClose={onClose}
      title="OPERATOR DOSSIER // CURRICULUM VITAE"
      subtitle="Harihara Subramanian V • Dual Degree VIT Vellore & IIT Madras"
      clearance="CLEARANCE: DEFCON 1 // CV VIEWABLE"
    >
      <div className="space-y-4 font-mono text-xs text-neutral-300">
        {/* Top Summary Banner with Actions */}
        <div className="bg-black p-3.5 border border-orange-500/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 inline-block" />
              <h4 className="font-orbitron font-black text-sm text-white">
                {PROFILE_INFO.name}
              </h4>
            </div>
            <div className="text-[11px] text-orange-400 font-bold mt-0.5">
              VIT Vellore (B.Tech IT) • IIT Madras (BS Data Science)
            </div>
            <div className="text-[10px] text-neutral-400">
              Email: {PROFILE_INFO.email} • Phone: {PROFILE_INFO.phone || '+91 93423 46217'}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleRequestDownload}
              className="flex-1 sm:flex-initial px-3 py-2 bg-orange-500 hover:bg-orange-400 text-black font-orbitron font-bold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
              title="Download official text CV (PIN verification required)"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'DOWNLOADED' : 'DOWNLOAD CV (PIN)'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 text-neutral-300 hover:text-white text-xs font-mono transition-all flex items-center gap-1.5"
              title="Print CV Dossier"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT</span>
            </button>
          </div>
        </div>

        {/* PIN Security Keypad Overlay (Appears ONLY when user clicks download) */}
        {showPinGate && (
          <div className="p-4 bg-black border-2 border-orange-500 animate-in fade-in space-y-3">
            <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-orange-400" />
                <span className="font-orbitron font-bold text-white text-xs">
                  AUTHENTICATE TO DOWNLOAD OFFICIAL DOSSIER
                </span>
              </div>
              <button
                onClick={() => setShowPinGate(false)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-neutral-400 text-center">
              Enter 4-digit verification PIN to authorize export file download:
            </p>

            {/* PIN Display Dots */}
            <div className={`flex justify-center gap-3 py-1 ${shakeError ? 'animate-bounce' : ''}`}>
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-9 h-11 border-2 flex items-center justify-center text-lg font-bold font-orbitron ${
                    pinInput.length > idx
                      ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                      : 'border-neutral-800 bg-black text-neutral-600'
                  }`}
                >
                  {pinInput.length > idx ? '●' : '—'}
                </div>
              ))}
            </div>

            {errorMsg && (
              <div className="p-2 bg-red-950/80 border border-red-500 text-red-400 font-bold text-xs flex items-center justify-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> {errorMsg}
              </div>
            )}

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigitPress(digit)}
                  className="py-2.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 text-sm font-orbitron font-bold text-white transition-all active:scale-95"
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="py-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-neutral-400 hover:text-white"
              >
                CLR
              </button>
              <button
                onClick={() => handleDigitPress('0')}
                className="py-2.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 text-sm font-orbitron font-bold text-white transition-all active:scale-95"
              >
                0
              </button>
              <button
                onClick={handleDelete}
                className="py-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-orange-400"
              >
                DEL
              </button>
            </div>
          </div>
        )}

        {/* 1. Academic Credentials */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase text-xs">
            <GraduationCap className="w-4 h-4" />
            <span>1. ACADEMIC CREDENTIALS (DUAL DEGREE)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-black border border-neutral-800 space-y-1">
              <div className="font-bold text-white text-xs">VELLORE INSTITUTE OF TECHNOLOGY (VIT VELLORE)</div>
              <div className="text-orange-400 text-[11px]">B.Tech in Information Technology (2022 - 2026)</div>
              <p className="text-[11px] text-neutral-400 pt-1">
                Focus: Embedded Systems, Robotics Kinematics, Computer Networks & AI.
              </p>
            </div>

            <div className="p-3 bg-black border border-amber-500/40 space-y-1">
              <div className="font-bold text-white text-xs">INDIAN INSTITUTE OF TECHNOLOGY (IIT MADRAS)</div>
              <div className="text-amber-400 text-[11px] font-semibold">BS in Data Science & Applications (Dual Degree)</div>
              <p className="text-[11px] text-neutral-400 pt-1">
                Focus: Computational Data Science, Machine Learning Foundations & Analytics.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Key Honors & Hackathons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs">
            <Award className="w-4 h-4" />
            <span>2. COMPETITIVE HONORS & ACHIEVEMENTS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {ACHIEVEMENTS_DATA.slice(0, 6).map((ach) => (
              <div key={ach.id} className="p-2.5 bg-black border border-neutral-800 space-y-1">
                <div className="font-bold text-white text-xs">{ach.title}</div>
                <div className="text-[10px] text-orange-400">{ach.organization} • {ach.badge}</div>
                <p className="text-[10px] text-neutral-400">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Research Publications */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-orange-400 font-bold uppercase text-xs">
            <Code className="w-4 h-4" />
            <span>3. ACTIVE COMPUTATIONAL RESEARCH PAPERS (4)</span>
          </div>

          <div className="space-y-2">
            {RESEARCH_PAPERS.map((paper, i) => (
              <div key={paper.id} className="p-2.5 bg-black border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <div className="text-white font-bold text-xs">[{i + 1}] {paper.title}</div>
                  <div className="text-[10px] text-neutral-400">Domain: {paper.domain} • Status: {paper.status} • Role: {paper.leadRole}</div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/30 shrink-0">
                  {paper.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Core Projects */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>4. KEY ENGINEERING PROJECTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECTS_DATA.slice(0, 6).map((p) => (
              <div key={p.id} className="p-2.5 bg-black border border-neutral-800">
                <div className="font-bold text-white text-xs">{p.title}</div>
                <div className="text-[10px] text-neutral-400">{p.techStack.join(', ')}</div>
                <div className="text-[10px] text-orange-400 truncate">{p.githubUrl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CyberModal>
  );
};
