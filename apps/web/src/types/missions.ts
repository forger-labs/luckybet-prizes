import type {
  BackendMissionRoom,
  BackendMissionStatus,
  BackendMissionStep,
  BackendMissionType,
  GamePlayStepConfig,
} from "@shared/types/admin";

import type { StepSubmissionItem } from "@/types/player";

export type MissionCategory = "all" | "daily" | "weekly" | "fixed" | "special";

export type MissionPlatform =
  | "instagram"
  | "telegram"
  | "whatsapp"
  | "twitter"
  | "profile"
  | "referral"
  | "deposit"
  | "special";

export type MissionStatusType =
  | "available"
  | "in_progress"
  | "completed"
  | "expired";

export interface MissionStep {
  id: string;
  number: string;
  label: string;
  description?: string;
  completed: boolean;
  required?: boolean;
}

export interface MissionDetailData {
  id: string;
  key: string;
  name: string;
  category: Exclude<MissionCategory, "all">;
  platform: MissionPlatform;
  rewardCoins: number;
  rewardXp: number;
  rewardFormatted: string;
  xpFormatted?: string;
  icon: string;
  color: string;
  glowColor?: string;
  description: string;
  longDescription?: string;
  image?: string;
  actionUrl?: string;
  actionLabel?: string;
  steps: MissionStep[];
  status: MissionStatusType;
  expiresIn?: string;
  verificationNote?: string;
}

export interface MissionItem {
  id: string;
  title: string;
  description?: string;
  reward: string;
  rewardCoins?: number;
  rewardXp?: number;
  icon: string;
  color: string;
  category: Exclude<MissionCategory, "all">;
  platform?: MissionPlatform;
  completed?: boolean;
  progress?: number;
  href?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ClientMission {
  id: number;
  title: string;
  description?: string;
  type: BackendMissionType;
  category: Exclude<MissionCategory, "all">;
  status: BackendMissionStatus;
  coinsAmount: number;
  experiencePoints: number;
  totalCoins: number;
  room?: BackendMissionRoom | null;
  imageUrl?: string;
  activatedAt?: string;
  expiresAt?: string;
  steps: BackendMissionStep[];
  isJoined: boolean;
  userMissionId?: number;
  userMissionStatus?: "IN_PROGRESS" | "COMPLETED" | "EXPIRED" | "CANCELLED";
  currentStep?: number;
  progressPercent: number;
  completedStepsCount: number;
  totalStepsCount: number;
}

export interface ClientMissionStep extends BackendMissionStep {
  targetConfig?: GamePlayStepConfig | null;
  submission?: StepSubmissionItem;
  submissionStatus?: "NOT_STARTED" | "PENDING" | "APPROVED" | "REJECTED";
}

export interface MissionRewardResponse {
  id: number;
  userMissionId: number;
  playerId: number;
  coinsAmount: number;
  roomId?: number | null;
  experiencePoints: number;
  status: "PENDING" | "PROCESSING" | "CLAIMED" | "TIMEOUT_UNCERTAIN";
  externalOperationId?: string | null;
  errorMessage?: string | null;
  resolvedByAdminId?: number | null;
  claimedAt?: string | null;
  createdAt: string;
}

export interface ClientMissionDetail extends ClientMission {
  detailedSteps: ClientMissionStep[];
  isCompleted: boolean;
  canSubmitOrClaim: boolean;
  rewardStatus?:
    | "PENDING"
    | "PROCESSING"
    | "CLAIMED"
    | "TIMEOUT_UNCERTAIN"
    | null;
}

export interface GetMyMissionsQuery {
  status?: "IN_PROGRESS" | "COMPLETED" | "EXPIRED" | "CANCELLED";
  missionId?: number;
  orderDirection?: "ASC" | "DESC";
  take?: number;
  skip?: number;
}

export interface MissionStatsSummary {
  claimableCoins: number;
  completedCount: number;
  totalCount: number;
  xpMultiplier?: string;
}

export interface MissionCategoryTab {
  id: MissionCategory;
  label: string;
  count: number;
  icon?: string;
}

export interface MissionFilterTabsProps {
  categories: MissionCategoryTab[];
  activeCategory: MissionCategory;
  onSelectCategory: (category: MissionCategory) => void;
}

export interface MissionCountdownProps {
  expiresAt?: string;
  activatedAt?: string;
  type?: string;
  className?: string;
}
