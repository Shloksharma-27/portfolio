import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Network, Play, ShieldAlert, Cpu, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import type { ProjectData, ProjectArchitectureNode } from '../../data/portfolio';
import { ArchitecturePipeline3D } from '../3d/ArchitecturePipeline3D';
import { soundManager } from '../../utils/audio';

interface ArchitectureSectionProps {
  selectedProject?: ProjectData;
  onHoverAction: (text?: string) => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({
  selectedProject,
  onHoverAction,
}) => {
  // Available projects with 3D architecture
  const architectureProjects = PORTFOLIO_DATA.projects.filter(
    (p) => p.architectureNodes && p.architectureNodes.length > 0
  );

  const [currentProject, setCurrentProject] = useState<ProjectData>(
    selectedProject || architectureProjects[0]
  );

  const [activeNode, setActiveNode] = useState<ProjectArchitectureNode>(
    currentProject.architectureNodes![0]
  );

  const handleSelectProject = (p: ProjectData) => {
    soundManager.playClick();
    setCurrentProject(p);
    if (p.architectureNodes && p.architectureNodes.length > 0) {
      setActiveNode(p.architectureNodes[0]);
    }
  };

  const handleSelectNode = (node: ProjectArchitectureNode) => {
    soundManager.playBeep();
    setActiveNode(node);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-cyan-500/30">
          <Network className="w-3.5 h-3.5" />
          <span>// 05. 3D SYSTEM ARCHITECTURE // DATA FLOW PIPELINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          SYSTEM ARCHITECTURES IN 3D
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-2">
          Interactive real-time 3D pipelines visualizing data flow, authentication barriers, machine learning inference nodes, and reactive state updates across engineered systems.
        </p>
      </div>

      {/* Architecture System Selector Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {architectureProjects.map((proj) => {
          const isSelected = currentProject.id === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(proj)}
              onMouseEnter={() => {
                soundManager.playHover();
                onHoverAction(`ARCHITECTURE // ${proj.title}`);
              }}
              onMouseLeave={() => onHoverAction(undefined)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>{proj.title}</span>
              <span className="text-[10px] text-slate-500 font-mono">({proj.architectureNodes?.length} NODES)</span>
            </button>
          );
        })}
      </div>

      {/* Main 3D Pipeline Canvas Viewport */}
      <div className="rounded-2xl bg-dark-950/90 border border-cyan-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl mb-6">
        {/* Top HUD bar */}
        <div className="p-4 border-b border-slate-800 bg-dark-900/70 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-cyan-400 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE SYSTEM: {currentProject.title.toUpperCase()}</span>
            </div>
            <div className="text-sm font-display text-white font-semibold">
              {currentProject.subtitle}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="px-2 py-1 rounded bg-dark-950 border border-slate-800">
              DATA PACKETS: ACTIVE (4 STREAM)
            </span>
            <span className="px-2 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
              CLICK NODES IN 3D TO INSPECT
            </span>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="h-[420px] sm:h-[480px] relative">
          <Canvas
            camera={{ position: [0, 0.5, 6.8], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.7} />
            <pointLight position={[0, 4, 4]} intensity={2} color="#00f0ff" />
            <pointLight position={[0, -4, 4]} intensity={1} color="#8b5cf6" />
            <ArchitecturePipeline3D
              nodes={currentProject.architectureNodes!}
              activeNodeId={activeNode.id}
              onSelectNode={handleSelectNode}
              accentColor={currentProject.color || '#00f0ff'}
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={3.5}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>

        {/* Pipeline Step Sequence Footer */}
        <div className="p-4 bg-dark-900/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto custom-scroll">
          {currentProject.architectureNodes?.map((node, index) => {
            const isSelected = activeNode.id === node.id;
            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => handleSelectNode(node)}
                  className={`px-3 py-2 rounded-xl text-left whitespace-nowrap transition-all flex items-center gap-2.5 shrink-0 ${
                    isSelected
                      ? 'bg-cyan-500 text-dark-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'bg-dark-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isSelected ? 'bg-dark-950 text-cyan-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-xs font-display leading-none">{node.label}</div>
                    <div className={`text-[9px] font-mono leading-none mt-0.5 ${
                      isSelected ? 'text-dark-900' : 'text-slate-500'
                    }`}>
                      {node.type.toUpperCase()}
                    </div>
                  </div>
                </button>

                {index < currentProject.architectureNodes!.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Node Diagnostic Breakdown Card */}
      <div className="p-6 rounded-2xl bg-dark-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
              NODE DIAGNOSTIC: {activeNode.type.toUpperCase()}
            </span>
            <span className="font-mono text-xs text-slate-400">
              ID: {activeNode.id}
            </span>
          </div>
          <div className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>PIPELINE INTEGRITY: OPTIMAL</span>
          </div>
        </div>

        <h4 className="text-xl font-bold font-display text-white mb-1">
          {activeNode.label}
        </h4>
        <div className="text-sm font-mono text-cyan-400/90 mb-3">
          SUB-SUBSYSTEM: {activeNode.subLabel}
        </div>

        <p className="text-slate-300 text-sm font-sans leading-relaxed">
          {activeNode.description}
        </p>
      </div>
    </section>
  );
};
