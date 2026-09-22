"use client";

import { motion } from "framer-motion";

import type { MissionSectionProps } from "@shared/types/mission";

import { ClockIcon, SparklesIcon } from "@/icons";
import { SectionTitle } from "../atoms/SectionTitle";
import { MissionCard } from "../molecules/MissionCard";

export const MissionSection = ({
  title,
  titleColor,
  missions,
  columns = 2,
  timer,
  actionLabel,
}: MissionSectionProps) => (
  <section className="flex flex-col gap-4">
    {/* Section Header */}
    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
      <div className="flex items-center gap-3">
        <SectionTitle title={title} color={titleColor} />

        {timer && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary font-label-sm text-xs font-semibold border border-primary/30 shadow-sm">
            <ClockIcon className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>{timer}</span>
          </div>
        )}
      </div>

      {actionLabel && (
        <button
          className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors cursor-pointer"
          type="button"
        >
          <SparklesIcon className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>

    {/* Missions Grid with Staggered Framer Motion */}
    <div
      className={
        columns === 2
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : "grid grid-cols-1 gap-4"
      }
    >
      {missions.map((mission, idx) => (
        <motion.div
          key={mission.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: idx * 0.06,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="h-full"
        >
          <MissionCard mission={mission} />
        </motion.div>
      ))}
    </div>
  </section>
);
