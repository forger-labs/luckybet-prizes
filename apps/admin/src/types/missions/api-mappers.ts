/**
 * api-mappers — field mappers between frontend AdminMission and backend BackendMission.
 */

import type {
  AdminMission,
  BackendUpdateMissionPayload,
  BackendMission,
  BackendMissionStatus,
  BackendMissionType,
  MissionCategory,
  MissionStatus,
} from "@shared/types";

import type { PartialAdminMission } from "@/types/missions/MissionFormModalTypes";

/* ── Constants ── */

const CATEGORY_TO_TYPE: Record<MissionCategory, BackendMissionType> = {
  daily: "DAILY",
  weekly: "WEEKLY",
  fixed: "FIXED",
  special_event: "FIXED",
};

const TYPE_TO_CATEGORY: Record<BackendMissionType, MissionCategory> = {
  DAILY: "daily",
  WEEKLY: "weekly",
  FIXED: "fixed",
};

const STATUS_TO_BACKEND: Record<MissionStatus, BackendMissionStatus> = {
  inactive: "INACTIVE",
  active: "ACTIVE",
  completed: "COMPLETED",
  cancelled: "CANCELLED",
};

const STATUS_TO_FRONTEND: Record<BackendMissionStatus, MissionStatus> = {
  INACTIVE: "inactive",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

/* ── Mappers ── */

/**
 * Convert frontend AdminMission/PartialAdminMission → backend BackendUpdateMissionPayload.
 */
export function mapAdminToBackend(
  adminMission: PartialAdminMission,
): BackendUpdateMissionPayload {

  const steps = (adminMission.steps ?? []).map((step) => {
    let cleanConfig = null;
    if (step.verificationType === "GAME_PLAY" && step.targetConfig) {
      if (step.targetConfig.gameId) {
        cleanConfig = {
          gameId: step.targetConfig.gameId,
          minBet: Number(step.targetConfig.minBet) || 0,
        };
      } else if (step.targetConfig.provider) {
        cleanConfig = {
          provider: step.targetConfig.provider,
          minUniqueGames: Number(step.targetConfig.minUniqueGames) || 1,
          minBet: Number(step.targetConfig.minBet) || 0,
        };
      }
    }
    return {
      stepOrder: step.order,
      type: step.verificationType,
      content: step.title,
      targetConfig: cleanConfig,
    };
  });

  return {
    title: adminMission.title ?? "",
    description: adminMission.description,
    type: CATEGORY_TO_TYPE[adminMission.category ?? "daily"],
    coinsAmount: adminMission.tokenReward ?? 0,
    experiencePoints: adminMission.xpReward ?? 0,
    roomId: adminMission.roomId ? Number(adminMission.roomId) : null,
    imageUrl: adminMission.coverImage,
    steps
  };
}

/**
 * Convert backend BackendMission → frontend AdminMission.
 */
export function mapBackendToAdmin(
  backendMission: BackendMission,
): AdminMission {
  return {
    id: String(backendMission.id),
    title: backendMission.title,
    description: backendMission.description ?? "",
    tokenReward: backendMission.coinsAmount,
    xpReward: backendMission.experiencePoints,
    roomId: backendMission.roomId,
    room: backendMission.room,
    category: TYPE_TO_CATEGORY[backendMission.type],
    status: STATUS_TO_FRONTEND[backendMission.status],
    steps: (backendMission?.steps ?? []).map((s) => ({
      title: s.content ?? "",
      order: s.stepOrder,
      verificationType: s.type,
      targetConfig:
        s.targetConfig as AdminMission["steps"][number]["targetConfig"],
      id: s.id,
    })),
    coverImage: backendMission.imageUrl,
    participants: 0,
    createdAt: backendMission.activatedAt ?? "",
    activatedAt: backendMission.activatedAt,
    expiresAt: backendMission.expiresAt,
    cancelReason:
      backendMission.status === "CANCELLED" ? "Cancelled via admin" : undefined,
  };
}

/**
 * Map frontend status to backend status enum.
 */
export function mapStatusToBackend(
  status: MissionStatus,
): BackendMissionStatus {
  return STATUS_TO_BACKEND[status];
}

/**
 * Map backend status to frontend status enum.
 */
export function mapStatusToFrontend(
  status: BackendMissionStatus,
): MissionStatus {
  return STATUS_TO_FRONTEND[status];
}

/* ── Create (multipart) ── */

/**
 * Build the multipart/form-data payload for mission creation
 */
export function buildCreateMissionFormData(
  partial: PartialAdminMission,
  image?: File,
): FormData {
  const formData = new FormData();

  formData.append("title", partial.title ?? "");
  if (partial.description) formData.append("description", partial.description);

  formData.append("type", CATEGORY_TO_TYPE[partial.category ?? "daily"]);
  formData.append("coinsAmount", String(partial.tokenReward ?? 0));
  formData.append("experiencePoints", String(partial.xpReward ?? 0));

  if (partial.roomId) {
    formData.append("roomId", String(partial.roomId));
  }

  const steps = (partial.steps ?? []).map((step) => {
    let cleanConfig = null;
    if (step.verificationType === "GAME_PLAY" && step.targetConfig) {
      if (step.targetConfig.gameId) {
        cleanConfig = {
          gameId: step.targetConfig.gameId,
          minBet: Number(step.targetConfig.minBet) || 0,
        };
      } else if (step.targetConfig.provider) {
        cleanConfig = {
          provider: step.targetConfig.provider,
          minUniqueGames: Number(step.targetConfig.minUniqueGames) || 1,
          minBet: Number(step.targetConfig.minBet) || 0,
        };
      }
    }

    return {
      stepOrder: step.order,
      type: step.verificationType,
      content: step.title,
      targetConfig: cleanConfig,
    };
  });

  formData.append("missionSteps", JSON.stringify(steps));

  if (image) formData.append("image", image);

  return formData;
}
