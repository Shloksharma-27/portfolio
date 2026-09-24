import React, { useState } from 'react';
import { Github, ExternalLink, Sparkles, FolderGit2, Network, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import type { ProjectData } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface ProjectsSectionProps {
  onSelectProjectArchitecture: (project: ProjectData) => void;
  onHoverAction: (text?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProjectArchitecture,
  onHoverAction,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectData | null>(null);

  const categories = [
    'All',
    'AI & Machine Learning',
    'Full-Stack & Systems',
    'Data Analytics & BI',
    'Creative Web',
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-cyan-500/30">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>// 04. 3D PROJECT GALLERY // VERIFIED SYSTEMS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          ENGINEERED SYSTEMS & DEMOS
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-2">
          End-to-end production systems spanning Machine Learning architectures, full-stack enterprise portals, business intelligence engines, and high-performance creative web interfaces.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playClick();
              setActiveCategory(cat);
            }}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction(`FILTER // ${cat}`);
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className={`px-4 py-2 rounded-xl font-mono text-xs tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                : 'bg-dark-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isFeatured = project.isFeatured;
          return (
            <div
              key={project.id}
              className={`p-6 rounded-2xl bg-dark-900/80 border transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl hover:-translate-y-1.5 shadow-xl ${
                isFeatured
                  ? 'border-cyan-500/50 shadow-[0_0_25px_rgba(0,240,255,0.15)] md:col-span-2 lg:col-span-2'
                  : 'border-slate-800 hover:border-cyan-500/40'
              }`}
              onMouseEnter={() => {
                soundManager.playHover();
                onHoverAction(`EXPLORE // ${project.title}`);
              }}
              onMouseLeave={() => onHoverAction(undefined)}
            >
              <div>
                {/* Top Status & Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded bg-dark-950 border border-slate-700 text-slate-300">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isFeatured && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        FLAGSHIP
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-cyan-400/80 px-2 py-0.5 rounded bg-dark-950 border border-cyan-500/20">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {project.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400/90 mb-3">
                  {project.subtitle}
                </div>

                {/* Description */}
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Impact Metrics */}
                <div className="space-y-1 mb-5">
                  {project.impactMetrics.slice(0, isFeatured ? 4 : 3).map((metric, mIdx) => (
                    <div key={mIdx} className="text-[11px] font-sans text-slate-400 flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">▹</span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800 mb-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded font-mono text-[10px] bg-dark-950 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {project.architectureNodes && (
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onSelectProjectArchitecture(project);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/40 font-mono text-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.15)]"
                    >
                      <Network className="w-3.5 h-3.5" />
                      <span>3D ARCHITECTURE</span>
                    </button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-dark-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-mono text-xs flex items-center gap-1.5 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-dark-950 font-bold font-mono text-xs flex items-center gap-1 transition-all"
                      title="Launch Live Application"
                    >
                      <span>LIVE DEMO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedProjectForModal(project);
                    }}
                    className="p-1.5 rounded-lg bg-dark-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 ml-auto transition-colors"
                    title="View Extended System Specs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Project Details Modal */}
      {selectedProjectForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-dark-900 border border-cyan-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-cyan-400">
                SYSTEM SPECIFICATIONS // {selectedProjectForModal.title.toUpperCase()}
              </span>
              <button
                onClick={() => setSelectedProjectForModal(null)}
                className="font-mono text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                [ CLOSE ✕ ]
              </button>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-1">
              {selectedProjectForModal.title}
            </h3>
            <p className="text-sm font-mono text-cyan-400 mb-4">
              {selectedProjectForModal.subtitle}
            </p>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-4">
              {selectedProjectForModal.description}
            </p>

            <div className="mb-4">
              <div className="font-mono text-xs text-slate-400 uppercase mb-2">
                VERIFIED ARCHITECTURE HIGHLIGHTS
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {selectedProjectForModal.impactMetrics.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400">▸</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              {selectedProjectForModal.architectureNodes && (
                <button
                  onClick={() => {
                    const p = selectedProjectForModal;
                    setSelectedProjectForModal(null);
                    onSelectProjectArchitecture(p);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-dark-950 font-mono text-xs font-bold flex items-center gap-2"
                >
                  <Network className="w-4 h-4" />
                  <span>INSPECT IN 3D PIPELINE</span>
                </button>
              )}
              {selectedProjectForModal.githubUrl && (
                <a
                  href={selectedProjectForModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GITHUB REPO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
