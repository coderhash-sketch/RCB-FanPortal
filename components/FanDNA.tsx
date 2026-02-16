
import React from 'react';
import { FanDNA } from '../types';

export const FanDNADashboard: React.FC = () => {
  const stats: FanDNA = {
    loyaltyPoints: 12500,
    yearsFollowing: 14,
    matchesAttended: 32,
    quizScore: 980,
    rank: 'Challenger Supreme'
  };

  const honors = [
    { title: 'Stadium Veteran', icon: '🏟️', desc: 'Visited 30+ Matches', unlocked: true },
    { title: 'Bold Believer', icon: '🦁', desc: '10+ Years Following', unlocked: true },
    { title: 'Trivia Titan', icon: '🧠', desc: '900+ Quiz Score', unlocked: true },
    { title: 'Squad Master', icon: '📋', desc: 'Perfect Dream XI', unlocked: false },
    { title: 'Silent Hero', icon: '🤫', desc: 'First to Roar', unlocked: false },
  ];

  const milestones = [
    { name: 'Rookie', pts: 0, current: false },
    { name: 'Warrior', pts: 5000, current: false },
    { name: 'Challenger', pts: 10000, current: true },
    { name: 'Supreme', pts: 12500, current: true },
    { name: 'HOF', pts: 15000, current: false },
  ];

  const perks = [
    { id: 'wallpaper', name: 'Ultra-HD Wallpaper', status: 'Unlocked', type: 'Digital' },
    { id: 'badge', name: 'Supreme Member Badge', status: 'Unlocked', type: 'Profile' },
    { id: 'autograph', name: 'Digital Autograph (VK)', status: 'Locked', type: 'Rare' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden border-t-8 border-[#D5152C]">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative group">
               <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-gold rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative w-24 h-24 rounded-full bg-black p-1">
                 <img src="https://www.royalchallengers.com/PRRCB01/public/styles/1061x767_landscape/public/2025-06/_AIL8656.jpg?itok=vcdm3E9V" className="w-full h-full rounded-full object-cover border-2 border-gold/30" alt="Fan" />
               </div>
            </div>
            <div>
              <h2 className="text-3xl font-black font-oswald text-white uppercase tracking-tighter">THE 12TH MAN PROFILE</h2>
              <div className="flex items-center gap-2">
                <p className="text-[#D1AB3E] font-bold tracking-widest">{stats.rank}</p>
                <span className="w-2 h-2 bg-[#39ff14] rounded-full animate-pulse shadow-[0_0_8px_#39ff14]"></span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
             {[
               { label: 'Loyalty Points', val: stats.loyaltyPoints },
               { label: 'Years of Pride', val: stats.yearsFollowing },
               { label: 'Stadium Visits', val: stats.matchesAttended },
               { label: 'Trivia Rank', val: stats.quizScore }
             ].map(item => (
               <div key={item.label} className="bg-black/40 p-4 rounded-xl text-center border border-white/5 hover:border-red-600/30 transition-colors group">
                 <p className="text-[10px] font-black text-gray-400 uppercase mb-1 group-hover:text-gold transition-colors">{item.label}</p>
                 <p className="text-2xl font-black text-[#D5152C]">{item.val}</p>
               </div>
             ))}
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">The Road to Hall of Fame</p>
                <p className="text-[10px] font-black text-white/40 uppercase">Target: 15,000 Pts</p>
             </div>
             <div className="relative h-12 flex items-center">
                <div className="absolute inset-x-0 h-1.5 bg-white/5 rounded-full" />
                <div 
                  className="absolute left-0 h-1.5 bg-gradient-to-r from-red-600 to-gold rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(209,171,62,0.4)]" 
                  style={{ width: `${(stats.loyaltyPoints / 15000) * 100}%` }}
                />
                <div className="absolute w-full flex justify-between px-2">
                   {milestones.map((m, idx) => (
                     <div key={idx} className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all ${m.current ? 'bg-gold border-white scale-125 shadow-[0_0_10px_gold]' : stats.loyaltyPoints >= m.pts ? 'bg-red-600 border-red-400' : 'bg-[#1a0505] border-white/10'}`} />
                        <span className={`text-[8px] font-black uppercase mt-2 tracking-tighter ${m.current ? 'text-gold' : 'text-gray-500'}`}>{m.name}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Rank Card */}
          <div className="bg-[#D1AB3E] text-black p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
             <p className="text-xs font-black uppercase mb-2 relative z-10">Current Fan Rank</p>
             <h3 className="text-4xl font-black font-oswald italic leading-tight mb-4 relative z-10">CHALLENGER SUPREME</h3>
             <div className="w-full h-3 bg-black/20 rounded-full mb-4 relative z-10">
               <div className="w-[85%] h-full bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
             </div>
             <p className="text-sm font-bold relative z-10">2,500 more points to REACH HOF RANK</p>
          </div>

          {/* New Feature: Daily Loyalty Streak */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
             <div className="flex gap-1.5 mb-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className={`w-2 h-8 rounded-full ${i < 4 ? 'bg-[#39ff14] shadow-[0_0_8px_#39ff14]' : 'bg-white/10'}`}></div>
                ))}
             </div>
             <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">4 Day Streak</p>
             <p className="text-[8px] font-bold text-white/40 uppercase mt-1 italic">Login tomorrow for a +100 Point Multiplier</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Battle Honors */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[3rem] border border-white/5">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <div>
                <h4 className="text-2xl font-black font-oswald text-white italic uppercase tracking-tighter">BATTLE HONORS</h4>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Achievements Earned in the Chinnaswamy Trenches</p>
              </div>
              <div className="flex gap-2">
                 <span className="px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/30 text-red-500 text-[10px] font-black uppercase">Unlocked: 3/5</span>
              </div>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {honors.map((honor, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-4 rounded-2xl border flex flex-col items-center text-center transition-all group ${
                    honor.unlocked 
                      ? 'bg-gradient-to-br from-[#1a0505] to-black border-gold/20 hover:border-gold/60 shadow-lg' 
                      : 'bg-black/20 border-white/5 opacity-40 grayscale'
                  }`}
                >
                  <div className="text-3xl mb-3 transition-transform group-hover:scale-125 duration-300">{honor.icon}</div>
                  <p className="text-[9px] font-black text-white uppercase mb-1 tracking-widest leading-tight">{honor.title}</p>
                </div>
              ))}
           </div>
        </div>

        {/* New Feature: Fan Vault (Perks) */}
        <div className="glass-panel p-8 rounded-[3rem] border border-white/5 bg-gradient-to-b from-[#1a0505] to-black">
           <h4 className="text-xl font-black font-oswald text-gold italic uppercase tracking-tighter mb-6">SUPREME VAULT</h4>
           <div className="space-y-4">
              {perks.map(perk => (
                <div key={perk.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="text-left">
                    <p className={`text-[9px] font-black uppercase ${perk.status === 'Locked' ? 'text-red-500' : 'text-[#39ff14]'}`}>{perk.status}</p>
                    <p className="text-xs font-bold text-white uppercase tracking-tight">{perk.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black text-gray-500 uppercase">{perk.type}</p>
                  </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-6 py-3 rounded-xl bg-gold text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all">
             Refresh Rewards
           </button>
        </div>
      </div>
    </div>
  );
};
