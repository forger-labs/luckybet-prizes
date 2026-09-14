"use client";

import type { AdminMission } from "@shared/types";

import { Badge, statusLabels } from "@/components/ui/Badge";
import { RowActions } from "./RowActions";

interface MissionRowProps {
  mission: AdminMission;
  onEdit?: (id: string) => void;
  onActivate?: (id: string) => void;
  onCancel?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

/**
 * MissionRow — single table row for a mission.
 *
 * Columns:
 * 1. Title + token reward + XP reward
 * 2. Status badge (color-coded)
 * 3. Steps count + Participants count
 * 4. RowActions (contextual dropdown)
 */
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
    <tr className="border-b border-outline-variant/20 last:border-b-0 hover:bg-surface-container-high/50 transition-colors">
      {/* Column 1: Title + Rewards */}
      <td className="py-4 pr-4 pl-3">
        <div className="flex flex-col gap-1">
          <p className="text-body-md font-semibold text-on-surface">
            {mission.title}
          </p>
          <div className="flex items-center gap-3 text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">
                token
              </span>
              {mission.tokenReward.toLocaleString()}
              {mission.bonusPercent > 0 && (
                <span className="text-secondary">
                  (+{mission.bonusPercent}%)
                </span>
              )}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">
                stars
              </span>
              {mission.xpReward.toLocaleString()} XP
            </span>
          </div>
        </div>
      </td>

      {/* Column 2: Status Badge */}
      <td className="py-4 pr-4">
        <Badge variant={mission.status}>{statusLabels[mission.status]}</Badge>
      </td>

      {/* Column 3: Steps + Participants */}
      <td className="py-4 pr-4">
        <div className="flex items-center gap-4 text-body-md text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">flag</span>
            {mission.steps.length} pasos
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">group</span>
            {mission.participants} participantes
          </span>
        </div>
      </td>

      {/* Column 4: Actions */}
      <td className="py-4 pr-14 text-right">
        <RowActions
          mission={mission}
          onEdit={onEdit}
          onActivate={onActivate}
          onCancel={onCancel}
          onDelete={onDelete}
          onView={onView}
          onDuplicate={onDuplicate}
        />
      </td>
    </tr>
  );
}

MissionRow.displayName = "MissionRow";

export { MissionRow };
export type { MissionRowProps };
