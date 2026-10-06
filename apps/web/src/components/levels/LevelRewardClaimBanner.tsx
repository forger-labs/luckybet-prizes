"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { BoltIcon, CoinsIcon, TrophyIcon } from "@/icons";
import type { LevelRewardClaimBannerProps } from "@/types/levelRewards";

export function LevelRewardClaimBanner({
  pendingCount,
  nextReward,
  nextLevelName,
  nextLevelImage,
  calculatedCoins,
  isClaiming,
  onClaim,
}: LevelRewardClaimBannerProps) {
  if (pendingCount <= 0 || !nextReward) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="relative overflow-hidden rounded-xl bg-surface-container-highest/80 border border-secondary/40 p-3.5 shadow-lg mt-3"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Level Icon / Avatar */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary-container/50 to-surface-container-high border border-secondary/50 flex items-center justify-center shrink-0 p-1 shadow-sm">
            {nextLevelImage ? (
              <Image
                src={nextLevelImage}
                alt={nextLevelName || "Nivel"}
                width={32}
                height={32}
                unoptimized
                className="w-full h-full object-contain"
              />
            ) : (
              <TrophyIcon className="w-5 h-5 text-secondary" />
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                {nextLevelName || `Nivel #${nextReward.levelId}`}
              </span>
              {pendingCount > 1 && (
                <span className="px-1.5 py-0.2 bg-secondary/20 border border-secondary/40 rounded-full text-[9px] font-extrabold text-secondary">
                  +{pendingCount} en cola
                </span>
              )}
            </div>

            <p className="text-xs font-black text-on-surface flex items-center gap-1 truncate">
              <CoinsIcon className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>+{calculatedCoins.toLocaleString("es-ES")} fichas</span>
            </p>
          </div>
        </div>

        {/* Claim Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onClaim}
          disabled={isClaiming}
          className="shrink-0 px-3.5 py-2 rounded-xl bg-gradient-to-r from-secondary via-secondary-container to-secondary text-on-secondary text-xs font-extrabold shadow-md glow-gold-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
        >
          <BoltIcon className="w-3.5 h-3.5 text-on-secondary" />
          <span>{isClaiming ? "Reclamando..." : "Reclamar"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
