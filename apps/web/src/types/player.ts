import type { BackendLevel, BackendPlayerRoom } from "@shared/types";

export interface PlayedGameItem {
  gameId: string;
  gameName: string;
  provider?: string;
  imageUrl?: string;
  lastPlayedAt?: string;
  isCurrentlyPlaying?: boolean;
  totalBets?: number;
  totalWins?: number;
}

export interface PlayedGamesQuery {
  days?: number;
  limit?: number;
  from?: string;
  to?: string;
  provider?: string;
  gameName?: string;
  forceRefresh?: boolean;
}

export interface PlayedGamesResponse {
  games: PlayedGameItem[];
  totalUniqueGames: number;
  days: number;
}

export interface PlayerMeResponse {
  id: number;
  username: string;
  phone?: string | null;
  isActive: boolean;
  experience: number;
  levelId?: number | null;
  level?: BackendLevel | null;
  roomId?: number | null;
  room?: BackendPlayerRoom | null;
}

export interface UserMissionBasic {
  id: number;
  playerId: number;
  missionId: number;
  status: "IN_PROGRESS" | "COMPLETED" | "EXPIRED" | "CANCELLED";
  currentStep: number;
  startedAt?: string;
  completedAt?: string;
}

export interface StepSubmissionItem {
  id: number;
  userMissionId: number;
  missionStepId: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  submissionText?: string | null;
  submissionImageUrl?: string | null;
  reviewedById?: number | null;
  reviewedAt?: string | null;
  reviewerNotes?: string | null;
}

export interface UserMissionWithSteps extends UserMissionBasic {
  steps: StepSubmissionItem[];
}
