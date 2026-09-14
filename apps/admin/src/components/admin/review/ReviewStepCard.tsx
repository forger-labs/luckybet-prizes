"use client";

import Image from "next/image";
import { useState } from "react";

import type { VerificationCriterion } from "@shared/types";

import { ImageExpandOverlay } from "./ImageExpandOverlay";

interface ReviewStepCardProps {
  criterion: VerificationCriterion;
  stepNumber: number;
  verdict: boolean | null;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

/**
 * ReviewStepCard — single step in the review ordered list.
 *
 * Displays the step number, label, optional description, associated
 * images (clickable to expand), and accept/reject controls. Shows
 * the current verdict status when already reviewed.
 */
function ReviewStepCard({
  criterion,
  stepNumber,
  verdict,
  onAccept,
  onReject,
}: ReviewStepCardProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <>
      <li
        className={`list-none border rounded-xl p-4 transition-all duration-200 ${
          verdict === true
            ? "border-green-500/25 bg-green-500/[0.04]"
            : verdict === false
              ? "border-error/25 bg-error/[0.04]"
              : "border-outline-variant/20 bg-surface-container-lowest/50"
        }`}
      >
        <div className="flex flex-col gap-3">
          {/* Header: step number + label + status icon */}
          <div className="flex items-start gap-2.5">
            <span
              className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-xs font-headline shrink-0 mt-0.5 ${
                verdict === true
                  ? "bg-green-500/20 text-green-400"
                  : verdict === false
                    ? "bg-error/20 text-error"
                    : "bg-surface-container-high text-on-surface-variant"
              }`}
            >
              {verdict === true ? "✓" : verdict === false ? "✗" : stepNumber}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-body-md text-on-surface font-semibold">
                {criterion.label}
              </p>

              {/* Description */}
              {criterion.description && (
                <p className="text-body-md text-on-surface-variant mt-1">
                  {criterion.description}
                </p>
              )}
            </div>
            {verdict === true && (
              <span className="material-symbols-outlined text-lg text-green-400 shrink-0 mt-0.5">
                check_circle
              </span>
            )}
            {verdict === false && (
              <span className="material-symbols-outlined text-lg text-error shrink-0 mt-0.5">
                cancel
              </span>
            )}
          </div>

          {/* Per-step images */}
          {criterion.images && criterion.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1 pl-9">
              {criterion.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setExpandedImage(src)}
                  className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container-high cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
                >
                  <Image
                    width={96}
                    height={96}
                    src={src}
                    alt={`Paso ${stepNumber} - imagen ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Action buttons — solo si no está revisado */}
          {verdict === null && (
            <div className="flex gap-2 pl-9">
              <button
                type="button"
                onClick={() => onAccept(criterion.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-semibold border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-all duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">check</span>
                Verificado
              </button>
              <button
                type="button"
                onClick={() => onReject(criterion.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-semibold border border-error/40 text-error hover:bg-error/10 transition-all duration-200 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
                Rechazar
              </button>
            </div>
          )}

          {/* Badge de revisado */}
          {verdict !== null && (
            <div className="flex gap-2 pl-9">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-semibold ${
                  verdict === true
                    ? "bg-green-500/15 text-green-400"
                    : "bg-error/15 text-error"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {verdict === true ? "check" : "close"}
                </span>
                {verdict === true ? "Aceptado" : "Rechazado"}
              </span>
            </div>
          )}
        </div>
      </li>

      {/* Image expand overlay */}
      <ImageExpandOverlay
        src={expandedImage ?? ""}
        alt={`Paso ${stepNumber}`}
        open={expandedImage !== null}
        onClose={() => setExpandedImage(null)}
      />
    </>
  );
}

export { ReviewStepCard };
