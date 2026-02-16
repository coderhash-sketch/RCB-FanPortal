
import React, { useState, useEffect, useRef } from 'react';
import { fetchStoryCommentary } from '../services/geminiService';

interface StorySlide {
  title: string;
  narrative: string;
  image: string;
  milestone?: string;
  memorabilia?: string;
}

interface Chapter {
  id: string;
  name: string;
  slides: StorySlide[];
}

const STORY_DATA: Chapter[] = [
  {
    id: 'auction',
    name: 'Chapter 1: The Auction',
    slides: [
      {
        title: "Forging the Future",
        narrative: "In the heart of Bengaluru, the war room was set. The mission: build an army capable of conquering the peak. Strategy met passion as the new core was forged.",
        image: "https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=1600",
        milestone: "SQUAD LOCK: 25 WARRIORS",
        memorabilia: "Auction Spend: 95.0 Cr"
      },
      {
        title: "The King's Assurance",
        narrative: "Virat Kohli remains the cornerstone. His presence in the auction room sent a clear message: Loyalty is royalty. The 12th Man cheered from across the globe.",
        image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=1600",
        milestone: "RETAINED: VIRAT KOHLI",
        memorabilia: "17 Seasons of Loyalty"
      }
    ]
  },
  {
    id: 'opener',
    name: 'Chapter 2: First Blood',
    slides: [
      {
        title: "Stadium on Fire",
        narrative: "The Chinnaswamy turned into a sea of red. Every boundary felt like a heartbeat. The opening match wasn't just a game; it was a homecoming.",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1600",
        milestone: "WIN BY 8 WICKETS",
        memorabilia: "Decibel Level: 124dB"
      },
      {
        title: "Faf's Leadership",
        narrative: "Cool under pressure, Faf du Plessis marshaled his troops. The openers laid a foundation that couldn't be shaken. A statement was made.",
        image: "https://images.unsplash.com/photo-1508344922997-5a3d76b17671?auto=format&fit=crop&q=80&w=1600",
        milestone: "CAPTAIN'S 50 (32 BALLS)",
        memorabilia: "Powerplay Score: 68/0"
      }
    ]
  },
  {
    id: 'playoffs',
    name: 'Chapter 3: The Ascent',
    slides: [
      {
        title: "Defying the Odds",
        narrative: "Mid-season struggles only made the bond stronger. Through rain and grit, the team clawed back into contention. The playoffs were within reach.",
        image: "https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=1600",
        milestone: "6 CONSECUTIVE WINS",
        memorabilia: "Win Prob: 1% to 100%"
      },
      {
        title: "Maximum Impact",
        narrative: "Glenn Maxwell unleashed the 'Big Show' when it mattered most. Switch hits and soaring sixes kept the dream alive. Momentum was our fuel.",
        image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=1600",
        milestone: "SR 185.0 IN MAY",
        memorabilia: "Longest Six: 108m"
      }
    ]
  }
];

