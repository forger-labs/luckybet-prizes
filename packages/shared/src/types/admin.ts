export type MissionStatus = "inactive" | "active" | "completed" | "cancelled";
export type MissionCategory = "daily" | "weekly" | "fixed" | "special_event";
export type VerificationType = "IMAGE" | "TEXT";

export type BackendMissionType = "DAILY" | "WEEKLY" | "FIXED";
export type BackendMissionStatus =
  | "INACTIVE"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface BackendMissionStep {
  id: number;
  missionId: number;
  stepOrder: number;
  type: "IMAGE" | "TEXT";
  content?: string;
}

export interface BackendMission {
  id: number;
  title: string;
  description?: string;
  type: BackendMissionType;
  status: BackendMissionStatus;
  coinsAmount: number;
  bonus?: number;
  experiencePoints: number;
  imageUrl?: string;
  activatedAt?: string;
  expiresAt?: string;
  steps?: BackendMissionStep[];
}

export type BackendCreateMissionPayload = Omit<
  BackendMission,
  "id" | "status" | "activatedAt" | "expiresAt" | "steps"
>;

export interface MissionStep {
  id: number;
  title: string;
  verificationType: VerificationType;
  order: number;
}

export interface AdminMission {
  id: string;
  title: string;
  description: string;
  tokenReward: number;
  bonusPercent: number;
  xpReward: number;
  category: MissionCategory;
  status: MissionStatus;
  steps: MissionStep[];
  coverImage?: string;
  participants: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelReason?: string;
}

export interface AdminSidebarLink {
  path: string;
  icon: string;
  text: string;
}

/* ── Review types ── */

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface ReviewSubmission {
  id: string;
  missionId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  missionTitle: string;
  missionCategory?: MissionCategory;
  missionDescription?: string;
  submittedAt: string;
  images?: string[];
  userNote?: string;
  status: ReviewStatus;
}

export interface VerificationCriterion {
  id: string;
  label: string;
  description?: string;
  images?: string[];
  passed: boolean;
}

export interface ReviewVerdict {
  submissionId: string;
  reviewerId: string;
  status: "approved" | "rejected";
  notes?: string;
  reviewedAt: string;
  verificationCriteria?: VerificationCriterion[];
}

export type PlayerStatus = "active" | "suspended";

export interface AdminPlayer {
  id: string;
  username: string;
  registeredAt: string; // ISO 8601
  status: PlayerStatus;
  totalTokens: number;
  completedMissionsCount: number;
  suspensionReason?: string;
}

export interface PlayerCompletedMission {
  id: string;
  title: string;
  completedAt: string; // ISO 8601
  rewardTokens: number;
}

export interface SuspensionReason {
  id: string;
  label: string;
  isCustom: boolean;
}

export const DEFAULT_SUSPENSION_REASONS: SuspensionReason[] = [
  { id: "inactivity", label: "Inactividad prolongada", isCustom: false },
  { id: "policy_violation", label: "Violación de políticas", isCustom: false },
  { id: "fraud_suspicion", label: "Sospecha de fraude", isCustom: false },
  { id: "other", label: "Otro", isCustom: true },
];
