"use client";

import { motion } from "framer-motion";

import { GiftIcon } from "@/icons";

export const WeeklyBonus = () => {
  const currentProgress = 15;
  const targetProgress = 25;
  const percentage = (currentProgress / targetProgress) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="md:col-span-1 space-y-3 mb-stack-md md:mb-0 w-full"
    >
      <div className="relative overflow-hidden glass-card-strong rounded-2xl p-5 border border-secondary/40 shadow-xl">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-secondary bg-secondary/15 border border-secondary/30 px-2 py-0.5 rounded-full">
                Temporada 1
              </span>
              <span className="text-[11px] text-primary font-medium">
                Termina en 2d 4h
              </span>
            </div>
            <h3 className="font-title-md text-base sm:text-lg text-on-surface font-bold">
              Cofre Semanal Legendario
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant max-w-xs">
              Completa 10 misiones más para desbloquear 5.000 Fichas.
            </p>
          </div>

          <div className="w-11 h-11 bg-gradient-to-br from-secondary to-secondary-container rounded-xl flex items-center justify-center glow-gold-sm shrink-0 shadow-md">
            <GiftIcon className="w-6 h-6 text-on-secondary-container" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between font-label-sm text-xs">
            <span className="text-on-surface font-semibold">
              Progreso: {currentProgress}/{targetProgress}
            </span>
            <span className="text-secondary font-bold">{percentage}%</span>
          </div>

          <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full glow-gold-sm"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
