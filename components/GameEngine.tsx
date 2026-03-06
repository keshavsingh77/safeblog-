
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Play, RotateCcw, Loader2, Rocket, Zap, X, Home, Trophy, ShieldCheck, Shield } from 'lucide-react';
import Bird from './Bird';
import Pipe from './Pipe';

const GRAVITY = 0.45;
const JUMP_STRENGTH = -7.5;
const INITIAL_PIPE_SPEED = 5.2;
const PIPE_WIDTH = 70;
const BIRD_SIZE = 44;
const INITIAL_GAP_SIZE = 190;
const PIPE_SPACING = 380;

type BirdSkin = 'classic' | 'cyber' | 'phoenix' | 'president' | 'tribal';

interface PipeData {
  id: number;
  x: number;
  topHeight: number;
  passed: boolean;
  offsetY?: number;
  isMoving?: boolean;
}

interface PowerUp {
  id: number;
  x: number;
  y: number;
  type: 'shield';
  active: boolean;
}

interface SectorProfile {
  name: string;
  briefing: string;
  color: string;
}

interface GameEngineProps {
  onClose: () => void;
  onGameOver?: (score: number) => void;
}

const GameEngine: React.FC<GameEngineProps> = ({ onClose, onGameOver }) => {
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [skin, setSkin] = useState<BirdSkin>('classic');
  const [aiCommentary, setAiCommentary] = useState<string>("");
  const [sector, setSector] = useState<SectorProfile>({ name: "Nebula Alpha", briefing: "Initialize jump sequence...", color: "#1e3a8a" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFlapping, setIsFlapping] = useState(false);
  const [hasShield, setHasShield] = useState(false);

  const birdYRef = useRef(300);
  const birdVRef = useRef(0);
  const birdRotationRef = useRef(0);
  const pipesRef = useRef<PipeData[]>([]);
  const powerUpsRef = useRef<PowerUp[]>([]);
  const scoreRef = useRef(0);
  const requestRef = useRef<number>(0);
  const flapTimeoutRef = useRef<any>(null);
  
  const birdElRef = useRef<HTMLDivElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const scoreBadgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('space_flap_highscore');
    if (saved) setHighScore(parseInt(saved));
    generateSectorProfile('classic');
  }, []);

  const generateSectorProfile = async (currentSkin: BirdSkin) => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a sci-fi sector profile for a space pilot flying a '${currentSkin}' skin ship.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              briefing: { type: Type.STRING },
              color: { type: Type.STRING, description: 'CSS hex color for the sector atmosphere' }
            },
            required: ['name', 'briefing', 'color']
          }
        }
      });
      const data = JSON.parse(response.text || '{}');
      setSector({
        name: data.name || "Unknown Sector",
        briefing: data.briefing || "Navigating deep space.",
        color: data.color || "#1e3a8a"
      });
    } catch (e) {
      setSector({ name: "Dead Space", briefing: "Communication lost. Manual flight only.", color: "#0f172a" });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetGame = useCallback(() => {
    birdYRef.current = 300;
    birdVRef.current = 0;
    birdRotationRef.current = 0;
    pipesRef.current = [];
    powerUpsRef.current = [];
    scoreRef.current = 0;
    setScore(0);
    setHasShield(false);
    setIsGameOver(false);
    setGameHasStarted(false);
    setAiCommentary("");
  }, []);

  const generateGameOverCommentary = async (finalScore: number) => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Funny 1-sentence pilot status report for crashing in ${sector.name}. Score: ${finalScore}. Skin: ${skin}.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiCommentary(response.text || "Engines out. Floating home.");
    } catch (e) {
      setAiCommentary("The sector remains unforgiving.");
    } finally {
      setIsGenerating(false);
    }
  };

  const jump = useCallback((e?: any) => {
    if (e) e.stopPropagation();
    if (isGameOver) return;
    if (!gameHasStarted) {
      setGameHasStarted(true);
      return;
    }
    birdVRef.current = JUMP_STRENGTH;
    setIsFlapping(true);
    if (flapTimeoutRef.current) clearTimeout(flapTimeoutRef.current);
    flapTimeoutRef.current = setTimeout(() => setIsFlapping(false), 150);
  }, [isGameOver, gameHasStarted]);

  const update = useCallback((time: number) => {
    if (!gameHasStarted || isGameOver) {
      requestRef.current = requestAnimationFrame(update);
      return;
    }

    const h = gameContainerRef.current?.clientHeight || 600;
    const w = gameContainerRef.current?.clientWidth || 800;

    birdVRef.current += GRAVITY;
    birdYRef.current += birdVRef.current;
    birdRotationRef.current = Math.min(Math.max(birdVRef.current * 4, -30), 45);

    if (birdYRef.current < -50 || birdYRef.current > h - BIRD_SIZE + 20) {
      handleGameOver();
    }

    if (birdElRef.current) {
      birdElRef.current.style.transform = `translate3d(0, ${birdYRef.current}px, 0) rotate(${birdRotationRef.current}deg)`;
    }

    // Pipes and Logic
    const movedPipes = pipesRef.current.map(p => {
      let offsetY = p.offsetY || 0;
      if (p.isMoving) {
        offsetY = Math.sin(time / 400) * 50;
      }
      return { ...p, x: p.x - INITIAL_PIPE_SPEED, offsetY };
    }).filter(p => p.x > -150);

    if (!movedPipes.length || w - movedPipes[movedPipes.length - 1].x >= PIPE_SPACING) {
      const isDifficultyHigh = scoreRef.current > 10;
      const topH = Math.random() * (h - INITIAL_GAP_SIZE - 200) + 100;
      movedPipes.push({ 
        id: Date.now(), 
        x: w, 
        topHeight: topH, 
        passed: false,
        isMoving: isDifficultyHigh && Math.random() > 0.5,
        offsetY: 0
      });

      // Chance to spawn power-up
      if (Math.random() > 0.9 && !hasShield) {
        powerUpsRef.current.push({
          id: Date.now() + 1,
          x: w + PIPE_SPACING / 2,
          y: Math.random() * (h - 200) + 100,
          type: 'shield',
          active: true
        });
      }
    }

    const birdL = w * 0.2;
    const birdR = birdL + BIRD_SIZE - 15;
    const birdT = birdYRef.current + 10;
    const birdB = birdYRef.current + BIRD_SIZE - 10;

    movedPipes.forEach(p => {
      const topGateBottom = p.topHeight + (p.offsetY || 0);
      const bottomGateTop = topGateBottom + INITIAL_GAP_SIZE;

      if (birdR > p.x && birdL < p.x + PIPE_WIDTH) {
        if (birdT < topGateBottom || birdB > bottomGateTop) {
          if (hasShield) {
            setHasShield(false);
            p.x = -500; // Trash the pipe
          } else {
            handleGameOver();
          }
        }
      }
      if (!p.passed && p.x + PIPE_WIDTH < birdL) {
        p.passed = true;
        scoreRef.current += 1;
        if (scoreBadgeRef.current) scoreBadgeRef.current.innerText = scoreRef.current.toString();
      }
    });

    // Power-up Logic
    powerUpsRef.current = powerUpsRef.current.map(pu => {
      const dx = pu.x - birdL;
      const dy = pu.y - birdYRef.current;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 50 && pu.active) {
        setHasShield(true);
        return { ...pu, active: false };
      }
      return { ...pu, x: pu.x - INITIAL_PIPE_SPEED };
    }).filter(pu => pu.x > -100 && pu.active);

    pipesRef.current = movedPipes;
    requestRef.current = requestAnimationFrame(update);
  }, [gameHasStarted, isGameOver, hasShield, sector.name]);

  const handleGameOver = () => {
    setIsGameOver(true);
    setScore(scoreRef.current);
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
      localStorage.setItem('space_flap_highscore', scoreRef.current.toString());
    }
    generateGameOverCommentary(scoreRef.current);
    if (onGameOver) onGameOver(scoreRef.current);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [update]);

  return (
    <div 
      ref={gameContainerRef} 
      className="fixed inset-0 bg-[#020617] cursor-pointer overflow-hidden z-[100] touch-none select-none" 
      onMouseDown={jump}
      onTouchStart={jump}
      style={{ '--sector-color': sector.color } as any}
    >
      {/* Background FX */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-40 transition-colors duration-1000" style={{ backgroundColor: `${sector.color}22` }}></div>
        <div className="stars-layer-1 absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-[stars-scroll_100s_linear_infinite]"></div>
      </div>

      {/* Pipes */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {pipesRef.current.map(p => (
          <React.Fragment key={p.id}>
            <div style={{ transform: `translate3d(0, ${p.offsetY}px, 0)`, position: 'absolute', left: p.x, width: PIPE_WIDTH, height: '100%' }}>
              <Pipe left={0} height={p.topHeight} isTop={true} theme={skin === 'classic' ? 'night' : skin as any} />
              <Pipe left={0} height={(gameContainerRef.current?.clientHeight || 600) - p.topHeight - INITIAL_GAP_SIZE} isTop={false} theme={skin === 'classic' ? 'night' : skin as any} />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Power-ups */}
      {powerUpsRef.current.map(pu => (
        <div 
          key={pu.id} 
          className="absolute z-20 w-10 h-10 flex items-center justify-center animate-bounce"
          style={{ left: pu.x, top: pu.y }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6] flex items-center justify-center">
            <Shield size={16} className="text-white" />
          </div>
        </div>
      ))}

      {/* Ship */}
      <div 
        ref={birdElRef}
        className="absolute left-[20%] z-30 transition-none pointer-events-none"
        style={{ top: 0 }}
      >
        <Bird top={0} rotation={0} isFlapping={isFlapping} skin={skin} hasShield={hasShield} />
      </div>

      {/* HUD */}
      <div className="absolute top-0 inset-x-0 h-24 flex items-center justify-between px-8 z-[110] pointer-events-none">
        <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="pointer-events-auto bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-xl transition-all">
          <Home size={20} className="text-white" />
        </button>
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">{sector.name}</span>
           <span ref={scoreBadgeRef} className="text-6xl font-black text-white drop-shadow-2xl">0</span>
        </div>
        <div className="flex gap-4">
          {hasShield && <Shield className="text-blue-400 animate-pulse" size={24} />}
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Personal Best</span>
             <span className="text-xl font-bold text-white/60">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Start UI */}
      {!gameHasStarted && !isGameOver && (
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-[120]">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] text-center max-w-sm">
             <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket size={32} className="text-blue-400" />
             </div>
             <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">Sector {sector.name}</h2>
             <div className="bg-black/40 p-5 rounded-2xl mb-8">
                {isGenerating ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : <p className="text-blue-100 text-xs italic font-medium leading-relaxed">"{sector.briefing}"</p>}
             </div>
             <button onClick={jump} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform uppercase tracking-widest">Start Mission</button>
             
             <div className="mt-8">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Fleet Selection</span>
               <div className="flex gap-3 justify-center">
                 {(['classic', 'cyber', 'phoenix', 'president', 'tribal'] as BirdSkin[]).map(s => (
                   <button key={s} onClick={(e) => { e.stopPropagation(); setSkin(s); generateSectorProfile(s); }} className={`w-10 h-10 rounded-xl border-2 transition-all ${skin === s ? 'border-blue-500 bg-blue-500/20' : 'border-white/5 opacity-40'}`} />
                 ))}
               </div>
             </div>
           </div>
        </div>
      )}

      {/* Game Over UI */}
      {isGameOver && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl flex items-center justify-center z-[130] p-6">
           <div className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] w-full max-w-md">
              <h2 className="text-2xl font-black text-white uppercase italic text-center mb-8">Hull Compromised</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 p-6 rounded-3xl text-center">
                   <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">Score</span>
                   <span className="text-4xl font-black text-white">{score}</span>
                </div>
                <div className="bg-black/40 p-6 rounded-3xl text-center">
                   <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1">High</span>
                   <span className="text-4xl font-black text-blue-500">{highScore}</span>
                </div>
              </div>
              <div className="p-6 bg-blue-600/10 rounded-2xl mb-8 text-center border border-blue-500/20">
                 {isGenerating ? <Loader2 className="animate-spin mx-auto text-blue-500" /> : <p className="text-blue-100 text-sm italic">"{aiCommentary}"</p>}
              </div>
              <button onClick={(e) => { e.stopPropagation(); resetGame(); }} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 uppercase tracking-widest">
                <RotateCcw size={18} /> Re-Enter Atmosphere
              </button>
           </div>
        </div>
      )}

      <style>{`
        @keyframes stars-scroll {
          from { background-position: 0 0; }
          to { background-position: -1000px -1000px; }
        }
      `}</style>
    </div>
  );
};

export default GameEngine;
