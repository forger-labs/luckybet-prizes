"use client";

import type { MissionRewardsTableProps } from "@/types/review/AdminMissionRewards";
import { MissionRewardsTableRow } from "./MissionRewardsTableRow";

export function MissionRewardsTable({
  rewards,
  isLoading,
  onResolve,
}: MissionRewardsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-outline-variant/20 bg-surface-container-low/70 p-8 flex items-center justify-center">
        <span className="text-on-surface-variant font-medium text-sm animate-pulse">
          Cargando reclamos de recompensas...
        </span>
      </div>
    );
  }

  if (rewards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">
            receipt_long
          </span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No hay recompensas registradas
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          No se encontraron registros de reclamos de recompensas para los
          filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70 shadow-xl">
      <table className="w-full text-left border-collapse min-w-[760px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              ID / Fecha
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Jugador
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Misión
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Premios
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Estado
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Operación / Error
            </th>
            <th className="py-3.5 px-4 sm:pr-6 text-right text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {rewards.map((reward) => (
            <MissionRewardsTableRow
              key={reward.id}
              reward={reward}
              onResolve={onResolve}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

MissionRewardsTable.displayName = "MissionRewardsTable";
