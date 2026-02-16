
import React from 'react';

export type DashboardView = 'home' | 'squad' | 'dream-xi' | 'armour' | 'simulator' | 'trivia' | 'story' | 'reflex' | 'timeline' | 'roast' | 'dice' | 'radar';

interface SidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems: { id: DashboardView; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'story', label: 'Season Story', icon: '📖' },
    { id: 'timeline', label: 'Match Timeline', icon: '🧭' },
    { id: 'squad', label: 'Squad Legends', icon: '🛡️' },
    { id: 'dream-xi', label: 'Dream XI Builder', icon: '🏆' },
    { id: 'armour', label: 'Custom Armour', icon: '👕' },
    { id: 'dice', label: 'Outcome Dice', icon: '🎲' },
    { id: 'radar', label: 'Prediction Radar', icon: '🎯' },
    { id: 'simulator', label: 'Super Over', icon: '⚡' },
    { id: 'roast', label: 'Rival Roaster', icon: '🔥' },
    { id: 'reflex', label: 'Reflex Test', icon: '🎯' },
    { id: 'trivia', label: 'Trivia Zone', icon: '🧠' },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-24 xl:w-64 bg-[#1a0505]/95 backdrop-blur-xl border-r border-orange-500/20 z-[110] flex flex-col transition-all duration-300">
      <div className="p-6 flex flex-col xl:flex-row justify-center xl:justify-start items-center gap-4 border-b border-orange-500/10">
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg shadow-orange-500/30">RCB</div>
        <span className="hidden xl:block font-black font-oswald text-xl tracking-tighter italic text-glow-gold">DASHBOARD</span>
      </div>
      
      <nav className="flex-1 py-6 px-2 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex flex-col xl:flex-row items-center gap-2 xl:gap-4 p-3 xl:p-4 rounded-2xl transition-all group ${
              activeView === item.id 
                ? 'bg-white/5 border border-white/10' 
                : 'text-gray-500 hover:bg-orange-600/5 hover:text-white'
            }`}
          >
            <span className={`text-xl transition-all ${
              activeView === item.id ? 'neonic-active scale-125' : 'group-hover:scale-110'
            }`}>
              {item.icon}
            </span>
            <span className={`block text-[8px] md:text-[9px] xl:text-[10px] font-black uppercase text-center xl:text-left tracking-widest transition-all ${
              activeView === item.id 
                ? 'neonic-active' 
                : 'opacity-60 group-hover:opacity-100'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-orange-500/10">
        <div className="flex flex-col xl:flex-row items-center gap-3 p-3 bg-orange-950/30 rounded-xl border border-orange-500/20 group cursor-pointer hover:border-gold/40 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold text-[10px] font-black group-hover:bg-gold group-hover:text-black transition-all">12</div>
          <div className="hidden xl:block text-[9px] font-black uppercase tracking-widest text-gray-400 text-left">
            <p className="text-white">Active Fan</p>
            <p className="opacity-50">Level 42</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
