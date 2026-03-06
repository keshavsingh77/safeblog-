
import React from 'react';

interface PipeProps {
  left: number;
  height: number;
  isTop: boolean;
  theme?: 'classic' | 'night' | 'hell' | 'president' | 'tribal';
}

const Pipe: React.FC<PipeProps> = ({ left, height, isTop, theme = 'classic' }) => {
  const getColors = () => {
    switch(theme) {
      case 'president': return { main: '#f8fafc', cap: '#3b82f6', pulse: '#60a5fa' };
      case 'tribal': return { main: '#451a03', cap: '#f59e0b', pulse: '#d97706' };
      case 'night': return { main: '#1e1b4b', cap: '#4338ca', pulse: '#818cf8' };
      case 'hell': return { main: '#450a0a', cap: '#ef4444', pulse: '#f87171' };
      default: return { main: '#0f172a', cap: '#1e3a8a', pulse: '#3b82f6' };
    }
  };

  const colors = getColors();

  return (
    <div 
      style={{ 
        position: 'absolute',
        left: left,
        height: height,
        top: isTop ? 0 : undefined,
        bottom: !isTop ? 0 : undefined,
        width: '70px',
        backgroundColor: colors.main,
        borderLeft: `2px solid rgba(255,255,255,0.1)`,
        borderRight: `2px solid rgba(255,255,255,0.1)`,
      }}
      className="z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden"
    >
       {/* High-tech detailing */}
       <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
       
       <div className="flex flex-col gap-4 py-8 items-center opacity-30">
          {Array(Math.floor(height/40)).fill(0).map((_, i) => (
            <div key={i} className="w-10 h-[1px] bg-white/20" />
          ))}
       </div>

       {/* Energy Pulse Edge */}
       <div 
         className="absolute w-full h-[3px] opacity-60 blur-[1px]"
         style={{ 
           top: isTop ? 'auto' : 0, 
           bottom: isTop ? 0 : 'auto',
           backgroundColor: colors.pulse,
           boxShadow: `0 0 10px ${colors.pulse}`
         }}
       />

       {/* Pipe Cap (Gate Head) */}
       <div 
         className="absolute w-[120%] -left-[10%] h-12 border border-white/10 z-20 shadow-xl overflow-hidden flex items-center justify-center"
         style={{ 
           top: isTop ? 'auto' : -2, 
           bottom: isTop ? -2 : 'auto',
           backgroundColor: colors.cap,
           borderRadius: '4px'
         }}
       >
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute inset-x-4 top-2 h-1 bg-white/20 rounded-full"></div>
            <div className="flex justify-around items-center h-full px-2">
               <div className="w-2 h-2 rounded-full bg-white/10" />
               <div className="w-8 h-1 rounded-full bg-white/10" />
               <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
          </div>
       </div>

       <style>{`
         @keyframes shimmer {
           from { background-position: -200% 0; }
           to { background-position: 200% 0; }
         }
       `}</style>
    </div>
  );
};

export default Pipe;
