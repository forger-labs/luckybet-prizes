"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ChestOpeningAnimation } from "@/components/chests/ChestOpeningAnimation";
import { ChestRewardModal } from "@/components/chests/ChestRewardModal";
import { usePlayerChests } from "@/hooks/usePlayerChests";
import {
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  CoinsIcon,
  GiftIcon,
  SparklesIcon,
} from "@/icons";
import type { FeaturedChestCardProps } from "@/types/chests";

const DEFAULT_CHEST_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCSC7oM947uIZvDHrVhv_MLm2W22WS_o2xWCxRC7byGghsKgL558BQAx6iagOuJcBi-L6qk9cHTG9-k97XcRwzDg_y6ZPsKLGG8CEZJXE8P_CjV5g6qOi7SIBukRc7--tXAs30I-v7s9yQMYGZWUHLf3Z97x39q-UejO_nKUgUF0MHECi3DwiPFLtayaqqfB8-9dyeWE4g1pSvygY-ZPLNFBTBi9ErUQgNXNR6scLU8D8n52ME2GyhmYuVuOfSD972Kod4TAORUe7KC";

export const FeaturedChestCard = ({
  className = "",
  defaultPeriod = "WEEKLY",
  onViewMissions,
}: FeaturedChestCardProps) => {
  const {
    selectedPeriod,
    setSelectedPeriod,
    activeChest,
    percentage,
    loading,
    isClaiming,
    timeLeft,
    claimChest,
    isRewardModalOpen,
    setIsRewardModalOpen,
    claimedResult,
  } = usePlayerChests(defaultPeriod);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (loading) {
    return (
      <div
        className={`rounded-2xl border border-secondary/20 bg-surface-container/60 p-6 animate-pulse min-h-[300px] ${className}`}
      >
        <div className="h-6 w-48 bg-surface-container-highest rounded-full mb-6" />
        <div className="h-8 w-64 bg-surface-container-highest rounded-lg mb-3" />
        <div className="h-4 w-80 bg-surface-container-highest rounded mb-4" />
        <div className="h-3 w-full max-w-xs bg-surface-container-highest rounded-full" />
      </div>
    );
  }

  const chest = activeChest?.chest;
  const state = activeChest?.state || "LOCKED";
  const completed = activeChest?.completedMissions ?? 0;
  const required = activeChest?.requiredMissions ?? 5;
  const isUnlocked = state === "UNLOCKED";
  const isClaimed = state === "CLAIMED";

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
        className={`relative overflow-hidden rounded-2xl border border-secondary/40 group shadow-2xl h-full flex flex-col justify-between min-h-[300px] ${className}`}
      >
        <Image
          alt={chest?.title || "Cofre"}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={chest?.imageUrl || DEFAULT_CHEST_BG}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/90 to-surface-container-lowest/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/95 via-transparent to-surface-container-lowest/40" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full">
          <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
            <div className="inline-flex p-0.5 rounded-xl bg-surface-container-lowest/80 border border-white/10 backdrop-blur-md">
              {(["WEEKLY", "MONTHLY"] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedPeriod === period
                      ? "bg-secondary text-on-secondary shadow-md glow-gold-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {period === "WEEKLY" ? "Semanal" : "Mensual"}
                </button>
              ))}
            </div>

            {timeLeft && (
              <div className="inline-flex items-center gap-1.5 bg-surface-container-highest/80 text-on-surface-variant border border-white/10 px-3 py-1 rounded-full text-xs font-medium">
                <ClockIcon className="w-3.5 h-3.5 text-primary" />
                <span>Termina en {timeLeft}</span>
              </div>
            )}
          </div>

          <div className="max-w-xl my-auto py-2">
            <div className="flex items-center gap-2 mb-1.5">
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                {chest?.title ||
                  (selectedPeriod === "WEEKLY"
                    ? "Cofre Semanal"
                    : "Cofre Mensual")}
              </h2>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="p-1.5 rounded-lg bg-surface-container-high/60 hover:bg-surface-container-highest text-secondary transition-colors cursor-pointer"
                title="Ver recompensas del cofre"
              >
                <GiftIcon className="w-4 h-4" />
              </button>
            </div>

            <p className="text-on-surface-variant font-body-md text-sm leading-relaxed line-clamp-2">
              {chest?.description ||
                (isUnlocked
                  ? "¡Has completado todas las misiones requeridas! Pulsa el botón para abrir tu cofre."
                  : `Completa ${Math.max(0, required - completed)} misiones más para desbloquear las recompensas.`)}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 max-w-xs h-2.5 bg-surface-container-high rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full glow-gold-sm"
                />
              </div>
              <span className="text-xs font-semibold text-on-surface">
                {completed} de {required} ({percentage}%)
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-secondary font-headline-lg-mobile text-lg sm:text-2xl font-bold flex items-center gap-1.5">
                <CoinsIcon className="w-5 h-5 text-secondary" />+
                {(chest?.coinsAmount ?? 0).toLocaleString("es-ES")}
              </span>
              <span className="text-primary text-xs font-semibold bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                <SparklesIcon className="w-3 h-3" />+
                {(chest?.experiencePoints ?? 0).toLocaleString("es-ES")} XP
              </span>
            </div>

            {isUnlocked ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => claimChest(chest?.id)}
                disabled={isClaiming}
                className="bg-secondary hover:bg-secondary-fixed text-on-secondary px-6 sm:px-8 py-2.5 rounded-xl font-title-md text-sm font-bold glow-gold cursor-pointer flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                <BoltIcon className="w-4 h-4 text-on-secondary" />
                {isClaiming ? "Abriendo..." : "¡Reclamar Cofre!"}
              </motion.button>
            ) : isClaimed ? (
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="bg-primary/20 hover:bg-primary/30 border border-primary/40 text-primary px-4 py-2 rounded-xl font-title-md text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <CheckCircleIcon className="w-4 h-4" />
                <span>Reclamado</span>
              </button>
            ) : onViewMissions ? (
              <button
                type="button"
                onClick={onViewMissions}
                className="bg-surface-container-high hover:bg-surface-bright text-on-surface px-5 py-2.5 rounded-xl font-title-md text-sm font-semibold transition-colors cursor-pointer"
              >
                Ver Misiones
              </button>
            ) : (
              <Link
                href="/dashboard/missions"
                className="bg-secondary/20 hover:bg-secondary/30 border border-secondary/40 text-secondary px-5 py-2.5 rounded-xl font-title-md text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                Ver Misiones
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      <ChestOpeningAnimation
        isOpen={isRewardModalOpen}
        onClose={() => setIsRewardModalOpen(false)}
        chest={chest || null}
        coinsAmount={claimedResult?.coinsAmount ?? chest?.coinsAmount}
        experiencePoints={chest?.experiencePoints}
      />

      {activeChest && (
        <ChestRewardModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          progress={activeChest}
        />
      )}
    </>
  );
};
