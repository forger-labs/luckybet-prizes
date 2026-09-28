import type {
  ReviewMissionType,
  ReviewStepSubmission,
  UserMissionReviewItem,
  UserMissionStatus,
} from "./ReviewMission";

export type {
  ReviewMissionType,
  ReviewStepSubmission,
  UserMissionReviewItem,
  UserMissionStatus,
};

export type ReviewViewMode = "list" | "grid";

export type ReviewFilterStatus = "all" | UserMissionStatus;

export interface ReviewFilters {
  status: ReviewFilterStatus;
  playerId: string;
  type: ReviewMissionType | "all";
  minCoinsAmount?: string;
  maxCoinsAmount?: string;
  minExperience?: string;
  maxExperience?: string;
}

export interface ReviewFilterBarProps {
  filters: ReviewFilters;
  viewMode: ReviewViewMode;
  onFilterChange: (filters: Partial<ReviewFilters>) => void;
  onResetFilters: () => void;
  onViewModeChange: (mode: ReviewViewMode) => void;
}

export interface ReviewStatsProps {
  totalMissions: number;
  inProgressCount: number;
  completedCount: number;
  pendingStepsCount: number;
}

export interface ReviewTableRowProps {
  item: UserMissionReviewItem;
  onReview: (item: UserMissionReviewItem) => void;
  onQuickApproveStep?: (stepId: number) => void;
  onQuickRejectStep?: (stepId: number) => void;
}

export interface ReviewTableProps {
  items: UserMissionReviewItem[];
  isLoading: boolean;
  onReview: (item: UserMissionReviewItem) => void;
  onQuickApproveStep?: (stepId: number) => void;
  onQuickRejectStep?: (stepId: number) => void;
}

export interface ReviewableCardProps {
  item: UserMissionReviewItem;
  onReview: (item: UserMissionReviewItem) => void;
}

export interface ReviewViewToggleProps {
  viewMode: ReviewViewMode;
  onChange: (mode: ReviewViewMode) => void;
}

export interface ReviewModalProps {
  item: UserMissionReviewItem | null;
  open: boolean;
  onClose: () => void;
  onReviewStep: (
    stepId: number,
    body: { status: "APPROVED" | "REJECTED"; reviewerNotes?: string },
  ) => Promise<boolean>;
  isSubmitting?: boolean;
}
