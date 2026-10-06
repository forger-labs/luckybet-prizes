"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { CoinsIcon, GiftIcon, SparklesIcon, TrophyIcon } from "@/icons";
import type { ChestRewardModalProps } from "@/types/chests";

export function ChestRewardModal({
  isOpen,
  onClose,
  progress,
  onClaim,
  isClaiming = false,
}: ChestRewardModalProps) {
  if (!isOpen || !progress) return null;

  const { chest, state, completedMissions, requiredMissions } = progress;
  const isUnlocked = state === "UNLOCKED";
  const isClaimed = state === "CLAIMED";
  const isLocked = state === "LOCKED";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-surface-container p-6 shadow-2xl"
        >
          <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary border border-secondary/30">
                {chest.periodType === "WEEKLY" ? "Semanal" : chest.periodType}
              </span>
              {isClaimed && (
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary border border-primary/30">
                  Reclamado
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface transition-colors p-1 cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>

          <div className="mx-auto my-3 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/30 via-secondary-container/20 to-surface-container-high border border-secondary/40 shadow-xl glow-gold-sm">
            {chest.imageUrl ? (
              <Image
                src={chest.imageUrl}
                alt={chest.title}
                width={80}
                height={80}
                unoptimized
                className="h-20 w-20 object-contain drop-shadow-lg"
              />
            ) : (
              <GiftIcon className="h-12 w-12 text-secondary" />
            )}
          </div>

          <div className="text-center space-y-1 mb-5">
            <h3 className="font-title-md text-xl font-bold text-on-surface">
              {chest.title}
            </h3>
            {chest.description && (
              <p className="font-body-md text-xs text-on-surface-variant max-w-xs mx-auto">
                {chest.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest/80 border border-white/5 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                <CoinsIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-on-surface-variant">
                  Fichas
                </p>
                <p className="font-title-md text-sm font-bold text-secondary">
                  +{chest.coinsAmount.toLocaleString("es-ES")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest/80 border border-white/5 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <SparklesIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-on-surface-variant">
                  Experiencia
                </p>
                <p className="font-title-md text-sm font-bold text-primary">
                  +{chest.experiencePoints.toLocaleString("es-ES")} XP
                </p>
              </div>
            </div>

            {chest.room && (
              <div className="col-span-2 flex items-center gap-3 rounded-xl bg-surface-container-lowest/80 border border-secondary/20 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/20 text-secondary">
                  <TrophyIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-secondary">
                    Sala Exclusiva: {chest.room.name}
                  </p>
                  <p className="font-title-md text-xs font-semibold text-on-surface">
                    Bonus especial del {chest.room.bonus}% en recompensas
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5 mb-5 rounded-xl bg-surface-container-high/50 p-3 border border-white/5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-on-surface-variant">
                Misiones requeridas
              </span>
              <span className="text-on-surface">
                {completedMissions} / {requiredMissions}
              </span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full"
                style={{
                  width: `${Math.min(100, (completedMissions / (requiredMissions || 1)) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-2 flex gap-3">
            {isUnlocked && onClaim && (
              <button
                type="button"
                onClick={onClaim}
                disabled={isClaiming}
                className="flex-1 rounded-xl bg-gradient-to-r from-secondary via-secondary-container to-secondary py-3 text-center text-sm font-bold text-on-secondary shadow-lg glow-gold-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isClaiming ? "Reclamando..." : "¡Reclamar Recompensa!"}
              </button>
            )}

            {isLocked && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-surface-container-high hover:bg-surface-bright py-3 text-center text-sm font-semibold text-on-surface transition-colors cursor-pointer"
              >
                Entendido
              </button>
            )}

            {isClaimed && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 py-3 text-center text-sm font-semibold text-primary transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
