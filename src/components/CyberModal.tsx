import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

interface CyberModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  clearance?: string;
  children: React.ReactNode;
}

export const CyberModal: React.FC<CyberModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  clearance = 'TOP SECRET',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cyberAudio.playClick();
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={() => { cyberAudio.playClick(); onClose(); }} />

      {/* Cyber Modal Window */}
      <div className="relative w-full max-w-4xl bg-neutral-950 border-2 border-orange-500/80 rounded-lg shadow-2xl shadow-orange-500/20 z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Hologram Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-b border-orange-500/40">
          <div className="flex items-center gap-3">
            <div className="px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/50 text-orange-400 font-mono text-[10px] font-bold tracking-wider">
              {clearance}
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-white text-sm sm:text-base tracking-wide flex items-center gap-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] font-mono text-orange-400/80">
                  // {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-orange-500/20 text-neutral-400 hover:text-orange-400 border border-transparent hover:border-orange-500/40 transition-colors"
            title="Close Dossier (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {children}
        </div>

        {/* Modal Footer HUD telemetry */}
        <div className="px-4 py-2 bg-black/90 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            OPERATOR: HARIHARA SUBRAMANIAN V
          </span>
          <span>PRESS [ESC] TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
