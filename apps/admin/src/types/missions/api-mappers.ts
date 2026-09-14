/**
 * api-mappers — field mappers between frontend AdminMission and backend BackendMission.
 *
 * Handles:
 * - bonusPercent ↔ bonus (absolute chip amount)
 * - category ↔ type (lowercase ↔ UPPERCASE)
 * - tokenReward ↔ coinsAmount
 * - xpReward ↔ experiencePoints
 * - coverImage ↔ imageUrl
 * - status (lowercase ↔ UPPERCASE)
 */

import type {
  AdminMission,
  BackendCreateMissionPayload,
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
  special_event: "FIXED", // Backend has no SPECIAL_EVENT — map to FIXED
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
 * Convert frontend AdminMission/PartialAdminMission → backend BackendCreateMissionPayload.
 */
export function mapAdminToBackend(
  adminMission: PartialAdminMission,
): BackendCreateMissionPayload {
  const bonus =
    adminMission.bonusPercent > 0 && adminMission.tokenReward > 0
      ? Math.round((adminMission.bonusPercent / 100) * adminMission.tokenReward)
      : undefined;

  return {
    title: adminMission.title ?? "",
    description: adminMission.description,
    type: CATEGORY_TO_TYPE[adminMission.category ?? "daily"],
    coinsAmount: adminMission.tokenReward ?? 0,
    bonus,
    experiencePoints: adminMission.xpReward ?? 0,
    imageUrl: adminMission.coverImage,
  };
}

/**
 * Convert backend BackendMission → frontend AdminMission.
 */
export function mapBackendToAdmin(
  backendMission: BackendMission,
): AdminMission {
  const bonusPercent =
    backendMission.bonus && backendMission.coinsAmount > 0
      ? Math.round((backendMission.bonus / backendMission.coinsAmount) * 100)
      : 0;

  return {
    id: String(backendMission.id),
    title: backendMission.title,
    description: backendMission.description ?? "",
    tokenReward: backendMission.coinsAmount,
    bonusPercent,
    xpReward: backendMission.experiencePoints,
    category: TYPE_TO_CATEGORY[backendMission.type],
    status: STATUS_TO_FRONTEND[backendMission.status],
    steps: [], // Steps are managed separately via MissionFormModal
    coverImage: backendMission.imageUrl,
    participants: 0, // Not provided by backend list endpoint
    createdAt: backendMission.activatedAt ?? "",
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
