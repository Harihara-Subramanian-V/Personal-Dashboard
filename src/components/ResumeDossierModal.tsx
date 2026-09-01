import React, { useState } from 'react';
import { Lock, KeyRound, Printer, Award, GraduationCap, Code, ShieldCheck, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CyberModal } from './CyberModal';
import { PROFILE_INFO, PROJECTS_DATA, RESEARCH_PAPERS } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

interface ResumeDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeDossierModal: React.FC<ResumeDossierModalProps> = ({ isOpen, onClose }) => {
  const [pinInput, setPinInput] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [shakeError, setShakeError] = useState<boolean>(false);

  const CORRECT_PIN = '6217';

  const handleDigitPress = (digit: string) => {
    if (pinInput.length >= 4) return;
    const nextPin = pinInput + digit;
    setPinInput(nextPin);
    setErrorMsg('');
    cyberAudio.playKeypadBeep(nextPin.length);

    if (nextPin.length === 4) {
      validatePin(nextPin);
    }
  };

  const handleDelete = () => {
    cyberAudio.playClick();
    setPinInput((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    cyberAudio.playClick();
    setPinInput('');
    setErrorMsg('');
  };

  const validatePin = (code: string) => {
    if (code === CORRECT_PIN) {
      cyberAudio.playAccessGranted();
      setIsUnlocked(true);
      setErrorMsg('');
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#ff6b00', '#ffa726', '#ffffff'],
        });
      } catch {
        // Ignore
      }
    } else {
      cyberAudio.playAlert();
      setErrorMsg('[ACCESS DENIED] Invalid 4-Digit Security PIN');
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      setPinInput('');
    }
  };

  const handlePrint = () => {
    cyberAudio.playClick();
    window.print();
  };

  const handleLockAgain = () => {
    cyberAudio.playClick();
    setIsUnlocked(false);
    setPinInput('');
  };

  return (
    <CyberModal
      isOpen={isOpen}
      onClose={onClose}
      title={isUnlocked ? 'OPERATOR DOSSIER // CURRICULUM VITAE' : 'ENCRYPTED DOSSIER // AUTHENTICATION REQUIRED'}
      subtitle="Harihara Subramanian V • VIT Vellore"
      clearance={isUnlocked ? 'CLEARANCE: TOP SECRET // UNLOCKED' : 'PROTECTED // PIN REQUIRED'}
    >
      {!isUnlocked ? (
        /* PIN Keypad Authentication Screen */
        <div className="max-w-md mx-auto py-4 space-y-6 text-center font-mono">
          <div className="space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-orange-500/15 border-2 border-orange-500 flex items-center justify-center text-orange-400">
              <KeyRound className="w-7 h-7 animate-pulse" />
            </div>
            <h3 className="font-orbitron font-bold text-lg text-white">ENTER 4-DIGIT SECURITY PIN</h3>
            <p className="text-xs text-neutral-400">
              This dossier is PIN-protected to prevent unauthorized distribution. Enter the 4-digit security PIN to decrypt.
            </p>
          </div>

          {/* PIN Display Dots */}
          <div className={`flex justify-center gap-3 py-2 ${shakeError ? 'animate-bounce' : ''}`}>
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-10 h-12 rounded border-2 flex items-center justify-center text-lg font-bold font-orbitron transition-all ${
                  pinInput.length > idx
                    ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-md shadow-orange-500/30'
                    : 'border-neutral-800 bg-black/60 text-neutral-600'
                }`}
              >
                {pinInput.length > idx ? '●' : '—'}
              </div>
            ))}
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-red-950/60 border border-red-500 rounded text-red-400 font-bold text-xs flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> {errorMsg}
            </div>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleDigitPress(digit)}
                className="py-3 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 hover:border-orange-400 rounded text-base font-orbitron font-bold text-white transition-all active:scale-95 shadow-sm"
              >
                {digit}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded text-xs font-mono font-bold text-neutral-400 hover:text-white transition-all"
            >
              CLR
            </button>
            <button
              onClick={() => handleDigitPress('0')}
              className="py-3 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 hover:border-orange-400 rounded text-base font-orbitron font-bold text-white transition-all active:scale-95 shadow-sm"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 rounded text-xs font-mono font-bold text-orange-400 transition-all"
            >
              DEL
            </button>
          </div>
        </div>
      ) : (
        /* Full Unlocked Dossier & Resume View */
        <div className="space-y-6 font-mono text-xs text-neutral-300">
          {/* Top Summary Banner */}
          <div className="bg-black/70 p-4 rounded border border-orange-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-orbitron font-black text-white">{PROFILE_INFO.name}</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED
                </span>
              </div>
              <div className="text-orange-400 text-xs mt-0.5">{PROFILE_INFO.title}</div>
              <div className="text-neutral-400 text-[11px] mt-1 flex flex-wrap items-center gap-x-2">
                <span>Email: <span className="text-neutral-200">{PROFILE_INFO.email}</span></span>
                {PROFILE_INFO.phone && <span>• Tel: <span className="text-emerald-400 font-semibold">{PROFILE_INFO.phone}</span></span>}
                <span>• Location: <span className="text-neutral-200">{PROFILE_INFO.location}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 bg-orange-500 text-black font-orbitron font-bold rounded flex items-center gap-1.5 hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/30 text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={handleLockAgain}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white rounded"
                title="Lock Dossier"
              >
                <Lock className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Academic Distinction & Dual Degree Education */}
          <div className="space-y-2">
            <div className="text-orange-400 font-bold uppercase flex items-center gap-2 font-orbitron">
              <GraduationCap className="w-4 h-4" /> Academic Degrees & Qualifications
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 bg-black/50 rounded border border-orange-500/30 space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span className="text-orange-400">VIT Vellore</span>
                  <span className="text-neutral-400 text-[10px]">2023 – 2027</span>
                </div>
                <div className="text-neutral-200 font-semibold text-xs">
                  B.Tech in Information Technology
                </div>
                <div className="text-[10px] text-neutral-400">
                  Focus: Autonomous Robotics, Computer Vision, Embedded IoT, Cyber Defense.
                </div>
              </div>

              <div className="p-3 bg-black/50 rounded border border-amber-500/30 space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span className="text-amber-400">IIT Madras</span>
                  <span className="text-neutral-400 text-[10px]">Ongoing Dual Degree</span>
                </div>
                <div className="text-neutral-200 font-semibold text-xs">
                  BS in Data Science & Applications
                </div>
                <div className="text-[10px] text-neutral-400">
                  Focus: Statistical Modeling, Machine Learning, Large-scale Data Analytics.
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Specialized Training */}
          <div className="space-y-2">
            <div className="text-emerald-400 font-bold uppercase flex items-center gap-2 font-orbitron">
              <ShieldCheck className="w-4 h-4" /> Professional Certifications & Coursework
            </div>
            <div className="p-3 bg-black/50 rounded border border-emerald-500/30 flex items-center justify-between text-[11px]">
              <div>
                <div className="font-bold text-white">Ethical Hacking Coursework & Certification</div>
                <div className="text-neutral-400 text-[10px]">
                  NPTEL / SWAYAM (IIT Kharagpur / MHRD) • Network Reconnaissance, Exploitation & Defense
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold text-[10px]">
                IN PROGRESS
              </span>
            </div>
          </div>

          {/* Hackathons & Major Awards */}
          <div className="space-y-2">
            <div className="text-orange-400 font-bold uppercase flex items-center gap-2 font-orbitron">
              <Award className="w-4 h-4" /> Hackathon Honors & Major Achievements
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-3 bg-black/50 rounded border border-amber-500/40 space-y-1">
                <div className="text-amber-400 font-bold font-orbitron">🏆 1ST PLACE WINNER</div>
                <div className="text-white font-bold">Echo Prometheus</div>
                <div className="text-neutral-400 text-[10px]">IIT Madras</div>
              </div>

              <div className="p-3 bg-black/50 rounded border border-emerald-500/40 space-y-1">
                <div className="text-emerald-400 font-bold font-orbitron">⚽ SEMI-FINALIST</div>
                <div className="text-white font-bold">Robo Soccer Competition</div>
                <div className="text-neutral-400 text-[10px]">IIT Madras</div>
              </div>

              <div className="p-3 bg-black/50 rounded border border-orange-500/40 space-y-1">
                <div className="text-orange-400 font-bold font-orbitron">⚡ FINALIST HONORS</div>
                <div className="text-white font-bold">Vortex 2.0</div>
                <div className="text-neutral-400 text-[10px]">IEEE SSN Chennai</div>
              </div>
            </div>
          </div>

          {/* Research Publications Underway */}
          <div className="space-y-2">
            <div className="text-orange-400 font-bold uppercase flex items-center gap-2 font-orbitron">
              <Code className="w-4 h-4" /> Active Research Papers & Preprints (4 Projects)
            </div>
            <div className="space-y-2">
              {RESEARCH_PAPERS.map((paper) => (
                <div key={paper.id} className="p-2.5 bg-black/40 rounded border border-neutral-800 space-y-1 text-[11px]">
                  <div className="flex justify-between font-bold text-white">
                    <span className="text-orange-300">{paper.title}</span>
                    <span className="text-emerald-400 text-[10px]">[{paper.status}]</span>
                  </div>
                  <p className="text-neutral-400 text-[10px]">{paper.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Toolkit */}
          <div className="space-y-2">
            <div className="text-orange-400 font-bold uppercase flex items-center gap-2 font-orbitron">
              <Code className="w-4 h-4" /> Core Technical Toolkit
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-black/40 rounded border border-neutral-800">
                <strong className="text-orange-400 block mb-1">Hardware & Embedded IoT:</strong>
                ESP32, ESP8266, Arduino Microcontrollers, I2C/SPI, Sensor Fusion, Robotic Kinematics
              </div>
              <div className="p-2.5 bg-black/40 rounded border border-neutral-800">
                <strong className="text-orange-400 block mb-1">Languages:</strong>
                Python, C++, C, JavaScript, TypeScript, SQL, R Language
              </div>
              <div className="p-2.5 bg-black/40 rounded border border-neutral-800">
                <strong className="text-orange-400 block mb-1">AI & Computer Vision:</strong>
                OpenCV, NumPy, Pandas, Data Augmentation, Flask, REST APIs
              </div>
              <div className="p-2.5 bg-black/40 rounded border border-neutral-800">
                <strong className="text-orange-400 block mb-1">Cybersec & Systems:</strong>
                Linux Shell, CTF Tools, Network Protocols, Git Version Control
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="space-y-2">
            <div className="text-orange-400 font-bold uppercase flex items-center gap-2 font-orbitron">
              <Code className="w-4 h-4" /> Selected Mission Projects
            </div>
            <div className="space-y-2">
              {PROJECTS_DATA.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 bg-black/50 rounded border border-neutral-800 space-y-1">
                  <div className="flex justify-between font-bold text-white text-xs">
                    <span className="text-orange-300">{p.title}</span>
                    <span className="text-neutral-500 font-mono text-[10px]">{p.techStack.slice(0, 3).join(', ')}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CyberModal>
  );
};
