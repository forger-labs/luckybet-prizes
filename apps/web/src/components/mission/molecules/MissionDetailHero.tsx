"use client";

import { motion } from "framer-motion";

import { BoltIcon, ClockIcon, CoinsIcon, SparklesIcon } from "@/icons";
import type { MissionDetailData } from "@/types/missions";

interface Props {
  mission: MissionDetailData;
}

export const MissionDetailHero = ({ mission }: Props) => {
  const {
    name,
    description,
    longDescription,
    rewardCoins,
    rewardXp,
    icon,
    color,
    category,
    status,
    expiresIn,
  } = mission;

  const isCompleted = status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-[#2d3449] bg-[#171f33] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        {/* Solid Vivid Casino Emblem */}
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center shrink-0 border-2 self-center md:self-auto shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          style={{
            backgroundColor: color,
            borderColor: color,
          }}
        >
          <span
            className="material-symbols-outlined text-5xl sm:text-6xl select-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>

        {/* Mission Info & Badges */}
        <div className="flex-1 text-center md:text-left space-y-3">
          {/* Tag Pills Row */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-[#00354a] text-[#8ed5ff] border border-[#38bdf8]">
              <BoltIcon className="w-3.5 h-3.5 text-[#8ed5ff]" />
              {category === "daily" ? "Misión Diaria" : "Misión Permanente"}
            </span>

            {expiresIn && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#222a3d] text-[#dae2fd] border border-[#3e484f]">
                <ClockIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                {expiresIn}
              </span>
            )}

            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-black bg-[#064e3b] text-[#34d399] border border-[#059669]">
                <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                Completada
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-black bg-[#402d00] text-[#ffc640] border border-[#e3aa00]">
                <span className="w-2 h-2 rounded-full bg-[#ffc640] animate-ping" />
                Disponible
              </span>
            )}
          </div>

          {/* Mission Title */}
          <h1 className="font-(--font-plus-jakarta-sans) text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {name}
          </h1>

          {/* Description */}
          <p className="font-(--font-be-vietnam-pro) text-xs sm:text-sm md:text-base text-[#bdc8d1] leading-relaxed max-w-2xl">
            {longDescription || description}
          </p>

          {/* Solid Rewards Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ffc640] text-[#402d00] border-2 border-[#ffdf9f] shadow-md">
              <CoinsIcon className="w-5 h-5 text-[#402d00]" />
              <span className="font-(--font-plus-jakarta-sans) text-base sm:text-lg font-black tracking-tight">
                +{rewardCoins.toLocaleString("es-ES")} Fichas
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8ed5ff] text-[#00354a] border-2 border-[#c4e7ff] shadow-md">
              <SparklesIcon className="w-4 h-4 text-[#00354a]" />
              <span className="font-(--font-plus-jakarta-sans) font-black text-xs sm:text-sm">
                +{rewardXp} XP de Nivel
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
