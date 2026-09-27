"use client";

import Image from "next/image";

import { Modal } from "@/components/ui/Modal";
import type { MissionPreviewModalProps } from "@/types/missions/MissionPreview";
import { MissionCountdown } from "./MissionCountdown";

export function MissionPreviewModal({
  open,
  onClose,
  mission,
}: MissionPreviewModalProps) {
  if (!mission) return null;

  const baseCoins = mission.tokenReward ?? 0;
  const bonusPercent = mission.room ? Number(mission.room.bonus) || 0 : 0;
  const totalCoins = Math.round(baseCoins + baseCoins * (bonusPercent / 100));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Vista Previa de la Misión"
      subtitle="Visualización de la tarjeta como se presenta al jugador final"
      icon="visibility"
      size="lg"
    >
      <div className="flex flex-col gap-6 py-2">
        <div className="relative flex flex-col justify-between rounded-3xl bg-surface-container border-2 border-primary/40 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_25px_rgba(56,189,248,0.2)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-90 z-20" />

          {/* Hero Banner Image */}
          {mission.coverImage ? (
            <div className="relative w-full h-48 sm:h-56 bg-surface-container-lowest overflow-hidden border-b border-outline-variant/30">
              <Image
                src={mission.coverImage}
                alt={mission.title}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-black/40" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-10">
                <span className="px-3.5 py-1.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg">
                  {mission.category}
                </span>
                {mission.status === "active" ? (
                  <MissionCountdown
                    expiresAt={mission.expiresAt}
                    activatedAt={mission.activatedAt}
                    type={mission.category}
                    className="backdrop-blur-md shadow-lg"
                  />
                ) : (
                  <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-surface-container-lowest/90 backdrop-blur-md text-on-surface border border-white/10 shadow-lg">
                    {mission.status === "inactive"
                      ? "Próximamente"
                      : mission.status}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 pb-0 flex items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-xl bg-surface-container-highest/80 border border-outline-variant/30 text-on-surface font-mono text-xs font-bold uppercase tracking-wider">
                {mission.category}
              </span>
              {mission.status === "active" ? (
                <MissionCountdown
                  expiresAt={mission.expiresAt}
                  activatedAt={mission.activatedAt}
                  type={mission.category}
                />
              ) : (
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-outline-variant/20 text-on-surface-variant border border-outline-variant/30">
                  {mission.status === "inactive"
                    ? "Próximamente"
                    : mission.status}
                </span>
              )}
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-7 pt-5">
            <div className="mb-5">
              <h3 className="font-(--font-plus-jakarta-sans) text-xl sm:text-2xl font-bold text-on-surface tracking-tight leading-snug">
                {mission.title}
              </h3>
              {mission.description && (
                <p className="text-body-md text-on-surface-variant text-sm mt-2 leading-relaxed">
                  {mission.description}
                </p>
              )}
            </div>

            {/* Rewards Pill Bar (Cálculo Total de Fichas) */}
            <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-surface-container-lowest/90 border border-outline-variant/25 mb-6">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary/15 border border-secondary/30 text-secondary shadow-[0_0_12px_rgba(255,198,64,0.2)]">
                <span className="material-symbols-outlined text-xl">token</span>
                <span className="font-(--font-plus-jakarta-sans) font-bold text-sm sm:text-base">
                  {totalCoins.toLocaleString()} Fichas
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary/15 border border-primary/30 text-primary">
                <span className="material-symbols-outlined text-xl">stars</span>
                <span className="font-(--font-plus-jakarta-sans) font-bold text-sm sm:text-base">
                  +{mission.xpReward.toLocaleString()} XP
                </span>
              </div>

              {mission.room && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-xs font-semibold">
                  <span className="material-symbols-outlined text-base text-primary">
                    meeting_room
                  </span>
                  <span>{mission.room.name}</span>
                </div>
              )}
            </div>

            {/* Verification Steps List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-bold text-on-surface uppercase tracking-wider">
                  Pasos para completar ({mission.steps?.length || 0})
                </span>
                <span className="text-xs text-outline font-mono">
                  0% Completado
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-surface-container-lowest border border-outline-variant/20 overflow-hidden">
                <div className="w-0 h-full bg-primary rounded-full shadow-[0_0_8px_#38bdf8]" />
              </div>

              <div className="space-y-2 mt-3">
                {(mission.steps ?? []).map((step, idx) => {
                  const cfg = step.targetConfig;
                  const isGp = step.verificationType === "GAME_PLAY";

                  return (
                    <div
                      key={step.id || idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest/70 border border-outline-variant/20 gap-2.5 text-sm"
                    >
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center font-bold text-xs text-primary shrink-0 mt-0.5 sm:mt-0">
                          {step.order}
                        </span>
                        <div className="min-w-0">
                          <span className="text-on-surface font-medium block truncate">
                            {step.title}
                          </span>
                          {isGp && cfg && (
                            <span className="text-[11px] text-primary font-mono block truncate">
                              {cfg.gameId
                                ? `Juego: ${cfg.gameId} · Min bet: $${cfg.minBet}`
                                : `Proveedor: ${cfg.provider} (${cfg.minUniqueGames || 1} juego(s)) · Min bet: $${cfg.minBet}`}
                            </span>
                          )}
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 self-start sm:self-auto ${
                          isGp
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "bg-surface-container text-outline"
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">
                          {isGp
                            ? "sports_esports"
                            : step.verificationType === "IMAGE"
                              ? "image"
                              : "notes"}
                        </span>
                        <span>
                          {isGp ? "GAME_PLAY" : step.verificationType}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Mock Button */}
            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-outline">
                Simulación de Interfaz del Jugador
              </span>
              <button
                type="button"
                disabled
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-secondary via-secondary to-secondary-container text-on-secondary shadow-[0_0_18px_rgba(255,198,64,0.25)] opacity-90 cursor-default"
              >
                Iniciar Misión
              </button>
            </div>
          </div>
        </div>

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

MissionPreviewModal.displayName = "MissionPreviewModal";
