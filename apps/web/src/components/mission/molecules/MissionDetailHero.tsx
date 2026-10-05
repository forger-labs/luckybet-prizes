"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { BoltIcon } from "@/icons";
import type { ClientMissionDetail } from "@/types/missions";
import { MissionCountdown } from "../atoms/MissionCountdown";
import { MissionRewardPills } from "../atoms/MissionRewardPills";

interface Props {
  mission: ClientMissionDetail;
}

const CATEGORY_LABELS: Record<string, string> = {
  daily: "Misión Diaria",
  weekly: "Misión Semanal",
  fixed: "Misión Permanente",
  special: "Misión Especial",
};

export const MissionDetailHero = ({ mission }: Props) => {
  const {
    title,
    description,
    experiencePoints,
    totalCoins,
    room,
    category,
    imageUrl,
    expiresAt,
    activatedAt,
    isJoined,
    isCompleted,
  } = mission;

  const categoryLabel = CATEGORY_LABELS[category] || "Misión";
  const roomBonus = room ? Number(room.bonus) || 0 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl border-2 border-[#2d3449] bg-[#171f33] shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
    >
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#38bdf8] via-[#ffc640] to-[#38bdf8] opacity-90 z-20" />

      {/* Hero Banner Image */}
      {imageUrl && (
        <div className="relative w-full h-44 sm:h-56 bg-[#060e20] overflow-hidden border-b border-[#2d3449]/50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-black/30 to-black/60" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
            <span className="px-3.5 py-1.5 rounded-xl bg-[#060e20]/90 border border-white/20 text-white font-mono text-xs font-black uppercase tracking-wider shadow-lg">
              {categoryLabel}
            </span>
            <MissionCountdown
              expiresAt={expiresAt}
              activatedAt={activatedAt}
              type={category}
              className="shadow-lg"
            />
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 md:p-10 space-y-4">
        {/* Badges Row (if no cover image) */}
        {!imageUrl && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-[#00354a] text-[#8ed5ff] border border-[#38bdf8]">
              <BoltIcon className="w-3.5 h-3.5 text-[#8ed5ff]" />
              {categoryLabel}
            </span>
            <MissionCountdown
              expiresAt={expiresAt}
              activatedAt={activatedAt}
              type={category}
            />
          </div>
        )}

        {/* Title & Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="font-(--font-plus-jakarta-sans) text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {title}
            </h1>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black bg-[#064e3b] text-[#34d399] border border-[#059669]">
                <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                Completada
              </span>
            ) : isJoined ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black bg-[#00354a] text-[#8ed5ff] border border-[#38bdf8]">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                En Curso
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-black bg-[#402d00] text-[#ffc640] border border-[#e3aa00]">
                Disponible
              </span>
            )}
          </div>

          {description && (
            <p className="font-(--font-be-vietnam-pro) text-xs sm:text-sm md:text-base text-[#bdc8d1] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Reward Pills */}
        <div className="pt-2">
          <MissionRewardPills
            coins={totalCoins}
            xp={experiencePoints}
            bonusPercent={roomBonus}
          />
        </div>
      </div>
    </motion.div>
  );
};
