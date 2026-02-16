
import React from 'react';
import { WeatherMode } from './WeatherEffects';

interface WeatherControlsProps {
  currentMode: WeatherMode;
  onModeChange: (mode: WeatherMode) => void;
}

export const WeatherControls: React.FC<WeatherControlsProps> = ({ currentMode, onModeChange }) => {
  const modes: { id: WeatherMode; label: string; icon: string }[] = [
    { id: 'sunny', label: 'Sunny', icon: '☀️' },
    { id: 'cloudy', label: 'Cloudy', icon: '☁️' },
    { id: 'rain', label: 'Rain', icon: '🌧' },
  ];

  return (
    <div className="inline-flex bg-black/80 backdrop-blur-xl p-2 rounded-2xl border-2 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => onModeChange(m.id)}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            currentMode === m.id 
              ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/40 ring-1 ring-white/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="text-lg">{m.icon}</span>
          <span className="hidden sm:inline">{m.label}</span>
        </button>
      ))}
    </div>
  );
};
