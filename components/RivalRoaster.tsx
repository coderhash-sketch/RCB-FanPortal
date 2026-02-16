
import React, { useState } from 'react';

interface TeamRoasts {
  [key: string]: string[];
}

const ROASTS: TeamRoasts = {
  "Mumbai Indians": [
    "Five trophies? Even your calculators are tired of counting them.",
    "The only thing more confusing than your net run rate math is your captaincy changes.",
    "Wankhede is great, but even the sea can't wash away that 2024 season memory.",
    "Reliance on 'Ambani power' is high, but the playoffs felt like a distant dream recently.",
    "You have more coaching staff than playing XI members at this point."
  ],
  "Chennai Super Kings": [
    "The only team whose average age is higher than the stadium's foundation.",
    "Whistle Podu? More like 'Whistle Slow-du' because the fans take 5 minutes to stand up.",
    "You guys treat every season like a retirement home farewell tour.",
    "Thala for a reason, but the reason is usually to keep the run rate below 6.",
    "Your strategy is basically: 1. Defend. 2. Hope the other team forgets how to bat."
  ],
  "Kolkata Knight Riders": [
    "Korbo Lorbo Jeetbo? More like 'Wait-bo' for another trophy for a decade.",
    "The only thing louder than the Eden Gardens is SRK's jacket in the stands.",
    "Your mystery spinners are so mysterious even they don't know where the ball is going.",
    "Gambhir left, came back, and you still can't decide on a fixed opening pair.",
    "Black and Gold is a great combo, shame the cricket isn't always as shiny."
  ],
  "Sunrisers Hyderabad": [
    "Your batting strategy: If the openers don't score 100, we fold like a deck of cards.",
    "The 'Orange Army' is basically a traveling group of David Warner fans in denial.",
    "Even your social media admin seems bored of the 140-run targets.",
    "You changed your name from Deccan Chargers but kept the 'charging into the bottom half' vibe.",
    "Kavya Maran's reactions are the only thing keeping the cameras on your matches."
  ],
  "Delhi Capitals": [
    "Changing the name from Daredevils to Capitals didn't change the empty trophy cabinet.",
    "You have a great squad on paper, unfortunately, matches are played on grass.",
    "Pant's behind-the-stumps chatter is more exciting than your middle-order batting.",
    "The only 'Capital' you have is the capital city you represent.",
    "Rishabh Pant hits sixes, but your management hits self-destruct buttons every auction."
  ],
  "Rajasthan Royals": [
    "The 2008 champions! And that's the only line in your history book.",
    "Halla Bol? More like 'Halla Low' because nobody hears you in the big games.",
    "Even Pink jerseys can't hide the fact that you're the IPL's biggest 'What If?' team.",
    "Your fans are harder to find than a yorker from your domestic pacers.",
    "The team that proves money can't buy consistency, even in a desert."
  ],
  "Punjab Kings": [
    "The only team that finishes 6th as a matter of religious principle.",
    "Preity Zinta's smile is the only reason people still tune in to watch you lose.",
    "You change your logo, jersey, and captain more often than a toddler changes clothes.",
    "Punjab Kings: Providing entertainment to 9 other teams since 2008.",
    "Your middle order is as stable as a house of cards in a hurricane."
  ],
  "Gujarat Titans": [
    "The 'New Kids' who won once and now think they're the neighborhood bullies.",
    "Hardik left and suddenly the 'Magic' felt more like a cheap card trick.",
    "Even the Ahmedabad stadium is too big for your fan base to fill without free tickets.",
    "You're like that one student who topped once and never let anyone forget it.",
    "Ashish Nehra's clipboard has more personality than your entire social media presence."
  ],
  "Lucknow Super Giants": [
    "Your jersey looks like a secondary school sports day uniform from the 90s.",
    "The 'Super Giants' name is ironic considering the size of your impact in the playoffs.",
    "KL Rahul's strike rate is the eighth wonder of the world – in a bad way.",
    "The only thing 'Super' about you is how quickly you lost your momentum.",
    "Gautam Gambhir left for KKR because even he couldn't handle the intensity of... nothing."
  ]
};

