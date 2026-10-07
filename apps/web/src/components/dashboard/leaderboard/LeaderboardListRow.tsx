"use client";

import { motion } from "framer-motion";

import { CoinsIcon } from "@/icons";
import type { LeaderboardUser } from "@/types/leaderboard";

interface LeaderboardListRowProps {
  user: LeaderboardUser;
  index: number;
}

export const LeaderboardListRow = ({
  user,
  index,
}: LeaderboardListRowProps) => {
  const initialLetter = user.username.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: 0.3 + index * 0.05 }}
      className="flex items-center justify-between p-3 rounded-xl bg-surface-container/60 hover:bg-surface-container-high/70 border border-outline-variant/20 transition-all duration-200"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Position chip */}
        <span className="w-6 h-6 rounded-lg bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center font-bold text-xs text-on-surface-variant shrink-0">
          #{user.rank}
        </span>

        {/* Avatar mini */}
        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-xs text-on-surface ring-1 ring-outline-variant/30 shrink-0">
          {initialLetter}
        </div>

        {/* Username & breakdown */}
        <div className="min-w-0">
          <p
            className="font-semibold text-xs sm:text-sm text-on-surface truncate"
            title={user.username}
          >
            {user.username}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/80 truncate">
            <span>🎯 {user.missionsCoins.toLocaleString()} misiones</span>
            <span>•</span>
            <span>🎁 {user.chestsCoins.toLocaleString()} cofres</span>
          </div>
        </div>
      </div>

      {/* Total Coins */}
      <div className="flex items-center gap-1.5 shrink-0 pl-2">
        <CoinsIcon className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="font-bold text-xs sm:text-sm text-primary">
          {user.totalCoins.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};
