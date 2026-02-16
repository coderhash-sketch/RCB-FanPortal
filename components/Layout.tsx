
import React from 'react';
import { RCBCrest, COLORS } from '../constants';
import { Language } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, darkMode, setDarkMode, lang, setLang }) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-transparent text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sticky Header - Adjusted for Sidebar with new color theme */}
      <header className={`sticky top-0 z-[100] w-full px-8 py-5 pl-24 xl:pl-72 flex items-center justify-between border-b ${darkMode ? 'border-orange-500/20 bg-[#2d0505]/95' : 'border-orange-500/20 bg-white/95'} backdrop-blur-2xl shadow-2xl transition-all duration-300`}>
        <div 
          className="flex items-center gap-5 cursor-pointer group" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <RCBCrest />
          <h1 className="text-3xl font-black font-oswald tracking-tighter uppercase italic group-hover:scale-105 transition-transform">
            <span className="text-orange-500">Royal</span> Challengers <span className="text-gold">Bengaluru</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 bg-orange-900/30 rounded-full px-4 py-1.5 border border-orange-500/30">
            <span className="text-[10px] font-black opacity-50">LANG:</span>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-xs font-black outline-none cursor-pointer focus:text-gold uppercase tracking-widest"
            >
              <option value="EN" className="bg-[#2d0505]">EN</option>
              <option value="HI" className="bg-[#2d0505]">HI</option>
            </select>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-orange-600/10 border border-orange-600/30 hover:bg-orange-600/30 transition-all active:scale-90 shadow-lg shadow-orange-600/20"
            title="Toggle Mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className={`mt-auto py-24 px-8 pl-24 xl:pl-72 border-t ${darkMode ? 'border-orange-900/40 bg-[#1a0505]' : 'border-gray-200 bg-gray-100'} text-center overflow-hidden relative transition-all duration-300`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
          
          <div className="flex flex-col items-center mb-10">
            <RCBCrest />
            <h2 className="mt-6 text-4xl font-black font-oswald text-white italic tracking-tighter text-glow-gold">THE 12TH MAN ARMY</h2>
            <p className="mt-2 text-xs font-black opacity-50 uppercase tracking-[0.5em]">United By Fire. Driven By Pride.</p>
          </div>
          
          <div className="mt-12 flex justify-center gap-12">
            <a href="https://www.facebook.com/RoyalChallengersBengaluru/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 hover:text-orange-500 transition-all group">
              <div className="w-14 h-14 rounded-full bg-orange-950/40 border border-orange-600/30 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600/20 transition-all shadow-lg group-hover:shadow-orange-600/30">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="font-black text-[10px] uppercase tracking-widest opacity-60">Facebook</span>
            </a>
            <a href="https://www.instagram.com/royalchallengersbengaluru/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 hover:text-orange-500 transition-all group">
              <div className="w-14 h-14 rounded-full bg-orange-950/40 border border-orange-600/30 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600/20 transition-all shadow-lg group-hover:shadow-orange-600/30">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <span className="font-black text-[10px] uppercase tracking-widest opacity-60">Instagram</span>
            </a>
            <a href="https://twitter.com/RCBTweets" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 hover:text-orange-500 transition-all group">
              <div className="w-14 h-14 rounded-full bg-orange-950/40 border border-orange-600/30 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-600/20 transition-all shadow-lg group-hover:shadow-orange-600/30">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <span className="font-black text-[10px] uppercase tracking-widest opacity-60">Twitter</span>
            </a>
          </div>

          <div className="mt-20 pt-10 border-t border-orange-900/10 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">&copy; 2024 Royal Challengers Bengaluru. Official Fan Portal.</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gold transition-colors">Contact Army</a>
            </div>
          </div>
      </footer>
    </div>
  );
};
