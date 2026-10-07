"use client";

import { Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";

import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import type { ReviewStepSubmission } from "@/types/review/ReviewMission";
import type { ReviewModalProps } from "@/types/review/ReviewSubmission";
import { ReviewStatusBadge } from "./ReviewStatusBadge";

const ReviewStepSchema = Yup.object().shape({
  reviewerNotes: Yup.string().test(
    "required-if-rejected",
    "El motivo de rechazo es obligatorio para el jugador",
    function testRejectNotes(value) {
      const { action } = this.parent;
      if (action === "REJECTED") {
        return Boolean(value && value.trim().length > 0);
      }
      return true;
    },
  ),
});

export function ReviewModal({
  item,
  open,
  onClose,
  onReviewStep,
  isSubmitting = false,
}: ReviewModalProps) {
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);

  if (!item) return null;

  const currentStep =
    item.steps.find((s) => s.id === selectedStepId) || item.steps[0];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Auditoría de Misión de Usuario"
      subtitle={`${item.missionTitle} • Jugador: ${item.playerName || item.playerId}`}
      size="lg"
    >
      <div className="flex flex-col gap-5 pt-2">
        {/* Step Navigation Tabs */}
        {item.steps.length > 1 && (
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-surface-container border border-outline-variant/20">
            {item.steps.map((st, idx) => {
              const isSelected =
                (selectedStepId ?? item.steps[0]?.id) === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStepId(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span>Paso {idx + 1}</span>
                  <ReviewStatusBadge status={st.status} type="step" />
                </button>
              );
            })}
          </div>
        )}

        {/* Step Details & Evidence */}
        {currentStep ? (
          <StepReviewCard
            step={currentStep}
            onReviewStep={onReviewStep}
            isSubmitting={isSubmitting}
          />
        ) : (
          <div className="p-8 text-center text-on-surface-variant">
            Esta misión no tiene pasos asociados para revisar.
          </div>
        )}
      </div>
    </Modal>
  );
}

function StepReviewCard({
  step,
  onReviewStep,
  isSubmitting,
}: {
  step: ReviewStepSubmission;
  onReviewStep: ReviewModalProps["onReviewStep"];
  isSubmitting: boolean;
}) {
  const [actionType, setActionType] = useState<"APPROVED" | "REJECTED">(
    "APPROVED",
  );

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
      <div className="flex items-center justify-between">
        <span className="text-label-md font-bold text-on-surface">
          Evidencia enviada (Paso #{step.missionStepId})
        </span>
        <ReviewStatusBadge status={step.status} type="step" />
      </div>

      {/* Image Preview */}
      {step.submissionImageUrl && (
        <div className="w-full h-64 rounded-xl bg-surface-container-lowest border border-outline-variant/20 overflow-hidden relative flex items-center justify-center">
          <Image
            src={step.submissionImageUrl}
            alt="Evidencia"
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Text Submission */}
      {step.submissionText && (
        <div className="p-3.5 rounded-xl bg-surface-container border border-outline-variant/20 text-sm text-on-surface">
          <span className="text-xs text-on-surface-variant font-bold block mb-1">
            Texto del usuario:
          </span>
          <p className="whitespace-pre-wrap">{step.submissionText}</p>
        </div>
      )}

      {/* Evaluation Form */}
      <Formik
        initialValues={{
          action: "APPROVED" as "APPROVED" | "REJECTED",
          reviewerNotes: step.reviewerNotes || "",
        }}
        validationSchema={ReviewStepSchema}
        onSubmit={async (values) => {
          await onReviewStep(step.id, {
            status: actionType,
            reviewerNotes: values.reviewerNotes.trim() || undefined,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className="flex flex-col gap-3 pt-2 border-t border-outline-variant/15">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={`reviewerNotes-${step.id}`}
                className="text-xs font-semibold text-on-surface-variant"
              >
                Notas del revisor {actionType === "REJECTED" && "*"}
              </label>
              <Textarea
                id={`reviewerNotes-${step.id}`}
                name="reviewerNotes"
                placeholder={
                  actionType === "REJECTED"
                    ? "Indique la razón por la cual rechaza la evidencia..."
                    : "Comentarios opcionales para el registro..."
                }
                value={values.reviewerNotes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.reviewerNotes && errors.reviewerNotes && (
                <span className="text-xs text-error">
                  {errors.reviewerNotes}
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  setActionType("REJECTED");
                  setFieldValue("action", "REJECTED");
                }}
                className="px-4 py-2 rounded-xl bg-error/15 text-error border border-error/30 hover:bg-error/25 font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">
                  cancel
                </span>
                <span>Rechazar Paso</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  setActionType("APPROVED");
                  setFieldValue("action", "APPROVED");
                }}
                className="px-4 py-2 rounded-xl bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40 hover:bg-[#22c55e]/30 font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">
                  check_circle
                </span>
                <span>Aprobar Paso</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

ReviewModal.displayName = "ReviewModal";
