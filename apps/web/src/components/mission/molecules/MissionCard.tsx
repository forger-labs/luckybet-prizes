"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { Mission } from "@shared/types/mission";

import { CheckCircleIcon } from "@/icons";
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

  const cardContent = (
    <motion.div
      whileHover={{ y: completed ? 0 : -4 }}
      transition={{ duration: 0.2 }}
      className={`glass-card-strong p-5 sm:p-6 rounded-2xl group transition-all duration-300 relative overflow-hidden border flex flex-col justify-between h-full ${
        completed
          ? "border-emerald-500/30 bg-surface-container-high/40 opacity-80"
          : "border-white/10 hover:border-primary/40 hover:shadow-xl"
      }`}
    >
      {/* Ambient status indicator */}
      {completed && (
        <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
      )}

      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start mb-4">
          <MissionIcon icon={icon} color={color} />
          <MissionReward reward={reward} completed={completed} />
        </div>

        {/* Title */}
        <h3
          className={`font-title-md text-base sm:text-lg font-bold text-on-surface mb-1.5 transition-colors ${
            completed
              ? "text-on-surface-variant line-through"
              : "group-hover:text-primary"
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-on-surface-variant font-body-md text-xs sm:text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="space-y-1.5 mb-4">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-on-surface-variant">Progreso</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden border border-white/5 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full glow-primary-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-2">
        {completed ? (
          <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
            <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
            Completada y Reclamada
          </span>
        ) : (
          <span className="text-xs text-on-surface-variant font-medium">
            Disponible
          </span>
        )}
        <MissionActionButton completed={completed} onClick={onAction} />
      </div>
    </motion.div>
  );

  if (href && !completed) {
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
