"use client";

import Image from "next/image";

import type { MissionCategory } from "@shared/types";

import type { ReviewableCardProps } from "@/types/review/ReviewSubmission";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

const categoryLabels: Record<MissionCategory, string> = {
  daily: "Diaria",
  weekly: "Semanal",
  fixed: "Fija",
  special_event: "Evento",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days} d`;
}

export function ReviewableCard({ submission, onClick }: ReviewableCardProps) {
  const initial = submission.userName
    ? submission.userName[0].toUpperCase()
    : "J";

  return (
    <button
      type="button"
      onClick={() => onClick(submission.id)}
      className="w-full text-left bg-surface-container-low/80  border border-outline-variant/20 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:bg-surface-container-high/60 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] group cursor-pointer text-on-surface"
    >
      {/* Player header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-container-highest to-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0 overflow-hidden font-bold text-primary shadow-sm">
            {submission.userAvatar ? (
              <Image
                height={40}
                width={40}
                src={submission.userAvatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-(--font-plus-jakarta-sans) text-label-md text-on-surface truncate font-bold group-hover:text-primary transition-colors">
              {submission.userName || "Jugador"}
            </p>
            {submission.submittedAt && (
              <p className="text-label-sm text-[11px] text-on-surface-variant">
                {relativeTime(submission.submittedAt)}
              </p>
            )}
          </div>
        </div>

        <ReviewStatusBadge status={submission.status} />
      </div>

      {/* Mission title */}
      <p className="font-(--font-plus-jakarta-sans) text-body-md text-on-surface font-semibold line-clamp-2 leading-snug">
        {submission.missionTitle}
      </p>

      {/* Evidence image preview */}
      <div className="relative w-full h-36 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/15 flex items-center justify-center overflow-hidden group-hover:border-primary/30 transition-colors">
        {submission.images && submission.images.length > 0 ? (
          <Image
            src={submission.images[0]}
            height={144}
            width={240}
            alt="Evidencia"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-outline/50">
            <span className="material-symbols-outlined text-3xl">image</span>
            <span className="text-xs font-medium">Sin imagen adjunta</span>
          </div>
        )}

        {/* Hover zoom hint */}
        <div className="absolute inset-0 bg-surface-container/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] flex items-center justify-center gap-1.5 text-primary text-xs font-bold transition-opacity">
          <span className="material-symbols-outlined text-base">
            visibility
          </span>
          <span>Revisar evidencia</span>
        </div>
      </div>

      {/* Footer Category Tag */}
      {submission.missionCategory && (
        <div className="flex items-center gap-2 pt-1 border-t border-outline-variant/10 text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
            <span className="material-symbols-outlined text-xs">sell</span>
            <span>{categoryLabels[submission.missionCategory]}</span>
          </span>
        </div>
      )}
    </button>
  );
}

ReviewableCard.displayName = "ReviewableCard";
