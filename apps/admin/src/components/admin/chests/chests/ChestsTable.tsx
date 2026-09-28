"use client";

import type { ChestsTableProps } from "@/types/adminChests";
import { ChestRow } from "./ChestRow";

export function ChestsTable({
  chests,
  isLoading,
  onPreview,
  onEdit,
  onToggleStatus,
}: ChestsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-low overflow-hidden">
        <div className="p-8 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-14 w-full rounded-xl bg-surface-container-highest/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (chests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60  text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">
            inventory_2
          </span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No se encontraron cofres
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          No hay cofres configurados que coincidan con los filtros
          seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70  shadow-xl">
      <table className="w-full text-left border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
            <th className="py-3.5 px-4 sm:pl-6">Cofre y Periodo</th>
            <th className="py-3.5 px-4">Recompensas y Sala</th>
            <th className="py-3.5 px-4">Estado</th>
            <th className="py-3.5 px-4 sm:pr-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {chests.map((chest) => (
            <ChestRow
              key={chest.id}
              chest={chest}
              onPreview={onPreview}
              onEdit={onEdit}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ChestsTable.displayName = "ChestsTable";
