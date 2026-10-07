"use client";

import type { LevelRewardsTableProps } from "@/types/adminLevels";
import { LevelRewardsTableRow } from "./LevelRewardsTableRow";

export function LevelRewardsTable({
  rewards,
  isLoading,
  onResolve,
}: LevelRewardsTableProps) {
  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-outline-variant/20 bg-surface-container-low/70 p-8 flex items-center justify-center">
        <span className="text-on-surface-variant font-medium text-sm animate-pulse">
          Cargando reclamos de nivel...
        </span>
      </div>
    );
  }

  if (rewards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">
            military_tech
          </span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No hay recompensas de nivel
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          No se encontraron reclamos de premios de nivel para los filtros
          seleccionados.
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
              Nivel
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Premio
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
            <LevelRewardsTableRow
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

LevelRewardsTable.displayName = "LevelRewardsTable";
