"use client";

import { Badge, statusLabels } from "@/components/ui/Badge";
import type { MissionRowProps } from "@/types/missions/MissionTable";
import { RowActions } from "./RowActions";

function MissionRow({
  mission,
  onEdit,
  onActivate,
  onCancel,
  onDelete,
  onView,
  onDuplicate,
}: MissionRowProps) {
  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Column 1: Title + Rewards */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex flex-col gap-1.5 min-w-0">
          <p className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
            {mission.title}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-label-sm">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20 text-secondary font-medium text-xs">
              <span className="material-symbols-outlined text-xs">token</span>
              <span>{mission.tokenReward.toLocaleString()} fichas</span>
              {mission.bonusPercent > 0 && (
                <span className="text-[10px] font-bold text-secondary-fixed">
                  (+{mission.bonusPercent}%)
                </span>
              )}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-medium text-xs">
              <span className="material-symbols-outlined text-xs">stars</span>
              <span>{mission.xpReward.toLocaleString()} XP</span>
            </span>
          </div>
        </div>
      </td>

      {/* Column 2: Status Badge */}
      <td className="py-4 px-4">
        <Badge variant={mission.status}>{statusLabels[mission.status]}</Badge>
      </td>

      {/* Column 3: Steps + Participants */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3 text-label-sm text-on-surface-variant">
          <span className="inline-flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-sm text-outline">
              flag
            </span>
            <span>{mission.steps.length} pasos</span>
          </span>

          <span className="inline-flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-sm text-outline">
              group
            </span>
            <span>{mission.participants} participantes</span>
          </span>
        </div>
      </td>

      {/* Column 4: Actions */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <div className="flex justify-end">
          <RowActions
            mission={mission}
            onEdit={onEdit}
            onActivate={onActivate}
            onCancel={onCancel}
            onDelete={onDelete}
            onView={onView}
            onDuplicate={onDuplicate}
          />
        </div>
      </td>
    </tr>
  );
}

MissionRow.displayName = "MissionRow";

export { MissionRow };
