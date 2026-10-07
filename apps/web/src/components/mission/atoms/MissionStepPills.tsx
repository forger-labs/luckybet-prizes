"use client";

import type { BackendMissionStep } from "@shared/types/admin";

interface MissionStepPillsProps {
  steps?: BackendMissionStep[];
  maxVisible?: number;
  className?: string;
}

export function MissionStepPills({
  steps = [],
  maxVisible = 2,
  className = "",
}: MissionStepPillsProps) {
  if (!steps || steps.length === 0) return null;

  const visibleSteps = steps.slice(0, maxVisible);
  const remainingCount = steps.length - maxVisible;

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {visibleSteps.map((step, idx) => {
        const isGamePlay = step.type === "GAME_PLAY";
        const isImage = step.type === "IMAGE";
        const stepNum = step.stepOrder || idx + 1;

        let badgeStyle = "bg-[#c5c9ff]/15 text-[#c5c9ff] border-[#c5c9ff]/30";
        let iconName = "edit_note";
        let label = "Texto";

        if (isGamePlay) {
          badgeStyle = "bg-primary/15 text-primary border-primary/30";
          iconName = "sports_esports";
          label = "Juego LuckyBet";
        } else if (isImage) {
          badgeStyle = "bg-secondary/15 text-secondary border-[#ffc640]/30";
          iconName = "image";
          label = "Captura";
        }

        return (
          <span
            key={step.id || idx}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${badgeStyle}`}
          >
            <span className="material-symbols-outlined text-xs">
              {iconName}
            </span>
            <span>
              P{stepNum}: {label}
            </span>
          </span>
        );
      })}

      {remainingCount > 0 && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-surface-container-low text-[#87929a] border border-[#3e484f]/40">
          +{remainingCount} más
        </span>
      )}
    </div>
  );
}
