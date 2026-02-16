
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { PLAYERS, COLORS } from './constants';
import { PlayerRole, Language } from './types';
import { StatsDashboard } from './components/StatsDashboard';
import { JerseyGenerator } from './components/JerseyGenerator';
import { BuildYourXI } from './components/BuildYourXI';
import { TriviaZone } from './components/TriviaZone';
import { FanDNADashboard } from './components/FanDNA';
import { SuperOverSimulator } from './components/SuperOverSimulator';
import { SeasonStorybook } from './components/SeasonStorybook';
import { ReactionSpeedChallenge } from './components/ReactionSpeedChallenge';
import { MatchTimeline } from './components/MatchTimeline';
import { RivalRoaster } from './components/RivalRoaster';
import { OverOutcomeDice } from './components/OverOutcomeDice';
import { PredictionRadar } from './components/PredictionRadar';
import { fetchRCBInsights } from './services/geminiService';
import { WeatherEffects, WeatherMode } from './components/WeatherEffects';
import { WeatherControls } from './components/WeatherControls';
import { Sidebar, DashboardView } from './components/Sidebar';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<Language>('EN');
  const [activeRole, setActiveRole] = useState<PlayerRole | 'All'>('All');
  const [aiInsight, setAiInsight] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState<WeatherMode>('sunny');
  const [currentView, setCurrentView] = useState<DashboardView>('home');

  useEffect(() => {
    fetchRCBInsights('the 12th man').then(setAiInsight);
  }, []);

  const filteredPlayers = PLAYERS.filter(p => {
    const matchesRole = activeRole === 'All' || p.role === activeRole;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const playerFilters = [
    'sepia(1) saturate(8) hue-rotate(340deg)',
    'sepia(1) saturate(8) hue-rotate(80deg)',
    'sepia(1) saturate(8) hue-rotate(280deg)',
    'sepia(1) saturate(8) hue-rotate(180deg)',
    'sepia(1) saturate(8) hue-rotate(40deg)',
    'sepia(1) saturate(8) hue-rotate(240deg)',
  ];

  const renderActiveView = () => {
    switch (currentView) {
      case 'story':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><SeasonStorybook /></div>;
      case 'timeline':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><MatchTimeline /></div>;
      case 'reflex':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><ReactionSpeedChallenge /></div>;
      case 'roast':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><RivalRoaster /></div>;
      case 'dice':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><OverOutcomeDice /></div>;
      case 'radar':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><PredictionRadar /></div>;
      case 'squad':
        return (
          <section id="team" className="py-20 px-6 max-w-[95rem] mx-auto animate-in fade-in slide-in-from-right-10 duration-500">
            <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-20 gap-10 border-b-2 border-black/20 pb-12">
              <div className="text-left">
                <h2 className="text-7xl md:text-8xl font-black font-oswald italic uppercase tracking-tighter text-black text-glow-gold">SQUAD LEGENDS</h2>
                <p className="text-black font-black tracking-[0.4em] uppercase mt-3 text-lg opacity-90">The Golden Era of Bengaluru</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
                <input 
                  type="text" 
                  placeholder="Search Warrior..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-black/5 border border-black/30 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest focus:border-black outline-none transition-all text-black placeholder:text-black/40"
                />
                <div className="flex flex-wrap justify-center gap-2">
                  {['All', PlayerRole.BATSMAN, PlayerRole.BOWLER, PlayerRole.ALL_ROUNDER, PlayerRole.WICKET_KEEPER].map(role => (
                    <button
                      key={role}
                      onClick={() => setActiveRole(role as any)}
                      className={`px-6 py-2.5 rounded-full text-xs font-black uppercase border-2 transition-all 
                        ${activeRole === role 
                          ? 'bg-black border-black text-white shadow-[0_0_15px_rgba(0,0,0,0.5)]' 
                          : 'border-black/20 hover:border-black text-black' 
                        }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
              {filteredPlayers.map((player, idx) => (
                <div key={player.id} className="group relative bg-[#1f0505] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all hover:-translate-y-3 shadow-2xl">
                  <div className="relative h-[24rem] overflow-hidden">
                    <img 
                      src={player.image} 
                      alt={player.name} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100 group-hover:filter-none" 
                      style={{ filter: playerFilters[idx % playerFilters.length] }}
                    />
                    <div className="absolute top-6 right-6 bg-gold text-black px-5 py-2 rounded-full text-[10px] font-black uppercase shadow-2xl z-30">
                      {player.role}
                    </div>
                    {player.bestRecord && (
                      <div className="absolute top-6 left-6 bg-orange-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase shadow-2xl z-30 border border-white/20">
                        BEST: {player.bestRecord}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-transparent to-transparent z-10" />
                    <div className="absolute bottom-8 left-8 z-20 text-left">
                      <h3 className="text-3xl font-black font-oswald uppercase text-white tracking-tighter drop-shadow-2xl leading-none">{player.name}</h3>
                    </div>
                  </div>
                  <div className="p-8 bg-gradient-to-b from-[#1a0505]/90 to-[#2d0505]/90">
                    <p className="text-gold text-xs font-black uppercase tracking-[0.3em] mb-6 text-left">{player.nationality}</p>
                    <div className="grid grid-cols-2 gap-8 border-t border-orange-900/20 pt-8">
                      <div className="text-left">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Primary Stat</p>
                        <p className="text-3xl font-black text-orange-500 font-oswald">{player.stats.runs || player.stats.wickets || '--'}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Impact Rate</p>
                        <p className="text-3xl font-black text-gold font-oswald">{player.stats.strikeRate || player.stats.economy || '--'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPlayers.length === 0 && (
                <div className="col-span-full py-20 text-center text-black font-black uppercase tracking-[0.5em] animate-pulse">
                  No Warrior Found In These Archives...
                </div>
              )}
            </div>
          </section>
        );
      case 'dream-xi':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><BuildYourXI /></div>;
      case 'armour':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><JerseyGenerator /></div>;
      case 'simulator':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><SuperOverSimulator /></div>;
      case 'trivia':
        return <div className="py-10 animate-in fade-in slide-in-from-right-10 duration-500"><TriviaZone /></div>;
      case 'home':
      default:
        return (
          <div className="animate-in fade-in duration-1000">
            {/* Hero Section - Fixed height and overflow to prevent clipping */}
            <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 rounded-b-[4rem] mx-4 border-b border-orange-500/10">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-[#1a0505]/40 to-transparent z-10 rounded-b-[4rem]" />
              <img 
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2500" 
                alt="Colorful Stadium" 
                className={`absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-all duration-1000 rounded-b-[4rem] ${
                  weather === 'sunny' ? 'brightness-125' : 
                  weather === 'cloudy' ? 'brightness-75 grayscale-[0.2]' : 
                  'brightness-50 grayscale-[0.4]'
                }`}
              />
              
              <div className="relative z-20 text-center px-6 max-w-6xl w-full">
                <div className="flex flex-col items-center gap-10 mb-12">
                  <div className="inline-flex items-center gap-3 bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,107,0,0.6)] border border-white/20">
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                    Official Fan Experience
                  </div>
                  
                  {/* Weather Selection Toggle - Moved down slightly and added z-index */}
                  <div className="animate-in fade-in slide-in-from-top-4 duration-1000 delay-300 relative z-[30]">
                     <p className="text-[10px] font-black text-gold uppercase tracking-[0.4em] mb-4 text-glow-gold">Set Stadium Atmosphere</p>
                     <WeatherControls currentMode={weather} onModeChange={setWeather} />
                  </div>
                </div>

                <h1 className="text-7xl md:text-[10rem] font-black font-oswald uppercase italic tracking-tighter leading-none my-8 drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] text-glow-gold">
                  THE 12TH <span className="text-gold block md:inline">MAN</span> HOME
                </h1>
                <p className="text-xl md:text-3xl font-bold opacity-90 max-w-4xl mx-auto mb-14 uppercase tracking-[0.15em] baseline-relaxed drop-shadow-md text-glow-red">
                  One Team. One Dream. <span className="text-orange-500 font-black">#PlayBold</span>
                </p>
                <div className="flex flex-wrap justify-center gap-8">
                  <button 
                    onClick={() => setCurrentView('squad')}
                    className="bg-white text-black px-14 py-5 rounded-full font-black uppercase transition-all hover:scale-110 hover:bg-gold active:scale-95 shadow-xl shadow-orange-500/10"
                  >
                    Explore Squad
                  </button>
                  <button 
                    onClick={() => setCurrentView('story')}
                    className="bg-orange-600 text-white px-14 py-5 rounded-full font-black uppercase transition-all hover:scale-110 hover:bg-orange-700 active:scale-95 border border-white/10 shadow-xl shadow-orange-500/20"
                  >
                    View Season Story
                  </button>
                </div>
                
                {aiInsight && (
                  <div className="mt-20 glass-panel p-6 rounded-[2rem] border border-gold/40 animate-pulse inline-block max-w-2xl">
                     <p className="text-base font-bold italic text-gold tracking-wide">“{aiInsight}”</p>
                  </div>
                )}
              </div>
            </section>

            {/* DNA Dashboard */}
            <section className="py-24 bg-transparent">
              <FanDNADashboard />
            </section>

            {/* Stats Engine */}
            <section id="stats-section" className="py-24 bg-transparent">
              <StatsDashboard />
            </section>
          </div>
        );
    }
  };

  return (
    <Layout darkMode={darkMode} setDarkMode={setDarkMode} lang={lang} setLang={setLang}>
      {/* Dynamic Stadium Weather Effects Overlay */}
      <WeatherEffects mode={weather} />

      <div className="flex min-h-screen">
        {/* Persistent Dashboard Sidebar */}
        <Sidebar activeView={currentView} onViewChange={setCurrentView} />

        {/* Main Content Area */}
        <div className="flex-1 pl-20 xl:pl-64 transition-all duration-300">
          {renderActiveView()}
        </div>
      </div>
    </Layout>
  );
};

export default App;
