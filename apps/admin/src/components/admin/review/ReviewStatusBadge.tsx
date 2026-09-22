"use client";

import type { ReviewStatusBadgeProps } from "@/types/review/ReviewSubmission";

const statusStyles = {
  pending: "bg-secondary/15 text-secondary border-secondary/30",
  approved: "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30",
  rejected: "bg-error-container/30 text-error border-error-container/40",
};

const statusLabels = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
};

export function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label-sm font-semibold
        uppercase tracking-wider border text-xs
        ${statusStyles[status]}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "pending"
            ? "bg-secondary animate-pulse"
            : status === "approved"
              ? "bg-[#4ade80]"
              : "bg-error"
        }`}
      />
      <span>{statusLabels[status]}</span>
    </span>
  );
}

ReviewStatusBadge.displayName = "ReviewStatusBadge";
