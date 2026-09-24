import React, { useState, useEffect, useRef } from 'react';
import { Scene3D } from './components/3d/Scene3D';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { NavigationHUD } from './components/ui/NavigationHUD';
import { HeroSection } from './components/ui/HeroSection';
import { AboutSection } from './components/ui/AboutSection';
import { SkillsSection } from './components/ui/SkillsSection';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { ArchitectureSection } from './components/ui/ArchitectureSection';
import { AskPortfolioAI } from './components/ui/AskPortfolioAI';
import { SystemTerminal } from './components/ui/SystemTerminal';
import { ContactSection } from './components/ui/ContactSection';
import { ResumeModal } from './components/ui/ResumeModal';
import { CommandPalette } from './components/ui/CommandPalette';
import { isWebGLAvailable } from './utils/webgl';
import type { ProjectData } from './data/portfolio';
import { ArrowUp, Terminal, ShieldCheck, Heart, Sparkles, Cpu } from 'lucide-react';
import { soundManager } from './utils/audio';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState<string | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Modals
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState<ProjectData | undefined>(undefined);

  // Section refs for smooth scrolling
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    // Mouse tracking for 3D parallax
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x: nx, y: ny });
    };

    // Scroll progress calculation
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? currentScroll / totalHeight : 0;
      setScrollProgress(progress);

      // Determine active section based on scroll position
      const scrollMiddle = currentScroll + window.innerHeight * 0.4;
      sectionRefs.forEach((ref, index) => {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollMiddle >= top && scrollMiddle < top + height) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (sectionRefs[index]?.current) {
      sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHoverAction = (text?: string) => {
    setCursorText(text);
    setIsHovered(!!text);
  };

  const handleSelectProjectArchitecture = (project: ProjectData) => {
    setSelectedArchProject(project);
    scrollToSection(4); // Architecture section
  };

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Cinematic Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Interactive Custom Cursor */}
      <CustomCursor cursorText={cursorText} isHovered={isHovered} />

      {/* 3D WebGL Background Scene */}
      {hasWebGL ? (
        <Scene3D
          currentSection={currentSection}
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          isCoreHovered={isHovered}
        />
      ) : (
        /* Fallback 2D Animated Grid */
        <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none z-0" />
      )}

      {/* Scanline atmospheric overlay */}
      <div className="fixed inset-0 scanlines pointer-events-none z-20 opacity-30" />

      {/* Floating System Navigation HUD */}
      <NavigationHUD
        currentSection={currentSection}
        onNavigate={scrollToSection}
        onOpenTerminal={() => setIsTerminalModalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onHoverAction={handleHoverAction}
      />

      {/* Main Continuous Journey Viewport */}
      <main className="relative z-10">
        {/* Section 0: Hero & Core */}
        <div ref={sectionRefs[0]} id="hero">
          <HeroSection
            onExplore={() => scrollToSection(1)}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenTerminal={() => setIsTerminalModalOpen(true)}
            onNavigateToArchitecture={() => scrollToSection(4)}
            onNavigateToAskAI={() => scrollToSection(5)}
            onHoverAction={handleHoverAction}
          />
        </div>

        {/* Section 1: System Dossier / About */}
        <div ref={sectionRefs[1]} id="about">
          <AboutSection onHoverAction={handleHoverAction} />
        </div>

        {/* Section 2: 3D Neural Stack / Skills */}
        <div ref={sectionRefs[2]} id="stack">
          <SkillsSection onHoverAction={handleHoverAction} />
        </div>

        {/* Section 3: 3D Projects Gallery */}
        <div ref={sectionRefs[3]} id="projects">
          <ProjectsSection
            onSelectProjectArchitecture={handleSelectProjectArchitecture}
            onHoverAction={handleHoverAction}
          />
        </div>

        {/* Section 4: 3D System Architecture Walkthrough */}
        <div ref={sectionRefs[4]} id="architecture">
          <ArchitectureSection
            selectedProject={selectedArchProject}
            onHoverAction={handleHoverAction}
          />
        </div>

        {/* Section 5: Ask Portfolio AI & System Terminal */}
        <div ref={sectionRefs[5]} id="ask-ai">
          <AskPortfolioAI onHoverAction={handleHoverAction} />
          <SystemTerminal
            isOpenModal={false}
            onOpenResume={() => setIsResumeOpen(true)}
            onHoverAction={handleHoverAction}
          />
        </div>

        {/* Section 6: Contact Transmission */}
        <div ref={sectionRefs[6]} id="contact">
          <ContactSection onHoverAction={handleHoverAction} />
        </div>
      </main>

      {/* Global Footer */}
      <footer className="relative z-20 border-t border-slate-800/80 bg-dark-950/90 py-8 px-4 sm:px-6 lg:px-8 backdrop-blur-md font-mono text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SHLOK SHARMA // DIGITAL WORLD ENGINE v2.4</span>
          </div>

          <div className="text-center sm:text-right flex items-center gap-4">
            <button
              onClick={() => {
                soundManager.playClick();
                scrollToSection(0);
              }}
              className="px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 flex items-center gap-1.5 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>RETURN TO CORE</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onHoverAction={handleHoverAction}
      />

      {isTerminalModalOpen && (
        <SystemTerminal
          isOpenModal={true}
          onClose={() => setIsTerminalModalOpen(false)}
          onOpenResume={() => {
            setIsTerminalModalOpen(false);
            setIsResumeOpen(true);
          }}
          onHoverAction={handleHoverAction}
        />
      )}

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={scrollToSection}
        onOpenTerminal={() => setIsTerminalModalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}

export default App;
