import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface TerminalHistoryItem {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface SystemTerminalProps {
  isOpenModal?: boolean;
  onClose?: () => void;
  onOpenResume?: () => void;
  onHoverAction?: (text?: string) => void;
}

export const SystemTerminal: React.FC<SystemTerminalProps> = ({
  isOpenModal = false,
  onClose,
  onOpenResume,
  onHoverAction,
}) => {
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    { type: 'output', text: 'ANTIGRAVITY AI CORE OS [Version 2.4.0]' },
    { type: 'output', text: 'Initializing environment for SHLOK SHARMA (AI Engineer & Full-Stack Developer)...' },
    { type: 'success', text: 'Type "help" to view all available commands or "whoami" to inspect identity.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    soundManager.playTerminalKey();
    const cmd = raw.toLowerCase();

    // Add command to input history
    setCommandHistory((prev) => [...prev, raw]);
    setHistoryPointer(-1);

    const newHistory: TerminalHistoryItem[] = [
      ...history,
      { type: 'input', text: `shlok@portfolio:~$ ${raw}` },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  whoami           Display AI Engineer & Full-Stack identity
  skills           List all verified technical skills & tools
  projects         List all engineered systems & GitHub links
  experience       Display industry internships & roles
  education        Inspect university & school credentials
  stats            Show quantitative engineering metrics
  achievements     View Hackathons & certifications
  contact          Show direct email, phone & social channels
  resume           Open in-browser resume dossier
  clear            Clear the terminal screen
  matrix           Run system diagnostic matrix
  exit             Close this terminal window`,
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'success',
          text: `NAME: ${PORTFOLIO_DATA.personalInfo.name}
ROLE: ${PORTFOLIO_DATA.personalInfo.title}
INSTITUTION: KCC Institute of Technology & Management (Graduating 2027, GPA: 7.566)
LOCATION: ${PORTFOLIO_DATA.personalInfo.location}
STATUS: ${PORTFOLIO_DATA.personalInfo.status}
SUMMARY: ${PORTFOLIO_DATA.personalInfo.summary}`,
        });
        break;

      case 'skills':
        const skillsText = PORTFOLIO_DATA.skills
          .map((cat) => `\n[ ${cat.category.toUpperCase()} ]\n` + cat.skills.map((s) => `  • ${s.name} (${s.level}) - ${s.description}`).join('\n'))
          .join('\n');
        newHistory.push({ type: 'output', text: `VERIFIED TECHNICAL STACK:${skillsText}` });
        break;

      case 'projects':
        const projectsText = PORTFOLIO_DATA.projects
          .map((p, i) => `[0${i + 1}] ${p.title.toUpperCase()} (${p.category})\n    ${p.subtitle}\n    Stack: ${p.techStack.join(', ')}\n    Repo: ${p.githubUrl || 'Internal'}`)
          .join('\n\n');
        newHistory.push({ type: 'output', text: `ENGINEERED PROJECTS:${projectsText}` });
        break;

      case 'experience':
      case 'internships':
        const expText = PORTFOLIO_DATA.experiences
          .map((e) => `• ${e.role} @ ${e.company} (${e.period}, ${e.location})\n  Tags: ${e.tags.join(', ')}`)
          .join('\n\n');
        newHistory.push({ type: 'output', text: `INDUSTRY INTERNSHIPS:${expText}` });
        break;

      case 'education':
        const eduText = PORTFOLIO_DATA.education
          .map((ed) => `• ${ed.degree} - ${ed.institution} (${ed.period}) | ${ed.grade}`)
          .join('\n');
        newHistory.push({ type: 'output', text: `ACADEMIC CREDENTIALS:${eduText}` });
        break;

      case 'stats':
        const statsText = PORTFOLIO_DATA.personalInfo.stats
          .map((st) => `• ${st.label}: ${st.value}`)
          .join('\n');
        newHistory.push({ type: 'success', text: `KEY METRICS:${statsText}` });
        break;

      case 'achievements':
      case 'certifications':
        const achText = PORTFOLIO_DATA.achievements
          .map((a) => `• ${a.title} (${a.event}, ${a.date})`)
          .join('\n');
        const certText = PORTFOLIO_DATA.certifications
          .map((c) => `• ${c.title} (${c.issuer})`)
          .join('\n');
        newHistory.push({ type: 'output', text: `ACHIEVEMENTS:\n${achText}\n\nCERTIFICATIONS:\n${certText}` });
        break;

      case 'contact':
        newHistory.push({
          type: 'success',
          text: `DIRECT CHANNELS:
  Email:    ${PORTFOLIO_DATA.personalInfo.email}
  Phone:    ${PORTFOLIO_DATA.personalInfo.phone}
  Location: ${PORTFOLIO_DATA.personalInfo.location}
  GitHub:   ${PORTFOLIO_DATA.personalInfo.github}
  LinkedIn: ${PORTFOLIO_DATA.personalInfo.linkedin}
  Live App: ${PORTFOLIO_DATA.personalInfo.streamlitApp}`,
        });
        break;

      case 'resume':
      case 'download-resume':
        newHistory.push({ type: 'success', text: 'Launching Resume Dossier Viewer...' });
        onOpenResume?.();
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'matrix':
        newHistory.push({
          type: 'success',
          text: `[SYSTEM DIAGNOSTIC]
CORE: ONLINE // 100% HEALTH
WebGL ENGINE: ACTIVE
NEURAL CONNECTIONS: 34 NODES SYNCHRONIZED
AI KNOWLEDGE BASE: LOADED
ZERO HALLUCINATIONS VERIFIED`,
        });
        break;

      case 'exit':
        if (onClose) {
          onClose();
          return;
        }
        newHistory.push({ type: 'output', text: 'Terminal session active in main viewport.' });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${raw}". Type "help" to view valid commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPtr = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPtr);
        setInputVal(commandHistory[nextPtr]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyPointer !== -1) {
        const nextPtr = historyPointer + 1;
        if (nextPtr >= commandHistory.length) {
          setHistoryPointer(-1);
          setInputVal('');
        } else {
          setHistoryPointer(nextPtr);
          setInputVal(commandHistory[nextPtr]);
        }
      }
    }
  };

  const terminalBody = (
    <div className="rounded-2xl bg-dark-950/95 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-dark-900/90 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs text-cyan-300 font-semibold tracking-wider">
            SHLOK_OS // INTERACTIVE CLI
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isOpenModal && (
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal Output Body */}
      <div
        className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 custom-scroll text-slate-300 select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              item.type === 'input'
                ? 'text-cyan-400 font-bold'
                : item.type === 'error'
                ? 'text-red-400'
                : item.type === 'success'
                ? 'text-emerald-400'
                : 'text-slate-300'
            }`}
          >
            {item.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="p-3 bg-dark-900/80 border-t border-cyan-500/20 flex items-center gap-2 font-mono text-xs">
        <span className="text-cyan-400 font-bold">shlok@portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'skills', 'projects', 'whoami'..."
          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600"
          autoFocus
        />
      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
        <div className="max-w-3xl w-full">{terminalBody}</div>
      </div>
    );
  }

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 select-none">
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-cyan-500/30">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>// 06. LIVE SHELL // COMMAND LINE INTERACTION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          SYSTEM TERMINAL
        </h2>
      </div>
      {terminalBody}
    </section>
  );
};
