import React, { useState } from 'react';
import { GraduationCap, Briefcase, Award, MapPin, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface AboutSectionProps {
  onHoverAction: (text?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onHoverAction }) => {
  const { personalInfo, education, experiences, certifications, achievements } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'achievements'>('experience');

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="mb-14 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-cyan-500/30">
          <User className="w-3.5 h-3.5" />
          <span>// 02. SYSTEM DOSSIER // IDENTITY & JOURNEY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          WHO AM I?
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-2">
          An AI-focused Computer Science engineer driven by building high-performance machine learning pipelines, production full-stack systems, and robust web architectures.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Identity Core & Quick Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <div
            className="p-6 rounded-2xl bg-dark-900/80 border border-cyan-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all"
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('INSPECT IDENTITY CORE');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600" />

            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-cyan-400 tracking-wider">
                CORE STATUS: ACTIVE
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                CLASS OF 2027
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-white mb-1">
              {personalInfo.name}
            </h3>
            <p className="text-sm font-mono text-cyan-400 mb-4">
              {personalInfo.title}
            </p>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
              {personalInfo.summary}
            </p>

            <div className="space-y-2.5 pt-4 border-t border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-emerald-300">{personalInfo.status}</span>
              </div>
            </div>
          </div>

          {/* Key Focus Highlights */}
          <div className="p-5 rounded-2xl bg-dark-900/60 border border-slate-800 backdrop-blur-md">
            <h4 className="font-mono text-xs text-cyan-400 mb-3 tracking-wider uppercase">
              ENGINEERING FOCUS MATRIX
            </h4>
            <div className="space-y-2">
              {[
                { title: 'Machine Learning Pipelines', desc: 'Feature engineering, outlier detection, data preprocessing in Python' },
                { title: 'Full-Stack Web Systems', desc: 'React, Next.js 14, Node.js, Express, MongoDB, Socket.IO' },
                { title: 'System Security & Auth', desc: 'JWT token signing, role-based access control, PIN distribution' },
                { title: 'Business Intelligence', desc: 'Power BI dashboards, DAX measure modeling, interactive Plotly.js visuals' },
              ].map((item) => (
                <div key={item.title} className="p-2.5 rounded-lg bg-dark-950/60 border border-slate-850">
                  <div className="text-xs font-semibold text-white font-display flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Experience, Education & Achievements Dossier */}
        <div className="lg:col-span-8 space-y-6">
          {/* Navigation Dossier Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-dark-900/80 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('experience');
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'experience'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>INTERNSHIPS ({experiences.length})</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('education');
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>ACADEMICS</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setActiveTab('achievements');
              }}
              className={`flex-1 py-2 px-3 rounded-lg font-mono text-xs tracking-wider transition-all flex items-center justify-center gap-2 ${
                activeTab === 'achievements'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>ACHIEVEMENTS</span>
            </button>
          </div>

          {/* TAB 1: WORK EXPERIENCES */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/30 backdrop-blur-md transition-all group"
                  onMouseEnter={() => {
                    soundManager.playHover();
                    onHoverAction(`INSPECT // ${exp.company}`);
                  }}
                  onMouseLeave={() => onHoverAction(undefined)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h4 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h4>
                      <div className="text-sm font-mono text-cyan-400 flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400 text-xs">{exp.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-400 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 my-3 text-sm text-slate-300 font-sans">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded font-mono text-[11px] bg-cyan-950/50 border border-cyan-500/20 text-cyan-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-dark-900/70 border border-slate-800 hover:border-cyan-500/30 backdrop-blur-md transition-all group"
                  onMouseEnter={() => soundManager.playHover()}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h4 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <div className="text-sm font-mono text-slate-300">
                        {edu.institution}, {edu.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-cyan-400 font-bold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-500/30">
                        {edu.grade}
                      </span>
                      <span className="font-mono text-xs text-slate-400 px-2 py-1 rounded bg-slate-800">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1 mt-3 text-xs sm:text-sm text-slate-300 font-sans">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: ACHIEVEMENTS & CERTIFICATIONS */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              {/* Achievements */}
              <div className="p-5 rounded-2xl bg-dark-900/70 border border-slate-800 backdrop-blur-md">
                <h4 className="font-mono text-xs text-cyan-400 mb-3 tracking-wider uppercase">
                  COMPETITIVE & ENGINEERING MILESTONES
                </h4>
                <div className="space-y-3">
                  {achievements.map((ach, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-dark-950/60 border border-slate-850">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white font-display">
                          {ach.title}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400">
                          {ach.date}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mb-1">
                        {ach.event} • {ach.location}
                      </div>
                      <p className="text-xs text-slate-300 font-sans">
                        {ach.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="p-5 rounded-2xl bg-dark-900/70 border border-slate-800 backdrop-blur-md">
                <h4 className="font-mono text-xs text-cyan-400 mb-3 tracking-wider uppercase">
                  PROFESSIONAL CERTIFICATIONS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-dark-950/60 border border-slate-850 flex items-center gap-3">
                      <Award className="w-6 h-6 text-purple-400 shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white font-display">
                          {cert.title}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
