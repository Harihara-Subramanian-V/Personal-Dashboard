import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-150 select-none">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={() => onClose()} />

      {/* Cyber Modal Window (Sharp Brutalist) */}
      <div className="relative w-full max-w-4xl bg-neutral-950 border-2 border-orange-500 z-10 overflow-hidden my-auto max-h-[94vh] flex flex-col shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black border-b border-orange-500/40">
          <div className="flex items-center gap-2.5">
            <div className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/50 text-orange-400 font-mono text-[10px] font-bold">
              {clearance}
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-white text-sm sm:text-base tracking-wide flex items-center gap-2">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[10px] font-mono text-orange-400/80">
                  // {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => onClose()}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Close Dossier (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 font-mono text-xs">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-1.5 bg-black border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500">
          <span>OPERATOR: HARIHARA SUBRAMANIAN V</span>
          <span>PRESS [ESC] TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
