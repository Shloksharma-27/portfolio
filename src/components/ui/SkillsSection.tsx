import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Cpu, Code2, Layers, Database, Sparkles, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { NeuralStack3D } from '../3d/NeuralStack3D';
import { soundManager } from '../../utils/audio';

interface SkillsSectionProps {
  onHoverAction: (text?: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onHoverAction }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    level: string;
    category: string;
    description: string;
  }>({
    name: 'Python',
    level: 'Advanced',
    category: 'Programming Languages',
    description: 'Core language for Machine Learning pipelines, Pandas/NumPy preprocessing, and voice assistant logic.',
  });

  const categories = [
    { label: 'All', icon: Sparkles },
    { label: 'Programming Languages', icon: Code2 },
    { label: 'Data & Machine Learning', icon: Cpu },
    { label: 'Web & Full-Stack', icon: Layers },
    { label: 'Databases & Tools', icon: Database },
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-cyan-500/30">
          <Cpu className="w-3.5 h-3.5" />
          <span>// 03. NEURAL STACK // INTERACTIVE 3D KNOWLEDGE GRAPH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          AI & ENGINEERING STACK
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-2">
          An interactive 3D constellation of technologies mastered through production projects, internships, and university coursework. Rotate, zoom, or select nodes to inspect details.
        </p>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat.label);
              }}
              onMouseEnter={() => {
                soundManager.playHover();
                onHoverAction(`FILTER // ${cat.label}`);
              }}
              onMouseLeave={() => onHoverAction(undefined)}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs tracking-wider transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                  : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main 3D Graph & Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 3D Neural Constellation Canvas */}
        <div className="lg:col-span-8 h-[450px] sm:h-[550px] rounded-2xl bg-dark-950/90 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Canvas HUD Overlay */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none font-mono text-[11px] text-cyan-400 flex items-center gap-2 bg-dark-900/80 px-2.5 py-1 rounded border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>3D ROTATION: DRAG / ZOOM TO EXPLORE</span>
          </div>

          <Canvas
            camera={{ position: [0, 0, 7.5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
            <pointLight position={[-5, -5, -5]} intensity={1.0} color="#8b5cf6" />
            <NeuralStack3D
              activeCategory={selectedCategory}
              onSelectSkill={(s) => {
                soundManager.playBeep();
                setSelectedSkill(s);
              }}
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3.5}
              maxDistance={12}
              autoRotate={false}
              rotateSpeed={0.6}
            />
          </Canvas>
        </div>

        {/* Right Column: Node Inspector & Full Skills Pill Deck */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          {/* Active Node Inspector Card */}
          <div className="p-5 rounded-2xl bg-dark-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span>NODE INSPECTOR</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[10px]">
                {selectedSkill.level}
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-1">
              {selectedSkill.name}
            </h3>
            <div className="text-xs font-mono text-cyan-400/80 mb-3">
              CATEGORY: {selectedSkill.category}
            </div>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
              {selectedSkill.description}
            </p>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>VERIFIED IN PRODUCTION REPO / RESUME</span>
            </div>
          </div>

          {/* Quick Skill Deck Selector */}
          <div className="p-5 rounded-2xl bg-dark-900/60 border border-slate-800 backdrop-blur-md flex-1 flex flex-col">
            <h4 className="font-mono text-xs text-slate-400 mb-3 tracking-wider uppercase">
              QUICK NODE SELECTOR
            </h4>
            <div className="flex flex-wrap gap-1.5 overflow-y-auto max-h-56 pr-1 custom-scroll">
              {PORTFOLIO_DATA.skills.flatMap((cat) => cat.skills).map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => {
                      soundManager.playBeep();
                      setSelectedSkill(skill);
                    }}
                    onMouseEnter={() => {
                      soundManager.playHover();
                      onHoverAction(`INSPECT // ${skill.name}`);
                    }}
                    onMouseLeave={() => onHoverAction(undefined)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-dark-950 font-bold shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                        : 'bg-dark-950/70 text-slate-300 border border-slate-800 hover:border-cyan-500/40'
                    }`}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
