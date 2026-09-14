import type { MissionSectionProps } from "@shared/types/mission";

import { SectionTitle } from "../atoms/SectionTitle";
import { MissionCard } from "../molecules/MissionCard";

export const MissionSection = ({
  title,
  titleColor,
  missions,
  columns = 2,
  icon,
  timer,
  actionLabel,
}: MissionSectionProps) => (
  <section className="flex flex-col gap-stack-sm">
    <div className="flex items-center justify-between px-2 mb-2">
      <div className="flex items-center gap-3">
        {icon && (
          <span
            className="material-symbols-outlined"
            style={{ color: titleColor }}
          >
            {icon}
          </span>
        )}
        <SectionTitle title={title} color={titleColor} />
        {timer && (
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase border border-primary/20">
            {timer}
          </span>
        )}
      </div>
      {actionLabel && (
        <button
          className="text-label-md text-primary-container hover:underline transition-all"
          type="button"
        >
          {actionLabel}
        </button>
      )}
    </div>

    {columns === 2 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-sm">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-4">
        {missions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    )}
  </section>
);
