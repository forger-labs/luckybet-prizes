import type { FormikProps } from "formik";

import type {
  BackendLevel,
  BackendLevelRoom,
  GetLevelsQuery,
  LevelBonus,
} from "@shared/types";

export type { BackendLevel, BackendLevelRoom, GetLevelsQuery, LevelBonus };

/** AdminLevel alias of BackendLevel for domain consistency */
export type AdminLevel = BackendLevel;

export type LevelsActiveTab = "levels" | "rewards";

export type LevelRewardStatus =
  | "PENDING"
  | "PROCESSING"
  | "CLAIMED"
  | "TIMEOUT_UNCERTAIN";

export interface BackendLevelReward {
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
}

export interface GetAdminLevelRewardsQuery {
  playerId?: number;
  levelId?: number;
  status?: LevelRewardStatus;
  orderBy?: "created_at" | "levelId" | "id";
  orderDirection?: "ASC" | "DESC";
  take?: number;
  skip?: number;
}

export interface ResolveLevelRewardPayload {
  action: "RESOLVE_CLAIMED" | "FORCE_RETRY";
  externalOperationId?: string;
  adminNotes?: string;
}

export interface LevelRewardsFilters {
  status: "all" | LevelRewardStatus;
  playerId: string;
  levelId: string;
  orderBy: "created_at" | "levelId" | "id";
  orderDirection: "ASC" | "DESC";
}

export interface LevelRewardsState {
  rewards: BackendLevelReward[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: LevelRewardsFilters;
  selectedReward: BackendLevelReward | null;
  isResolveModalOpen: boolean;
}

export type LevelRewardsAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { rewards: BackendLevelReward[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<LevelRewardsFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_RESOLVE_MODAL"; payload: BackendLevelReward }
  | { type: "CLOSE_RESOLVE_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" };

/** Values for the level creation/editing form */
export interface LevelFormValues {
  name: string;
  minExperience: number | "";
  coins: number | "";
  roomId: string; // ID de sala seleccionada ("" para sin sala)
  image: File | null;
}

/** Filter criteria for searching and paginating levels */
export interface LevelFilters {
  name: string;
  roomId: string;
  minCoins: string;
  maxCoins: string;
  minExperience: string;
  maxExperience: string;
  sortOrder: "ASC" | "DESC";
}

/** State for the admin levels reducer and management views */
export interface LevelsState {
  levels: BackendLevel[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: LevelFilters;
  selectedLevel: BackendLevel | null;
  isModalOpen: boolean;
  isEditMode: boolean;
}

/** Action types for levelsReducer */
export type LevelsAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { levels: BackendLevel[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<LevelFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_CREATE_MODAL" }
  | { type: "OPEN_EDIT_MODAL"; payload: BackendLevel }
  | { type: "CLOSE_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "SET_SELECTED_LEVEL"; payload: BackendLevel | null };

/** Props for level image upload */
export interface LevelImageUploadProps {
  imageFile: File | null;
  currentImageUrl?: string;
  onChange: (file: File | null) => void;
  error?: string;
}

/** Props for level form fields */
export interface LevelFormFieldsProps {
  formik: FormikProps<LevelFormValues>;
  isCreate: boolean;
  currentImageUrl?: string;
}

/** Props for level creation and update modal */
export interface LevelFormModalProps {
  open: boolean;
  onClose: () => void;
  level: BackendLevel | null;
  onSave: (data: LevelFormValues, isCreate: boolean) => Promise<boolean>;
  isSubmitting?: boolean;
}

/** Props for level stats cards */
export interface LevelsStatsCardsProps {
  totalLevels: number;
  maxExperience: number;
  totalCoins: number;
}

/** Props for level filter bar */
export interface LevelsFilterBarProps {
  filters: LevelFilters;
  limit: number;
  onFilterChange: (filters: Partial<LevelFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

/** Props for levels table */
export interface LevelsTableProps {
  levels: BackendLevel[];
  isLoading: boolean;
  onEdit: (level: BackendLevel) => void;
}

/** Props for single level row */
export interface LevelRowProps {
  level: BackendLevel;
  onEdit: (level: BackendLevel) => void;
}

export interface LevelRewardsStatsProps {
  totalRewards: number;
  claimedInPage: number;
  uncertainInPage: number;
  pendingInPage: number;
}

export interface LevelRewardsFilterBarProps {
  filters: LevelRewardsFilters;
  limit: number;
  onFilterChange: (filters: Partial<LevelRewardsFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

export interface LevelRewardsTableRowProps {
  reward: BackendLevelReward;
  onResolve: (reward: BackendLevelReward) => void;
}

export interface LevelRewardsTableProps {
  rewards: BackendLevelReward[];
  isLoading: boolean;
  onResolve: (reward: BackendLevelReward) => void;
}

export interface ResolveLevelRewardModalProps {
  reward: BackendLevelReward | null;
  open: boolean;
  onClose: () => void;
  onResolve: (payload: ResolveLevelRewardPayload) => Promise<boolean>;
  isSubmitting?: boolean;
}
