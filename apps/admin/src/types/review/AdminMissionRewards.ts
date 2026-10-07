export type MissionRewardStatus =
  | "PENDING"
  | "PROCESSING"
  | "CLAIMED"
  | "TIMEOUT_UNCERTAIN";

export interface BackendMissionReward {
  id: number;
  userMissionId: number;
  playerId: number;
  coinsAmount: number;
  roomId?: number | null;
  experiencePoints: number;
  status: MissionRewardStatus;
  externalOperationId?: string | null;
  errorMessage?: string | null;
  resolvedByAdminId?: number | null;
  claimedAt?: string | null;
  createdAt: string;
}

export interface GetAdminMissionRewardsQuery {
  status?: MissionRewardStatus;
  playerId?: number;
  userMissionId?: number;
  orderBy?: "created_at" | "id";
  orderDirection?: "ASC" | "DESC";
  take?: number;
  skip?: number;
}

export interface ResolveMissionRewardPayload {
  action: "RESOLVE_CLAIMED" | "FORCE_RETRY";
  externalOperationId?: string;
  adminNotes?: string;
}

export type RevisionActiveTab = "review" | "rewards";

export interface MissionRewardsFilters {
  status: "all" | MissionRewardStatus;
  playerId: string;
  orderBy: "created_at" | "id";
  orderDirection: "ASC" | "DESC";
}

export interface MissionRewardsState {
  rewards: BackendMissionReward[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: MissionRewardsFilters;
  selectedReward: BackendMissionReward | null;
  isResolveModalOpen: boolean;
}

export type MissionRewardsAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { rewards: BackendMissionReward[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<MissionRewardsFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_RESOLVE_MODAL"; payload: BackendMissionReward }
  | { type: "CLOSE_RESOLVE_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" };

export interface MissionRewardsStatsProps {
  totalRewards: number;
  claimedInPage: number;
  uncertainInPage: number;
  pendingInPage: number;
}

export interface MissionRewardsFilterBarProps {
  filters: MissionRewardsFilters;
  limit: number;
  onFilterChange: (filters: Partial<MissionRewardsFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

export interface MissionRewardsTableRowProps {
  reward: BackendMissionReward;
  onResolve: (reward: BackendMissionReward) => void;
}

export interface MissionRewardsTableProps {
  rewards: BackendMissionReward[];
  isLoading: boolean;
  onResolve: (reward: BackendMissionReward) => void;
}

export interface ResolveMissionRewardModalProps {
  reward: BackendMissionReward | null;
  open: boolean;
  onClose: () => void;
  onResolve: (payload: ResolveMissionRewardPayload) => Promise<boolean>;
  isSubmitting?: boolean;
}
