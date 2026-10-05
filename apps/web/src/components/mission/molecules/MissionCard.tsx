"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import type { Mission } from "@shared/types/mission";

import type { ClientMission, MissionItem } from "@/types/missions";
import { MissionActionButton } from "../atoms/MissionActionButton";
import { MissionCountdown } from "../atoms/MissionCountdown";
import { MissionIcon } from "../atoms/MissionIcon";
import { MissionRewardPills } from "../atoms/MissionRewardPills";
import { MissionStatus } from "../atoms/MissionStatus";
import { MissionStepPills } from "../atoms/MissionStepPills";

interface Props {
  mission: ClientMission | MissionItem | Mission;
  onStart?: (missionId: number) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  daily: "Diaria",
  weekly: "Semanal",
  fixed: "Permanente",
  special: "Especial",
};

export const MissionCard = ({ mission, onStart }: Props) => {
  const isClientMission = "coinsAmount" in mission;

  const id = mission.id;
  const title = mission.title;
  const description = mission.description;
  const category = "category" in mission ? mission.category : "daily";
  const categoryLabel = CATEGORY_LABELS[category] || category;

  const completed = isClientMission
    ? mission.userMissionStatus === "COMPLETED"
    : Boolean(mission.completed);

  const isJoined = isClientMission ? mission.isJoined : false;

  const progressPercent = isClientMission
    ? mission.progressPercent
    : (mission.progress ?? 0);

  const totalCoins = isClientMission
    ? mission.totalCoins
    : "rewardCoins" in mission
      ? (mission.rewardCoins ?? 0)
      : 0;

  const xpReward = isClientMission
    ? mission.experiencePoints
    : "rewardXp" in mission
      ? (mission.rewardXp ?? 0)
      : 0;

  const roomBonus =
    isClientMission && mission.room ? Number(mission.room.bonus) || 0 : 0;

  const coverImage = isClientMission
    ? mission.imageUrl
    : "href" in mission
      ? undefined
      : undefined;

  const steps = isClientMission ? mission.steps : [];
  const href = `/dashboard/missions/${id}`;

  const handleActionClick = (e?: React.MouseEvent) => {
    if (!completed && !isJoined && isClientMission && onStart) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      onStart(Number(id));
    }
  };

  const cardInner = (
    <motion.div
      whileHover={{ y: completed ? 0 : -4 }}
      transition={{ duration: 0.15 }}
      className={`relative h-full flex flex-col justify-between rounded-2xl border-2 transition-all duration-200 overflow-hidden select-none ${
        completed
          ? "bg-[#131b2e] border-[#10b981]/30 opacity-80 shadow-md"
          : isJoined
            ? "bg-[#171f33] border-[#38bdf8]/50 shadow-[0_6px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(56,189,248,0.15)] hover:border-[#8ed5ff]"
            : "bg-[#171f33] border-[#2d3449] hover:border-[#8ed5ff]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(56,189,248,0.2)]"
      }`}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38bdf8] via-[#ffc640] to-[#38bdf8] opacity-80 z-20" />

      {/* Top Header / Cover Image Banner */}
      <div>
        {coverImage ? (
          <div className="relative w-full h-36 sm:h-40 bg-[#060e20] overflow-hidden border-b border-[#2d3449]/40">
            <Image
              src={coverImage}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-black/20 to-black/50" />
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
              <span className="px-2.5 py-1 rounded-lg bg-[#060e20]/90 border border-white/20 text-white font-mono text-[11px] font-black uppercase tracking-wider shadow-md">
                {categoryLabel}
              </span>
              {isClientMission && (
                <MissionCountdown
                  expiresAt={mission.expiresAt}
                  activatedAt={mission.activatedAt}
                  type={category}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 pb-0 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <MissionIcon
                icon={
                  isClientMission
                    ? "flag"
                    : (mission as MissionItem).icon || "flag"
                }
                color={
                  isClientMission
                    ? "#38bdf8"
                    : (mission as MissionItem).color || "#38bdf8"
                }
                size="md"
              />
              <span className="px-2.5 py-1 rounded-lg bg-[#222a3d] border border-[#3e484f]/40 text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider">
                {categoryLabel}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              {isClientMission && (
                <MissionCountdown
                  expiresAt={mission.expiresAt}
                  activatedAt={mission.activatedAt}
                  type={category}
                />
              )}
              <MissionStatus completed={completed} />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 pt-4">
          <h3
            className={`font-(--font-plus-jakarta-sans) text-base sm:text-lg font-bold mb-1.5 tracking-tight leading-snug line-clamp-1 ${
              completed
                ? "text-[#87929a] line-through"
                : "text-[#dae2fd] group-hover:text-[#8ed5ff] transition-colors"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p className="text-[#bdc8d1] font-(--font-be-vietnam-pro) text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Reward Pills */}
          <div className="mb-4">
            <MissionRewardPills
              coins={totalCoins}
              xp={xpReward}
              bonusPercent={roomBonus}
              size="sm"
            />
          </div>

          {/* Steps Overview & Progress Bar */}
          {steps && steps.length > 0 && (
            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#87929a] uppercase tracking-wider">
                  Objetivos ({steps.length})
                </span>
                <span className="text-[#8ed5ff] font-mono">
                  {progressPercent}%
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#060e20] border border-[#3e484f]/30 overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]"
                />
              </div>

              <MissionStepPills steps={steps} maxVisible={2} />
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between p-5 sm:p-6 pt-3 border-t border-[#2d3449]/70 bg-[#131b2e]/40">
        <span className="text-xs font-bold text-[#87929a]">
          {completed
            ? "Misión completada"
            : isJoined
              ? "En progreso"
              : "Disponible"}
        </span>

        <MissionActionButton
          completed={completed}
          label={completed ? "Completada" : isJoined ? "Continuar" : "Comenzar"}
          onClick={handleActionClick}
        />
      </div>
    </motion.div>
  );

  return (
    <Link href={href} className="block h-full cursor-pointer group">
      {cardInner}
    </Link>
  );
};
