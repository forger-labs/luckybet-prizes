"use client";

import type { ReviewTableRowProps } from "@/types/review/ReviewSubmission";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

const typeLabels: Record<string, string> = {
  DAILY: "Diaria",
  WEEKLY: "Semanal",
  FIXED: "Fija",
};

export function ReviewTableRow({
  item,
  onReview,
  onQuickApproveStep,
  onQuickRejectStep,
}: ReviewTableRowProps) {
  const initial = item.playerName ? item.playerName[0].toUpperCase() : "J";
  const pendingSteps = item.steps.filter((s) => s.status === "PENDING");
  const firstPendingStep = pendingSteps[0];

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Player info */}
      <td className="py-3.5 px-4 sm:pl-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center shrink-0 overflow-hidden font-bold text-primary shadow-sm">
            <span>{initial}</span>
          </div>
          <div className="min-w-0">
            <span className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
              {item.playerName || `Jugador #${item.playerId}`}
            </span>
            <span className="text-[11px] text-on-surface-variant block">
              ID: {item.playerId}
            </span>
          </div>
        </div>
      </td>

      {/* Mission details */}
      <td className="py-3.5 px-4">
        <div className="flex flex-col gap-1 min-w-0 max-w-xs">
          <span className="font-(--font-plus-jakarta-sans) text-body-md font-medium text-on-surface truncate">
            {item.missionTitle}
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[10px]">
                sell
              </span>
              <span>{typeLabels[item.missionType] || item.missionType}</span>
            </span>
            <span className="text-[11px] text-secondary font-medium">
              +{item.coinsAmount} fichas
            </span>
          </div>
        </div>
      </td>

      {/* Steps summary */}
      <td className="py-3.5 px-4">
        <div className="flex flex-wrap gap-1.5 items-center">
          {item.steps.map((st, idx) => (
            <span
              key={st.id}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                st.status === "PENDING"
                  ? "bg-secondary/15 text-secondary border-secondary/30 animate-pulse"
                  : st.status === "APPROVED"
                    ? "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30"
                    : "bg-error/15 text-error border-error/30"
              }`}
            >
              <span>P{idx + 1}</span>
              <span className="material-symbols-outlined text-[10px]">
                {st.status === "PENDING"
                  ? "hourglass_top"
                  : st.status === "APPROVED"
                    ? "check"
                    : "close"}
              </span>
            </span>
          ))}
          {item.steps.length === 0 && (
            <span className="text-xs text-on-surface-variant">Sin pasos</span>
          )}
        </div>
      </td>

      {/* Mission status */}
      <td className="py-3.5 px-4">
        <ReviewStatusBadge status={item.userMissionStatus} type="mission" />
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4 sm:pr-6 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onReview(item)}
            className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
            title="Abrir auditoría de pasos"
          >
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
            <span>Revisar ({pendingSteps.length})</span>
          </button>

          {firstPendingStep && onQuickApproveStep && (
            <button
              type="button"
              onClick={() => onQuickApproveStep(firstPendingStep.id)}
              className="w-8 h-8 rounded-xl text-outline hover:text-[#4ade80] hover:bg-[#22c55e]/10 border border-transparent hover:border-[#22c55e]/20 transition-all cursor-pointer flex items-center justify-center"
              title="Aprobar primer paso pendiente"
            >
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
            </button>
          )}

          {firstPendingStep && onQuickRejectStep && (
            <button
              type="button"
              onClick={() => onQuickRejectStep(firstPendingStep.id)}
              className="w-8 h-8 rounded-xl text-outline hover:text-error hover:bg-error/10 border border-transparent hover:border-error/20 transition-all cursor-pointer flex items-center justify-center"
              title="Rechazar con modal"
            >
              <span className="material-symbols-outlined text-base">
                cancel
              </span>
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

ReviewTableRow.displayName = "ReviewTableRow";
