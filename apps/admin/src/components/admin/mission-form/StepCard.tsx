"use client";

import type { VerificationType } from "@shared/types";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { StepCardProps } from "@/types/missions/StepBuilderTypes";

const VERIFICATION_OPTIONS: { value: string; label: string }[] = [
  { value: "upload_image", label: "Subir imagen" },
  { value: "submit_text", label: "Enviar texto" },
  { value: "manual_review", label: "Revisión manual" },
];

/**
 * StepCard — fila individual de paso en el StepBuilder.
 *
 * Muestra: badge numerado, input de título, select de tipo de verificación,
 * y botones de orden (subir/bajar) + eliminar.
 * El botón eliminar se deshabilita si es el único paso, con tooltip explicativo.
 */
function StepCard({
  step,
  index,
  totalSteps,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  errors,
}: StepCardProps) {
  return (
    <div className="flex items-start gap-4 bg-surface-container rounded-lg p-4">
      {/* Step number badge */}
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary text-label-sm font-bold shrink-0 mt-1">
        {index + 1}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3">
        <div>
          <Input
            placeholder="Título del paso (obligatorio)"
            value={step.title}
            onChange={(e) => onChange({ ...step, title: e.target.value })}
            wrapperClassName="w-full"
          />
          {errors?.title && (
            <p className="mt-1 text-label-sm text-error">{errors.title}</p>
          )}
        </div>
        <Select
          options={VERIFICATION_OPTIONS}
          value={step.verificationType}
          onChange={(value) =>
            onChange({ ...step, verificationType: value as VerificationType })
          }
          className="w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0 mt-1">
        {/* Move up */}
        <button
          type="button"
          disabled={index === 0}
          onClick={onMoveUp}
          className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Mover arriba"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_upward
          </span>
        </button>

        {/* Move down */}
        <button
          type="button"
          disabled={index === totalSteps - 1}
          onClick={onMoveDown}
          className="p-1 rounded-md text-outline hover:text-on-surface hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Mover abajo"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_downward
          </span>
        </button>

        {/* Remove — tooltip when last step */}
        <div className="relative group">
          <button
            type="button"
            disabled={totalSteps <= 1}
            onClick={onRemove}
            className="p-1 rounded-md text-error/70 hover:text-error hover:bg-error/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Eliminar paso"
          >
            <span className="material-symbols-outlined text-lg">
              remove_circle
            </span>
          </button>
          {totalSteps <= 1 && (
            <div
              className="absolute bottom-full mb-2 left-[-200%] -translate-x-1/2
              px-3 py-1.5 bg-surface-container-high text-on-surface
              text-label-sm rounded-lg shadow-lg whitespace-nowrap opacity-0
              group-hover:opacity-100 transition-opacity pointer-events-none z-100"
            >
              La misión debe tener al menos un paso
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

StepCard.displayName = "StepCard";

export { StepCard };
