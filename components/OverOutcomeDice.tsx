
import React, { useState, useCallback } from 'react';

const OUTCOMES = ["0", "1", "2", "3", "4", "6", "W"];

export const OverOutcomeDice: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [shake, setShake] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    
    setIsRolling(true);
    setResult(null);
    setShake(false);

    // Roll duration: 600ms
    setTimeout(() => {
      // Weighted outcomes (more dots and singles than wickets)
      // 0: 20%, 1: 30%, 2: 15%, 3: 5%, 4: 15%, 6: 10%, W: 5%
      const weights = [0.2, 0.5, 0.65, 0.7, 0.85, 0.95, 1.0];
      const random = Math.random();
      let outcomeIndex = 0;
      for(let i=0; i<weights.length; i++) {
        if(random < weights[i]) {
          outcomeIndex = i;
          break;
        }
      }
      
      const outcome = OUTCOMES[outcomeIndex];
      setResult(outcome);
      setIsRolling(false);
      setHistory(prev => [...prev, outcome].slice(-6)); // Track last over (6 balls)

      if (outcome === 'W') {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 600);
  }, [isRolling]);

  const getResultStyle = (val: string) => {
    if (val === '4' || val === '6') return 'text-gold text-glow-gold scale-125';
    if (val === 'W') return 'text-red-500 scale-110 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]';
    return 'text-white opacity-80';
  };

  const getHistoryStyle = (val: string) => {
    if (val === 'W') return 'bg-red-600 border-red-400';
    if (val === '4' || val === '6') return 'bg-gold border-white text-black';
    if (val === '0') return 'bg-white/5 border-white/20 opacity-30';
    return 'bg-white/20 border-white/40';
  };

  return (
    <div className={`max-w-4xl mx-auto px-6 py-20 transition-transform duration-150 ${shake ? 'animate-shake' : ''}`}>
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black font-oswald mb-4 italic text-white uppercase tracking-tighter text-glow-gold">OUTCOME DICE</h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-gold mx-auto rounded-full"></div>
        <p className="mt-6 text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Simulate the Next Over</p>
      </div>

      <div className="glass-panel rounded-[4rem] p-12 md:p-20 flex flex-col items-center justify-center border-2 border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none" />
        
        {/* The Dice Container */}
        <div className="relative mb-20 group cursor-pointer" onClick={rollDice}>
          {/* Dice Glow */}
          <div className={`absolute -inset-10 bg-gold/10 blur-[80px] rounded-full transition-opacity duration-500 ${isRolling ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Animated 3D-ish Dice */}
          <div className={`w-32 h-32 bg-[#1a0505] rounded-3xl border-4 border-gold shadow-2xl flex items-center justify-center transition-all duration-500 transform-gpu preserve-3d
            ${isRolling ? 'animate-dice-roll' : 'group-hover:scale-105 group-active:scale-95'}`}
          >
            <div className="text-5xl">🎲</div>
          </div>
          
          {!isRolling && !result && (
            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-gold tracking-[0.5em] whitespace-nowrap animate-pulse">
              Click to Roll
            </p>
          )}
        </div>

        {/* The Result Display */}
        <div className="h-48 flex items-center justify-center">
          {isRolling ? (
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          ) : result ? (
            <div className={`text-[12rem] font-black font-oswald italic leading-none transition-all duration-300 animate-in zoom-in-50 fade-in ${getResultStyle(result)}`}>
              {result}
            </div>
          ) : (
            <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-sm">Waiting for the delivery...</p>
          )}
        </div>

        {/* Current Over Tracker */}
        <div className="mt-16 w-full max-w-lg">
           <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Current Over Voyage</p>
              <button 
                onClick={() => setHistory([])}
                className="text-[9px] font-black text-red-500 uppercase hover:text-white transition-colors"
              >
                Reset Over
              </button>
           </div>
           <div className="flex gap-4">
              {[...Array(6)].map((_, i) => {
                const roll = history[i];
                return (
                  <div 
                    key={i}
                    className={`flex-1 aspect-square rounded-2xl border-2 flex items-center justify-center font-black transition-all duration-500 
                      ${roll ? getHistoryStyle(roll) : 'bg-black/40 border-white/5 opacity-20'}`}
                  >
                    <span className="text-lg font-oswald italic">{roll || ''}</span>
                  </div>
                );
              })}
           </div>
        </div>
      </div>

      <style>{`
        @keyframes dice-roll {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.2) translateX(10px); }
          50% { transform: rotate(180deg) scale(0.9) translateY(-10px); }
          75% { transform: rotate(270deg) scale(1.1) translateX(-10px); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .animate-dice-roll {
          animation: dice-roll 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};
