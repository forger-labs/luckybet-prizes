export interface WinnerItem {
  id: string;
  name: string;
  game: string;
  prize: string;
  timestamp: string;
  isJackpot?: boolean;
}

export interface GameItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
  tag?: string;
  tagColor?: "gold" | "cyan" | "emerald" | "purple";
  activePlayers: number;
  jackpot?: string;
}

export interface TrendingGameItem {
  id: string;
  title: string;
  category: string;
  growth: string;
  isPositive: boolean;
  activePlayers: number;
  popularityPercentage: number;
}

export interface UserRankStatus {
  currentTier: string;
  nextTier: string;
  currentXp: number;
  targetXp: number;
  streakDays: number;
  multiplier: string;
}
