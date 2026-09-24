import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, FileText, Search, Menu, X, Cpu } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface NavigationHUDProps {
  currentSection: number;
  onNavigate: (sectionIndex: number) => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  onHoverAction: (text?: string) => void;
}

export const NavigationHUD: React.FC<NavigationHUDProps> = ({
  currentSection,
  onNavigate,
  onOpenTerminal,
  onOpenResume,
  onOpenCommandPalette,
  onHoverAction,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(soundManager.isEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'CORE', index: 0 },
    { label: 'ABOUT', index: 1 },
    { label: 'STACK', index: 2 },
    { label: 'PROJECTS', index: 3 },
    { label: 'ARCHITECTURE', index: 4 },
    { label: 'ASK AI', index: 5 },
    { label: 'TRANSMIT', index: 6 },
  ];

  const toggleAudio = () => {
    const state = soundManager.toggle();
    setAudioEnabled(state);
    if (state) soundManager.playClick();
  };

  const handleNavClick = (idx: number) => {
    soundManager.playClick();
    onNavigate(idx);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-dark-950/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => handleNavClick(0)}
          onMouseEnter={() => {
            soundManager.playHover();
            onHoverAction('REBOOT // CORE');
          }}
          onMouseLeave={() => onHoverAction(undefined)}
        >
          <div className="w-8 h-8 rounded-lg bg-dark-900 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all">
            <Cpu className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-wider text-white group-hover:text-cyan-300 transition-colors">
              SHLOK SHARMA
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI WORLD // ONLINE</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-dark-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentSection === item.index;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.index)}
                onMouseEnter={() => {
                  soundManager.playHover();
                  onHoverAction(`GOTO // ${item.label}`);
                }}
                onMouseLeave={() => onHoverAction(undefined)}
                className={`px-3 py-1 rounded-full font-mono text-xs tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="text-cyan-500/60 mr-1">0{item.index + 1}.</span>
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Control Tools Action Bar */}
        <div className="flex items-center gap-2">
          {/* Quick Search / Command Bar */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('QUICK COMMAND [Ctrl+K]');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-dark-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 font-mono text-xs transition-colors"
            title="Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">CMD</span>
            <kbd className="text-[9px] bg-slate-800 px-1 py-0.5 rounded text-slate-300">⌘K</kbd>
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('LAUNCH CLI TERMINAL');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2 rounded-lg bg-dark-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors"
            title="Interactive CLI Terminal"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Resume Viewer */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('VIEW RESUME DOSSIER');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)]"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>RESUME</span>
          </button>

          {/* Audio FX Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction(audioEnabled ? 'MUTE AUDIO FX' : 'ENABLE AUDIO FX');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2 rounded-lg bg-dark-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors"
            title={audioEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/95 border-b border-cyan-500/20 backdrop-blur-xl px-4 py-4 mt-2 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.index)}
              className={`w-full text-left px-3 py-2 rounded-lg font-mono text-sm flex items-center justify-between ${
                currentSection === item.index
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-cyan-400 font-mono">0{item.index + 1}</span>
            </button>
          ))}
          <button
            onClick={() => {
              soundManager.playClick();
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="w-full mt-2 py-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-sm flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>VIEW RESUME DOSSIER</span>
          </button>
        </div>
      )}
    </header>
  );
};
