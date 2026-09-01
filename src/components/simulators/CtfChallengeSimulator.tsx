import React, { useState } from 'react';
import { ShieldAlert, Lock, Key, CheckCircle, Search, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cyberAudio } from '../../utils/audio';

export const CtfChallengeSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crypto' | 'port_scanner' | 'flag_verify'>('crypto');
  const [inputText, setInputText] = useState<string>('U0VDVVJFX1NZU1RFTSBPUEVSQVRJT05BTCBAIFZJVA==');
  const [decodedOutput, setDecodedOutput] = useState<string>('SECURE_SYSTEM OPERATIONAL @ VIT');
  const [rotShift, setRotShift] = useState<number>(13);
  const [flagInput, setFlagInput] = useState<string>('');
  const [flagStatus, setFlagStatus] = useState<'IDLE' | 'CORRECT' | 'INVALID'>('IDLE');
  const [scannedPorts] = useState<
    { port: number; service: string; state: 'OPEN' | 'FILTERED' | 'CLOSED'; banner: string }[]
  >([
    { port: 22, service: 'SSH', state: 'OPEN', banner: 'OpenSSH 8.9p1 Ubuntu-3ubuntu0.6' },
    { port: 80, service: 'HTTP', state: 'OPEN', banner: 'Cybersec Flask API Gateway v1.4' },
    { port: 443, service: 'HTTPS', state: 'OPEN', banner: 'TLSv1.3 AES-GCM-256' },
    { port: 3306, service: 'MySQL', state: 'FILTERED', banner: 'Database Firewall Active' },
    { port: 8080, service: 'ESP32_WS', state: 'OPEN', banner: 'Microcontroller Telemetry Socket' },
  ]);

  const handleBase64Decode = () => {
    cyberAudio.playClick();
    try {
      const res = atob(inputText);
      setDecodedOutput(res);
    } catch {
      setDecodedOutput('[ERROR: Invalid Base64 String]');
      cyberAudio.playAlert();
    }
  };

  const handleBase64Encode = () => {
    cyberAudio.playClick();
    try {
      const res = btoa(inputText);
      setDecodedOutput(res);
    } catch {
      setDecodedOutput('[ERROR: Encoding failed]');
      cyberAudio.playAlert();
    }
  };

  const handleRotCipher = () => {
    cyberAudio.playClick();
    const str = inputText;
    const res = str.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + rotShift) % 26) + base);
    });
    setDecodedOutput(`ROT${rotShift} Result: ${res}`);
  };

  const handleHexToText = () => {
    cyberAudio.playClick();
    try {
      const cleanHex = inputText.replace(/\s+/g, '');
      let str = '';
      for (let i = 0; i < cleanHex.length; i += 2) {
        str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
      }
      setDecodedOutput(str);
    } catch {
      setDecodedOutput('[ERROR: Invalid Hex input]');
      cyberAudio.playAlert();
    }
  };

  const handleVerifyFlag = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = flagInput.trim();

    if (
      normalized.toLowerCase() === 'flag{wh1t3_h4t5_v1t_d3f3nd3r}' ||
      normalized.toLowerCase() === 'flag{harihara_cyber_ops}' ||
      normalized.toLowerCase() === 'flag{vit_vellore_ctf}'
    ) {
      setFlagStatus('CORRECT');
      cyberAudio.playAccessGranted();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff6b00', '#ffa726', '#ffffff', '#00ff66'],
        });
      } catch {
        // Ignore
      }
    } else {
      setFlagStatus('INVALID');
      cyberAudio.playAlert();
    }
  };

  return (
    <div className="space-y-4 text-xs font-mono">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-500/20 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-orange-400" />
          <span className="font-orbitron text-sm font-bold text-orange-400">
            WHITE HATS CLUB // CTF WORKBENCH & SECURITY SUITE
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded border border-orange-500/30">
          <Lock className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-neutral-300">DEFENSIVE SUITE v2.6</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-800 pb-2">
        <button
          onClick={() => {
            cyberAudio.playClick();
            setActiveTab('crypto');
          }}
          className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 ${
            activeTab === 'crypto'
              ? 'bg-orange-500 text-black shadow-md shadow-orange-500/30'
              : 'bg-black/40 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Key className="w-3.5 h-3.5" /> Cryptographic Tools
        </button>

        <button
          onClick={() => {
            cyberAudio.playClick();
            setActiveTab('port_scanner');
          }}
          className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 ${
            activeTab === 'port_scanner'
              ? 'bg-orange-500 text-black shadow-md shadow-orange-500/30'
              : 'bg-black/40 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Search className="w-3.5 h-3.5" /> Port & Banner Recon
        </button>

        <button
          onClick={() => {
            cyberAudio.playClick();
            setActiveTab('flag_verify');
          }}
          className={`px-3 py-1.5 rounded transition-all font-bold flex items-center gap-1.5 ${
            activeTab === 'flag_verify'
              ? 'bg-orange-500 text-black shadow-md shadow-orange-500/30'
              : 'bg-black/40 text-neutral-400 hover:text-white border border-neutral-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> CTF Flag Validator
        </button>
      </div>

      {/* Tab 1: Crypto Tools */}
      {activeTab === 'crypto' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-black/60 p-3 rounded border border-orange-500/20 space-y-3">
            <div className="text-orange-400 font-bold uppercase">Payload Input:</div>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-black/80 border border-orange-500/30 rounded p-2 text-neutral-200 font-mono focus:outline-none focus:border-orange-500"
              placeholder="Paste raw string, Base64, or Hex bytes..."
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={handleBase64Decode}
                className="px-2 py-1.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-orange-500/30 rounded text-neutral-200 transition-colors"
              >
                Base64 Dec
              </button>
              <button
                onClick={handleBase64Encode}
                className="px-2 py-1.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-orange-500/30 rounded text-neutral-200 transition-colors"
              >
                Base64 Enc
              </button>
              <button
                onClick={handleRotCipher}
                className="px-2 py-1.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-orange-500/30 rounded text-neutral-200 transition-colors"
              >
                ROT-{rotShift}
              </button>
              <button
                onClick={handleHexToText}
                className="px-2 py-1.5 bg-neutral-900 hover:bg-orange-500 hover:text-black border border-orange-500/30 rounded text-neutral-200 transition-colors"
              >
                Hex ➔ ASCII
              </button>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
              <span className="text-neutral-400">ROT Offset:</span>
              <input
                type="range"
                min="1"
                max="25"
                value={rotShift}
                onChange={(e) => setRotShift(Number(e.target.value))}
                className="flex-1 accent-orange-500"
              />
              <span className="text-orange-400 font-bold">{rotShift}</span>
            </div>
          </div>

          <div className="bg-black/70 p-3 rounded border border-orange-500/20 space-y-2 flex flex-col justify-between">
            <div>
              <div className="text-orange-400 font-bold uppercase mb-2">Decoded / Transformed Result:</div>
              <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-orange-300 font-mono min-h-[90px] break-all select-all">
                {decodedOutput || '[No output processed yet]'}
              </div>
            </div>

            <div className="text-[10px] text-neutral-500 border-t border-neutral-800 pt-2">
              Integrated with Python `cryptography` & `hashlib` challenge modules in WHITE_HATS-CLUB.
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Port Scanner Recon */}
      {activeTab === 'port_scanner' && (
        <div className="bg-black/60 p-3 rounded border border-orange-500/20 space-y-3">
          <div className="flex justify-between items-center text-neutral-300">
            <span className="text-orange-400 font-bold uppercase">Target Host: 192.168.1.104 [VIT Cyber Lab Node]</span>
            <span className="text-emerald-400">5 Services Active</span>
          </div>

          <div className="divide-y divide-neutral-800 border border-neutral-800 rounded overflow-hidden">
            {scannedPorts.map((p) => (
              <div key={p.port} className="p-2.5 flex flex-wrap items-center justify-between gap-2 hover:bg-neutral-900/60">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 font-bold w-12">:{p.port}</span>
                  <span className="text-neutral-200 font-semibold">{p.service}</span>
                  <span className="text-neutral-500 text-[11px] hidden sm:inline">({p.banner})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.state === 'OPEN'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {p.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Flag Validator */}
      {activeTab === 'flag_verify' && (
        <div className="bg-black/60 p-4 rounded border border-orange-500/20 space-y-4 max-w-xl mx-auto">
          <div className="text-center space-y-1">
            <div className="text-base font-orbitron font-bold text-orange-400">VIT WHITE HATS CTF VERIFIER</div>
            <div className="text-neutral-400 text-xs">
              Test the challenge flag: <code className="text-orange-300">FLAG&#123;wh1t3_h4t5_v1t_d3f3nd3r&#125;</code>
            </div>
          </div>

          <form onSubmit={handleVerifyFlag} className="space-y-3">
            <input
              type="text"
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              placeholder="FLAG{...}"
              className="w-full bg-black border-2 border-orange-500/40 rounded p-2.5 text-white font-mono text-center focus:outline-none focus:border-orange-400"
            />

            <button
              type="submit"
              className="w-full py-2 bg-orange-500 text-black font-bold font-orbitron uppercase rounded hover:bg-orange-400 transition-colors shadow-md shadow-orange-500/30"
            >
              Verify Cryptographic Hash
            </button>
          </form>

          {flagStatus === 'CORRECT' && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500 rounded text-center text-emerald-300 font-bold space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> ACCESS GRANTED // CHALLENGE SOLVED (+500 PTS)
              </div>
              <div className="text-[11px] text-emerald-400 font-normal">
                Operator signature verified: Harihara Subramanian V
              </div>
            </div>
          )}

          {flagStatus === 'INVALID' && (
            <div className="p-2.5 bg-red-950/60 border border-red-500 rounded text-center text-red-300 font-bold text-xs">
              [ACCESS DENIED] Invalid Flag Hash. Re-examine the cipher payload!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
