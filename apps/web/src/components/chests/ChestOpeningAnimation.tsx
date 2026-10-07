"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { AnimatedChestBox } from "@/components/chests/AnimatedChestBox";
import { CoinsIcon, SparklesIcon, TrophyIcon } from "@/icons";
import type { ChestOpeningAnimationProps } from "@/types/chests";

const PARTICLE_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

export function ChestOpeningAnimation({
  isOpen,
  onClose,
  chest,
  coinsAmount,
  experiencePoints,
}: ChestOpeningAnimationProps) {
  const [phase, setPhase] = useState<"shake" | "burst" | "revealed">("shake");

  useEffect(() => {
    if (!isOpen) {
      setPhase("shake");
      return;
    }
    setPhase("shake");
    const burstTimer = setTimeout(() => setPhase("burst"), 800);
    const revealTimer = setTimeout(() => setPhase("revealed"), 1300);
    return () => {
      clearTimeout(burstTimer);
      clearTimeout(revealTimer);
    };
  }, [isOpen]);

  if (!isOpen || !chest) return null;

  const coins = coinsAmount ?? chest.coinsAmount ?? 0;
  const xp = experiencePoints ?? chest.experiencePoints ?? 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Fullscreen Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-surface-container-lowest/90 backdrop-blur-xl"
        />

        {/* Shockwave Radial Burst Effect */}
        {phase !== "shake" && (
          <motion.div
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute h-96 w-96 rounded-full bg-gradient-radial from-secondary/40 via-secondary/10 to-transparent pointer-events-none"
          />
        )}

        {/* 360 Explosion Particles */}
        {phase !== "shake" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {PARTICLE_ANGLES.map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const distance = 170 + ((angle / 30) % 3) * 45;
              return (
                <motion.div
                  key={`particle-${angle}`}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    x: Math.cos(rad) * distance,
                    y: Math.sin(rad) * distance,
                    scale: [0, 1.4, 0.8],
                    opacity: [1, 1, 0],
                    rotate: angle * 2,
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  <CoinsIcon className="w-6 h-6 text-secondary drop-shadow-[0_0_12px_rgba(255,198,64,0.8)]" />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Main Center Animation Content */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-sm w-full text-center">
          {/* Articulated 3D Chest with Opening Lid */}
          <div className="mb-4">
            <AnimatedChestBox
              isOpened={phase !== "shake"}
              isShaking={phase === "shake"}
            />
          </div>

          {/* Reward Details Revealed */}
          <AnimatePresence>
            {phase === "revealed" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full space-y-4"
              >
                <div>
                  <span className="inline-block rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary border border-secondary/30 mb-2">
                    ¡Cofre Abierto!
                  </span>
                  <h3 className="font-headline-lg text-2xl font-black text-on-surface">
                    {chest.title}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-surface-container-high/90 border border-secondary/40 p-4 shadow-xl">
                    <CoinsIcon className="w-6 h-6 text-secondary mx-auto mb-1" />
                    <p className="text-[11px] uppercase font-bold text-on-surface-variant">
                      Fichas
                    </p>
                    <p className="font-headline-lg-mobile text-xl font-extrabold text-secondary">
                      +{coins.toLocaleString("es-ES")}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-surface-container-high/90 border border-primary/40 p-4 shadow-xl">
                    <SparklesIcon className="w-6 h-6 text-primary mx-auto mb-1" />
                    <p className="text-[11px] uppercase font-bold text-on-surface-variant">
                      Experiencia
                    </p>
                    <p className="font-headline-lg-mobile text-xl font-extrabold text-primary">
                      +{xp.toLocaleString("es-ES")} XP
                    </p>
                  </div>

                  {chest.room && (
                    <div className="col-span-2 rounded-2xl bg-surface-container-high/90 border border-secondary/30 p-3 flex items-center justify-center gap-2">
                      <TrophyIcon className="w-5 h-5 text-secondary" />
                      <span className="text-xs font-bold text-on-surface">
                        Sala VIP: {chest.room.name} (+{chest.room.bonus}%)
                      </span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-secondary via-secondary-container to-secondary text-on-secondary font-headline-lg-mobile text-base font-extrabold shadow-xl glow-gold cursor-pointer"
                >
                  ¡Recoger Premio!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
}
