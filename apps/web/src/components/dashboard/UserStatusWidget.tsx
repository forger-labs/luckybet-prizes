"use client";

import { motion } from "framer-motion";

import { FlameIcon, SparklesIcon, TrophyIcon } from "@/icons";
import type { UserRankStatus } from "@/types/dashboard";

const STATUS_DATA: UserRankStatus = {
  currentTier: "Elite I",
  nextTier: "Elite II",
  currentXp: 8450,
  targetXp: 10000,
  streakDays: 5,
  multiplier: "1.5x",
};

export const UserStatusWidget = () => {
  const xpPercentage = (STATUS_DATA.currentXp / STATUS_DATA.targetXp) * 100;
  const remainingXp = STATUS_DATA.targetXp - STATUS_DATA.currentXp;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="glass-card-strong rounded-2xl p-6 flex flex-col justify-between border border-white/10 relative overflow-hidden h-full shadow-xl"
    >
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header with Rank & Badge */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-on-surface-variant font-label-sm uppercase tracking-wider text-xs">
                Nivel Actual
              </span>
              <span className="inline-flex items-center gap-1 bg-secondary/15 text-secondary border border-secondary/30 px-2 py-0.5 rounded-full text-[11px] font-semibold">
                <SparklesIcon className="w-3 h-3 text-secondary" />
                VIP
              </span>
            </div>
            <p className="font-headline-lg-mobile text-2xl font-bold text-secondary tracking-tight">
              {STATUS_DATA.currentTier}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-container to-secondary/40 border border-secondary/40 flex items-center justify-center glow-gold-sm shadow-md cursor-default"
          >
            <TrophyIcon className="w-6 h-6 text-on-secondary-container" />
          </motion.div>
        </div>

        {/* Perks & Streak Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-surface-container-high/60 border border-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-secondary/20 text-secondary">
              <FlameIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant uppercase font-medium">
                Racha
              </p>
              <p className="text-xs font-semibold text-on-surface">
                {STATUS_DATA.streakDays} días
              </p>
            </div>
          </div>

          <div className="bg-surface-container-high/60 border border-white/5 rounded-lg p-2.5 flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-primary/20 text-primary">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-on-surface-variant uppercase font-medium">
                Bonus XP
              </p>
              <p className="text-xs font-semibold text-primary">
                {STATUS_DATA.multiplier}
              </p>
            </div>
          </div>
        </div>

        {/* Animated XP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-on-surface-variant">Progreso de XP</span>
            <span className="text-primary font-semibold">
              {STATUS_DATA.currentXp.toLocaleString("es-ES")} /{" "}
              {STATUS_DATA.targetXp.toLocaleString("es-ES")} XP
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
            <span className="text-secondary font-medium">
              {STATUS_DATA.nextTier}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
        <span className="text-xs text-on-surface-variant">
          Próxima recompensa:{" "}
          <strong className="text-secondary">+2.000 Fichas</strong>
        </span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          className="bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          Ver Recompensas
        </motion.button>
      </div>
    </motion.section>
  );
};
