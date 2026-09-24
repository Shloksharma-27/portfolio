import React, { useEffect, useState } from 'react';
import { isMobileDevice } from '../../utils/webgl';

interface CustomCursorProps {
  cursorText?: string;
  isHovered?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorText = '', isHovered = false }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (isMobile || !visible) return null;

  const hasCustomText = !!cursorText;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer Ring */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400 transition-all duration-200 flex items-center justify-center ${
          hasCustomText
            ? 'w-24 h-24 bg-cyan-950/80 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-sm scale-100'
            : isHovered
            ? 'w-12 h-12 bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] scale-110'
            : 'w-8 h-8 border-cyan-500/50 scale-100'
        }`}
      >
        {/* Dynamic Label Text */}
        {hasCustomText && (
          <span className="font-mono text-[10px] font-bold tracking-wider text-cyan-300 px-1 text-center select-none uppercase">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Micro Dot */}
      {!hasCustomText && (
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] transition-all duration-150 ${
            isHovered ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5'
          }`}
        />
      )}
    </div>
  );
};
