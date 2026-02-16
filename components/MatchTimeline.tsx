
import React from 'react';

interface TimelinePhase {
  id: string;
  title: string;
  subtitle: string;
  stats: { label: string; value: string }[];
  description: string;
  image: string;
  color: string;
}

const PHASES: TimelinePhase[] = [
  {
    id: 'toss',
    title: 'THE TOSS',
    subtitle: 'Chinnaswamy Stadium, 7:00 PM',
    stats: [{ label: 'DECISION', value: 'BOWL FIRST' }, { label: 'PROBABILITY', value: '52%' }],
    description: "The roar of the crowd peaks as the coin flips. Faf calls it right. 'We'll have a bowl,' he says. The plan is set: contain and chase.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1600",
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'powerplay',
    title: 'POWERPLAY',
    subtitle: 'Overs 1 - 6',
    stats: [{ label: 'RUNS', value: '62/1' }, { label: 'STRIKE RATE', value: '185.0' }],
    description: "Aggression from ball one. The openers dance down the track, clearing the ropes with ease. The field is restricted, but the boundaries are not.",
    image: "https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=1600",
    color: 'from-red-600 to-orange-500'
  },
  {
    id: 'middle',
    title: 'MIDDLE OVERS',
    subtitle: 'Overs 7 - 15',
    stats: [{ label: 'DOT BALLS', value: '18' }, { label: 'WICKETS', value: '2' }],
    description: "The game of chess begins. Spinners weave a web, drying up the runs. Strategic timeouts, tactical shifts. This is where matches are won or lost.",
    image: "https://images.unsplash.com/photo-1508344922997-5a3d76b17671?auto=format&fit=crop&q=80&w=1600",
    color: 'from-orange-500 to-gold'
  },
  {
    id: 'death',
    title: 'DEATH OVERS',
    subtitle: 'The Finish Line',
    stats: [{ label: 'RUNS REQ', value: '42' }, { label: 'BALLS', value: '12' }],
    description: "High intensity. Every ball is an event. Yorkers meet helicopter shots. The Chinnaswamy lights flicker in anticipation. This is #PlayBold territory.",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=1600",
    color: 'from-gold to-orange-600'
  }
];

export const MatchTimeline: React.FC = () => {
  return (
    <div className="h-[85vh] w-full relative overflow-hidden bg-black/50">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold mb-2">Interactive Match Voyage</p>
         <h2 className="text-3xl font-black font-oswald text-white italic tracking-tighter">SCROLL TO RELIVE</h2>
      </div>

      <div className="h-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar">
        {PHASES.map((phase) => (
          <section 
            key={phase.id} 
            className="h-full w-full flex-shrink-0 snap-center relative flex items-center justify-center"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={phase.image} 
                className="w-full h-full object-cover opacity-40 grayscale-[0.5] transition-all hover:grayscale-0" 
                alt={phase.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-transparent to-transparent" />
            </div>

            {/* Content Panel */}
            <div className="relative z-10 w-full max-w-6xl px-12 grid lg:grid-cols-2 gap-20 items-center">
               <div className="animate-in slide-in-from-left-20 fade-in duration-1000">
                  <div className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${phase.color} text-white text-[10px] font-black uppercase tracking-widest mb-6`}>
                    {phase.subtitle}
                  </div>
                  <h3 className="text-8xl md:text-[10rem] font-black font-oswald text-white italic tracking-tighter leading-none mb-8 drop-shadow-2xl">
                    {phase.title}
                  </h3>
                  <p className="text-xl text-gray-300 font-medium leading-relaxed max-w-lg border-l-4 border-orange-500 pl-8 mb-10 italic opacity-90">
                    {phase.description}
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-right-20 fade-in duration-1000 delay-300">
                  {phase.stats.map((s, i) => (
                    <div key={i} className="glass-panel p-10 rounded-[3rem] border border-white/5 text-center group hover:border-orange-500/50 transition-all">
                       <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2 group-hover:text-orange-500">{s.label}</p>
                       <p className="text-6xl font-black font-oswald text-white italic">{s.value}</p>
                    </div>
                  ))}
                  <div className="col-span-2 glass-panel p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Phase Momentum</span>
                     <div className="flex-1 mx-8 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${phase.color} animate-pulse`} style={{ width: '75%' }}></div>
                     </div>
                     <span className="text-gold font-black text-xs italic">HIGH</span>
                  </div>
               </div>
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-6 items-center">
        {PHASES.map((p, i) => (
          <div key={p.id} className="h-1.5 w-12 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full bg-orange-600 transition-all duration-300 ${i === 0 ? 'w-full' : 'w-0'}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};
