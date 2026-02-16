
import React, { useState, useRef } from 'react';

interface PredictionMetric {
  label: string;
  color: string;
  description: string;
  probability: string;
  frequency: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
}

const PREDICTIONS: PredictionMetric[] = [
  { 
    label: "200+ Team Score", 
    color: "#D5152C", 
    description: "The batting powerhouse is about to explode!",
    probability: "22%",
    frequency: "1 in 4.5",
    riskLevel: 'MEDIUM'
  },
  { 
    label: "Hat-trick", 
    color: "#1a0505", 
    description: "Three balls, three wickets. Pure bowling magic!",
    probability: "4%",
    frequency: "1 in 25",
    riskLevel: 'EXTREME'
  },
  { 
    label: "Super Over", 
    color: "#D1AB3E", 
    description: "Hold your breath! We're heading for a tie-breaker!",
    probability: "2%",
    frequency: "1 in 50",
    riskLevel: 'EXTREME'
  },
  { 
    label: "Last Ball Finish", 
    color: "#FF6B00", 
    description: "It's coming down to the final delivery!",
    probability: "15%",
    frequency: "1 in 6.7",
    riskLevel: 'HIGH'
  },
  { 
    label: "Powerplay Carnage", 
    color: "#D5152C", 
    description: "70+ runs in 6 overs? The fielders are spectators!",
    probability: "12%",
    frequency: "1 in 8.3",
    riskLevel: 'MEDIUM'
  },
  { 
    label: "Match Winning Six", 
    color: "#D1AB3E", 
    description: "Over the ropes and into the history books!",
    probability: "35%",
    frequency: "1 in 2.8",
    riskLevel: 'LOW'
  }
];

