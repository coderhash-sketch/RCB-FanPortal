
import React from 'react';

export type WeatherMode = 'sunny' | 'cloudy' | 'rain';

interface WeatherEffectsProps {
  mode: WeatherMode;
}

export const WeatherEffects: React.FC<WeatherEffectsProps> = ({ mode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Global Color Correction Filter based on Weather */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          mode === 'sunny' ? 'bg-orange-500/5 backdrop-brightness-110' :
          mode === 'cloudy' ? 'bg-indigo-900/20 backdrop-brightness-75 grayscale-[0.3]' :
          'bg-slate-900/40 backdrop-brightness-50'
        }`}
      />

      {/* Sunny: Sunlight Flare */}
      {mode === 'sunny' && (
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-yellow-400/20 rounded-full blur-[120px] animate-pulse" />
      )}

      {/* Rain: Animated Rain Particles */}
      {mode === 'rain' && (
        <>
          <div className="rain-container absolute inset-0 opacity-40">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i} 
                className="rain-drop absolute bg-white/60 w-[1px] h-[20px]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animation: `fall ${0.5 + Math.random() * 0.5}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate-bounce">
             <div className="bg-red-600/90 text-white px-8 py-3 rounded-full font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-white/20">
                MATCH INTERRUPTED BY RAIN
             </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fall {
          to { transform: translateY(120vh) translateX(20px); }
        }
        .rain-drop {
          transform: rotate(15deg);
        }
      `}</style>
    </div>
  );
};
