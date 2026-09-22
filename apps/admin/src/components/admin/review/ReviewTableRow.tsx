"use client";

import Image from "next/image";

import type { MissionCategory } from "@shared/types";

import type { ReviewTableRowProps } from "@/types/review/ReviewSubmission";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

const categoryLabels: Record<MissionCategory, string> = {
  daily: "Diaria",
  weekly: "Semanal",
  fixed: "Fija",
  special_event: "Evento",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days} d`;
}

export function ReviewTableRow({
  submission,
  onSelect,
  onApprove,
  onReject,
}: ReviewTableRowProps) {
  const initial = submission.userName
    ? submission.userName[0].toUpperCase()
    : "J";

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Player info */}
      <td className="py-3.5 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center shrink-0 overflow-hidden font-bold text-primary shadow-sm">
            {submission.userAvatar ? (
              <Image
                height={40}
                width={40}
                src={submission.userAvatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <div className="min-w-0">
            <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
              {submission.userName || "Jugador"}
            </span>
            {submission.submittedAt && (
              <span className="text-[11px] text-on-surface-variant block">
                {relativeTime(submission.submittedAt)}
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Mission title & category */}
      <td className="py-3.5 px-4">
        <div className="flex flex-col gap-1 min-w-0 max-w-xs">
          <span className="font-(--font-plus-jakarta-sans) text-body-md font-medium text-on-surface truncate">
            {submission.missionTitle}
          </span>
          {submission.missionCategory && (
            <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[10px]">
                sell
              </span>
              <span>{categoryLabels[submission.missionCategory]}</span>
            </span>
          )}
        </div>
      </td>

      {/* Evidence thumbnail */}
      <td className="py-3.5 px-4">
        <button
          type="button"
          onClick={() => onSelect(submission.id)}
          className="w-14 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/20 overflow-hidden flex items-center justify-center hover:border-primary/50 transition-all cursor-pointer group/thumb"
          title="Ver evidencia completa"
        >
          {submission.images && submission.images.length > 0 ? (
            <Image
              src={submission.images[0]}
              width={56}
              height={48}
              alt="Miniatura"
              className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
            />
          ) : (
            <span className="material-symbols-outlined text-outline/60 text-lg">
              image
            </span>
          )}
        </button>
      </td>

      {/* Status */}
      <td className="py-3.5 px-4">
        <ReviewStatusBadge status={submission.status} />
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onSelect(submission.id)}
            className="flex items-center justify-center w-9 h-9 rounded-xl text-outline hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all cursor-pointer"
            title="Abrir detalles de revisión"
          >
            <span className="material-symbols-outlined text-lg">
              visibility
            </span>
          </button>

          {submission.status === "pending" && (
            <>
              <button
                type="button"
                onClick={() => onApprove(submission.id)}
                className="flex items-center justify-center w-9 h-9 rounded-xl text-outline hover:text-[#4ade80] hover:bg-[#22c55e]/10 border border-transparent hover:border-[#22c55e]/20 transition-all cursor-pointer"
                title="Aprobar tarea"
              >
                <span className="material-symbols-outlined text-lg">
                  check_circle
                </span>
              </button>

              <button
                type="button"
                onClick={() => onReject(submission.id)}
                className="flex items-center justify-center w-9 h-9 rounded-xl text-outline hover:text-error hover:bg-error/10 border border-transparent hover:border-error/20 transition-all cursor-pointer"
                title="Rechazar tarea"
              >
                <span className="material-symbols-outlined text-lg">
                  cancel
                </span>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

ReviewTableRow.displayName = "ReviewTableRow";
