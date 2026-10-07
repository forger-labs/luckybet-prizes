/**
 * api-mappers — field mappers entre la UI (ReviewSubmission) y el backend.
 *
 * GET /admin/missions/review-queue devuelve la cola paginada por jugador
 * (ReviewQueueByPlayer[]), con el nombre de jugador, título/tipo de la misión
 * y descripción ya incluidos. reviewQueueByPlayerToReviews aplana ese árbol
 * (jugador → misiones → pasos) en una lista plana de subs pronto revisables.
 */
import type {
  MissionCategory,
  ReviewStatus,
  ReviewSubmission,
} from "@shared/types";

import type {
  ReviewMissionType,
  ReviewQueueByPlayer,
} from "@/types/review/ReviewQueueByPlayer";
import type { StepSubmissionStatus } from "@/types/review/StepSubmission";

/* ── Constants ── */

const STATUS_TO_FRONTEND: Record<StepSubmissionStatus, ReviewStatus> = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const TYPE_TO_CATEGORY: Record<ReviewMissionType, MissionCategory> = {
  DAILY: "daily",
  WEEKLY: "weekly",
  FIXED: "fixed",
};

/* ── Mappers ── */

/**
 * Map backend step status to frontend review status.
 */
export function mapStepStatus(status: StepSubmissionStatus): ReviewStatus {
  return STATUS_TO_FRONTEND[status];
}

/**
 * Flatten a ReviewQueueByPlayer (jugador + sus misiones + sus pasos) into a
 * flat list of reviewable submissions (one per step).
 */
export function reviewQueueByPlayerToReviews(
  player: ReviewQueueByPlayer,
): ReviewSubmission[] {
  return player.missions.flatMap((mission) =>
    mission.steps.map((step) => ({
      id: String(step.id),
      missionId: String(mission.missionId),
      userId: String(player.playerId),
      userName: player.playerName ?? "",
      missionTitle: mission.missionTitle,
      missionCategory: TYPE_TO_CATEGORY[mission.missionType],
      missionDescription: mission.missionDescription ?? undefined,
      submittedAt: step.reviewedAt ?? "",
      images: step.submissionImageUrl
        ? [step.submissionImageUrl]
        : mission.imageUrl
          ? [mission.imageUrl]
          : [],
      userNote: step.submissionText ?? undefined,
      status: mapStepStatus(step.status),
    })),
  );
}
