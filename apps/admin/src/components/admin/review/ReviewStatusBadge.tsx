"use client";

import type {
  StepSubmissionStatus,
  UserMissionStatus,
} from "@/types/review/ReviewMission";

const missionStatusStyles: Record<UserMissionStatus, string> = {
  IN_PROGRESS: "bg-secondary/15 text-secondary border-secondary/30",
  COMPLETED: "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30",
  CANCELLED: "bg-error-container/30 text-error border-error-container/40",
  EXPIRED: "bg-outline/15 text-outline border-outline/30",
};

const missionStatusLabels: Record<UserMissionStatus, string> = {
  IN_PROGRESS: "En Progreso",
  COMPLETED: "Completada",
  CANCELLED: "Fallida",
  EXPIRED: "Expirada",
};

const stepStatusStyles: Record<StepSubmissionStatus, string> = {
  PENDING: "bg-secondary/15 text-secondary border-secondary/30",
  APPROVED: "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30",
  REJECTED: "bg-error-container/30 text-error border-error-container/40",
};

const stepStatusLabels: Record<StepSubmissionStatus, string> = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
};

interface ReviewStatusBadgeProps {
  status: UserMissionStatus | StepSubmissionStatus;
  type?: "mission" | "step";
}

export function ReviewStatusBadge({
  status,
  type = "mission",
}: ReviewStatusBadgeProps) {
  const isMission = type === "mission";
  const styles = isMission
    ? missionStatusStyles[status as UserMissionStatus]
    : stepStatusStyles[status as StepSubmissionStatus];
  const label = isMission
    ? missionStatusLabels[status as UserMissionStatus]
    : stepStatusLabels[status as StepSubmissionStatus];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold
        uppercase tracking-wider border text-xs
        ${styles || "bg-outline/15 text-outline border-outline/30"}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "PENDING" || status === "IN_PROGRESS"
            ? "bg-secondary animate-pulse"
            : status === "APPROVED" || status === "COMPLETED"
              ? "bg-[#4ade80]"
              : "bg-error"
        }`}
      />
      <span>{label || status}</span>
    </span>
  );
}

ReviewStatusBadge.displayName = "ReviewStatusBadge";
