import Link from "next/link";

import type { Mission } from "@shared/types/mission";

import { MissionActionButton } from "../atoms/MissionActionButton";
import { MissionIcon } from "../atoms/MissionIcon";
import { MissionReward } from "../atoms/MissionReward";

interface Props {
  mission: Mission;
}

export const MissionCard = ({ mission }: Props) => {
  const {
    title,
    description,
    reward,
    icon,
    color,
    completed,
    progress,
    href,
    onAction,
  } = mission;

  const content = (
    <div
      className={`glass-card p-6 rounded-2xl group mission-glow transition-all duration-300 ${
        completed ? "opacity-60 relative overflow-hidden" : ""
      }`}
    >
      {completed && (
        <div className="absolute top-2 right-2 rotate-12">
          <span className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-lg font-black text-xs">
            COMPLETADA
          </span>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <MissionIcon icon={icon} color={color} />
        <MissionReward reward={reward} completed={completed} />
      </div>

      <h3
        className={`font-title-md text-title-md text-on-surface mb-2 ${completed ? "line-through" : ""}`}
      >
        {title}
      </h3>

      {description && (
        <p className="text-on-surface-variant text-sm mb-4">{description}</p>
      )}

      {progress !== undefined && (
        <>
          <div className="w-full bg-surface-container-lowest h-2 rounded-full mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-primary-container h-full shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-label-sm text-on-surface-variant">
              {progress}%
            </span>
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        {completed ? (
          <span className="text-label-sm text-secondary font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">
              check_circle
            </span>
            Reclamado
          </span>
        ) : (
          <span />
        )}
        <MissionActionButton completed={completed} onClick={onAction} />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
