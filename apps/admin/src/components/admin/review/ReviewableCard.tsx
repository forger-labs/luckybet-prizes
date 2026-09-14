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

function ReviewableCard({ submission, onClick }: ReviewableCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(submission.id)}
      className="w-full text-left bg-surface-container border border-white/10 rounded-xl p-4 flex flex-col gap-3 transition-all duration-200 hover:bg-surface-container-high hover:border-primary/30 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 overflow-hidden">
          {submission.userAvatar ? (
            <Image
              height={40}
              width={40}
              src={submission.userAvatar}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="material-symbols-outlined text-on-surface-variant text-lg">
              person
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-label-md text-on-surface truncate font-semibold">
            {submission.userName}
          </p>
          <p className="text-label-sm text-on-surface-variant">
            {relativeTime(submission.submittedAt)}
          </p>
        </div>
      </div>

      <p className="text-body-md text-on-surface font-semibold line-clamp-2">
        {submission.missionTitle}
      </p>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm">
          <span className="material-symbols-outlined text-xs">sell</span>
          {categoryLabels[submission.missionCategory]}
        </span>
        <ReviewStatusBadge status={submission.status} />
      </div>

      <div className="w-full h-30 rounded-md bg-surface-container-high flex items-center justify-center overflow-hidden">
        {submission.images && submission.images.length > 0 ? (
          <Image
            src={submission.images[0]}
            height={120}
            width={120}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="material-symbols-outlined text-4xl text-outline/40">
            image
          </span>
        )}
      </div>
    </button>
  );
}

export { ReviewableCard };
