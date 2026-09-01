import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, CornerDownLeft } from 'lucide-react';
import type { TerminalOutput } from '../types';
import { PROFILE_INFO, PROJECTS_DATA, HARDWARE_INVENTORY, RESEARCH_PAPERS, ACHIEVEMENTS_DATA } from '../data/profileData';
import { cyberAudio } from '../utils/audio';

interface CyberTerminalProps {
  onToggleMatrix?: () => void;
  onOpenProject?: (projectId: string) => void;
  onTriggerJumpscare?: () => void;
  onOpenRfScanner?: () => void;
  onOpenStarShooter?: () => void;
  onOpenComms?: () => void;
}

export const CyberTerminal: React.FC<CyberTerminalProps> = ({
  onToggleMatrix,
  onOpenProject,
  onTriggerJumpscare,
  onOpenRfScanner,
  onOpenStarShooter,
  onOpenComms,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<TerminalOutput[]>([
    {
      id: 'init-1',
      type: 'ascii',
      text: 'BANNER_HEADER',
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: 'init-2',
      type: 'system',
      text: `AUTHENTICATED: Operator Harihara Subramanian V [ROOT ACCESS GRANTED // READY]`,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Internal terminal container scroll ONLY (Never scroll entire window!)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const availableCommands = [
    'help',
    'about',
    'projects',
    'repo',
    'open',
    'skills',
    'chess',
    'research',
    'hackathons',
    'scanner',
    'rf',
    'game',
    'shoot',
    'star',
    'ctf',
    'hardware',
    'contact',
    'matrix',
    'boot',
    'ghost',
    'whoami',
    'date',
    'clear',
    'sudo',
  ];

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    cyberAudio.playKeypress();

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newLogs: TerminalOutput[] = [
      ...logs,
      {
        id: `in-${Date.now()}`,
        type: 'input',
        text: `operator@defsec:~$ ${trimmed}`,
        timestamp: new Date().toLocaleTimeString(),
      },
    ];

    switch (command) {
      case 'help':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
AVAILABLE TACTICAL PROTOCOLS:
  • about         - Operator bio, autonomous robotics, and engineering background
  • projects      - List mission repositories and interactive prototypes
  • open <name>   - Launch GitHub repository in browser (e.g. 'open gyrobot', 'open ctf')
  • repo <name>   - Open project interactive simulator modal
  • scanner / rf  - Launch WiFi & Bluetooth BLE Device Discovery Scanner
  • chess         - Tactical Chess & Minimax strategy evaluation
  • research      - View 4 active research papers (Biodiesel, Spectrometry, Dyes)
  • hackathons    - View IIT Madras 1st Place & IEEE Vortex honors
  • skills        - Technical defense matrix & programming proficiencies
  • hardware      - ESP32, microcontrollers & sensor telemetry specifications
  • ctf           - WHITE HATS Cyber Club operations & CTF details
  • boot          - Play iconic 90s tech startup boot chime
  • ghost         - [DANGER] Trigger terrifying ghost scream anomaly
  • matrix        - Toggle holographic digital rain stream
  • contact       - Direct encrypted transmission channels
  • clear         - Flush terminal buffer
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'chess':
      case 'aces':
      case 'gambit':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[TACTICAL CHESS & ACES STRATEGY ENGINE]
Opening Protocol: King's Gambit / Sicilian Defense
Evaluation Depth: 12-Ply Minimax (Alpha-Beta Pruned)
Positional Advantage: +1.85 (Dynamic Center Control)
Card Strategy: ♠ Ace of Spades (Calculated Risk Alpha)
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'game':
      case 'shoot':
      case 'star':
      case 'arcade':
      case 'space':
        if (onOpenStarShooter) onOpenStarShooter();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[SECRET UNLOCKED] Booting Cyber Star Shooter Arcade Engine... 🚀`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'scanner':
      case 'rf':
      case 'wifi':
      case 'bluetooth':
      case 'ble':
        if (onOpenRfScanner) onOpenRfScanner();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[RF SPECTRUM] Launching Wireless Device Scanner for Bluetooth LE & WiFi APs...`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'ghost':
      case 'jumpscare':
      case 'scare':
      case 'anomaly':
      case '666':
        if (onTriggerJumpscare) onTriggerJumpscare();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'error',
          text: `[FATAL] GHOST ENTITY BREACH INITIATED! HOLD YOUR GROUND...`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'about':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[OPERATOR PROFILE]
Name: ${PROFILE_INFO.name} (${PROFILE_INFO.pronouns})
Role: ${PROFILE_INFO.title}
Institution: ${PROFILE_INFO.institution} (${PROFILE_INFO.degree})
Location: ${PROFILE_INFO.location}

SUMMARY:
${PROFILE_INFO.bioSummary}

CORE FOCUS AREAS:
${PROFILE_INFO.interests.map((int) => `  [+] ${int}`).join('\n')}
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'projects':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[MISSION DOSSIERS // REPOSITORIES]
${PROJECTS_DATA.map(
  (p, i) =>
    `  [${i + 1}] ${p.title} (${p.codename})
      Category: ${p.categoryLabel} | Status: ${p.status}
      Stack: ${p.techStack.join(', ')}
      URL: ${p.githubUrl}`
).join('\n\n')}

TIP: Type 'open <project_name>' to launch GitHub directly (e.g. 'open gyrobot')!
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'open':
      case 'github': {
        const query = args.join(' ').toLowerCase().trim();
        if (!query) {
          window.open(PROFILE_INFO.github, '_blank');
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'success',
            text: `[GITHUB HUB] Opening main GitHub profile: ${PROFILE_INFO.github}`,
            timestamp: new Date().toLocaleTimeString(),
          });
          break;
        }

        const matched = PROJECTS_DATA.find(
          (p) =>
            p.id.toLowerCase().includes(query) ||
            p.title.toLowerCase().includes(query) ||
            p.codename.toLowerCase().includes(query) ||
            p.githubUrl.toLowerCase().includes(query)
        );

        if (matched) {
          window.open(matched.githubUrl, '_blank');
          cyberAudio.playAccessGranted();
          newLogs.push({
            id: `out-${Date.now()}`,
            type: 'success',
            text: `[DISPATCH] Opening GitHub repo in new window: ${matched.githubUrl}`,
            timestamp: new Date().toLocaleTimeString(),
          });
        } else {
          cyberAudio.playAlert();
          newLogs.push({
            id: `err-${Date.now()}`,
            type: 'error',
            text: `[REPO_NOT_FOUND] No project matching '${query}'. Try: 'open gyrobot', 'open image', 'open ctf', 'open air-ticket'.`,
            timestamp: new Date().toLocaleTimeString(),
          });
        }
        break;
      }

      case 'repo': {
        const query = args.join(' ').toLowerCase().trim();
        if (query && onOpenProject) {
          const match = PROJECTS_DATA.find(
            (p) =>
              p.id.toLowerCase().includes(query) ||
              p.title.toLowerCase().includes(query) ||
              p.codename.toLowerCase().includes(query)
          );
          if (match) {
            onOpenProject(match.id);
            cyberAudio.playAccessGranted();
            newLogs.push({
              id: `out-${Date.now()}`,
              type: 'success',
              text: `[SIMULATOR] Launching interactive laboratory for: ${match.title}`,
              timestamp: new Date().toLocaleTimeString(),
            });
            break;
          }
        }
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `Usage: repo <name> (e.g. repo gyrobot, repo image, repo flight, repo ctf)`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;
      }

      case 'research':
      case 'papers':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[ACTIVE RESEARCH PAPERS & PREPRINTS (4 PROJECTS)]
${RESEARCH_PAPERS.map(
  (rp, i) =>
    `  [${i + 1}] ${rp.title}
      Domain: ${rp.domain} | Status: ${rp.status}
      Role: ${rp.leadRole}
      Focus: ${rp.focusAreas.join(' • ')}
      Summary: ${rp.description}`
).join('\n\n')}
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'hackathons':
      case 'awards':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[MAJOR HACKATHON HONORS & MILESTONES]
${ACHIEVEMENTS_DATA.map(
  (ach) =>
    `  • ${ach.badge} - ${ach.title}
      Organization: ${ach.organization} (${ach.date})
      Details: ${ach.description}`
).join('\n\n')}
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'skills':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[TECHNICAL DEFENSE MATRIX]
LANGUAGES:
  Python (95%) • C++ (88%) • C (82%) • JavaScript (80%) • SQL (85%) • R (75%)

AI / COMPUTER VISION / FRAMEWORKS:
  OpenCV (90%) • NumPy & Pandas (92%) • Tactical Chess (90%) • Flask (84%)

HARDWARE / EMBEDDED / IOT:
  ESP32-S3 (92%) • Raspberry Pi (88%) • STM32 (85%) • Arduino (90%)

SYSTEMS & CYBERSEC:
  Linux Shell (88%) • CTF Tooling (85%) • Git Automation (90%)
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'hardware':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[EMBEDDED HARDWARE INVENTORY]
${HARDWARE_INVENTORY.map(
  (h) =>
    `  • ${h.name} [${h.tag}]
      Architecture: ${h.architecture} | Clock: ${h.clockSpeed}
      Use Case: ${h.useCase}
      Protocols: ${h.protocols.join(', ')} | Status: ${h.status}`
).join('\n\n')}
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'ctf':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `
[WHITE HATS CLUB // CYBER DEFENSE]
Role: Active Member & CTF Contributor @ VIT Vellore
Operations:
  • Cryptographic reversing & Base64/XOR/ROT challenge suites
  • Network socket auditing & packet inspection
  • Vulnerability identification & defensive hardening scripts
Flag Verification Suite: Integrated into White Hats CTF project modal!
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'boot':
      case 'win95':
      case 'sound':
        cyberAudio.play90sStartup();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[AUDIO ENGINE] Synthesizing nostalgic 90s tech startup boot chime... 🎵`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'contact':
      case 'comms':
      case 'transmit':
      case 'email':
        if (onOpenComms) onOpenComms();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `
[COMMS BEACON ENGAGED]
Sliding out encrypted transmission deck from right viewport...
Primary Inbox: ${PROFILE_INFO.email}
GitHub:        ${PROFILE_INFO.github}
LinkedIn:      ${PROFILE_INFO.linkedin}
          `,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'matrix':
        if (onToggleMatrix) onToggleMatrix();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[SUCCESS] Matrix digital rain stream overlay toggled.`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'whoami':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `UID: 0(root) GID: 0(wheel) USER: Harihara Subramanian V // CLEARANCE: TOP SECRET // VIT VELLORE`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'date':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          text: `SYSTEM TIME: ${new Date().toISOString()} [IST LOCALIZED]`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'sudo':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          text: `[SYSTEM] Operator Harihara Subramanian V is already root. Elevation granted permanently.`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;

      default:
        cyberAudio.playAlert();
        newLogs.push({
          id: `err-${Date.now()}`,
          type: 'error',
          text: `[COMMAND_NOT_FOUND] '${command}' is not recognized. Type 'help' for available commands.`,
          timestamp: new Date().toLocaleTimeString(),
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.toLowerCase().trim();
      const match = availableCommands.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const executeChip = (cmd: string) => {
    setInputVal(cmd);
    handleCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="cyber-card rounded-lg overflow-hidden border border-orange-500/40 shadow-xl shadow-orange-500/10">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/90 border-b border-orange-500/30 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block border border-red-400/50" />
            <span className="w-3 h-3 rounded-full bg-orange-500/80 inline-block border border-orange-400/50" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-400/50" />
          </div>
          <span className="font-orbitron font-bold text-orange-400 ml-2 flex items-center gap-1.5">
            <Terminal className="w-4 h-4" /> ROOT_BASH // DEFSEC_TERMINAL
          </span>
        </div>

        <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
          <span className="hidden sm:inline">TTY: /dev/pts/0</span>
          <button
            onClick={() => {
              cyberAudio.playClick();
              setLogs([]);
            }}
            className="hover:text-orange-400 transition-colors flex items-center gap-1"
            title="Clear Terminal (clear)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Content Screen (Internal scroll container ONLY) */}
      <div
        ref={terminalContainerRef}
        className="p-4 bg-black/95 font-mono text-xs sm:text-[13px] h-[320px] sm:h-[360px] overflow-y-auto space-y-2 selection:bg-orange-500 selection:text-black"
      >
        {logs.map((log) => (
          <div key={log.id} className="leading-relaxed">
            {log.type === 'ascii' && (
              <div className="p-3.5 bg-neutral-950/90 rounded border border-orange-500/40 space-y-2 mb-2 shadow-lg shadow-orange-500/10">
                <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <h3 className="font-orbitron font-black text-sm sm:text-base text-white tracking-wider uppercase">
                      HARIHARA <span className="text-orange-400">SUBRAMANIAN V</span>
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    DEFCON 1 // ROOT
                  </span>
                </div>
                <div className="font-mono text-[11px] text-neutral-300 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                    <span className="text-neutral-400">
                      NODE: <strong className="text-white">VIT VELLORE IT</strong> • ROBOTICS & EMBEDDED IoT WORKSPACE
                    </span>
                    <span className="text-orange-400 font-bold text-[10px]">SSH PORT: 22</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    Type <span className="text-emerald-400 font-bold">'help'</span> for tactical commands or click quick action pills below.
                  </div>
                </div>
              </div>
            )}

            {log.type === 'input' && (
              <div className="text-orange-300 font-bold flex items-center gap-1.5">
                <span className="text-emerald-400">➜</span> {log.text}
              </div>
            )}

            {log.type === 'output' && (
              <pre className="text-neutral-300 whitespace-pre-wrap pl-3 border-l-2 border-orange-500/30">
                {log.text}
              </pre>
            )}

            {log.type === 'system' && (
              <div className="text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20 font-bold">
                [SYSTEM LOG] {log.text}
              </div>
            )}

            {log.type === 'success' && (
              <div className="text-emerald-400 pl-3 border-l-2 border-emerald-500/50">
                {log.text}
              </div>
            )}

            {log.type === 'error' && (
              <div className="text-red-400 pl-3 border-l-2 border-red-500/50">
                {log.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Action Command Chips (Star shooter removed from menu as requested!) */}
      <div className="px-4 py-2 bg-neutral-950 border-t border-neutral-800 flex flex-wrap gap-1.5 items-center text-[11px] font-mono">
        <span className="text-neutral-500">QUICK CMDS:</span>
        {[
          { label: 'help', cmd: 'help' },
          { label: 'rf scanner', cmd: 'scanner' },
          { label: 'open gyrobot', cmd: 'open gyrobot' },
          { label: 'open ctf', cmd: 'open ctf' },
          { label: 'research', cmd: 'research' },
          { label: 'hackathons', cmd: 'hackathons' },
          { label: 'chess', cmd: 'chess' },
          { label: '90s boot', cmd: 'boot' },
          { label: 'ghost scare', cmd: 'ghost' },
          { label: 'matrix', cmd: 'matrix' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => executeChip(item.cmd)}
            className="px-2 py-0.5 rounded bg-black/60 border border-orange-500/25 text-orange-300 hover:border-orange-400 hover:bg-orange-500/20 transition-all font-mono"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal Input Line */}
      <div className="px-4 py-2.5 bg-black border-t border-orange-500/30 flex items-center gap-2 font-mono text-xs">
        <span className="text-emerald-400 font-bold hidden sm:inline">operator@defsec:~$</span>
        <span className="text-orange-400 font-bold sm:hidden">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command (e.g. 'scanner', 'open gyrobot', 'research', 'chess')..."
          className="flex-1 bg-transparent text-white font-mono focus:outline-none focus:ring-0 placeholder:text-neutral-600"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500 hover:text-black text-orange-400 rounded border border-orange-500/40 font-bold transition-all flex items-center gap-1"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">EXEC</span>
        </button>
      </div>
    </div>
  );
};
