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
      className="relative overflow-hidden rounded-3xl border-2 border-[#2d3449] bg-surface-container shadow-[0_6px_35px_rgba(0,0,0,0.7)]"
    >
      {/* Hero Banner Image */}
      {imageUrl && (
        <div className="relative w-full h-48 sm:h-60 bg-surface-container-lowest overflow-hidden border-b-2 border-[#2d3449]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
          {/* Deep dark gradient overlay guarantees ultra-high contrast for countdown & category pills */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-black/45 to-black/75" />
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
            <span className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest border-2 border-white/40 text-white font-mono text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              {categoryLabel}
            </span>
            <MissionCountdown
              expiresAt={expiresAt}
              activatedAt={activatedAt}
              type={category}
            />
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 md:p-10 space-y-5">
        {/* Badges Row (if no cover image) */}
        {!imageUrl && (
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-on-primary text-primary border-2 border-[#38bdf8]">
              <BoltIcon className="w-3.5 h-3.5 text-primary" />
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
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-(--font-plus-jakarta-sans) text-2xl sm:text-3xl md:text-4xl font-black text-[#f8fafc] tracking-tight">
              {title}
            </h1>
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-[#064e3b] text-[#34d399] border-2 border-[#059669] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#34d399]" />
                Completada
              </span>
            ) : isJoined ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-on-primary text-primary border-2 border-[#38bdf8] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                En Curso
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-[#402d00] text-secondary border-2 border-[#e3aa00] shadow-sm">
                Disponible
              </span>
            )}
          </div>

          {description && (
            <p className="font-(--font-be-vietnam-pro) text-xs sm:text-sm md:text-base text-[#dae2fd] leading-relaxed max-w-2xl">
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
