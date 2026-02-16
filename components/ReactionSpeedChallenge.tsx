
import React, { useState, useEffect, useRef } from 'react';

type GameState = 'idle' | 'waiting' | 'active' | 'finished' | 'missed';

export const ReactionSpeedChallenge: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [ballPos, setBallPos] = useState({ x: 50, y: 50 });
  const timerRef = useRef<number>(0);
  // Fixed: Replaced NodeJS.Timeout with any to avoid 'Cannot find namespace NodeJS' error in browser environment
  const timeoutRef = useRef<any>(null);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    const delay = 1000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(() => {
      showBall();
    }, delay);
  };

  const showBall = () => {
    const x = 15 + Math.random() * 70;
    const y = 15 + Math.random() * 70;
    setBallPos({ x, y });
    setGameState('active');
    timerRef.current = performance.now();
    
    // Auto-fail after 1.5 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState('missed');
    }, 1500);
  };

  const handleBallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState !== 'active') return;
    
    const endTime = performance.now();
    const time = Math.round(endTime - timerRef.current);
    setReactionTime(time);
    setGameState('finished');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const getRank = (time: number) => {
    if (time < 200) return { label: 'LEGENDARY', color: 'text-gold' };
    if (time < 250) return { label: 'PRO', color: 'text-orange-500' };
    if (time < 350) return { label: 'CHALLENGER', color: 'text-red-500' };
    return { label: 'ROOKIE', color: 'text-gray-400' };
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-6xl font-black font-oswald mb-4 italic text-white uppercase tracking-tighter text-glow-gold">REFLEX TEST</h2>
        <p className="text-orange-500 font-black tracking-[0.4em] uppercase text-xs">Test your strike speed</p>
      </div>

      <div 
        className={`relative h-[600px] w-full glass-panel rounded-[3rem] overflow-hidden border-2 transition-all duration-500 ${
          gameState === 'waiting' ? 'border-orange-500/50 cursor-wait' : 
          gameState === 'active' ? 'border-green-500/50 cursor-crosshair' : 
          'border-orange-500/20'
        }`}
        onClick={() => gameState === 'active' && setGameState('missed')}
      >
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in duration-500">
             <div className="w-24 h-24 rounded-full bg-orange-600/20 border-2 border-orange-500 flex items-center justify-center mb-8 animate-pulse">
                <span className="text-4xl">⚡</span>
             </div>
             <h3 className="text-4xl font-black font-oswald text-white mb-4 italic uppercase">READY TO STRIKE?</h3>
             <p className="text-gray-400 max-w-sm mb-10 font-bold uppercase tracking-widest text-xs leading-loose">
               A cricket ball will appear at a random location. Click it as fast as you can to prove your status in the 12th Man Army.
             </p>
             <button 
               onClick={startGame}
               className="bg-orange-600 hover:bg-white hover:text-black text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-orange-500/20 active:scale-95"
             >
               Begin Trial
             </button>
          </div>
        )}

        {gameState === 'waiting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-black font-oswald text-orange-500 animate-pulse uppercase italic tracking-tighter">WAIT FOR IT...</p>
          </div>
        )}

        {gameState === 'active' && (
          <button
            onClick={handleBallClick}
            className="absolute w-20 h-20 group transition-transform active:scale-90 animate-in zoom-in-50 duration-100"
            style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="absolute inset-0 bg-orange-600 rounded-full blur-xl opacity-60 group-hover:opacity-100"></div>
            <img 
              src="https://www.royalchallengers.com/PRRCB01/public/styles/1061x767_landscape/public/2025-06/_AIL8656.jpg?itok=vcdm3E9V" 
              className="relative w-full h-full rounded-full object-cover border-2 border-white/50 shadow-2xl"
              alt="Ball"
            />
          </button>
        )}

        {(gameState === 'finished' || gameState === 'missed') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
            {gameState === 'finished' ? (
              <>
                <p className="text-xs font-black text-gray-500 uppercase tracking-[0.5em] mb-4">REACTION TIME</p>
                <h4 className="text-9xl font-black font-oswald text-white italic leading-none mb-6">
                  {reactionTime}<span className="text-4xl text-orange-500 ml-2">MS</span>
                </h4>
                <div className={`px-8 py-3 rounded-full border-2 font-black uppercase tracking-[0.4em] mb-12 ${getRank(reactionTime!).color} border-current`}>
                   RANK: {getRank(reactionTime!).label}
                </div>
              </>
            ) : (
              <>
                <h4 className="text-7xl font-black font-oswald text-red-600 italic uppercase mb-12">TOO SLOW!</h4>
              </>
            )}
            <button 
               onClick={startGame}
               className="bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] transition-all hover:bg-orange-600 hover:text-white active:scale-95 shadow-2xl"
             >
               Try Again
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
