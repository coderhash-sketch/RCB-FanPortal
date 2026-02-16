
import React, { useState, useEffect } from 'react';
import { PLAYERS, COLORS } from '../constants';
import { Player, PlayerRole, BallResult } from '../types';

type SimStep = 'selection' | 'simulating' | 'summary';

export const SuperOverSimulator: React.FC = () => {
  const [step, setStep] = useState<SimStep>('selection');
  const [selectedBatters, setSelectedBatters] = useState<Player[]>([]);
  const [selectedBowler, setSelectedBowler] = useState<Player | null>(null);
  const [ballResults, setBallResults] = useState<BallResult[]>([]);
  const [currentBallIdx, setCurrentBallIdx] = useState(-1);
  const [onStrikeIdx, setOnStrikeIdx] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [wickets, setWickets] = useState(0);

  const batsmen = PLAYERS.filter(p => p.role === PlayerRole.BATSMAN || p.role === PlayerRole.ALL_ROUNDER);
  const bowlers = PLAYERS.filter(p => p.role === PlayerRole.BOWLER || p.role === PlayerRole.ALL_ROUNDER);

  // Vibrant neonic color filters for player cards
  const playerFilters = [
    'sepia(1) saturate(10) hue-rotate(340deg)', // Red
    'sepia(1) saturate(10) hue-rotate(180deg)', // Cyan
    'sepia(1) saturate(10) hue-rotate(200deg)', // Sky Blue
    'sepia(1) saturate(10) hue-rotate(80deg)',  // Green
    'sepia(1) saturate(10) hue-rotate(120deg)', // Light Green
    'sepia(1) saturate(10) hue-rotate(280deg)', // Pink
    'sepia(1) saturate(10) hue-rotate(240deg)', // Purple
  ];

  const startSimulation = () => {
    if (selectedBatters.length < 2 || !selectedBowler) return;

    const results: BallResult[] = [];
    let tempScore = 0;
    let tempWickets = 0;
    let tempStrike = 0;

    const outcomes = [0, 1, 2, 3, 4, 6, 'W'];
    
    for (let i = 1; i <= 6; i++) {
      if (tempWickets >= 2) break;

      const currentBatter = selectedBatters[tempStrike];
      const sr = currentBatter.stats.strikeRate || 130;
      const econ = selectedBowler.stats.economy || 8;

      let weights = [15, 30, 10, 2, 15, 15, 13]; 
      
      if (sr > 150) { weights[5] += 10; weights[4] += 5; weights[0] -= 5; }
      if (econ < 7.5) { weights[6] += 5; weights[0] += 10; weights[5] -= 5; }

      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      let selectedOutcome: string | number = 0;

      for (let j = 0; j < outcomes.length; j++) {
        if (random < weights[j]) {
          selectedOutcome = outcomes[j];
          break;
        }
        random -= weights[j];
      }

      if (selectedOutcome === 'W') {
        tempWickets++;
        tempStrike = tempWickets; 
      } else {
        const runs = selectedOutcome as number;
        tempScore += runs;
        if (runs === 1 || runs === 3) {
          tempStrike = tempStrike === 0 ? 1 : 0;
        }
      }

      results.push({
        ballNum: `0.${i}`,
        outcome: selectedOutcome,
        description: getBallDescription(selectedOutcome)
      });
    }

    setBallResults(results);
    setStep('simulating');
    setCurrentBallIdx(-1);
    setTotalScore(0);
    setWickets(0);
    setOnStrikeIdx(0);
  };

  const getBallDescription = (outcome: string | number) => {
    if (outcome === 'W') return 'CLEAN BOWLED! The bails are flying!';
    if (outcome === 6) return 'Smashed into the second tier! MONSTER SIX!';
    if (outcome === 4) return 'Cracking cover drive! One bounce and over the rope.';
    if (outcome === 0) return 'Dot ball. Pressure is mounting...';
    return `${outcome} run${outcome === 1 ? '' : 's'} taken. Sharp running!`;
  };

  useEffect(() => {
    if (step === 'simulating' && currentBallIdx < ballResults.length - 1) {
      const timer = setTimeout(() => {
        const nextIdx = currentBallIdx + 1;
        const result = ballResults[nextIdx];
        
        if (result.outcome !== 'W') {
          setTotalScore(prev => prev + (result.outcome as number));
          if (result.outcome === 1 || result.outcome === 3) {
            setOnStrikeIdx(prev => (prev === 0 ? 1 : 0));
          }
        } else {
          setWickets(prev => prev + 1);
          setOnStrikeIdx(prev => prev + 1);
        }
        
        setCurrentBallIdx(nextIdx);
        
        if (nextIdx === ballResults.length - 1) {
          setTimeout(() => setStep('summary'), 2000);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [step, currentBallIdx, ballResults]);

  const selectPlayer = (player: Player, type: 'batter' | 'bowler', idx: number) => {
    if (type === 'batter') {
      if (selectedBatters.find(p => p.id === player.id)) {
        setSelectedBatters(selectedBatters.filter(p => p.id !== player.id));
      } else if (selectedBatters.length < 2) {
        setSelectedBatters([...selectedBatters, player]);
      }
    } else {
      setSelectedBowler(player);
    }
  };

  return (
    <div id="simulator" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black font-oswald mb-4 italic text-white uppercase tracking-tighter text-glow-gold">SUPER OVER SIMULATOR</h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full"></div>
        <p className="mt-6 text-gray-400 font-bold uppercase tracking-[0.3em] text-xs">Test the Strike Force & Defense</p>
      </div>

      <div className="glass-panel rounded-[3rem] overflow-hidden border border-red-600/20 shadow-2xl p-8 md:p-12">
        {step === 'selection' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-black font-oswald text-[#D1AB3E] uppercase italic">1. Select 2 Batters ({selectedBatters.length}/2)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {batsmen.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => selectPlayer(p, 'batter', idx)}
                      className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all group ${selectedBatters.some(b => b.id === p.id) ? 'border-[#D5152C] scale-95 shadow-[0_0_20px_rgba(213,21,44,0.4)]' : 'border-white/10 hover:border-red-600/40'}`}
                    >
                      <img 
                        src={p.image} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                        style={{ filter: selectedBatters.some(b => b.id === p.id) ? 'none' : playerFilters[idx % playerFilters.length] }}
                        alt={p.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <p className="text-[10px] font-black uppercase text-white truncate drop-shadow-md">{p.name}</p>
                        <p className="text-[8px] font-bold text-gold uppercase tracking-widest">SR: {p.stats.strikeRate}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black font-oswald text-[#D1AB3E] uppercase italic">2. Select 1 Bowler</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {bowlers.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => selectPlayer(p, 'bowler', idx)}
                      className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all group ${selectedBowler?.id === p.id ? 'border-cyan-500 scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'border-white/10 hover:border-cyan-600/40'}`}
                    >
                      <img 
                        src={p.image} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                        style={{ filter: selectedBowler?.id === p.id ? 'none' : playerFilters[idx % playerFilters.length] }}
                        alt={p.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <p className="text-[10px] font-black uppercase text-white truncate drop-shadow-md">{p.name}</p>
                        <p className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">ECON: {p.stats.economy || '8.5'}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
              <button
                disabled={selectedBatters.length < 2 || !selectedBowler}
                onClick={startSimulation}
                className="bg-[#D5152C] hover:bg-white hover:text-black text-white px-20 py-6 rounded-2xl font-black uppercase tracking-[0.5em] transition-all shadow-[0_20px_50px_rgba(213,21,44,0.3)] disabled:opacity-20 disabled:cursor-not-allowed active:scale-95 border border-white/10 text-sm"
              >
                UNLEASH BATTLE
              </button>
              <p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.4em] italic">Quantum Match Engine Engaged</p>
            </div>
          </div>
        )}

        {step === 'simulating' && (
          <div className="flex flex-col items-center space-y-12 py-10">
            <div className="w-full max-w-2xl bg-[#0a0000]/90 rounded-[4rem] p-12 border-2 border-red-600/20 shadow-[0_0_60px_rgba(213,21,44,0.15)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-pulse" />
               <div className="flex justify-between items-center mb-10">
                 <div className="text-left">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">RUNS-WICKETS</p>
                    <h4 className="text-8xl font-black font-oswald text-white leading-none italic drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{totalScore}<span className="text-5xl text-[#D5152C]">-{wickets}</span></h4>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">BALL</p>
                    <h4 className="text-5xl font-black font-oswald text-gold leading-none italic">{currentBallIdx >= 0 ? ballResults[currentBallIdx].ballNum : '0.0'}</h4>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10">
                 <div className="text-left space-y-4">
                    {selectedBatters.map((p, i) => (
                      <div key={p.id} className={`flex items-center gap-4 ${onStrikeIdx === i ? 'text-white' : 'text-gray-600'}`}>
                        <div className={`w-2.5 h-2.5 rounded-full ${onStrikeIdx === i ? 'bg-[#39ff14] shadow-[0_0_10px_#39ff14] animate-pulse' : 'bg-transparent border border-white/10'}`} />
                        <span className="text-xs font-black uppercase tracking-[0.2em] truncate">{p.name} {onStrikeIdx === i ? '*' : ''}</span>
                      </div>
                    ))}
                 </div>
                 <div className="text-right flex flex-col justify-center">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2">TARGET DEFENSE</p>
                    <p className="text-sm font-black text-cyan-400 uppercase tracking-[0.2em]">{selectedBowler?.name}</p>
                 </div>
               </div>
            </div>

            <div className="flex gap-6">
              {[...Array(6)].map((_, i) => {
                const result = ballResults[i];
                const isRevealed = i <= currentBallIdx;
                return (
                  <div
                    key={i}
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-black transition-all duration-700 ${isRevealed 
                      ? result.outcome === 'W' ? 'bg-red-600 border-red-400 text-white animate-bounce shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                      : result.outcome === 6 || result.outcome === 4 ? 'bg-gold border-white text-black scale-110 shadow-[0_0_30px_rgba(209,171,62,0.6)]'
                      : 'bg-white/10 border-white/20 text-white' 
                      : 'bg-transparent border-white/5 opacity-10'}`}
                  >
                    <span className="text-xl font-oswald italic">{isRevealed ? result.outcome : ''}</span>
                  </div>
                );
              })}
            </div>

            <div className="h-24 text-center px-10 flex items-center justify-center">
              {currentBallIdx >= 0 && (
                <p className="text-3xl font-black font-oswald italic text-white uppercase tracking-tight animate-in fade-in slide-in-from-bottom-6 text-glow-gold">
                  {ballResults[currentBallIdx].description}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 'summary' && (
          <div className="text-center space-y-12 py-12 animate-in zoom-in duration-700">
            <div className="space-y-6">
              <div className="inline-block px-6 py-2 rounded-full border border-gold/30 text-gold text-[10px] font-black uppercase tracking-[0.5em] mb-4">MATCH CONCLUDED</div>
              <h4 className="text-[12rem] font-black font-oswald text-white italic drop-shadow-[0_20px_50px_rgba(213,21,44,0.4)] leading-none">
                {totalScore}<span className="text-6xl text-red-600 ml-2">-{wickets}</span>
              </h4>
              <p className="text-2xl font-black text-gold uppercase tracking-[0.3em] italic animate-pulse">#PLAYBOLD SPIRIT: {totalScore > 15 ? 'DOMINANT' : totalScore > 8 ? 'COMPETITIVE' : 'TOUGH LUCK'}</p>
            </div>

            <div className="max-w-xl mx-auto grid grid-cols-2 gap-10 bg-black/60 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
               <div className="text-left border-r border-white/5 pr-10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">STRIKE ANALYSIS</p>
                  <div className="space-y-3">
                    {[6, 4, 3, 2, 1, 0].map(val => (
                      <div key={val} className="flex justify-between text-xs font-black">
                        <span className="opacity-30 tracking-widest">{val} RUNS:</span>
                        <span className={val >= 4 ? 'text-gold' : 'text-white'}>{ballResults.filter(b => b.outcome === val).length}</span>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="text-left pl-10 flex flex-col justify-center">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">WICKET LOSS</p>
                  <h5 className="text-6xl font-black font-oswald text-red-600 italic">{wickets}<span className="text-xl text-white/20 ml-2">/ 2</span></h5>
                  <p className="mt-4 text-[9px] font-bold text-white/40 uppercase tracking-widest">Innings Over</p>
               </div>
            </div>

            <button
              onClick={() => setStep('selection')}
              className="bg-white text-black px-16 py-6 rounded-2xl font-black uppercase tracking-[0.5em] hover:bg-gold transition-all active:scale-95 shadow-2xl border-none text-sm"
            >
              SIMULATE NEXT BATTLE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
