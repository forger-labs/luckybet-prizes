"use client";

import { motion } from "framer-motion";

import { CoinsIcon, TrophyIcon } from "@/icons";
import type { LeaderboardUser } from "@/types/leaderboard";

interface LeaderboardPodiumStepProps {
  user?: LeaderboardUser;
  rank: 1 | 2 | 3;
}

const RANK_CONFIGS = {
  1: {
    heightClass: "h-44 sm:h-48",
    bgClass:
      "bg-gradient-to-t from-surface-container-high/90 via-surface-container to-secondary/15 border-secondary/40 shadow-[0_0_24px_rgba(255,198,64,0.12)]",
    badgeBg: "bg-gradient-to-r from-secondary to-[#f9bd22] text-on-secondary",
    avatarRing: "ring-2 ring-secondary shadow-[0_0_12px_rgba(255,198,64,0.3)]",
    labelColor: "text-secondary",
    iconColor: "text-secondary",
    order: "order-2",
  },
  2: {
    heightClass: "h-36 sm:h-40",
    bgClass:
      "bg-gradient-to-t from-surface-container-high/70 via-surface-container to-primary/10 border-primary/30 shadow-[0_0_16px_rgba(56,189,248,0.08)]",
    badgeBg: "bg-primary text-on-primary",
    avatarRing: "ring-2 ring-primary/80 shadow-[0_0_10px_rgba(56,189,248,0.2)]",
    labelColor: "text-primary",
    iconColor: "text-primary",
    order: "order-1",
  },
  3: {
    heightClass: "h-32 sm:h-36",
    bgClass:
      "bg-gradient-to-t from-surface-container-high/60 via-surface-container to-[#d97706]/10 border-[#d97706]/30 shadow-[0_0_14px_rgba(217,119,6,0.06)]",
    badgeBg: "bg-[#d97706] text-white",
    avatarRing: "ring-2 ring-[#d97706]/70 shadow-[0_0_8px_rgba(217,119,6,0.2)]",
    labelColor: "text-[#fbbf24]",
    iconColor: "text-[#fbbf24]",
    order: "order-3",
  },
};

export const LeaderboardPodiumStep = ({
  user,
  rank,
}: LeaderboardPodiumStepProps) => {
  const config = RANK_CONFIGS[rank];

  if (!user) {
    return (
      <div
        className={`flex-1 flex flex-col items-center justify-end ${config.order}`}
      >
        <div className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/20 mb-2 opacity-40 flex items-center justify-center text-on-surface-variant font-bold">
          {rank}
        </div>
        <div
          className={`w-full ${config.heightClass} rounded-t-2xl bg-surface-container-low border border-dashed border-outline-variant/20 flex flex-col items-center justify-center p-3 text-center opacity-40`}
        >
          <span className="text-xs text-on-surface-variant">
            Sin clasificar
          </span>
        </div>
      </div>
    );
  }

  const initialLetter = user.username.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: rank === 1 ? 0.05 : rank === 2 ? 0.15 : 0.25,
      }}
      className={`flex-1 flex flex-col items-center justify-end ${config.order} min-w-0`}
    >
      {/* ── Avatar & Crown/Rank Badge ── */}
      <div className="relative mb-2 flex flex-col items-center">
        {rank === 1 && (
          <div className="absolute -top-5 text-secondary animate-bounce">
            <TrophyIcon className="w-5 h-5" />
          </div>
        )}

        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-base sm:text-lg text-on-surface ${config.avatarRing}`}
        >
          {initialLetter}
        </div>

        <div
          className={`absolute -bottom-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${config.badgeBg}`}
        >
          #{rank}
        </div>
      </div>

      {/* ── Podium Block ── */}
      <div
        className={`w-full ${config.heightClass} rounded-t-2xl border-t border-x ${config.bgClass} flex flex-col items-center justify-between p-3 text-center transition-all duration-300 hover:brightness-105`}
      >
        <div className="w-full">
          <p
            className="font-bold text-xs sm:text-sm text-on-surface truncate px-1"
            title={user.username}
          >
            {user.username}
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <CoinsIcon className={`w-3.5 h-3.5 ${config.iconColor} shrink-0`} />
            <span
              className={`font-black text-xs sm:text-sm ${config.labelColor}`}
            >
              {user.totalCoins.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Micro Breakdown Pill */}
        <div className="w-full pt-1.5 border-t border-outline-variant/15 flex items-center justify-center gap-2 text-[10px] text-on-surface-variant/80">
          <span title="Fichas de Misiones">
            🎯 {user.missionsCoins.toLocaleString()}
          </span>
          <span title="Fichas de Cofres">
            🎁 {user.chestsCoins.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
