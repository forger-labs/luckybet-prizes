"use client";

import type { MissionTableProps } from "@/types/missions/MissionTable";
import { MissionRow } from "./MissionRow";

/**
 * MissionTable — standard HTML table for the mission list.
 *
 * Columns: Misión y Recompensa, Estado, Métricas, Acciones
 * Header uses label-md styling with text-on-surface-variant.
 * Empty state when no missions match the current filter.
 */
function MissionTable({
  missions,
  onEdit,
  onActivate,
  onCancel,
  onDelete,
  onView,
  onDuplicate,
}: MissionTableProps) {
  if (missions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="material-symbols-outlined text-5xl text-outline/50 mb-4">
          radio_button_unchecked
        </span>
        <p className="text-body-md text-on-surface-variant">
          No hay misiones en este estado
        </p>
      </div>
    );
  }

  return (
    <div className=" rounded-lg border border-outline-variant/20 overflow-x-visible">
      <table className="w-full overflow-x-auto">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-low">
            <th className="pl-4 py-3 pr-4 text-left text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              Misión y Recompensa
            </th>
            <th className="py-3 pr-4 text-left text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              Estado
            </th>
            <th className="py-3 pr-4 text-left text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              Métricas
            </th>
            <th className="py-3 pr-8 text-right text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <MissionRow
              key={mission.id}
              mission={mission}
              onEdit={onEdit}
              onActivate={onActivate}
              onCancel={onCancel}
              onDelete={onDelete}
              onView={onView}
              onDuplicate={onDuplicate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

MissionTable.displayName = "MissionTable";

export { MissionTable };
