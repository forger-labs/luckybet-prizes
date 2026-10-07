"use client";

import Image from "next/image";

import { Modal } from "@/components/ui/Modal";
import type { PrizeDetailModalProps } from "@/types/adminChests";

export function PrizeDetailModal({
  open,
  onClose,
  prize,
  onResolveFromDetail,
}: PrizeDetailModalProps) {
  if (!prize) return null;

  const isUncertain = prize.status === "TIMEOUT_UNCERTAIN";

  const formattedDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Detalle y Auditoría del Premio"
      subtitle={`Registro de participación en cofre #${prize.id} · Clave ${prize.periodKey}`}
      icon="receipt_long"
      size="lg"
    >
      <div className="flex flex-col gap-5 py-1">
        {isUncertain && (
          <div className="p-4 rounded-2xl bg-error-container/20 border border-error/30 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-error text-2xl shrink-0 mt-0.5 animate-pulse">
                warning
              </span>
              <div className="text-xs">
                <p className="font-bold text-error text-sm mb-1">
                  Reclamo en Estado Incierto (TIMEOUT_UNCERTAIN)
                </p>
                <p className="text-on-surface-variant leading-relaxed">
                  Ocurrió un fallo al intentar acreditar el premio en LuckyBet.
                  Requiere resolución manual.
                </p>
              </div>
            </div>

            {onResolveFromDetail && (
              <button
                type="button"
                onClick={() => onResolveFromDetail(prize)}
                className="px-4 py-2 rounded-xl bg-error text-on-error font-bold text-xs shrink-0 cursor-pointer shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                Resolver Reclamo
              </button>
            )}
          </div>
        )}

        {/* Jugador y Cofre Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center font-bold text-primary text-base shrink-0">
              {prize.player.username.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-outline font-semibold uppercase tracking-wider">
                Jugador Beneficiario
              </p>
              <p className="font-(--font-plus-jakarta-sans) font-bold text-on-surface text-base truncate">
                {prize.player.username}
              </p>
              <p className="text-xs text-on-surface-variant font-mono">
                Player ID: #{prize.playerId}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center gap-3.5">
            <div className="relative w-14 aspect-video rounded-xl bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0">
              {prize.chest.imageUrl ? (
                <Image
                  src={prize.chest.imageUrl}
                  alt={prize.chest.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-lg">
                    inventory_2
                  </span>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] text-outline font-semibold uppercase tracking-wider">
                Cofre Asociado
              </p>
              <p className="font-(--font-plus-jakarta-sans) font-bold text-on-surface text-base truncate">
                {prize.chest.title}
              </p>
              <p className="text-xs text-on-surface-variant font-mono">
                Meta: {prize.completedMissionsCount} de{" "}
                {prize.chest.requiredMissions} misiones
              </p>
            </div>
          </div>
        </div>

        {/* Métricas y Recompensas */}
        <div className="p-4 rounded-2xl bg-surface-container-lowest/80 border border-outline-variant/20 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-[11px] text-outline font-medium">
              Fichas Ganadas
            </p>
            <p className="font-bold text-secondary text-base sm:text-lg flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-lg">token</span>
              <span>{prize.coinsAmount.toLocaleString()} Fichas</span>
            </p>
          </div>

          <div>
            <p className="text-[11px] text-outline font-medium">
              Sala Promocional
            </p>
            <p className="font-semibold text-on-surface text-xs sm:text-sm mt-1 truncate">
              {prize.room
                ? `${prize.room.name} (+${prize.room.bonus}%)`
                : "Sin sala promocional"}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-outline font-medium">Periodo</p>
            <p className="font-mono font-semibold text-primary text-xs sm:text-sm mt-1">
              {prize.periodKey}
            </p>
          </div>
        </div>

        {/* Auditoría Técnica y Trazabilidad */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-3">
          <p className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-primary">
              security
            </span>
            <span>Trazabilidad y Auditoría</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-outline block">
                ID de Operación Externa (LuckyBet):
              </span>
              <span className="font-mono text-on-surface font-semibold block mt-0.5">
                {prize.externalOperationId || "No registrada"}
              </span>
            </div>

            <div>
              <span className="text-outline block">
                Resuelto por Administrador:
              </span>
              <span className="text-on-surface font-semibold block mt-0.5">
                {prize.resolvedByAdmin
                  ? `${prize.resolvedByAdmin.username} (#${prize.resolvedByAdmin.id})`
                  : "Resolución Automática del Sistema"}
              </span>
            </div>

            <div>
              <span className="text-outline block">Fecha de Registro:</span>
              <span className="text-on-surface block mt-0.5">
                {formattedDate(prize.created_at)}
              </span>
            </div>

            <div>
              <span className="text-outline block">
                Fecha de Reclamo / Entrega:
              </span>
              <span className="text-on-surface block mt-0.5">
                {formattedDate(prize.claimedAt)}
              </span>
            </div>
          </div>

          {prize.errorMessage && (
            <div className="pt-2 border-t border-outline-variant/15">
              <span className="text-error text-xs font-semibold block">
                Último Mensaje de Error:
              </span>
              <p className="font-mono text-xs text-error/90 bg-error-container/15 p-2.5 rounded-xl mt-1 border border-error/20">
                {prize.errorMessage}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-body-md text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </Modal>
  );
}

PrizeDetailModal.displayName = "PrizeDetailModal";
