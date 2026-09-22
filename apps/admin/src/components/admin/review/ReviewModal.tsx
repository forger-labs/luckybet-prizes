"use client";

import Image from "next/image";
import { useState } from "react";

import type { MissionCategory } from "@shared/types";

import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import type { ReviewModalProps } from "@/types/review/ReviewSubmission";
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

export function ReviewModal({
  submission,
  open,
  onClose,
  onApprove,
  onReject,
}: ReviewModalProps) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleReject = () => {
    if (!notes.trim()) {
      setError("El motivo es obligatorio para rechazar la tarea");
      return;
    }
    setError("");
    onReject(submission.id, notes.trim());
    setNotes("");
  };

  const handleApprove = () => {
    setError("");
    onApprove(submission.id, notes.trim() || undefined);
    setNotes("");
  };

  const handleClose = () => {
    setError("");
    setNotes("");
    onClose();
  };

  const displayName = submission.userName || "Jugador";
  const initial = displayName ? displayName[0].toUpperCase() : "J";

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Revisión de Evidencia"
      size="lg"
    >
      <div className="flex flex-col gap-5 pt-2">
        {/* Header: user info + badges */}
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center font-bold text-primary shrink-0 overflow-hidden shadow-sm">
              {submission.userAvatar ? (
                <Image
                  width={44}
                  height={44}
                  src={submission.userAvatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initial}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-(--font-plus-jakarta-sans) text-body-md text-on-surface font-bold truncate">
                {displayName}
              </p>
              <p className="text-label-sm text-on-surface-variant font-medium truncate">
                {submission.missionTitle}
              </p>
              {submission.submittedAt && (
                <p className="text-[11px] text-on-surface-variant/70">
                  {relativeTime(submission.submittedAt)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submission.missionCategory && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                {categoryLabels[submission.missionCategory]}
              </span>
            )}
            <ReviewStatusBadge status={submission.status} />
          </div>
        </div>

        {/* Evidence image display */}
        {submission.images && submission.images.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-label-sm font-semibold text-on-surface-variant">
              Evidencia enviada
            </span>
            <div className="w-full h-64 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 overflow-hidden flex items-center justify-center relative">
              <Image
                src={submission.images[0]}
                fill
                alt="Evidencia enviada por el jugador"
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        )}

        {/* Submission metadata & user note */}
        {submission.userNote && (
          <div className="flex flex-col gap-1.5">
            <span className="text-label-sm font-semibold text-on-surface-variant">
              Nota del jugador
            </span>
            <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-3.5 text-body-md text-on-surface-variant">
              {submission.userNote}
            </div>
          </div>
        )}

        {/* Reviewer observations */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="reviewer-notes"
            className="text-label-sm font-semibold text-on-surface-variant cursor-pointer"
          >
            Observaciones del revisor
          </label>
          <Textarea
            id="reviewer-notes"
            placeholder="Escriba sus observaciones o motivo de resolución aquí..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/15">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-body-md font-bold border border-error/50 text-error hover:bg-error-container/20 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">close</span>
            <span>Rechazar</span>
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-body-md font-bold bg-secondary text-on-secondary hover:bg-secondary-fixed-dim active:scale-[0.98] shadow-[0_0_15px_rgba(255,198,64,0.25)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check</span>
            <span>Aprobar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

ReviewModal.displayName = "ReviewModal";
