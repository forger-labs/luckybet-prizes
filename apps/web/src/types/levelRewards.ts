import type { BackendLevel } from "@shared/types";

export type LevelRewardStatus =
  | "PENDING"
  | "PROCESSING"
  | "CLAIMED"
  | "TIMEOUT_UNCERTAIN";

export interface PlayerLevelReward {
  id: number;
  playerId: number;
  levelId: number;
  coinsAmount: number;
  roomId?: number | null;
  status: LevelRewardStatus;
  externalOperationId?: string | null;
  errorMessage?: string | null;
  resolvedByAdminId?: number | null;
  claimedAt?: string | null;
  createdAt: string;
  updatedAt?: string;
  level?: BackendLevel | null;
}

export interface GetMyLevelRewardsQuery {
  status?: LevelRewardStatus;
  levelId?: number;
  orderBy?: "created_at" | "levelId" | "id";
  orderDirection?: "ASC" | "DESC";
  take?: number;
  skip?: number;
}

export interface ClaimCelebrationData {
  reward: PlayerLevelReward;
  levelName: string;
  levelImage?: string | null;
  baseCoins: number;
  totalCoins: number;
  bonusPercent: number;
}

export interface LevelUpCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebrationData: ClaimCelebrationData | null;
  hasMorePending: boolean;
  remainingCount: number;
  nextLevelName?: string;
  onClaimNext?: () => void;
  isClaimingNext?: boolean;
}

export interface LevelRewardClaimBannerProps {
  pendingCount: number;
  nextReward: PlayerLevelReward | null;
  nextLevelName?: string;
  nextLevelImage?: string | null;
  calculatedCoins: number;
  isClaiming: boolean;
  onClaim: () => void;
}