export const PredictionRadar: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [scanningText, setScanningText] = useState("AWAITING DEPLOYMENT");
  
  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setResultIndex(null);
    setScanningText("SCANNING CHINNASWAMY AIRSPACE...");

    const spins = 7 + Math.floor(Math.random() * 5);
    const segmentAngle = 360 / PREDICTIONS.length;
    const randomSegment = Math.floor(Math.random() * PREDICTIONS.length);
    
    const targetRotation = (spins * 360) + (360 - (randomSegment * segmentAngle + segmentAngle / 2));
    const newTotalRotation = rotation + targetRotation;

    setRotation(newTotalRotation);

    // Dynamic scanning text effect
    const scanInterval = setInterval(() => {
      const randomMsg = [
        "ANALYZING PITCH FRICTION...",
        "CALCULATING WIND VELOCITY...",
        "DECODING KOHLI'S FORM...",
        "EVALUATING DEATH OVER DATA...",
        "SYNCING WITH 12TH MAN VORTEX..."
      ];
      setScanningText(randomMsg[Math.floor(Math.random() * randomMsg.length)]);
    }, 600);

    setTimeout(() => {
      clearInterval(scanInterval);
      setResultIndex(randomSegment);
      setIsSpinning(false);
      setShowResult(true);
      setScanningText("DESTINY IDENTIFIED");
    }, 3500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-[90vh] flex flex-col items-center justify-center">
      <div className="text-center mb-16 animate-in fade-in slide-in-from-top-10 duration-700">
        <h2 className="text-6xl md:text-7xl font-black font-oswald mb-4 italic text-white uppercase tracking-tighter text-glow-gold">PREDICTION RADAR</h2>
        <div className="h-1.5 w-40 bg-gradient-to-r from-red-600 via-gold to-red-600 mx-auto rounded-full"></div>
        <p className="mt-6 text-gray-400 font-bold uppercase tracking-[0.5em] text-xs">Simulating The 12th Man Intuition v2.0</p>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl lg:flex-row gap-16">
        
        {/* Left Side: Real-time Data Stream */}
        <div className="hidden lg:flex flex-col gap-4 w-64 glass-panel p-6 rounded-3xl border border-white/5 animate-in slide-in-from-left-10 duration-1000">
           <p className="text-[10px] font-black text-gold uppercase tracking-widest border-b border-gold/20 pb-2 mb-2">LIVE DATA FEED</p>
           {PREDICTIONS.map((p, i) => (
             <div key={i} className="flex justify-between items-center text-[10px] font-bold uppercase">
               <span className="text-gray-500">{p.label.split(' ')[0]}</span>
               <span className="text-white tabular-nums">{p.probability}</span>
             </div>
           ))}
           <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
              <p className="text-[9px] font-black text-red-500 uppercase">System Status: {isSpinning ? 'ACTIVE' : 'IDLE'}</p>
              <p className="text-[9px] font-black text-gold uppercase italic">{scanningText}</p>
           </div>
        </div>

        {/* The Wheel UI */}
        <div className="relative z-10 p-6 bg-black/40 backdrop-blur-md rounded-full border-2 border-white/5 shadow-2xl scale-90 md:scale-100">
          {/* Static Pointer */}
          <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 z-40 drop-shadow-[0_0_15px_rgba(209,171,62,0.8)] flex flex-col items-center">
             <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[45px] border-t-gold"></div>
             <div className="w-2 h-2 bg-white rounded-full mt-[-10px] shadow-[0_0_20px_white] animate-pulse"></div>
          </div>

          {/* Rotating Wheel Body */}
          <div 
            className="w-[320px] h-[320px] md:w-[500px] md:h-[500px] rounded-full border-[15px] border-[#111] bg-[#050000] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden transition-transform duration-[3500ms] ease-out-expo relative"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              backgroundImage: `conic-gradient(${
                PREDICTIONS.map((p, i) => `${p.color} ${i * 60}deg ${(i + 1) * 60}deg`).join(', ')
              })`
            }}
          >
            {/* Radar Overlay FX */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            
            {/* Concentric Radar Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none scale-90"></div>
            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none scale-70"></div>
            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none scale-50"></div>
            
            {/* Segment Labels & Metrics */}
            {PREDICTIONS.map((p, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 left-1/2 w-1/2 h-full origin-left flex flex-col items-center pt-8 md:pt-14"
                style={{ transform: `rotate(${i * 60 + 30}deg) translate(0, -50%)` }}
              >
                <div className="rotate-[-90deg] flex flex-col items-center gap-1 md:gap-2">
                  <span className="text-white font-black font-oswald text-[9px] md:text-sm uppercase tracking-tighter italic text-center drop-shadow-lg max-w-[90px] leading-tight select-none">
                    {p.label}
                  </span>
                  <div className="hidden md:flex flex-col items-center gap-0.5 opacity-60">
                    <span className="text-[7px] font-black text-white/80 uppercase">PROB: {p.probability}</span>
                    <span className="text-[7px] font-black text-gold uppercase">RISK: {p.riskLevel}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Hub Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Center SPIN Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <button 
              onClick={spinWheel}
              disabled={isSpinning}
              className={`w-24 h-24 md:w-36 md:h-36 rounded-full flex flex-col items-center justify-center transition-all duration-300 border-4 ${
                isSpinning 
                  ? 'bg-black border-gray-800 text-gray-800 cursor-not-allowed' 
                  : 'bg-[#0a0000] border-gold text-white hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(209,171,62,0.3)] hover:shadow-gold/60 group'
              }`}
            >
              <div className={`absolute inset-0 rounded-full bg-gold/10 animate-ping ${isSpinning ? 'hidden' : 'block'}`}></div>
              <span className={`text-xl md:text-3xl font-black font-oswald italic tracking-widest leading-none ${isSpinning ? 'opacity-10' : 'group-hover:text-gold'}`}>SPIN</span>
              {!isSpinning && <span className="text-[8px] md:text-[9px] font-black text-gold opacity-50 tracking-[0.2em] mt-2">DEPLOY RADAR</span>}
            </button>
          </div>
        </div>

        {/* Right Side: Segment Deep Dive */}
        <div className="hidden lg:flex flex-col gap-6 w-80 glass-panel p-8 rounded-[2.5rem] border border-white/10 animate-in slide-in-from-right-10 duration-1000">
           {showResult && resultIndex !== null ? (
             <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div>
                   <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em] mb-2">IDENTIFIED METRIC</p>
                   <h4 className="text-3xl font-black font-oswald text-white italic uppercase tracking-tighter leading-tight">
                     {PREDICTIONS[resultIndex].label}
                   </h4>
                </div>
                <div className="space-y-4 pt-4 border-t border-white/5">
                   <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-gray-500 uppercase">PROBABILITY INDEX</span>
                      <span className="text-xl font-black text-gold">{PREDICTIONS[resultIndex].probability}</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-gray-500 uppercase">HISTORICAL FREQUENCY</span>
                      <span className="text-xl font-black text-white">{PREDICTIONS[resultIndex].frequency}</span>
                   </div>
                   <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-gray-500 uppercase">THREAT LEVEL</span>
                      <span className={`text-xl font-black ${
                        PREDICTIONS[resultIndex].riskLevel === 'EXTREME' ? 'text-red-600' :
                        PREDICTIONS[resultIndex].riskLevel === 'HIGH' ? 'text-orange-500' :
                        'text-green-500'
                      }`}>{PREDICTIONS[resultIndex].riskLevel}</span>
                   </div>
                </div>
                <p className="text-gray-400 text-[10px] font-bold uppercase leading-relaxed italic border-l-2 border-gold pl-4">
                  {PREDICTIONS[resultIndex].description}
                </p>
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-30">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 mb-6 animate-spin-slow"></div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">
                  Calibrating Prediction Engines...<br/>Waiting for Spin Deployment
                </p>
             </div>
           )}
        </div>
      </div>

      {/* Mobile-only Result Overlay */}
      <div className="lg:hidden mt-12 h-40 flex flex-col items-center justify-center text-center w-full px-10">
           {showResult && resultIndex !== null && (
             <div className="animate-in zoom-in-50 fade-in duration-500">
                <p className="text-gold font-black uppercase tracking-[0.6em] text-[10px] mb-3">DESTINY UNLOCKED</p>
                <h3 className="text-5xl font-black font-oswald text-white italic tracking-tighter uppercase text-glow-gold mb-2">
                  {PREDICTIONS[resultIndex].label}
                </h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] italic opacity-80">
                  {PREDICTIONS[resultIndex].description}
                </p>
             </div>
           )}
           {isSpinning && (
             <div className="space-y-3 animate-pulse">
                <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">{scanningText}</p>
                <div className="flex justify-center gap-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
             </div>
           )}
      </div>

      <style>{`
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.15, 0, 0.15, 1);
        }
        @keyframes radar-sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-sweep {
          animation: radar-sweep 4s linear infinite;
        }
        .animate-spin-slow {
          animation: radar-sweep 8s linear infinite;
        }
      `}</style>
    </div>
  );
};
