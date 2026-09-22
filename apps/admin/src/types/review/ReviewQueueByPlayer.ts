/**
 * ReviewQueueByPlayer — forma que devuelve GET /admin/missions/review-queue.
 *
 * El endpoint lista la cola de revisión paginada por JUGADOR: cada entrada
 * agrupa las misiones de ese jugador y, dentro de cada misión, los pasos a
 * revisar. El query `status` decide qué pasos/misiones entran y `take/skip`
 * parten por jugador (no por step). `meta.total` cuenta jugadores distintos.
 */
import type {
  StepSubmission,
  StepSubmissionStatus,
} from "@/types/review/StepSubmission";

export type ReviewStepStatus = StepSubmissionStatus;

export type ReviewMissionType = "DAILY" | "WEEKLY" | "FIXED";

export interface ReviewQueueMission {
  userMissionId: number;
  missionId: number;
  missionTitle: string;
  missionDescription?: string | null;
  missionType: ReviewMissionType;
  coinsAmount: number;
  experiencePoints: number;
  userMissionStatus: string;
  imageUrl?: string | null;
  steps: StepSubmission[];
}

export interface ReviewQueueByPlayer {
  playerId: number;
  playerName?: string | null;
  missions: ReviewQueueMission[];
}

/** Query params soportados por el endpoint de cola de revisión. */
export interface ReviewQueueParams {
  status?: ReviewStepStatus;
  type?: ReviewMissionType;
  take?: number;
  skip?: number;
}
