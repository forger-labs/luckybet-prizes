export type UserMissionStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED";

export type StepSubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export type ReviewMissionType = "DAILY" | "WEEKLY" | "FIXED";

export interface ReviewStepSubmission {
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

export interface UserMissionReviewItem {
  userMissionId: number;
  playerId: number;
  playerName?: string | null;
  missionId: number;
  missionTitle: string;
  missionDescription?: string | null;
  missionType: ReviewMissionType;
  coinsAmount: number;
  experiencePoints: number;
  userMissionStatus: UserMissionStatus;
  imageUrl?: string | null;
  steps: ReviewStepSubmission[];
}

export interface ReviewQueueParams {
  status?: UserMissionStatus;
  playerId?: number;
  minExperience?: number;
  maxExperience?: number;
  minCoinsAmount?: number;
  maxCoinsAmount?: number;
  type?: ReviewMissionType;
  take?: number;
  skip?: number;
}
