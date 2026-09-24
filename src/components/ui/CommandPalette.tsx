import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, Terminal, FileText, FolderGit2, Network, User, Mail, Github, Linkedin, ExternalLink, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionIndex: number) => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenTerminal,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    {
      id: 'core',
      title: 'Jump to AI Core // Hero',
      category: 'Navigation',
      icon: Sparkles,
      action: () => onNavigate(0),
    },
    {
      id: 'about',
      title: 'Jump to System Dossier // About',
      category: 'Navigation',
      icon: User,
      action: () => onNavigate(1),
    },
    {
      id: 'stack',
      title: 'Jump to 3D Neural Stack // Skills',
      category: 'Navigation',
      icon: Sparkles,
      action: () => onNavigate(2),
    },
    {
      id: 'projects',
      title: 'Jump to 3D Projects Gallery',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => onNavigate(3),
    },
    {
      id: 'architecture',
      title: 'Jump to 3D System Architecture',
      category: 'Navigation',
      icon: Network,
      action: () => onNavigate(4),
    },
    {
      id: 'ask-ai',
      title: 'Jump to Ask Portfolio AI Assistant',
      category: 'Navigation',
      icon: Terminal,
      action: () => onNavigate(5),
    },
    {
      id: 'transmit',
      title: 'Jump to Contact & Transmission',
      category: 'Navigation',
      icon: Mail,
      action: () => onNavigate(6),
    },
    {
      id: 'terminal',
      title: 'Launch Interactive CLI Terminal',
      category: 'Tools',
      icon: Terminal,
      action: () => onOpenTerminal(),
    },
    {
      id: 'resume',
      title: 'View Resume Dossier (Printable / PDF)',
      category: 'Documents',
      icon: FileText,
      action: () => onOpenResume(),
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (Shloksharma-27)',
      category: 'External',
      icon: Github,
      action: () => window.open(PORTFOLIO_DATA.personalInfo.github, '_blank'),
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: Linkedin,
      action: () => window.open(PORTFOLIO_DATA.personalInfo.linkedin, '_blank'),
    },
    {
      id: 'streamlit',
      title: 'Open Live Streamlit App (EduPro)',
      category: 'External',
      icon: ExternalLink,
      action: () => window.open(PORTFOLIO_DATA.personalInfo.streamlitApp, '_blank'),
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          soundManager.playBeep();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      soundManager.playHover();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      soundManager.playHover();
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      soundManager.playClick();
      filtered[selectedIndex].action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-dark-950/80 backdrop-blur-md">
      <div className="max-w-xl w-full bg-dark-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-dark-950/90">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump target..."
            className="flex-1 bg-transparent text-white placeholder:text-slate-500 font-mono text-sm outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filtered Action List */}
        <div className="p-2 max-h-80 overflow-y-auto custom-scroll space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-slate-500">
              NO COMMAND MATCH FOUND
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSel = idx === selectedIndex;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundManager.playClick();
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSel
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSel ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="font-mono text-xs font-semibold">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-dark-950 text-slate-400 border border-slate-800">
                    {item.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-dark-950 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span>Navigate: ↑ ↓ • Select: ↵</span>
          <span>Close: ESC</span>
        </div>
      </div>
    </div>
  );
};
