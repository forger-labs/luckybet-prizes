"use client";

import type { MissionTableProps } from "@/types/missions/MissionTable";
import { MissionRow } from "./MissionRow";

export function MissionTable({
  missions,
  onPreview,
  onEdit,
  onActivate,
  onCancel,
  onComplete,
}: MissionTableProps) {
  if (missions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/60 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-center text-outline/60 mb-4 shadow-inner">
          <span className="material-symbols-outlined text-3xl">
            assignment_late
          </span>
        </div>
        <p className="font-(--font-plus-jakarta-sans) text-title-md font-bold text-on-surface">
          No se encontraron misiones
        </p>
        <p className="font-body-md text-sm text-on-surface-variant max-w-sm mt-1">
          No hay misiones que coincidan con los filtros seleccionados o el
          criterio de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-outline-variant/20 bg-surface-container-low/70 shadow-xl">
      <table className="w-full text-left border-collapse min-w-[680px]">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            <th className="py-3.5 px-4 sm:pl-6 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Misión y Tipo
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Recompensas y Sala
            </th>
            <th className="py-3.5 px-4 text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Estado / Tiempo
            </th>
            <th className="py-3.5 px-4 sm:pr-6 text-right text-label-sm font-bold text-on-surface-variant uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/10">
          {missions.map((mission) => (
            <MissionRow
              key={mission.id}
              mission={mission}
              onPreview={onPreview}
              onEdit={onEdit}
              onActivate={onActivate}
              onCancel={onCancel}
              onComplete={onComplete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

MissionTable.displayName = "MissionTable";
