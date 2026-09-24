import React from 'react';
import { Terminal, Github, Linkedin, Mail, ExternalLink, ArrowDown, Sparkles, Network, Database } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  onNavigateToArchitecture: () => void;
  onNavigateToAskAI: () => void;
  onHoverAction: (text?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onOpenResume,
  onOpenTerminal,
  onNavigateToArchitecture,
  onNavigateToAskAI,
  onHoverAction,
}) => {
  const { personalInfo } = PORTFOLIO_DATA;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12 select-none">
      {/* Background radial gradient mask for focus */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/40 to-[#070b14] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* System Status Pill */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-glow-pulse"
          onMouseEnter={() => {
            soundManager.playHover();
            onHoverAction('SYSTEM STATUS // ACTIVE');
          }}
          onMouseLeave={() => onHoverAction(undefined)}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="tracking-wider">AI SYSTEM ARCHITECT // GRADUATING 2027</span>
        </div>

        {/* Main Name Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            {personalInfo.name.toUpperCase()}
          </span>
        </h1>

        {/* Subtitle & Role */}
        <div className="text-lg sm:text-2xl font-display font-medium text-cyan-400 mb-4 tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span>AI ENGINEER</span>
          <span className="text-slate-600">•</span>
          <span>FULL-STACK DEVELOPER</span>
          <span className="text-slate-600">•</span>
          <span>MACHINE LEARNING</span>
        </div>

        {/* Tagline Statement strictly from resume */}
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-sans font-light leading-relaxed mb-8">
          "{personalInfo.subtitle}"
        </p>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mb-10">
          {personalInfo.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-xl bg-dark-900/60 border border-slate-800 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 group text-left"
              onMouseEnter={() => soundManager.playHover()}
            >
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 group-hover:glow-text-cyan">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <button
            onClick={() => {
              soundManager.playClick();
              onExplore();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('INITIALIZE EXPEDITION');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-mono text-xs sm:text-sm font-bold tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>[ EXPLORE DIGITAL WORLD ]</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigateToArchitecture();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('INSPECT 3D PIPELINES');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="px-5 py-3 rounded-xl bg-dark-900/80 hover:bg-dark-850 text-slate-200 hover:text-cyan-300 font-mono text-xs sm:text-sm font-semibold tracking-wider border border-slate-800 hover:border-cyan-500/50 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Network className="w-4 h-4 text-cyan-400" />
            <span>3D ARCHITECTURE</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigateToAskAI();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('QUERY PORTFOLIO AI');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 hover:from-purple-900/70 hover:to-indigo-900/70 text-purple-200 font-mono text-xs sm:text-sm font-semibold tracking-wider border border-purple-500/30 hover:border-purple-400 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <Database className="w-4 h-4 text-purple-400" />
            <span>ASK PORTFOLIO AI</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('INSPECT RESUME DOSSIER');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="px-4 py-3 rounded-xl bg-dark-900/80 hover:bg-dark-850 text-slate-300 hover:text-white font-mono text-xs sm:text-sm tracking-wider border border-slate-800 hover:border-slate-700 backdrop-blur-md transition-all flex items-center gap-1.5"
          >
            <span>[ RESUME ]</span>
          </button>
        </div>

        {/* Social & System Direct Channels */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('GITHUB // Shloksharma-27');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2.5 rounded-xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all hover:scale-110"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('LINKEDIN PROFILE');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2.5 rounded-xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all hover:scale-110"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction(`TRANSMIT // ${personalInfo.email}`);
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2.5 rounded-xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all hover:scale-110"
            title="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.streamlitApp}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('LIVE STREAMLIT APP');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2.5 rounded-xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all hover:scale-110 flex items-center gap-1 text-xs font-mono"
            title="Streamlit Live Deployment"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminal();
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('LAUNCH TERMINAL');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="p-2.5 rounded-xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-300 transition-all hover:scale-110"
            title="Open CLI"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

        {/* Scroll indicator prompt */}
        <div
          onClick={onExplore}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
            SCROLL TO ENTER DIGITAL ENVIRONMENT
          </span>
          <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
