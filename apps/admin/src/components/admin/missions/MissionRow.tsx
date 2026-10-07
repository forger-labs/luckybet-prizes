"use client";

import Image from "next/image";

import { Badge, statusLabels } from "@/components/ui/Badge";
import type { MissionRowProps } from "@/types/missions/MissionTable";
import { MissionCountdown } from "./MissionCountdown";
import { RowActions } from "./RowActions";

export function MissionRow({
  mission,
  onPreview,
  onEdit,
  onActivate,
  onCancel,
  onComplete,
}: MissionRowProps) {
  const bonusNum = mission.room ? Number(mission.room.bonus) || 0 : 0;

  return (
    <tr className="border-b border-outline-variant/15 last:border-b-0 hover:bg-surface-container-high/40 transition-colors duration-150 group">
      {/* Column 1: Cover Image + Title + Type */}
      <td className="py-4 px-4 sm:pl-6">
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0 shadow-sm flex items-center justify-center">
            {mission.coverImage ? (
              <Image
                src={mission.coverImage}
                alt={mission.title}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="material-symbols-outlined text-primary text-2xl">
                rocket_launch
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            <p className="font-(--font-plus-jakarta-sans) text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors truncate">
              {mission.title}
            </p>
            <div className="flex items-center gap-2 text-label-sm">
              <span className="px-2 py-0.5 rounded-md bg-surface-container-highest text-on-surface-variant font-mono text-[11px] uppercase tracking-wider">
                {mission.category}
              </span>
              <span className="text-[11px] text-outline">
                {mission.steps?.length || 0} pasos
              </span>
            </div>
          </div>
        </div>
      </td>

      {/* Column 2: Rewards & Sala */}
      <td className="py-4 px-4">
        <div className="flex flex-col gap-1 text-label-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20 text-secondary font-medium text-xs">
              <span className="material-symbols-outlined text-xs">token</span>
              <span>{mission.tokenReward.toLocaleString()} fichas</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary font-medium text-xs">
              <span className="material-symbols-outlined text-xs">stars</span>
              <span>{mission.xpReward.toLocaleString()} XP</span>
            </span>
          </div>

          {mission.room ? (
            <span className="text-[11px] text-primary font-semibold">
              Sala: {mission.room.name} (
              {bonusNum > 0 ? `+${mission.room.bonus}% Bono` : "0% Bono"})
            </span>
          ) : (
            <span className="text-[11px] text-outline">
              Sin sala promocional
            </span>
          )}
        </div>
      </td>

      {/* Column 3: Status Badge + Live Countdown */}
      <td className="py-4 px-4">
        <div className="flex flex-col items-start gap-1.5">
          <Badge variant={mission.status}>{statusLabels[mission.status]}</Badge>

          {mission.status === "active" && (
            <MissionCountdown
              expiresAt={mission.expiresAt}
              activatedAt={mission.activatedAt}
              type={mission.category}
            />
          )}
        </div>
      </td>

      {/* Column 4: Inline Action Buttons */}
      <td className="py-4 px-4 sm:pr-6 text-right">
        <RowActions
          mission={mission}
          onPreview={onPreview}
          onEdit={onEdit}
          onActivate={onActivate}
          onCancel={onCancel}
          onComplete={onComplete}
        />
      </td>
    </tr>
  );
}

MissionRow.displayName = "MissionRow";
