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
            <div className="relative w-full h-44 sm:h-52 bg-surface-container-lowest overflow-hidden border-b border-outline-variant/30">
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

            {/* Rewards Pill Bar (Fichas Totales + XP) */}
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
            </div>

            {/* Verification Steps List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-bold text-on-surface uppercase tracking-wider">
                  Objetivos de la Misión ({mission.steps?.length || 0})
                </span>
                <span className="text-xs text-outline font-mono">
                  0% Completado
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-surface-container-lowest border border-outline-variant/20 overflow-hidden">
                <div className="w-0 h-full bg-primary rounded-full shadow-[0_0_8px_#38bdf8]" />
              </div>

              <div className="space-y-3 mt-4">
                {(mission.steps ?? []).map((step, idx) => {
                  const cfg = step.targetConfig;
                  const isGp = step.verificationType === "GAME_PLAY";
                  const isImage = step.verificationType === "IMAGE";
                  const stepNumber = idx + 1;

                  return (
                    <div
                      key={step.id || stepNumber}
                      className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/20 flex flex-col gap-3 transition-all"
                    >
                      {/* Step Header */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-(--font-plus-jakarta-sans) font-bold text-on-surface text-sm">
                          Paso {stepNumber}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg shrink-0 ${
                            isGp
                              ? "bg-primary/15 text-primary border border-primary/30"
                              : isImage
                                ? "bg-secondary/15 text-secondary border border-secondary/30"
                                : "bg-tertiary/15 text-tertiary border border-tertiary/30"
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {isGp
                              ? "sports_esports"
                              : isImage
                                ? "image"
                                : "edit_note"}
                          </span>
                          <span>
                            {isGp
                              ? "Juego LuckyBet"
                              : isImage
                                ? "Captura"
                                : "Texto"}
                          </span>
                        </span>
                      </div>

                      {/* Step Content / Descripción orientativa */}
                      {step.title && (
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {step.title}
                        </p>
                      )}

                      {/* 1. GAME_PLAY: Formato limpio y claro */}
                      {isGp && (
                        <div className="p-3 rounded-xl bg-surface-container/60 border border-primary/20">
                          {cfg?.gameId ? (
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-semibold text-on-surface">
                              <span className="text-primary">
                                Juego: {cfg.gameId}
                              </span>
                              <span className="text-outline">·</span>
                              <span className="text-secondary">
                                Apuesta mínima: ${cfg.minBet} USD
                              </span>
                            </div>
                          ) : cfg?.provider ? (
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-semibold text-on-surface">
                              <span className="text-primary">
                                Proveedor: {cfg.provider}
                              </span>
                              <span className="text-outline">·</span>
                              <span className="text-tertiary">
                                {cfg.minUniqueGames || 1} juegos requeridos
                              </span>
                              <span className="text-outline">·</span>
                              <span className="text-secondary">
                                Apuesta mínima: ${cfg.minBet} USD
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-outline">
                              Juego no configurado
                            </span>
                          )}
                        </div>
                      )}

                      {/* 2. IMAGE: Mockup Dropzone de Subida */}
                      {isImage && (
                        <div className="p-4 rounded-xl border-2 border-dashed border-outline-variant/30 bg-surface-container/40 flex flex-col items-center justify-center gap-1.5 text-center cursor-default">
                          <span className="material-symbols-outlined text-2xl text-primary">
                            upload_file
                          </span>
                          <span className="text-xs font-semibold text-on-surface">
                            Arrastra o selecciona la captura de pantalla
                          </span>
                          <span className="text-[11px] text-outline">
                            PNG, JPEG o WebP (Máx. 5MB)
                          </span>
                        </div>
                      )}

                      {/* 3. TEXT: Mockup Input de Texto */}
                      {!isGp && !isImage && (
                        <div className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-2.5 px-3.5 text-xs text-outline flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-outline">
                            edit
                          </span>
                          <span>
                            Ingresa el texto o respuesta requerida aquí...
                          </span>
                        </div>
                      )}
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
