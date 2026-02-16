
import React from 'react';
import { Player, PlayerRole } from './types';

export const COLORS = {
  RED: '#D5152C',
  BLACK: '#1a0505',
  GOLD: '#D1AB3E',
};

export const PLAYERS: Player[] = [
  // Legends & High Profile
  { id: 'vk18', name: 'Virat Kohli', role: PlayerRole.BATSMAN, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=400', bestRecord: '113* vs KXIP (2016)', stats: { matches: 252, runs: 8004, strikeRate: 131.97 } },
  { id: 'cg333', name: 'Chris Gayle', role: PlayerRole.BATSMAN, nationality: 'West Indian', image: 'https://images.unsplash.com/photo-1508344922997-5a3d76b17671?auto=format&fit=crop&q=80&w=400', bestRecord: '175* vs PWI (World Record)', stats: { matches: 142, runs: 4965, strikeRate: 148.96 } },
  { id: 'abd17', name: 'AB de Villiers', role: PlayerRole.BATSMAN, nationality: 'South African', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', bestRecord: '133* vs MI (2015)', stats: { matches: 184, runs: 5162, strikeRate: 151.68 } },
  { id: 'ak360', name: 'Anil Kumble', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: '5/5 vs RR (Iconic)', stats: { matches: 42, wickets: 45, strikeRate: 105.0, economy: 6.57 } },
  { id: 'ds8', name: 'Dale Steyn', role: PlayerRole.BOWLER, nationality: 'South African', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: '3/8 vs MI', stats: { matches: 95, wickets: 97, strikeRate: 120.0, economy: 6.91 } },
  { id: 'yzc3', name: 'Yuzvendra Chahal', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '6/25 vs ENG (T20I)', stats: { matches: 131, wickets: 139, strikeRate: 115.0, economy: 7.58 } },
  { id: 'mstarc', name: 'Mitchell Starc', role: PlayerRole.BOWLER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '4/15 vs KXIP', stats: { matches: 27, wickets: 34, strikeRate: 125.0, economy: 7.17 } },
  { id: 'dk19', name: 'Dinesh Karthik', role: PlayerRole.WICKET_KEEPER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: 'Finisher Extraordinaire', stats: { matches: 257, runs: 4842, strikeRate: 135.36 } },
  { id: 'gm32', name: 'Glenn Maxwell', role: PlayerRole.ALL_ROUNDER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: '94 vs RR (RCB Best)', stats: { matches: 134, runs: 2771, wickets: 37, strikeRate: 156.7, economy: 8.3 } },
  { id: 'sw08', name: 'Shane Watson', role: PlayerRole.ALL_ROUNDER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=400', bestRecord: '117* Final Performance', stats: { matches: 145, runs: 3874, wickets: 92, strikeRate: 137.9 } },
  { id: 'ys51', name: 'Yuvraj Singh', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400', bestRecord: '68 vs DD (RCB High)', stats: { matches: 132, runs: 2750, wickets: 36, strikeRate: 129.7 } },
  { id: 'hp38', name: 'Harshal Patel', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1531414150802-0a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '32 Wickets in a Season', stats: { matches: 92, wickets: 111, strikeRate: 115, economy: 8.5 } },
  { id: 'sd44', name: 'Shivam Dube', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', bestRecord: 'Longest Sixes', stats: { matches: 51, runs: 1106, strikeRate: 141.7 } },
  { id: 'wj37', name: 'Will Jacks', role: PlayerRole.ALL_ROUNDER, nationality: 'English', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: '100* vs GT (41 balls)', stats: { matches: 8, runs: 230, strikeRate: 175.5 } },
  { id: 'bk01', name: 'Bhuvneshwar Kumar', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '5/19 vs KXIP', stats: { matches: 160, wickets: 170, strikeRate: 110, economy: 7.39 } },
  { id: 'uy02', name: 'Umesh Yadav', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: '3/23 vs KXIP', stats: { matches: 141, wickets: 136, strikeRate: 120, economy: 8.43 } },
  { id: 'jh03', name: 'Josh Hazlewood', role: PlayerRole.BOWLER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '4/25 vs LSG', stats: { matches: 30, wickets: 35, strikeRate: 115, economy: 8.02 } },
  { id: 'ts04', name: 'Tim Southee', role: PlayerRole.BOWLER, nationality: 'New Zealander', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: '3/24 vs MI', stats: { matches: 54, wickets: 47, strikeRate: 112, economy: 8.67 } },
  { id: 'dv06', name: 'Daniel Vettori', role: PlayerRole.ALL_ROUNDER, nationality: 'New Zealander', image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=400', bestRecord: '3/15 vs Kochi', stats: { matches: 34, wickets: 28, strikeRate: 105.0, economy: 6.78 } },
  { id: 'ma29', name: 'Moeen Ali', role: PlayerRole.ALL_ROUNDER, nationality: 'English', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: '66 vs KKR (RCB)', stats: { matches: 34, runs: 637, wickets: 10, strikeRate: 158.4 } },
  { id: 'wh30', name: 'Wanindu Hasaranga', role: PlayerRole.ALL_ROUNDER, nationality: 'Sri Lankan', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: '5/18 vs SRH', stats: { matches: 26, wickets: 35, strikeRate: 130.0, economy: 8.13 } },
  { id: 'vk53', name: 'Vinay Kumar', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '3/27 vs MI', stats: { matches: 105, wickets: 105, strikeRate: 110, economy: 8.39 } },
  { id: 'ms05', name: 'Mandeep Singh', role: PlayerRole.BATSMAN, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400', bestRecord: '54* vs KKR', stats: { matches: 111, runs: 1706, strikeRate: 123.9 } },
  { id: 'll07', name: 'Liam Livingstone', role: PlayerRole.ALL_ROUNDER, nationality: 'English', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: '70 vs RCB (Opponent)', stats: { matches: 32, runs: 828, strikeRate: 165.6 } },
  { id: 'td09', name: 'Tim David', role: PlayerRole.BATSMAN, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1508344922997-5a3d76b17671?auto=format&fit=crop&q=80&w=400', bestRecord: '46* vs SRH', stats: { matches: 25, runs: 418, strikeRate: 177.9 } },
  { id: 'mh10', name: 'Moises Henriques', role: PlayerRole.ALL_ROUNDER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '74* vs DD', stats: { matches: 62, runs: 1000, wickets: 42, strikeRate: 128.5 } },
  { id: 'rs11', name: 'Romario Shepherd', role: PlayerRole.ALL_ROUNDER, nationality: 'West Indian', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: '39* (10 balls) vs DC', stats: { matches: 10, runs: 120, wickets: 8, strikeRate: 150.0 } },
  { id: 'ds12', name: 'Darren Sammy', role: PlayerRole.ALL_ROUNDER, nationality: 'West Indian', image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=400', bestRecord: '38* vs RR', stats: { matches: 22, runs: 295, wickets: 11, strikeRate: 122.4 } },
  { id: 'ds13', name: 'Daniel Sams', role: PlayerRole.ALL_ROUNDER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: '4/30 vs CSK', stats: { matches: 16, wickets: 14, strikeRate: 110.0, economy: 8.7 } },
  { id: 'vi14', name: 'Venkatesh Iyer', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: '104 vs MI (2023)', stats: { matches: 36, runs: 956, strikeRate: 130.2 } },
  { id: 'ss15', name: 'Suyash Sharma', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '3/30 Debut vs RCB', stats: { matches: 11, wickets: 10, strikeRate: 110, economy: 8.2 } },
  { id: 'rs16', name: 'Rasikh Salam', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: 'Consistent Pace', stats: { matches: 3, wickets: 0, strikeRate: 100, economy: 10.5 } },
  { id: 'yd17', name: 'Yash Dayal', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', bestRecord: '3/18 vs CSK (Final Over Hero)', stats: { matches: 14, wickets: 15, strikeRate: 110, economy: 9.4 } },
  { id: 'sa18', name: 'Sean Abbott', role: PlayerRole.BOWLER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: 'Big Bash Legend', stats: { matches: 2, wickets: 0, strikeRate: 100, economy: 11.4 } },
  { id: 'am19', name: 'Albie Morkel', role: PlayerRole.ALL_ROUNDER, nationality: 'South African', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: '28 runs in 1 over (Kohli)', stats: { matches: 91, runs: 974, wickets: 85, strikeRate: 141.9 } },
  { id: 'sa20', name: 'Shahbaz Ahmed', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400', bestRecord: '3/7 vs SRH in 1 over', stats: { matches: 39, runs: 321, wickets: 14, strikeRate: 120.5 } },
  { id: 'sk21', name: 'Sarfaraz Khan', role: PlayerRole.BATSMAN, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1508344922997-5a3d76b17671?auto=format&fit=crop&q=80&w=400', bestRecord: '35* vs SRH (RCB Debut)', stats: { matches: 50, runs: 585, strikeRate: 130.5 } },
  { id: 'tm22', name: 'Tymal Mills', role: PlayerRole.BOWLER, nationality: 'English', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: 'Slower Ball Expert', stats: { matches: 10, wickets: 11, strikeRate: 110, economy: 9.4 } },
  { id: 'dw23', name: 'David Willey', role: PlayerRole.ALL_ROUNDER, nationality: 'English', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '3/20 vs RR', stats: { matches: 11, wickets: 6, strikeRate: 120.0, economy: 8.2 } },
  { id: 'az24', name: 'Adam Zampa', role: PlayerRole.BOWLER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '6/19 vs SRH', stats: { matches: 14, wickets: 21, strikeRate: 105, economy: 7.73 } },
  { id: 'ml25', name: 'Mahipal Lomror', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: '54 vs CSK', stats: { matches: 30, runs: 407, strikeRate: 130.5 } },
  { id: 'qdk26', name: 'Quinton de Kock', role: PlayerRole.WICKET_KEEPER, nationality: 'South African', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: '108 vs RCB (Opponent)', stats: { matches: 96, runs: 2907, strikeRate: 134.2 } },
  { id: 'jpd27', name: 'JP Duminy', role: PlayerRole.ALL_ROUNDER, nationality: 'South African', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: '4/17 (Best Bowling)', stats: { matches: 83, runs: 2029, wickets: 23, strikeRate: 124.0 } },
  { id: 'ca28', name: 'Corey Anderson', role: PlayerRole.ALL_ROUNDER, nationality: 'New Zealander', image: 'https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&q=80&w=400', bestRecord: '95* vs RR (MI Hero)', stats: { matches: 30, runs: 521, wickets: 11, strikeRate: 127.0 } },
  { id: 'kn31', name: 'Karun Nair', role: PlayerRole.BATSMAN, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=400', bestRecord: '303* Test Cricket', stats: { matches: 76, runs: 1496, strikeRate: 128.3 } },
  { id: 'ln32', name: 'Lungi Ngidi', role: PlayerRole.BOWLER, nationality: 'South African', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: '4/10 vs KXIP', stats: { matches: 14, wickets: 25, strikeRate: 100, economy: 8.3 } },
  { id: 'sb33', name: 'Samuel Badree', role: PlayerRole.BOWLER, nationality: 'West Indian', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', bestRecord: 'Hat-trick on RCB Debut', stats: { matches: 12, wickets: 11, strikeRate: 100, economy: 7.5 } },
  { id: 'sb34', name: 'Sachin Baby', role: PlayerRole.BATSMAN, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '33 vs GL', stats: { matches: 18, runs: 137, strikeRate: 125.0 } },
  { id: 'ps35', name: 'Phil Salt', role: PlayerRole.WICKET_KEEPER, nationality: 'English', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: 'Aggressive Powerplay Batting', stats: { matches: 12, runs: 218, strikeRate: 163.9 } },
  { id: 'jb36', name: 'Jacob Bethell', role: PlayerRole.ALL_ROUNDER, nationality: 'English', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: 'Emerging England Talent', stats: { matches: 0, runs: 0, strikeRate: 0 } },
  { id: 'kp39', name: 'Krunal Pandya', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: '47 vs RPS (Final)', stats: { matches: 113, runs: 1514, wickets: 70, strikeRate: 135.0 } },
  { id: 'wp40', name: 'Wayne Parnell', role: PlayerRole.BOWLER, nationality: 'South African', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '3/10 vs RR', stats: { matches: 33, wickets: 35, strikeRate: 115, economy: 8.2 } },
  { id: 'dc41', name: 'Dan Christian', role: PlayerRole.ALL_ROUNDER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1531415080290-c9b6a2dd469b?auto=format&fit=crop&q=80&w=400', bestRecord: 'T20 Trophy Collector', stats: { matches: 49, runs: 460, wickets: 38, strikeRate: 120.0 } },
  { id: 'jp42', name: 'Josh Philippe', role: PlayerRole.WICKET_KEEPER, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: 'BBL MVP', stats: { matches: 5, runs: 78, strikeRate: 101.0 } },
  { id: 'ad43', name: 'Ashok Dinda', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', bestRecord: 'Leaping Action', stats: { matches: 78, wickets: 69, strikeRate: 100, economy: 8.2 } },
  { id: 'lf45', name: 'Lockie Ferguson', role: PlayerRole.BOWLER, nationality: 'New Zealander', image: 'https://images.unsplash.com/photo-1566932769119-7a1fb6d7ce23?auto=format&fit=crop&q=80&w=400', bestRecord: '3/15 vs SRH', stats: { matches: 38, wickets: 37, strikeRate: 120, economy: 8.6 } },
  { id: 'af46', name: 'Aaron Finch', role: PlayerRole.BATSMAN, nationality: 'Australian', image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=400', bestRecord: '172 vs ZIM (T20I Record)', stats: { matches: 92, runs: 2091, strikeRate: 128.2 } },
  { id: 'sr47', name: 'Sherfane Rutherford', role: PlayerRole.ALL_ROUNDER, nationality: 'West Indian', image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=400', bestRecord: 'Power Hitting', stats: { matches: 10, runs: 106, strikeRate: 120.0 } },
  { id: 'ks48', name: 'Karn Sharma', role: PlayerRole.BOWLER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1518173835740-f5d14111d76a?auto=format&fit=crop&q=80&w=400', bestRecord: '4/16 (IPL Best)', stats: { matches: 75, wickets: 69, strikeRate: 105, economy: 7.9 } },
  { id: 'js49', name: 'Jitesh Sharma', role: PlayerRole.WICKET_KEEPER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=400', bestRecord: 'Rapid Finishing', stats: { matches: 26, runs: 543, strikeRate: 159.0 } },
  { id: 'ws52', name: 'Washington Sundar', role: PlayerRole.ALL_ROUNDER, nationality: 'Indian', image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=400', bestRecord: '3/16 vs MI in Powerplay', stats: { matches: 52, runs: 378, wickets: 36, strikeRate: 117.0 } }
];

export const TEAM_RECORDS = {
  highestTotal: '263/5 vs PWI (2013)',
  lowestTotal: '49 vs KKR (2017)',
  mostCenturies: 'Virat Kohli (8)',
  mostSixes: 'Chris Gayle (357)'
};

export const RCBCrest = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 drop-shadow-[0_0_12px_rgba(209,171,62,0.6)]">
    <defs>
      <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: COLORS.RED, stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8B0000', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="url(#crestGrad)" />
    <text x="50" y="55" textAnchor="middle" fill="white" fontWeight="900" style={{ fontFamily: 'Oswald, sans-serif' }} fontSize="24">RCB</text>
    <path d="M20 50 Q 50 10 80 50" fill="none" stroke={COLORS.GOLD} strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="50" r="48" fill="none" stroke={COLORS.GOLD} strokeWidth="1" strokeDasharray="4 4" />
  </svg>
);
