"use client";

import { motion } from "framer-motion";

import { CoinsIcon, TrophyIcon } from "@/icons";
import type { MissionStatsSummary } from "@/types/missions";

interface Props {
  stats: MissionStatsSummary;
}

export const MissionStatsBar = ({ stats }: Props) => {
  const { claimableCoins, completedCount, totalCount } = stats;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      {/* 1. Claimable Coins */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-[#171f33] border-2 border-[#ffc640]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(255,198,64,0.15)] group hover:border-[#ffc640] transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#ffc640] text-[#402d00] flex items-center justify-center shrink-0 shadow-md">
            <CoinsIcon className="w-6 h-6 text-[#402d00]" />
          </div>
          <div>
            <p className="text-[11px] font-black text-[#ffdf9f] uppercase tracking-wider">
              Fichas Reclamables
            </p>
            <p className="font-(--font-plus-jakarta-sans) text-xl sm:text-2xl font-black text-[#ffc640] tracking-tight">
              +{claimableCoins.toLocaleString("es-ES")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 2. Completed Missions & Progress */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-[#171f33] border-2 border-[#38bdf8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(56,189,248,0.15)] group hover:border-[#38bdf8] transition-all"
      >
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#38bdf8] text-[#00354a] flex items-center justify-center shrink-0 shadow-md">
            <TrophyIcon className="w-6 h-6 text-[#00354a]" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-black text-[#c4e7ff] uppercase tracking-wider">
              Misiones Completadas
            </p>
            <div className="flex items-baseline justify-between">
              <span className="font-(--font-plus-jakarta-sans) text-xl sm:text-2xl font-black text-white tracking-tight">
                {completedCount}{" "}
                <span className="text-xs text-[#87929a] font-bold">
                  / {totalCount}
                </span>
              </span>
              <span className="text-xs font-black text-[#8ed5ff]">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#0b1326] h-2 rounded-full overflow-hidden border border-white/10 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#38bdf8] h-full rounded-full shadow-[0_0_8px_#38bdf8]"
          />
        </div>
      </motion.div>

      {/* 3. XP Multiplier */}
      {/*<motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-[#171f33] border-2 border-[#a3abff]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(163,171,255,0.15)] group hover:border-[#a3abff] transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#a3abff] text-[#131e8c] flex items-center justify-center shrink-0 shadow-md">
            <FlameIcon className="w-6 h-6 text-[#131e8c]" />
          </div>
          <div>
            <p className="text-[11px] font-black text-[#e0e0ff] uppercase tracking-wider">
              Multiplicador XP
            </p>
            <div className="flex items-center gap-2">
              <span className="font-(--font-plus-jakarta-sans) text-xl sm:text-2xl font-black text-[#c5c9ff] tracking-tight">
                {xpMultiplier}
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#c5c9ff] text-[#131e8c] shadow-sm">
                ACTIVO
              </span>
            </div>
          </div>
        </div>
      </motion.div>*/}
    </div>
  );
};
