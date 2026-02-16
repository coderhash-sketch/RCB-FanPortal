
import React, { useRef, useEffect, useState } from 'react';
import { COLORS } from '../constants';

export const JerseyGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState('WARRIOR');
  const [number, setNumber] = useState('18');
  const [loadingAssets, setLoadingAssets] = useState(true);

  // Reliable placeholder if the specific RCB URL fails
  const JERSEY_BASE_URL = 'https://i.ibb.co/Xz9kHkS/rcb-jersey-2024-front.png'; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderJersey = async () => {
      setLoadingAssets(true);
      
      const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = `${url}?t=${Date.now()}`; // Cache busting
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Image failed to load'));
        });
      };

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      try {
        const baseImg = await loadImage(JERSEY_BASE_URL);
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        console.warn("Using procedural fallback for jersey base.");
        // Procedural Fallback Jersey Shape
        ctx.fillStyle = '#1a0505'; // Dark base
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Red Gradient Top
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#D5152C');
        grad.addColorStop(0.4, '#1a0505');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // --- 1. Logo (Top Right Chest) ---
      ctx.save();
      ctx.shadowColor = 'rgba(209, 171, 62, 0.8)';
      ctx.shadowBlur = 15;
      ctx.fillStyle = COLORS.GOLD;
      ctx.beginPath();
      ctx.arc(canvas.width - 80, 70, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = '900 14px Oswald';
      ctx.textAlign = 'center';
      ctx.fillText('RCB', canvas.width - 80, 75);
      ctx.restore();

      // --- 2. STAR SPORTS (Bold) ---
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '900 42px Montserrat'; // Slightly larger and bold
      ctx.textAlign = 'center';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 12;
      // Text updated to "STAR SPORTS" only as per priority request
      ctx.fillText('STAR SPORTS', canvas.width / 2, 140);
      ctx.restore();

      // --- 3. Jersey Number (Big, ABOVE Name) ---
      const displayNum = (number || '18').toString();
      ctx.save();
      const numGrad = ctx.createLinearGradient(0, 200, 0, 400);
      numGrad.addColorStop(0, '#FFFFFF');
      numGrad.addColorStop(1, COLORS.GOLD);
      
      ctx.fillStyle = numGrad;
      ctx.font = '900 220px Oswald'; // Massive font
      ctx.textAlign = 'center';
      ctx.shadowColor = 'rgba(0,0,0,1)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 15;
      ctx.fillText(displayNum, canvas.width / 2, 380);
      ctx.restore();

      // --- 4. Name (Middle, Below Number) ---
      const displayName = (name || 'WARRIOR').toUpperCase();
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.font = '900 50px Montserrat';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '6px';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 10;
      // Positioned below the big number
      ctx.fillText(displayName, canvas.width / 2, 480);
      ctx.restore();

      // --- 5. Additional Branding ---
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '700 12px Montserrat';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL FAN ARMOUR', canvas.width / 2, canvas.height - 40);
      ctx.restore();

      setLoadingAssets(false);
    };

    renderJersey();
  }, [name, number]);

  const downloadJersey = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `RCB-Armour-${name || 'Warrior'}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div id="jersey-tool" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black font-oswald mb-4 italic text-white uppercase tracking-tighter text-glow-gold">CUSTOM ARMOUR</h2>
        <div className="h-1.5 w-40 bg-gradient-to-r from-red-600 via-gold to-red-600 mx-auto rounded-full"></div>
        <p className="mt-6 text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Star Sports Official Edition</p>
      </div>

      <div className="glass-panel rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl flex flex-col lg:flex-row bg-[#050000]">
        {/* Preview Viewport - Silhouette format as priority 2 request */}
        <div className="lg:w-1/2 p-12 bg-black flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/5">
           <div className="relative group">
              <div className="absolute -inset-10 bg-gradient-to-tr from-red-600/30 to-gold/10 blur-[60px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              
              {/* clipPath creates the T-shirt Silhouette as requested */}
              <div 
                className="relative p-2 bg-white/5 rounded-[4rem] border border-white/10 shadow-2xl transition-all duration-500 overflow-hidden"
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 20%, 90% 35%, 82% 32%, 82% 100%, 18% 100%, 18% 32%, 10% 35%, 0% 20%)'
                }}
              >
                <canvas 
                  ref={canvasRef} 
                  width={500} 
                  height={650} 
                  className="w-full max-w-[400px] h-auto shadow-inner bg-[#1a0505]"
                />
              </div>

              {loadingAssets && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 20%, 90% 35%, 82% 32%, 82% 100%, 18% 100%, 18% 32%, 10% 35%, 0% 20%)' }}>
                   <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
           </div>
           <p className="mt-12 text-[9px] font-black text-gold/60 uppercase tracking-[0.6em] animate-pulse">Armour Silhouette Active</p>
        </div>

        {/* Customization Panel */}
        <div className="lg:w-1/2 p-12 lg:p-20 space-y-12 bg-gradient-to-br from-[#1a0505] to-black">
          <div className="space-y-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase text-gold tracking-[0.4em] block">1. Enter Your Name</label>
              <input 
                type="text" 
                maxLength={15}
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                placeholder="YOUR NAME"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-6 text-3xl font-black font-oswald outline-none text-white focus:border-gold transition-all uppercase placeholder:opacity-20"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase text-gold tracking-[0.4em] block">2. Select Your Number</label>
              <input 
                type="number" 
                min="0"
                max="999"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="18"
                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-6 text-3xl font-black font-oswald outline-none text-white focus:border-gold transition-all placeholder:opacity-20"
              />
            </div>
          </div>

          <div className="pt-10 border-t border-white/10">
            <button 
              onClick={downloadJersey}
              className="w-full bg-white text-black hover:bg-gold hover:text-black px-10 py-7 rounded-2xl font-black uppercase tracking-[0.5em] transition-all shadow-2xl active:scale-95 text-sm flex items-center justify-center gap-4"
            >
              DOWNLOAD ARMOUR
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </button>
            <p className="text-center text-[9px] font-bold text-white/30 uppercase mt-8 tracking-widest italic">High-Res PNG &bull; Ready for Social Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};
