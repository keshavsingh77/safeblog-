
import React from 'react';

interface BirdProps {
  top: number;
  rotation: number;
  isFlapping: boolean;
  skin?: 'classic' | 'cyber' | 'phoenix' | 'president' | 'tribal';
  hasShield?: boolean;
}

const Bird: React.FC<BirdProps> = ({ top, rotation, isFlapping, skin = 'classic', hasShield = false }) => {
  const getTheme = () => {
    switch(skin) {
      case 'cyber': return { primary: '#10b981', secondary: '#34d399', accent: '#6ee7b7', engine: '#10b981', glow: '0 0 15px #10b981' };
      case 'phoenix': return { primary: '#f97316', secondary: '#fdba74', accent: '#fff7ed', engine: '#facc15', glow: '0 0 20px #f97316' };
      case 'president': return { primary: '#1e3a8a', secondary: '#3b82f6', accent: '#ffffff', engine: '#ef4444', glow: '0 0 12px #3b82f6' };
      case 'tribal': return { primary: '#78350f', secondary: '#f59e0b', accent: '#fef3c7', engine: '#f97316', glow: '0 0 10px #78350f' };
      default: return { primary: '#facc15', secondary: '#fef08a', accent: '#ffffff', engine: '#3b82f6', glow: '0 4px 10px rgba(0,0,0,0.5)' };
    }
  };

  const theme = getTheme();

  return (
    <div 
      style={{ 
        position: 'absolute', 
        top: top, 
        left: '20%', 
        transform: `rotate(${rotation}deg)`,
        filter: `drop-shadow(${theme.glow})`,
        transition: 'transform 0.1s ease-out',
      }}
      className="z-30 w-14 h-10 flex items-center justify-center"
    >
      {/* Shield Bubble */}
      {hasShield && (
        <div className="absolute inset-[-10px] rounded-full border-2 border-blue-400/30 animate-[ping_2s_infinite] pointer-events-none">
          <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-sm"></div>
        </div>
      )}

      <svg viewBox="0 0 120 100" className="w-full h-full overflow-visible">
        {/* Engine Flare */}
        {isFlapping && (
          <path 
            d="M 10 50 L -20 35 L -10 50 L -20 65 Z" 
            fill={theme.engine} 
          >
            <animate attributeName="opacity" values="1;0.4;1" dur="0.1s" repeatCount="indefinite" />
          </path>
        )}

        {/* Main Hull */}
        <path 
          d="M 10 40 L 80 20 L 110 50 L 80 80 L 10 60 Z" 
          fill={theme.primary} 
          stroke="rgba(0,0,0,0.2)" 
          strokeWidth="2" 
        />
        
        {/* Cockpit */}
        <path 
          d="M 50 35 L 90 40 L 100 50 L 90 60 L 50 65 Z" 
          fill={theme.secondary} 
          opacity="0.8" 
        />
        
        {/* Detail Lines */}
        <path d="M 30 35 L 70 30" stroke={theme.accent} strokeWidth="2" opacity="0.3" />

        {/* Fin Animation */}
        <path 
          d="M 30 40 L 10 20 L 40 40 Z" 
          fill={theme.primary} 
          style={{ transform: isFlapping ? 'rotate(-10deg)' : 'rotate(0deg)', transformOrigin: '30px 40px' }}
        />
      </svg>
    </div>
  );
};

export default Bird;