export const SeasonStorybook: React.FC = () => {
  const [chapterIdx, setChapterIdx] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const [aiCommentary, setAiCommentary] = useState("");
  const [isCommentaryLoading, setIsCommentaryLoading] = useState(false);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentChapter = STORY_DATA[chapterIdx];
  const currentSlide = currentChapter.slides[slideIdx];

  useEffect(() => {
    setIsCommentaryLoading(true);
    fetchStoryCommentary(currentSlide.title, currentSlide.narrative).then(res => {
      setAiCommentary(res);
      setIsCommentaryLoading(false);
    });
  }, [chapterIdx, slideIdx]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const addReaction = (emoji: string) => {
    const id = Date.now();
    const left = 20 + Math.random() * 60;
    setReactions(prev => [...prev, { id, emoji, left }]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, 2000);
  };

  const next = () => {
    if (slideIdx < currentChapter.slides.length - 1) {
      setSlideIdx(slideIdx + 1);
    } else if (chapterIdx < STORY_DATA.length - 1) {
      setChapterIdx(chapterIdx + 1);
      setSlideIdx(0);
    }
  };

  const prev = () => {
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    } else if (chapterIdx > 0) {
      setChapterIdx(chapterIdx - 1);
      setSlideIdx(STORY_DATA[chapterIdx - 1].slides.length - 1);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[85vh] w-full max-w-[98rem] mx-auto rounded-[4rem] overflow-hidden border-4 border-red-600/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-black"
    >
      {/* Immersive Parallax Background */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ 
          transform: `scale(1.1) translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` 
        }}
      >
        <div key={`${chapterIdx}-${slideIdx}`} className="absolute inset-0 animate-in fade-in zoom-in-105 duration-1000">
          <img 
            src={currentSlide.image} 
            className="w-full h-full object-cover opacity-50" 
            alt={currentSlide.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0000]/60 via-transparent to-[#0a0000]/60" />
        </div>
      </div>

      {/* Floating Reaction Bursts */}
      {reactions.map(r => (
        <div 
          key={r.id} 
          className="absolute bottom-20 z-50 text-4xl animate-bounce pointer-events-none"
          style={{ left: `${r.left}%`, animation: `reactionRise 2s ease-out forwards` }}
        >
          {r.emoji}
        </div>
      ))}

      {/* Top Chapter Timeline */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-6 z-40 px-10">
        {STORY_DATA.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => { setChapterIdx(idx); setSlideIdx(0); }}
            className={`relative group flex flex-col items-center transition-all ${idx === chapterIdx ? 'opacity-100 scale-105' : 'opacity-20 hover:opacity-50'}`}
          >
            <div className={`h-2 w-24 md:w-48 rounded-full mb-3 overflow-hidden bg-white/10`}>
                <div 
                  className={`h-full bg-gradient-to-r from-red-600 to-gold transition-all duration-700 ${idx === chapterIdx ? 'w-full' : idx < chapterIdx ? 'w-full' : 'w-0'}`} 
                />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] font-oswald italic">
                {ch.id === 'auction' ? 'Strategy' : ch.id === 'opener' ? 'Combat' : 'Dominance'}
            </span>
            {idx === chapterIdx && (
              <div className="absolute -top-4 w-2 h-2 bg-gold rounded-full shadow-[0_0_15px_#D1AB3E] animate-ping" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="absolute bottom-20 left-12 md:left-24 z-30 max-w-5xl">
        <div className="flex items-center gap-6 mb-8 animate-in slide-in-from-left-10 duration-700">
          <span className="bg-red-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-lg border border-white/20">
            {currentChapter.name}
          </span>
          <div className="h-0.5 w-24 bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>
        
        <h2 className="text-7xl md:text-[9rem] font-black font-oswald italic uppercase tracking-tighter text-white mb-8 leading-[0.85] drop-shadow-2xl animate-in slide-in-from-bottom-10 duration-700 delay-100">
          {currentSlide.title}
        </h2>
        
        <div className="flex flex-col lg:flex-row items-end gap-12">
            <div className="flex-1 space-y-8">
                <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed opacity-90 border-l-8 border-red-600 pl-10 animate-in fade-in duration-700 delay-200">
                    {currentSlide.narrative}
                </p>

                {/* AI Commentary Box */}
                <div className="glass-panel p-6 rounded-[2rem] border-2 border-gold/30 bg-gold/5 animate-in zoom-in-95 duration-700 delay-400 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-3">
                      <div className={`w-3 h-3 rounded-full ${isCommentaryLoading ? 'bg-gold animate-ping' : 'bg-gold shadow-[0_0_10px_#D1AB3E]'}`} />
                   </div>
                   <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em] mb-3">AI Commentary</p>
                   <p className="text-lg font-black italic text-white tracking-wide leading-snug">
                     {isCommentaryLoading ? "Consulting the gods of Chinnaswamy..." : `"${aiCommentary}"`}
                   </p>
                </div>
            </div>

            {/* Memorabilia Card */}
            <div className="w-64 bg-black/80 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl animate-in slide-in-from-right-10 duration-700 delay-300">
               <div className="mb-6">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em] mb-2">Milestone</p>
                 <p className="text-sm font-black text-[#39ff14] uppercase tracking-wider">{currentSlide.milestone}</p>
               </div>
               <div className="h-px w-full bg-white/5 mb-6" />
               <div>
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em] mb-2">Record</p>
                 <p className="text-lg font-black font-oswald text-gold italic uppercase tracking-tighter leading-none">{currentSlide.memorabilia}</p>
               </div>
            </div>
        </div>
      </div>

      {/* Interactive Controls & Reactions */}
      <div className="absolute bottom-20 right-12 md:right-24 z-40 flex flex-col items-center gap-8">
        {/* Navigation */}
        <div className="flex gap-4">
            <button 
              onClick={prev}
              disabled={chapterIdx === 0 && slideIdx === 0}
              className="w-20 h-20 rounded-full border-2 border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-center hover:bg-white hover:text-black transition-all disabled:opacity-10 group shadow-2xl"
            >
              <svg className="w-8 h-8 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <button 
              onClick={next}
              disabled={chapterIdx === STORY_DATA.length - 1 && slideIdx === currentChapter.slides.length - 1}
              className="w-20 h-20 rounded-full bg-[#D5152C] flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-[0_20px_50px_rgba(213,21,44,0.4)] group border-2 border-white/20"
            >
              <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
        </div>

        {/* Reaction Hub */}
        <div className="flex flex-col items-center gap-4 bg-black/60 backdrop-blur-md p-4 rounded-full border border-white/5 shadow-2xl">
           <button onClick={() => addReaction('🔥')} className="hover:scale-125 transition-transform text-2xl">🔥</button>
           <button onClick={() => addReaction('🦁')} className="hover:scale-125 transition-transform text-2xl">🦁</button>
           <button onClick={() => addReaction('❤️')} className="hover:scale-125 transition-transform text-2xl">❤️</button>
           <div className="h-px w-6 bg-white/10" />
           <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.2em] vertical-text">ROAR</p>
        </div>
      </div>

      {/* Letterboxing & Overlay FX */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
      
      {/* Visual FX Styles */}
      <style>{`
        @keyframes reactionRise {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { transform: translateY(-40px) scale(1.5); opacity: 1; }
          100% { transform: translateY(-400px) scale(0.8); opacity: 0; }
        }
        .vertical-text {
          writing-mode: vertical-lr;
        }
      `}</style>
    </div>
  );
};
