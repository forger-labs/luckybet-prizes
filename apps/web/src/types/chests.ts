import type { BackendChest, ChestPeriodType } from "@shared/types";

export type PlayerChestState =
  | "LOCKED"
  | "UNLOCKED"
  | "CLAIMED"
  | "TIMEOUT_UNCERTAIN";

export interface PlayerChestProgressItem {
  chest: BackendChest;
  periodKey: string;
  completedMissions: number;
  requiredMissions: number;
  state: PlayerChestState;
  claimedAt?: string | null;
}

export interface GetPlayerChestsProgressQuery {
  periodType?: ChestPeriodType;
  chestId?: number;
}

export interface PlayerChestClaimResponse {
  id: number;
  playerId: number;
  chestId: number;
  periodKey: string;
  completedMissionsCount: number;
  coinsAmount: number;
  roomId?: number | null;
  status: "CLAIMED" | "PROCESSING" | "TIMEOUT_UNCERTAIN";
  externalOperationId?: string | null;
  errorMessage?: string | null;
  resolvedByAdminId?: number | null;
  claimedAt?: string | null;
}

export interface PlayerChestJoinResponse {
  id: number;
  playerId: number;
  chestId: number;
  periodKey: string;
  completedMissionsCount: number;
  coinsAmount: number;
  roomId?: number | null;
  status: "PENDING";
  externalOperationId?: string | null;
  errorMessage?: string | null;
  resolvedByAdminId?: number | null;
  claimedAt?: string | null;
}

export interface ChestRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerChestProgressItem | null;
  onClaim?: () => void;
  isClaiming?: boolean;
}

export interface ChestOpeningAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  chest: BackendChest | null;
  coinsAmount?: number;
  experiencePoints?: number;
}

export interface AnimatedChestBoxProps {
  isOpened: boolean;
  isShaking?: boolean;
  className?: string;
}

export interface WeeklyChestCardProps {
  className?: string;
  compact?: boolean;
}

export interface FeaturedChestCardProps {
  className?: string;
  defaultPeriod?: ChestPeriodType;
  onViewMissions?: () => void;
}
