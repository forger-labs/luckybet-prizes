"use client";

import type {
  MissionRewardStatus,
  MissionRewardsTableRowProps,
} from "@/types/review/AdminMissionRewards";

const statusStyles: Record<MissionRewardStatus, string> = {
  PENDING: "bg-secondary/15 text-secondary border-secondary/30",
  PROCESSING: "bg-primary/15 text-primary border-primary/30",
  CLAIMED: "bg-[#22c55e]/15 text-[#4ade80] border-[#22c55e]/30",
  TIMEOUT_UNCERTAIN:
    "bg-error-container/30 text-error border-error-container/40",
};

const statusLabels: Record<MissionRewardStatus, string> = {
  PENDING: "Pendiente",
  PROCESSING: "En Proceso",
  CLAIMED: "Acreditado",
  TIMEOUT_UNCERTAIN: "Incierto (Timeout)",
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

export function MissionRewardsTableRow({
  reward,
  onResolve,
}: MissionRewardsTableRowProps) {
  const isUncertain = reward.status === "TIMEOUT_UNCERTAIN";
  const isPending = reward.status === "PENDING";

  return (
    <tr
      className={`border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 ${
        isUncertain ? "bg-error-container/5" : ""
      }`}
    >
      {/* ID & Fecha */}
      <td className="py-3.5 px-4 sm:pl-6">
        <span className="font-bold text-on-surface text-sm block">
          #{reward.id}
        </span>
        <span className="text-[11px] text-on-surface-variant block">
          {relativeTime(reward.createdAt)}
        </span>
      </td>

      {/* Jugador */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center font-bold text-xs text-primary shrink-0">
            <span>P</span>
          </div>
          <span className="text-sm font-semibold text-on-surface">
            Jugador #{reward.playerId}
          </span>
        </div>
      </td>

      {/* Misión de Usuario */}
      <td className="py-3.5 px-4">
        <span className="text-xs font-mono bg-surface-container px-2 py-1 rounded-md border border-outline-variant/20 text-on-surface-variant">
          UserMission #{reward.userMissionId}
        </span>
      </td>

      {/* Premios */}
      <td className="py-3.5 px-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-secondary">
            +{reward.coinsAmount} fichas
          </span>
          <span className="text-[11px] font-medium text-primary">
            +{reward.experiencePoints} XP
          </span>
        </div>
      </td>

      {/* Estado */}
      <td className="py-3.5 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
            statusStyles[reward.status]
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              reward.status === "PENDING" || reward.status === "PROCESSING"
                ? "bg-secondary animate-pulse"
                : reward.status === "CLAIMED"
                  ? "bg-[#4ade80]"
                  : "bg-error"
            }`}
          />
          <span>{statusLabels[reward.status]}</span>
        </span>
      </td>

      {/* Operación Externa / Error */}
      <td className="py-3.5 px-4">
        {reward.externalOperationId ? (
          <span
            className="text-xs font-mono text-primary truncate max-w-[140px] block"
            title={reward.externalOperationId}
          >
            {reward.externalOperationId}
          </span>
        ) : reward.errorMessage ? (
          <span
            className="text-xs text-error line-clamp-1"
            title={reward.errorMessage}
          >
            {reward.errorMessage}
          </span>
        ) : (
          <span className="text-xs text-on-surface-variant/60">—</span>
        )}
      </td>

      {/* Acciones */}
      <td className="py-3.5 px-4 sm:pr-6 text-right">
        {(isUncertain || isPending) && (
          <button
            type="button"
            onClick={() => onResolve(reward)}
            className="px-3 py-1.5 rounded-xl bg-primary text-on-primary hover:bg-primary-fixed-dim text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">build</span>
            <span>Resolver</span>
          </button>
        )}
      </td>
    </tr>
  );
}

MissionRewardsTableRow.displayName = "MissionRewardsTableRow";
