"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { MissionCategory } from "@shared/types";

import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import type { ReviewModalProps } from "@/types/review/ReviewSubmission";
import { ReviewStatusBadge } from "./ReviewStatusBadge";
import { ReviewStepCard } from "./ReviewStepCard";

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewModal({
  submission,
  open,
  onClose,
  onApprove,
  onReject,
}: ReviewModalProps) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [fichasAmount, setFichasAmount] = useState("");
  const [criteriaVerdicts, setCriteriaVerdicts] = useState<
    Record<string, boolean | null>
  >({});

  const prevOpen = useRef(open);
  const prevSubmissionId = useRef(submission.id);
  useEffect(() => {
    const justOpened = open && !prevOpen.current;
    const submissionChanged =
      open && prevOpen.current && submission.id !== prevSubmissionId.current;
    if (justOpened || submissionChanged) {
      const initial: Record<string, boolean | null> = {};
      submission.verificationCriteria?.forEach((c) => {
        initial[c.id] = null;
      });
      setCriteriaVerdicts(initial);
      setNotes("");
      setError("");
      setFichasAmount("");
    }
    prevOpen.current = open;
    prevSubmissionId.current = submission.id;
  }, [open, submission.id, submission.verificationCriteria]);

  const reviewedCount = Object.values(criteriaVerdicts).filter(
    (v) => v !== null,
  ).length;
  const totalCriteria = submission.verificationCriteria?.length ?? 0;
  const allReviewed = reviewedCount === totalCriteria && totalCriteria > 0;

  const handleReject = () => {
    if (!notes.trim()) {
      setError("El motivo es obligatorio para rechazar");
      return;
    }
    setError("");
    onReject(submission.id, notes.trim());
    setNotes("");
  };

  const handleApprove = () => {
    if (totalCriteria > 0 && !allReviewed) {
      setError("Revisá todos los pasos antes de aprobar");
      return;
    }
    if (!fichasAmount.trim()) {
      setError("Cargá las fichas antes de aprobar");
      return;
    }
    setError("");
    onApprove(submission.id, notes.trim() || undefined);
    setNotes("");
  };

  const handleClose = () => {
    setError("");
    setNotes("");
    onClose();
  };

  const setVerdict = (id: string, value: boolean) => {
    setCriteriaVerdicts((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Modal open={open} onClose={handleClose} title="Revisar tarea" size="lg">
      <div className="flex flex-col gap-5">
        {/* Header: user info + badges */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 overflow-hidden">
            {submission.userAvatar ? (
              <Image
                width={40}
                height={40}
                src={submission.userAvatar}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-label-sm font-bold text-on-surface-variant">
                {getInitials(submission.userName)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-label-md text-on-surface font-semibold">
              {submission.userName}
            </p>
            <p className="text-body-md text-on-surface font-semibold">
              {submission.missionTitle}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-label-sm">
              {categoryLabels[submission.missionCategory]}
            </span>
            <ReviewStatusBadge status={submission.status} />
          </div>
        </div>

        <p className="text-label-sm text-on-surface-variant">
          Enviado {relativeTime(submission.submittedAt)}
        </p>

        {/* Descripción de la tarea */}
        {submission.missionDescription && (
          <div className="flex flex-col gap-2">
            <p className="text-label-md text-on-surface font-semibold">
              Descripción de la tarea
            </p>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-body-md text-on-surface-variant">
              {submission.missionDescription}
            </div>
          </div>
        )}

        {/* Nota del usuario */}
        {submission.userNote && (
          <div className="flex flex-col gap-2">
            <p className="text-label-md text-on-surface font-semibold">
              Nota del usuario
            </p>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-3 text-body-md text-on-surface-variant">
              {submission.userNote}
            </div>
          </div>
        )}

        {/* Lista ordenada de pasos */}
        {submission.verificationCriteria &&
          submission.verificationCriteria.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 bg-primary/6 rounded-xl">
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${totalCriteria > 0 ? Math.round((reviewedCount / totalCriteria) * 100) : 0}%`,
                      background: "linear-gradient(90deg, #38bdf8, #8ed5ff)",
                    }}
                  />
                </div>
                <span className="text-label-sm font-semibold text-primary whitespace-nowrap">
                  {reviewedCount} / {totalCriteria}
                </span>
              </div>

              <ol className="flex flex-col gap-2">
                {submission.verificationCriteria.map((c, i) => (
                  <ReviewStepCard
                    key={c.id}
                    criterion={c}
                    stepNumber={i + 1}
                    verdict={criteriaVerdicts[c.id] ?? null}
                    onAccept={(id) => setVerdict(id, true)}
                    onReject={(id) => setVerdict(id, false)}
                  />
                ))}
              </ol>
            </div>
          )}

        {/* Carga las fichas — visible solo después de revisar todo */}
        {allReviewed && (
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fichas-amount"
              className="text-label-md text-on-surface font-semibold"
            >
              Carga las fichas
            </label>
            <input
              id="fichas-amount"
              type="number"
              min="0"
              placeholder="Ingresá la cantidad de fichas..."
              value={fichasAmount}
              onChange={(e) => {
                setFichasAmount(e.target.value);
                if (error) setError("");
              }}
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-outline transition-all duration-300 focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none"
            />
          </div>
        )}

        {/* Notas del revisor */}
        <div className="flex flex-col gap-2">
          <p className="text-label-md text-on-surface font-semibold">
            Notas del revisor
          </p>
          <Textarea
            placeholder="Escribí tus observaciones aquí..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
        </div>

        {/* Acciones */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 inline-flex items-center justify-center gap-2 font-headline-lg-mobile text-headline-lg-mobile py-4 px-6 rounded-lg transition-all duration-200 border border-error/60 text-error hover:bg-error/10 active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
            Rechazar
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 inline-flex items-center justify-center gap-2 font-headline-lg-mobile text-headline-lg-mobile py-4 px-6 rounded-lg transition-all duration-200 bg-secondary text-on-secondary hover:bg-secondary-fixed-dim active:scale-[0.98] glow-gold-sm cursor-pointer"
          >
            <span className="material-symbols-outlined">check</span>
            Aprobar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { ReviewModal };
