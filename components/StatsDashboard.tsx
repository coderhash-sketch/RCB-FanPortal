
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TEAM_RECORDS, COLORS } from '../constants';

const performanceData = [
  { year: '2020', points: 14, rank: 4 },
  { year: '2021', points: 18, rank: 3 },
  { year: '2022', points: 16, rank: 4 },
  { year: '2023', points: 14, rank: 6 },
  { year: '2024', points: 14, rank: 4 },
  { year: '2025', points: 19, rank: 2 },
];

export const StatsDashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black font-oswald mb-2 italic text-white uppercase tracking-tighter">STATS ENGINE</h2>
        <div className="h-1 w-32 bg-[#D5152C] mx-auto"></div>
        <p className="mt-4 text-gray-400 font-bold uppercase text-xs tracking-widest">Live Historical Data & Performance Metrics</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(TEAM_RECORDS).map(([key, value]) => (
          <div key={key} className="glass-panel p-6 rounded-2xl border-l-4 border-[#D1AB3E] transition-transform hover:scale-105">
            <p className="text-[10px] font-black uppercase text-gray-500 mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-xl font-black text-white font-oswald">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-3xl h-[400px] border border-white/5">
          <h3 className="text-xl font-black font-oswald mb-6 text-[#D5152C] uppercase tracking-tighter">POINTS TALLY (Last 6 Seasons)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="year" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2B2A29', border: '1px solid #D1AB3E', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Bar dataKey="points" fill={COLORS.RED} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-8 rounded-3xl h-[400px] border border-white/5">
          <h3 className="text-xl font-black font-oswald mb-6 text-[#D1AB3E] uppercase tracking-tighter">SEASON RANK TREND</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="year" stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis reversed domain={[1, 10]} stroke="#999" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#2B2A29', border: '1px solid #D1AB3E', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="rank" stroke={COLORS.GOLD} strokeWidth={5} dot={{ r: 8, fill: COLORS.GOLD, stroke: '#000', strokeWidth: 2 }} activeDot={{ r: 10 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
