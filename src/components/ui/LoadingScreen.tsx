import React, { useState, useEffect } from 'react';
import { soundManager } from '../../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const steps = [
    'INITIALIZING NEURAL CORE...',
    'INDEXING KNOWLEDGE BASE...',
    'CALIBRATING 3D NEURAL STACK...',
    'COMPILING PROJECT ARCHITECTURES...',
    'SYSTEM READY',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const nextVal = Math.min(prev + increment, 100);

        // Update step text based on progress
        const stepIndex = Math.min(
          Math.floor((nextVal / 100) * steps.length),
          steps.length - 1
        );
        setCurrentStep(stepIndex);

        if (nextVal % 20 === 0) {
          soundManager.playBeep();
        }

        return nextVal;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [steps.length]);

  useEffect(() => {
    if (progress === 100) {
      soundManager.playBeep();
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  const handleSkip = () => {
    soundManager.playClick();
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b14] text-slate-100 transition-opacity duration-500 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Central Holographic Spinner */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="w-28 h-28 rounded-full border border-cyan-500/30 animate-spin-slow" />
        <div className="absolute w-20 h-20 rounded-full border border-dashed border-cyan-400 animate-spin-reverse" />
        
        {/* Glowing Center Core */}
        <div className="absolute w-10 h-10 rounded-full bg-cyan-400/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.6)] animate-pulse">
          <div className="w-3 h-3 rounded-full bg-cyan-300" />
        </div>
      </div>

      {/* Title & Brand */}
      <div className="text-center mb-6 z-10 px-4">
        <div className="font-mono text-xs tracking-widest text-cyan-400 mb-1">
          SHLOK SHARMA // DIGITAL WORLD
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
          AI SYSTEM ONLINE
        </h1>
      </div>

      {/* Terminal Step Status */}
      <div className="w-72 sm:w-80 font-mono text-xs text-slate-300 z-10 mb-3 flex items-center justify-between">
        <span className="text-cyan-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          {steps[currentStep]}
        </span>
        <span className="text-slate-400 font-bold">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-72 sm:w-80 h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-cyan-500/30 z-10">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-75 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="mt-8 font-mono text-xs text-slate-400 hover:text-cyan-300 px-4 py-1.5 rounded border border-slate-800 hover:border-cyan-500/50 transition-colors z-10 bg-dark-900/50 backdrop-blur-sm"
      >
        [ SKIP INITIALIZATION → ]
      </button>
    </div>
  );
};
