"use client";

import Image from "next/image";

import { Modal } from "@/components/ui/Modal";
import type { ChestPreviewModalProps } from "@/types/adminChests";

export function ChestPreviewModal({
  open,
  onClose,
  chest,
}: ChestPreviewModalProps) {
  if (!chest) return null;

  const baseCoins = chest.coinsAmount ?? 0;
  const bonusPercent = chest.room ? Number(chest.room.bonus) || 0 : 0;
  const totalCoins = Math.round(baseCoins + baseCoins * (bonusPercent / 100));
  const isWeekly = chest.periodType === "WEEKLY";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Vista Previa del Cofre"
      subtitle="Visualización de la tarjeta destacada como se presenta al jugador"
      icon="visibility"
      size="xl"
    >
      <div className="flex flex-col gap-6 py-2">
        {/* ── Featured Mission Style Chest Card (Cinematic 16:9 Multi-layered) ── */}
        <div className="relative overflow-hidden rounded-3xl border border-secondary/40 shadow-2xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between group">
          {/* Background Image with Cinematic Grade */}
          {chest.imageUrl ? (
            <Image
              src={chest.imageUrl}
              alt={chest.title}
              fill
              priority
              unoptimized
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-surface-container-lowest via-surface-container to-surface-container-high" />
          )}

          {/* Multi-layered Gradient Overlay for Supreme Contrast & Depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/90 to-surface-container-lowest/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/50" />

          {/* Ambient Glow Accent */}
          <div className="absolute top-0 right-1/4 w-56 h-56 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[440px]">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <div className="inline-flex items-center gap-1.5 bg-secondary/20 text-secondary border border-secondary/50 px-3.5 py-1 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-sm text-secondary">
                  bolt
                </span>
                <span className="font-label-sm text-xs uppercase tracking-wider font-bold">
                  {isWeekly ? "Cofre Semanal" : "Cofre Mensual"}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 bg-surface-container-highest/80 text-on-surface-variant border border-white/10 px-3.5 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                <span className="material-symbols-outlined text-sm text-primary">
                  checklist
                </span>
                <span>Meta: {chest.requiredMissions} misiones</span>
              </div>
            </div>

            {/* Title, Description & Progress Indicator */}
            <div className="max-w-xl my-auto py-2">
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface mb-2 tracking-tight">
                {chest.title}
              </h2>

              {chest.description ? (
                <p className="text-on-surface-variant font-body-md text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {chest.description}
                </p>
              ) : (
                <p className="text-on-surface-variant font-body-md text-sm sm:text-base leading-relaxed">
                  Completa las misiones requeridas durante el periodo actual
                  para desbloquear este cofre de recompensas exclusivas.
                </p>
              )}

              {/* Progress Bar with Golden Glow */}
              <div className="mt-5 flex items-center gap-3.5">
                <div className="flex-1 max-w-xs h-2.5 bg-surface-container-high rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div className="h-full bg-secondary rounded-full shadow-[0_0_10px_#ffc640] w-1/3" />
                </div>
                <span className="text-xs font-semibold text-on-surface-variant">
                  0 de {chest.requiredMissions} completadas
                </span>
              </div>
            </div>

            {/* Footer: Rewards & CTA Button */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-on-surface-variant text-[11px] uppercase tracking-wider font-semibold">
                    Recompensa Total
                  </span>
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <span className="text-secondary font-headline-lg-mobile text-xl sm:text-2xl font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-2xl text-secondary">
                        token
                      </span>
                      <span>{totalCoins.toLocaleString()} Fichas</span>
                    </span>

                    <span className="text-primary text-xs font-semibold bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        stars
                      </span>
                      <span>+{chest.experiencePoints.toLocaleString()} XP</span>
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="bg-secondary text-on-secondary px-6 sm:px-8 py-3 rounded-xl font-title-md text-sm sm:text-base font-bold shadow-[0_0_20px_rgba(255,198,64,0.3)] opacity-95 cursor-default flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">
                  inventory_2
                </span>
                <span>Abrir Cofre</span>
              </button>
            </div>
          </div>
        </div>

        {/* Close Modal Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Cerrar Vista Previa
          </button>
        </div>
      </div>
    </Modal>
  );
}

ChestPreviewModal.displayName = "ChestPreviewModal";
