import type { LeaderboardPeriod, LeaderboardUser } from "@shared/types";

export type { LeaderboardPeriod, LeaderboardUser };

export interface LeaderboardPeriodOption {
  id: LeaderboardPeriod;
  label: string;
}

export interface LeaderboardPodiumProps {
  topUsers: LeaderboardUser[];
  currentPeriod: LeaderboardPeriod;
  onPeriodChange: (period: LeaderboardPeriod) => void;
  isLoading?: boolean;
}

export interface PodiumStepProps {
  user?: LeaderboardUser;
  rank: 1 | 2 | 3;
  isLoading?: boolean;
}

export interface LeaderboardRowItemProps {
  user: LeaderboardUser;
  index: number;
}
