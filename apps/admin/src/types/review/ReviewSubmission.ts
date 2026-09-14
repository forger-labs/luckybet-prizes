import type {
  ReviewStatus,
  ReviewSubmission,
  VerificationCriterion,
} from "@shared/types";

export type { ReviewStatus, VerificationCriterion };
export type { ReviewSubmission };

export interface ReviewableCardProps {
  submission: ReviewSubmission;
  onClick: (id: string) => void;
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

export type ReviewFilter = "pending" | "approved" | "rejected";
