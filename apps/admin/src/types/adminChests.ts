import type { FormikProps } from "formik";

import type {
  BackendChest,
  BackendChestRoom,
  BackendRoom,
  ChestPeriodType,
  ClaimStatus,
  GetAdminPlayerChestsQuery,
  GetChestsQuery,
  ResolveChestClaimPayload,
  UpdateChestPayload,
  UserMissionChestAdmin,
} from "@shared/types";

export type {
  BackendChest,
  BackendChestRoom,
  BackendRoom,
  ChestPeriodType,
  ClaimStatus,
  GetAdminPlayerChestsQuery,
  GetChestsQuery,
  ResolveChestClaimPayload,
  UpdateChestPayload,
  UserMissionChestAdmin,
};

/* ── Tab Mode ── */
export type ChestsActiveTab = "chests" | "prizes";

/* ── Form Values for Chest creation/editing ── */
export interface ChestFormValues {
  title: string;
  description: string;
  periodType: ChestPeriodType;
  requiredMissions: number | "";
  coinsAmount: number | "";
  experiencePoints: number | "";
  roomId: string; // ID de sala en string ("" = sin sala)
  isActive: boolean;
  image: File | null;
}

/* ── Filters ── */
export interface ChestFilters {
  title: string;
  periodType: "all" | ChestPeriodType;
  isActive: "all" | "active" | "inactive";
  minCoins: string;
  maxCoins: string;
  minRequiredMissions: string;
  maxRequiredMissions: string;
  roomId: string;
}

export interface PrizesFilters {
  playerId: string;
  chestId: string;
  status: "all" | ClaimStatus;
  periodKey: string;
  orderBy: "created_at" | "periodKey" | "id";
  orderDirection: "ASC" | "DESC";
}

/* ── State & Action for Chests Reducer ── */
export interface ChestsState {
  chests: BackendChest[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: ChestFilters;
  selectedChest: BackendChest | null;
  isFormModalOpen: boolean;
  isPreviewModalOpen: boolean;
}

export type ChestsAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { chests: BackendChest[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<ChestFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_CREATE_MODAL" }
  | { type: "OPEN_EDIT_MODAL"; payload: BackendChest }
  | { type: "CLOSE_FORM_MODAL" }
  | { type: "OPEN_PREVIEW_MODAL"; payload: BackendChest }
  | { type: "CLOSE_PREVIEW_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" };

/* ── State & Action for Prizes Reducer ── */
export interface PrizesState {
  prizes: UserMissionChestAdmin[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  isSubmitting: boolean;
  filters: PrizesFilters;
  selectedPrize: UserMissionChestAdmin | null;
  isDetailModalOpen: boolean;
  isResolveModalOpen: boolean;
}

export type PrizesAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { prizes: UserMissionChestAdmin[]; total: number };
    }
  | { type: "FETCH_ERROR" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_FILTERS"; payload: Partial<PrizesFilters> }
  | { type: "RESET_FILTERS" }
  | { type: "OPEN_DETAIL_MODAL"; payload: UserMissionChestAdmin }
  | { type: "CLOSE_DETAIL_MODAL" }
  | { type: "OPEN_RESOLVE_MODAL"; payload: UserMissionChestAdmin }
  | { type: "CLOSE_RESOLVE_MODAL" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" };

/* ── Component Props ── */
export interface ChestsViewToggleProps {
  activeTab: ChestsActiveTab;
  onChangeTab: (tab: ChestsActiveTab) => void;
  uncertainCount?: number;
}

export interface ChestsStatsCardsProps {
  totalChests: number;
  activeChests: number;
  weeklyChests: number;
  monthlyChests: number;
}

export interface ChestsFilterBarProps {
  filters: ChestFilters;
  limit: number;
  rooms?: BackendRoom[];
  onFilterChange: (filters: Partial<ChestFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

export interface ChestRowProps {
  chest: BackendChest;
  onPreview: (chest: BackendChest) => void;
  onEdit: (chest: BackendChest) => void;
  onToggleStatus: (chest: BackendChest) => void;
}

export interface ChestsTableProps {
  chests: BackendChest[];
  isLoading: boolean;
  onPreview: (chest: BackendChest) => void;
  onEdit: (chest: BackendChest) => void;
  onToggleStatus: (chest: BackendChest) => void;
}

export interface ChestFormModalProps {
  open: boolean;
  onClose: () => void;
  chest: BackendChest | null;
  rooms?: BackendRoom[];
  onSave: (data: ChestFormValues, isCreate: boolean) => Promise<boolean>;
  isSubmitting?: boolean;
}

export interface ChestFormFieldsProps {
  formik: FormikProps<ChestFormValues>;
  rooms?: BackendRoom[];
  currentImageUrl?: string | null;
}

export interface ChestPreviewModalProps {
  open: boolean;
  onClose: () => void;
  chest: BackendChest | null;
}

export interface PrizesStatsCardsProps {
  totalPrizes: number;
  claimedPrizes: number;
  uncertainPrizes: number;
  pendingPrizes: number;
}

export interface PrizesFilterBarProps {
  filters: PrizesFilters;
  limit: number;
  onFilterChange: (filters: Partial<PrizesFilters>) => void;
  onLimitChange: (limit: number) => void;
  onResetFilters: () => void;
}

export interface PrizeRowProps {
  prize: UserMissionChestAdmin;
  onViewDetail: (prize: UserMissionChestAdmin) => void;
  onResolveClaim: (prize: UserMissionChestAdmin) => void;
}

export interface PrizesTableProps {
  prizes: UserMissionChestAdmin[];
  isLoading: boolean;
  onViewDetail: (prize: UserMissionChestAdmin) => void;
  onResolveClaim: (prize: UserMissionChestAdmin) => void;
}

export interface PrizeDetailModalProps {
  open: boolean;
  onClose: () => void;
  prize: UserMissionChestAdmin | null;
  onResolveFromDetail?: (prize: UserMissionChestAdmin) => void;
}

export interface ResolveClaimModalProps {
  open: boolean;
  onClose: () => void;
  prize: UserMissionChestAdmin | null;
  onResolve: (payload: ResolveChestClaimPayload) => Promise<boolean>;
  isSubmitting?: boolean;
}
