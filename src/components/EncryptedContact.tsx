import React, { useState } from 'react';
import { Send, MapPin, Copy, Check, Lock, Radio, Mail, ExternalLink, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './CyberIcons';
import { PROFILE_INFO } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

export const EncryptedContact: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [hashOutput, setHashOutput] = useState('');

  const handleCopyEmail = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
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

    // Open Gmail composer in a new tab immediately in the click callstack so browsers never block it
    const gmailUrl = getGmailUrl();
    const mailWindow = window.open(gmailUrl, '_blank');

    // Fallback: If pop-up was blocked or not loaded, fallback to location href mailto
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
    <section id="contact" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Header */}
        <div className="border-b border-orange-500/30 pb-4">
          <div className="text-xs font-mono text-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
            <Radio className="w-4 h-4 text-orange-500 animate-pulse" /> [SECTION 06] // ENCRYPTED TRANSMISSION BEACON
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white mt-1">
            ESTABLISH SECURE COMMS LINK
          </h2>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Direct Channel Badges & Coordinates */}
          <div className="lg:col-span-5 space-y-4">
            <div className="cyber-card rounded-lg p-5 space-y-4">
              <div className="text-orange-400 font-bold font-orbitron text-sm uppercase flex items-center gap-2">
                <Lock className="w-4 h-4" /> DIRECT CHANNELS & CLEARANCES
              </div>

              {/* Email Card with Copy Button */}
              <div className="p-3 bg-black/60 rounded border border-orange-500/30 flex items-center justify-between font-mono text-xs">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-neutral-500">PRIMARY ENCRYPTED INBOX</div>
                  <div className="font-bold text-white">{PROFILE_INFO.email}</div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded bg-neutral-900 hover:bg-orange-500 hover:text-black border border-neutral-800 transition-colors text-orange-400"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Direct Mail Launchers */}
              <div className="space-y-2 font-mono text-xs">
                <div className="text-[10px] text-neutral-400 uppercase">DIRECT DISPATCH CHANNELS:</div>
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

              {/* Coordinates / Campus Node */}
              <div className="p-3 bg-black/60 rounded border border-neutral-800 font-mono text-xs space-y-1">
                <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-400" /> PHYSICAL DEPLOYMENT NODE
                </div>
                <div className="text-neutral-200 font-bold">{PROFILE_INFO.institution}</div>
                <div className="text-neutral-400 text-[11px]">{PROFILE_INFO.location}</div>
              </div>

              {/* Fast Social Launchers */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2.5 bg-black/60 hover:bg-orange-500/20 border border-neutral-800 hover:border-orange-500/50 rounded flex items-center justify-center gap-2 font-mono text-xs text-neutral-300 hover:text-orange-400 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => cyberAudio.playClick()}
                  className="p-2.5 bg-black/60 hover:bg-orange-500/20 border border-neutral-800 hover:border-orange-500/50 rounded flex items-center justify-center gap-2 font-mono text-xs text-neutral-300 hover:text-orange-400 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <div className="cyber-card rounded-lg p-6 space-y-4">
              {!transmissionSuccess ? (
                <form onSubmit={handleSendTransmission} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <span className="text-[11px] text-neutral-500">
                      TARGET INBOX: <strong className="text-neutral-300">{PROFILE_INFO.email}</strong>
                    </span>

                    <button
                      type="submit"
                      disabled={isEncrypting}
                      className="cyber-btn cyber-btn-solid text-xs py-2.5 px-6 font-bold shadow-lg shadow-orange-500/30"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isEncrypting ? 'DISPATCHING...' : 'DISPATCH TRANSMISSION'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Transmission Sent Confirmation Screen with direct mail options */
                <div className="py-6 space-y-4 text-center font-mono animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-orbitron font-bold text-lg text-white">TRANSMISSION DISPATCHED</h3>
                    <p className="text-xs text-neutral-400">
                      Mail client composer launched for <strong className="text-orange-400">{PROFILE_INFO.email}</strong>.
                    </p>
                  </div>

                  <div className="p-3 bg-black/60 rounded border border-neutral-800 max-w-md mx-auto text-[11px] text-neutral-400 text-left space-y-1.5">
                    <div>FROM: <strong className="text-white">{senderName}</strong> ({senderEmail})</div>
                    <div>MESSAGE: <span className="text-neutral-300 font-sans italic">"{message}"</span></div>
                  </div>

                  {/* Immediate Webmail Quick Openers */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => cyberAudio.playClick()}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black font-bold font-orbitron rounded flex items-center gap-1.5 text-xs transition-all shadow-md shadow-orange-500/20"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail Composer</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={handleCopyFullPayload}
                      className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-orange-400 border border-orange-500/30 rounded text-xs transition-all flex items-center gap-1.5"
                    >
                      {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPayload ? 'Copied Payload!' : 'Copy Full Message'}</span>
                    </button>

                    <button
                      onClick={handleResetForm}
                      className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 rounded text-xs transition-all"
                    >
                      New Transmission
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
