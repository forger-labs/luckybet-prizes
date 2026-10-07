"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { BoltIcon, CoinsIcon, SparklesIcon, TrophyIcon } from "@/icons";
import type { LevelUpCelebrationModalProps } from "@/types/levelRewards";

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function LevelUpCelebrationModal({
  isOpen,
  onClose,
  celebrationData,
  hasMorePending,
  remainingCount,
  nextLevelName,
  onClaimNext,
  isClaimingNext = false,
}: LevelUpCelebrationModalProps) {
  if (!isOpen || !celebrationData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Fullscreen Backdrop WITHOUT blur filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#060e20]/95"
        />

        {/* Shockwave Radial Burst Effect */}
        <motion.div
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute h-96 w-96 rounded-full bg-radial from-secondary/30 via-secondary/10 to-transparent pointer-events-none"
        />

        {/* 360 Explosion Particles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {PARTICLE_ANGLES.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const distance = 160 + ((angle / 45) % 2) * 30;
            return (
              <motion.div
                key={`level-particle-${angle}`}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: Math.cos(rad) * distance,
                  y: Math.sin(rad) * distance,
                  scale: [0, 1.3, 0.7],
                  opacity: [1, 1, 0],
                  rotate: angle * 2,
                }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <CoinsIcon className="w-6 h-6 text-secondary drop-shadow-[0_0_12px_rgba(255,198,64,0.8)]" />
              </motion.div>
            );
          })}
        </div>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md bg-surface-container-low border border-secondary/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center"
        >
          {/* Jumping Logo / Badge */}
          <div className="relative mb-4 mt-2">
            {/* Pulsing ring around medal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -inset-3 rounded-full bg-gradient-to-r from-secondary/30 via-primary/20 to-secondary/30 blur-md pointer-events-none"
            />

            <motion.div
              initial={{ scale: 0, rotate: -25, y: 60 }}
              animate={{
                scale: [0, 1.35, 0.95, 1],
                rotate: [-25, 14, -4, 0],
                y: [60, -15, 0],
              }}
              transition={{
                duration: 0.75,
                times: [0, 0.55, 0.8, 1],
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-secondary-container/50 via-surface-container-high to-surface-container-highest border-2 border-secondary/60 flex items-center justify-center p-3 shadow-xl glow-gold"
            >
              {celebrationData.levelImage ? (
                <Image
                  src={celebrationData.levelImage}
                  alt={celebrationData.levelName}
                  width={112}
                  height={112}
                  unoptimized
                  priority
                  className="w-full h-full object-contain drop-shadow-md"
                />
              ) : (
                <TrophyIcon className="w-16 h-16 text-secondary drop-shadow-md" />
              )}
            </motion.div>
          </div>

          {/* Celebratory Copy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="space-y-1.5 mb-5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/30 text-xs font-bold uppercase tracking-wider mb-1">
              <SparklesIcon className="w-3.5 h-3.5 text-secondary" />
              <span>¡Felicidades!</span>
            </div>

            <h2 className="font-headline-lg text-2xl sm:text-3xl font-black text-on-surface tracking-tight">
              ¡Nuevo nivel alcanzado!
            </h2>

            <p className="font-body-md text-sm sm:text-base text-on-surface-variant">
              Has ascendido a{" "}
              <span className="font-bold text-secondary">
                {celebrationData.levelName}
              </span>
            </p>
          </motion.div>

          {/* Coins Awarded Card (Calculated with Bonus) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="w-full bg-surface-container-high/90 border border-secondary/40 rounded-2xl p-4 sm:p-5 shadow-lg mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <CoinsIcon className="w-6 h-6 text-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Fichas Ganadas
              </span>
            </div>
            <p className="font-headline-lg text-3xl sm:text-4xl font-black text-secondary tracking-tight">
              +{celebrationData.totalCoins.toLocaleString("es-ES")}
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="w-full space-y-2.5"
          >
            {hasMorePending && onClaimNext ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClaimNext}
                  disabled={isClaimingNext}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-secondary via-secondary-container to-secondary text-on-secondary font-headline-lg-mobile text-sm sm:text-base font-extrabold shadow-xl glow-gold cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <BoltIcon className="w-4 h-4 text-on-secondary" />
                  <span>
                    {isClaimingNext
                      ? "Reclamando..."
                      : `¡Reclamar ${nextLevelName || "Siguiente Nivel"} (${remainingCount} restante${remainingCount > 1 ? "s" : ""})!`}
                  </span>
                </motion.button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-semibold text-on-surface-variant/80 hover:text-on-surface transition-colors cursor-pointer"
                >
                  Reclamar después
                </button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-secondary via-secondary-container to-secondary text-on-secondary font-headline-lg-mobile text-sm sm:text-base font-extrabold shadow-xl glow-gold cursor-pointer"
              >
                ¡Excelente!
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
