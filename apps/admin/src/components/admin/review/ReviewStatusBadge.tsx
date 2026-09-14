"use client";

import type { ReviewStatus } from "@/types/review/ReviewSubmission";

const statusStyles: Record<ReviewStatus, string> = {
  pending: "bg-[#ffc640]/20 text-[#ffc640]",
  approved: "bg-[#22c55e]/15 text-[#4ade80]",
  rejected: "bg-[#ffb4ab]/20 text-[#ffb4ab]",
};

const statusLabels: Record<ReviewStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
};

interface ReviewStatusBadgeProps {
  status: ReviewStatus;
}

function ReviewStatusBadge({ status }: ReviewStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm uppercase tracking-wider ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export { ReviewStatusBadge };
