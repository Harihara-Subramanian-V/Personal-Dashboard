import React, { useState, useEffect } from 'react';
import {
  Send,
  MapPin,
  Copy,
  Check,
  Lock,
  Radio,
  Mail,
  Phone,
  ExternalLink,
  Globe,
  X,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './CyberIcons';
import { PROFILE_INFO } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

interface SlideOverCommsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const SlideOverCommsDrawer: React.FC<SlideOverCommsDrawerProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [hashOutput, setHashOutput] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(PROFILE_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const getGmailUrl = () => {
    const subject = `[Tactical Transmission] Inquiry from ${senderName || 'Visitor'}`;
    const body = `Operator Harihara,\n\n${message || '(No message body provided)'}\n\n--- Transmission Telemetry ---\nSender Name: ${senderName || 'Anonymous'}\nContact Email: ${senderEmail || 'Not specified'}\nTimestamp: ${new Date().toISOString()}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PROFILE_INFO.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getOutlookUrl = () => {
    const subject = `[Tactical Transmission] Inquiry from ${senderName || 'Visitor'}`;
    const body = `Operator Harihara,\n\n${message || '(No message body provided)'}\n\n--- Transmission Telemetry ---\nSender Name: ${senderName || 'Anonymous'}\nContact Email: ${senderEmail || 'Not specified'}`;
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${PROFILE_INFO.email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getMailtoUrl = () => {
    const subject = `[Tactical Transmission] Inquiry from ${senderName || 'Visitor'}`;
    const body = `Operator Harihara,\n\n${message || '(No message body provided)'}\n\n--- Transmission Telemetry ---\nSender Name: ${senderName || 'Anonymous'}\nContact Email: ${senderEmail || 'Not specified'}`;
    return `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSendTransmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    cyberAudio.playScanSweep();
    setIsEncrypting(true);
    setHashOutput('GENERATING SHA-256 ENCRYPTED PAYLOAD HASH...');

    const gmailUrl = getGmailUrl();
    const mailWindow = window.open(gmailUrl, '_blank');

    if (!mailWindow || mailWindow.closed || typeof mailWindow.closed === 'undefined') {
      window.location.href = getMailtoUrl();
    }

    setTimeout(() => {
      setHashOutput('CIPHER: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    }, 350);

    setTimeout(() => {
      setHashOutput(`DISPATCHING ENCRYPTED TLS PACKET TO ${PROFILE_INFO.email.toUpperCase()}...`);
    }, 750);

    setTimeout(() => {
      setIsEncrypting(false);
      setTransmissionSuccess(true);
      cyberAudio.playAccessGranted();
    }, 1100);
  };

  const handleCopyFullPayload = () => {
    cyberAudio.playClick();
    const fullPayload = `To: ${PROFILE_INFO.email}\nSubject: [Tactical Transmission] Inquiry from ${senderName}\n\n${message}\n\nFrom: ${senderName} (${senderEmail})`;
    navigator.clipboard.writeText(fullPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2400);
  };

  const handleResetForm = () => {
    cyberAudio.playClick();
    setSenderName('');
    setSenderEmail('');
    setMessage('');
    setTransmissionSuccess(false);
    setHashOutput('');
  };

  return (
    <>
      {/* 1. Right-Side Persistent Cyber Pull Handle */}
      {!isOpen && (
        <button
          onClick={() => onOpen()}
          className="fixed top-1/2 -translate-y-1/2 right-0 z-40 group flex items-center select-none"
          title="Open Encrypted Comms Link"
        >
          <div className="bg-black hover:bg-neutral-900 border-y border-l border-orange-500 p-2 shadow-2xl transition-all flex flex-col items-center gap-2">
            {/* Beacon Light */}
            <span className="relative flex h-2 w-2">
              <span className="inline-flex h-full w-full bg-emerald-400" />
            </span>

            {/* Vertical Cyber Text */}
            <div className="font-orbitron font-bold text-[10px] tracking-widest text-orange-400 group-hover:text-emerald-400 transition-colors [writing-mode:vertical-rl] rotate-180 uppercase flex items-center gap-1">
              <span>C O M M S</span>
              <span className="text-neutral-500 text-[8px]">●</span>
              <span>L I N K</span>
            </div>

            <Radio className="w-3.5 h-3.5 text-orange-400 group-hover:text-emerald-400 mt-1" />
          </div>
        </button>
      )}

      {/* 2. Slide-Over Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* 3. Slide-Over Comms Drawer Cyber Deck Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-neutral-950 border-l border-orange-500 shadow-2xl transition-transform duration-300 ease-out transform overflow-y-auto flex flex-col font-mono text-xs ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-black border-b border-orange-500/40 flex items-center justify-between sticky top-0 z-20">
          <div className="space-y-0.5">
            <div className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>[SECTION 06] // ENCRYPTED COMMS BEACON</span>
            </div>
            <h2 className="font-orbitron font-black text-base sm:text-lg text-white">
              ESTABLISH SECURE COMMS LINK
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 text-neutral-300 transition-all flex items-center gap-1 font-orbitron text-xs"
            title="Close Drawer (ESC)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">CLOSE</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="p-4 sm:p-5 space-y-4 flex-1">
          {/* Clearance & Channel Badges */}
          <div className="cyber-card p-4 space-y-3 border border-orange-500/40">
            <div className="text-orange-400 font-bold font-orbitron text-xs uppercase flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>DIRECT CHANNELS & CLEARANCES</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                OPERATIONAL
              </span>
            </div>

            {/* Email Box with Copy */}
            <div className="p-3 bg-black border border-orange-500/30 flex items-center justify-between font-mono text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] text-neutral-500">PRIMARY ENCRYPTED INBOX</div>
                <div className="font-bold text-white text-sm">{PROFILE_INFO.email}</div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 transition-colors text-orange-400"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct Phone Comms Channel with Copy & Quick-Dial */}
            {PROFILE_INFO.phone && (
              <div className="p-3 bg-black/70 rounded border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" /> DIRECT TELEMETRY / VOICE LINE
                  </div>
                  <div className="font-bold text-emerald-300 text-sm">{PROFILE_INFO.phone}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${PROFILE_INFO.phone.replace(/\s+/g, '')}`}
                    onClick={() => cyberAudio.playClick()}
                    className="p-2 rounded bg-emerald-500/20 hover:bg-emerald-500 hover:text-black border border-emerald-500/40 transition-colors text-emerald-400"
                    title="Direct call line"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded bg-neutral-900 hover:bg-emerald-500 hover:text-black border border-neutral-800 transition-colors text-emerald-400"
                    title="Copy phone number to clipboard"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Direct Webmail Fast Launchers */}
            <div className="space-y-1.5">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">
                ONE-CLICK WEBMAIL COMPOSERS:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGmailUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2 bg-black/60 hover:bg-orange-500/20 border border-neutral-800 hover:border-orange-500/50 rounded flex items-center justify-center gap-1.5 text-orange-400 transition-all text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Gmail Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={getOutlookUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2 bg-black/60 hover:bg-orange-500/20 border border-neutral-800 hover:border-orange-500/50 rounded flex items-center justify-center gap-1.5 text-neutral-300 hover:text-orange-400 transition-all text-[11px]"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Outlook Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Campus Coordinates */}
            <div className="p-2.5 bg-black/60 rounded border border-neutral-800 text-xs space-y-0.5">
              <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> PHYSICAL DEPLOYMENT NODE
              </div>
              <div className="text-neutral-200 font-bold">{PROFILE_INFO.institution}</div>
              <div className="text-neutral-400 text-[11px]">{PROFILE_INFO.location}</div>
            </div>

            {/* Social Hub Links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="p-2 bg-black/60 hover:bg-orange-500/20 border border-neutral-800 hover:border-orange-500/50 rounded flex items-center justify-center gap-2 text-neutral-300 hover:text-orange-400 transition-all text-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="p-2 bg-black/60 hover:bg-orange-500/20 border border-neutral-800 hover:border-orange-500/50 rounded flex items-center justify-center gap-2 text-neutral-300 hover:text-orange-400 transition-all text-xs"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Form / Transmission Console */}
          <div className="cyber-card rounded-lg p-5 space-y-4">
            {!transmissionSuccess ? (
              <form onSubmit={handleSendTransmission} className="space-y-4">
                <div className="text-white font-bold font-orbitron text-xs flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ENCRYPTED TRANSMISSION FORM</span>
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">TLS 1.3 / AES-256</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-bold text-[11px] block">
                    CALLSIGN / NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name / Organization"
                    className="w-full bg-black/70 border border-neutral-800 focus:border-orange-500 rounded px-3 py-2 text-white font-mono placeholder:text-neutral-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-bold text-[11px] block">
                    ORIGIN EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full bg-black/70 border border-neutral-800 focus:border-orange-500 rounded px-3 py-2 text-white font-mono placeholder:text-neutral-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-neutral-400 font-bold text-[11px] block">
                    PAYLOAD MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter project inquiry, robotics/IoT collaboration, or research requisition..."
                    className="w-full bg-black/70 border border-neutral-800 focus:border-orange-500 rounded px-3 py-2 text-white font-mono placeholder:text-neutral-600 focus:outline-none resize-none"
                  />
                </div>

                {isEncrypting && (
                  <div className="p-2.5 bg-orange-500/10 rounded border border-orange-500/30 text-orange-400 text-[11px] animate-pulse">
                    {hashOutput}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-[10px] text-neutral-500">
                    TARGET: <strong className="text-neutral-300">{PROFILE_INFO.email}</strong>
                  </span>

                  <button
                    type="submit"
                    disabled={isEncrypting}
                    className="cyber-btn cyber-btn-solid text-xs py-2.5 px-5 font-bold shadow-lg shadow-orange-500/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isEncrypting ? 'DISPATCHING...' : 'DISPATCH TRANSMISSION'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Transmission Delivered Screen */
              <div className="py-6 space-y-4 text-center font-mono animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-orbitron font-bold text-base text-white">
                    TRANSMISSION DISPATCHED
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Composer launched for <strong className="text-orange-400">{PROFILE_INFO.email}</strong>.
                  </p>
                </div>

                <div className="p-3 bg-black/60 rounded border border-neutral-800 max-w-md mx-auto text-[11px] text-neutral-400 text-left space-y-1">
                  <div>FROM: <strong className="text-white">{senderName}</strong> ({senderEmail})</div>
                  <div>MESSAGE: <span className="text-neutral-300 font-sans italic">"{message}"</span></div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <a
                    href={getGmailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron rounded flex items-center gap-1.5 text-xs transition-all shadow-md shadow-orange-500/20"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Gmail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={handleCopyFullPayload}
                    className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-orange-400 border border-orange-500/30 rounded text-xs transition-all flex items-center gap-1.5"
                  >
                    {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPayload ? 'Copied!' : 'Copy Message'}</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 rounded text-xs transition-all"
                  >
                    New Message
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
