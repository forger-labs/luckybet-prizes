"use client";

import type { VerificationType } from "@shared/types";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { StepCardProps } from "@/types/missions/StepBuilderTypes";

const VERIFICATION_OPTIONS = [
  { value: "IMAGE", label: "Captura / Imagen de evidencia" },
  { value: "TEXT", label: "Texto / Código de confirmación" },
];

export function StepCard({
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
    <div className="flex items-start gap-3 sm:gap-4 bg-surface-container-low/80 border border-outline-variant/20 rounded-2xl p-4 transition-all">
      {/* Step number badge */}
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/15 border border-primary/30 text-primary text-xs font-bold shrink-0 mt-1 shadow-sm">
        {index + 1}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div>
          <Input
            id={`step-${index}-title`}
            placeholder="Título o instrucción del paso (obligatorio)"
            value={step.title}
            onChange={(e) => onChange({ ...step, title: e.target.value })}
            wrapperClassName="w-full"
            className="bg-surface-container-lowest/80"
          />
          {errors?.title && (
            <p className="mt-1 text-label-sm text-error text-xs">
              {errors.title}
            </p>
          )}
        </div>

        <Select
          id={`step-${index}-type`}
          options={VERIFICATION_OPTIONS}
          value={step.verificationType}
          onChange={(value) =>
            onChange({ ...step, verificationType: value as VerificationType })
          }
          className="w-full"
        />
      </div>

      {/* Reorder and Delete Actions */}
      <div className="flex items-center gap-1 shrink-0 mt-1">
        <button
          type="button"
          disabled={index === 0}
          onClick={onMoveUp}
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Mover paso arriba"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_upward
          </span>
        </button>

        <button
          type="button"
          disabled={index === totalSteps - 1}
          onClick={onMoveDown}
          className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-high disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          aria-label="Mover paso abajo"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_downward
          </span>
        </button>

        <div className="relative group">
          <button
            type="button"
            disabled={totalSteps <= 1}
            onClick={onRemove}
            className="p-1.5 rounded-lg text-error/70 hover:text-error hover:bg-error-container/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Eliminar paso"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
          {totalSteps <= 1 && (
            <div className="absolute bottom-full mb-2 right-0 px-3 py-1.5 bg-surface-container-highest text-on-surface text-[11px] rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 border border-outline-variant/30">
              La misión debe contener al menos un paso
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

StepCard.displayName = "StepCard";
