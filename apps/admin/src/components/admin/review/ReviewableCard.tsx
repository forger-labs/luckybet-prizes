"use client";

import Image from "next/image";

import type { ReviewableCardProps } from "@/types/review/ReviewSubmission";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

const typeLabels: Record<string, string> = {
  DAILY: "Diaria",
  WEEKLY: "Semanal",
  FIXED: "Fija",
};

export function ReviewableCard({ item, onReview }: ReviewableCardProps) {
  const initial = item.playerName ? item.playerName[0].toUpperCase() : "J";
  const pendingSteps = item.steps.filter((s) => s.status === "PENDING");
  const firstImageStep = item.steps.find((s) => s.submissionImageUrl);

  return (
    <div className="w-full text-left bg-surface-container-low/80 border border-outline-variant/20 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:bg-surface-container-high/60 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] group text-on-surface">
      {/* Header: Player + Status */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0 overflow-hidden font-bold text-primary shadow-sm">
            <span>{initial}</span>
          </div>
          <div className="min-w-0">
            <p className="font-(--font-plus-jakarta-sans) text-label-md text-on-surface truncate font-bold group-hover:text-primary transition-colors">
              {item.playerName || `Jugador #${item.playerId}`}
            </p>
            <p className="text-label-sm text-[11px] text-on-surface-variant">
              ID: {item.playerId}
            </p>
          </div>
        </div>

        <ReviewStatusBadge status={item.userMissionStatus} type="mission" />
      </div>

      {/* Mission title */}
      <div>
        <p className="font-(--font-plus-jakarta-sans) text-body-md text-on-surface font-semibold line-clamp-2 leading-snug">
          {item.missionTitle}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            <span className="material-symbols-outlined text-xs">sell</span>
            <span>{typeLabels[item.missionType] || item.missionType}</span>
          </span>
          <span className="text-xs text-secondary font-bold">
            +{item.coinsAmount} fichas
          </span>
        </div>
      </div>

      {/* Evidence preview / steps representation */}
      <div className="relative w-full h-32 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/15 flex items-center justify-center overflow-hidden">
        {firstImageStep?.submissionImageUrl ? (
          <Image
            src={firstImageStep.submissionImageUrl}
            height={128}
            width={240}
            alt="Evidencia"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : item.imageUrl ? (
          <Image
            src={item.imageUrl}
            height={128}
            width={240}
            alt="Portada de Misión"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-outline/50">
            <span className="material-symbols-outlined text-3xl">
              assignment
            </span>
            <span className="text-xs font-medium">
              {item.steps.length} pasos en misión
            </span>
          </div>
        )}
      </div>

      {/* Steps checklist footer */}
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-on-surface-variant font-medium">
            Pendientes:
          </span>
          <span className="font-bold text-secondary">
            {pendingSteps.length}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onReview(item)}
          className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-fixed-dim transition-all cursor-pointer shadow-md inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">visibility</span>
          <span>Revisar Pasos</span>
        </button>
      </div>
    </div>
  );
}

ReviewableCard.displayName = "ReviewableCard";
