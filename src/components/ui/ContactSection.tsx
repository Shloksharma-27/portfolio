import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Copy, Github, Linkedin, ExternalLink, Sparkles, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface ContactSectionProps {
  onHoverAction: (text?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onHoverAction }) => {
  const { personalInfo } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundManager.playBeep();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundManager.playBeep();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#8b5cf6', '#3b82f6', '#10b981'],
    });

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="mb-14 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-cyan-500/30">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>// 07. TRANSMISSION // ESTABLISH CONNECTION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          TRANSMIT A MESSAGE
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mt-2">
          Seeking full-time roles, software engineering internships, or collaborative AI development projects. Connect via direct transmission or communication coordinates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Communication Coordinates */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card */}
          <div
            className="p-5 rounded-2xl bg-dark-900/80 border border-cyan-500/30 backdrop-blur-xl group hover:border-cyan-400 transition-all flex items-center justify-between"
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('DIRECT EMAIL CHANNEL');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">
                  PRIMARY INBOX
                </div>
                <div className="text-sm font-semibold font-mono text-white select-text">
                  {personalInfo.email}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-dark-950 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
              title="Copy Email Address"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="p-5 rounded-2xl bg-dark-900/80 border border-slate-800 backdrop-blur-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                TELEPHONY COORDINATE
              </div>
              <div className="text-sm font-semibold font-mono text-white select-text">
                {personalInfo.phone}
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-5 rounded-2xl bg-dark-900/80 border border-slate-800 backdrop-blur-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">
                GEOGRAPHIC BASE
              </div>
              <div className="text-sm font-semibold font-sans text-white">
                {personalInfo.location}
              </div>
            </div>
          </div>

          {/* Social Hub Links */}
          <div className="p-5 rounded-2xl bg-dark-900/60 border border-slate-800 backdrop-blur-md">
            <div className="font-mono text-xs text-slate-400 uppercase mb-3">
              EXTERNAL NETWORKS
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  soundManager.playHover();
                  onHoverAction('OPEN GITHUB PROFILE');
                }}
                onMouseLeave={() => onHoverAction(undefined)}
                className="p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-2 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  soundManager.playHover();
                  onHoverAction('OPEN LINKEDIN PROFILE');
                }}
                onMouseLeave={() => onHoverAction(undefined)}
                className="p-3 rounded-xl bg-dark-950 border border-slate-800 hover:border-cyan-500/50 flex items-center gap-2 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Transmission Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-dark-900/90 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-mono text-xs text-cyan-400">
                COMPOSE ENCRYPTED TRANSMISSION
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                NODE: SHLOK_INBOX
              </span>
            </div>

            {isSent && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>TRANSMISSION DISPATCHED SUCCESSFULLY! ACKNOWLEDGEMENT GENERATED.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">
                  SENDER NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-dark-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-400 mb-1">
                  RETURN FREQUENCY (EMAIL) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@company.com"
                  className="w-full bg-dark-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors font-sans"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1">
                SUBJECT / MISSION DIRECTIVE
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Software Engineering Opportunity / AI Project"
                className="w-full bg-dark-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors font-sans"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-slate-400 mb-1">
                TRANSMISSION PAYLOAD *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="State your proposition, project timeline, or role requirements..."
                className="w-full bg-dark-950 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors font-sans custom-scroll"
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => {
                soundManager.playHover();
                onHoverAction('TRANSMIT MESSAGE NOW');
              }}
              onMouseLeave={() => onHoverAction(undefined)}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-mono text-sm font-bold tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" />
              <span>[ TRANSMIT ENCRYPTED PAYLOAD ]</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
