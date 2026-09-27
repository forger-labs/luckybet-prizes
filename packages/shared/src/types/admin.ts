export type MissionStatus = "inactive" | "active" | "completed" | "cancelled";
export type MissionCategory = "daily" | "weekly" | "fixed" | "special_event";
export type VerificationType = "IMAGE" | "TEXT" | "GAME_PLAY";

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
  type: "IMAGE" | "TEXT" | "GAME_PLAY";
  content?: string;
  targetConfig?: Record<string, unknown> | null;
}

export interface BackendMissionRoom {
  id: number;
  name: string;
  bonus: string;
  isActive: boolean;
}

export interface BackendMission {
  id: number;
  title: string;
  description?: string;
  type: BackendMissionType;
  status: BackendMissionStatus;
  coinsAmount: number;
  experiencePoints: number;
  roomId?: number | null;
  room?: BackendMissionRoom | null;
  imageUrl?: string;
  activatedAt?: string;
  expiresAt?: string;
  steps?: BackendMissionStep[];
}

export interface GetMissionsQuery {
  take?: number;
  skip?: number;
  status?: BackendMissionStatus;
  type?: BackendMissionType;
  roomId?: number;
}

export interface BackendUpdateMissionPayload extends Omit<
  BackendMission,
  "id" | "status" | "activatedAt" | "expiresAt" | "room" | 'steps'
  > { steps?: Omit<BackendMissionStep, 'id' | 'missionId'>[]; };

/* ── GamePlay and Games catalog types ── */

export type GamePlayStepConfig = {
  provider?: string;
  gameId?: string;
  minUniqueGames?: number;
  minBet: number;
};

export interface BackendGameItem {
  id: string;
  name: string;
  title: string;
  provider: string;
  label?: string;
  img?: string;
}

export interface BackendProviderItem {
  name: string;
  slug?: string;
}

export interface MissionStep {
  id: number;
  title: string;
  verificationType: VerificationType;
  order: number;
  targetConfig?: GamePlayStepConfig | null;
}

export interface AdminMission {
  id: string;
  title: string;
  description: string;
  tokenReward: number;
  roomId?: number | null;
  room?: BackendMissionRoom | null;
  xpReward: number;
  category: MissionCategory;
  status: MissionStatus;
  steps: MissionStep[];
  coverImage?: string;
  participants: number;
  createdAt: string;
  activatedAt?: string;
  expiresAt?: string;
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

/* ── Levels types ── */

export type LevelBonus = "0" | "30" | "40" | "50" | "100" | "150" | "200";

export interface BackendLevelRoom {
  id: number;
  name: string;
  bonus: string;
  isActive: boolean;
}

export interface BackendLevel {
  id: number;
  name: string;
  image: string;
  minExperience: number;
  coins: number;
  roomId?: number | null;
  room?: BackendLevelRoom | null;
  created_at?: string;
  updated_at?: string;
}

export interface GetLevelsQuery {
  take?: number;
  skip?: number;
  name?: string;
  roomId?: number;
  minCoins?: number;
  maxCoins?: number;
  minExperience?: number;
  maxExperience?: number;
  sortOrder?: "ASC" | "DESC" | "asc" | "desc";
}

/* ── Rooms types ── */

export type RoomBonus = "0" | "30" | "40" | "50" | "100" | "150" | "200";

export interface BackendRoom {
  id: number;
  name: string;
  bonus: RoomBonus;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetRoomsQuery {
  name?: string;
  bonus?: RoomBonus;
  isActive?: boolean;
  take?: number;
  skip?: number;
}

export interface CreateRoomPayload {
  name: string;
  bonus: RoomBonus;
  isActive?: boolean;
}

export interface UpdateRoomPayload {
  name?: string;
  bonus?: RoomBonus;
  isActive?: boolean;
}

/* ── Players types ── */

export interface BackendPlayerLevel {
  id: number;
  name: string;
  image?: string;
  minExperience?: number;
}

export interface BackendPlayerRoom {
  id: number;
  name: string;
  bonus: string;
  isActive: boolean;
}

export interface BackendPlayer {
  id: number;
  username: string;
  phone: string | null;
  isActive: boolean;
  experience?: number;
  levelId?: number;
  level?: BackendPlayerLevel | null;
  roomId?: number | null;
  room?: BackendPlayerRoom | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetPlayersQuery {
  username?: string;
  phone?: string;
  levelId?: number;
  minExperience?: number;
  maxExperience?: number;
  roomId?: number;
  isActive?: boolean | "true" | "false";
  orderDirection?: "ASC" | "DESC";
  take?: number;
  skip?: number;
}

export interface UpdatePlayerPayload {
  phone?: string;
  isActive?: boolean;
  levelId?: number;
  roomId?: number;
}
