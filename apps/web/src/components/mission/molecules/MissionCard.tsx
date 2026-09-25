"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { Mission } from "@shared/types/mission";

import type { MissionItem } from "@/types/missions";
import { MissionActionButton } from "../atoms/MissionActionButton";
import { MissionIcon } from "../atoms/MissionIcon";
import { MissionReward } from "../atoms/MissionReward";
import { MissionStatus } from "../atoms/MissionStatus";

interface Props {
  mission: MissionItem | Mission;
}

export const MissionCard = ({ mission }: Props) => {
  const {
    id,
    title,
    description,
    reward,
    icon,
    color,
    completed,
    progress,
    href = `/dashboard/missions/${id}`,
    onAction,
  } = mission;

  const rewardXp = "rewardXp" in mission ? mission.rewardXp : undefined;
  const actionLabel =
    "actionLabel" in mission ? mission.actionLabel : undefined;

  const cardInner = (
    <motion.div
      whileHover={{ y: completed ? 0 : -3 }}
      transition={{ duration: 0.15 }}
      className={`relative h-full flex flex-col justify-between p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 overflow-hidden select-none ${
        completed
          ? "bg-[#131b2e] border-[#10b981]/30 opacity-75"
          : "bg-[#171f33] border-[#2d3449] hover:border-[#8ed5ff] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(56,189,248,0.2)]"
      }`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <MissionIcon icon={icon} color={color} size="md" />
          <div className="flex flex-col items-end gap-1.5">
            <MissionReward
              reward={reward}
              xp={rewardXp ? `${rewardXp} XP` : undefined}
              completed={completed}
            />
            <MissionStatus completed={completed} />
          </div>
        </div>

        {/* Title & Description */}
        <h3
          className={`font-(--font-plus-jakarta-sans) text-base sm:text-lg font-black mb-1.5 tracking-tight ${
            completed
              ? "text-[#87929a] line-through"
              : "text-white group-hover:text-[#8ed5ff]"
          }`}
        >
          {title}
        </h3>

        {description && (
          <p className="text-[#bdc8d1] font-(--font-be-vietnam-pro) text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Progress Bar */}
        {progress !== undefined && !completed && (
          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between text-xs font-black">
              <span className="text-[#87929a] uppercase tracking-wider">
                Progreso
              </span>
              <span className="text-[#8ed5ff]">{progress}%</span>
            </div>
            <div className="w-full bg-[#0b1326] h-2 rounded-full overflow-hidden border border-white/10 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#38bdf8] h-full rounded-full shadow-[0_0_8px_#38bdf8]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-[#2d3449] mt-2">
        <span className="text-xs font-bold text-[#87929a]">
          {completed ? "Misión completada" : "Detalles"}
        </span>

        <MissionActionButton
          completed={completed}
          label={actionLabel || "Hacer Misión"}
          onClick={onAction}
        />
      </div>
    </motion.div>
  );

  if (href && !completed) {
    return (
      <Link href={href} className="block h-full cursor-pointer group">
        {cardInner}
      </Link>
    );
  }

  return cardInner;
};
