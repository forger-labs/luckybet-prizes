import type {
  ReviewStatus,
  ReviewSubmission,
  VerificationCriterion,
} from "@shared/types";

import type { ReviewMissionType } from "./ReviewQueueByPlayer";

export type { ReviewStatus, VerificationCriterion };
export type { ReviewSubmission };

export type ReviewViewMode = "list" | "grid";

export interface ReviewableCardProps {
  submission: ReviewSubmission;
  onClick: (id: string) => void;
}

export interface ReviewTableRowProps {
  submission: ReviewSubmission;
  onSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export interface ReviewTableProps {
  submissions: ReviewSubmission[];
  onSelect: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export interface ReviewViewToggleProps {
  viewMode: ReviewViewMode;
  onChange: (mode: ReviewViewMode) => void;
}

export interface ReviewModalProps {
  submission: ReviewSubmission & {
    verificationCriteria?: VerificationCriterion[];
  };
  open: boolean;
  onClose: () => void;
  onApprove: (id: string, notes?: string) => void;
  onReject: (id: string, notes: string) => void;
}

export interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

export interface ReviewFilterBarProps {
  activeTab: ReviewFilter;
  activeType: ReviewMissionType | "all";
  viewMode: ReviewViewMode;
  onTabChange: (tab: ReviewFilter) => void;
  onTypeChange: (type: ReviewMissionType | "all") => void;
  onViewModeChange: (mode: ReviewViewMode) => void;
}

export interface ReviewStatsProps {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  page: number;
  totalPages: number;
}

export type ReviewFilter = "pending" | "approved" | "rejected";
