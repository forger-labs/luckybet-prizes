"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { LevelRewardClaimBanner } from "@/components/levels/LevelRewardClaimBanner";
import { SparklesIcon, TrophyIcon } from "@/icons";
import type { UserRankStatus } from "@/types/dashboard";
import type { PlayerLevelReward } from "@/types/levelRewards";

const DEFAULT_STATUS_DATA: UserRankStatus = {
  currentTier: "Principiante",
  nextTier: "Bronce",
  currentXp: 0,
  targetXp: 1000,
  streakDays: 1,
  multiplier: "1.0x",
};

interface UserStatusWidgetProps {
  status?: UserRankStatus;
  isLoading?: boolean;
  pendingRewardCount?: number;
  nextReward?: PlayerLevelReward | null;
  nextLevelName?: string;
  nextLevelImage?: string | null;
  calculatedCoinsForNext?: number;
  isClaimingReward?: boolean;
  onClaimReward?: () => void;
}

export const UserStatusWidget = ({
  status = DEFAULT_STATUS_DATA,
  isLoading = false,
  pendingRewardCount = 0,
  nextReward = null,
  nextLevelName,
  nextLevelImage,
  calculatedCoinsForNext = 0,
  isClaimingReward = false,
  onClaimReward,
}: UserStatusWidgetProps) => {
  if (isLoading) {
    return (
      <div className="glass-card-strong rounded-2xl p-6 border border-white/10 h-full animate-pulse flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-surface-container-high rounded" />
          <div className="h-8 w-40 bg-surface-container-high rounded" />
        </div>
        <div className="h-2 w-full bg-surface-container-highest rounded-full" />
      </div>
    );
  }

  const currentXp = status.currentXp ?? 0;
  const targetXp = status.targetXp > 0 ? status.targetXp : 1000;
  const xpPercentage = Math.min(100, Math.max(0, (currentXp / targetXp) * 100));
  const remainingXp = Math.max(0, targetXp - currentXp);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="glass-card-strong rounded-2xl p-6 flex flex-col justify-between border border-white/10 relative overflow-hidden h-fit shadow-xl"
    >
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Rank & Badge / Medal */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-on-surface-variant font-label-sm uppercase tracking-wider text-xs">
                Nivel Actual
              </span>
              <span className="inline-flex items-center gap-1 bg-secondary/15 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                <SparklesIcon className="w-3 h-3 text-secondary" />
                {status.currentTier}
              </span>
            </div>
            <p className="font-headline-lg-mobile text-2xl font-bold text-secondary tracking-tight">
              {status.currentTier}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            className="w-13 h-13 rounded-2xl bg-gradient-to-br from-secondary-container/40 to-secondary/20 border border-secondary/40 flex items-center justify-center glow-gold-sm shadow-md cursor-default overflow-hidden p-1.5"
          >
            {status.currentLevelImage ? (
              <Image
                src={status.currentLevelImage}
                alt={`Medalla ${status.currentTier}`}
                width={48}
                height={48}
                unoptimized
                className="w-full h-full object-contain"
              />
            ) : (
              <TrophyIcon className="w-7 h-7 text-secondary" />
            )}
          </motion.div>
        </div>

        {/* Animated XP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-on-surface-variant">
              Progreso de Experiencia
            </span>
            <span className="text-primary font-semibold">
              {currentXp.toLocaleString("es-ES")} /{" "}
              {targetXp.toLocaleString("es-ES")} XP
            </span>
          </div>

          <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpPercentage}%` }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-primary via-primary-container to-secondary rounded-full glow-primary-sm"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-on-surface-variant/70">
            <span>
              Faltan {remainingXp.toLocaleString("es-ES")} XP para el siguiente
              nivel
            </span>
            <span className="text-secondary font-medium flex items-center gap-1">
              {status.nextLevelImage && (
                <Image
                  src={status.nextLevelImage}
                  alt={status.nextTier}
                  width={14}
                  height={14}
                  unoptimized
                  className="w-3.5 h-3.5 object-contain"
                />
              )}
              {status.nextTier}
            </span>
          </div>
        </div>

        {/* Claim Pending Level Reward Banner */}
        {pendingRewardCount > 0 && nextReward && onClaimReward && (
          <LevelRewardClaimBanner
            pendingCount={pendingRewardCount}
            nextReward={nextReward}
            nextLevelName={nextLevelName}
            nextLevelImage={nextLevelImage}
            calculatedCoins={calculatedCoinsForNext}
            isClaiming={isClaimingReward}
            onClaim={onClaimReward}
          />
        )}
      </div>
    </motion.section>
  );
};
