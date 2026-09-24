import React from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Github, Linkedin, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHoverAction: (text?: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onHoverAction }) => {
  if (!isOpen) return null;

  const { personalInfo, education, experiences, skills, projects, certifications, achievements } = PORTFOLIO_DATA;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-dark-950/85 backdrop-blur-md overflow-y-auto">
      <div className="max-w-4xl w-full bg-dark-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Modal Action Bar */}
        <div className="px-6 py-3.5 bg-dark-950 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider">
              VERIFIED RESUME DOSSIER // SHLOK SHARMA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3 py-1.5 rounded-lg bg-dark-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 font-mono text-xs flex items-center gap-1.5 transition-colors"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Content */}
        <div className="p-6 sm:p-10 overflow-y-auto custom-scroll font-sans text-slate-200 select-text space-y-6">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-1">
              {personalInfo.name}
            </h1>
            <p className="text-cyan-400 font-mono text-sm font-semibold mb-3">
              {personalInfo.title}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400" /> {personalInfo.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" /> {personalInfo.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> {personalInfo.location}
              </span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-cyan-400 hover:underline"
              >
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-cyan-400 hover:underline"
              >
                <Github className="w-3 h-3" /> GitHub
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-2 border-b border-slate-800/80 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {personalInfo.summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-3 border-b border-slate-800/80 pb-1">
              INDUSTRY EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm mb-1">
                    <div className="font-bold text-white font-display">
                      {exp.role} <span className="text-cyan-400 font-mono font-normal">· {exp.company}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {exp.period} | {exp.location}
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-3 border-b border-slate-800/80 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                  <div>
                    <div className="font-bold text-white font-display">{edu.degree}</div>
                    <div className="text-xs text-slate-400">{edu.institution}, {edu.location}</div>
                  </div>
                  <div className="text-xs font-mono text-cyan-400">
                    {edu.grade} ({edu.period})
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-3 border-b border-slate-800/80 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="space-y-2 text-xs">
              {skills.map((cat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-1">
                  <span className="font-mono text-cyan-400 font-semibold sm:w-48 shrink-0">
                    {cat.category}:
                  </span>
                  <span className="text-slate-300">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-3 border-b border-slate-800/80 pb-1">
              FEATURED PROJECTS
            </h2>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm mb-1">
                    <div className="font-bold text-white font-display flex items-center gap-2">
                      <span>{p.title}</span>
                      <span className="text-xs font-mono text-cyan-400 font-normal">({p.subtitle})</span>
                    </div>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-mono text-cyan-400 hover:underline">
                        github.com/Shloksharma-27
                      </a>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mb-1">
                    Tech Stack: {p.techStack.join(', ')}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-1">
                    {p.impactMetrics.map((m, mIdx) => (
                      <li key={mIdx} className="leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-2 border-b border-slate-800/80 pb-1">
                CERTIFICATIONS
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                {certifications.map((c, i) => (
                  <li key={i}>{c.title} – {c.issuer}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-bold font-mono text-cyan-400 tracking-wider uppercase mb-2 border-b border-slate-800/80 pb-1">
                ACHIEVEMENTS
              </h2>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                {achievements.map((a, i) => (
                  <li key={i}>{a.title} ({a.event})</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
