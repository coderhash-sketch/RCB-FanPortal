
import React, { useState } from 'react';
import { PLAYERS } from '../constants';
import { Player } from '../types';

export const BuildYourXI: React.FC = () => {
  const [selectedXI, setSelectedXI] = useState<Player[]>([]);
  const [availablePlayers] = useState<Player[]>(PLAYERS);

  const togglePlayer = (player: Player) => {
    if (selectedXI.some(p => p.id === player.id)) {
      setSelectedXI(selectedXI.filter(p => p.id !== player.id));
    } else if (selectedXI.length < 11) {
      setSelectedXI([...selectedXI, player]);
    }
  };

  const playerFilters = [
    'sepia(1) saturate(8) hue-rotate(340deg)', // Red
    'sepia(1) saturate(8) hue-rotate(80deg)',  // Green
    'sepia(1) saturate(8) hue-rotate(280deg)', // Pink
    'sepia(1) saturate(8) hue-rotate(180deg)', // Blue
    'sepia(1) saturate(8) hue-rotate(40deg)',  // Gold
    'sepia(1) saturate(8) hue-rotate(240deg)', // Purple/Violet
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Updated text color to black for better visibility */}
          <h2 className="text-3xl font-black font-oswald mb-6 text-black tracking-tighter italic uppercase">
            DREAM XI BUILDER <span className="text-black/60">({selectedXI.length}/11)</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availablePlayers.map((player, idx) => {
              const isSelected = selectedXI.some(p => p.id === player.id);
              return (
                <div 
                  key={player.id}
                  onClick={() => togglePlayer(player)}
                  className={`cursor-pointer group relative overflow-hidden rounded-xl border-2 transition-all ${isSelected ? 'border-[#D1AB3E] scale-95 opacity-50' : 'border-white/5 hover:border-[#D5152C]'}`}
                >
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-full h-40 object-cover transition-all duration-500 group-hover:filter-none" 
                    style={{ filter: playerFilters[idx % playerFilters.length] }}
                  />
                  <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black text-white text-[10px] font-black uppercase tracking-widest">
                    {player.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-80 glass-panel p-6 rounded-2xl border-t-4 border-gold self-start sticky top-32">
          <h3 className="text-xl font-black font-oswald mb-6 border-b border-gold/20 pb-2 italic uppercase">YOUR SQUAD</h3>
          <div className="space-y-3 min-h-[400px]">
            {selectedXI.length === 0 && <p className="text-gray-500 italic text-sm">Select 11 warriors to lead the army...</p>}
            {selectedXI.map((player, idx) => (
              <div key={player.id} className="flex items-center gap-3 bg-red-950/20 p-2 rounded-lg border-l-4 border-red-600 animate-in slide-in-from-right-4">
                <span className="text-gold font-black text-xs">{idx + 1}</span>
                <span className="flex-1 font-black text-[10px] uppercase tracking-widest truncate">{player.name}</span>
                <button onClick={() => togglePlayer(player)} className="text-red-500 font-black px-2 hover:scale-125 transition-transform">×</button>
              </div>
            ))}
          </div>
          {selectedXI.length === 11 && (
            <button className="w-full mt-6 bg-[#D5152C] text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 text-xs">
              Share Dream Squad
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
