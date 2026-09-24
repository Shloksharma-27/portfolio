import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Terminal, CornerDownLeft, RefreshCw, UserCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { soundManager } from '../../utils/audio';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AskPortfolioAIProps {
  onHoverAction: (text?: string) => void;
}

export const AskPortfolioAI: React.FC<AskPortfolioAIProps> = ({ onHoverAction }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: "Greetings. I am Shlok's Portfolio AI Agent, grounded in verified resume credentials and engineering specifications. Ask me about Shlok's ML pipelines, full-stack projects, internships, or contact details.",
      timestamp: '00:00:01',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "What does Shlok specialize in?",
    "Tell me about his flagship AI project.",
    "What internships has Shlok completed?",
    "Which technologies are in his AI stack?",
    "How can I contact or hire Shlok?",
    "Tell me about TenderTrace's architecture.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Knowledge retrieval engine
  const findAnswer = (query: string): string => {
    const q = query.toLowerCase();

    // Scan knowledge base
    for (const item of PORTFOLIO_DATA.knowledgeBase) {
      if (item.keywords.some((kw) => q.includes(kw))) {
        return item.answer;
      }
    }

    // Specific matchers
    if (q.includes('agrinova')) {
      return "AgriNova is Shlok's 20-section AI-powered Agri-Tech platform built with Next.js 14 App Router, TypeScript, and Tailwind CSS. It features AI crop recommendation and plant disease detection previews, interactive yield charts, and a WCAG-accessible design system.";
    }

    if (q.includes('tendertrace') || q.includes('tender')) {
      return "TenderTrace is a full-stack Government Tender & Site Management platform with a React + Vite dashboard and an Express.js/MongoDB REST API. It features JWT authentication with RBAC, PIN-secured credentials, real-time attendance tracking, labor productivity scoring, and Socket.IO live updates.";
    }

    if (q.includes('retail') || q.includes('sales') || q.includes('bi')) {
      return "Shlok built an end-to-end Retail Sales Intelligence project analyzing 12,000+ transactions (INR 8.07 Cr in sales) across 5 regions. It utilizes a modular Python (Pandas/NumPy) pipeline with 8 calculated fields, a two-page Power BI dashboard, and interactive Plotly.js charts.";
    }

    if (q.includes('gpa') || q.includes('college') || q.includes('university') || q.includes('kcc')) {
      return "Shlok is pursuing B.Tech in CSE at KCC Institute of Technology & Management, Greater Noida (6th semester, GPA 7.566, graduating 2027).";
    }

    // Default grounded fallback
    return `Based on Shlok Sharma's verified resume: Shlok is an AI Engineer and Full-Stack Developer with 3 internships (Unified Mentor, Codomax Digital Solutions, Synent Technology) and 8+ end-to-end projects. He is proficient in Python, React, Next.js, Node.js, Express, MongoDB, SQL, and Data/ML pipelines. Reach him directly at shlokrahul1@gmail.com.`;
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    soundManager.playTerminalKey();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Append user message
    const userMsg: Message = { sender: 'user', text: query, timestamp: timeStr };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI synthesis
    setTimeout(() => {
      soundManager.playBeep();
      const answer = findAnswer(query);
      const assistantMsg: Message = {
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-purple-400 mb-2 px-3 py-1 rounded-full bg-dark-900/80 border border-purple-500/30">
          <Bot className="w-3.5 h-3.5" />
          <span>// 06. SYSTEM INTELLIGENCE // ASK MY PORTFOLIO</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
          ASK PORTFOLIO AI
        </h2>
        <p className="text-slate-400 font-sans text-sm sm:text-base max-w-2xl mx-auto mt-2">
          An interactive AI terminal trained strictly on Shlok's engineering specifications, technical stack, internships, and verified credentials with zero hallucination.
        </p>
      </div>

      {/* Holographic Assistant Terminal Container */}
      <div className="rounded-2xl bg-dark-900/90 border border-purple-500/30 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="px-5 py-3.5 bg-dark-950/90 border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="font-mono text-xs text-purple-300 ml-2 font-semibold">
              AGENT // SHLOK_V1.0_KNOWLEDGE_BASE
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-purple-400">
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GROUND TRUTH: VERIFIED RESUME</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="p-5 h-[380px] overflow-y-auto space-y-4 custom-scroll font-sans text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-slate-500">[{m.timestamp}]</span>
                <span className={`font-mono text-[11px] font-bold ${
                  m.sender === 'user' ? 'text-cyan-400' : 'text-purple-400'
                }`}>
                  {m.sender === 'user' ? 'GUEST // QUERY' : 'AI CORE // RESPONSE'}
                </span>
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl leading-relaxed text-slate-200 ${
                  m.sender === 'user'
                    ? 'bg-cyan-950/60 border border-cyan-500/30 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'bg-dark-950/80 border border-purple-500/20 text-slate-200'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>RETRIEVING SPECIFICATIONS FROM EMBEDDINGS...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-5 py-3 bg-dark-950/60 border-t border-slate-800 flex items-center gap-2 overflow-x-auto custom-scroll">
          <span className="font-mono text-[10px] text-slate-500 uppercase shrink-0">
            PROMPTS:
          </span>
          {samplePrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              onMouseEnter={() => soundManager.playHover()}
              className="px-3 py-1 rounded-full bg-dark-900 border border-purple-500/20 hover:border-purple-400 text-slate-300 hover:text-purple-300 font-mono text-xs whitespace-nowrap transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Interactive Query Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-dark-950/90 border-t border-purple-500/20 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about Shlok's projects, ML experience, tech stack, or contact..."
            className="flex-1 bg-dark-900 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 font-sans text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            onMouseEnter={() => {
              soundManager.playHover();
              onHoverAction('TRANSMIT QUERY TO AI');
            }}
            onMouseLeave={() => onHoverAction(undefined)}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white font-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] shrink-0"
          >
            <span>TRANSMIT</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};
