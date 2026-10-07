export type StepSubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface StepSubmission {
  id: number;
  userMissionId: number;
  missionStepId: number;
  status: StepSubmissionStatus;
  submissionText?: string | null;
  submissionImageUrl?: string | null;
  reviewedById?: number | null;
  reviewedAt?: string | null;
  reviewerNotes?: string | null;
}
