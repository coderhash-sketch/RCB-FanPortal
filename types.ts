
export enum PlayerRole {
  BATSMAN = 'Batsman',
  BOWLER = 'Bowler',
  ALL_ROUNDER = 'All-rounder',
  WICKET_KEEPER = 'Wicket-keeper'
}

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  nationality: string;
  image: string;
  bestRecord?: string;
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    strikeRate: number;
    economy?: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export interface FanDNA {
  loyaltyPoints: number;
  yearsFollowing: number;
  matchesAttended: number;
  quizScore: number;
  rank: string;
}

export interface BallResult {
  ballNum: string;
  outcome: string | number;
  description: string;
}

export type Language = 'EN' | 'HI' ;