const TEAMS = Object.keys(ROASTS);

export const RivalRoaster: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [currentRoast, setCurrentRoast] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRoast = (team: string) => {
    setIsAnimating(true);
    setSelectedTeam(team);
    const teamRoasts = ROASTS[team];
    const randomIndex = Math.floor(Math.random() * teamRoasts.length);
    
    // Tiny delay for animation feel
    setTimeout(() => {
      setCurrentRoast(teamRoasts[randomIndex]);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-6xl font-black font-oswald mb-4 italic text-white uppercase tracking-tighter text-glow-gold">RIVAL ROASTER</h2>
        <p className="text-[#00ffcc] font-black tracking-[0.4em] uppercase text-xs animate-pulse">Burn the competition (playfully)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Team Selector Grid */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-3">
          {TEAMS.map((team) => (
            <button
              key={team}
              onClick={() => generateRoast(team)}
              className={`p-4 rounded-xl font-black text-[10px] uppercase tracking-widest border-2 transition-all duration-300 text-center flex items-center justify-center min-h-[80px] ${
                selectedTeam === team 
                  ? 'bg-white text-black border-[#ff00ff] shadow-[0_0_20px_#ff00ff]' 
                  : 'bg-black/40 text-white border-white/10 hover:border-[#00ffcc] hover:shadow-[0_0_15px_#00ffcc]'
              }`}
            >
              {team}
            </button>
          ))}
        </div>

        {/* Stadium LED Board Display */}
        <div className="lg:col-span-2">
          <div className="relative group">
            {/* Neonic Glow Effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff00ff] via-[#00ffcc] to-[#39ff14] rounded-[3rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"></div>
            
            <div className="relative bg-black rounded-[2.5rem] border-4 border-[#00ffcc] p-1 shadow-[0_0_50px_rgba(0,255,204,0.3)]">
              {/* LED Texture Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none rounded-[2.3rem]" style={{ 
                backgroundImage: 'radial-gradient(#00ffcc 1px, transparent 0)', 
                backgroundSize: '4px 4px' 
              }}></div>
              
              <div className="bg-[#050505] rounded-[2.2rem] p-12 min-h-[350px] flex flex-col items-center justify-center text-center overflow-hidden border-2 border-[#ff00ff]/30">
                {!selectedTeam ? (
                  <div className="space-y-6">
                    <div className="text-6xl mb-6">🤜🤛</div>
                    <h3 className="text-2xl font-black font-oswald text-[#39ff14] italic uppercase tracking-widest animate-pulse">SELECT A TARGET</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-loose max-w-xs">
                      The 12th Man Army is ready for banter. Choose a rival team to start the fire.
                    </p>
                  </div>
                ) : (
                  <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <div className="flex items-center justify-center gap-3 mb-8">
                       <span className="h-px w-10 bg-[#ff00ff]"></span>
                       <span className="text-[10px] font-black text-[#ff00ff] uppercase tracking-[0.5em]">{selectedTeam} ROASTED</span>
                       <span className="h-px w-10 bg-[#ff00ff]"></span>
                    </div>
                    
                    <p className="text-4xl md:text-5xl font-black font-oswald text-white italic leading-tight uppercase tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      "{currentRoast}"
                    </p>
                    
                    <div className="mt-12">
                       <button 
                        onClick={() => generateRoast(selectedTeam)}
                        className="bg-[#00ffcc] text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all active:scale-95"
                       >
                         Next Roast
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Neonic Accents */}
            <div className="absolute top-0 right-10 w-20 h-1 bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"></div>
            <div className="absolute bottom-0 left-10 w-20 h-1 bg-[#39ff14] shadow-[0_0_10px_#39ff14]"></div>
          </div>
          
          <div className="mt-10 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff00ff] animate-ping"></div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">NEON DRIVE 2.0</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-ping delay-300"></div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">BANTER MODE ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
